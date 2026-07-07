import type { SeedQuestion } from "./content-questions-1";

/**
 * Fragenpool Kurs 2 „KI-Verantwortliche & KI-Beauftragte", Teil 2/2.
 * Kategorien: RICHTLINIE_FREIGABE, DATENSCHUTZ_SICHERHEIT, VORFALL_MELDEPFLICHT,
 * LIEFERANTEN_VERTRAEGE, AUDIT_KENNZAHLEN.
 */
export const seedQuestionsOfficer2: SeedQuestion[] = [
  // ===== RICHTLINIE_FREIGABE (9) =====
  {
    text: "Warum gehören die freigegebenen Tools in eine Anlage und nicht in den Text der KI-Richtlinie?",
    options: [
      { text: "Die Toolliste ändert sich laufend – als Anlage kann sie aktualisiert werden, ohne die Richtlinie neu freigeben zu müssen", correct: true },
      { text: "Weil Anlagen rechtlich unverbindlich sind und niemand sie einhalten muss", correct: false },
      { text: "Weil Richtlinien maximal eine halbe Seite lang sein dürfen", correct: false },
      { text: "Damit die IT die Liste vor den Mitarbeitenden verstecken kann", correct: false },
    ],
    explanation:
      "Der Richtlinientext bleibt stabil, die dynamischen Teile (Toolliste, Checklisten) leben in Anlagen mit eigenem Pflegeprozess – so bleibt beides aktuell, ohne ständige Neu-Freigaben.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "LEICHT",
    lessonSlug: "off-richtlinie-erstellen",
    tags: ["Richtlinie", "Struktur"],
    practiceCase: false,
  },
  {
    text: "Die Rechtsabteilung liefert dir einen 22-seitigen Richtlinien-Entwurf in Juristendeutsch. Was tust du?",
    options: [
      { text: "Auf wenige verständliche Seiten mit Beispielen kondensieren und die Verständlichkeit mit echten Mitarbeitenden testen", correct: true },
      { text: "Unverändert veröffentlichen – juristische Präzision ist wichtiger als Verständlichkeit", correct: false },
      { text: "Den Entwurf ganz verwerfen und ohne Richtlinie weiterarbeiten", correct: false },
      { text: "Ihn nur an die Führungskräfte verteilen, der Rest braucht keine Regeln", correct: false },
    ],
    explanation:
      "Eine Regel, die niemand versteht, wird nicht befolgt – und dokumentiert nur, dass man es hätte wissen müssen. Kurz, konkret, mit Beispielen und Verständlichkeitstest; die juristische Prüfung bleibt Teil der Freigabe.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "off-richtlinie-erstellen",
    tags: ["Verständlichkeit", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Drei Monate lang ist kein einziger Tool-Freigabeantrag eingegangen. Wie deutest du das?",
    options: [
      { text: "Als Alarmsignal: Der Prozess wird höchstwahrscheinlich umgangen – Ursachen prüfen (zu langsam? zu unbekannt? zu bürokratisch?)", correct: true },
      { text: "Als Erfolg: Offenbar sind alle Bedarfe dauerhaft gedeckt", correct: false },
      { text: "Als Anlass, den Prozess mit mehr Formularfeldern gründlicher zu machen", correct: false },
      { text: "Als Beweis, dass KI im Unternehmen nicht mehr genutzt wird", correct: false },
    ],
    explanation:
      "In einer lebendigen KI-Landschaft gibt es laufend neue Tool-Wünsche. Null Anträge heißt fast immer: Die Leute arbeiten am Prozess vorbei – meist, weil er zu langsam, zu unbekannt oder zu abschreckend ist.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "off-freigabeprozess-gestalten",
    tags: ["Prozess-Gesundheit", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was gehört zu einer guten Ablehnung im Freigabeprozess?",
    options: [
      { text: "Eine nachvollziehbare Begründung und möglichst eine freigegebene Alternative für den Bedarf", correct: true },
      { text: "Ein einzeiliges \"Nein\" ohne weitere Erklärung", correct: false },
      { text: "Die öffentliche Nennung des Antragstellers als Warnung", correct: false },
      { text: "Eine Bedenkzeit von mindestens einem Jahr", correct: false },
    ],
    explanation:
      "Eine Ablehnung ohne Begründung und Alternative treibt den Bedarf in die Schatten-KI. Wer erklärt und einen gangbaren Weg zeigt, hält die Governance glaubwürdig und die Datenflüsse sichtbar.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "LEICHT",
    lessonSlug: "off-freigabeprozess-gestalten",
    tags: ["Ablehnung"],
    practiceCase: false,
  },
  {
    text: "Ein Projektteam braucht für einen Kundenauftrag zwingend ein nicht freigegebenes Spezial-Tool. Wie löst du das sauber?",
    options: [
      { text: "Dokumentierte, befristete Ausnahme mit kompensierenden Auflagen, Entscheider und Wiedervorlage", correct: true },
      { text: "Stillschweigend wegsehen – der Kunde ist wichtig", correct: false },
      { text: "Kategorisch ablehnen, auch wenn der Auftrag daran scheitert", correct: false },
      { text: "Das Team bitten, das Tool heimlich über Privatkonten zu nutzen", correct: false },
    ],
    explanation:
      "Legitime Sonderbedarfe löst die dokumentierte Ausnahme: Grund, Auflagen (z. B. nur Projektdaten, Löschung nach Ende), Entscheider, Befristung, Wiedervorlage. Sie stärkt die Regel – stilles Wegsehen höhlt sie aus.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "off-ausnahmen-eskalationen",
    tags: ["Ausnahme", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Die Geschäftsleitung entscheidet in einer Eskalation gegen deine dokumentierte Empfehlung. Wie ordnest du das ein?",
    options: [
      { text: "Legitim: Sie trägt die Verantwortung und entscheidet – deine abweichende Empfehlung bleibt dokumentiert, die Verantwortungsteilung ist nachvollziehbar", correct: true },
      { text: "Inakzeptabel: Du solltest aus Protest alle KI-Tools sperren", correct: false },
      { text: "Ein Grund, die Dokumentation nachträglich an die Entscheidung anzupassen", correct: false },
      { text: "Ein Zeichen, dass du künftig keine Empfehlungen mehr abgeben solltest", correct: false },
    ],
    explanation:
      "Governance heißt nicht, dass die KI-Verantwortliche immer Recht bekommt: Du berätst, die Leitung entscheidet. Entscheidend ist die dokumentierte Empfehlung – sie hält die Verantwortungsteilung sauber und nachvollziehbar.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "SCHWER",
    lessonSlug: "off-ausnahmen-eskalationen",
    tags: ["Eskalation", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Mitarbeiter meldet selbst, dass er versehentlich gegen die Datenregel verstoßen hat. Ein anderer hat denselben Verstoß monatelang bewusst verheimlicht. Wie behandelst du beide Fälle?",
    options: [
      { text: "Unterschiedlich: Die ehrliche Selbstmeldung bleibt sanktionsfrei, das vorsätzliche Verheimlichen hat Konsequenzen", correct: true },
      { text: "Identisch: Verstoß ist Verstoß, beide werden gleich bestraft", correct: false },
      { text: "Beide bleiben folgenlos, um Konflikte zu vermeiden", correct: false },
      { text: "Nur der Selbstmelder wird bestraft – er hat es ja zugegeben", correct: false },
    ],
    explanation:
      "Wer ehrliche Meldungen bestraft, beendet die Meldekultur. Wer Vertuschung folgenlos lässt, macht Regeln optional. Die Differenzierung – Ehrlichkeit straffrei, Vorsatz mit Konsequenzen – hält beides im Gleichgewicht.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "off-ausnahmen-eskalationen",
    tags: ["Meldekultur", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Der Abteilungsleiter Vertrieb verschickt selbst regelmäßig ungeprüfte KI-Texte an Kunden – entgegen der Richtlinie. Warum ist das besonders kritisch?",
    options: [
      { text: "Führungskräfte prägen das Verhalten ihrer Teams: Ihr Vorbild entscheidet, ob die Richtlinie in der Abteilung gilt oder Makulatur ist", correct: true },
      { text: "Es ist weniger kritisch – Führungskräfte stehen über den Regeln", correct: false },
      { text: "Es ist nur kritisch, wenn ein Kunde sich beschwert", correct: false },
      { text: "Es ist unkritisch, solange die Texte gut klingen", correct: false },
    ],
    explanation:
      "Mitarbeitende folgen dem, was ihre Führungskraft tut, nicht dem Intranet-Text. Sonderrecht nach oben zerstört die Glaubwürdigkeit der gesamten Governance – Führungskräfte-Verstöße brauchen dieselbe konsequente Behandlung.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "off-richtlinie-leben",
    tags: ["Vorbild", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wie prüfst du nach sechs Monaten am einfachsten, ob die KI-Richtlinie tatsächlich \"lebt\"?",
    options: [
      { text: "Zufällig ausgewählte Mitarbeitende nach den Kernregeln fragen und Indikatoren wie Anträge und Meldungen ansehen", correct: true },
      { text: "Prüfen, ob die PDF-Datei noch im Intranet liegt", correct: false },
      { text: "Die Anzahl der Seiten der Richtlinie zählen", correct: false },
      { text: "Warten, bis der erste große Vorfall die Antwort liefert", correct: false },
    ],
    explanation:
      "Der Realitätscheck ist simpel: Können zufällig Befragte die Kernregeln sinngemäß nennen? Kommen Freigabeanträge und Meldungen? Ein Dokument im Intranet beweist nichts – gelebte Regeln zeigen sich im Verhalten.",
    category: "RICHTLINIE_FREIGABE",
    difficulty: "LEICHT",
    lessonSlug: "off-richtlinie-leben",
    tags: ["Realitätscheck"],
    practiceCase: false,
  },
  // ===== DATENSCHUTZ_SICHERHEIT (9) =====
  {
    text: "Gilt die DSGVO neben dem EU AI Act weiter?",
    options: [
      { text: "Ja – beide gelten parallel; für die meisten KMU sind die Datenschutzfragen sogar der praktisch wichtigste Teil des KI-Einsatzes", correct: true },
      { text: "Nein – der AI Act hat die DSGVO vollständig ersetzt", correct: false },
      { text: "Nur bei Hochrisiko-Systemen", correct: false },
      { text: "Nur für Unternehmen ohne Datenschutzbeauftragten", correct: false },
    ],
    explanation:
      "AI Act und DSGVO gelten nebeneinander: Der AI Act regelt KI-spezifische Pflichten, die DSGVO jede Verarbeitung personenbezogener Daten – und Personenbezug steckt in fast jedem Büroprozess.",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "off-dsgvo-schnittstellen",
    tags: ["DSGVO", "AI Act"],
    practiceCase: false,
  },
  {
    text: "Vor der Einführung eines KI-Tools mit Kundendatenbezug: Welche fünf Fragen klärst du mit dem Datenschutz?",
    options: [
      { text: "Personenbezug? Rechtsgrundlage? Datenfluss (Ort, Training)? Speicherdauer? Einhaltung der Grundsätze (v. a. Datenminimierung, Transparenz)?", correct: true },
      { text: "Farbe? Preis? Logo? Ladezeit? Anzahl der Sprachen?", correct: false },
      { text: "Nur: Hat der Anbieter eine schöne Website?", correct: false },
      { text: "Keine – Datenschutzfragen stellen sich erst nach dem Go-live", correct: false },
    ],
    explanation:
      "Die Fünf-Fragen-Prüfung vor jedem Go-live: Werden personenbezogene Daten verarbeitet, auf welcher Rechtsgrundlage, wohin fließen sie (inkl. Trainingsnutzung), wie lange werden sie gespeichert, und sind die DSGVO-Grundsätze eingehalten?",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "off-dsgvo-schnittstellen",
    tags: ["Prüfschema"],
    practiceCase: false,
  },
  {
    text: "Ein KI-Anbieter weicht der Frage nach einem Auftragsverarbeitungsvertrag (AVV) wiederholt aus. Was bedeutet das für deine Prüfung?",
    options: [
      { text: "Faktisch das Aus für personenbezogene Daten: Ohne AVV fehlt die vertragliche Grundlage der Auftragsverarbeitung", correct: true },
      { text: "Kein Problem – ein freundliches E-Mail des Supports ersetzt den AVV", correct: false },
      { text: "Der AVV ist nur bei Behörden nötig, Unternehmen brauchen ihn nicht", correct: false },
      { text: "Man kann trotzdem starten und den AVV in ein, zwei Jahren nachreichen", correct: false },
    ],
    explanation:
      "Verarbeitet ein Anbieter personenbezogene Daten im Auftrag, ist der AVV Pflicht. Seriöse Business-Angebote haben ihn standardmäßig – wer ausweicht, disqualifiziert sich für alles mit Personenbezug.",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "off-avv-drittland",
    tags: ["AVV", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum reicht beim Drittlandtransfer der Blick auf den Serverstandort nicht aus?",
    options: [
      { text: "Auch Fernzugriffe (z. B. Support aus Drittländern) und Unterauftragnehmer können Transfers auslösen – die ganze Kette zählt", correct: true },
      { text: "Weil Serverstandorte grundsätzlich geheim sind", correct: false },
      { text: "Er reicht aus – nur der Serverstandort ist relevant", correct: false },
      { text: "Weil Daten in der Cloud keinem Land zugeordnet werden können und daher frei fließen dürfen", correct: false },
    ],
    explanation:
      "Ein EU-Server nützt wenig, wenn der Support aus einem Drittland zugreift oder Unterauftragnehmer dort verarbeiten. Die Transferprüfung umfasst die gesamte Verarbeitungskette – die Fakten stehen in AVV-Anlagen und Transparenzdokumenten.",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "SCHWER",
    lessonSlug: "off-avv-drittland",
    tags: ["Drittland"],
    practiceCase: false,
  },
  {
    text: "Du übernimmst ein Bestandstool und stellst fest: Trainingsnutzung der Eingaben ist per Voreinstellung aktiv. Was tust du?",
    options: [
      { text: "Sofort deaktivieren (bzw. Business-Variante mit Trainingsausschluss), prüfen, was bereits geflossen ist, und den Fall dokumentieren", correct: true },
      { text: "Nichts – Voreinstellungen des Anbieters sind sicher gut gemeint", correct: false },
      { text: "Nur die neuen Mitarbeitenden informieren, die alten trifft es nicht mehr", correct: false },
      { text: "Das Tool heimlich weiterlaufen lassen und hoffen, dass es niemand merkt", correct: false },
    ],
    explanation:
      "Trainingsnutzung als Default ist eine klassische Konfigurations-Falle: deaktivieren bzw. vertraglich ausschließen, Ausmaß des bisherigen Datenflusses bewerten (ggf. mit Datenschutz), dokumentieren – und die Konfigurationsprüfung fest in die Freigabe aufnehmen.",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "off-tom-fuer-ki",
    tags: ["Konfiguration", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Mitarbeiter verlässt das Unternehmen. Welche KI-bezogene Lücke übersehen Offboarding-Prozesse am häufigsten?",
    options: [
      { text: "Aktive KI-Konten mit vollen Chatverläufen, die nicht gesperrt werden", correct: true },
      { text: "Die Rückgabe des Bürostuhls", correct: false },
      { text: "Das Löschen des E-Mail-Footers", correct: false },
      { text: "Die Abmeldung vom Kantinenplan", correct: false },
    ],
    explanation:
      "Der Ex-Mitarbeiter mit aktivem KI-Konto ist ein Klassiker: Zugriff auf monatelange Verläufe mit internen Daten. KI-Zugänge gehören in die Offboarding-Checkliste – am besten über zentrale Kontoverwaltung sofort sperrbar.",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "off-tom-fuer-ki",
    tags: ["Offboarding"],
    practiceCase: false,
  },
  {
    text: "Ein Kunde verlangt Auskunft und Löschung seiner Daten – auch aus euren KI-Tools. Was macht die vollständige Antwort möglich?",
    options: [
      { text: "Inventar und Verarbeitungsverzeichnis zeigen, wo Personendaten liegen; die geprüften Anbieter-Löschwege liefern Umsetzung und Nachweis", correct: true },
      { text: "Nichts – Daten in KI-Tools sind von Betroffenenrechten ausgenommen", correct: false },
      { text: "Eine pauschale Antwort: \"Wir nutzen keine KI\", auch wenn es nicht stimmt", correct: false },
      { text: "Das Abwarten, bis der Kunde die Anfrage vergisst", correct: false },
    ],
    explanation:
      "Betroffenenrechte scheitern bei KI fast immer an fehlender Übersicht. Wer Inventar, Verarbeitungsverzeichnis und dokumentierte Löschwege hat, kann vollständig Auskunft geben und Löschungen nachweisen – alle anderen improvisieren lückenhaft.",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "off-betroffenenrechte-ki",
    tags: ["Betroffenenrechte", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Eine Sachbearbeiterin \"prüft\" die automatischen KI-Ablehnungen von Anträgen, indem sie täglich hunderte Fälle im Sekundentakt bestätigt. Wo ist das Problem?",
    options: [
      { text: "Das ist keine echte menschliche Beteiligung: Bei Entscheidungen mit erheblicher Wirkung braucht es kompetente, informierte und tatsächlich entscheidungsbefugte Prüfung", correct: true },
      { text: "Kein Problem – Hauptsache, ein Mensch hat geklickt", correct: false },
      { text: "Das Problem ist nur die Ergonomie der vielen Klicks", correct: false },
      { text: "Sie sollte noch schneller klicken, um den Rückstau abzubauen", correct: false },
    ],
    explanation:
      "Formales Durchwinken erfüllt weder Art. 22 DSGVO noch die Hochrisiko-Aufsichtspflichten: Die menschliche Beteiligung muss echt sein – mit Zeit, Kompetenz, Information und der realen Möglichkeit, anders zu entscheiden.",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "SCHWER",
    lessonSlug: "off-betroffenenrechte-ki",
    tags: ["Automatisierte Entscheidung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum ist der vertragliche Trainingsausschluss auch für die Erfüllbarkeit von Löschverlangen wichtig?",
    options: [
      { text: "In Modelle eintrainierte Daten sind praktisch kaum rückholbar – was nie ins Training fließt, muss nie \"herausoperiert\" werden", correct: true },
      { text: "Er ist unwichtig – trainierte Modelle lassen sich per Knopfdruck bereinigen", correct: false },
      { text: "Weil Löschverlangen nur für Papierakten gelten", correct: false },
      { text: "Weil der Trainingsausschluss die Speicherkosten senkt", correct: false },
    ],
    explanation:
      "Gespeicherte Verläufe kann ein Anbieter löschen – in Modellgewichte eingeflossene Informationen praktisch nicht. Der Trainingsausschluss ist daher präventiver Betroffenenschutz: Das Löschproblem entsteht gar nicht erst.",
    category: "DATENSCHUTZ_SICHERHEIT",
    difficulty: "SCHWER",
    lessonSlug: "off-betroffenenrechte-ki",
    tags: ["Training", "Löschung"],
    practiceCase: false,
  },
  // ===== VORFALL_MELDEPFLICHT (9) =====
  {
    text: "Welche drei Fragen beantwortet die Erstbewertung (Triage) eines gemeldeten KI-Vorfalls?",
    options: [
      { text: "Personenbezug (Fristen!)? Läuft der Abfluss noch (stoppen!)? Wie groß ist der mögliche Schaden (Eskalation)?", correct: true },
      { text: "Wer ist schuld? Wer wusste davon? Wer wird bestraft?", correct: false },
      { text: "Welches Formular? Welche Schriftgröße? Welcher Verteiler?", correct: false },
      { text: "Ist es Freitag? Ist der Chef im Haus? Ist die Presse informiert?", correct: false },
    ],
    explanation:
      "Die Triage priorisiert: Bei Personenbezug sofort Datenschutz einbinden (72-Stunden-Frist), laufende Abflüsse zuerst stoppen, und die Schadenshöhe bestimmt die Eskalationsstufe – Schuldfragen gehören nicht in die Erstbewertung.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "MITTEL",
    lessonSlug: "off-vorfallsprozess-aufbauen",
    tags: ["Triage"],
    practiceCase: false,
  },
  {
    text: "Beim jährlichen Trockenlauf des Vorfallsprozesses stellt sich heraus: Die Vertretung der Datenschutzbeauftragten kennt den KI-Meldeweg nicht. Was ist der Wert dieser Übung?",
    options: [
      { text: "Genau das ist der Zweck: Lücken gefahrlos finden und schließen, bevor der echte Ernstfall sie aufdeckt", correct: true },
      { text: "Die Übung war ein Misserfolg und sollte nicht wiederholt werden", correct: false },
      { text: "Kein Wert – Trockenläufe sind Zeitverschwendung", correct: false },
      { text: "Der Wert liegt darin, die Vertretung öffentlich bloßzustellen", correct: false },
    ],
    explanation:
      "Trockenläufe decken Schwachstellen (Vertretungen, Erreichbarkeiten, Zuständigkeiten) auf, solange nichts brennt. Jede gefundene Lücke ist ein Gewinn – im Ernstfall hätte sie Stunden gekostet, während Fristen laufen.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "MITTEL",
    lessonSlug: "off-vorfallsprozess-aufbauen",
    tags: ["Übung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche Grundregel gilt für die Meldung von Datenschutzverletzungen an die Aufsichtsbehörde?",
    options: [
      { text: "Unverzüglich, möglichst binnen 72 Stunden ab Kenntnis – außer die Verletzung birgt voraussichtlich kein Risiko für Betroffene", correct: true },
      { text: "Innerhalb von 30 Tagen nach Abschluss der internen Untersuchung", correct: false },
      { text: "Nur auf ausdrückliche Nachfrage der Behörde", correct: false },
      { text: "Meldungen sind freiwillig und reine Imagepflege", correct: false },
    ],
    explanation:
      "Die 72-Stunden-Regel läuft ab Kenntnis der Verletzung. Auch die begründete Entscheidung, nicht zu melden, wird dokumentiert. Deshalb ist die schnelle interne Meldung so kritisch – sie erhält die Handlungsfähigkeit.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "LEICHT",
    lessonSlug: "off-meldepflichten-fristen",
    tags: ["72 Stunden", "DSGVO"],
    practiceCase: false,
  },
  {
    text: "Ein kompromittiertes KI-Konto mit Kundendaten wird entdeckt. Neben der Behördenmeldung: Welche weiteren Meldewege prüfst du?",
    options: [
      { text: "Vertragliche Informationspflichten gegenüber Kunden, die Cyberversicherung und ggf. sektorale Meldepflichten", correct: true },
      { text: "Keine – mit der Behördenmeldung ist alles erledigt", correct: false },
      { text: "Nur die Lokalzeitung, damit die Öffentlichkeit informiert ist", correct: false },
      { text: "Nur den Anbieter des KI-Tools, sonst niemanden", correct: false },
    ],
    explanation:
      "Viele B2B-Verträge enthalten Vorfalls-Informationspflichten mit engen Fristen, Versicherungen verlangen fristgerechte Notifikation (sonst wackelt die Deckung), und je nach Branche greifen sektorale Regeln. Die vorbereitete Meldepflichten-Übersicht spart im Ernstfall Tage.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "SCHWER",
    lessonSlug: "off-meldepflichten-fristen",
    tags: ["Meldewege", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum gehört ein Vorfall auch dann ins Register, wenn er glimpflich ausging?",
    options: [
      { text: "Beinahe-Fälle zeigen Muster und Lücken – das Register ist Frühwarnsystem, Nachweis und Verbesserungsquelle zugleich", correct: true },
      { text: "Er gehört nicht hinein – registriert wird nur echter Schaden", correct: false },
      { text: "Nur damit das Register voller aussieht", correct: false },
      { text: "Um die beteiligten Personen später belangen zu können", correct: false },
    ],
    explanation:
      "Drei einzeln harmlose Beinahe-Fälle können dasselbe Systemproblem zeigen. Ohne vollständiges Register (inkl. Beinahe-Fällen) fehlen dir Mustererkennung, Nachweisfähigkeit und die Basis für wirksame Maßnahmen.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "LEICHT",
    lessonSlug: "off-vorfallsprozess-aufbauen",
    tags: ["Register"],
    practiceCase: false,
  },
  {
    text: "Bei einem Vorfall waren Projektdaten von vier Kunden zeitweise einsehbar. Wie kommunizierst du extern richtig?",
    options: [
      { text: "Betroffene Kunden aktiv, ehrlich und aus einer Hand informieren: was bekannt ist, was es für sie bedeutet, was getan wird", correct: true },
      { text: "Abwarten, ob die Kunden es selbst bemerken", correct: false },
      { text: "Jedem Mitarbeiter freistellen, den Kunden seine persönliche Sicht zu schildern", correct: false },
      { text: "Pauschal \"alles unter Kontrolle\" melden, bevor die Fakten geprüft sind", correct: false },
    ],
    explanation:
      "Aktiv informieren bevor es Dritte tun, ehrlich auch über Unbekanntes, konkret bei Auswirkungen und Maßnahmen – und ausschließlich über die definierte Stelle. Verharmlosung und widersprüchliche Einzelaussagen richten mehr Schaden an als der Vorfall.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "MITTEL",
    lessonSlug: "off-krisenkommunikation",
    tags: ["Kommunikation", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was zerstört die interne Meldekultur am schnellsten?",
    options: [
      { text: "Öffentliche Schuldzuweisungen nach ehrlichen Meldungen", correct: true },
      { text: "Ein zu einfaches Meldeformular", correct: false },
      { text: "Dank an die meldende Person", correct: false },
      { text: "Die Aufnahme von Beinahe-Fällen ins Register", correct: false },
    ],
    explanation:
      "Eine einzige öffentliche Schuldzuweisung lehrt die gesamte Belegschaft: Melden ist gefährlich. Danach erfährst du von Problemen erst, wenn sie nicht mehr zu verbergen sind – der teuerste Zustand von allen.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "LEICHT",
    lessonSlug: "off-krisenkommunikation",
    tags: ["Meldekultur"],
    practiceCase: false,
  },
  {
    text: "In der Ursachenanalyse landest du bei \"Der Mitarbeiter war unaufmerksam\". Was verlangt die Methode jetzt?",
    options: [
      { text: "Weiterfragen: Warum war der Fehler so leicht möglich? Welche Prozess- oder Systemursache steckt dahinter, die das Unternehmen ändern kann?", correct: true },
      { text: "Abschließen – der Schuldige ist gefunden", correct: false },
      { text: "Den Mitarbeiter versetzen und den Fall schließen", correct: false },
      { text: "Eine Rundmail: \"Bitte alle besser aufpassen\"", correct: false },
    ],
    explanation:
      "\"Unaufmerksamkeit\" ist nie die Endstation: Die Warum-Kette gräbt weiter bis zur änderbaren Systemursache (fehlendes Tool, unklare Regel, fehlende Kontrolle). Appelle sind die schwächste Maßnahmenform.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "MITTEL",
    lessonSlug: "off-lessons-learned",
    tags: ["Ursachenanalyse", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Nach einem Vorfall stehen drei Maßnahmen zur Wahl. Welche ist nach der Wirksamkeits-Hierarchie am stärksten?",
    options: [
      { text: "Ein technischer Upload-Filter, der vertrauliche Dokumente automatisch blockiert", correct: true },
      { text: "Eine Erinnerungs-E-Mail an alle, künftig vorsichtiger zu sein", correct: false },
      { text: "Ein Aushang in der Teeküche", correct: false },
      { text: "Ein Vorsatz der Abteilung, sich zu bessern", correct: false },
    ],
    explanation:
      "Technische Verhinderung schlägt Prozessänderung, Prozessänderung schlägt Appell. Erinnerungen und Vorsätze sind die schwächsten Maßnahmen – wenn die Maßnahmenliste nur daraus besteht, wurde nicht tief genug gegraben.",
    category: "VORFALL_MELDEPFLICHT",
    difficulty: "MITTEL",
    lessonSlug: "off-lessons-learned",
    tags: ["Maßnahmen"],
    practiceCase: false,
  },
  // ===== LIEFERANTEN_VERTRAEGE (8) =====
  {
    text: "Was ist das K.-o.-Kriterium bei der Auswahl eines KI-Anbieters?",
    options: [
      { text: "Datenschutz und Datenfluss: AVV, Verarbeitungsorte, Transfergrundlage, Trainingsausschluss, Löschkonzept", correct: true },
      { text: "Die Anzahl der Features in der Demo", correct: false },
      { text: "Das Design der Marketing-Website", correct: false },
      { text: "Ein möglichst niedriger Einstiegspreis", correct: false },
    ],
    explanation:
      "Features lassen sich vergleichen und ersetzen – ein Anbieter, der beim Datenschutz durchfällt, ist unabhängig von allem anderen raus: Ihr geht eine dauerhafte Datenbeziehung ein, keine Feature-Beziehung.",
    category: "LIEFERANTEN_VERTRAEGE",
    difficulty: "LEICHT",
    lessonSlug: "off-tool-auswahl-duediligence",
    tags: ["Due Diligence"],
    practiceCase: false,
  },
  {
    text: "Ein junger Anbieter beeindruckt mit Features, kann aber weder Sicherheitsnachweise noch Aussagen zur Insolvenzvorsorge oder zum Datenexport liefern. Deine Empfehlung?",
    options: [
      { text: "Ablehnen oder höchstens für unkritische Testzwecke: Ohne Exit-Fähigkeit und Nachweise ist er eine Wette mit euren Prozessen als Einsatz", correct: true },
      { text: "Sofort unternehmensweit einführen – die Features sind es wert", correct: false },
      { text: "Einführen und hoffen, dass der Anbieter überlebt", correct: false },
      { text: "Die Frage an die Mitarbeitenden delegieren, die das Tool nutzen wollen", correct: false },
    ],
    explanation:
      "Wirtschaftliche Stabilität, Sicherheitsnachweise und Datenexport sind Kernprüffelder: Ein Anbieter ohne Exportfähigkeit macht jeden Ausstieg zum Notfall – und verschwindet er, verschwinden im schlimmsten Fall eure Daten und Prozesse mit.",
    category: "LIEFERANTEN_VERTRAEGE",
    difficulty: "MITTEL",
    lessonSlug: "off-tool-auswahl-duediligence",
    tags: ["Anbieterrisiko", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum sollte der Trainingsausschluss im Vertrag stehen und nicht nur in einer Anbieter-Policy?",
    options: [
      { text: "Policies kann der Anbieter einseitig ändern – vertragliche Zusagen mit Ankündigungsfristen und Sonderkündigungsrecht sind belastbar", correct: true },
      { text: "Aus optischen Gründen: Verträge sehen förmlicher aus", correct: false },
      { text: "Es macht keinen Unterschied, wo die Zusage steht", correct: false },
      { text: "Weil Policies grundsätzlich nur auf Englisch existieren", correct: false },
    ],
    explanation:
      "Eine still geänderte Policy ist die klassische Trainingsnutzungs-Falle. Vertragliche Verankerung plus Änderungsklauseln-Kontrolle (Ankündigungsfrist, Sonderkündigungsrecht) machen die Zusage durchsetzbar.",
    category: "LIEFERANTEN_VERTRAEGE",
    difficulty: "MITTEL",
    lessonSlug: "off-vertraege-zusagen",
    tags: ["Vertrag", "Training"],
    practiceCase: false,
  },
  {
    text: "Consumer-Abo für 20 € oder Business-Vertrag für 45 € pro Nutzer – was rechtfertigt bei Firmendaten den Aufpreis?",
    options: [
      { text: "Die Zusagen: AVV, Trainingsausschluss, EU-Datenregion, Verfügbarkeits- und Exportregelungen – ohne sie ist das Tool für Firmendaten kaum nutzbar", correct: true },
      { text: "Nichts – beide Varianten sind rechtlich identisch", correct: false },
      { text: "Nur der bessere Kundensupport", correct: false },
      { text: "Das schönere Dashboard der Business-Version", correct: false },
    ],
    explanation:
      "Das Preisdelta kauft genau die vertraglichen Zusagen, die den Einsatz mit Firmendaten erst tragfähig machen. Der \"billige\" Consumer-Tarif ist bei Firmendaten der teuerste – er externalisiert das Risiko auf euch.",
    category: "LIEFERANTEN_VERTRAEGE",
    difficulty: "MITTEL",
    lessonSlug: "off-vertraege-zusagen",
    tags: ["Vertragswahl", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wann ist der richtige Zeitpunkt, den Ausstieg aus einem KI-Tool zu regeln (Datenexport, Löschbestätigung, Übergang)?",
    options: [
      { text: "Vor dem Einstieg – als Teil des Vertrags", correct: true },
      { text: "Erst wenn die Kündigung feststeht", correct: false },
      { text: "Nach dem letzten Nutzungstag", correct: false },
      { text: "Nie – Ausstiege regeln sich von selbst", correct: false },
    ],
    explanation:
      "Exit-Regelungen (Exportformat, Fristen, Kosten, Löschbestätigung) verhandelst du mit Verhandlungsmacht – also vor Vertragsschluss. Wer sie erst bei der Kündigung sucht, findet meist teure Lücken.",
    category: "LIEFERANTEN_VERTRAEGE",
    difficulty: "LEICHT",
    lessonSlug: "off-vertraege-zusagen",
    tags: ["Exit"],
    practiceCase: false,
  },
  {
    text: "Ein Anbieter kündigt an, künftig \"anonymisierte Nutzungsdaten zur Dienstverbesserung\" zu verwenden – ohne Opt-out in eurem Tarif. Was ist der geordnete Weg?",
    options: [
      { text: "Neubewertung auslösen; fällt sie negativ aus: geordneter Ausstieg mit Alternative, Übergangszeit, Export und Löschbestätigung", correct: true },
      { text: "Das Tool von heute auf morgen abschalten, die Nutzer werden sich schon arrangieren", correct: false },
      { text: "Die Ankündigung ignorieren – anonymisiert klingt harmlos", correct: false },
      { text: "Nur den Preis nachverhandeln", correct: false },
    ],
    explanation:
      "Geänderte Datenverarbeitung ist ein Neubewertungs-Trigger. Ist das Ergebnis inakzeptabel, folgt der geordnete Exit: Alternative bereitstellen (sonst entsteht Schatten-KI!), Übergangszeit, Datenexport, Löschbestätigung, Inventar-Update.",
    category: "LIEFERANTEN_VERTRAEGE",
    difficulty: "SCHWER",
    lessonSlug: "off-monitoring-exit",
    tags: ["Exit", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum braucht ein Tool-Ausstieg immer eine Alternative und eine Übergangszeit?",
    options: [
      { text: "Ein abrupt abgeschaltetes Tool ohne Ersatz treibt die Nutzer in private Schatten-Lösungen", correct: true },
      { text: "Aus Höflichkeit gegenüber dem alten Anbieter", correct: false },
      { text: "Weil Verträge grundsätzlich zehn Jahre laufen", correct: false },
      { text: "Braucht er nicht – Hauptsache, das Risiko ist weg", correct: false },
    ],
    explanation:
      "Der Bedarf verschwindet nicht mit dem Tool. Ohne Alternative und Übergang erzeugt der Exit genau die unkontrollierte Schattennutzung, die die Governance verhindern soll – das Risiko wandert nur ins Unsichtbare.",
    category: "LIEFERANTEN_VERTRAEGE",
    difficulty: "MITTEL",
    lessonSlug: "off-monitoring-exit",
    tags: ["Übergang"],
    practiceCase: false,
  },
  {
    text: "Was liefert die jährliche Portfolio-Sicht auf alle KI-Tools?",
    options: [
      { text: "Konsolidierungspotenziale, gefährliche Anbieterabhängigkeiten und auslaufende Verträge – Steuerungswissen fürs Management", correct: true },
      { text: "Nur eine hübsche Grafik für den Flur", correct: false },
      { text: "Die Bestätigung, dass man nie etwas ändern muss", correct: false },
      { text: "Eine Liste der Lieblingstools der Geschäftsführung", correct: false },
    ],
    explanation:
      "Die Portfolio-Runde hebt die Einzeltool-Sicht auf Unternehmensebene: Überlappungen kosten Geld und Prüfaufwand, Klumpenrisiken bei einem Anbieter gefährden Prozesse, auslaufende Verträge wollen rechtzeitig entschieden werden.",
    category: "LIEFERANTEN_VERTRAEGE",
    difficulty: "LEICHT",
    lessonSlug: "off-monitoring-exit",
    tags: ["Portfolio"],
    practiceCase: false,
  },
  // ===== AUDIT_KENNZAHLEN (7) =====
  {
    text: "Welche drei Prüferfragen muss dein Nachweissystem jederzeit schnell beantworten können?",
    options: [
      { text: "Welche KI-Systeme mit welchem Risiko laufen? Wie wird kompetente Nutzung sichergestellt? Was passiert bei Problemen?", correct: true },
      { text: "Wie viele Server? Wie viele Lizenzen? Wie hoch das IT-Budget?", correct: false },
      { text: "Wer ist der älteste Mitarbeiter? Wer der jüngste? Wer nutzt KI am liebsten?", correct: false },
      { text: "Welche KI wird 2030 führend sein? Wie entwickelt sich der Aktienmarkt? Was macht die Konkurrenz?", correct: false },
    ],
    explanation:
      "Inventar mit Risikoeinstufung, Richtlinie plus Schulungsregister, Vorfallsprozess plus Register – wer diese drei Fragen mit aktuellen Dokumenten in unter einer Stunde beantwortet, besteht die meisten Prüfungen souverän.",
    category: "AUDIT_KENNZAHLEN",
    difficulty: "MITTEL",
    lessonSlug: "off-dokumentation-nachweise",
    tags: ["Drei-Fragen-Probe"],
    practiceCase: false,
  },
  {
    text: "Das Inventar listet 17 Tools, die Toolliste der Richtlinie nur 12. Warum ist das im Audit gravierender, als es aussieht?",
    options: [
      { text: "Widersprüche zwischen Kerndokumenten untergraben das Vertrauen in das gesamte System – Konsistenz schlägt Umfang", correct: true },
      { text: "Es ist harmlos – fünf Tools Unterschied fallen niemandem auf", correct: false },
      { text: "Es ist nur ein Formatierungsproblem", correct: false },
      { text: "Auditoren prüfen grundsätzlich nur das Deckblatt", correct: false },
    ],
    explanation:
      "Ein Prüfer, der einen Widerspruch findet, misstraut ab dann jedem Dokument. Konsistente, aufeinander verweisende Unterlagen mit Eigentümer und Stand sind wichtiger als Masse.",
    category: "AUDIT_KENNZAHLEN",
    difficulty: "MITTEL",
    lessonSlug: "off-dokumentation-nachweise",
    tags: ["Konsistenz", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Vor einem Kundenaudit kennst du zwei Schwachstellen in eurer KI-Governance. Wie gehst du damit um?",
    options: [
      { text: "Ehrlich vorbereiten: je Schwachstelle Stand, Plan und Termin präsentieren – bekannte Schwächen mit Plan sind ein Reifezeichen", correct: true },
      { text: "Verschweigen und hoffen, dass der Auditor sie übersieht", correct: false },
      { text: "Die Unterlagen kurzfristig schönen", correct: false },
      { text: "Das Audit kurzfristig absagen", correct: false },
    ],
    explanation:
      "Eine bekannte Schwachstelle mit Maßnahmenplan zeigt ein funktionierendes System. Eine entdeckte, die verschwiegen wurde, ist ein Vertrauensbruch, der auch die ehrlichen Teile der Arbeit entwertet.",
    category: "AUDIT_KENNZAHLEN",
    difficulty: "MITTEL",
    lessonSlug: "off-audit-souveraen",
    tags: ["Audit", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Der Auditor stellt eine Frage, deren Antwort du nicht sicher weißt. Was ist die stärkste Reaktion?",
    options: [
      { text: "\"Das weiß ich nicht sicher – ich kläre es und liefere die Antwort bis morgen nach\"", correct: true },
      { text: "Spontan eine plausibel klingende Antwort erfinden", correct: false },
      { text: "Die Frage mit einer Gegenfrage abblocken", correct: false },
      { text: "Auf ein anderes Thema ausweichen und hoffen, dass er es vergisst", correct: false },
    ],
    explanation:
      "Prüfer erkennen Spekulation – und eine einzige enttarnte erfundene Antwort entwertet alles andere. Das ehrliche \"kläre ich nach\" mit pünktlicher Lieferung ist ein Zeichen von Souveränität und Systemvertrauen.",
    category: "AUDIT_KENNZAHLEN",
    difficulty: "LEICHT",
    lessonSlug: "off-audit-souveraen",
    tags: ["Auditverhalten", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was tust du mit den Findings aus einem Audit?",
    options: [
      { text: "Wie mit Vorfällen: Maßnahme mit Eigentümer und Termin, Wirksamkeitsprüfung und aktive Rückmeldung der Abarbeitung", correct: true },
      { text: "Abheften und beim nächsten Audit überrascht sein", correct: false },
      { text: "Bestreiten, bis der Prüfer aufgibt", correct: false },
      { text: "Nur die angenehmen Findings bearbeiten", correct: false },
    ],
    explanation:
      "Findings sind Gratis-Beratung: Der Maßnahmen-Standard (Eigentümer, Termin, Wirksamkeitsprüfung) gilt auch hier. Eine gepflegte Findings-Historie mit Abarbeitungsquote ist selbst ein Nachweis der Systemreife.",
    category: "AUDIT_KENNZAHLEN",
    difficulty: "LEICHT",
    lessonSlug: "off-audit-souveraen",
    tags: ["Findings"],
    practiceCase: false,
  },
  {
    text: "Welche Kennzahl ist der kritischste Risiko-Indikator einer KI-Governance – und warum?",
    options: [
      { text: "Wiederholungsfälle bei Vorfällen: Sie beweisen, dass Maßnahmen beschlossen, aber nicht wirksam sind", correct: true },
      { text: "Die Gesamtzahl der Meldungen: Je mehr, desto schlechter", correct: false },
      { text: "Die Anzahl der Seiten der Richtlinie", correct: false },
      { text: "Die Zahl der gekauften KI-Lizenzen", correct: false },
    ],
    explanation:
      "Steigende Meldungen können Kultur-Erfolg sein – Wiederholungsfälle nie: Sie zeigen, dass das System nicht lernt. Jede Kennzahl braucht eine Frage, die sie beantwortet, und eine Handlung, die aus ihr folgen kann.",
    category: "AUDIT_KENNZAHLEN",
    difficulty: "SCHWER",
    lessonSlug: "off-kennzahlen-verbesserung",
    tags: ["Kennzahlen"],
    practiceCase: false,
  },
  {
    text: "Dein Quartalsbericht ans Management: Was macht ihn wirksam?",
    options: [
      { text: "Kompakt: wenige aussagekräftige Kennzahlen, Vorfälle mit Status, konkrete Entscheidungsbedarfe und nächste Schritte", correct: true },
      { text: "Maximale Länge: 60 Seiten zeigen Fleiß", correct: false },
      { text: "Nur gute Nachrichten – Probleme verunsichern das Management", correct: false },
      { text: "Technische Details zu jedem einzelnen Prompt", correct: false },
    ],
    explanation:
      "Das Management braucht Steuerungsinformation: Kennzahlen mit Trend, Risiken, Entscheidungsbedarfe – auf wenigen Seiten. Sichtbare, ehrliche Berichterstattung sichert Budget und Rückhalt der Governance-Arbeit.",
    category: "AUDIT_KENNZAHLEN",
    difficulty: "MITTEL",
    lessonSlug: "off-kennzahlen-verbesserung",
    tags: ["Reporting"],
    practiceCase: false,
  },
];
