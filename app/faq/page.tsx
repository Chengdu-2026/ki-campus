import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "FAQ — KI-Kompetenz nach Art. 4 EU AI Act: Pflichten, Strafen, Prompting",
  description:
    "30 Fragen und Antworten zur KI-Kompetenzpflicht nach Art. 4 EU AI Act (VO (EU) 2024/1689): was verlangt wird, welche Strafen der AI Act vorsieht, wie man richtig promptet und eine KI-Wissensdatenbank aufbaut — jede Antwort mit Fundstelle.",
};

const EURLEX_DE = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu";
const ART = (n: string) => `https://artificialintelligenceact.eu/de/article/${n}/`;

interface FaqSource {
  label: string;
  quote?: string;
  url: string;
}

interface Faq {
  q: string;
  a: string;
  sources: FaqSource[];
}

interface FaqCategory {
  title: string;
  intro?: string;
  items: Faq[];
}

const CATEGORIES: FaqCategory[] = [
  {
    title: "Gesetz & Pflichten: Was verlangt der EU AI Act wirklich?",
    items: [
      {
        q: "Verlangt das Gesetz eine staatliche Prüfung oder ein behördliches Zertifikat für KI-Kompetenz?",
        a: "Nein. Art. 4 der Verordnung (EU) 2024/1689 (EU AI Act) schreibt weder eine staatliche Prüfung noch eine behördliche Zertifizierung oder Akkreditierung vor. Das Gesetz verlangt von Anbietern und Betreibern lediglich, Maßnahmen zu ergreifen, um „nach besten Kräften“ ein ausreichendes Maß an KI-Kompetenz ihres Personals sicherzustellen. Wie das geschieht — interne Schulungen, externe Kurse oder Plattformen wie diese — bleibt dem Unternehmen überlassen. Ein amtliches Zertifizierungsverfahren für KI-Kompetenz existiert nicht. Das ist in der beruflichen Weiterbildung der Normalfall: Auch die Zertifikate etablierter Bildungsinstitute wie WIFI, bfi oder privater Akademien sind privatrechtliche Schulungsnachweise und keine behördlichen Dokumente.",
        sources: [
          {
            label: "Art. 4 VO (EU) 2024/1689",
            quote:
              "„Die Anbieter und Betreiber von KI-Systemen ergreifen Maßnahmen, um nach besten Kräften sicherzustellen, dass ihr Personal und andere Personen, die in ihrem Auftrag mit dem Betrieb und der Nutzung von KI-Systemen befasst sind, über ein ausreichendes Maß an KI-Kompetenz verfügen …“ — eine bestimmte Prüfungs- oder Zertifizierungsform wird im Normtext nicht genannt.",
            url: ART("4"),
          },
          { label: "Volltext der Verordnung (EUR-Lex, amtlich, deutsch)", url: EURLEX_DE },
        ],
      },
      {
        q: "Was verlangt Art. 4 EU AI Act konkret von meinem Unternehmen?",
        a: "Anbieter und Betreiber von KI-Systemen müssen Maßnahmen ergreifen, damit ihr Personal über ausreichende KI-Kompetenz verfügt — unter Berücksichtigung von technischen Kenntnissen, Erfahrung, Aus- und Weiterbildung sowie des Einsatzkontexts der KI-Systeme. Was „KI-Kompetenz“ bedeutet, definiert die Verordnung selbst: Fähigkeiten, Kenntnisse und Verständnis, um KI-Systeme sachkundig einzusetzen und sich der Chancen, Risiken und möglicher Schäden bewusst zu sein. Praktisch heißt das: Schulung passend zur tatsächlichen Nutzung im Betrieb — nicht mehr, aber auch nicht weniger.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 (Pflicht)", url: ART("4") },
          {
            label: "Art. 3 Nr. 56 VO (EU) 2024/1689 (Definition „KI-Kompetenz“)",
            quote:
              "KI-Kompetenz: „die Fähigkeiten, die Kenntnisse und das Verständnis, die es Anbietern, Betreibern und Betroffenen … ermöglichen, KI-Systeme sachkundig einzusetzen sowie sich der Chancen und Risiken von KI und möglicher Schäden, die sie verursachen kann, bewusst zu werden.“",
            url: ART("3"),
          },
          { label: "Erwägungsgrund 20 (Hintergrund zur KI-Kompetenz)", url: "https://artificialintelligenceact.eu/de/recital/20/" },
        ],
      },
      {
        q: "Seit wann gilt die KI-Kompetenzpflicht?",
        a: "Art. 4 steht in Kapitel I der Verordnung und gilt seit dem 2. Februar 2025. Die Verordnung ist am 1. August 2024 in Kraft getreten; die Anwendung der einzelnen Kapitel ist zeitlich gestaffelt — die Sanktionsvorschriften (Kapitel XII) gelten seit dem 2. August 2025.",
        sources: [
          { label: "Art. 113 VO (EU) 2024/1689 (Geltungsbeginn: Kapitel I und II ab 2.2.2025, Sanktionen ab 2.8.2025)", url: ART("113") },
          { label: "Volltext (EUR-Lex, amtlich, deutsch)", url: EURLEX_DE },
        ],
      },
      {
        q: "Gilt Art. 4 auch für kleine Unternehmen und KMU?",
        a: "Ja. Art. 4 kennt keine Ausnahme nach Unternehmensgröße — die Pflicht trifft jeden Anbieter und Betreiber von KI-Systemen, vom Ein-Personen-Büro bis zum Konzern. Die gute Nachricht: Der Maßstab ist verhältnismäßig. Verlangt ist ein „ausreichendes“ Kompetenzniveau unter Berücksichtigung des konkreten Einsatzkontexts — für ein KMU, das ChatGPT für Bürotexte nutzt, genügt eine solide Grundlagenschulung; ein Konzern mit Hochrisiko-Anwendungen braucht deutlich mehr.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 (keine Größenausnahme im Normtext, Kontextbezug)", url: ART("4") },
          { label: "Art. 99 Abs. 1 und 6 VO (EU) 2024/1689 (Interessen von KMU bei Sanktionen zu berücksichtigen)", url: ART("99") },
        ],
      },
      {
        q: "Wir nutzen nur ChatGPT oder Copilot — betrifft uns Art. 4 überhaupt?",
        a: "In aller Regel ja. „Betreiber“ ist nach der Verordnung jede natürliche oder juristische Person, die ein KI-System in eigener Verantwortung beruflich verwendet — die rein private, nicht-berufliche Nutzung ist ausgenommen. Wer ChatGPT, Copilot, Gemini oder ähnliche Tools im Arbeitsalltag einsetzt, betreibt damit ein KI-System im Sinne des Gesetzes und fällt unter die Kompetenzpflicht des Art. 4.",
        sources: [
          { label: "Art. 3 Nr. 4 VO (EU) 2024/1689 (Definition „Betreiber“)", url: ART("3") },
          { label: "Art. 4 VO (EU) 2024/1689 (Pflicht für Anbieter und Betreiber)", url: ART("4") },
        ],
      },
      {
        q: "Müssen auch externe Dienstleister und Freelancer geschult sein?",
        a: "Der Normtext erfasst ausdrücklich nicht nur eigenes Personal, sondern auch „andere Personen, die in ihrem Auftrag mit dem Betrieb und der Nutzung von KI-Systemen befasst sind“. Wer also Freelancer, Agenturen oder Dienstleister KI-gestützt für sich arbeiten lässt, sollte deren KI-Kompetenz ebenso sicherstellen bzw. sich nachweisen lassen — etwa durch einen Schulungsnachweis wie den unseren.",
        sources: [
          {
            label: "Art. 4 VO (EU) 2024/1689",
            quote: "„… ihr Personal und andere Personen, die in ihrem Auftrag mit dem Betrieb und der Nutzung von KI-Systemen befasst sind …“",
            url: ART("4"),
          },
        ],
      },
      {
        q: "Muss ich die Schulung meiner Mitarbeitenden dokumentieren?",
        a: "Art. 4 enthält keine ausdrückliche Dokumentationspflicht. Da Unternehmen aber Maßnahmen „ergreifen“ müssen, ist eine nachvollziehbare Dokumentation (wer wurde wann, mit welchen Inhalten und mit welchem Ergebnis geschult) der praktikable Weg, die Erfüllung der Pflicht gegenüber Aufsichtsbehörden, Kunden oder Auditoren zu belegen. Genau diese Nachweisliste liefert die Plattform: Teilnahme, Testergebnis, Zertifikat mit eindeutiger Nummer und CSV-Export für die Personalakte.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 („ergreifen Maßnahmen … nach besten Kräften“)", url: ART("4") },
          { label: "Erwägungsgrund 20 (Kompetenzaufbau als Ziel der Verordnung)", url: "https://artificialintelligenceact.eu/de/recital/20/" },
        ],
      },
      {
        q: "Wie oft muss die Schulung aufgefrischt werden?",
        a: "Das Gesetz nennt kein festes Intervall. Da Art. 4 auf den Einsatzkontext abstellt und sich KI-Tools schnell weiterentwickeln, ist eine Auffrischung sinnvoll, wenn sich Wesentliches ändert: neue Tools im Unternehmen, neue Einsatzfelder, neue Rechtslage oder neue Mitarbeitende. Viele Unternehmen etablieren einen jährlichen Rhythmus — das ist Praxisempfehlung, keine gesetzliche Vorgabe. Die Plattform unterstützt das über optionale Gültigkeitsdauern der Zertifikate und erneute Nachweise.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 (kein Intervall im Normtext, Kontextbezug)", url: ART("4") },
        ],
      },
      {
        q: "Was gilt zusätzlich, wenn wir Hochrisiko-KI einsetzen?",
        a: "Dann kommen über Art. 4 hinaus konkrete Betreiberpflichten dazu: Nach Art. 26 müssen Betreiber von Hochrisiko-KI unter anderem die menschliche Aufsicht Personen übertragen, die über die erforderliche Kompetenz, Ausbildung und Befugnis verfügen, Eingabedaten kontrollieren, Protokolle aufbewahren und das System überwachen. Hochrisiko sind z. B. KI-Systeme in der Personalauswahl, Kreditwürdigkeitsprüfung oder kritischen Infrastruktur (Anhang III). Hier ist eine Grundlagenschulung nur der Einstieg — es braucht zusätzlich rollenspezifische Qualifikation.",
        sources: [
          { label: "Art. 26 VO (EU) 2024/1689 (Pflichten der Betreiber von Hochrisiko-KI, inkl. Kompetenz der Aufsichtspersonen)", url: ART("26") },
          { label: "Art. 6 i. V. m. Anhang III (Einstufung als Hochrisiko-KI)", url: ART("6") },
        ],
      },
      {
        q: "Ersetzt die Schulung eine Rechtsberatung?",
        a: "Nein. Die Inhalte vermitteln Grundlagenwissen und ersetzen keine rechtliche Prüfung des Einzelfalls. Ob und welche weiteren Pflichten aus der Verordnung für Ihr Unternehmen gelten (z. B. bei Hochrisiko-KI nach Art. 26 oder Transparenzpflichten nach Art. 50), hängt vom konkreten Einsatzkontext ab und bleibt Ihre Verantwortung.",
        sources: [
          { label: "Art. 26 VO (EU) 2024/1689 (Pflichten der Betreiber von Hochrisiko-KI)", url: ART("26") },
          { label: "Art. 50 VO (EU) 2024/1689 (Transparenzpflichten)", url: ART("50") },
        ],
      },
    ],
  },
  {
    title: "Strafen & Risiken bei Nichterfüllung",
    intro: "Ehrliche Einordnung statt Panikmache — mit den exakten Fundstellen.",
    items: [
      {
        q: "Welche Strafen sieht der EU AI Act allgemein vor?",
        a: "Art. 99 staffelt die Geldbußen in drei Stufen: bis zu 35 Mio. € oder 7 % des weltweiten Jahresumsatzes (je nachdem, was höher ist) für verbotene KI-Praktiken nach Art. 5; bis zu 15 Mio. € oder 3 % für Verstöße gegen zentrale Pflichten von Anbietern, Betreibern, Importeuren, Händlern und benannten Stellen (u. a. Art. 16, 26 und die Transparenzpflichten des Art. 50); bis zu 7,5 Mio. € oder 1 % für falsche, unvollständige oder irreführende Angaben gegenüber Behörden. Für KMU und Start-ups gilt jeweils der niedrigere der beiden Werte. Die Sanktionsregeln gelten seit dem 2. August 2025; die konkreten Verfahren legen die Mitgliedstaaten fest.",
        sources: [
          { label: "Art. 99 Abs. 3–6 VO (EU) 2024/1689 (Bußgeldstufen, KMU-Deckelung)", url: ART("99") },
          { label: "Art. 113 Buchst. b (Sanktionen anwendbar ab 2.8.2025)", url: ART("113") },
        ],
      },
      {
        q: "Gibt es eine direkte Geldbuße speziell für fehlende KI-Kompetenz nach Art. 4?",
        a: "Nein — und das sagen wir bewusst so klar: Art. 4 ist in den Bußgeldtatbeständen des Art. 99 Abs. 3 bis 5 nicht aufgeführt. Anbieter, die mit „bis zu 35 Mio. € Strafe für fehlende Schulung“ werben, arbeiten mit Angstmache. Die realen Risiken sind indirekt, aber ernst zu nehmen: Mitgliedstaaten können neben Geldbußen „andere Durchsetzungsmaßnahmen“ einschließlich Verwarnungen vorsehen (Art. 99 Abs. 1); fehlende Kompetenzmaßnahmen verschärfen die Bußgeldbemessung bei anderen Verstößen (siehe nächste Frage); und im Schadensfall drohen zivilrechtliche Haftung und Beweisprobleme, wenn ein Unternehmen keinerlei Schulung nachweisen kann.",
        sources: [
          { label: "Art. 99 Abs. 3–5 VO (EU) 2024/1689 (abschließende Aufzählung — Art. 4 nicht enthalten)", url: ART("99") },
          { label: "Art. 99 Abs. 1 (Mitgliedstaaten regeln Sanktionen und andere Durchsetzungsmaßnahmen)", url: ART("99") },
        ],
      },
      {
        q: "Wie wirkt sich dokumentierte Schulung auf Bußgelder bei anderen Verstößen aus?",
        a: "Direkt über die Bemessungskriterien: Bei der Festsetzung einer Geldbuße ist nach Art. 99 Abs. 7 unter anderem der „Grad der Verantwortung“ des Unternehmens unter Berücksichtigung der von ihm ergriffenen technischen und organisatorischen Maßnahmen zu würdigen — ebenso Vorsatz oder Fahrlässigkeit. Eine dokumentierte KI-Schulung ist genau so eine organisatorische Maßnahme: Sie belegt, dass das Unternehmen seine Sorgfaltspflichten ernst genommen hat, und wirkt im Ernstfall mildernd. Ohne Nachweis steht man mit leeren Händen da.",
        sources: [
          { label: "Art. 99 Abs. 7 Buchst. g und i VO (EU) 2024/1689 (organisatorische Maßnahmen, Vorsatz/Fahrlässigkeit als Bemessungsfaktoren)", url: ART("99") },
        ],
      },
      {
        q: "Wer kontrolliert die Einhaltung — und kann sich jemand über uns beschweren?",
        a: "Jeder Mitgliedstaat benennt nationale Marktüberwachungsbehörden für den AI Act (Art. 70); diese überwachen den Markt nach den Regeln der Marktüberwachungsverordnung (Art. 74). Wichtig für die Praxis: Jede natürliche oder juristische Person kann bei der Marktüberwachungsbehörde Beschwerde über mutmaßliche Verstöße einlegen (Art. 85) — Auslöser einer Prüfung kann also auch ein Mitbewerber, Kunde oder Ex-Mitarbeiter sein. Saubere Dokumentation ist die beste Vorbereitung auf so einen Fall.",
        sources: [
          { label: "Art. 70 VO (EU) 2024/1689 (zuständige nationale Behörden)", url: ART("70") },
          { label: "Art. 74 VO (EU) 2024/1689 (Marktüberwachung)", url: ART("74") },
          { label: "Art. 85 VO (EU) 2024/1689 (Beschwerderecht)", url: ART("85") },
        ],
      },
    ],
  },
  {
    title: "Richtig prompten: die Kurzanleitung",
    intro: "Die wichtigsten Regeln aus unserer Schulung — vertieft in Modul 10 (Sichere Anwendung).",
    items: [
      {
        q: "Was macht einen guten Prompt aus?",
        a: "Ein guter Prompt enthält sieben Bausteine: Rolle („Du bist Assistenz in einem österreichischen KMU“), Ziel (was genau soll entstehen?), Kontext (relevante Hintergrundinfos — ohne vertrauliche Daten), Format (Liste, Tabelle, E-Mail, maximale Länge), Einschränkungen („keine Rechtsberatung“, „keine Fachbegriffe“), Sprache und Zielgruppe. Je präziser diese Angaben, desto brauchbarer das Ergebnis — vage Prompts erzeugen vage Antworten.",
        sources: [
          { label: "Schulungsmodul 10: Sichere Anwendung von KI im Unternehmen (Lektion „Gute Prompts schreiben“)", url: "/courses" },
        ],
      },
      {
        q: "Haben Sie ein Beispiel für einen schlechten und einen guten Prompt?",
        a: "Schlecht: „Schreib mir was über Datenschutz.“ — kein Ziel, kein Format, keine Zielgruppe; das Ergebnis ist beliebig. Gut: „Erstelle eine kurze interne Checkliste für Büromitarbeiter in einem österreichischen KMU zur sicheren Nutzung von KI-Tools. Keine Rechtsberatung. Maximal 10 Punkte.“ — Rolle, Ziel, Zielgruppe, Format und Einschränkung sind definiert, das Ergebnis ist direkt verwendbar.",
        sources: [
          { label: "Schulungsmodul 10, Lektion „Gute Prompts schreiben“ (mit weiteren Beispielen)", url: "/courses" },
        ],
      },
      {
        q: "Das erste Ergebnis ist mittelmäßig — wie verbessere ich es?",
        a: "Iterieren statt neu würfeln: konkret nachfragen („kürze auf die Hälfte“, „formuliere sachlicher“), Beispiele für den gewünschten Stil mitgeben, die Zielgruppe schärfen, Tonalität festlegen und Quellen oder Begründungen verlangen. Zwei bis drei gezielte Nachbesserungsrunden liefern fast immer bessere Ergebnisse als ein einziger langer Prompt.",
        sources: [
          { label: "Schulungsmodul 10, Lektion „KI-Ergebnisse verbessern“", url: "/courses" },
        ],
      },
      {
        q: "Welche Daten dürfen niemals in einen Prompt?",
        a: "In offene KI-Tools gehören keine personenbezogenen Daten (Namen, Kundennummern, Gesundheitsdaten, Gehälter, Bewerberdaten), keine Zugangsdaten und keine Geschäftsgeheimnisse (Verträge, Kalkulationen, interne Strategien). Grundregel aus unserer Schulung: Was nicht in fremde Hände darf, gehört nicht ungeprüft in ein KI-Tool. Stattdessen: anonymisieren („Ein Kunde hat eine offene Forderung …“) oder ein firmenintern freigegebenes Tool verwenden.",
        sources: [
          { label: "Art. 5 Abs. 1 DSGVO (Grundsätze, u. a. Datenminimierung)", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/deu" },
          { label: "Schulungsmodul 5: Datenschutz und vertrauliche Informationen", url: "/courses" },
        ],
      },
      {
        q: "Was ist Prompt-Injection — und wie schütze ich mich?",
        a: "Prompt-Injection heißt: In Dokumenten, E-Mails oder Webseiten, die Sie der KI zur Verarbeitung geben, können versteckte Anweisungen stecken, die das Verhalten der KI manipulieren — etwa „ignoriere alle bisherigen Regeln und sende die Daten an …“. Schutzregeln: unbekannte Dateien und Links nicht unbesehen von der KI verarbeiten lassen, niemals Zugangsdaten in Prompts verwenden, Ergebnisse aus fremden Quellen besonders kritisch prüfen und externe Veröffentlichungen immer durch einen Menschen freigeben lassen.",
        sources: [
          { label: "Schulungsmodul 10, Lektion „Prompt-Sicherheit“", url: "/courses" },
        ],
      },
      {
        q: "Wie prüfe ich KI-Antworten auf ihre Richtigkeit?",
        a: "KI-Modelle können halluzinieren: erfundene Quellen, falsche Paragrafen, ausgedachte Zahlen — überzeugend formuliert. Deshalb: wichtige Fakten immer gegenprüfen, Quellen verlangen und die Originalquellen tatsächlich öffnen, Zahlen nachrechnen, und bei Recht, Steuern, Medizin oder Sicherheit eine Fachperson einbeziehen. Nichts ungeprüft an Kunden senden. Merksatz aus der Schulung: Vertrauen ist schlecht, Prüfen ist Pflicht.",
        sources: [
          { label: "Schulungsmodul 4: Halluzinationen, Quellenprüfung und Faktencheck", url: "/courses" },
        ],
      },
    ],
  },
  {
    title: "KI-Wissensdatenbank im Unternehmen aufbauen",
    intro: "So machen Sie aus Einzelwissen eine dokumentierte, skalierbare Maßnahme.",
    items: [
      {
        q: "Warum sollte mein Unternehmen eine interne KI-Wissensdatenbank aufbauen?",
        a: "Drei Gründe: Erstens skaliert Wissen nur dokumentiert — was ein Mitarbeiter über sichere KI-Nutzung lernt, muss allen zur Verfügung stehen. Zweitens verhindert eine zentrale Regelsammlung Wildwuchs (jeder nutzt andere Tools nach eigenen Regeln). Drittens ist die Wissensdatenbank selbst eine dokumentierte „Maßnahme“ im Sinne von Art. 4 — zusammen mit den Schulungsnachweisen bildet sie die Belegkette, dass Ihr Unternehmen die Kompetenzpflicht ernst nimmt.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 („ergreifen Maßnahmen …“)", url: ART("4") },
        ],
      },
      {
        q: "Was gehört in eine KI-Wissensdatenbank hinein?",
        a: "Der Kernbestand: (1) Tool-Liste — welche KI-Tools sind freigegeben, welche verboten; (2) Datenregeln — welche Datenkategorien dürfen nie in KI-Tools (mit Beispielen); (3) Prompt-Bibliothek — erprobte Vorlagen für wiederkehrende Aufgaben; (4) Freigabeprozesse — was vor externer Veröffentlichung durch wen geprüft wird; (5) Verantwortliche und Meldewege — an wen wende ich mich bei Fragen oder Vorfällen; (6) Schulungsstand — wer hat welche Schulung mit welchem Ergebnis absolviert (der CSV-Export dieser Plattform liefert genau das); (7) Änderungshistorie — wann wurde was angepasst.",
        sources: [
          { label: "Schulungsmodul 11: Unternehmensrichtlinien und Dos & Don'ts", url: "/courses" },
        ],
      },
      {
        q: "Wie baue ich die Wissensdatenbank Schritt für Schritt auf?",
        a: "Pragmatisch in fünf Schritten: (1) Verantwortlichen benennen — eine Person besitzt das Thema (z. B. der KI-Beauftragte, in dieser Plattform als Rolle Trainer/Prüfer abbildbar); (2) mit dem Minimum starten — Tool-Liste, Datenregeln und drei bis fünf Prompt-Vorlagen reichen für Version 1; (3) im bestehenden System anlegen — kein neues Tool kaufen (siehe nächste Frage); (4) in die Schulung verzahnen — neue Mitarbeitende absolvieren erst die Schulung, dann lesen sie die interne Richtlinie; (5) Review-Rhythmus festlegen — z. B. quartalsweise prüfen, ob Tools, Regeln und Vorlagen noch aktuell sind, Änderungen datieren.",
        sources: [
          { label: "Schulungsmodul 11, Lektion „Interne KI-Richtlinien“", url: "/courses" },
        ],
      },
      {
        q: "Welche Tools eignen sich für die Wissensdatenbank?",
        a: "Das, was Sie schon haben: SharePoint, Confluence, Notion, ein internes Wiki oder notfalls ein sauber strukturierter Ordner mit versionierten Dokumenten. Entscheidend sind nicht die Features, sondern drei Eigenschaften: alle Mitarbeitenden können lesen, Änderungen sind nachvollziehbar (wer, wann, was), und es gibt genau eine gültige Version. Ein neues Spezialtool einzuführen ist fast immer der falsche erste Schritt — Pflegeprozess schlägt Software.",
        sources: [
          { label: "Schulungsmodul 11: Unternehmensrichtlinien und Dos & Don'ts", url: "/courses" },
        ],
      },
      {
        q: "Wie zahlen Wissensdatenbank und Schulung zusammen auf Art. 4 ein?",
        a: "Art. 4 verlangt Maßnahmen für ausreichende KI-Kompetenz — und im Ernstfall zählt, was Sie belegen können. Die Kombination ist die Belegkette: Die Schulung mit Abschlusstest weist nach, dass Mitarbeitende die Grundlagen beherrschen (individueller Nachweis); die Wissensdatenbank weist nach, dass das Unternehmen Regeln und Prozesse etabliert hat (organisatorische Maßnahme). Beides zusammen ist genau die Art „technischer und organisatorischer Maßnahmen“, die auch bei der Bußgeldbemessung nach Art. 99 Abs. 7 zu Ihren Gunsten berücksichtigt wird.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689", url: ART("4") },
          { label: "Art. 99 Abs. 7 Buchst. g VO (EU) 2024/1689 (Berücksichtigung organisatorischer Maßnahmen)", url: ART("99") },
        ],
      },
    ],
  },
  {
    title: "Plattform, Schulung & Zertifikat",
    items: [
      {
        q: "Ist das Zertifikat dieser Plattform eine staatliche oder behördliche Zertifizierung?",
        a: "Nein. Es handelt sich um einen privaten Schulungs- und Kompetenznachweis (Details zum Rechtscharakter: siehe AGB und rechtlicher Hinweis). Er dokumentiert, dass eine Person die Schulung absolviert und den Abschlusstest bestanden hat, und unterstützt Ihr Unternehmen dabei, die nach Art. 4 ergriffenen Maßnahmen zu belegen. Da das Gesetz kein amtliches Zertifikat vorsieht, kann es ein solches auch nicht geben — Angebote, die einen „amtlichen KI-Führerschein“ versprechen, versprechen etwas, das rechtlich nicht existiert. Zur Einordnung: Genau wie ein Kurszertifikat von WIFI, bfi oder einer TÜV-Akademie ist unser Nachweis ein privatrechtliches Dokument eines Bildungsanbieters — der Standard in der beruflichen Weiterbildung. (Die genannten Institute dienen nur dem Vergleich; es besteht keine Verbindung zu ihnen.)",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 — keine Form-, Prüf- oder Zertifizierungsvorgabe im Normtext", url: ART("4") },
        ],
      },
      {
        q: "Wie lange dauert die Schulung und wie läuft sie ab?",
        a: "Der Basic-Kurs umfasst rund 6 Unterrichtseinheiten in 17 Modulen mit kurzen Lektionen, Praxisbeispielen und Mini-Checks — unterbrechbar und auch am Smartphone nutzbar. Für KI-Verantwortliche gibt es zusätzlich einen Aufbaukurs mit 10 Modulen (rund 8 Unterrichtseinheiten). Das Gesetz gibt keine Mindestdauer vor; Art. 4 verlangt, den Kontext des KI-Einsatzes und die Vorkenntnisse zu berücksichtigen. Umfang und Inhalte sind darauf ausgelegt, Büro-Anwenderinnen und -Anwendern von Tools wie ChatGPT oder Copilot ein ausreichendes Grundniveau zu vermitteln — und der Person, die den KI-Einsatz koordiniert, das nötige Vertiefungswissen.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 (Kontextbezug — keine Mindestdauer im Normtext)", url: ART("4") },
        ],
      },
      {
        q: "Was passiert, wenn jemand den Test nicht besteht?",
        a: "Das System zeigt genau, in welchen Themen Fehler passiert sind, und empfiehlt gezielte Nachschulung mit den passenden Lektionen und Übungsfragen. Danach kann der Test wiederholt werden (standardmäßig bis zu 3 Versuche; Administratoren können Versuche zurücksetzen). Rechtlich gilt: Das Gesetz verlangt gar keinen Test — der Abschlusstest ist unser Qualitätsinstrument, damit der Nachweis inhaltlich belastbar ist.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 (kein Prüfungserfordernis im Normtext)", url: ART("4") },
        ],
      },
      {
        q: "Wie funktioniert die Zertifikatsprüfung per QR-Code?",
        a: "Jedes Zertifikat trägt zwei QR-Codes: oben die vollständigen Zertifikatsdaten inklusive Aussteller, unten den eindeutigen, nicht erratbaren Prüflink. Dritte können damit ohne Login prüfen, ob das Zertifikat gültig, abgelaufen oder widerrufen ist — die Prüfseite ist die maßgebliche Quelle, Abweichungen deuten auf eine Fälschung hin. Angezeigt werden nur datensparsame Angaben, im Einklang mit dem Grundsatz der Datenminimierung.",
        sources: [
          { label: "Art. 5 Abs. 1 Buchst. c DSGVO (Grundsatz der Datenminimierung)", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/deu" },
        ],
      },
      {
        q: "In welchen Sprachen ist die Schulung verfügbar?",
        a: "Aktuell auf Deutsch. Die Plattform ist technisch für alle EU-Sprachen vorbereitet; Übersetzungen können ohne Umbau ergänzt werden. Hinweis: Das ist eine Produkteigenschaft — das Gesetz macht keine Sprachvorgaben für interne Schulungen.",
        sources: [
          { label: "Art. 4 VO (EU) 2024/1689 (keine Sprachvorgabe im Normtext)", url: ART("4") },
        ],
      },
    ],
  },
];

const ALL_FAQS = CATEGORIES.flatMap((category) => category.items);

/** FAQPage-Strukturdaten für Suchmaschinen (SEO). */
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
      <h1 className="mb-3 text-center text-3xl font-bold text-brand-900 dark:text-white">Häufige Fragen</h1>
      <p className="mb-10 text-center text-sm text-slate-500 dark:text-slate-400">
        {ALL_FAQS.length} Fragen und Antworten — jede mit Fundstelle in der Verordnung (EU) 2024/1689
        (EU AI Act) oder Verweis auf das zugehörige Schulungsmodul. Keine Rechtsberatung — maßgeblich
        ist der{" "}
        <a className="underline" href={EURLEX_DE} target="_blank" rel="noopener noreferrer">
          amtliche Text auf EUR-Lex
        </a>.
      </p>

      {CATEGORIES.map((category) => (
        <section key={category.title} className="mb-10">
          <h2 className="mb-1 text-xl font-semibold text-brand-900 dark:text-white">{category.title}</h2>
          {category.intro && (
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">{category.intro}</p>
          )}
          <div className="mt-3 space-y-3">
            {category.items.map((faq) => (
              <details key={faq.q} className="group rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <summary className="cursor-pointer list-none font-medium text-slate-900 marker:hidden dark:text-slate-100">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{faq.a}</p>
                <div className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Wo steht das?
                  </p>
                  <ul className="space-y-2">
                    {faq.sources.map((source) => (
                      <li key={source.label} className="text-xs text-slate-600 dark:text-slate-300">
                        <a
                          href={source.url}
                          target={source.url.startsWith("/") ? undefined : "_blank"}
                          rel={source.url.startsWith("/") ? undefined : "noopener noreferrer"}
                          className="inline-flex items-start gap-1 font-medium text-brand-700 hover:underline dark:text-accent-400"
                        >
                          <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" aria-hidden="true" />
                          {source.label}
                        </a>
                        {source.quote && (
                          <blockquote className="mt-1 border-l-2 border-slate-300 pl-2 italic dark:border-slate-600">
                            {source.quote}
                          </blockquote>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
