import type { SeedQuestion } from "./content-questions-1";

/**
 * Fragenpool Kurs 2 „KI-Verantwortliche & KI-Beauftragte", Teil 1/2.
 * Kategorien: ROLLE_MANDAT, AI_ACT_SYSTEMATIK, ROLLEN_PFLICHTEN,
 * INVENTAR_RISIKO, SCHULUNG_NACHWEISE.
 * Konvention: richtige Antwort in den Rohdaten an Position A (Seed mischt).
 * Hoher Praxisfall-Anteil ist gewollt (Ziel ≥ 40 %).
 */
export const seedQuestionsOfficer1: SeedQuestion[] = [
  // ===== ROLLE_MANDAT (8) =====
  {
    text: "Schreibt der EU AI Act Unternehmen die Benennung eines \"KI-Beauftragten\" als Funktion vor?",
    options: [
      { text: "Nein – aber die Pflichten treffen das Unternehmen, weshalb eine bewusst zugewiesene Koordinationsrolle sinnvoll ist", correct: true },
      { text: "Ja – jedes Unternehmen mit mehr als 10 Mitarbeitenden muss einen KI-Beauftragten bestellen", correct: false },
      { text: "Ja – aber nur für Unternehmen, die eigene KI-Modelle entwickeln", correct: false },
      { text: "Nein – KI-Governance ist gesetzlich vollständig freiwillig", correct: false },
    ],
    explanation:
      "Anders als die DSGVO beim Datenschutzbeauftragten kennt der AI Act keine vorgeschriebene Funktion. Die Pflichten (Art. 4, Transparenz, ggf. Hochrisiko-Betreiberpflichten) treffen aber das Unternehmen – irgendjemand muss sie organisieren.",
    category: "ROLLE_MANDAT",
    difficulty: "LEICHT",
    lessonSlug: "off-rolle-und-auftrag",
    tags: ["Rolle", "Rechtsgrundlage"],
    practiceCase: false,
  },
  {
    text: "Dir wird die Rolle der KI-Verantwortlichen angeboten – \"machst du einfach nebenbei mit\". Was ist die richtige Reaktion?",
    options: [
      { text: "Vor der Zusage ein schriftliches Mandat verlangen: Auftrag, Befugnisse, Zeitbudget und Berichtslinie", correct: true },
      { text: "Sofort annehmen – die Details ergeben sich im Laufe der Zeit von selbst", correct: false },
      { text: "Ablehnen, weil die Rolle ohne juristisches Studium nicht ausübbar ist", correct: false },
      { text: "Annehmen, aber die Rolle bewusst nur auf dem Papier führen", correct: false },
    ],
    explanation:
      "Eine Rolle ohne schriftliches Mandat (Auftrag, Befugnisse, Ressourcen, Berichtslinie) ist ein Feigenblatt: Das Unternehmen wiegt sich in Sicherheit, während die Person nichts bewirken kann.",
    category: "ROLLE_MANDAT",
    difficulty: "MITTEL",
    lessonSlug: "off-mandat-und-grenzen",
    tags: ["Mandat", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Bereichsleiter ignoriert wiederholt deine Nachfragen zum KI-Tool seiner Abteilung. Was stärkt deine Position am nachhaltigsten?",
    options: [
      { text: "Ein von der Geschäftsleitung unterzeichnetes Mandat mit Auskunftsrechten, auf das du dich berufen kannst", correct: true },
      { text: "Die Nachfragen einstellen, um den Konflikt zu vermeiden", correct: false },
      { text: "Das Tool seiner Abteilung eigenmächtig sperren lassen, ohne jemanden zu informieren", correct: false },
      { text: "Den Konflikt in der Kaffeeküche öffentlich austragen", correct: false },
    ],
    explanation:
      "Ohne dokumentierte Befugnisse bist du auf Goodwill angewiesen. Ein unterschriebenes Mandat mit Auskunftsrechten macht aus der Bitte eine legitime Anforderung – und Eskalation läuft dann geordnet statt persönlich.",
    category: "ROLLE_MANDAT",
    difficulty: "MITTEL",
    lessonSlug: "off-mandat-und-grenzen",
    tags: ["Befugnisse", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche Aussage beschreibt das Verhältnis der KI-Verantwortlichen zur Geschäftsleitung korrekt?",
    options: [
      { text: "Die KI-Verantwortliche koordiniert und berät – die rechtliche Letztverantwortung bleibt bei der Geschäftsleitung", correct: true },
      { text: "Mit der Benennung geht die volle rechtliche Verantwortung auf die KI-Verantwortliche über", correct: false },
      { text: "Die Geschäftsleitung darf nach der Benennung keine KI-Entscheidungen mehr treffen", correct: false },
      { text: "Die KI-Verantwortliche haftet persönlich für alle KI-Fehler der Mitarbeitenden", correct: false },
    ],
    explanation:
      "Die Rolle ist Koordination und Beratung: Überblick schaffen, Prozesse etablieren, Entscheidungsvorlagen liefern. Die Letztverantwortung trägt die Geschäftsleitung – dokumentierte Empfehlungen machen die Verantwortungsteilung nachvollziehbar.",
    category: "ROLLE_MANDAT",
    difficulty: "LEICHT",
    lessonSlug: "off-rolle-und-auftrag",
    tags: ["Verantwortung"],
    practiceCase: false,
  },
  {
    text: "Eine Fachabteilung fragt dich nach einer verbindlichen Auskunft zu einer Haftungsklausel im KI-Anbietervertrag. Wie reagierst du richtig?",
    options: [
      { text: "Die fachliche Frage strukturieren und an Rechtsberatung/Einkauf weitergeben – keine eigene Rechtsauskunft erteilen", correct: true },
      { text: "Selbst eine Einschätzung abgeben – als KI-Verantwortliche(r) bist du automatisch auch Rechtsberater(in)", correct: false },
      { text: "Die Frage ignorieren, weil Verträge nicht zur Rolle gehören", correct: false },
      { text: "Der Abteilung raten, die Klausel einfach zu akzeptieren – wird schon passen", correct: false },
    ],
    explanation:
      "Zur Rollenklarheit gehören die Grenzen: Bei echten Rechtsfragen koordinierst du die fachliche Klärung, statt selbst Rechtsauskünfte zu erteilen. Falsche Auskünfte untergraben die Glaubwürdigkeit der Rolle und schaffen Risiken.",
    category: "ROLLE_MANDAT",
    difficulty: "MITTEL",
    lessonSlug: "off-mandat-und-grenzen",
    tags: ["Grenzen", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum sollte die KI-verantwortliche Person eine direkte Berichtslinie zur Geschäftsleitung haben?",
    options: [
      { text: "Weil Warnungen und Entscheidungsbedarfe über mehrere Hierarchieebenen verwässern und zu spät ankommen", correct: true },
      { text: "Weil die Geschäftsleitung alle Freigabeanträge persönlich unterschreiben muss", correct: false },
      { text: "Weil das Gesetz eine wöchentliche Berichtspflicht an den Vorstand vorschreibt", correct: false },
      { text: "Damit die Rolle ein höheres Gehalt rechtfertigt", correct: false },
    ],
    explanation:
      "Governance lebt von kurzen Eskalationswegen: Ernste Risiken und Entscheidungsbedarfe müssen unverfälscht und schnell bei den Entscheidern ankommen – Flüsterpost über drei Ebenen leistet das nicht.",
    category: "ROLLE_MANDAT",
    difficulty: "LEICHT",
    lessonSlug: "off-mandat-und-grenzen",
    tags: ["Berichtslinie"],
    practiceCase: false,
  },
  {
    text: "Du startest neu in der Rolle. Welche erste Maßnahme bringt am meisten?",
    options: [
      { text: "Strukturierte Gespräche mit Geschäftsleitung, Datenschutz, IT und den wichtigsten Fachabteilungen zur Aufgabenteilung", correct: true },
      { text: "Sofort ein 30-seitiges Regelwerk schreiben und per E-Mail verteilen", correct: false },
      { text: "Alle KI-Tools im Unternehmen vorsorglich sperren lassen", correct: false },
      { text: "Ein teures Governance-Softwarepaket kaufen, bevor der Bedarf klar ist", correct: false },
    ],
    explanation:
      "Die Rolle lebt von Schnittstellen: Wer zuerst die Aufgabenteilung mit Datenschutz, IT und Fachbereichen klärt, baut ein funktionierendes Netzwerk auf – Regelwerke und Tools kommen danach und passen dann zum Bedarf.",
    category: "ROLLE_MANDAT",
    difficulty: "MITTEL",
    lessonSlug: "off-kompetenzprofil-schnittstellen",
    tags: ["Schnittstellen", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche Kombination beschreibt das Kompetenzprofil der Rolle am besten?",
    options: [
      { text: "Technisches Grundverständnis, Prozessdenken, Kommunikationsstärke und Hartnäckigkeit ohne Alarmismus", correct: true },
      { text: "Programmierkenntnisse auf Entwicklerniveau und ein Jurastudium", correct: false },
      { text: "Vor allem Verkaufstalent, um KI-Tools intern zu bewerben", correct: false },
      { text: "Ausschließlich Datenschutz-Fachwissen", correct: false },
    ],
    explanation:
      "Die Rolle braucht kein Entwickler- oder Juristenprofil: Entscheidend sind solides KI-Grundverständnis, die Fähigkeit, Prozesse zu bauen, verständliche Kommunikation in alle Richtungen und konsequentes Dranbleiben ohne Panikmache.",
    category: "ROLLE_MANDAT",
    difficulty: "LEICHT",
    lessonSlug: "off-kompetenzprofil-schnittstellen",
    tags: ["Kompetenzprofil"],
    practiceCase: false,
  },
  // ===== AI_ACT_SYSTEMATIK (9) =====
  {
    text: "Nach welchem Grundprinzip reguliert der EU AI Act künstliche Intelligenz?",
    options: [
      { text: "Risikobasiert: Je riskanter der Einsatzzweck, desto strenger die Anforderungen", correct: true },
      { text: "Technologiebasiert: Jede neuronale Netzarchitektur wird einzeln zugelassen", correct: false },
      { text: "Pauschal: Alle KI-Systeme unterliegen identischen Pflichten", correct: false },
      { text: "Freiwillig: Der AI Act ist eine unverbindliche Empfehlung", correct: false },
    ],
    explanation:
      "Der AI Act folgt dem risikobasierten Ansatz: verbotene Praktiken, Hochrisiko-Systeme mit strengen Pflichten, Transparenzpflichten für bestimmte Systeme und minimale Anforderungen für den großen Rest – reguliert wird der Einsatzzweck, nicht die Technologie an sich.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "LEICHT",
    lessonSlug: "off-systematik-risikoklassen",
    tags: ["Risikoklassen", "Systematik"],
    practiceCase: false,
  },
  {
    text: "Der Vertrieb will ein Tool einführen, das eingehende Bewerbungen automatisch bewertet und aussortiert. Wie stufst du das ein?",
    options: [
      { text: "Hochrisiko-Bereich (Beschäftigung/Personalauswahl) – Einführung nur als Projekt mit voller Pflichtenprüfung", correct: true },
      { text: "Minimales Risiko – Bewerbungen sind ohnehin Firmendaten", correct: false },
      { text: "Nur transparenzpflichtig – ein Hinweis in der Stellenanzeige genügt", correct: false },
      { text: "Verbotene Praktik – jede KI im Personalbereich ist untersagt", correct: false },
    ],
    explanation:
      "KI zur Bewerberauswahl gehört zu den Hochrisiko-Anwendungen (Anhang III: Beschäftigung). Sie ist nicht verboten, verlangt aber das volle Pflichtenprogramm – u. a. menschliche Aufsicht, Information der Betroffenen und Protokollierung.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "MITTEL",
    lessonSlug: "off-systematik-risikoklassen",
    tags: ["Hochrisiko", "Recruiting", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Anbieter präsentiert ein Callcenter-Tool, das per Stimmanalyse \"die Emotionen der Mitarbeitenden für besseres Coaching\" auswertet. Deine Einschätzung?",
    options: [
      { text: "Emotionserkennung am Arbeitsplatz ist grundsätzlich verboten – Ablehnung und Dokumentation der Entscheidung", correct: true },
      { text: "Unkritisch, solange die Führungskräfte die Auswertungen vertraulich behandeln", correct: false },
      { text: "Erlaubt, wenn die Mitarbeitenden im Arbeitsvertrag pauschal zugestimmt haben", correct: false },
      { text: "Nur eine Datenschutzfrage – der Datenschutzbeauftragte entscheidet allein", correct: false },
    ],
    explanation:
      "KI zur Emotionserkennung am Arbeitsplatz gehört zu den verbotenen Praktiken (enge Ausnahmen nur für Medizin/Sicherheit) – unabhängig vom Marketing des Anbieters. Verstöße fallen in die höchste Bußgeldkategorie.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "SCHWER",
    lessonSlug: "off-verbotene-praktiken-vertieft",
    tags: ["Verbotene Praktiken", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wie hoch können Bußgelder für verbotene KI-Praktiken nach dem AI Act maximal ausfallen?",
    options: [
      { text: "Bis zu 35 Millionen Euro oder 7 % des weltweiten Jahresumsatzes", correct: true },
      { text: "Maximal 10.000 Euro pro Verstoß", correct: false },
      { text: "Bußgelder sind im AI Act nicht vorgesehen", correct: false },
      { text: "Bis zu 1 % des nationalen Umsatzes, höchstens 100.000 Euro", correct: false },
    ],
    explanation:
      "Verbotene Praktiken bilden die höchste Bußgeldstufe des AI Act: bis zu 35 Mio. Euro oder 7 % des weltweiten Jahresumsatzes – je nachdem, welcher Betrag höher ist.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "MITTEL",
    lessonSlug: "off-verbotene-praktiken-vertieft",
    tags: ["Bußgeld"],
    practiceCase: false,
  },
  {
    text: "Euer Unternehmen betreibt ein Hochrisiko-System zur Rechnungs-Bonitätsprüfung. Welche Betreiberpflicht wird im Alltag am häufigsten vernachlässigt?",
    options: [
      { text: "Echte menschliche Aufsicht durch geschulte, eingriffsbefugte Personen statt bloßem Durchklicken", correct: true },
      { text: "Die Pflicht, das System monatlich neu zu kaufen", correct: false },
      { text: "Die Pflicht, alle Ergebnisse öffentlich zu publizieren", correct: false },
      { text: "Die Pflicht, das System nachts abzuschalten", correct: false },
    ],
    explanation:
      "Die menschliche Aufsicht ist die praktisch anspruchsvollste Betreiberpflicht: Die Person muss kompetent, informiert und tatsächlich eingriffsbefugt sein – ein Feigenblatt-Klick auf \"bestätigen\" erfüllt die Pflicht nicht.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "MITTEL",
    lessonSlug: "off-hochrisiko-pflichten",
    tags: ["Betreiberpflichten", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was müssen Beschäftigte erfahren, bevor ein Hochrisiko-KI-System bei ihnen am Arbeitsplatz eingesetzt wird?",
    options: [
      { text: "Sie müssen vorab darüber informiert werden, dass und wie das System bei ihnen eingesetzt wird", correct: true },
      { text: "Nichts – Arbeitgeber dürfen Hochrisiko-Systeme verdeckt einsetzen", correct: false },
      { text: "Nur der Betriebsrat erfährt davon, die Beschäftigten nicht", correct: false },
      { text: "Sie erfahren es erst, wenn das System eine Entscheidung über sie getroffen hat", correct: false },
    ],
    explanation:
      "Betreiber müssen Beschäftigte (und ggf. deren Vertreter) vor der Inbetriebnahme eines Hochrisiko-Systems am Arbeitsplatz informieren – verdeckter Einsatz verletzt die Betreiberpflichten.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "MITTEL",
    lessonSlug: "off-hochrisiko-pflichten",
    tags: ["Information", "Beschäftigte"],
    practiceCase: false,
  },
  {
    text: "Welche Transparenzpflicht trifft praktisch fast jedes Unternehmen mit Kundenkontakt?",
    options: [
      { text: "Chatbots müssen sich als KI zu erkennen geben, und täuschend echte KI-Inhalte (Deepfakes) müssen offengelegt werden", correct: true },
      { text: "Jede interne E-Mail mit KI-Beteiligung braucht ein amtliches Wasserzeichen", correct: false },
      { text: "Alle KI-Nutzer müssen sich in ein öffentliches Register eintragen", correct: false },
      { text: "Firmen müssen ihre Prompts auf der Website veröffentlichen", correct: false },
    ],
    explanation:
      "Art. 50 AI Act verlangt u. a.: KI-Interaktion erkennbar machen (Chatbots) und täuschend echte KI-Inhalte kennzeichnen. Das betrifft nahezu jedes Unternehmen mit Chatbot oder KI-generierten Medien.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "LEICHT",
    lessonSlug: "off-gpai-transparenzpflichten",
    tags: ["Transparenz", "Art. 50"],
    practiceCase: false,
  },
  {
    text: "Warum solltest du bei der Anbieterauswahl nach der AI-Act-Konformität des GPAI-Modell-Anbieters fragen?",
    options: [
      { text: "Seriöse Anbieter können ihre Pflichten (Dokumentation, Urheberrechts-Strategie, Transparenz) darlegen – ausweichende Antworten sind ein Warnsignal", correct: true },
      { text: "Weil Betreiber die Modelle sonst selbst bei der EU registrieren müssen", correct: false },
      { text: "Weil nur konforme Modelle technisch funktionieren", correct: false },
      { text: "Die Frage ist unnötig – GPAI-Pflichten betreffen Nutzer in keiner Weise", correct: false },
    ],
    explanation:
      "GPAI-Anbieter haben eigene Pflichten (technische Dokumentation, Informationen für nachgelagerte Anbieter, Urheberrechts-Strategie). Wer dazu keine Auskunft geben kann, disqualifiziert sich – die Konformitätsfrage ist ein einfacher Seriositätstest.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "SCHWER",
    lessonSlug: "off-gpai-transparenzpflichten",
    tags: ["GPAI", "Anbieterauswahl"],
    practiceCase: false,
  },
  {
    text: "Ein Kollege schlägt vor, aus internen Verhaltensdaten einen \"Mitarbeiter-Score\" zu bauen, der über Boni und Beförderungen mitentscheidet. Was prüfst du zuerst?",
    options: [
      { text: "Die Nähe zu verbotenem Social Scoring und zur Hochrisiko-Kategorie Beschäftigung – solche Systeme sind hochgradig kritisch", correct: true },
      { text: "Nur, ob die Daten technisch verfügbar sind", correct: false },
      { text: "Nur die Kosten des Entwicklungsprojekts", correct: false },
      { text: "Nichts – interne Scores sind rechtlich immer unbedenklich", correct: false },
    ],
    explanation:
      "Umfassende Verhaltens-Scorings mit Folgen in anderen Lebensbereichen können verbotenes Social Scoring berühren; Bewertungen mit Beschäftigungsfolgen sind zudem Hochrisiko-Terrain. Solche Ideen brauchen die strengste Prüfung – meist scheitern sie zu Recht.",
    category: "AI_ACT_SYSTEMATIK",
    difficulty: "SCHWER",
    lessonSlug: "off-verbotene-praktiken-vertieft",
    tags: ["Social Scoring", "Praxisfall"],
    practiceCase: true,
  },
  // ===== ROLLEN_PFLICHTEN (8) =====
  {
    text: "Euer Unternehmen nutzt ein eingekauftes KI-Tool im Tagesgeschäft. Welche AI-Act-Rolle habt ihr für dieses Tool?",
    options: [
      { text: "Betreiber (Deployer) – ihr verwendet das System in eigener Verantwortung im beruflichen Kontext", correct: true },
      { text: "Anbieter – jede Nutzung macht automatisch zum Anbieter", correct: false },
      { text: "Einführer – weil das Tool aus dem Internet heruntergeladen wurde", correct: false },
      { text: "Keine Rolle – eingekaufte Tools fallen nicht unter den AI Act", correct: false },
    ],
    explanation:
      "Wer ein fremdes KI-System beruflich in eigener Verantwortung nutzt, ist Betreiber – die Standardrolle der meisten Unternehmen, mit Pflichten wie KI-Kompetenz (Art. 4) und ggf. Hochrisiko-Betreiberpflichten.",
    category: "ROLLEN_PFLICHTEN",
    difficulty: "LEICHT",
    lessonSlug: "off-anbieter-betreiber-abgrenzung",
    tags: ["Betreiber", "Rollen"],
    practiceCase: false,
  },
  {
    text: "Das Marketing will die eingekaufte KI-Lösung künftig unter eurem Firmennamen als eigenes Produkt an Kunden vermarkten. Was ist die zentrale Konsequenz?",
    options: [
      { text: "Bei einem Hochrisiko-System übernimmt euer Unternehmen damit die Anbieterrolle samt allen Anbieterpflichten", correct: true },
      { text: "Keine – der ursprüngliche Hersteller bleibt für immer allein verantwortlich", correct: false },
      { text: "Nur der Preis ändert sich, rechtlich bleibt alles gleich", correct: false },
      { text: "Das ist grundsätzlich verboten und strafbar", correct: false },
    ],
    explanation:
      "Wer ein Hochrisiko-System unter eigenem Namen oder eigener Marke in Verkehr bringt, wird selbst zum Anbieter – mit Konformitätsbewertung, Dokumentation und allen weiteren Anbieterpflichten. Das \"Umbranding\" ist eine Pflichtenlawine, keine Marketingfrage.",
    category: "ROLLEN_PFLICHTEN",
    difficulty: "SCHWER",
    lessonSlug: "off-rollenwechsel-fallstricke",
    tags: ["Rollenwechsel", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Team will den freigegebenen Chatbot-Baukasten (gedacht für FAQ-Bots) künftig zur automatisierten Vorqualifikation von Bewerbern nutzen. Warum musst du eingreifen?",
    options: [
      { text: "Die Zweckänderung führt in den Hochrisiko-Bereich – und kann das Unternehmen in die Anbieterrolle des neuen Systems bringen", correct: true },
      { text: "Nur wegen der Lizenzkosten – mehr Nutzung kostet mehr", correct: false },
      { text: "Gar nicht – wofür ein freigegebenes Tool genutzt wird, ist beliebig", correct: false },
      { text: "Weil Chatbots grundsätzlich keine Fragen stellen dürfen", correct: false },
    ],
    explanation:
      "Freigaben gelten für den geprüften Zweck. Die Umwidmung in einen Hochrisiko-Zweck (Personalauswahl) ändert die Risikoklasse fundamental und kann die Anbieterrolle auslösen – genau dafür braucht es das Freigabe-Gate bei Zweckänderungen.",
    category: "ROLLEN_PFLICHTEN",
    difficulty: "SCHWER",
    lessonSlug: "off-rollenwechsel-fallstricke",
    tags: ["Zweckänderung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Euer Unternehmen will das KI-Produkt eines Herstellers aus einem Drittland exklusiv in der EU vertreiben. Was gilt?",
    options: [
      { text: "Ihr werdet Einführer mit eigenen Prüfpflichten – bei Hochrisiko u. a. Konformitätsnachweis und Dokumentation prüfen", correct: true },
      { text: "Nichts Besonderes – Vertrieb ist vom AI Act nicht erfasst", correct: false },
      { text: "Der Hersteller trägt alle Pflichten, ihr seid nur Postbote", correct: false },
      { text: "Ihr müsst das Produkt vor dem Vertrieb selbst neu programmieren", correct: false },
    ],
    explanation:
      "Wer KI-Systeme aus Drittländern in die EU bringt, ist Einführer – mit Sorgfaltspflichten: Bei Hochrisiko-Systemen sind Konformitätsbewertung, CE-Kennzeichnung und Dokumentation zu prüfen; bei begründeten Zweifeln darf nicht bereitgestellt werden.",
    category: "ROLLEN_PFLICHTEN",
    difficulty: "MITTEL",
    lessonSlug: "off-einfuehrer-haendler-privat",
    tags: ["Einführer", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wo verläuft die Grenze zwischen privater und beruflicher KI-Nutzung von Mitarbeitenden?",
    options: [
      { text: "Am Zweck: Firmenaufgaben und Firmendaten sind Firmenverantwortung – auch auf privaten Konten", correct: true },
      { text: "Am Konto: Was über ein Privatkonto läuft, ist immer Privatsache", correct: false },
      { text: "An der Uhrzeit: Nach 17 Uhr ist alles privat", correct: false },
      { text: "Am Gerät: Auf dem Privathandy gilt kein Firmenrecht", correct: false },
    ],
    explanation:
      "Die Betreiberpflichten-Ausnahme für private Nutzung greift nur bei rein persönlicher Verwendung. Sobald Firmenaufgaben oder Firmendaten im Spiel sind, ist es berufliche Nutzung in Firmenverantwortung – unabhängig von Konto oder Gerät.",
    category: "ROLLEN_PFLICHTEN",
    difficulty: "MITTEL",
    lessonSlug: "off-einfuehrer-haendler-privat",
    tags: ["Privatnutzung", "Schatten-KI"],
    practiceCase: false,
  },
  {
    text: "Mit welchen drei Fragen bestimmst du die AI-Act-Rolle deines Unternehmens je Anwendung?",
    options: [
      { text: "Wer hat es entwickelt/unter wessen Namen läuft es? Nutzen wir es nur oder bieten wir es an? Haben wir es verändert oder zweckentfremdet?", correct: true },
      { text: "Wie teuer ist es? Wie schnell ist es? Wie viele nutzen es?", correct: false },
      { text: "Welche Farbe hat das Logo? Wie alt ist der Anbieter? Wo sitzt der Support?", correct: false },
      { text: "Läuft es in der Cloud? Hat es eine App? Gibt es eine API?", correct: false },
    ],
    explanation:
      "Entwicklung/Markenname, Nutzung vs. Angebot an Dritte und Veränderung/Zweckentfremdung – aus diesen drei Antworten ergibt sich die Rolle (Anbieter, Betreiber, Einführer/Händler) und damit das Pflichtenpaket.",
    category: "ROLLEN_PFLICHTEN",
    difficulty: "MITTEL",
    lessonSlug: "off-anbieter-betreiber-abgrenzung",
    tags: ["Methodik"],
    practiceCase: false,
  },
  {
    text: "Ein Entwickler hat das eingekaufte KI-System mit eigenen Skripten \"deutlich verbessert\" – es verhält sich jetzt spürbar anders. Warum gehört das auf deinen Tisch?",
    options: [
      { text: "Wesentliche Veränderungen können bei Hochrisiko-Systemen die Anbieterpflichten auslösen und brauchen eine Neubewertung", correct: true },
      { text: "Nur wegen des Urheberrechts an den Skripten", correct: false },
      { text: "Es gehört nicht auf deinen Tisch – technische Anpassungen sind reine IT-Sache", correct: false },
      { text: "Weil Skripte grundsätzlich verboten sind", correct: false },
    ],
    explanation:
      "Wer ein (Hochrisiko-)System wesentlich verändert, kann rechtlich zum Anbieter werden. Deshalb gehören wesentliche Anpassungen in den Freigabeprozess: erst bewerten (ggf. mit Rechtsrat), dann ändern.",
    category: "ROLLEN_PFLICHTEN",
    difficulty: "MITTEL",
    lessonSlug: "off-rollenwechsel-fallstricke",
    tags: ["Veränderung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Dieselbe Firma nutzt Copilot intern, verkauft ein eigenes KI-Produkt und vertreibt ein US-Tool in der EU. Wie viele AI-Act-Rollen hat sie?",
    options: [
      { text: "Drei verschiedene: Betreiber (Copilot), Anbieter (eigenes Produkt) und Einführer (US-Tool)", correct: true },
      { text: "Eine: Ein Unternehmen kann immer nur eine Rolle haben", correct: false },
      { text: "Keine: Softwarefirmen sind vom AI Act ausgenommen", correct: false },
      { text: "Zwei: Anbieter und Betreiber schließen sich gegenseitig aus", correct: false },
    ],
    explanation:
      "Die Rolle wird je Anwendung bestimmt: Dieselbe Firma kann gleichzeitig Betreiber, Anbieter und Einführer sein – mit drei verschiedenen Pflichtenpaketen, die getrennt dokumentiert und erfüllt werden müssen.",
    category: "ROLLEN_PFLICHTEN",
    difficulty: "MITTEL",
    lessonSlug: "off-anbieter-betreiber-abgrenzung",
    tags: ["Mehrfachrollen"],
    practiceCase: false,
  },
  // ===== INVENTAR_RISIKO (9) =====
  {
    text: "Warum ist das KI-Inventar das erste Arbeitsprodukt jeder KI-Governance?",
    options: [
      { text: "Ohne Überblick über die tatsächlich genutzten Systeme lassen sich weder Risiken bewerten noch Pflichten prüfen", correct: true },
      { text: "Weil Behörden monatlich eine Inventarliste anfordern", correct: false },
      { text: "Weil das Inventar die Schulungen ersetzt", correct: false },
      { text: "Weil ohne Inventar keine KI-Tools funktionieren", correct: false },
    ],
    explanation:
      "Governance ohne Inventar ist Blindflug: Risikobewertung, Pflichtenprüfung, Vorfallsreaktion und Auskunftsfähigkeit setzen voraus, dass man weiß, was im Haus läuft – inklusive Schatten-KI und eingebetteter KI.",
    category: "INVENTAR_RISIKO",
    difficulty: "LEICHT",
    lessonSlug: "off-ki-inventar-aufbauen",
    tags: ["Inventar"],
    practiceCase: false,
  },
  {
    text: "Bei der Inventur meldet eine Abteilung \"keine KI im Einsatz\" – die Kreditkartenabrechnung zeigt aber ein KI-Tool-Abo. Was lernst du daraus methodisch?",
    options: [
      { text: "Mehrere Quellen kombinieren: Befragungen allein reichen nicht, Rechnungen und IT-Daten decken blinde Flecken auf", correct: true },
      { text: "Die Abteilung absichtlich bloßstellen, damit so etwas nie wieder vorkommt", correct: false },
      { text: "Die Abrechnung ignorieren – die Selbstauskunft der Abteilung zählt", correct: false },
      { text: "Die Inventur abbrechen, weil die Datenlage unzuverlässig ist", correct: false },
    ],
    explanation:
      "Gute Inventuren triangulieren: Befragung (mit Straffreiheit), IT-/Lizenzdaten und Rechnungen. Abweichungen sind normal – oft ist es Vergesslichkeit, nicht Absicht. Der Fund wird sachlich geklärt und das Tool regulär geprüft.",
    category: "INVENTAR_RISIKO",
    difficulty: "MITTEL",
    lessonSlug: "off-ki-inventar-aufbauen",
    tags: ["Inventur", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche vier Dimensionen bilden eine praxistaugliche KI-Risikobewertung?",
    options: [
      { text: "Eingehende Daten, Verwendung des Ergebnisses, AI-Act-Einstufung und Abhängigkeit vom Tool/Anbieter", correct: true },
      { text: "Preis, Farbe der Benutzeroberfläche, Anzahl der Features, Bekanntheit der Marke", correct: false },
      { text: "Alter des Anbieters, Serverfarbe, Anzahl der Mitarbeiter, Börsenkurs", correct: false },
      { text: "Nur die Frage, ob das Tool kostenlos oder kostenpflichtig ist", correct: false },
    ],
    explanation:
      "Daten (Sensibilität), Ergebnisnutzung (Automatisierungsgrad, Außenwirkung), AI-Act-Klasse und Kritikalität der Abhängigkeit – aus diesen vier Dimensionen entsteht eine dokumentierte Ampel-Einstufung mit klaren Auflagen.",
    category: "INVENTAR_RISIKO",
    difficulty: "MITTEL",
    lessonSlug: "off-risikobewertung-methodik",
    tags: ["Methodik", "Risikobewertung"],
    practiceCase: false,
  },
  {
    text: "Ein Bereichsleiter will Schichtzuteilungen \"vollautomatisch von der KI optimieren\" lassen. Wie bewertest du den Vorschlag?",
    options: [
      { text: "Rot/Projekt: Algorithmische Aufgabenzuweisung an Beschäftigte ist Hochrisiko-Terrain – wenn, dann nur mit Pflichtenprüfung, menschlicher Aufsicht und Mitbestimmung", correct: true },
      { text: "Grün: Schichtpläne sind organisatorische Routine ohne Risiko", correct: false },
      { text: "Gelb: Es reicht, die Mitarbeitenden nachträglich zu informieren", correct: false },
      { text: "Der Vorschlag ist technisch unmöglich und damit irrelevant", correct: false },
    ],
    explanation:
      "KI-Systeme für Arbeitsorganisation und Aufgabenzuweisung fallen in den Hochrisiko-Bereich Beschäftigung. Vollautomatisierung ohne menschliche Aufsicht ist hier keine Option – der Fall gehört ins volle Prüfprogramm inkl. Betriebsratseinbindung.",
    category: "INVENTAR_RISIKO",
    difficulty: "SCHWER",
    lessonSlug: "off-risikobewertung-methodik",
    tags: ["Hochrisiko", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Wann ist typischerweise eine Datenschutz-Folgenabschätzung (DSFA) erforderlich?",
    options: [
      { text: "Wenn eine Verarbeitung voraussichtlich hohe Risiken für Betroffene birgt – z. B. systematische Bewertung persönlicher Aspekte", correct: true },
      { text: "Bei jeder einzelnen KI-Nutzung, auch beim Übersetzen eines öffentlichen Textes", correct: false },
      { text: "Nur bei Behörden, nie bei Unternehmen", correct: false },
      { text: "Nur, wenn die Datenschutzbehörde sie ausdrücklich anordnet", correct: false },
    ],
    explanation:
      "Die DSFA (Art. 35 DSGVO) ist bei voraussichtlich hohem Risiko Pflicht – etwa bei systematischer Bewertung persönlicher Aspekte, umfangreicher sensibler Datenverarbeitung oder riskanten neuen Technologien. Viele ernsthafte KI-Einsätze mit Personenbezug erfüllen die Kriterien.",
    category: "INVENTAR_RISIKO",
    difficulty: "MITTEL",
    lessonSlug: "off-dsfa-grundrechte",
    tags: ["DSFA"],
    practiceCase: false,
  },
  {
    text: "Ein Tool zur \"Priorisierung von Kundenanfragen nach Abschlusswahrscheinlichkeit\" soll eingeführt werden. Welche zwei Trigger prüfst du in der Freigabe-Checkliste?",
    options: [
      { text: "Systematische Personenbewertung (DSFA-Bedarf) und Nähe zum Hochrisiko-Bereich (vertiefte AI-Act-Prüfung)", correct: true },
      { text: "Nur die Farbgestaltung der Oberfläche und die Ladezeit", correct: false },
      { text: "Nur, ob der Vertrieb das Tool wirklich haben will", correct: false },
      { text: "Nur die Kosten pro Lizenz im Marktvergleich", correct: false },
    ],
    explanation:
      "Bewertungs- und Scoring-Anwendungen lösen beide Trigger aus: Die systematische Bewertung von Personen kann eine DSFA erfordern, und je nach Kontext (z. B. Versicherung, Kredit) droht Hochrisiko-Nähe. Beides muss vor dem Go-live geklärt sein.",
    category: "INVENTAR_RISIKO",
    difficulty: "SCHWER",
    lessonSlug: "off-dsfa-grundrechte",
    tags: ["Trigger", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Welche Routine hält das KI-Inventar am zuverlässigsten aktuell?",
    options: [
      { text: "Der Freigabeprozess als einziger Eingangskanal: Jedes neue Tool landet automatisch im Inventar", correct: true },
      { text: "Eine einmalige Großinventur alle fünf Jahre", correct: false },
      { text: "Das Prinzip Hoffnung: Die Abteilungen melden sich schon von selbst", correct: false },
      { text: "Ein monatlicher Neukauf der Inventarsoftware", correct: false },
    ],
    explanation:
      "Wenn neue Tools ausschließlich über den Freigabeprozess ins Haus kommen, pflegt sich das Inventar strukturell mit. Quartals-Checks, Anlass-Trigger und Jahresinventur ergänzen das System.",
    category: "INVENTAR_RISIKO",
    difficulty: "LEICHT",
    lessonSlug: "off-inventar-aktuell-halten",
    tags: ["Pflege"],
    practiceCase: false,
  },
  {
    text: "Ein wichtiger Anbieter kündigt ein großes Funktions-Update mit neuen Datenverarbeitungen an. Was löst das in deinem System aus?",
    options: [
      { text: "Einen Anlass-Trigger: Inventar-Eintrag prüfen und eine verkürzte Neubewertung der Freigabe durchführen", correct: true },
      { text: "Nichts – einmal freigegeben ist für immer freigegeben", correct: false },
      { text: "Die sofortige Kündigung des Anbieters ohne Prüfung", correct: false },
      { text: "Eine Neuwahl der KI-Verantwortlichen", correct: false },
    ],
    explanation:
      "Wesentliche Funktions- oder Verarbeitungsänderungen sind klassische Neubewertungs-Trigger: Die Freigabe bezog sich auf den alten Zustand. Die verkürzte Prüfung klärt, ob Auflagen, Einstellungen oder im Extremfall der Ausstieg nötig sind.",
    category: "INVENTAR_RISIKO",
    difficulty: "MITTEL",
    lessonSlug: "off-inventar-aktuell-halten",
    tags: ["Trigger", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum gehört zu jeder Risikoeinstufung eine dokumentierte Begründung?",
    options: [
      { text: "Sie macht Entscheidungen nachvollziehbar, verteidigbar und bei Personalwechsel reproduzierbar", correct: true },
      { text: "Weil längere Dokumente automatisch professioneller wirken", correct: false },
      { text: "Damit niemand die Einstufung jemals ändern kann", correct: false },
      { text: "Begründungen sind unnötig – die Ampelfarbe genügt", correct: false },
    ],
    explanation:
      "Ohne Begründung ist eine Einstufung Bauchgefühl mit Farbcode: Bei Prüfungen, Konflikten oder Personalwechseln zählt, dass nachvollziehbar ist, wer wann warum wie entschieden hat.",
    category: "INVENTAR_RISIKO",
    difficulty: "LEICHT",
    lessonSlug: "off-risikobewertung-methodik",
    tags: ["Dokumentation"],
    practiceCase: false,
  },
  // ===== SCHULUNG_NACHWEISE (8) =====
  {
    text: "Was verlangt Art. 4 EU AI Act von Unternehmen im Kern?",
    options: [
      { text: "Nach besten Kräften sicherzustellen, dass alle, die mit KI-Systemen umgehen, ausreichende KI-Kompetenz passend zum Kontext haben", correct: true },
      { text: "Eine jährliche staatliche KI-Prüfung für alle Mitarbeitenden zu organisieren", correct: false },
      { text: "Mindestens 40 Stunden KI-Unterricht pro Person und Jahr", correct: false },
      { text: "Die Beschäftigung eines promovierten KI-Wissenschaftlers", correct: false },
    ],
    explanation:
      "Art. 4 verlangt ausreichende KI-Kompetenz unter Berücksichtigung von Wissen, Erfahrung und Einsatzkontext – ohne starres Format oder Stundenzahl. \"Nach besten Kräften sicherstellen\" heißt: nachvollziehbar organisieren, nicht hoffen.",
    category: "SCHULUNG_NACHWEISE",
    difficulty: "LEICHT",
    lessonSlug: "off-schulungsbedarf-ermitteln",
    tags: ["Art. 4"],
    practiceCase: false,
  },
  {
    text: "Euer Betrieb beschäftigt zwei Freelancer, die mit euren KI-Tools Kundentexte erstellen. Gehören sie ins Schulungsprogramm?",
    options: [
      { text: "Ja – Art. 4 erfasst auch Personen, die im Auftrag des Unternehmens mit den KI-Systemen umgehen", correct: true },
      { text: "Nein – Externe sind grundsätzlich Sache ihrer eigenen Firma", correct: false },
      { text: "Nur wenn sie mehr als 20 Stunden pro Woche arbeiten", correct: false },
      { text: "Nur auf ausdrücklichen Wunsch der Freelancer", correct: false },
    ],
    explanation:
      "Die Kompetenzpflicht umfasst auch Externe, die im Auftrag mit den KI-Systemen des Unternehmens arbeiten – Freelancer und Leihkräfte gehören in Bedarfsmatrix und Nachweisregister.",
    category: "SCHULUNG_NACHWEISE",
    difficulty: "MITTEL",
    lessonSlug: "off-schulungsbedarf-ermitteln",
    tags: ["Externe", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum ist eine Einheitsschulung für alle Mitarbeitenden problematisch?",
    options: [
      { text: "Weil Art. 4 kontextbezogene Kompetenz verlangt – die Hochrisiko-Aufsichtsperson braucht anderes Wissen als der Gelegenheitsnutzer", correct: true },
      { text: "Weil Einheitsschulungen gesetzlich verboten sind", correct: false },
      { text: "Weil Schulungen grundsätzlich nur einzeln stattfinden dürfen", correct: false },
      { text: "Sie ist nicht problematisch – Hauptsache, alle haben teilgenommen", correct: false },
    ],
    explanation:
      "Der Einsatzkontext bestimmt den Bedarf: Grundschulung für alle Anwender, Aufbauwissen für Entscheider, systemspezifisches Training für Hochrisiko-Aufsicht. Eine Minimal-Unterweisung für alle deckt kritische Rollen nicht ab.",
    category: "SCHULUNG_NACHWEISE",
    difficulty: "MITTEL",
    lessonSlug: "off-zielgruppen-rollenprofile",
    tags: ["Zielgruppen"],
    practiceCase: false,
  },
  {
    text: "Ein neuer Mitarbeiter startet nächste Woche und wird sofort mit KI-Tools arbeiten. Wie regelst du das sauber?",
    options: [
      { text: "KI-Grundschulung in die erste Onboarding-Woche – bis zum Abschluss gelten Einschränkungen für die KI-Nutzung", correct: true },
      { text: "Er kann alles sofort nutzen – die Schulung folgt irgendwann im ersten Jahr", correct: false },
      { text: "KI-Nutzung wird ihm für die ersten zwölf Monate komplett verboten", correct: false },
      { text: "Der Kollege am Nachbartisch erklärt ihm alles, das genügt als Nachweis", correct: false },
    ],
    explanation:
      "Neueintritte sind die klassische Schulungslücke: Die Grundschulung gehört ins Onboarding, mit klaren Übergangsregeln bis zum Abschluss. Nach zwei Jahren Fluktuation ohne Onboarding-Schulung ist sonst ein relevanter Teil der Belegschaft ungeschult.",
    category: "SCHULUNG_NACHWEISE",
    difficulty: "MITTEL",
    lessonSlug: "off-zielgruppen-rollenprofile",
    tags: ["Onboarding", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Ein Kunde verlangt im Lieferantenaudit Nachweise der KI-Kompetenz aller Projektbeteiligten. Was macht deine Antwort stark?",
    options: [
      { text: "Ein gepflegtes Register mit Kursversion, Abschlussdatum, Testergebnis und verifizierbaren Zertifikatsnummern je Person", correct: true },
      { text: "Eine formlose E-Mail: \"Alle wurden mal geschult\"", correct: false },
      { text: "Der Hinweis, dass Schulungsnachweise Geschäftsgeheimnis sind", correct: false },
      { text: "Eine Liste der gekauften KI-Tools", correct: false },
    ],
    explanation:
      "Belastbare Nachweise sind vollständig, aktuell und überprüfbar: Wer je Person Kursinhalt/Version, Datum, Ergebnis und verifizierbares Zertifikat liefern kann, beantwortet solche Anfragen in Minuten statt Wochen.",
    category: "SCHULUNG_NACHWEISE",
    difficulty: "MITTEL",
    lessonSlug: "off-nachweise-dokumentation",
    tags: ["Nachweise", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Gibt es ein staatliches Prüfsiegel oder eine behördliche Zulassung für KI-Kompetenz-Schulungen nach Art. 4?",
    options: [
      { text: "Nein – das Gesetz sieht kein solches Verfahren vor; Nachweise sind private Schulungsnachweise, deren Wert an der Qualität der Dokumentation hängt", correct: true },
      { text: "Ja – jede Schulung braucht ein EU-Gütesiegel der KI-Behörde", correct: false },
      { text: "Ja – aber nur für Präsenzschulungen", correct: false },
      { text: "Das ist noch unklar, deshalb sind Schulungen derzeit sinnlos", correct: false },
    ],
    explanation:
      "Ein staatliches Prüf- oder Zulassungsverfahren für Art.-4-Schulungen existiert nicht. Umso wichtiger sind nachvollziehbare Inhalte, echte Tests und verifizierbare Zertifikate – die Dokumentationsqualität ersetzt das fehlende Siegel.",
    category: "SCHULUNG_NACHWEISE",
    difficulty: "MITTEL",
    lessonSlug: "off-nachweise-dokumentation",
    tags: ["Einordnung"],
    practiceCase: false,
  },
  {
    text: "Die Testauswertung zeigt: Quer durch alle Abteilungen liegt die Kategorie Datenschutz unter 65 %. Was ist die richtige Schlussfolgerung?",
    options: [
      { text: "Ein Inhalts-/Vermittlungsproblem: Die Datenschutz-Lektionen überarbeiten und gezielt nachschulen", correct: true },
      { text: "Ein Personenproblem: Alle Betroffenen abmahnen", correct: false },
      { text: "Ein Zufallsbefund: Ignorieren und weitermachen", correct: false },
      { text: "Die Bestehensgrenze senken, damit die Statistik besser aussieht", correct: false },
    ],
    explanation:
      "Wenn viele im selben Themenfeld schwächeln, liegt es am Stoff oder seiner Vermittlung, nicht an den Personen. Die richtige Kette: Inhalt verbessern, gezielt nachschulen, Wirkung im nächsten Zyklus prüfen.",
    category: "SCHULUNG_NACHWEISE",
    difficulty: "MITTEL",
    lessonSlug: "off-wirksamkeit-messen",
    tags: ["Auswertung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Nach einer Schulungsrunde steigen die gemeldeten Beinahe-Vorfälle deutlich an. Wie interpretierst du das?",
    options: [
      { text: "Als Erfolgssignal: Es wird mehr erkannt und gemeldet – die Sensibilisierung und Meldekultur wirken", correct: true },
      { text: "Als Beweis, dass die Schulung die Leute nervöser und schlechter gemacht hat", correct: false },
      { text: "Als Grund, das Meldesystem abzuschalten, um die Statistik zu retten", correct: false },
      { text: "Als reinen Zufall ohne jede Aussagekraft", correct: false },
    ],
    explanation:
      "Steigende Meldezahlen nach Schulungen bedeuten meist: mehr Aufmerksamkeit, nicht mehr Vorfälle. Eine lebendige Meldekultur ist einer der besten Wirksamkeitsindikatoren – kritisch wären steigende Wiederholungsfälle.",
    category: "SCHULUNG_NACHWEISE",
    difficulty: "SCHWER",
    lessonSlug: "off-wirksamkeit-messen",
    tags: ["Wirksamkeit"],
    practiceCase: false,
  },
];
