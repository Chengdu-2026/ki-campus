import { describe, it, expect } from "vitest";
import {
  buildRecertReminders,
  daysUntil,
  DEFAULT_RECERT_LEAD_DAYS,
  type RecertCertInput,
} from "@/lib/recert-reminders";

const TODAY = new Date("2026-07-10T09:00:00Z");

function cert(overrides: Partial<RecertCertInput> = {}): RecertCertInput {
  return {
    certificateNumber: "CERT-2026-000001",
    validUntil: new Date("2026-08-01"),
    status: "VALID",
    participantName: "Anna Beispiel",
    participantEmail: "anna@example.com",
    companyName: "Musterfirma Handel GmbH",
    employerEmail: "hr@example.com",
    ...overrides,
  };
}

describe("daysUntil", () => {
  it("zählt ganze Tage, unabhängig von der Uhrzeit", () => {
    expect(daysUntil(new Date("2026-07-20T23:00:00Z"), new Date("2026-07-10T01:00:00Z"))).toBe(10);
  });
  it("ist 0 am Ablauftag", () => {
    expect(daysUntil(new Date("2026-07-10T18:00:00Z"), new Date("2026-07-10T06:00:00Z"))).toBe(0);
  });
  it("ist negativ für vergangene Daten", () => {
    expect(daysUntil(new Date("2026-07-05"), TODAY)).toBe(-5);
  });
});

describe("buildRecertReminders", () => {
  it("erinnert innerhalb des Vorlauf-Fensters (Default 6 Wochen)", () => {
    const r = buildRecertReminders([cert({ validUntil: new Date("2026-08-01") })], { today: TODAY });
    expect(r).toHaveLength(1);
    expect(r[0].certificateNumber).toBe("CERT-2026-000001");
  });

  it("schließt Zertifikate außerhalb des Fensters aus (leadDays + 1)", () => {
    const far = new Date(TODAY);
    far.setDate(far.getDate() + DEFAULT_RECERT_LEAD_DAYS + 1);
    expect(buildRecertReminders([cert({ validUntil: far })], { today: TODAY })).toHaveLength(0);
  });

  it("nimmt die Grenze (genau leadDays) mit", () => {
    const edge = new Date(TODAY);
    edge.setDate(edge.getDate() + DEFAULT_RECERT_LEAD_DAYS);
    expect(buildRecertReminders([cert({ validUntil: edge })], { today: TODAY })).toHaveLength(1);
  });

  it("ignoriert bereits abgelaufene Zertifikate", () => {
    expect(buildRecertReminders([cert({ validUntil: new Date("2026-07-01") })], { today: TODAY })).toHaveLength(0);
  });

  it("ignoriert widerrufene und unbefristete Zertifikate", () => {
    const revoked = cert({ status: "REVOKED" });
    const unlimited = cert({ validUntil: null });
    expect(buildRecertReminders([revoked, unlimited], { today: TODAY })).toHaveLength(0);
  });

  it("erinnert Teilnehmer UND Arbeitgeber (Eigentümer-Vorgabe)", () => {
    const [rem] = buildRecertReminders([cert()], { today: TODAY });
    expect(rem.recipients.map((x) => x.role)).toEqual(["PARTICIPANT", "EMPLOYER"]);
  });

  it("lässt fehlende Empfänger weg und überspringt Zertifikate ohne jeden Kontakt", () => {
    const onlyParticipant = buildRecertReminders([cert({ employerEmail: null })], { today: TODAY });
    expect(onlyParticipant[0].recipients.map((x) => x.role)).toEqual(["PARTICIPANT"]);

    const nobody = buildRecertReminders(
      [cert({ participantEmail: null, employerEmail: null })],
      { today: TODAY },
    );
    expect(nobody).toHaveLength(0);
  });

  it("sortiert nach Ablauf, frühester zuerst", () => {
    const later = cert({ certificateNumber: "CERT-B", validUntil: new Date("2026-08-10") });
    const sooner = cert({ certificateNumber: "CERT-A", validUntil: new Date("2026-07-15") });
    const r = buildRecertReminders([later, sooner], { today: TODAY });
    expect(r.map((x) => x.certificateNumber)).toEqual(["CERT-A", "CERT-B"]);
  });

  it("respektiert einen eigenen leadDays-Wert", () => {
    const in10 = cert({ validUntil: new Date("2026-07-20") });
    expect(buildRecertReminders([in10], { today: TODAY, leadDays: 7 })).toHaveLength(0);
    expect(buildRecertReminders([in10], { today: TODAY, leadDays: 14 })).toHaveLength(1);
  });
});
