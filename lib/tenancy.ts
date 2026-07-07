import type { Role } from "@/lib/roles";

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  companyId: string | null;
  locale: string;
}

/**
 * Mandanten-Scope: Superadmin darf alles; alle anderen nur die eigene Firma.
 * Wirft bei Verstoß — niemals stillschweigend fremde Daten liefern.
 */
export function assertCompanyScope(user: SessionUser, companyId: string | null | undefined): void {
  if (user.role === "SUPERADMIN") return;
  if (!companyId || user.companyId !== companyId) {
    throw new Error("Zugriff verweigert: fremder Mandant.");
  }
}

/** Für reine Datenabfragen: liefert das companyId-Filter-Objekt je nach Rolle. */
export function companyWhere(user: SessionUser): { companyId?: string } {
  if (user.role === "SUPERADMIN") return {};
  return { companyId: user.companyId ?? "__none__" };
}
