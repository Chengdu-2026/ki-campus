import { describe, expect, it } from "vitest";
import { assertCompanyScope, companyWhere, type SessionUser } from "@/lib/tenancy";

function user(role: SessionUser["role"], companyId: string | null): SessionUser {
  return { id: "u1", email: "test@example.com", role, companyId, locale: "de" };
}

describe("Mandantentrennung", () => {
  it("Superadmin darf firmenübergreifend zugreifen", () => {
    expect(() => assertCompanyScope(user("SUPERADMIN", null), "andere-firma")).not.toThrow();
  });
  it("Unternehmensadmin darf nur die eigene Firma", () => {
    expect(() => assertCompanyScope(user("COMPANY_ADMIN", "firma-a"), "firma-a")).not.toThrow();
    expect(() => assertCompanyScope(user("COMPANY_ADMIN", "firma-a"), "firma-b")).toThrow();
  });
  it("Teilnehmer darf nicht mandantenübergreifend zugreifen", () => {
    expect(() => assertCompanyScope(user("PARTICIPANT", "firma-a"), "firma-b")).toThrow();
  });
  it("fehlende companyId wird abgelehnt", () => {
    expect(() => assertCompanyScope(user("COMPANY_ADMIN", "firma-a"), null)).toThrow();
    expect(() => assertCompanyScope(user("COMPANY_ADMIN", null), "firma-a")).toThrow();
  });
});

describe("companyWhere-Filter", () => {
  it("Superadmin: kein Filter", () => {
    expect(companyWhere(user("SUPERADMIN", null))).toEqual({});
  });
  it("Firmenrollen: Filter auf eigene Firma", () => {
    expect(companyWhere(user("COMPANY_ADMIN", "firma-a"))).toEqual({ companyId: "firma-a" });
  });
  it("Nutzer ohne Firma: unerfüllbarer Filter statt Vollzugriff", () => {
    expect(companyWhere(user("PARTICIPANT", null))).toEqual({ companyId: "__none__" });
  });
});
