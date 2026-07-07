import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { verifyTotp } from "@/lib/totp";
import type { Role } from "@/lib/roles";

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
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.status !== "ACTIVE") {
          await audit({ action: "LOGIN_FAILED", metadata: { email } });
          return null;
        }
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
          await audit({ action: "LOGIN_FAILED", userId: user.id, companyId: user.companyId });
          return null;
        }
        // 2FA: Wenn aktiviert, muss ein gültiger Authenticator-Code mitgesendet werden.
        if (user.totpEnabledAt && user.totpSecret) {
          const code = String(credentials?.totp ?? "");
          if (!verifyTotp(user.totpSecret, code)) {
            await audit({ action: "TOTP_FAILED", userId: user.id, companyId: user.companyId });
            return null;
          }
        }
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
