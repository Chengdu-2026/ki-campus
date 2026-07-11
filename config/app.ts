/**
 * Zentrale App-Konfiguration.
 * Keine Firmendaten, Preise oder Grenzwerte hardcoden — alles hier oder in der DB.
 */
export const appConfig = {
  appName: "KI-Kompetenz Campus",
  // Version der Auftragsverarbeitungsvereinbarung (AVV). Bei jeder inhaltlichen
  // Änderung des AVV-Textes hochzählen — die Zustimmung wird mit dieser Version
  // und einem Inhalts-Hash gespeichert (Nachweis, WAS akzeptiert wurde).
  avvVersion: "V1.0",
  // Inhalts-Versionsstand (Anzeige u. a. im Footer). Muss bei jeder inhaltlichen
  // Änderung an Kursen/Fragen zusammen mit dem ContentRevision-Register
  // (prisma/seed, /admin/versions) hochgezählt werden — Regel siehe CLAUDE.md.
  contentVersionLabel: "V1.008",
  defaultLocale: "de",
  supportedLocales: ["de", "en"] as const,
  // Vorbereitet (Übersetzungen können ohne Codeänderung ergänzt werden):
  plannedLocales: [
    "fr", "it", "es", "nl", "pl", "cs", "sk", "hu", "sl", "hr", "ro",
    "bg", "el", "pt", "da", "sv", "fi", "et", "lv", "lt", "ga", "mt",
  ],
  fallbackLocale: "de",
  certificateIssuer: "Hainan Salzburg Consulting Co., Ltd.",
  legalCompanyName: "Hainan Salzburg Consulting Co., Ltd.",
  legalCompanyNameZh: "海南萨尔茨堡咨询有限公司",
  contactEmail: "info@ki-nachweis.at",
  contactPhone: "+43 699 10050220",
  contactPhoneCn: "+86 191 8217 7220",
  websiteUrl: "https://www.ki-nachweis.at",
  contentResponsiblePerson: "Sascha Morocutti",
  contentResponsibleAddress: "Schulterzucker 2, 4742 Pram, Österreich",
  // Lokale Verortung (SEO/GEO): Pram, Oberösterreich
  geo: {
    region: "AT-4",
    placename: "Pram, Oberösterreich",
    latitude: 48.2333,
    longitude: 13.6067,
  },
  defaultPassPercentage: 75,
  defaultExamQuestionCount: 30,
  maxExamAttempts: 3,
  attemptResumeHours: 24,
  // Nach Ausschöpfen der inkludierten Versuche: Nachprüfungsgebühr je Teilnehmer.
  // Freischaltung erfolgt derzeit manuell (Versuchs-Reset durch Firmen-Admin/Superadmin,
  // auditiert); Online-Zahlung ist als Erweiterung dokumentiert (docs/TODO.md).
  examRetakeFeeEur: 99,
  // Rabatt bei Jahreszahlung, je Plan-Key (Anzeige Preisseite; Abrechnung manuell).
  annualDiscountPercent: { BASIC: 10, BUSINESS: 15 } as Record<string, number>,
  // Zertifikatstitel je Kurs (i18n-Key); Fallback: certificate.title.
  courseCertificateTitleKeys: {
    "ki-kompetenz-basic": "certificate.title",
    "ki-verantwortliche-beauftragte": "certificate.titleOfficer",
    "richtig-prompten": "certificate.titlePrompting",
  } as Record<string, string>,
  // Feature-Flags für Roadmap-Funktionen: "planned" | "beta" | "live".
  // Steuert Status-Badges auf öffentlichen Feature-Seiten — nie automatisch
  // auf "live" setzen, solange die Funktion nicht implementiert ist.
  featureFlags: {
    kiKompetenzReview: "planned",
  } as Record<string, "planned" | "beta" | "live">,
  weakCategoryThreshold: 60, // < 60 % je Kategorie => Nachschulung empfohlen
  enableDarkMode: true,
  enableCompanyLogoOnCertificates: true,
  certificateNumberPrefix: "CERT",
  // Getakteter Review-Workflow (docs/STYLEGUIDE_HANDBUCH.md): Prüfzyklus + Tages-Takt.
  contentReviewCycleMonths: 6,
  contentReviewMaxPerDay: 3,
} as const;

export type SupportedLocale = (typeof appConfig.supportedLocales)[number];

/** Firmendaten lt. Impressum www.hainan.at/kontakt.html#impressum (geprüft 2026-07-06). */
export const legalProfileSeed = {
  legalName: "Hainan Salzburg Consulting Co., Ltd.",
  chineseName: "海南萨尔茨堡咨询有限公司",
  address:
    "Raum D03, 1403, 14. Stock, Yaxi Business Building, Nr. 16 Haifu Road, Haifu Street, Meilan District, Haikou, Hainan 570000, Volksrepublik China",
  country: "Volksrepublik China",
  registrationNumber: "91460000MAK7X7K491",
  organisationCode: "MAK7X7K4-9",
  taxNumber: null as string | null,
  registeredCapital: "1.000.000 Yuan (RMB)",
  foundingDate: "10. März 2026",
  registrationAuthority: "Marktaufsichtsbehörde Hainan (海南省市场监督管理局)",
  email: "info@ki-nachweis.at",
  website: "https://www.hainan.at",
  representativeName: "Sascha Morocutti",
  privacyContactEmail: "info@ki-nachweis.at",
  imprintSourceUrl: "https://www.hainan.at/kontakt.html#impressum",
  lastCheckedAt: "2026-07-06",
};
