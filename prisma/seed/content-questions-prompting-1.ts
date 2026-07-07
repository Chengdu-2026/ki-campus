import type { SeedQuestion } from "./content-questions-1";

/**
 * Fragenpool Kurs 3 „Richtig Prompten", Teil 1/2 (Module 1–5).
 * Kategorien: PR_GRUNDLAGEN, PR_FORMEL, PR_ITERATION, PR_KONTEXT, PR_TEXTARBEIT.
 * Konvention: richtige Antwort in den Rohdaten an Position A (Seed mischt).
 * Hoher Praxisfall-Anteil ist gewollt (Ziel ≥ 40 %).
 */
export const seedQuestionsPrompting1: SeedQuestion[] = [
  // ===== PR_GRUNDLAGEN (8) =====
  {
    text: "Was passiert technisch, wenn du einem KI-Assistenten einen Prompt eingibst?",
    options: [
      { text: "Das Sprachmodell berechnet Wort für Wort die statistisch wahrscheinlichste Fortsetzung deines Textes", correct: true },
      { text: "Das System schlägt die Antwort in einer geprüften Faktendatenbank nach", correct: false },
      { text: "Ein Mensch beim Anbieter liest die Frage und wählt eine passende Antwort aus", correct: false },
      { text: "Das Modell denkt wie ein Mensch über die Frage nach und antwortet aus Verständnis", correct: false },
    ],
    explanation:
      "Sprachmodelle erzeugen die wahrscheinlichste Textfortsetzung auf Basis gelernter Muster. Sie schlagen nichts nach und verstehen nicht wie Menschen — deshalb wirkt die Qualität der Eingabe so stark auf die Qualität der Antwort.",
    category: "PR_GRUNDLAGEN",
    difficulty: "LEICHT",
    lessonSlug: "pr-wahrscheinlichkeit-statt-wissen",
    tags: ["Funktionsweise"],
    practiceCase: false,
  },
  {
    text: "Warum erzeugt der Prompt \"Schreib was zu unserem Produkt\" fast immer eine unbrauchbare Antwort?",
    options: [
      { text: "Ohne konkrete Vorgaben liefert das Modell den statistischen Durchschnittstext — vage Eingabe, vage Antwort", correct: true },
      { text: "Weil KI-Modelle grundsätzlich keine Produkttexte schreiben können", correct: false },
      { text: "Weil der Prompt zu kurz ist — Prompts brauchen mindestens 100 Wörter", correct: false },
      { text: "Weil das Modell bei Werbetexten absichtlich schlechter arbeitet", correct: false },
    ],
    explanation:
      "Das Modell reagiert auf das, was du schreibst — nicht auf das, was du meinst. Fehlen Ziel, Kontext und Format, füllt es die Lücken mit dem wahrscheinlichsten Durchschnitt. Kurze Prompts sind nicht das Problem, unpräzise schon.",
    category: "PR_GRUNDLAGEN",
    difficulty: "LEICHT",
    lessonSlug: "pr-wahrscheinlichkeit-statt-wissen",
    tags: ["Präzision"],
    practiceCase: false,
  },
  {
    text: "Ein Kollege fragt einen frei verfügbaren KI-Assistenten: \"Fasse unsere interne Urlaubsregelung zusammen.\" Was ist das wahrscheinlichste Ergebnis?",
    options: [
      { text: "Der Assistent erfindet eine plausibel klingende Urlaubsregelung, weil er die interne Regelung nicht kennt", correct: true },
      { text: "Der Assistent lädt die Regelung automatisch vom Firmenserver und fasst sie korrekt zusammen", correct: false },
      { text: "Der Assistent verweigert grundsätzlich jede Antwort zu Personalthemen", correct: false },
      { text: "Der Assistent antwortet immer korrekt, weil Urlaubsregelungen gesetzlich einheitlich sind", correct: false },
    ],
    explanation:
      "Das Modell kennt keine Firmeninterna. Statt \"das weiß ich nicht\" zu sagen, liefern viele Modelle eine plausible, erfundene Antwort — genau das macht solche Fragen gefährlich. Firmenspezifisches muss man mitliefern.",
    category: "PR_GRUNDLAGEN",
    difficulty: "MITTEL",
    lessonSlug: "pr-was-das-modell-weiss",
    tags: ["Halluzination", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was bedeutet der Wissensstichtag (Cutoff) eines Sprachmodells für deine Arbeit?",
    options: [
      { text: "Ereignisse und Änderungen nach diesem Datum kennt das Modell nur über Websuche oder deine Eingabe — sonst antwortet es womöglich mit veraltetem Stand", correct: true },
      { text: "Nach dem Stichtag darf das Modell aus rechtlichen Gründen nicht mehr verwendet werden", correct: false },
      { text: "Der Stichtag begrenzt nur die maximale Länge der Antworten", correct: false },
      { text: "Ab dem Stichtag werden alle Antworten automatisch mit Quellenangaben versehen", correct: false },
    ],
    explanation:
      "Die Trainingsdaten reichen bis zum Cutoff. Alles Aktuelle — Preise, Gesetzesänderungen, neue Produkte — kann das Modell nur wissen, wenn es eine Websuche nutzt oder du die Information mitgibst. Sonst droht veralteter Stand ohne Warnung.",
    category: "PR_GRUNDLAGEN",
    difficulty: "LEICHT",
    lessonSlug: "pr-was-das-modell-weiss",
    tags: ["Cutoff"],
    practiceCase: false,
  },
  {
    text: "Du willst eine ehrliche Schwächen-Analyse deines Textentwurfs. Welcher Prompt führt am ehesten zum Ziel?",
    options: [
      { text: "\"Nenne die drei größten Schwächen dieses Textes und mach je einen konkreten Verbesserungsvorschlag\"", correct: true },
      { text: "\"Was hältst du von meinem Text?\"", correct: false },
      { text: "\"Ist mein Text gut geworden?\"", correct: false },
      { text: "\"Bitte lies meinen Text durch\"", correct: false },
    ],
    explanation:
      "Das Modell erfüllt den geschriebenen Auftrag, nicht den gedachten. Wer Kritik will, muss Kritik explizit bestellen — auf offene Gefallensfragen folgt meist Höflichkeitslob.",
    category: "PR_GRUNDLAGEN",
    difficulty: "MITTEL",
    lessonSlug: "pr-warum-formulierung-zaehlt",
    tags: ["Kritik bestellen", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum funktioniert \"Schreib locker und direkt, wie an einen langjährigen Kollegen\" besser als \"Schreib nicht so förmlich\"?",
    options: [
      { text: "Positive Anweisungen geben dem Modell eine klare Zielrichtung — Verbote lassen offen, was stattdessen gewünscht ist", correct: true },
      { text: "Weil Sprachmodelle Verneinungen technisch überhaupt nicht verarbeiten können", correct: false },
      { text: "Weil längere Anweisungen grundsätzlich bessere Ergebnisse erzeugen", correct: false },
      { text: "Der Unterschied ist reiner Zufall — beide Anweisungen wirken identisch", correct: false },
    ],
    explanation:
      "Negative Anweisungen sagen nur, was wegfallen soll — das Ziel bleibt unbestimmt. Positive Formulierungen mit Referenz steuern das Modell messbar präziser. Verneinungen werden zwar verarbeitet, aber schwächer befolgt.",
    category: "PR_GRUNDLAGEN",
    difficulty: "MITTEL",
    lessonSlug: "pr-warum-formulierung-zaehlt",
    tags: ["Formulierung"],
    practiceCase: false,
  },
  {
    text: "Eine Mitarbeiterin erhält vom KI-Assistenten eine flüssige, selbstsichere Antwort mit konkreten Zahlen zu einem Nischenthema, das sie nicht mitgeliefert hat. Wie bewertet sie die Antwort richtig?",
    options: [
      { text: "Mit Skepsis: Selbstsicherer Ton ist kein Beleg für Richtigkeit — gerade Zahlen zu Nischenthemen sind halluzinationsgefährdet und müssen geprüft werden", correct: true },
      { text: "Als verlässlich: Je selbstsicherer die Formulierung, desto höher die Trefferwahrscheinlichkeit", correct: false },
      { text: "Als geprüft: Moderne Modelle geben nur noch verifizierte Zahlen aus", correct: false },
      { text: "Als korrekt, sofern die Antwort länger als drei Absätze ist", correct: false },
    ],
    explanation:
      "Modelle optimieren auf \"klingt stimmig\", nicht auf \"ist wahr\". Der Tonfall sagt nichts über die Richtigkeit — konkrete Zahlen ohne mitgeliefertes Material gehören zu den typischsten Halluzinationen.",
    category: "PR_GRUNDLAGEN",
    difficulty: "MITTEL",
    lessonSlug: "pr-wahrscheinlichkeit-statt-wissen",
    tags: ["Halluzination", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wohin gehören besonders wichtige Anweisungen in einem längeren Prompt?",
    options: [
      { text: "Prominent an den Anfang — bei sehr langen Prompts am Ende wiederholen", correct: true },
      { text: "Versteckt in die Mitte, damit das Modell sie \"nebenbei\" aufnimmt", correct: false },
      { text: "In Klammern hinter unwichtige Nebensätze", correct: false },
      { text: "Die Position ist völlig egal — Modelle gewichten jeden Satz identisch", correct: false },
    ],
    explanation:
      "Inhalte am Anfang und Ende eines Prompts werden tendenziell stärker beachtet als die Mitte. Zentrale Anweisungen (z. B. \"nur auf Basis des Dokuments antworten\") gehören deshalb nach vorn — und bei langen Prompts zusätzlich ans Ende.",
    category: "PR_GRUNDLAGEN",
    difficulty: "LEICHT",
    lessonSlug: "pr-warum-formulierung-zaehlt",
    tags: ["Struktur"],
    practiceCase: false,
  },

  // ===== PR_FORMEL (8) =====
  {
    text: "Aus welchen fünf Bausteinen besteht die Prompt-Formel dieses Kurses?",
    options: [
      { text: "Rolle, Ziel, Kontext, Format, Ton", correct: true },
      { text: "Frage, Antwort, Bewertung, Korrektur, Freigabe", correct: false },
      { text: "Einleitung, Hauptteil, Schluss, Quellen, Anhang", correct: false },
      { text: "Thema, Länge, Sprache, Datum, Unterschrift", correct: false },
    ],
    explanation:
      "Rolle (Perspektive), Ziel (messbares Ergebnis), Kontext (was das Modell wissen muss), Format (Aufbau/Länge) und Ton (Klang) — die Checkliste für jeden anspruchsvollen Prompt.",
    category: "PR_FORMEL",
    difficulty: "LEICHT",
    lessonSlug: "pr-formel-ueberblick",
    tags: ["Formel"],
    practiceCase: false,
  },
  {
    text: "Ein Angebotstext soll entstehen. Welcher Prompt nutzt die Prompt-Formel am besten?",
    options: [
      { text: "\"Du bist erfahrener Vertriebler. Schreib ein Anschreiben zum beigefügten Angebot für einen preisbewussten Neukunden aus dem Handwerk. Maximal 10 Sätze mit Betreff. Ton: selbstbewusst, ohne Superlative.\"", correct: true },
      { text: "\"Schreib mir bitte ein richtig gutes Angebot, es ist wichtig.\"", correct: false },
      { text: "\"Angebot schreiben. Danke.\"", correct: false },
      { text: "\"Du bist der weltbeste Verkäufer aller Zeiten mit 100 Jahren Erfahrung. Mach Magie!\"", correct: false },
    ],
    explanation:
      "Die starke Variante enthält alle fünf Bausteine: Rolle, Ziel, Kontext (Empfängertyp), Format (Länge, Betreff) und Ton. Übertriebene Superlativ-Rollen bringen nichts außer Schaumsprache.",
    category: "PR_FORMEL",
    difficulty: "LEICHT",
    lessonSlug: "pr-formel-ueberblick",
    tags: ["Formel", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was bewirkt eine Rollenzuweisung wie \"Du bist eine erfahrene Personalerin\" — und was bewirkt sie NICHT?",
    options: [
      { text: "Sie verändert Perspektive, Sprachniveau und Vokabular der Antwort — sie erzeugt aber keine echte Fachexpertise", correct: true },
      { text: "Sie verwandelt das Modell in eine geprüfte Fachexpertin, deren Aussagen ungeprüft übernommen werden können", correct: false },
      { text: "Sie hat keinerlei Auswirkung auf die Antwort", correct: false },
      { text: "Sie schaltet zusätzliche geheime Wissensdatenbanken frei", correct: false },
    ],
    explanation:
      "Die Rolle aktiviert passende Muster (Ton, Perspektive, Vokabular) und verbessert Antworten spürbar. Sie erzeugt aber Expertenklang, keine Expertise — fachliche Prüfung bleibt Pflicht.",
    category: "PR_FORMEL",
    difficulty: "MITTEL",
    lessonSlug: "pr-rolle-und-ziel",
    tags: ["Rolle"],
    practiceCase: false,
  },
  {
    text: "Woran erkennst du ein gut formuliertes Ziel in einem Prompt?",
    options: [
      { text: "Es ist überprüfbar: Man kann hinterher objektiv beurteilen, ob das Ergebnis den Auftrag erfüllt (z. B. Länge, Zielgruppe, Kerninhalte)", correct: true },
      { text: "Es enthält möglichst viele Höflichkeitsfloskeln, damit das Modell motiviert ist", correct: false },
      { text: "Es besteht aus einem einzigen Wort, um das Modell nicht zu verwirren", correct: false },
      { text: "Es kombiniert mindestens fünf verschiedene Aufgaben in einem Satz", correct: false },
    ],
    explanation:
      "\"Fasse auf maximal 10 Zeilen zusammen, sodass Leser ohne Vorwissen die drei Kernentscheidungen verstehen\" ist messbar. Mehrere Aufgaben in einem Auftrag verwässern das Ergebnis — ein Ziel pro Prompt.",
    category: "PR_FORMEL",
    difficulty: "MITTEL",
    lessonSlug: "pr-rolle-und-ziel",
    tags: ["Ziel"],
    practiceCase: false,
  },
  {
    text: "Ein Teamleiter braucht die Projektübersicht als Tabelle, bekommt aber immer Fließtext. Was fehlt in seinem Prompt am wahrscheinlichsten?",
    options: [
      { text: "Die Formatvorgabe — z. B. \"als Tabelle mit den Spalten Projekt, Status, nächster Schritt, Zuständig\"", correct: true },
      { text: "Eine höflichere Anrede an das Modell", correct: false },
      { text: "Mehr Ausrufezeichen zur Verdeutlichung der Dringlichkeit", correct: false },
      { text: "Eine längere Firmengeschichte als Hintergrund", correct: false },
    ],
    explanation:
      "Alles, was man sonst von Hand umbauen müsste, wird vorab bestellt: Struktur, Länge, Darstellung, Bestandteile. Ohne Formatvorgabe wählt das Modell die wahrscheinlichste Form — meist Fließtext.",
    category: "PR_FORMEL",
    difficulty: "LEICHT",
    lessonSlug: "pr-kontext-und-format",
    tags: ["Format", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche Kontextangabe verändert einen Text in der Regel am stärksten?",
    options: [
      { text: "Die Zielgruppe — wer das Ergebnis lesen wird, bestimmt Aufbau, Sprache und Detailtiefe", correct: true },
      { text: "Die Uhrzeit, zu der der Prompt geschrieben wird", correct: false },
      { text: "Der Name des verwendeten KI-Tools", correct: false },
      { text: "Die Anzahl der bisherigen Chats des Nutzers", correct: false },
    ],
    explanation:
      "Ob Geschäftsführung, Neukunde oder Lehrling liest, verändert das Ergebnis grundlegend. Die Zielgruppe gehört deshalb in fast jeden Text-Prompt.",
    category: "PR_FORMEL",
    difficulty: "LEICHT",
    lessonSlug: "pr-kontext-und-format",
    tags: ["Zielgruppe"],
    practiceCase: false,
  },
  {
    text: "Eine Kanzleimitarbeiterin will, dass KI-Entwürfe wie ihre eigenen E-Mails klingen. Was ist die wirksamste Methode?",
    options: [
      { text: "Zwei, drei eigene gelungene E-Mails als Stilvorlage mitgeben: \"Übernimm Ton und typische Formulierungen dieser Beispiele\"", correct: true },
      { text: "Das Tonwort \"professionell\" in jeden Prompt schreiben", correct: false },
      { text: "Darauf hoffen, dass das Modell ihren Stil mit der Zeit von allein lernt", correct: false },
      { text: "Alle Entwürfe komplett neu schreiben — Tonsteuerung ist technisch unmöglich", correct: false },
    ],
    explanation:
      "Die Stilvorlage ist die stärkste Stufe der Tonsteuerung: Eigene Texte transportieren Dutzende Stilmerkmale auf einmal. Tonwörter sind gröber, und von allein lernt ein Standard-Chat den persönlichen Stil nicht.",
    category: "PR_FORMEL",
    difficulty: "MITTEL",
    lessonSlug: "pr-ton-und-zielgruppe",
    tags: ["Stilvorlage", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum solltest du im Prompt die Verwendung nennen (z. B. \"Das wird eine Folie\" oder \"Das geht als Mail an alle Mitarbeitenden\")?",
    options: [
      { text: "Der Verwendungszweck steuert Aufbau, Länge und Stil oft besser als einzelne Formatvorgaben — das Modell passt das Ergebnis dem Einsatz an", correct: true },
      { text: "Weil das Modell sonst die Antwort verweigert", correct: false },
      { text: "Nur aus Dokumentationsgründen — auf das Ergebnis wirkt es nicht", correct: false },
      { text: "Damit das Tool automatisch die Datei im richtigen Programm speichert", correct: false },
    ],
    explanation:
      "\"Das wird eine Folie\" erzeugt automatisch knappe Stichpunkte, \"Mail an alle\" einen anderen Aufbau als eine Aktennotiz. Der Zweck erklärt dem Modell, was wichtig ist und was wegkann.",
    category: "PR_FORMEL",
    difficulty: "MITTEL",
    lessonSlug: "pr-kontext-und-format",
    tags: ["Verwendungszweck"],
    practiceCase: false,
  },

  // ===== PR_ITERATION (7) =====
  {
    text: "Wie behandeln erfahrene Nutzer die erste Antwort eines KI-Assistenten?",
    options: [
      { text: "Als Rohfassung und Diagnose: Sie zeigt, wie das Modell den Auftrag verstanden hat und was im Prompt gefehlt hat — danach wird gezielt nachgesteuert", correct: true },
      { text: "Als Endergebnis: Wer gut promptet, braucht nie eine zweite Runde", correct: false },
      { text: "Als Beweis für die Unbrauchbarkeit des Tools, wenn sie nicht sofort passt", correct: false },
      { text: "Als Zufallsprodukt, das man durch mehrfaches Neu-Generieren verbessert", correct: false },
    ],
    explanation:
      "Zwei bis drei Runden sind normal und effizient. Die erste Antwort liefert die schnellste Diagnose der eigenen Prompt-Lücken — Aufgeben oder blindes Neuwürfeln verschenkt genau diesen Wert.",
    category: "PR_ITERATION",
    difficulty: "LEICHT",
    lessonSlug: "pr-erste-antwort-rohfassung",
    tags: ["Iteration"],
    practiceCase: false,
  },
  {
    text: "Der KI-Entwurf ist fast gut: Struktur passt, aber Absatz 2 ist zu werblich und der Preis fehlt. Was ist das beste Feedback?",
    options: [
      { text: "\"Struktur und Länge passen — behalte sie. Absatz 2 sachlicher formulieren. Ergänze den Preis von 490 Euro.\"", correct: true },
      { text: "\"Gefällt mir nicht, mach es besser.\"", correct: false },
      { text: "Fünfmal auf \"neu generieren\" klicken, bis zufällig etwas Besseres kommt", correct: false },
      { text: "Den Chat sofort löschen und das Tool wechseln", correct: false },
    ],
    explanation:
      "Starkes Feedback friert das Gute ein (\"behalte Struktur\") und benennt konkret, was sich wie ändert. Pauschalkritik führt zum Neuwürfeln — auch das Gelungene geht dabei verloren.",
    category: "PR_ITERATION",
    difficulty: "LEICHT",
    lessonSlug: "pr-gezielt-nachsteuern",
    tags: ["Feedback", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was bringt die Technik, die KI vor der Antwort erst Fragen stellen zu lassen (\"Stell mir erst drei Fragen, die dir helfen, das Ergebnis zu verbessern\")?",
    options: [
      { text: "Sie deckt bei komplexen Aufträgen Informationslücken auf, an die man selbst nicht gedacht hat — bevor eine unbrauchbare Antwort entsteht", correct: true },
      { text: "Sie beschleunigt die Antwort, weil das Modell weniger rechnen muss", correct: false },
      { text: "Sie ist ein Trick, um Nutzungsgebühren zu sparen", correct: false },
      { text: "Sie zwingt das Modell, ausschließlich wahre Antworten zu geben", correct: false },
    ],
    explanation:
      "Gerade bei vielschichtigen Aufgaben weiß man oft selbst nicht, welche Angaben fehlen. Die Rückfragen des Modells machen diese Lücken sichtbar — eine der effizientesten Iterationstechniken.",
    category: "PR_ITERATION",
    difficulty: "MITTEL",
    lessonSlug: "pr-gezielt-nachsteuern",
    tags: ["Rückfragen"],
    practiceCase: false,
  },
  {
    text: "Ein Sachbearbeiter arbeitet seit einer Stunde im selben Chat an völlig verschiedenen Aufgaben. Plötzlich vermischt die KI Inhalte: Der Angebotstext übernimmt den lockeren Ton der Urlaubsnotizen von vorhin. Was ist die beste Reaktion?",
    options: [
      { text: "Neuen Chat starten, nur die relevanten Angebots-Eckdaten mitnehmen und den Auftrag frisch formulieren", correct: true },
      { text: "Im selben Chat weiterkorrigieren, bis die Vermischung irgendwann verschwindet", correct: false },
      { text: "Das Tool deinstallieren — solche Fehler sind nicht behebbar", correct: false },
      { text: "Die Urlaubsnotizen nochmals in den Chat kopieren, damit die KI sie \"abschließen\" kann", correct: false },
    ],
    explanation:
      "Der Verlauf ist verschmutzt: Alte Anweisungen und Inhalte wirken nach. Neue Aufgabe, neuer Chat — Erkenntnisse und relevantes Material mitnehmen, Ballast zurücklassen. Das ist fast immer schneller als Korrekturrunde vier bis sieben.",
    category: "PR_ITERATION",
    difficulty: "MITTEL",
    lessonSlug: "pr-wann-neu-anfangen",
    tags: ["Kontextverschmutzung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wann ist der richtige Zeitpunkt, mit dem Iterieren aufzuhören?",
    options: [
      { text: "Sobald das Ergebnis seinen Zweck erfüllt und geprüft ist — Perfektionierung ab Runde vier frisst die Zeitersparnis auf", correct: true },
      { text: "Erst wenn das Ergebnis in jeder Hinsicht vollkommen perfekt ist", correct: false },
      { text: "Nach exakt einer Runde — mehr Runden gelten als Prompt-Versagen", correct: false },
      { text: "Nie — gute Nutzer iterieren jeden Text mindestens zehnmal", correct: false },
    ],
    explanation:
      "Brauchbar und geprüft schlägt perfekt und überfällig. Zwei bis drei Runden sind der Normalfall; endloser Feinschliff kostet mehr Zeit, als das Selberschreiben gekostet hätte.",
    category: "PR_ITERATION",
    difficulty: "LEICHT",
    lessonSlug: "pr-erste-antwort-rohfassung",
    tags: ["Effizienz"],
    practiceCase: false,
  },
  {
    text: "Du hast drei Korrekturrunden hinter dir und das Ergebnis wird nicht besser. Was ist die beste nächste Aktion?",
    options: [
      { text: "Erkenntnisse aus den gescheiterten Runden sammeln und einen frischen, vollständigen Prompt in einem neuen Chat formulieren", correct: true },
      { text: "Dieselbe Korrektur zum vierten Mal in identischen Worten wiederholen", correct: false },
      { text: "Das Ergebnis unbesehen übernehmen — besser wird es nicht", correct: false },
      { text: "Dem Modell mit Konsequenzen drohen, damit es sich mehr anstrengt", correct: false },
    ],
    explanation:
      "Nach drei erfolglosen Runden gilt: Neustart mit besserem Prompt. Die gescheiterten Runden zeigen, welche Vorgaben gefehlt haben — dieses Wissen gehört in den neuen Prompt, nicht in Runde vier bis sieben im belasteten Verlauf.",
    category: "PR_ITERATION",
    difficulty: "MITTEL",
    lessonSlug: "pr-wann-neu-anfangen",
    tags: ["Neustart", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was bewirkt die Anweisung \"Behalte Aufbau und Ton, ändere nur den Schlussabsatz\"?",
    options: [
      { text: "Sie friert das Gelungene ein — ohne solche Ansagen schreibt das Modell bei Korrekturen gern den ganzen Text um", correct: true },
      { text: "Sie sperrt den Chat dauerhaft für weitere Änderungen", correct: false },
      { text: "Sie ist wirkungslos, weil Modelle immer alles neu generieren", correct: false },
      { text: "Sie funktioniert nur in kostenpflichtigen Tool-Versionen", correct: false },
    ],
    explanation:
      "Modelle neigen dazu, bei jeder Korrektur mehr zu ändern als verlangt. Explizit zu benennen, was bleiben soll, schützt die gelungenen Teile über die Runden hinweg.",
    category: "PR_ITERATION",
    difficulty: "LEICHT",
    lessonSlug: "pr-gezielt-nachsteuern",
    tags: ["Einfrieren"],
    practiceCase: false,
  },

  // ===== PR_KONTEXT (7) =====
  {
    text: "Warum gehört bei Dokumentarbeit die Anweisung \"Antworte ausschließlich auf Basis des beigefügten Dokuments\" in den Prompt?",
    options: [
      { text: "Ohne sie mischt das Modell Trainingswissen in die Antwort — und man kann nicht mehr trennen, was aus dem Dokument stammt und was dazugedichtet ist", correct: true },
      { text: "Weil das Modell sonst das Dokument an Dritte weiterleitet", correct: false },
      { text: "Weil Dokumente ohne diese Anweisung automatisch gelöscht werden", correct: false },
      { text: "Die Anweisung ist überflüssig — Modelle nutzen hochgeladene Dokumente immer exklusiv", correct: false },
    ],
    explanation:
      "Die Quellenbindung (\"nur aus dem Dokument, Lücken benennen\") ist die wichtigste Anweisung der Dokumentarbeit: Sie hält nachvollziehbar, was belegt ist — bei Verträgen und Zahlen unverzichtbar.",
    category: "PR_KONTEXT",
    difficulty: "MITTEL",
    lessonSlug: "pr-dokumente-mitgeben",
    tags: ["Quellenbindung"],
    practiceCase: false,
  },
  {
    text: "Eine Sachbearbeiterin soll Kündigungsregeln aus einem Kundenvertrag extrahieren lassen. Das Tool ist nur für anonymisierte Inhalte freigegeben. Wie geht sie korrekt vor?",
    options: [
      { text: "Die relevanten Vertragsabschnitte anonymisiert herauskopieren und mit Quellenbindung prompten — statt den ganzen Vertrag mit Kundendaten hochzuladen", correct: true },
      { text: "Den kompletten Vertrag samt Kundennamen hochladen — für die Analyse braucht die KI alles", correct: false },
      { text: "Die Kündigungsregeln aus dem Gedächtnis beschreiben und die KI raten lassen", correct: false },
      { text: "Die Aufgabe im privaten KI-Konto erledigen, wo keine Firmenregeln gelten", correct: false },
    ],
    explanation:
      "Relevante Passage anonymisiert herauskopieren ist der praktische Mittelweg: Die KI bekommt echtes Material (nicht Beschreibungen), aber keine geschützten Daten. Privatkonten sind für Firmendaten tabu — die Firmenregeln gelten für die Daten, nicht für das Konto.",
    category: "PR_KONTEXT",
    difficulty: "MITTEL",
    lessonSlug: "pr-dokumente-mitgeben",
    tags: ["Anonymisierung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was ist Few-Shot-Prompting?",
    options: [
      { text: "Dem Modell wenige Beispiele des gewünschten Ergebnisses mitgeben, damit es das Muster erkennt und auf die neue Aufgabe überträgt", correct: true },
      { text: "Denselben Prompt mehrfach hintereinander abschicken", correct: false },
      { text: "Besonders kurze Prompts mit maximal fünf Wörtern verwenden", correct: false },
      { text: "Mehrere KI-Tools gleichzeitig mit derselben Frage füttern", correct: false },
    ],
    explanation:
      "Zeigen schlägt Beschreiben: Ein Beispiel transportiert Länge, Aufbau, Ton und Detailgrad auf einmal — zwei, drei gute Beispiele definieren eine Aufgabe präziser als lange Anweisungslisten.",
    category: "PR_KONTEXT",
    difficulty: "LEICHT",
    lessonSlug: "pr-beispiele-vorlagen",
    tags: ["Few-Shot"],
    practiceCase: false,
  },
  {
    text: "Ein Onlinehändler nutzt zwei alte Produkttexte als Beispiele für 80 neue. Die alten Texte sind allerdings ziemlich werblich geraten. Was passiert?",
    options: [
      { text: "Alle 80 neuen Texte werden denselben werblichen Ton übernehmen — Beispiele übertragen auch ihre Schwächen", correct: true },
      { text: "Nichts — das Modell erkennt und korrigiert schlechte Beispiele automatisch", correct: false },
      { text: "Das Modell verweigert die Arbeit mit unperfekten Beispielen", correct: false },
      { text: "Nur jeder zweite Text übernimmt den Beispielstil", correct: false },
    ],
    explanation:
      "Das Modell kopiert das Muster inklusive aller Eigenheiten — auch der unbewussten. Wer mittelmäßige Beispiele füttert, standardisiert seine Fehler. Für Vorlagen nur die besten Exemplare verwenden.",
    category: "PR_KONTEXT",
    difficulty: "MITTEL",
    lessonSlug: "pr-beispiele-vorlagen",
    tags: ["Beispielqualität", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was ist das Kontextfenster eines KI-Assistenten?",
    options: [
      { text: "Der begrenzte Arbeitsspeicher einer Unterhaltung: Prompt, Dokumente und Verlauf — was nicht (mehr) darin ist, existiert für das Modell nicht", correct: true },
      { text: "Das Browserfenster, in dem der Chat angezeigt wird", correct: false },
      { text: "Die Zeitspanne, in der das Tool täglich verfügbar ist", correct: false },
      { text: "Eine Liste aller Nutzer, die denselben Chat sehen dürfen", correct: false },
    ],
    explanation:
      "Alles, womit das Modell arbeitet, muss ins Kontextfenster passen. Bei sehr langen Verläufen können frühe Inhalte herausfallen — und innerhalb des Fensters werden Anfang und Ende stärker beachtet als die Mitte.",
    category: "PR_KONTEXT",
    difficulty: "LEICHT",
    lessonSlug: "pr-grenzen-des-kontexts",
    tags: ["Kontextfenster"],
    practiceCase: false,
  },
  {
    text: "Ein Assistent lässt einen 90-Seiten-Bericht zusammenfassen. Die Zusammenfassung wirkt vollständig — aber wie stellt er sicher, dass nichts Wichtiges fehlt?",
    options: [
      { text: "Stichproben machen (bekannte Details prüfen), kapitelweise zusammenfassen lassen und wichtige Themen gezielt erfragen", correct: true },
      { text: "Gar nicht nötig — eine vollständig wirkende Zusammenfassung ist vollständig", correct: false },
      { text: "Die Zusammenfassung dreimal neu generieren und die längste Version nehmen", correct: false },
      { text: "Das Dokument in einer größeren Schriftart erneut hochladen", correct: false },
    ],
    explanation:
      "Übersehenen Inhalten sieht man das Fehlen nicht an. Zerlegen (kapitelweise), gezielte Detailfragen und Stichproben mit bekannten Fakten sind das Sicherheitsnetz bei langen Dokumenten.",
    category: "PR_KONTEXT",
    difficulty: "MITTEL",
    lessonSlug: "pr-grenzen-des-kontexts",
    tags: ["Lange Dokumente", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wie trennst du in einem Prompt sauber zwischen Anweisung und Arbeitsmaterial?",
    options: [
      { text: "Erst die Anweisung, dann eine klare Markierung (z. B. \"--- DOKUMENT ---\" oder \"Hier der Text:\"), dann das Material — bei mehreren Dokumenten nummerieren und benennen", correct: true },
      { text: "Anweisung und Material wild vermischen — das Modell sortiert das selbst", correct: false },
      { text: "Das Material weglassen und nur beschreiben, was ungefähr drinsteht", correct: false },
      { text: "Alles in Großbuchstaben schreiben, damit das Modell aufmerksamer liest", correct: false },
    ],
    explanation:
      "Das Modell muss erkennen können, was Auftrag und was Material ist. Klare Markierungen und benannte Dokumente (\"Dokument 1: Angebot A\") verhindern, dass Anweisungen und Inhalte verschwimmen.",
    category: "PR_KONTEXT",
    difficulty: "LEICHT",
    lessonSlug: "pr-dokumente-mitgeben",
    tags: ["Struktur"],
    practiceCase: false,
  },

  // ===== PR_TEXTARBEIT (8) =====
  {
    text: "Du beantwortest eine Kundenmail mit KI-Unterstützung. Warum gibst du die Original-Mail (ggf. anonymisiert) in den Prompt?",
    options: [
      { text: "Nur so kann die KI auf Bezüge, Tonlage und offene Fragen des Absenders eingehen — ohne Original entsteht eine generische Antwort", correct: true },
      { text: "Damit die KI die Mail direkt selbst an den Kunden versendet", correct: false },
      { text: "Aus Höflichkeit gegenüber dem Modell", correct: false },
      { text: "Das ist unnötig — eine kurze Zusammenfassung aus dem Gedächtnis wirkt identisch", correct: false },
    ],
    explanation:
      "Material mitgeben statt beschreiben: Die Antwortqualität hängt daran, dass das Modell die konkreten Formulierungen und Fragen des Absenders sieht. Versendet wird selbstverständlich erst nach deiner Prüfung.",
    category: "PR_TEXTARBEIT",
    difficulty: "LEICHT",
    lessonSlug: "pr-emails-korrespondenz",
    tags: ["E-Mail"],
    practiceCase: false,
  },
  {
    text: "Die KI-formulierte Kundenmail enthält den Satz \"Wir garantieren die Lieferung bis Freitag\". Der Termin wurde nie geprüft. Was ist die richtige Konsequenz?",
    options: [
      { text: "Vor dem Versand jede Zusage prüfen: Termin bestätigen lassen oder die Formulierung abschwächen — KI-Zusagen sind deine Zusagen", correct: true },
      { text: "Absenden — was die KI schreibt, ist rechtlich unverbindlich", correct: false },
      { text: "Absenden und bei Problemen auf die KI verweisen", correct: false },
      { text: "Den Satz lassen, aber die Mail ohne Absendernamen verschicken", correct: false },
    ],
    explanation:
      "KI formuliert verbindlich klingende Zusagen auch ohne Grundlage. Wer die Mail versendet, verantwortet jeden Satz — Termine, Preise und Kulanzen werden vor dem Versand geprüft wie bei einem selbst geschriebenen Text.",
    category: "PR_TEXTARBEIT",
    difficulty: "LEICHT",
    lessonSlug: "pr-emails-korrespondenz",
    tags: ["Zusagen", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche Arbeitsteilung gilt bei KI-gestützten Angeboten?",
    options: [
      { text: "Der Mensch liefert alle harten Fakten (Positionen, Preise, Fristen), die KI Struktur und Formulierung — fehlende Angaben soll sie erfragen statt ergänzen", correct: true },
      { text: "Die KI kalkuliert die Preise selbstständig auf Basis von Marktdaten", correct: false },
      { text: "Die KI ergänzt fehlende Positionen nach branchenüblichen Standards", correct: false },
      { text: "Der Mensch formuliert, die KI prüft die Rechtschreibung — mehr ist nicht erlaubt", correct: false },
    ],
    explanation:
      "Ein Angebot ist rechtlich relevant: Erfundene Leistungen oder Preise können bindend werden. Die KI kennt weder Kalkulation noch Lieferfähigkeit — die Anweisung \"nichts erfinden, Fehlendes erfragen\" gehört in jeden Angebots-Prompt.",
    category: "PR_TEXTARBEIT",
    difficulty: "MITTEL",
    lessonSlug: "pr-angebote-vorlagen",
    tags: ["Angebote"],
    practiceCase: false,
  },
  {
    text: "Eine Projektassistentin lässt aus Meeting-Rohnotizen ein Protokoll erstellen. Welche Anweisung verhindert, dass die KI Lücken einfach plausibel auffüllt?",
    options: [
      { text: "\"Nutze ausschließlich meine Notizen und markiere Stellen mit fehlenden Informationen mit [KLÄREN]\"", correct: true },
      { text: "\"Mach das Protokoll möglichst vollständig und rund — ergänze, was üblicherweise besprochen wird\"", correct: false },
      { text: "\"Schreib es so, dass es keiner hinterfragt\"", correct: false },
      { text: "\"Verwende viele Fachbegriffe, damit es professionell wirkt\"", correct: false },
    ],
    explanation:
      "Protokoll heißt Chronistenpflicht: dokumentieren, was war — nicht, was plausibel wäre. Die [KLÄREN]-Markierung macht Lücken sichtbar, statt sie zu übertünchen, und führt zu Rückfragen vor dem Versand.",
    category: "PR_TEXTARBEIT",
    difficulty: "MITTEL",
    lessonSlug: "pr-protokolle-berichte",
    tags: ["Protokoll", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum trennst du bei Berichten die Faktenzusammenfassung von der Bewertung (zwei getrennte Prompt-Schritte)?",
    options: [
      { text: "Damit nachvollziehbar bleibt, was Datenlage und was Interpretation ist — die Bewertung im Bericht muss am Ende deine eigene sein", correct: true },
      { text: "Weil Modelle technisch nur eine Aufgabe pro Tag ausführen können", correct: false },
      { text: "Um doppelte Nutzungsgebühren zu erzeugen", correct: false },
      { text: "Die Trennung ist unnötig — Fakten und Meinung dürfen beliebig verschwimmen", correct: false },
    ],
    explanation:
      "Der Bericht trägt deinen Namen: Die enthaltene Einordnung vertrittst du persönlich. Getrennte Schritte (erst Fakten aus deinen Daten, dann Beobachtungen mit Beleg) halten die Grenze sauber und die Entscheidung bei dir.",
    category: "PR_TEXTARBEIT",
    difficulty: "MITTEL",
    lessonSlug: "pr-protokolle-berichte",
    tags: ["Berichte"],
    practiceCase: false,
  },
  {
    text: "Du lässt einen Text auf 150 Wörter kürzen. Was gehört zusätzlich zur Ziellänge in den Prompt?",
    options: [
      { text: "Eine Erhaltungsliste: welche Inhalte (z. B. Fristen, Zahlen, Haftungshinweis) auf keinen Fall wegfallen dürfen", correct: true },
      { text: "Nichts — die KI weiß von selbst, was wichtig ist", correct: false },
      { text: "Die Bitte, besonders schnell zu antworten", correct: false },
      { text: "Eine Liste aller Wörter, die im Text vorkommen sollen", correct: false },
    ],
    explanation:
      "Ohne Erhaltungsliste kürzt das Modell nach statistischer Wichtigkeit — und die trifft nicht immer deine. Harte Grenze plus Erhaltungsliste ist das bewährte Kürzungs-Muster.",
    category: "PR_TEXTARBEIT",
    difficulty: "LEICHT",
    lessonSlug: "pr-uebersetzen-vereinfachen",
    tags: ["Kürzen"],
    practiceCase: false,
  },
  {
    text: "Die KI hat einen Liefervertrag ins Englische übersetzt. Der Text soll morgen unterschrieben werden. Was ist der richtige nächste Schritt?",
    options: [
      { text: "Fachkundige Prüfung der Übersetzung veranlassen — bei Rechtstexten können sich Nuancen (\"soll\", \"kann\", \"grundsätzlich\") lautlos verschieben", correct: true },
      { text: "Direkt unterschreiben lassen — moderne KI-Übersetzungen sind fehlerfrei", correct: false },
      { text: "Die Übersetzung von einem zweiten KI-Tool bestätigen lassen — das ersetzt die Fachprüfung", correct: false },
      { text: "Nur die Überschriften kontrollieren, der Rest passt erfahrungsgemäß", correct: false },
    ],
    explanation:
      "KI übersetzt Alltagstexte stark, aber bei Rechtsverbindlichem entscheiden Nuancen, die sich beim Übersetzen verschieben können. Verträge, AGB und Sicherheitshinweise brauchen nach der KI-Übersetzung fachkundige Prüfung — ein zweites KI-Tool ist keine.",
    category: "PR_TEXTARBEIT",
    difficulty: "MITTEL",
    lessonSlug: "pr-uebersetzen-vereinfachen",
    tags: ["Übersetzung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Servicetechniker muss einem bereits verärgerten Kunden eine weitere Verzögerung mitteilen. Welcher Prompt-Ansatz ist am besten?",
    options: [
      { text: "Beziehungskontext und Ziel mitgeben (verärgerter Stammkunde, ehrliche Entschuldigung, neuer verbindlicher Termin, Ausgleich) — und die fertige Mail doppelt prüfen", correct: true },
      { text: "\"Schreib eine Entschuldigung\" — der Rest ergibt sich", correct: false },
      { text: "Die KI bitten, die Verzögerung so zu formulieren, dass sie nicht auffällt", correct: false },
      { text: "Gar keine KI nutzen — für heikle Mails ist sie grundsätzlich verboten", correct: false },
    ],
    explanation:
      "Gerade bei heikler Post glänzt die KI als emotional unbelasteter Erstentwurf — wenn der Prompt Beziehung, Eskalationsgrad und gewünschtes Ergebnis enthält. Verschleierung ist keine Option, doppelte Kontrolle (einmal mit Empfängeraugen) Pflicht.",
    category: "PR_TEXTARBEIT",
    difficulty: "SCHWER",
    lessonSlug: "pr-emails-korrespondenz",
    tags: ["Heikle Post", "Praxisfall"],
    practiceCase: true,
  },
];
