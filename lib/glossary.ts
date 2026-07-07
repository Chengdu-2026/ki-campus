/**
 * Zentrales Abkürzungs-Glossar für öffentliche Seiten.
 * Regel (docs/AGENT_HANDOVER.md): Überall dort, wo Abkürzungen in Überschriften
 * vorkommen, wird das Glossar mit den passenden Einträgen angezeigt.
 * Erklärungen im Praxisstil — kurz, ehrlich, ohne Fachchinesisch.
 */

export interface GlossaryEntry {
  /** Abkürzung bzw. Kurzbegriff, so wie er in Überschriften vorkommt */
  term: string;
  /** Ausgeschriebene Langform (falls vorhanden) */
  longForm?: string;
  /** Erklärung in einfacher Sprache */
  explanation: string;
  /** Erkennungsmuster in Überschriften (Wortgrenzen beachten) */
  pattern: RegExp;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "KI",
    longForm: "Künstliche Intelligenz",
    explanation:
      "Software, die aus Daten lernt statt stur Regeln abzuarbeiten — und deshalb Texte schreiben, Bilder erzeugen oder Muster erkennen kann. Bekannte Beispiele: ChatGPT, Microsoft Copilot, Gemini.",
    pattern: /\bKI\b/,
  },
  {
    term: "LLM",
    longForm: "Large Language Model (großes Sprachmodell)",
    explanation:
      "Die Technik hinter ChatGPT & Co.: ein Modell, das aus riesigen Textmengen gelernt hat, das jeweils wahrscheinlichste nächste Wort vorherzusagen. Darum klingen Antworten überzeugend — auch wenn sie inhaltlich falsch sind.",
    pattern: /\bLLMs?\b|Large Language Model/i,
  },
  {
    term: "GPAI",
    longForm: "General Purpose AI (KI mit allgemeinem Verwendungszweck)",
    explanation:
      "So nennt der EU AI Act KI-Modelle, die für viele verschiedene Aufgaben taugen — etwa die Modelle hinter ChatGPT. Für ihre Hersteller gelten eigene Pflichten.",
    pattern: /\bGPAI\b/,
  },
  {
    term: "Bias",
    longForm: "Verzerrung",
    explanation:
      "Systematische Schieflagen in KI-Ergebnissen, die aus einseitigen Trainingsdaten entstehen — z. B. wenn ein Bewerbungs-Tool bestimmte Gruppen schlechter bewertet. Klingt harmlos, kann aber diskriminieren.",
    pattern: /\bBias\b/i,
  },
  {
    term: "DSGVO",
    longForm: "Datenschutz-Grundverordnung",
    explanation:
      "Das europäische Datenschutzgesetz. Es gilt immer, wenn personenbezogene Daten verarbeitet werden — also auch, wenn du Kundendaten in ein KI-Tool eingibst.",
    pattern: /\bDSGVO\b/,
  },
  {
    term: "EU AI Act",
    longForm: "Europäische KI-Verordnung (Verordnung (EU) 2024/1689)",
    explanation:
      "Das erste umfassende KI-Gesetz der EU. Es teilt KI-Anwendungen nach Risiko ein — von verboten über hochriskant bis unkritisch — und verlangt in Art. 4 KI-Kompetenz für alle, die beruflich mit KI arbeiten.",
    pattern: /EU AI Act|AI Act/,
  },
  {
    term: "Art. 4",
    longForm: "Artikel 4 EU AI Act",
    explanation:
      "Der Artikel, um den es in dieser Schulung geht: Unternehmen müssen sicherstellen, dass ihre Mitarbeitenden ausreichende KI-Kompetenz haben — passend zu Rolle und Einsatzgebiet. Die Schulung dokumentiert genau das.",
    pattern: /Art\.\s?4|Artikel 4/,
  },
  {
    term: "2FA",
    longForm: "Zwei-Faktor-Authentifizierung",
    explanation:
      "Anmeldung mit zweitem Schutzfaktor zusätzlich zum Passwort — etwa einem Code vom Handy. Macht gestohlene Passwörter für Angreifer weitgehend wertlos.",
    pattern: /\b2FA\b/,
  },
  {
    term: "AVV",
    longForm: "Auftragsverarbeitungsvertrag",
    explanation:
      "Der Vertrag, den dein Unternehmen mit einem Dienstleister (z. B. KI-Anbieter) schließt, wenn dieser personenbezogene Daten im Auftrag verarbeitet. Ohne AVV kein datenschutzkonformer Einsatz.",
    pattern: /\bAVV\b/,
  },
  {
    term: "DSFA",
    longForm: "Datenschutz-Folgenabschätzung",
    explanation:
      "Eine vertiefte Risikoprüfung nach DSGVO, die vor besonders riskanten Datenverarbeitungen Pflicht ist — beim KI-Einsatz mit sensiblen Daten schnell relevant.",
    pattern: /\bDSFA\b/,
  },
  {
    term: "Deepfake",
    explanation:
      "Mit KI gefälschte Stimmen, Fotos oder Videos, die täuschend echt wirken — etwa ein Anruf, der klingt wie dein Chef. Werden für Betrug und Manipulation eingesetzt.",
    pattern: /Deepfakes?/i,
  },
  {
    term: "Phishing",
    explanation:
      "Betrugsmails oder -nachrichten, die dich zur Preisgabe von Passwörtern oder zu Zahlungen verleiten sollen. Mit KI werden sie fehlerfrei und persönlich zugeschnitten — die alten Erkennungsmerkmale reichen nicht mehr.",
    pattern: /Phishing/i,
  },
  {
    term: "Schatten-KI",
    explanation:
      "KI-Tools, die Mitarbeitende ohne Wissen und Freigabe des Unternehmens nutzen — oft mit privaten Konten. Gefährlich, weil niemand prüft, wo die Daten landen.",
    pattern: /Schatten-KI/i,
  },
  {
    term: "Prompt",
    explanation:
      "Deine Eingabe an ein KI-Tool — Frage, Anweisung oder Kontext. Je präziser der Prompt, desto brauchbarer das Ergebnis.",
    pattern: /\bPrompts?\b/i,
  },
  {
    term: "QM",
    longForm: "Qualitätsmanagement",
    explanation:
      "Systematische Sicherung von Qualität durch klare Abläufe, Kennzahlen und laufende Verbesserung — hier bezogen auf den KI-Einsatz im Unternehmen.",
    pattern: /\bQM\b/,
  },
];

/**
 * Findet alle Glossar-Einträge, deren Begriff in einer der übergebenen
 * Überschriften vorkommt. Reihenfolge wie im Glossar (stabil).
 */
export function glossaryForHeadings(headings: string[]): GlossaryEntry[] {
  const joined = headings.join("\n");
  return GLOSSARY.filter((entry) => entry.pattern.test(joined));
}
