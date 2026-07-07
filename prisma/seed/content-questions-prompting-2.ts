import type { SeedQuestion } from "./content-questions-1";

/**
 * Fragenpool Kurs 3 „Richtig Prompten", Teil 2/2 (Module 6–10).
 * Kategorien: PR_ANALYSE, PR_KREATIV, PR_TOOLS, PR_SICHERHEIT, PR_BIBLIOTHEK.
 * Konvention: richtige Antwort in den Rohdaten an Position A (Seed mischt).
 */
export const seedQuestionsPrompting2: SeedQuestion[] = [
  // ===== PR_ANALYSE (8) =====
  {
    text: "Warum ist \"Fasse diesen Mietvertrag aus Mietersicht zusammen\" besser als \"Fasse diesen Mietvertrag zusammen\"?",
    options: [
      { text: "Der Blickwinkel steuert die Auswahl: Die Zusammenfassung beantwortet die eigene Frage (Pflichten, Kosten) statt einer beliebigen Durchschnittsfrage", correct: true },
      { text: "Weil längere Prompts grundsätzlich bessere Antworten erzeugen", correct: false },
      { text: "Weil das Modell ohne Rollenangabe keine Verträge lesen darf", correct: false },
      { text: "Der Unterschied ist rein kosmetisch und ändert nichts am Inhalt", correct: false },
    ],
    explanation:
      "Jede Zusammenfassung ist Auswahl. Ohne Blickwinkel wählt das Modell nach statistischer Wichtigkeit — mit Blickwinkel nach deiner Frage. Das entscheidet, ob das Relevante drinsteht.",
    category: "PR_ANALYSE",
    difficulty: "LEICHT",
    lessonSlug: "pr-lange-dokumente",
    tags: ["Blickwinkel"],
    practiceCase: false,
  },
  {
    text: "Welchen praktischen Vorteil hat es, die KI bei Dokumentfragen die relevante Passage zitieren zu lassen?",
    options: [
      { text: "Du bekommst die Fundstelle mit und kannst am Original in Sekunden prüfen, ob die Aussage stimmt und im Zusammenhang korrekt ist", correct: true },
      { text: "Zitate machen die Antwort automatisch rechtsverbindlich", correct: false },
      { text: "Das Modell antwortet dadurch schneller", correct: false },
      { text: "Zitieren verhindert technisch jede Halluzination", correct: false },
    ],
    explanation:
      "Das Zitieren-Lassen ist die eingebaute Prüfhilfe der Dokumentarbeit: Statt blind zu vertrauen, springst du zur Fundstelle und verifizierst. Halluzinationen verhindert es nicht — es macht sie auffindbar.",
    category: "PR_ANALYSE",
    difficulty: "MITTEL",
    lessonSlug: "pr-lange-dokumente",
    tags: ["Zitate"],
    practiceCase: false,
  },
  {
    text: "Ein Geschäftsführer muss in vier Tagen auf eine 60-seitige Ausschreibung reagieren. Welche Prompt-Strategie ist am wirksamsten?",
    options: [
      { text: "Gezielte Fragen stellen (\"Welche Ausschlusskriterien gibt es? Zitiere die Passagen.\") und kritische Stellen am Original prüfen", correct: true },
      { text: "Einmal \"Fasse zusammen\" prompten und die Antwort als Entscheidungsgrundlage nehmen", correct: false },
      { text: "Das Dokument zehnmal zusammenfassen lassen und die Versionen vergleichen", correct: false },
      { text: "Auf die KI verzichten und alle 60 Seiten wortweise selbst lesen, auch wenn die Zeit fehlt", correct: false },
    ],
    explanation:
      "Das Frage-Antwort-Muster mit Zitatpflicht trifft besser als jede Pauschal-Zusammenfassung — und die entscheidenden Passagen (Ausschlusskriterien, Fristen) liest man am Original nach. KI als Lesehilfe, Entscheidung auf geprüfter Grundlage.",
    category: "PR_ANALYSE",
    difficulty: "MITTEL",
    lessonSlug: "pr-lange-dokumente",
    tags: ["Ausschreibung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum kann ein Sprachmodell bei einer mehrschrittigen Kalkulation ein falsches Ergebnis liefern, das völlig korrekt aussieht?",
    options: [
      { text: "Es erzeugt Text nach Wahrscheinlichkeit statt echter Arithmetik — das Ergebnis sieht wie eine Rechnung aus, ist aber sprachlich \"geschätzt\"", correct: true },
      { text: "Weil Sprachmodelle absichtlich Fehler einbauen, um Nutzer zu testen", correct: false },
      { text: "Weil Computer grundsätzlich nicht rechnen können", correct: false },
      { text: "Das kann nicht passieren — Zahlenausgaben von KI sind immer exakt", correct: false },
    ],
    explanation:
      "Ein Sprachmodell ist keine Rechenmaschine. Manche Tools haben Rechenwerkzeuge eingebaut, aber von außen ist nicht immer erkennbar, ob gerechnet oder geschätzt wurde. Wichtige Zahlen werden deshalb nachgerechnet.",
    category: "PR_ANALYSE",
    difficulty: "MITTEL",
    lessonSlug: "pr-tabellen-zahlen",
    tags: ["Rechnen"],
    practiceCase: false,
  },
  {
    text: "Ein Controller lässt die KI eine Kostenaufstellung strukturieren und Quartalssummen bilden. Was ist die richtige Arbeitsteilung?",
    options: [
      { text: "Struktur, Gruppierung und Auffälligkeiten von der KI — jede Summe aus der Tabellenkalkulation bzw. nachgerechnet", correct: true },
      { text: "Alles von der KI — Summen inklusive, das spart die Kontrolle", correct: false },
      { text: "Alles von Hand — KI hat bei Tabellen keinerlei Nutzen", correct: false },
      { text: "Die KI rechnet, der Mensch formatiert die Tabelle hübsch", correct: false },
    ],
    explanation:
      "Der bewährte Dreiklang: Struktur von der KI, Auffälligkeiten von der KI, Arithmetik vom Tabellenprogramm. Genau bei Summen über viele Positionen passieren stille KI-Fehler (z. B. doppelt gezählte Posten).",
    category: "PR_ANALYSE",
    difficulty: "LEICHT",
    lessonSlug: "pr-tabellen-zahlen",
    tags: ["Tabellen", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche Vergleichsfrage übersehen menschliche Leser häufig, die eine KI beim Dokumentenvergleich zuverlässig beantwortet?",
    options: [
      { text: "\"Was ist im einen Dokument geregelt, fehlt aber im anderen?\" — fehlende Regelungen fallen beim normalen Lesen kaum auf", correct: true },
      { text: "\"Welches Dokument hat mehr Seiten?\"", correct: false },
      { text: "\"Welches Dokument ist schöner formatiert?\"", correct: false },
      { text: "\"Welches Dokument wurde zuerst geschrieben?\"", correct: false },
    ],
    explanation:
      "Das Fehlende ist die blinde Stelle menschlicher Leser: Was nicht dasteht, springt nicht ins Auge. Im Vergleichs-Prompt gehört die Frage nach Lücken deshalb explizit ins Raster.",
    category: "PR_ANALYSE",
    difficulty: "MITTEL",
    lessonSlug: "pr-vergleichen-pruefen",
    tags: ["Vergleich"],
    practiceCase: false,
  },
  {
    text: "Ein Einkäufer entscheidet anhand einer KI-Vergleichstabelle zwischen zwei Wartungsverträgen. Die Zeile \"Reaktionszeit\" gibt den Ausschlag. Was fehlt noch vor der Entscheidung?",
    options: [
      { text: "Die entscheidende Zeile am Originalvertrag prüfen — die KI kann Klauseln falsch zuordnen, und eine wichtige Entscheidung braucht geprüfte Grundlage", correct: true },
      { text: "Nichts — KI-Vergleichstabellen sind abschließend verlässlich", correct: false },
      { text: "Eine zweite KI-Tabelle im anderen Farbschema", correct: false },
      { text: "Die Meinung des Vertriebsmitarbeiters des teureren Anbieters", correct: false },
    ],
    explanation:
      "Vergleichstabellen wirken endgültig, sind aber KI-Auswertungen mit Fehlerrisiko. Mindeststandard: die ausschlaggebende Zeile am Original verifizieren, bevor entschieden wird.",
    category: "PR_ANALYSE",
    difficulty: "LEICHT",
    lessonSlug: "pr-vergleichen-pruefen",
    tags: ["Kontrolle", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was ist der \"Anwalts-des-Teufels-Modus\" beim Prompten?",
    options: [
      { text: "Die KI gezielt die Gegenposition einnehmen lassen: Schwächen der eigenen Argumentation und Einwände kritischer Leser aufdecken", correct: true },
      { text: "Ein Modus, in dem die KI juristische Schriftsätze verfasst", correct: false },
      { text: "Eine Einstellung, die das Modell aggressiver formulieren lässt", correct: false },
      { text: "Ein verbotener Jailbreak, der Sicherheitsregeln umgeht", correct: false },
    ],
    explanation:
      "\"Nimm die Gegenposition ein: Wo würde ein kritischer Kunde einhaken?\" — eine einfache, stark unterschätzte Prüftechnik für eigene Texte, Angebote und Argumente.",
    category: "PR_ANALYSE",
    difficulty: "LEICHT",
    lessonSlug: "pr-vergleichen-pruefen",
    tags: ["Prüftechnik"],
    practiceCase: false,
  },

  // ===== PR_KREATIV (7) =====
  {
    text: "Wie verhinderst du, dass KI-Werbetexte austauschbaren Floskel-Brei liefern?",
    options: [
      { text: "Konkrete, wahre Fakten und eine spitze Zielgruppe mit ihrem Problem füttern — die KI kann nur mit der Substanz arbeiten, die sie bekommt", correct: true },
      { text: "Das Wort \"kreativ\" mehrfach in den Prompt schreiben", correct: false },
      { text: "Den Prompt komplett in Großbuchstaben verfassen", correct: false },
      { text: "Ein teureres KI-Tool kaufen — Floskeln sind ein reines Preisproblem", correct: false },
    ],
    explanation:
      "Floskeln entstehen aus leeren Prompts: Ohne echte Unterscheidungsmerkmale liefert das Modell den Branchen-Durchschnittston. \"Familienbetrieb seit 1987, Reparatur statt Austausch\" schlägt jede \"maßgeschneiderte Lösung\".",
    category: "PR_KREATIV",
    difficulty: "LEICHT",
    lessonSlug: "pr-marketing-texte",
    tags: ["Substanz"],
    practiceCase: false,
  },
  {
    text: "Die KI schreibt in deinen Aktionstext \"Testsieger 2026\" und \"Zufriedenheitsgarantie\". Beides existiert nicht. Was tust du?",
    options: [
      { text: "Beide Behauptungen streichen: Werbeaussagen müssen wahr und belegbar sein — erfundene Auszeichnungen und Garantien sind irreführende Werbung", correct: true },
      { text: "Drinlassen — Werbung darf übertreiben, das erwartet jeder", correct: false },
      { text: "Nur \"2026\" entfernen, dann ist \"Testsieger\" unverbindlich", correct: false },
      { text: "Den Text veröffentlichen und die Verantwortung der KI zuschreiben", correct: false },
    ],
    explanation:
      "KI erfindet großzügig Superlative und Versprechen. Jede tatsächliche Behauptung (Auszeichnungen, Garantien, Zahlen) muss belegbar sein — sonst drohen wettbewerbsrechtliche Konsequenzen, und verantwortlich ist das Unternehmen, nicht das Tool.",
    category: "PR_KREATIV",
    difficulty: "LEICHT",
    lessonSlug: "pr-marketing-texte",
    tags: ["Werberecht", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche vier Fragen beantwortet ein guter Bild-Prompt?",
    options: [
      { text: "Was ist zu sehen (Motiv), wie soll es aussehen (Stil/Stimmung), wie ist es aufgebaut (Perspektive/Komposition), wofür ist es (Zweck/Format)", correct: true },
      { text: "Wer malt, wann gemalt wird, wo gemalt wird, womit gemalt wird", correct: false },
      { text: "Preis, Lieferzeit, Auflösung, Dateiname", correct: false },
      { text: "Welches Tool, welche Version, welcher Server, welches Betriebssystem", correct: false },
    ],
    explanation:
      "Motiv, Stil, Aufbau, Zweck — mit diesen vier Angaben (plus Iteration) kommen Bildgeneratoren nah an die Vorstellung. Der Verwendungszweck steuert dabei Format und Bildsprache.",
    category: "PR_KREATIV",
    difficulty: "LEICHT",
    lessonSlug: "pr-bild-prompts",
    tags: ["Bild-Prompt"],
    practiceCase: false,
  },
  {
    text: "Das Marketing möchte den Geschäftsführer per Bild-KI in eine Szene montieren, für die er nie fotografiert wurde. Was gilt?",
    options: [
      { text: "Nur mit seiner ausdrücklichen Zustimmung — Bilder realer Personen ohne Einwilligung verletzen Persönlichkeitsrechte, auch firmenintern", correct: true },
      { text: "Unproblematisch, weil er Angestellter der Firma ist", correct: false },
      { text: "Erlaubt, solange das Bild schmeichelhaft ausfällt", correct: false },
      { text: "Erlaubt, wenn das Bild nur im Intranet verwendet wird", correct: false },
    ],
    explanation:
      "Generierte oder montierte Bilder realer Personen brauchen deren Zustimmung — Arbeitsverhältnis, Schmeichelei oder interne Nutzung ändern daran nichts. Dazu kommt je nach Verwendung die Kennzeichnungspflicht.",
    category: "PR_KREATIV",
    difficulty: "MITTEL",
    lessonSlug: "pr-bild-prompts",
    tags: ["Persönlichkeitsrecht", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wann verlangt der EU AI Act eine Kennzeichnung KI-generierter Bilder besonders klar?",
    options: [
      { text: "Wenn sie echten Personen, Orten oder Ereignissen täuschend ähnlich sind (Deepfakes) — dann muss die künstliche Erzeugung erkennbar sein", correct: true },
      { text: "Bei jedem Bild, das je ein KI-Tool berührt hat, selbst bei einfacher Helligkeitskorrektur", correct: false },
      { text: "Nur bei Bildern in Schwarz-Weiß", correct: false },
      { text: "Nie — Bilder sind vom AI Act ausgenommen", correct: false },
    ],
    explanation:
      "Die Transparenzpflicht zielt auf Täuschungspotenzial: Deepfakes müssen als künstlich erzeugt gekennzeichnet werden. Reine Werkzeug-Nutzung mit redaktioneller Verantwortung ist meist unkritisch — im Zweifel kennzeichnen und intern fragen.",
    category: "PR_KREATIV",
    difficulty: "MITTEL",
    lessonSlug: "pr-kennzeichnung-recap",
    tags: ["Kennzeichnung"],
    practiceCase: false,
  },
  {
    text: "Eine Kundin wünscht \"authentische Kundenstimmen\" — per KI generiert, mit kleinem KI-Hinweis darunter. Zulässig?",
    options: [
      { text: "Nein: Erfundene Testimonials sind irreführende Werbung — die Kennzeichnung schafft Transparenz über die Erzeugung, heilt aber keine inhaltliche Täuschung", correct: true },
      { text: "Ja: Mit KI-Hinweis ist jeder Inhalt zulässig", correct: false },
      { text: "Ja, solange die erfundenen Kunden keine echten Namen tragen", correct: false },
      { text: "Ja, wenn die Stimmen positiv formuliert sind", correct: false },
    ],
    explanation:
      "Täuschung ist die rote Linie: Eine Kundenstimme, die nie jemand gesagt hat, bleibt auch gekennzeichnet irreführend. Der saubere Weg: echte Stimmen einholen und die KI nur redigieren lassen.",
    category: "PR_KREATIV",
    difficulty: "SCHWER",
    lessonSlug: "pr-kennzeichnung-recap",
    tags: ["Testimonials", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum bestellst du beim KI-Brainstorming ausdrücklich Menge statt Qualität (\"20 Ideen, auch ungewöhnliche, keine Bewertung\")?",
    options: [
      { text: "Ohne Qualitätsdruck liefert das Modell breitere, ungewöhnlichere Ansätze — kuratieren aus zwanzig Rohideen ist ergiebiger als drei brave Vorschläge", correct: true },
      { text: "Weil das Modell pro Chat nur eine begrenzte Wortzahl hat, die man ausnutzen muss", correct: false },
      { text: "Weil viele Ideen automatisch viele gute Ideen bedeuten", correct: false },
      { text: "Um das Modell zu beschäftigen, während man selbst nachdenkt", correct: false },
    ],
    explanation:
      "Bei Ideenfindung ist die KI Rohstofflieferant, dein Urteil der Filter. Menge-vor-Güte-Aufträge verhindern, dass das Modell nur die statistisch \"sichersten\" (= langweiligsten) Ideen liefert.",
    category: "PR_KREATIV",
    difficulty: "MITTEL",
    lessonSlug: "pr-marketing-texte",
    tags: ["Brainstorming"],
    practiceCase: false,
  },

  // ===== PR_TOOLS (7) =====
  {
    text: "Welche vier Fragen stellst du an jedes neue KI-Tool, bevor du es beruflich nutzt?",
    options: [
      { text: "Was kann es? Wohin laufen die Daten? Was regelt der Vertrag (Training, Speicherort, AVV)? Ist es im Unternehmen freigegeben?", correct: true },
      { text: "Wie heißt es? Wie viele Nutzer hat es? Welche Farbe hat das Logo? Gibt es eine App?", correct: false },
      { text: "Ist es gratis? Ist es schnell? Ist es beliebt? Ist es neu?", correct: false },
      { text: "Keine — neue Tools probiert man einfach mit echten Daten aus", correct: false },
    ],
    explanation:
      "Fähigkeiten, Datenweg, Vertragslage, Freigabe — mit diesen Kriterien lässt sich jedes Tool einordnen, auch künftige. Markenwissen veraltet, Urteilsvermögen nicht.",
    category: "PR_TOOLS",
    difficulty: "LEICHT",
    lessonSlug: "pr-tool-landschaft",
    tags: ["Tool-Kriterien"],
    practiceCase: false,
  },
  {
    text: "Ein Mitarbeiter will statt des freigegebenen Firmen-Copilot sein privates ChatGPT-Konto für Kundendaten nutzen — \"funktioniert doch genauso\". Was ist der entscheidende Unterschied?",
    options: [
      { text: "Die Vertragslage: Der Firmenvertrag regelt Datennutzung fürs Training, Speicherorte und AVV — das Privatkonto tut nichts davon. Für Kundendaten kommt nur der freigegebene Zugang infrage", correct: true },
      { text: "Es gibt keinen — gleiche Bedienung heißt gleiche Datenlage", correct: false },
      { text: "Nur die Geschwindigkeit: Firmenverträge liefern schnellere Antworten", correct: false },
      { text: "Das Privatkonto ist sogar sicherer, weil es niemand kennt", correct: false },
    ],
    explanation:
      "Gleiche Oberfläche, völlig andere Regeln: Der entscheidende Tool-Unterschied steht im Vertrag, nicht in der Bedienung. Privatkonto und Unternehmensvertrag desselben Anbieters sind zwei Welten.",
    category: "PR_TOOLS",
    difficulty: "MITTEL",
    lessonSlug: "pr-tool-landschaft",
    tags: ["Privatkonto", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was verschiebt sich in der Prompt-Formel, wenn du einen eingebetteten Assistenten (z. B. im Schreib- oder Mailprogramm) nutzt?",
    options: [
      { text: "Der Kontext füllt sich teilweise automatisch, weil der Assistent Dokument oder Postfach sieht — Ziel und Format werden dadurch umso wichtiger", correct: true },
      { text: "Die Formel gilt nicht mehr — eingebettete Assistenten brauchen keine Prompts", correct: false },
      { text: "Nur der Ton entfällt, alles andere bleibt gleich", correct: false },
      { text: "Eingebettete Assistenten verstehen ausschließlich englische Anweisungen", correct: false },
    ],
    explanation:
      "Die Einbettung liefert den Kontext (das Dokument ist da) — die übrigen Bausteine bleiben deine Aufgabe: \"Überarbeite den markierten Abschnitt: halbe Länge, aktive Sprache, Zielgruppe Neukunden.\"",
    category: "PR_TOOLS",
    difficulty: "MITTEL",
    lessonSlug: "pr-unterschiede-nutzen",
    tags: ["Einbettung"],
    practiceCase: false,
  },
  {
    text: "Ein Team will den KI-Meeting-Assistenten für automatische Protokolle nutzen. Was muss vorher geklärt sein?",
    options: [
      { text: "Alle Teilnehmenden werden informiert, externe Gäste gefragt, heikle Inhalte bleiben draußen — und die interne Regelung bestimmt, was zulässig ist", correct: true },
      { text: "Nichts — Meeting-Aufzeichnung ist immer erlaubt, weil sie praktisch ist", correct: false },
      { text: "Nur, ob die Aufnahmequalität gut genug ist", correct: false },
      { text: "Nur, ob der Chef auch im Meeting sitzt", correct: false },
    ],
    explanation:
      "Transparenz gegenüber allen Beteiligten ist Pflicht, externe Gäste brauchen eine echte Wahl, und je nach Inhalt (Personalthemen!) stellt sich die Frage, ob aufgezeichnet werden darf. Komfort ändert nichts an den Regeln.",
    category: "PR_TOOLS",
    difficulty: "MITTEL",
    lessonSlug: "pr-unterschiede-nutzen",
    tags: ["Meeting-KI", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum ist es klüger, Prompt-Prinzipien zu lernen als die Klickwege eines bestimmten Tools?",
    options: [
      { text: "Prinzipien folgen aus der Funktionsweise von Sprachmodellen und überleben jeden Tool- und Modellwechsel — Klickwege veralten mit jedem Update", correct: true },
      { text: "Weil Klickwege geheim sind und nicht weitergegeben werden dürfen", correct: false },
      { text: "Weil sich Tools nie ändern und man daher nichts Neues lernen muss", correct: false },
      { text: "Prinzipien sind nicht klüger — nur das Auswendiglernen von Menüs zählt", correct: false },
    ],
    explanation:
      "Formel, Iteration, Quellenbindung, Prüfpflicht: Diese Regeln gelten in jedem Assistenten, weil sie aus der Technik folgen. Wer Prinzipien beherrscht, wechselt das Tool in Stunden statt Wochen.",
    category: "PR_TOOLS",
    difficulty: "LEICHT",
    lessonSlug: "pr-prinzipien-uebertragen",
    tags: ["Prinzipien"],
    practiceCase: false,
  },
  {
    text: "Dein Unternehmen wechselt den KI-Anbieter. Wie überträgst du deine Arbeitsweise am schnellsten?",
    options: [
      { text: "Die wichtigsten dokumentierten Prompt-Vorlagen im neuen Tool testen und gezielt nachjustieren — die Struktur bleibt, meist reichen kleine Anpassungen", correct: true },
      { text: "Bei null anfangen — altes Prompt-Wissen ist beim Anbieterwechsel wertlos", correct: false },
      { text: "Das alte Tool heimlich weiterverwenden", correct: false },
      { text: "Auf KI verzichten, bis das alte Tool zurückkommt", correct: false },
    ],
    explanation:
      "Bewährte Prompts sind übertragbares Kapital: Modelle reagieren leicht unterschiedlich (Länge, Gesprächigkeit), aber die Formel-Struktur funktioniert überall. Testaufgaben mit bekanntem Soll-Ergebnis zeigen die nötigen Justierungen.",
    category: "PR_TOOLS",
    difficulty: "LEICHT",
    lessonSlug: "pr-prinzipien-uebertragen",
    tags: ["Tool-Wechsel", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Kollege schwärmt von einem \"geheimen Wunder-Tool\" und will es sofort fürs Team einführen — an der Freigabe vorbei. Wie reagierst du richtig?",
    options: [
      { text: "Auf den Freigabeprozess verweisen: Neue Tools werden geprüft (Datenweg, Vertrag), bevor Firmendaten hineinfließen — das Wunder-Tool hat dieselben Sprachmodell-Grenzen", correct: true },
      { text: "Sofort mitmachen — wer zuerst kommt, promptet zuerst", correct: false },
      { text: "Das Tool heimlich testen, aber nur mit den unwichtigeren Kundendaten", correct: false },
      { text: "Dem Kollegen das Tool wegnehmen und selbst exklusiv nutzen", correct: false },
    ],
    explanation:
      "Geheimtipp-Tools an der Freigabe vorbei holen genau die Datenschutz-Risiken zurück, die der Prozess aussortiert. \"Unwichtigere Kundendaten\" gibt es nicht — der Tool-Wunsch gehört in den Freigabeweg.",
    category: "PR_TOOLS",
    difficulty: "MITTEL",
    lessonSlug: "pr-prinzipien-uebertragen",
    tags: ["Schatten-IT", "Praxisfall"],
    practiceCase: true,
  },

  // ===== PR_SICHERHEIT (8) =====
  {
    text: "Nach welcher Grundregel behandelst du jeden Prompt an ein externes KI-Tool?",
    options: [
      { text: "Wie eine E-Mail an einen externen Dienstleister: Was man dem nicht schicken würde, gehört auch nicht in den Prompt — außer das Tool ist genau dafür freigegeben", correct: true },
      { text: "Wie einen Zettel im eigenen Notizbuch — Prompts bleiben immer privat", correct: false },
      { text: "Wie ein Selbstgespräch ohne jede Außenwirkung", correct: false },
      { text: "Wie einen anonymen Foreneintrag, der niemandem zugeordnet werden kann", correct: false },
    ],
    explanation:
      "Eingaben verlassen das Haus und liegen beim Anbieter. Die Dienstleister-Analogie macht die richtige Sorgfalt intuitiv: Kundendaten, Geheimnisse und Personaldaten nur in ausdrücklich freigegebene Tools.",
    category: "PR_SICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "pr-datenschutz-beim-prompten",
    tags: ["Grundregel"],
    practiceCase: false,
  },
  {
    text: "\"Der Abteilungsleiter unserer Grazer Niederlassung, der letzten Monat den Vorfall hatte\" — ist diese Prompt-Formulierung anonym?",
    options: [
      { text: "Nein: Trotz fehlenden Namens ist die Person über die Details identifizierbar — Schein-Anonymisierung. Der Kollegen-Test (\"könnte jemand erraten, wer gemeint ist?\") schlägt fehl", correct: true },
      { text: "Ja: Ohne Namen ist jede Beschreibung automatisch anonym", correct: false },
      { text: "Ja, solange der Prompt nicht ausgedruckt wird", correct: false },
      { text: "Ja, wenn man \"in Graz\" durch \"in einer Stadt\" ersetzt und alles andere lässt", correct: false },
    ],
    explanation:
      "Anonymisierung heißt: Rolle statt Name, Kennungen raus, identifizierende Details verallgemeinern. Wenn Kollegen die Person erraten könnten, ist es nicht anonym — Funktion + Ort + Ereignis reichen oft zur Identifikation.",
    category: "PR_SICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "pr-datenschutz-beim-prompten",
    tags: ["Anonymisierung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Dir ist versehentlich eine echte Kundenliste in einen Prompt gerutscht. Was ist die richtige Reaktion?",
    options: [
      { text: "Sofort über den internen Meldeweg melden — schnelle Meldung macht den Fehler beherrschbar, Vertuschen macht ihn zum Zeitzünder", correct: true },
      { text: "Chat löschen und schweigen — dann ist nichts passiert", correct: false },
      { text: "Abwarten, ob sich jemand beschwert", correct: false },
      { text: "Die Liste zur Sicherheit noch einmal eingeben, um zu prüfen, ob das Tool sie gespeichert hat", correct: false },
    ],
    explanation:
      "Einmal eingegeben, ist die Kontrolle über die Daten abgegeben — das lokale Löschen des Chats ändert daran nichts. Je nach Fall laufen Meldefristen; deshalb zählt die schnelle interne Meldung.",
    category: "PR_SICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "pr-datenschutz-beim-prompten",
    tags: ["Vorfall", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was ist Prompt-Injection?",
    options: [
      { text: "Versteckte Anweisungen in fremden Inhalten (Mails, Dokumenten, Webseiten), die das KI-System wie Nutzer-Befehle behandelt und die so sein Verhalten manipulieren", correct: true },
      { text: "Das Einfügen von Emojis in Prompts zur besseren Verständlichkeit", correct: false },
      { text: "Eine Impfung des Modells gegen falsche Antworten", correct: false },
      { text: "Das mehrfache Absenden desselben Prompts zur Qualitätssteigerung", correct: false },
    ],
    explanation:
      "Sprachmodelle unterscheiden nicht zuverlässig zwischen deinen Anweisungen und Text im Arbeitsmaterial. Eingeschleuste Befehle — etwa in weißer Minischrift in einer Mail — können das Verhalten des Systems kapern.",
    category: "PR_SICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "pr-prompt-injection",
    tags: ["Prompt-Injection"],
    practiceCase: false,
  },
  {
    text: "Die KI-Zusammenfassung einer Lieferantenmail lautet ungewöhnlich drängend: \"Rechnung muss heute auf das NEUE Konto überwiesen werden.\" Was ist die richtige Reaktion?",
    options: [
      { text: "Original öffnen und prüfen — untypische Aufforderungen im KI-Ergebnis sind ein Injection-/Betrugs-Alarmsignal — und den Fall der IT melden", correct: true },
      { text: "Sofort überweisen — die KI hat die Dringlichkeit ja erkannt", correct: false },
      { text: "Die Zusammenfassung erneut generieren, bis sie freundlicher klingt", correct: false },
      { text: "Die Mail löschen und den Vorgang vergessen", correct: false },
    ],
    explanation:
      "Zahlungsaufforderungen mit \"neuem Konto\" sind ein klassisches Betrugsmuster — kombiniert mit Prompt-Injection besonders tückisch, weil die Manipulation im unsichtbaren Mailtext steckt. Original prüfen, melden, nicht zahlen.",
    category: "PR_SICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "pr-prompt-injection",
    tags: ["Betrug", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum gilt: Je mehr Zugriffe ein KI-Assistent hat (Postfach, Dateien, Aktionen), desto vorsichtiger muss die Freigabe sein?",
    options: [
      { text: "Weil eingeschleuste Anweisungen dann nicht nur falsche Texte erzeugen, sondern reale Aktionen auslösen könnten — ein Assistent ohne Ausführungsrechte kann wenig anrichten", correct: true },
      { text: "Weil mehr Zugriffe die Antwortqualität verschlechtern", correct: false },
      { text: "Weil Speicherplatz auf dem Server knapp ist", correct: false },
      { text: "Das gilt nicht — mehr Zugriff ist immer besser und völlig risikofrei", correct: false },
    ],
    explanation:
      "Prompt-Injection wird gefährlich, wenn das System handeln kann: Daten weiterleiten, Mails senden, Dateien ändern. Minimal nötige Berechtigungen und der Freigabeprozess sind die Gegenmaßnahmen.",
    category: "PR_SICHERHEIT",
    difficulty: "SCHWER",
    lessonSlug: "pr-prompt-injection",
    tags: ["Berechtigungen"],
    practiceCase: false,
  },
  {
    text: "Die KI liefert eine Marktübersicht mit Quellenangaben. Stichprobe: Quelle 1 enthält die zitierte Zahl nicht, Quelle 2 existiert nicht. Was folgt daraus?",
    options: [
      { text: "Die gesamte Antwort gilt als unzuverlässig: alles einzeln prüfen oder verwerfen — und besser mit Quellenbindung an echte Dokumente neu arbeiten", correct: true },
      { text: "Nur die zwei geprüften Stellen korrigieren, der Rest wird schon stimmen", correct: false },
      { text: "Die Quellenangaben löschen und die Zahlen ohne Beleg verwenden", correct: false },
      { text: "Die Übersicht trotzdem präsentieren — bei Nachfragen kann man auf die KI verweisen", correct: false },
    ],
    explanation:
      "Fällt eine Stichprobe durch, ist das Vertrauen in die ganze Antwort dahin — erfundene Belege sehen täuschend echt aus. Der belastbare Weg: echte Berichte hochladen und nur daraus zusammenfassen lassen.",
    category: "PR_SICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "pr-halluzinationen-kontrollieren",
    tags: ["Quellen", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche drei Prüfstufen kennt das Halluzinations-Prüfsystem dieses Kurses?",
    options: [
      { text: "Plausibilität (für Unwichtiges), Stichprobe (für den Alltag), Vollprüfung (für alles mit Folgen)", correct: true },
      { text: "Lesen, Drucken, Abheften", correct: false },
      { text: "Raten, Hoffen, Veröffentlichen", correct: false },
      { text: "Erste Meinung, zweite Meinung, dritte Meinung — alle von derselben KI", correct: false },
    ],
    explanation:
      "Nicht alles gleich streng prüfen, sondern nach Risiko abstufen: kurzer Plausibilitätsblick bei Kleinkram, zwei bis drei geprüfte Kernaussagen im Alltag, Einzelverifikation jeder Tatsachenbehauptung vor Angeboten, Verträgen und Veröffentlichungen.",
    category: "PR_SICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "pr-halluzinationen-kontrollieren",
    tags: ["Prüfsystem"],
    practiceCase: false,
  },

  // ===== PR_BIBLIOTHEK (6) =====
  {
    text: "Welche fünf Bausteine hat ein guter Eintrag in der Team-Prompt-Bibliothek?",
    options: [
      { text: "Name/Zweck, vollständiger Prompt mit markierten Platzhaltern, Einsetz-Anleitung (inkl. Anonymisierung), Beispiel-Ergebnis, Hinweise zu Grenzen und Prüfpflichten", correct: true },
      { text: "Autor, Datum, Schriftart, Farbe, Dateigröße", correct: false },
      { text: "Nur der Prompt selbst — alles andere ist überflüssig", correct: false },
      { text: "Passwort, Lizenzschlüssel, Servername, IP-Adresse, Portnummer", correct: false },
    ],
    explanation:
      "Ein Eintrag muss ohne Rückfragen nutzbar sein: finden (Name/Zweck), verwenden (Prompt + Anleitung), beurteilen (Beispiel) und sicher einsetzen (Grenzen/Prüfhinweise).",
    category: "PR_BIBLIOTHEK",
    difficulty: "LEICHT",
    lessonSlug: "pr-prompts-dokumentieren",
    tags: ["Bibliothek"],
    practiceCase: false,
  },
  {
    text: "Wie verankerst du Datenschutz direkt in einer Prompt-Vorlage?",
    options: [
      { text: "Platzhalter wie [KUNDENTYP] statt echter Daten verwenden und anweisen, echte Namen erst NACH der KI-Prüfung im fertigen Text einzusetzen", correct: true },
      { text: "Einen Hinweis \"Datenschutz beachten!\" ans Ende schreiben und echte Namen im Prompt lassen", correct: false },
      { text: "Die Vorlage nur ausgedruckt weitergeben", correct: false },
      { text: "Gar nicht — Datenschutz ist bei Vorlagen technisch unmöglich", correct: false },
    ],
    explanation:
      "Platzhalter machen die Vorlage automatisch datensparsam: Der Prompt funktioniert mit \"Kunde A\", der echte Name kommt erst ins geprüfte Endergebnis — außerhalb des KI-Tools.",
    category: "PR_BIBLIOTHEK",
    difficulty: "MITTEL",
    lessonSlug: "pr-prompts-dokumentieren",
    tags: ["Platzhalter"],
    practiceCase: false,
  },
  {
    text: "Nach einem Modell-Update produziert der bewährte Team-Prompt plötzlich seitenlange Vorreden. Was ist der richtige Umgang?",
    options: [
      { text: "Vorlage testen, gezielt ergänzen (z. B. \"Keine Einleitung, beginne direkt mit dem Betreff\"), Änderung mit Datum und Grund vermerken und das Team informieren", correct: true },
      { text: "Jeder Nutzer bastelt still seine eigene Reparatur — die Bibliothek bleibt unverändert", correct: false },
      { text: "Die Bibliothek komplett löschen und ohne Vorlagen weiterarbeiten", correct: false },
      { text: "Das Modell-Update rückgängig machen lassen", correct: false },
    ],
    explanation:
      "Zentrale Pflege statt zwanzig Einzelreparaturen: testen, justieren, versionieren (Datum + Kurznotiz), kommunizieren. Genau dafür braucht die Bibliothek eine verantwortliche Person.",
    category: "PR_BIBLIOTHEK",
    difficulty: "MITTEL",
    lessonSlug: "pr-vorlagen-standardisieren",
    tags: ["Pflege", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Kollege übernimmt eine geprüfte Bibliotheks-Vorlage, das Ergebnis enthält aber eine falsche Zahl, die er ungeprüft verschickt. Wer ist verantwortlich?",
    options: [
      { text: "Er selbst: Die Vorlage nimmt Formulierungsarbeit ab, nicht die Prüfung — Verantwortung für Fakten, Zahlen und Zusagen bleibt beim Nutzer", correct: true },
      { text: "Die Person, die die Vorlage in die Bibliothek gestellt hat", correct: false },
      { text: "Der KI-Anbieter, der das Modell betreibt", correct: false },
      { text: "Niemand — Fehler aus Team-Vorlagen sind entschuldigt", correct: false },
    ],
    explanation:
      "\"Aber die Vorlage war so\" gibt es nicht: Die Vorlage ist Werkzeug, keine Ausrede. Deshalb gehören Prüfhinweise in jeden Eintrag — sie machen die bleibende Verantwortung konkret.",
    category: "PR_BIBLIOTHEK",
    difficulty: "MITTEL",
    lessonSlug: "pr-vorlagen-standardisieren",
    tags: ["Verantwortung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche drei Fragen klärst du laut Abschluss-Checkliste VOR jedem Prompt?",
    options: [
      { text: "Was genau will ich (messbar)? Darf dieses Material in dieses Tool (Freigabe/Anonymisierung)? Habe ich alles beisammen, was das Modell nicht wissen kann?", correct: true },
      { text: "Welches Wetter ist heute? Wer hat Geburtstag? Was gibt es zu Mittag?", correct: false },
      { text: "Wie umgehe ich die Freigabe? Wie verstecke ich die KI-Nutzung? Wem schiebe ich Fehler zu?", correct: false },
      { text: "Welche Version hat das Modell? Wie viele Server laufen? Wie hoch ist die Auslastung?", correct: false },
    ],
    explanation:
      "Ziel, Freigabe, Vollständigkeit — die drei Vorab-Fragen der Checkliste. Sie verhindern die häufigsten Fehler: unklare Aufträge, Datenschutzverstöße und Halluzinationen aus Wissenslücken.",
    category: "PR_BIBLIOTHEK",
    difficulty: "LEICHT",
    lessonSlug: "pr-abschluss-checkliste",
    tags: ["Checkliste"],
    practiceCase: false,
  },
  {
    text: "Was gehört NICHT in die Team-Prompt-Bibliothek?",
    options: [
      { text: "Ungeprüfte Prompts und Einmal-Aufgaben — ungeprüfte Einträge standardisieren Fehler mit Ansage", correct: true },
      { text: "Die wiederkehrenden Standard-Aufgaben des Teams", correct: false },
      { text: "Firmen-Bausteine wie Kurzprofil und Ton-Vorgaben", correct: false },
      { text: "Überraschend gute Prompt-Funde nach Prüfung", correct: false },
    ],
    explanation:
      "Die Bibliothek lebt vom Vertrauen in ihre Qualität: Hinein gehören geprüfte, wiederkehrende Prompts und Standard-Bausteine — Einmal-Prompts stiften keinen Nutzen, ungeprüfte Einträge schaden.",
    category: "PR_BIBLIOTHEK",
    difficulty: "LEICHT",
    lessonSlug: "pr-prompts-dokumentieren",
    tags: ["Qualität"],
    practiceCase: false,
  },
];
