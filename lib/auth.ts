import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { verifyTotp } from "@/lib/totp";
import { isRateLimited, recordHit, clearHits, clientIp } from "@/lib/rate-limit";
import type { Role } from "@/lib/roles";

// Login-Brute-Force-Bremse (H2): pro IP max. 20 FEHLversuche in 10 Minuten.
// Nur Fehlversuche zählen; ein erfolgreicher Login setzt den Zähler zurück, damit
// legitime Nutzer sich nie selbst aussperren. Fehlt die IP (Proxy ohne
// X-Forwarded-For), greift der Limiter nicht (fail-open).
const LOGIN_FAIL_LIMIT = 20;
const LOGIN_WINDOW_MS = 10 * 60 * 1000;

declare module "next-auth" {
  interface User {
    role?: string;
    companyId?: string | null;
    locale?: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: Role;
      companyId: string | null;
      locale: string;
    };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // Self-Hosting: Host aus Request akzeptieren (hinter Reverse-Proxy APP_URL setzen)
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {}, totp: {} },
      async authorize(credentials, request) {
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        // H2: IP-basierte Brute-Force-Bremse. Bei zu vielen Fehlversuchen abweisen,
        // bevor überhaupt gegen die DB/bcrypt geprüft wird.
        const ip = clientIp(request as Request | null);
        const rlKey = `login:${ip}`;
        if (ip !== "unknown" && isRateLimited(rlKey, LOGIN_FAIL_LIMIT, LOGIN_WINDOW_MS)) {
          await audit({ action: "LOGIN_FAILED", metadata: { email, reason: "rate_limited", ip } });
          return null;
        }
        const failLogin = () => {
          if (ip !== "unknown") recordHit(rlKey, LOGIN_WINDOW_MS);
        };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.status !== "ACTIVE") {
          failLogin();
          await audit({ action: "LOGIN_FAILED", metadata: { email } });
          return null;
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
          failLogin();
          await audit({ action: "LOGIN_FAILED", userId: user.id, companyId: user.companyId });
          return null;
        }
        // 2FA: Wenn aktiviert, muss ein gültiger Authenticator-Code mitgesendet werden.
        if (user.totpEnabledAt && user.totpSecret) {
          const code = String(credentials?.totp ?? "");
          if (!verifyTotp(user.totpSecret, code)) {
            failLogin();
            await audit({ action: "TOTP_FAILED", userId: user.id, companyId: user.companyId });
            return null;
          }
        }
        // Erfolgreicher Login: Fehlversuchs-Zähler dieser IP zurücksetzen.
        if (ip !== "unknown") clearHits(rlKey);
        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          companyId: user.companyId,
          locale: user.locale,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId ?? null;
        token.locale = user.locale ?? "de";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role) ?? "PARTICIPANT";
        session.user.companyId = (token.companyId as string | null) ?? null;
        session.user.locale = (token.locale as string) ?? "de";
      }
      return session;
    },
  },
});
