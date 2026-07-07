import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = [
  "/", "/pricing", "/features", "/faq", "/login", "/register",
  "/legal-disclaimer", "/impressum", "/datenschutz", "/agb", "/ki-transparenz",
  "/passwort-vergessen", "/schulung", "/ki-kompetenz-review", "/themen",
  "/musterzertifikat", "/ueber-uns",
  // SEO-Landingpages Phase 2 (SEO_GEO_TRUST_REPORT Kap. 7/11)
  "/ki-kompetenz-nachweis", "/art-4-ai-act-erklaert", "/ki-fuehrerschein-vergleich",
  "/chatgpt-schulung-mitarbeiter", "/ki-schulung-mitarbeiter",
];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  // Öffentliche Lerninhalts-Übersicht inkl. Modul-Detailseiten (Transparenz vor Buchung)
  if (pathname.startsWith("/schulung/")) return true;
  if (pathname.startsWith("/verify/")) return true;
  if (pathname.startsWith("/invite/")) return true;
  if (pathname.startsWith("/passwort-reset/")) return true;
  if (pathname.startsWith("/api/auth")) return true;
  if (pathname.startsWith("/_next") || pathname.includes(".")) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isPublic(pathname)) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  const role = (token.role as string) ?? "PARTICIPANT";
  if (pathname.startsWith("/admin") && role !== "SUPERADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (pathname.startsWith("/company") && !["COMPANY_ADMIN", "SUPERADMIN"].includes(role)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
