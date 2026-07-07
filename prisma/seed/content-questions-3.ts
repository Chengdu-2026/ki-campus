import type { SeedQuestion } from "./content-questions-1";

/**
 * Fragenpool-Erweiterung für die Module 12–16 des Basic-Kurses:
 * Informationssicherheit, Transparenz & Kennzeichnung, Tools & Freigabe,
 * Vorfälle & Meldewege, Qualität & Feedback.
 * Konvention wie in Teil 1/2: richtige Antwort in den Rohdaten an Position A
 * (der Seed mischt die Optionen).
 */
export const seedQuestions3: SeedQuestion[] = [
  // ===== INFORMATIONSSICHERHEIT (7) =====
  {
    text: "Warum ist ein KI-Konto ein lohnendes Ziel für Angreifer?",
    options: [
      { text: "Weil im Chatverlauf oft monatelang gesammelte interne Informationen gespeichert sind", correct: true },
      { text: "Weil man über KI-Konten direkt auf das Firmenkonto bei der Bank zugreifen kann", correct: false },
      { text: "Weil KI-Konten grundsätzlich keine Passwörter haben", correct: false },
      { text: "Weil Angreifer nur an den bezahlten Lizenzen interessiert sind", correct: false },
    ],
    explanation:
      "In den Chatverläufen eines KI-Kontos sammeln sich mit der Zeit viele interne Informationen – Entwürfe, Überlegungen, teils sensible Daten. Wer das Konto übernimmt, kann all das mitlesen.",
    category: "INFORMATIONSSICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "ki-konten-absichern",
    tags: ["Kontosicherheit", "Chatverlauf"],
    practiceCase: false,
  },
  {
    text: "Welche zwei Maßnahmen schützen ein KI-Konto am wirksamsten vor Übernahme?",
    options: [
      { text: "Ein einzigartiges, starkes Passwort und aktivierte Zwei-Faktor-Authentifizierung", correct: true },
      { text: "Das Konto nur am Wochenende nutzen und den Browser-Verlauf löschen", correct: false },
      { text: "Ein kurzes, leicht merkbares Passwort, das man nie ändern muss", correct: false },
      { text: "Dasselbe sichere Passwort für alle Firmenkonten verwenden", correct: false },
    ],
    explanation:
      "Ein nirgendwo sonst verwendetes, starkes Passwort plus Zwei-Faktor-Authentifizierung stoppt die meisten Kontoübernahmen – selbst wenn das Passwort durch ein Datenleck bekannt wird.",
    category: "INFORMATIONSSICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "ki-konten-absichern",
    tags: ["2FA", "Passwort"],
    practiceCase: false,
  },
  {
    text: "Ein Kollege nutzt für sein KI-Firmenkonto dasselbe Passwort wie für private Online-Shops. Was ist das Hauptproblem?",
    options: [
      { text: "Wird ein Shop gehackt, können Angreifer mit dem erbeuteten Passwort auch das KI-Konto übernehmen", correct: true },
      { text: "Es gibt kein Problem, solange das Passwort lang genug ist", correct: false },
      { text: "Private Shops verbieten die Mehrfachverwendung von Passwörtern vertraglich", correct: false },
      { text: "Das KI-Tool wird dadurch langsamer, weil es das Passwort öfter prüfen muss", correct: false },
    ],
    explanation:
      "Passwort-Wiederverwendung ist eines der häufigsten Einfallstore: Ein Datenleck bei einem beliebigen Dienst öffnet Angreifern dann auch alle anderen Konten mit demselben Passwort.",
    category: "INFORMATIONSSICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "ki-konten-absichern",
    tags: ["Passwort", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Die Buchhaltung erhält einen Anruf: Die Stimme klingt exakt wie der Geschäftsführer und verlangt eine dringende, vertrauliche Überweisung. Wie reagierst du richtig?",
    options: [
      { text: "Nicht überweisen, sondern über einen zweiten Kanal prüfen – z. B. Rückruf unter der bekannten Nummer", correct: true },
      { text: "Überweisen, denn die Stimme ist eindeutig erkennbar und der Chef hat es eilig", correct: false },
      { text: "Um eine schriftliche Bestätigung per WhatsApp von derselben unbekannten Nummer bitten", correct: false },
      { text: "Die Hälfte des Betrags überweisen, um das Risiko zu halbieren", correct: false },
    ],
    explanation:
      "KI kann Stimmen täuschend echt klonen. Bei ungewöhnlichen Zahlungsanweisungen gilt: immer über einen unabhängigen Rückkanal prüfen – der Klang der Stimme ist kein Beweis mehr.",
    category: "INFORMATIONSSICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "phishing-deepfakes-erkennen",
    tags: ["Deepfake", "CEO-Fraud", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum sind Phishing-Mails durch KI schwerer zu erkennen als früher?",
    options: [
      { text: "KI erzeugt fehlerfreie, stilistisch passende und persönlich zugeschnittene Mails", correct: true },
      { text: "KI-Phishing-Mails enthalten grundsätzlich keine Links mehr", correct: false },
      { text: "Phishing-Mails werden heute nur noch an Führungskräfte geschickt", correct: false },
      { text: "Spamfilter wurden in den letzten Jahren generell abgeschaltet", correct: false },
    ],
    explanation:
      "Die klassischen Erkennungszeichen – schlechtes Deutsch, seltsame Formulierungen – fallen weg, weil KI in Sekunden fehlerfreie und sogar personalisierte Texte erzeugt. Umso wichtiger sind Rückkanal-Prüfung und gesunde Skepsis bei ungewöhnlichen Bitten.",
    category: "INFORMATIONSSICHERHEIT",
    difficulty: "LEICHT",
    lessonSlug: "phishing-deepfakes-erkennen",
    tags: ["Phishing"],
    practiceCase: false,
  },
  {
    text: "Welche Kombination von Merkmalen ist das klassische Alarmsignal für Betrugsversuche – auch bei täuschend echter KI-Kommunikation?",
    options: [
      { text: "Dringlichkeit plus Geheimhaltung plus Geld- oder Datenforderung", correct: true },
      { text: "Höflicher Ton plus korrekte Anrede plus Firmenlogo", correct: false },
      { text: "Lange E-Mails plus viele Anhänge plus CC an mehrere Personen", correct: false },
      { text: "Anrufe außerhalb der Bürozeiten plus unterdrückte Nummer", correct: false },
    ],
    explanation:
      "\"Sofort handeln, niemandem etwas sagen, Geld oder Zugangsdaten\" – diese Kombination ist das typische Muster von Social-Engineering-Angriffen, egal wie professionell die Aufmachung wirkt.",
    category: "INFORMATIONSSICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "phishing-deepfakes-erkennen",
    tags: ["Social Engineering"],
    practiceCase: false,
  },
  {
    text: "Ein Vertriebsleiter lädt die komplette Angebotskalkulation mit Einkaufspreisen und Margen in ein kostenloses KI-Tool. Was ist daran problematisch?",
    options: [
      { text: "Geschäftsgeheimnisse verlassen unkontrollierbar das Unternehmen und können sogar ihren rechtlichen Schutz verlieren", correct: true },
      { text: "Nichts – Kalkulationen sind keine personenbezogenen Daten und daher unkritisch", correct: false },
      { text: "Nur die Formatierung der Tabelle könnte beim Hochladen verloren gehen", correct: false },
      { text: "Kostenlose Tools rechnen ungenauer als Bezahlversionen", correct: false },
    ],
    explanation:
      "Auch ohne Personenbezug sind Kalkulationen, Margen und Preise Geschäftsgeheimnisse. In fremden Systemen sind sie nicht mehr kontrollierbar – und wer keine angemessene Geheimhaltung nachweist, gefährdet den rechtlichen Geheimnisschutz.",
    category: "INFORMATIONSSICHERHEIT",
    difficulty: "MITTEL",
    lessonSlug: "geschaeftsgeheimnisse-schuetzen",
    tags: ["Geschäftsgeheimnis", "Praxisfall"],
    practiceCase: true,
  },
  // ===== TRANSPARENZ & KENNZEICHNUNG (6) =====
  {
    text: "Muss sich ein Kundenservice-Chatbot auf der Firmenwebsite als KI zu erkennen geben?",
    options: [
      { text: "Ja – Menschen müssen erkennen können, dass sie mit einem KI-System kommunizieren", correct: true },
      { text: "Nein – Chatbots dürfen sich als menschliche Mitarbeiter ausgeben, wenn das den Service verbessert", correct: false },
      { text: "Nur, wenn der Chatbot auch Verträge abschließen kann", correct: false },
      { text: "Nur bei Kunden aus dem Ausland", correct: false },
    ],
    explanation:
      "Der EU AI Act verlangt Transparenz: Wer mit einem KI-System kommuniziert, muss das erkennen können, sofern es nicht offensichtlich ist. Ein Chatbot darf sich nicht als Mensch ausgeben.",
    category: "TRANSPARENZ_KENNZEICHNUNG",
    difficulty: "LEICHT",
    lessonSlug: "transparenz-ki-inhalte",
    tags: ["Chatbot", "Transparenzpflicht"],
    practiceCase: false,
  },
  {
    text: "Wann verlangt der EU AI Act grundsätzlich eine Kennzeichnung von KI-generierten Bildern oder Videos?",
    options: [
      { text: "Wenn sie echte Personen, Orte oder Ereignisse täuschend echt darstellen (Deepfakes)", correct: true },
      { text: "Bei jedem Bild, das mit einem Computer erstellt wurde", correct: false },
      { text: "Nur bei Bildern, die mehr als eine Person zeigen", correct: false },
      { text: "Nur, wenn das Bild kommerziell verkauft wird", correct: false },
    ],
    explanation:
      "Kennzeichnungspflichtig sind vor allem täuschend echte Darstellungen realer Personen, Orte oder Ereignisse – niemand soll KI-Fälschungen für echte Aufnahmen halten. Offensichtlich künstlerische Illustrationen sind entspannter zu sehen.",
    category: "TRANSPARENZ_KENNZEICHNUNG",
    difficulty: "MITTEL",
    lessonSlug: "transparenz-ki-inhalte",
    tags: ["Deepfake", "Kennzeichnung"],
    practiceCase: false,
  },
  {
    text: "Du hast eine E-Mail mit KI-Hilfe formuliert, den Inhalt geprüft und stehst voll dahinter. Musst du die KI-Nutzung kennzeichnen?",
    options: [
      { text: "Nein – bei geprüften Texten, die du verantwortest, ist die KI ein Werkzeug wie die Rechtschreibprüfung", correct: true },
      { text: "Ja – jede KI-Beteiligung an Texten muss gegenüber dem Empfänger offengelegt werden", correct: false },
      { text: "Ja, aber nur bei E-Mails an Vorgesetzte", correct: false },
      { text: "Nein, aber die E-Mail darf dann maximal eine Seite lang sein", correct: false },
    ],
    explanation:
      "Für interne und alltägliche Texte, die du geprüft hast und verantwortest, besteht keine Kennzeichnungspflicht. Entscheidend ist die Faustregel: Würde sich der Empfänger getäuscht fühlen, wenn der KI-Einsatz herauskommt?",
    category: "TRANSPARENZ_KENNZEICHNUNG",
    difficulty: "MITTEL",
    lessonSlug: "kennzeichnung-im-alltag",
    tags: ["Alltag", "Kennzeichnung", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Eine Agentur liefert einem Kunden einen Bericht, dessen Recherche-Teile größtenteils KI-generiert sind. Was ist der professionelle Umgang damit?",
    options: [
      { text: "Den KI-Einsatz transparent machen, z. B. mit einem Methodikhinweis – und alle Kernaussagen redaktionell prüfen", correct: true },
      { text: "Den KI-Einsatz verschweigen, weil das den Wert des Berichts mindern würde", correct: false },
      { text: "Den Bericht ungeprüft liefern, aber die Rechnung entsprechend reduzieren", correct: false },
      { text: "Nur mündlich zugeben, wenn der Kunde ausdrücklich danach fragt und ein Anwalt dabei ist", correct: false },
    ],
    explanation:
      "Bei wesentlichen KI-Anteilen an Kundenleistungen zählt Ehrlichkeit: transparent machen und trotzdem alles prüfen. Fliegt verschwiegener KI-Einsatz später auf, ist der Vertrauensschaden meist größer als jede rechtliche Folge.",
    category: "TRANSPARENZ_KENNZEICHNUNG",
    difficulty: "MITTEL",
    lessonSlug: "kennzeichnung-im-alltag",
    tags: ["Kundenbericht", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was prüft ein interner Freigabeprozess, bevor KI-generierte Inhalte das Unternehmen verlassen?",
    options: [
      { text: "Fakten, Rechte Dritter, notwendige Kennzeichnung und Passung zur Firma", correct: true },
      { text: "Nur die Rechtschreibung und die Länge des Textes", correct: false },
      { text: "Ob der Text mit dem teuersten verfügbaren KI-Tool erstellt wurde", correct: false },
      { text: "Ob die KI den Text in weniger als einer Minute erzeugt hat", correct: false },
    ],
    explanation:
      "Das Vier-Augen-Prinzip vor Veröffentlichungen prüft: Stimmen die Fakten? Sind Marken-, Urheber- oder Persönlichkeitsrechte betroffen? Ist eine KI-Kennzeichnung nötig? Passt der Inhalt zum Unternehmen?",
    category: "TRANSPARENZ_KENNZEICHNUNG",
    difficulty: "LEICHT",
    lessonSlug: "transparenz-ki-inhalte",
    tags: ["Freigabeprozess"],
    practiceCase: false,
  },
  {
    text: "Ein Kollege sagt: \"Wenn ich den KI-Text kennzeichne, muss ich ihn nicht mehr prüfen.\" Was stimmt?",
    options: [
      { text: "Falsch – die Kennzeichnung ersetzt keine Prüfung, verantwortlich für den Inhalt bleibt die Firma", correct: true },
      { text: "Richtig – mit Kennzeichnung geht die Verantwortung auf den KI-Anbieter über", correct: false },
      { text: "Richtig – gekennzeichnete Inhalte sind rechtlich immer unangreifbar", correct: false },
      { text: "Falsch – gekennzeichnete Texte müssen sogar von einem Notar geprüft werden", correct: false },
    ],
    explanation:
      "Kennzeichnung schafft Transparenz, aber keine Haftungsbefreiung: Ein falscher KI-Text bleibt falsch, auch mit Hinweis. Veröffentlicht und verantwortlich ist immer das Unternehmen.",
    category: "TRANSPARENZ_KENNZEICHNUNG",
    difficulty: "MITTEL",
    lessonSlug: "kennzeichnung-im-alltag",
    tags: ["Verantwortung", "Praxisfall"],
    practiceCase: true,
  },
  // ===== TOOLS & FREIGABE / SCHATTEN-KI (7) =====
  {
    text: "Warum dürfen im Unternehmen nur freigegebene KI-Tools genutzt werden?",
    options: [
      { text: "Weil man einem Tool von außen nicht ansieht, wie es mit Daten umgeht – das prüft erst die Freigabe", correct: true },
      { text: "Weil freigegebene Tools grundsätzlich kostenlos sind", correct: false },
      { text: "Weil nicht freigegebene Tools immer schlechtere Ergebnisse liefern", correct: false },
      { text: "Weil die IT-Abteilung sonst zu wenig zu tun hätte", correct: false },
    ],
    explanation:
      "Zwischen einem sicheren und einem unsicheren Tool ist äußerlich kaum ein Unterschied. Die Freigabe prüft Datenverarbeitung, Nutzungsbedingungen, Trainingsnutzung und Anbieter-Seriosität – das kann der Einzelne im Alltag nicht leisten.",
    category: "TOOLS_FREIGABE",
    difficulty: "LEICHT",
    lessonSlug: "freigegebene-tools",
    tags: ["Tool-Freigabe"],
    practiceCase: false,
  },
  {
    text: "Warum kann die Firmenversion eines KI-Tools freigegeben sein, während die kostenlose Version desselben Tools verboten ist?",
    options: [
      { text: "Weil oft nur die Firmenversion vertragliche Zusagen wie EU-Datenverarbeitung und keine Trainingsnutzung enthält", correct: true },
      { text: "Weil kostenlose Versionen technisch keine Texte verarbeiten können", correct: false },
      { text: "Weil Firmenversionen automatisch alle Eingaben anonymisieren", correct: false },
      { text: "Das kann nicht sein – gleiches Tool bedeutet immer gleiche Regeln", correct: false },
    ],
    explanation:
      "Entscheidend ist nicht das Tool, sondern der Vertrag dahinter: Business-Versionen enthalten oft Auftragsverarbeitungsverträge und den Ausschluss der Trainingsnutzung – kostenlose Versionen meist nicht.",
    category: "TOOLS_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "freigegebene-tools",
    tags: ["Lizenzen", "Datenschutz"],
    practiceCase: false,
  },
  {
    text: "Was versteht man unter Schatten-KI?",
    options: [
      { text: "Die Nutzung von KI-Tools für die Arbeit, von denen das Unternehmen nichts weiß", correct: true },
      { text: "KI-Systeme, die nachts automatisch weiterarbeiten", correct: false },
      { text: "Eine spezielle KI-Technik zur Bildbearbeitung von Schattenwürfen", correct: false },
      { text: "Offiziell freigegebene Tools, die selten genutzt werden", correct: false },
    ],
    explanation:
      "Schatten-KI ist die verdeckte Nutzung nicht freigegebener KI-Tools – etwa private Konten für Firmenarbeit. Gefährlich ist sie vor allem, weil niemand die Risiken managen kann, von denen niemand weiß.",
    category: "TOOLS_FREIGABE",
    difficulty: "LEICHT",
    lessonSlug: "schatten-ki",
    tags: ["Schatten-KI", "Definition"],
    practiceCase: false,
  },
  {
    text: "Eine Kollegin nutzt seit Monaten heimlich ihr privates KI-Konto für Kundentexte, weil das offizielle Tool umständlich ist. Was ist der beste Weg aus der Situation?",
    options: [
      { text: "Die Nutzung offen melden, den Bedarf offiziell anmelden und auf freigegebene Tools umsteigen", correct: true },
      { text: "Weitermachen wie bisher – solange nichts passiert, ist alles in Ordnung", correct: false },
      { text: "Das private Konto einfach löschen und niemandem etwas sagen", correct: false },
      { text: "Das private Konto den Kollegen weiterempfehlen, damit alle gleich arbeiten", correct: false },
    ],
    explanation:
      "Der Wunsch nach besseren Tools ist legitim – heimliche Nutzung ist das Problem. Offen melden, Bedarf anmelden, sauber umziehen: So weiß die Firma, wo ihre Daten sind, und kann ein passendes Tool bereitstellen.",
    category: "TOOLS_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "schatten-ki",
    tags: ["Schatten-KI", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum ist Schatten-KI für ein Unternehmen gefährlicher als offene, geregelte KI-Nutzung?",
    options: [
      { text: "Weil unbekannte Tools ohne Verträge laufen, Vorfälle unsichtbar bleiben und niemand die Risiken steuern kann", correct: true },
      { text: "Weil Schatten-KI-Tools grundsätzlich teurer sind als offizielle Tools", correct: false },
      { text: "Weil offene KI-Nutzung gesetzlich verboten ist", correct: false },
      { text: "Weil private Konten langsamer arbeiten als Firmenkonten", correct: false },
    ],
    explanation:
      "Das Kernproblem der Schatten-KI ist die Unsichtbarkeit: keine Datenschutzverträge, kein Überblick über Datenflüsse, keine Vorfallserkennung, keine Meldemöglichkeit. Risiken, von denen niemand weiß, kann niemand managen.",
    category: "TOOLS_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "schatten-ki",
    tags: ["Risiko"],
    practiceCase: false,
  },
  {
    text: "Du möchtest ein neues KI-Tool für deine Arbeit vorschlagen. Welche Angaben braucht die Freigabestelle von dir?",
    options: [
      { text: "Name und Anbieter des Tools, geplanter Einsatzzweck und welche Art von Daten verarbeitet werden soll", correct: true },
      { text: "Eine vollständige juristische Datenschutzprüfung mit Anwaltsgutachten", correct: false },
      { text: "Nur den Preis des Tools – alles andere prüft niemand", correct: false },
      { text: "Eine Liste aller Kollegen, die das Tool auch nutzen wollen, mit Unterschrift", correct: false },
    ],
    explanation:
      "Für den Vorschlag genügen die Basisinfos: Was ist das Tool, wofür soll es genutzt werden, welche Daten sollen hinein? Die eigentliche Prüfung von Datenschutz, Nutzungsbedingungen und Sicherheit übernimmt die verantwortliche Stelle.",
    category: "TOOLS_FREIGABE",
    difficulty: "LEICHT",
    lessonSlug: "neues-tool-beantragen",
    tags: ["Freigabeprozess"],
    practiceCase: false,
  },
  {
    text: "Ein Mitarbeiter will ein noch nicht freigegebenes KI-Tool \"schon mal ausprobieren\". Was ist bis zur Freigabe-Entscheidung in Ordnung?",
    options: [
      { text: "Höchstens Tests mit erfundenen Beispieldaten – keinesfalls mit echten Firmen- oder Kundendaten", correct: true },
      { text: "Die Nutzung mit echten Daten, solange es nur wenige Datensätze sind", correct: false },
      { text: "Die volle Nutzung, wenn er die Chatverläufe danach löscht", correct: false },
      { text: "Gar nichts – auch der Aufruf der Website des Anbieters ist verboten", correct: false },
    ],
    explanation:
      "Vor der Freigabe gilt: keine echten Firmendaten in das Tool. Tests mit erfundenen Beispieldaten sind meist in Ordnung und liefern der Prüfung sogar nützliche Erkenntnisse.",
    category: "TOOLS_FREIGABE",
    difficulty: "MITTEL",
    lessonSlug: "neues-tool-beantragen",
    tags: ["Testdaten", "Praxisfall"],
    practiceCase: true,
  },
  // ===== VORFÄLLE & MELDEWEGE (6) =====
  {
    text: "Welche der folgenden Situationen ist ein meldenswerter KI-Vorfall?",
    options: [
      { text: "Du bemerkst, dass du versehentlich Kundendaten in ein KI-Tool eingegeben hast", correct: true },
      { text: "Die KI braucht für eine Antwort zehn Sekunden länger als sonst", correct: false },
      { text: "Ein Kollege nutzt die KI häufiger als du", correct: false },
      { text: "Die KI formuliert eine E-Mail in einem etwas zu förmlichen Ton", correct: false },
    ],
    explanation:
      "Versehentlich eingegebene vertrauliche Daten sind der klassische KI-Vorfall und gehören sofort gemeldet. Langsame Antworten oder Stilfragen sind dagegen keine Vorfälle.",
    category: "VORFAELLE_MELDEWEGE",
    difficulty: "LEICHT",
    lessonSlug: "was-ist-ein-ki-vorfall",
    tags: ["Vorfall", "Definition"],
    practiceCase: false,
  },
  {
    text: "Du hast einen Fehler gerade noch abgefangen, bevor Schaden entstand. Solltest du den Beinahe-Vorfall trotzdem melden?",
    options: [
      { text: "Ja – Beinahe-Vorfälle sind die günstigste Lernchance, um Lücken zu schließen, bevor echter Schaden entsteht", correct: true },
      { text: "Nein – gemeldet wird nur, was tatsächlich Schaden verursacht hat", correct: false },
      { text: "Nur, wenn eine Führungskraft den Fehler beobachtet hat", correct: false },
      { text: "Nein – das würde die Statistik der Abteilung verschlechtern", correct: false },
    ],
    explanation:
      "Der Fall, der gerade noch gut gegangen ist, zeigt eine Lücke, die beim nächsten Mal vielleicht niemand abfängt. Firmen können nur Schwachstellen beheben, von denen sie wissen.",
    category: "VORFAELLE_MELDEWEGE",
    difficulty: "MITTEL",
    lessonSlug: "was-ist-ein-ki-vorfall",
    tags: ["Beinahe-Vorfall", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Freitagnachmittag bemerkst du, dass vormittags eine Bewerberliste mit Gehaltsdaten in ein nicht freigegebenes KI-Tool geladen wurde. Was tust du?",
    options: [
      { text: "Sofort melden – bei möglichen Datenschutzverletzungen können 72-Stunden-Fristen laufen", correct: true },
      { text: "Bis Montag warten – am Wochenende arbeitet ohnehin niemand", correct: false },
      { text: "Die Chatverläufe löschen und den Vorgang für erledigt erklären", correct: false },
      { text: "Zuerst selbst beim Tool-Anbieter anrufen und erst nach dessen Antwort intern melden", correct: false },
    ],
    explanation:
      "Bei möglichen Datenschutzverletzungen kann die Firma verpflichtet sein, innerhalb von 72 Stunden an die Behörde zu melden – die Frist läuft ab dem Vorfall. Nur eine sofortige interne Meldung erhält die Handlungsfähigkeit.",
    category: "VORFAELLE_MELDEWEGE",
    difficulty: "SCHWER",
    lessonSlug: "richtig-melden",
    tags: ["Meldefrist", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Warum solltest du nach einem KI-Vorfall keine Chatverläufe oder E-Mails löschen?",
    options: [
      { text: "Weil die Verantwortlichen sie brauchen, um Ausmaß und Ursache des Vorfalls zu verstehen", correct: true },
      { text: "Weil das Löschen von Chatverläufen technisch unmöglich ist", correct: false },
      { text: "Weil gelöschte Chats automatisch an die Datenschutzbehörde gesendet werden", correct: false },
      { text: "Man sollte sie löschen – je weniger Spuren, desto kleiner das Problem", correct: false },
    ],
    explanation:
      "Belege zum Vorfall sind die Grundlage für Eindämmung und Ursachenanalyse. Löschen oder Vertuschen verschlimmert die Lage – aus einer Panne kann so ein echter Verstoß werden.",
    category: "VORFAELLE_MELDEWEGE",
    difficulty: "MITTEL",
    lessonSlug: "richtig-melden",
    tags: ["Beweissicherung"],
    practiceCase: false,
  },
  {
    text: "Was kennzeichnet eine gute Ursachenanalyse nach einem KI-Vorfall?",
    options: [
      { text: "Sie fragt nach Schwächen im System – unklare Regeln, fehlende Tools, unbekannte Meldewege – statt nach Schuldigen", correct: true },
      { text: "Sie ermittelt möglichst schnell die verantwortliche Person für eine Abmahnung", correct: false },
      { text: "Sie endet, sobald der unmittelbare Schaden behoben ist", correct: false },
      { text: "Sie wird nur bei Vorfällen mit über 10.000 Euro Schaden durchgeführt", correct: false },
    ],
    explanation:
      "\"Warum war dieser Fehler so leicht möglich?\" ist die entscheidende Frage. Wer nur Schuldige sucht, bekommt bald keine Meldungen mehr – und wer Ursachen nicht behebt, erlebt dieselben Vorfälle wieder.",
    category: "VORFAELLE_MELDEWEGE",
    difficulty: "MITTEL",
    lessonSlug: "aus-vorfaellen-lernen",
    tags: ["Ursachenanalyse"],
    practiceCase: false,
  },
  {
    text: "Drei Mitarbeitende melden unabhängig dasselbe Muster: Beim KI-Zusammenfassen langer E-Mail-Ketten rutschen vertrauliche Altnachrichten mit hinein. Was ist die beste Reaktion der Firma?",
    options: [
      { text: "Die Ursache im Arbeitsablauf beheben – z. B. klare Anleitung und ein Tool, das Ketten automatisch bereinigt", correct: true },
      { text: "Die drei Meldenden ermahnen, sorgfältiger zu arbeiten", correct: false },
      { text: "Das Zusammenfassen von E-Mails komplett verbieten", correct: false },
      { text: "Nichts tun – es ist ja dreimal gut gegangen", correct: false },
    ],
    explanation:
      "Wiederkehrende Muster zeigen ein Systemproblem, kein Personenproblem. Die wirksame Antwort verbessert den Ablauf selbst – Komplettverbote oder Ermahnungen beheben die Ursache nicht und schaden der Meldekultur.",
    category: "VORFAELLE_MELDEWEGE",
    difficulty: "SCHWER",
    lessonSlug: "aus-vorfaellen-lernen",
    tags: ["Systemdenken", "Praxisfall"],
    practiceCase: true,
  },
  // ===== QUALITÄT & FEEDBACK (4) =====
  {
    text: "Warum bleibt die Stichprobenprüfung auch bei lange eingespielten KI-Routinen wichtig?",
    options: [
      { text: "Weil sich KI-Tools durch Updates verändern können und nachlassende Kontrolle genau dann zu Fehlern führt", correct: true },
      { text: "Weil KI-Tools nach einigen Monaten automatisch schlechter werden und ersetzt werden müssen", correct: false },
      { text: "Weil Stichproben gesetzlich alle 30 Tage vorgeschrieben sind", correct: false },
      { text: "Sie ist nicht wichtig – bewährte Routinen brauchen keine Kontrolle mehr", correct: false },
    ],
    explanation:
      "Die gefährlichste Phase ist die Routine: Das Vertrauen wächst, die Kontrolle sinkt – und Tool-Updates können das Verhalten unbemerkt ändern. Regelmäßige Stichproben fangen genau das ab.",
    category: "QUALITAET_FEEDBACK",
    difficulty: "MITTEL",
    lessonSlug: "ki-qualitaet-sichern",
    tags: ["Stichprobe", "Routine"],
    practiceCase: false,
  },
  {
    text: "Ein Team nutzt KI seit Monaten fehlerfrei für Produktbeschreibungen. Nach einem Tool-Update tauchen plötzlich erfundene technische Daten auf. Welche Gewohnheit hätte das am ehesten aufgefangen?",
    options: [
      { text: "Eine regelmäßige Stichproben-Routine, bei der zufällig ausgewählte Texte vollständig geprüft werden", correct: true },
      { text: "Ein längeres Passwort für das KI-Konto", correct: false },
      { text: "Die Texte zusätzlich von einer zweiten KI schreiben zu lassen", correct: false },
      { text: "Das Tool nur noch vormittags zu verwenden", correct: false },
    ],
    explanation:
      "Genau dafür ist die Stichproben-Regel da: Auch \"immer funktionierende\" Routinen werden regelmäßig gründlich geprüft, weil sich Tools durch Updates unbemerkt verändern können.",
    category: "QUALITAET_FEEDBACK",
    difficulty: "MITTEL",
    lessonSlug: "ki-qualitaet-sichern",
    tags: ["Stichprobe", "Praxisfall"],
    practiceCase: true,
  },
  {
    text: "Was passiert mit dem Feedback, das du nach der Schulung abgibst?",
    options: [
      { text: "Es wird systematisch ausgewertet – unklare Inhalte werden überarbeitet, Hinweise auf unfaire Fragen geprüft", correct: true },
      { text: "Es wird gespeichert, aber von niemandem gelesen", correct: false },
      { text: "Es entscheidet darüber, ob dein Zertifikat gültig bleibt", correct: false },
      { text: "Es wird automatisch an alle Kollegen weitergeleitet", correct: false },
    ],
    explanation:
      "Das Feedback fließt in die Qualitätssicherung: Bewerten mehrere Teilnehmende dieselbe Lektion als unklar, wird sie überarbeitet. Ehrliches – auch kritisches – Feedback verbessert die Schulung für alle. Auf dein Zertifikat hat es keinen Einfluss.",
    category: "QUALITAET_FEEDBACK",
    difficulty: "LEICHT",
    lessonSlug: "feedback-und-nachschulung",
    tags: ["Feedback", "Qualitätssicherung"],
    practiceCase: false,
  },
  {
    text: "Du hast den Test mit 78 % bestanden, lagst aber in der Kategorie Datenschutz unter 60 %. Was ist der sinnvollste nächste Schritt?",
    options: [
      { text: "Die empfohlenen Nachschulungs-Lektionen zum Datenschutz gezielt wiederholen", correct: true },
      { text: "Nichts – bestanden ist bestanden, die Schwäche spielt keine Rolle", correct: false },
      { text: "Den gesamten Kurs von Modul 1 an komplett neu durcharbeiten", correct: false },
      { text: "Den Test so oft wiederholen, bis auch die Kategorie zufällig besser ausfällt", correct: false },
    ],
    explanation:
      "Die Nachschulung empfiehlt gezielt die Lektionen zu deinen schwachen Themenfeldern – der effizienteste Weg, echte Lücken zu schließen. Bestanden heißt nicht fehlerfrei, und Datenschutz-Lücken werden im Alltag schnell teuer.",
    category: "QUALITAET_FEEDBACK",
    difficulty: "MITTEL",
    lessonSlug: "feedback-und-nachschulung",
    tags: ["Nachschulung", "Praxisfall"],
    practiceCase: true,
  },
];
