export interface SeedAnswerOption2 { text: string; correct: boolean; }
export interface SeedQuestion2 {
  text: string;
  options: SeedAnswerOption2[]; // EXAKT 4 Optionen; 1 ODER 2 korrekte
  explanation: string;          // 1-3 Sätze
  category: string;
  difficulty: "LEICHT" | "MITTEL" | "SCHWER";
  lessonSlug: string;
  tags: string[];
  practiceCase: boolean;
}

export const seedQuestions2: SeedQuestion2[] = [
  // ========== URHEBERRECHT (10 Fragen) ==========
  {
    text: "Wie werden rein KI-generierte Texte nach deutschem Urheberrecht in der Regel eingestuft?",
    options: [
      { text: "Sie genießen in der Regel keinen urheberrechtlichen Schutz, weil eine menschliche Schöpfung fehlt", correct: true },
      { text: "Das Urheberrecht liegt automatisch beim Anbieter des KI-Tools", correct: false },
      { text: "Das Urheberrecht liegt automatisch bei der Person, die den Prompt eingegeben hat", correct: false },
      { text: "Sie sind wie Softwarecode automatisch 70 Jahre geschützt", correct: false }
    ],
    explanation: "Das Urheberrecht schützt persönliche geistige Schöpfungen von Menschen. Rein maschinell erzeugte Texte ohne wesentlichen menschlichen Gestaltungsbeitrag sind daher in der Regel nicht urheberrechtlich geschützt.",
    category: "URHEBERRECHT",
    difficulty: "LEICHT",
    lessonSlug: "ki-texte-urheberrecht",
    tags: ["urheberrecht", "ki-texte", "grundlagen"],
    practiceCase: false
  },
  {
    text: "Das Marketing-Team möchte einen LinkedIn-Beitrag vollständig von einer KI schreiben lassen und direkt veröffentlichen. Welche zwei Punkte sind vor der Veröffentlichung wichtig?",
    options: [
      { text: "Den Text inhaltlich prüfen und redaktionell überarbeiten", correct: true },
      { text: "Sicherstellen, dass keine geschützten fremden Inhalte oder Formulierungen übernommen wurden", correct: true },
      { text: "Den Beitrag vorab bei einer Behörde zur Freigabe einreichen", correct: false },
      { text: "Den Prompt im Beitrag wortwörtlich mitveröffentlichen", correct: false }
    ],
    explanation: "KI-Texte können Fehler enthalten oder fremde Inhalte zu nah wiedergeben. Vor der Veröffentlichung sollten Inhalte immer geprüft, überarbeitet und auf mögliche Übernahmen fremder Werke kontrolliert werden.",
    category: "URHEBERRECHT",
    difficulty: "MITTEL",
    lessonSlug: "ki-texte-urheberrecht",
    tags: ["marketing", "ki-texte", "veroeffentlichung"],
    practiceCase: true
  },
  {
    text: "Eine Mitarbeiterin bemerkt, dass ein von der KI generierter Absatz fast wortgleich mit einem bekannten Fachartikel ist. Was ist das zentrale Risiko, wenn sie den Text trotzdem verwendet?",
    options: [
      { text: "Eine mögliche Urheberrechtsverletzung, weil geschützte fremde Inhalte übernommen werden", correct: true },
      { text: "Es gibt kein Risiko, weil die KI den Text ausgegeben hat und damit haftet", correct: false },
      { text: "Der Text verliert lediglich an Suchmaschinen-Sichtbarkeit", correct: false },
      { text: "Nur die KI-Anbieterfirma kann dafür belangt werden", correct: false }
    ],
    explanation: "KI-Modelle können Trainingsinhalte teils sehr nah reproduzieren. Wer solche Passagen übernimmt, riskiert selbst eine Urheberrechtsverletzung – die Verantwortung liegt beim Verwender, nicht bei der KI.",
    category: "URHEBERRECHT",
    difficulty: "SCHWER",
    lessonSlug: "ki-texte-urheberrecht",
    tags: ["urheberrecht", "plagiat", "haftung"],
    practiceCase: true
  },
  {
    text: "Ein Mitarbeiter formuliert einen groben Entwurf, lässt ihn von der KI sprachlich verbessern und überarbeitet das Ergebnis anschließend stark selbst. Wie ist die urheberrechtliche Lage einzuschätzen?",
    options: [
      { text: "Durch den wesentlichen menschlichen Gestaltungsanteil kann ein urheberrechtlich geschütztes Werk entstehen", correct: true },
      { text: "Sobald eine KI beteiligt war, ist jeder Schutz dauerhaft ausgeschlossen", correct: false },
      { text: "Das Urheberrecht geht in diesem Fall auf den KI-Anbieter über", correct: false },
      { text: "Der Text muss zwingend gelöscht werden", correct: false }
    ],
    explanation: "Entscheidend ist der menschliche Schöpfungsanteil. Wer KI nur als Werkzeug nutzt und das Ergebnis maßgeblich selbst gestaltet, kann durchaus Urheber des Endprodukts sein.",
    category: "URHEBERRECHT",
    difficulty: "LEICHT",
    lessonSlug: "ki-texte-urheberrecht",
    tags: ["urheberrecht", "menschlicher-beitrag", "ki-texte"],
    practiceCase: false
  },
  {
    text: "Darf ein Unternehmen ein KI-generiertes Bild, das ein bekanntes Markenlogo enthält, für die eigene Werbung verwenden?",
    options: [
      { text: "Nein, fremde Markenlogos sind markenrechtlich geschützt – auch in KI-generierten Bildern", correct: true },
      { text: "Ja, weil KI-Bilder grundsätzlich frei von Rechten Dritter sind", correct: false },
      { text: "Ja, solange das Logo kleiner als das eigene Firmenlogo ist", correct: false },
      { text: "Ja, wenn das Bild intern erstellt wurde", correct: false }
    ],
    explanation: "Markenrechte gelten unabhängig davon, wie ein Bild entstanden ist. Die Nutzung fremder Logos in der Werbung kann eine Markenrechtsverletzung darstellen.",
    category: "URHEBERRECHT",
    difficulty: "LEICHT",
    lessonSlug: "ki-bilder-marken",
    tags: ["markenrecht", "ki-bilder", "werbung"],
    practiceCase: false
  },
  {
    text: "Das Marketing-Team generiert per KI ein Werbebild, das eine weltbekannte Comicfigur deutlich erkennbar nachahmt. Wie sollte das Team reagieren?",
    options: [
      { text: "Das Bild nicht verwenden, weil bekannte Figuren urheber- und markenrechtlich geschützt sein können", correct: true },
      { text: "Das Bild verwenden, weil es sich technisch nur um eine Nachahmung handelt", correct: false },
      { text: "Das Bild verwenden, aber die Farben leicht verändern", correct: false },
      { text: "Das Bild verwenden, solange die Figur nicht namentlich genannt wird", correct: false }
    ],
    explanation: "Auch KI-generierte Nachahmungen bekannter Figuren können bestehende Schutzrechte verletzen. Kleine Änderungen an Farben oder das Weglassen des Namens beseitigen dieses Risiko nicht.",
    category: "URHEBERRECHT",
    difficulty: "MITTEL",
    lessonSlug: "ki-bilder-marken",
    tags: ["ki-bilder", "urheberrecht", "marketing"],
    practiceCase: true
  },
  {
    text: "Ein Unternehmen möchte KI-generierte Bilder kommerziell nutzen. Welche zwei Punkte sollten vorher geprüft werden?",
    options: [
      { text: "Die Nutzungsbedingungen des KI-Anbieters, insbesondere zur kommerziellen Verwendung", correct: true },
      { text: "Ob das Bild erkennbar geschützte Werke, Personen oder Marken Dritter enthält", correct: true },
      { text: "Ob das Bild mindestens 10 Megapixel Auflösung hat", correct: false },
      { text: "Ob der Prompt in englischer Sprache verfasst wurde", correct: false }
    ],
    explanation: "Viele KI-Anbieter regeln die kommerzielle Nutzung in ihren Nutzungsbedingungen unterschiedlich. Zusätzlich muss geprüft werden, ob Rechte Dritter – etwa an Marken, Personen oder Werken – betroffen sind.",
    category: "URHEBERRECHT",
    difficulty: "SCHWER",
    lessonSlug: "ki-bilder-marken",
    tags: ["nutzungsbedingungen", "ki-bilder", "kommerzielle-nutzung"],
    practiceCase: false
  },
  {
    text: "Welche Transparenzpflicht gilt nach dem EU AI Act für Chatbots im Kundenkontakt?",
    options: [
      { text: "Nutzer müssen erkennen können, dass sie mit einer KI und nicht mit einem Menschen kommunizieren", correct: true },
      { text: "Chatbots dürfen nur nachts betrieben werden", correct: false },
      { text: "Chatbots müssen jede Antwort von einem Anwalt freigeben lassen", correct: false },
      { text: "Es gibt keinerlei Vorgaben für Chatbots", correct: false }
    ],
    explanation: "Der EU AI Act verlangt, dass sich KI-Systeme, die mit Menschen interagieren, als KI zu erkennen geben. Nutzer sollen wissen, dass sie nicht mit einem Menschen sprechen.",
    category: "URHEBERRECHT",
    difficulty: "LEICHT",
    lessonSlug: "transparenz-ki-inhalte",
    tags: ["transparenz", "chatbot", "eu-ai-act"],
    practiceCase: false
  },
  {
    text: "Die Marketingabteilung plant als Gag ein täuschend echtes KI-Video, in dem der Geschäftsführer scheinbar ein neues Produkt ankündigt. Was ist zu beachten?",
    options: [
      { text: "Solche Deepfakes sind kennzeichnungspflichtig – es muss erkennbar sein, dass der Inhalt künstlich erzeugt wurde", correct: true },
      { text: "Nichts, weil interne Marketingideen von allen Regeln ausgenommen sind", correct: false },
      { text: "Das Video darf nur verboten werden, wenn sich jemand beschwert", correct: false },
      { text: "Eine Kennzeichnung ist nur bei Videos über 10 Minuten Länge nötig", correct: false }
    ],
    explanation: "Täuschend echte, KI-generierte Video-, Bild- oder Audioinhalte (Deepfakes) müssen nach dem EU AI Act als künstlich erzeugt gekennzeichnet werden. Zusätzlich sollte die abgebildete Person einwilligen.",
    category: "URHEBERRECHT",
    difficulty: "MITTEL",
    lessonSlug: "transparenz-ki-inhalte",
    tags: ["deepfake", "kennzeichnung", "marketing"],
    practiceCase: true
  },
  {
    text: "Ein Unternehmen will in einer Pressemitteilung ein fotorealistisches KI-Bild verwenden, das eine reale Ereignisszene täuschend echt darstellt. Wie ist korrekt vorzugehen?",
    options: [
      { text: "Das Bild als KI-generiert kennzeichnen, damit Empfänger nicht über die Echtheit getäuscht werden", correct: true },
      { text: "Das Bild ohne Hinweis verwenden, weil Pressemitteilungen nicht unter Transparenzregeln fallen", correct: false },
      { text: "Das Bild nur in Schwarz-Weiß veröffentlichen", correct: false },
      { text: "Das Bild verwenden und die Kennzeichnung nur auf Nachfrage nachreichen", correct: false }
    ],
    explanation: "Fotorealistische KI-Inhalte, die echte Szenen vortäuschen, sind kennzeichnungspflichtig. Die Kennzeichnung muss von Anfang an erfolgen, nicht erst auf Nachfrage.",
    category: "URHEBERRECHT",
    difficulty: "SCHWER",
    lessonSlug: "transparenz-ki-inhalte",
    tags: ["kennzeichnung", "ki-bilder", "presse"],
    practiceCase: true
  },

  // ========== BIAS_ETHIK (10 Fragen) ==========
  {
    text: "Was ist Bias im Zusammenhang mit KI-Systemen?",
    options: [
      { text: "Eine Verzerrung in KI-Ergebnissen, die zu einseitigen oder benachteiligenden Resultaten führen kann", correct: true },
      { text: "Ein technischer Defekt der Grafikkarte", correct: false },
      { text: "Eine besonders schnelle Antwortfunktion von Chatbots", correct: false },
      { text: "Ein Verschlüsselungsverfahren für KI-Daten", correct: false }
    ],
    explanation: "Bias bezeichnet Verzerrungen in KI-Ergebnissen, etwa durch einseitige Trainingsdaten. Solche Verzerrungen können zur systematischen Benachteiligung bestimmter Personengruppen führen.",
    category: "BIAS_ETHIK",
    difficulty: "LEICHT",
    lessonSlug: "was-ist-bias",
    tags: ["bias", "grundlagen", "definition"],
    practiceCase: false
  },
  {
    text: "Woher stammt Bias in KI-Systemen typischerweise?",
    options: [
      { text: "Vor allem aus einseitigen oder unausgewogenen Trainingsdaten", correct: true },
      { text: "Ausschließlich aus Hackerangriffen", correct: false },
      { text: "Aus zu großen Bildschirmen der Nutzer", correct: false },
      { text: "Aus der Stromversorgung des Rechenzentrums", correct: false }
    ],
    explanation: "KI lernt aus Daten. Spiegeln die Trainingsdaten historische Ungleichheiten oder einseitige Muster wider, übernimmt und verstärkt die KI diese Verzerrungen häufig.",
    category: "BIAS_ETHIK",
    difficulty: "LEICHT",
    lessonSlug: "was-ist-bias",
    tags: ["bias", "trainingsdaten", "ursachen"],
    practiceCase: false
  },
  {
    text: "Ein Mitarbeiter lässt die KI Bilder von \"einer Führungskraft\" generieren und erhält fast ausschließlich Bilder von Männern in Anzügen. Was zeigt dieses Beispiel?",
    options: [
      { text: "Einen typischen Bias: Die KI reproduziert Stereotype aus ihren Trainingsdaten", correct: true },
      { text: "Einen Zufall ohne jede Bedeutung, der sich nicht wiederholen wird", correct: false },
      { text: "Dass Führungskräfte tatsächlich fast immer Männer sind", correct: false },
      { text: "Einen Übertragungsfehler im Internetbrowser", correct: false }
    ],
    explanation: "Wenn eine KI bestimmte Rollen stereotyp darstellt, liegt das meist an Verzerrungen in den Trainingsdaten. Solche Ausgaben sollten erkannt und bewusst hinterfragt werden.",
    category: "BIAS_ETHIK",
    difficulty: "MITTEL",
    lessonSlug: "was-ist-bias",
    tags: ["bias", "stereotype", "ki-bilder"],
    practiceCase: true
  },
  {
    text: "Welche zwei Beispiele beschreiben Bias in KI-Systemen?",
    options: [
      { text: "Eine Übersetzungs-KI ordnet Berufe automatisch stereotypen Geschlechtern zu", correct: true },
      { text: "Ein Auswahlsystem bewertet Lebensläufe mit ausländisch klingenden Namen systematisch schlechter", correct: true },
      { text: "Eine KI braucht für lange Texte mehr Rechenzeit", correct: false },
      { text: "Ein Chatbot antwortet in mehreren Sprachen", correct: false }
    ],
    explanation: "Bias zeigt sich, wenn KI-Ergebnisse bestimmte Gruppen systematisch bevorzugen oder benachteiligen. Längere Rechenzeit oder Mehrsprachigkeit sind dagegen normale technische Eigenschaften.",
    category: "BIAS_ETHIK",
    difficulty: "MITTEL",
    lessonSlug: "was-ist-bias",
    tags: ["bias", "beispiele", "diskriminierung"],
    practiceCase: false
  },
  {
    text: "Eine Kollegin übersetzt Stellenprofile mit einer KI und stellt fest, dass \"the nurse\" stets weiblich und \"the engineer\" stets männlich übersetzt wird. Wie sollte sie damit umgehen?",
    options: [
      { text: "Die Übersetzungen kritisch prüfen und geschlechtsneutrale bzw. korrekte Formulierungen manuell sicherstellen", correct: true },
      { text: "Die Übersetzung unverändert übernehmen, weil die KI die Sprache besser kennt", correct: false },
      { text: "Nur noch auf Übersetzungen verzichten", correct: false },
      { text: "Das Problem ignorieren, weil es nur Sprache betrifft", correct: false }
    ],
    explanation: "Sprachliche Verzerrungen sind eine reale Form von Bias und können in Stellenprofilen diskriminierend wirken. KI-Ausgaben müssen deshalb geprüft und bei Bedarf korrigiert werden.",
    category: "BIAS_ETHIK",
    difficulty: "SCHWER",
    lessonSlug: "was-ist-bias",
    tags: ["bias", "uebersetzung", "sprache"],
    practiceCase: true
  },
  {
    text: "Was ist bei KI in der Bewerberauswahl besonders wichtig?",
    options: [
      { text: "Das Diskriminierungsrisiko beachten, den möglichen Hochrisiko-Kontext erkennen und menschliche Kontrolle sicherstellen", correct: true },
      { text: "Die KI sollte Bewerber ohne menschliche Beteiligung ablehnen dürfen, um Zeit zu sparen", correct: false },
      { text: "Es gelten keine besonderen Anforderungen, weil Personalauswahl reine Privatsache ist", correct: false },
      { text: "Nur die Rechenleistung des Systems ist entscheidend", correct: false }
    ],
    explanation: "KI in der Bewerberauswahl gilt nach dem EU AI Act als typischer Hochrisiko-Anwendungsfall. Diskriminierungsrisiken müssen beachtet und Entscheidungen von Menschen kontrolliert werden.",
    category: "BIAS_ETHIK",
    difficulty: "MITTEL",
    lessonSlug: "diskriminierung-verhindern",
    tags: ["bewerberauswahl", "hochrisiko", "menschliche-kontrolle"],
    practiceCase: false
  },
  {
    text: "Welche Maßnahme hilft am wirksamsten, Diskriminierung durch KI im Arbeitsalltag zu verhindern?",
    options: [
      { text: "KI-Ergebnisse durch Menschen prüfen lassen, bevor Entscheidungen über Personen getroffen werden", correct: true },
      { text: "KI-Ergebnisse grundsätzlich ungeprüft übernehmen, weil Maschinen neutral sind", correct: false },
      { text: "Die Ergebnisse geheim halten, damit niemand Verzerrungen bemerkt", correct: false },
      { text: "Nur besonders teure KI-Tools einsetzen", correct: false }
    ],
    explanation: "Menschliche Kontrolle ist der wichtigste Schutz gegen diskriminierende KI-Entscheidungen. KI ist nicht automatisch neutral, da sie Verzerrungen aus ihren Daten übernehmen kann.",
    category: "BIAS_ETHIK",
    difficulty: "LEICHT",
    lessonSlug: "diskriminierung-verhindern",
    tags: ["menschliche-kontrolle", "diskriminierung", "massnahmen"],
    practiceCase: false
  },
  {
    text: "Die HR-Abteilung möchte Bewerbungen künftig automatisch von einer KI vorsortieren lassen. Welche zwei Punkte müssen dabei unbedingt beachtet werden?",
    options: [
      { text: "Solche Systeme fallen in der Regel in den Hochrisiko-Bereich des EU AI Act", correct: true },
      { text: "Die Vorsortierung muss durch Menschen überprüfbar bleiben und darf nicht ungeprüft über Absagen entscheiden", correct: true },
      { text: "Die KI darf Bewerbungen endgültig ablehnen, solange niemand nachfragt", correct: false },
      { text: "Bewerberdaten dürfen bedenkenlos in beliebige kostenlose Online-Tools kopiert werden", correct: false }
    ],
    explanation: "KI-gestützte Bewerberauswahl ist ein klassisches Hochrisiko-Beispiel im EU AI Act. Menschliche Aufsicht und ein sorgfältiger Umgang mit den Bewerberdaten sind zwingend erforderlich.",
    category: "BIAS_ETHIK",
    difficulty: "MITTEL",
    lessonSlug: "diskriminierung-verhindern",
    tags: ["hr", "bewerberauswahl", "hochrisiko"],
    practiceCase: true
  },
  {
    text: "Ein KI-Tool zur Leistungsbewertung stuft auffällig oft Teilzeitkräfte schlechter ein. Was ist die richtige Reaktion des Unternehmens?",
    options: [
      { text: "Die Auffälligkeit untersuchen, das Tool kritisch prüfen und die Ergebnisse nicht ungeprüft für Personalentscheidungen nutzen", correct: true },
      { text: "Den Befund ignorieren, weil das Tool objektive Zahlen liefert", correct: false },
      { text: "Teilzeitkräfte auffordern, in Vollzeit zu wechseln", correct: false },
      { text: "Die Bewertungen sofort für Gehaltskürzungen verwenden", correct: false }
    ],
    explanation: "Systematisch schlechtere Bewertungen einer Gruppe sind ein starkes Bias-Signal. Solche Ergebnisse müssen untersucht werden, bevor sie in Personalentscheidungen einfließen – sonst droht Diskriminierung.",
    category: "BIAS_ETHIK",
    difficulty: "SCHWER",
    lessonSlug: "diskriminierung-verhindern",
    tags: ["personalmanagement", "bias", "leistungsbewertung"],
    practiceCase: true
  },
  {
    text: "Ein Teamleiter übernimmt KI-Empfehlungen zur Schichtplanung grundsätzlich ungeprüft, \"weil der Computer das objektiv berechnet\". Welches Problem beschreibt dieses Verhalten?",
    options: [
      { text: "Blindes Vertrauen in KI-Ergebnisse, das Verzerrungen unbemerkt wirksam werden lässt", correct: true },
      { text: "Kein Problem – automatisierte Empfehlungen sind immer fehlerfrei", correct: false },
      { text: "Ein reines Datenschutzproblem ohne Bezug zu Fairness", correct: false },
      { text: "Ein Verstoß gegen das Markenrecht", correct: false }
    ],
    explanation: "Unkritisches Vertrauen in KI-Ausgaben wird auch Automation Bias genannt. Wer Empfehlungen nie hinterfragt, übersieht Fehler und Verzerrungen, die Mitarbeitende benachteiligen können.",
    category: "BIAS_ETHIK",
    difficulty: "SCHWER",
    lessonSlug: "was-ist-bias",
    tags: ["automation-bias", "kritisches-pruefen", "fuehrung"],
    practiceCase: true
  },

  // ========== EU_AI_ACT (16 Fragen) ==========
  {
    text: "Was ist der EU AI Act?",
    options: [
      { text: "Die Verordnung (EU) 2024/1689, die KI-Systeme nach einem risikobasierten Ansatz reguliert", correct: true },
      { text: "Eine freiwillige Selbstverpflichtung großer Tech-Konzerne", correct: false },
      { text: "Ein deutsches Bundesgesetz, das nur für Behörden gilt", correct: false },
      { text: "Eine technische Norm für Computerhardware", correct: false }
    ],
    explanation: "Der EU AI Act ist die Verordnung (EU) 2024/1689. Sie reguliert KI-Systeme nach ihrem Risiko – von verbotenen Praktiken über Hochrisiko-KI bis zu Transparenzpflichten und geringem Risiko.",
    category: "EU_AI_ACT",
    difficulty: "LEICHT",
    lessonSlug: "was-ist-eu-ai-act",
    tags: ["eu-ai-act", "grundlagen", "verordnung"],
    practiceCase: false
  },
  {
    text: "Welche Risikokategorien kennt der risikobasierte Ansatz des EU AI Act?",
    options: [
      { text: "Verbotene Praktiken, Hochrisiko-KI, Transparenzpflichten und geringes Risiko", correct: true },
      { text: "Nur \"erlaubt\" und \"verboten\"", correct: false },
      { text: "Eine Einstufung nach der Größe des Unternehmens", correct: false },
      { text: "Eine Einstufung nach dem Kaufpreis der Software", correct: false }
    ],
    explanation: "Der EU AI Act unterscheidet mehrere Stufen: verbotene Praktiken, Hochrisiko-KI mit strengen Anforderungen, Systeme mit Transparenzpflichten und KI mit geringem Risiko.",
    category: "EU_AI_ACT",
    difficulty: "LEICHT",
    lessonSlug: "was-ist-eu-ai-act",
    tags: ["risikostufen", "eu-ai-act", "grundlagen"],
    practiceCase: false
  },
  {
    text: "Gilt der EU AI Act nur für Unternehmen, die KI selbst entwickeln?",
    options: [
      { text: "Nein, er richtet sich auch an Betreiber, die KI-Systeme beruflich einsetzen", correct: true },
      { text: "Ja, nur Softwarehersteller sind betroffen", correct: false },
      { text: "Ja, und auch nur solche mit mehr als 1000 Mitarbeitenden", correct: false },
      { text: "Nein, er gilt ausschließlich für Privatpersonen", correct: false }
    ],
    explanation: "Der EU AI Act adressiert neben Anbietern auch Betreiber, also Organisationen, die KI-Systeme im beruflichen Kontext nutzen. Auch KMU können daher Pflichten haben.",
    category: "EU_AI_ACT",
    difficulty: "MITTEL",
    lessonSlug: "was-ist-eu-ai-act",
    tags: ["anwendungsbereich", "betreiber", "kmu"],
    practiceCase: false
  },
  {
    text: "Was bedeutet der \"risikobasierte Ansatz\" des EU AI Act konkret?",
    options: [
      { text: "Die Pflichten richten sich nach dem Risiko des konkreten Einsatzzwecks, nicht pauschal nach der Technologie", correct: true },
      { text: "Jede KI-Nutzung unterliegt exakt denselben strengen Auflagen", correct: false },
      { text: "Nur Systeme mit Internetverbindung werden reguliert", correct: false },
      { text: "Das Risiko wird allein vom Hersteller nach Belieben festgelegt", correct: false }
    ],
    explanation: "Der EU AI Act reguliert nicht die Technologie pauschal, sondern den Einsatzzweck: Je höher das Risiko für Menschen und ihre Grundrechte, desto strenger die Anforderungen.",
    category: "EU_AI_ACT",
    difficulty: "SCHWER",
    lessonSlug: "was-ist-eu-ai-act",
    tags: ["risikobasierter-ansatz", "einsatzzweck", "regulierung"],
    practiceCase: false
  },
  {
    text: "Welche der folgenden Praktiken ist nach dem EU AI Act verboten?",
    options: [
      { text: "Bestimmtes Social Scoring, also die umfassende Bewertung von Personen anhand ihres Sozialverhaltens", correct: true },
      { text: "Die Nutzung von KI zur Rechtschreibprüfung", correct: false },
      { text: "Die Erstellung von Meeting-Zusammenfassungen mit KI", correct: false },
      { text: "Der Einsatz von KI-Übersetzungstools", correct: false }
    ],
    explanation: "Zu den verbotenen Praktiken zählen u. a. bestimmtes Social Scoring, manipulative Systeme, die Ausnutzung schutzbedürftiger Personen und bestimmte biometrische Überwachung. Alltagswerkzeuge wie Rechtschreibprüfung sind unproblematisch.",
    category: "EU_AI_ACT",
    difficulty: "LEICHT",
    lessonSlug: "verbotene-praktiken",
    tags: ["verbotene-praktiken", "social-scoring", "eu-ai-act"],
    practiceCase: false
  },
  {
    text: "Ein Softwareanbieter bewirbt bei der Geschäftsleitung ein Tool, das per Kamera die Emotionen der Mitarbeitenden am Arbeitsplatz auswertet. Wie ist das einzuordnen?",
    options: [
      { text: "Sehr kritisch: Emotionserkennung am Arbeitsplatz ist nach dem EU AI Act grundsätzlich verboten (mit engen Ausnahmen etwa für Medizin und Sicherheit)", correct: true },
      { text: "Unbedenklich, weil es der Produktivitätssteigerung dient", correct: false },
      { text: "Erlaubt, solange die Kameras gut sichtbar sind", correct: false },
      { text: "Erlaubt, wenn die Auswertung nur monatlich erfolgt", correct: false }
    ],
    explanation: "Systeme zur Emotionserkennung am Arbeitsplatz gehören zu den verbotenen Praktiken des EU AI Act, abgesehen von engen Ausnahmen etwa aus medizinischen oder Sicherheitsgründen. Das Angebot sollte abgelehnt werden.",
    category: "EU_AI_ACT",
    difficulty: "MITTEL",
    lessonSlug: "verbotene-praktiken",
    tags: ["emotionserkennung", "arbeitsplatz", "verbotene-praktiken"],
    practiceCase: true
  },
  {
    text: "Welche zwei der folgenden Einsatzformen zählen zu den verbotenen Praktiken des EU AI Act?",
    options: [
      { text: "KI-Systeme, die Menschen durch manipulative Techniken unterschwellig zu schädlichem Verhalten verleiten", correct: true },
      { text: "KI-Systeme, die gezielt die Schutzbedürftigkeit von Personen (z. B. Alter oder Behinderung) ausnutzen", correct: true },
      { text: "Chatbots im Kundenservice, die sich als KI zu erkennen geben", correct: false },
      { text: "KI-gestützte Terminplanung im Sekretariat", correct: false }
    ],
    explanation: "Manipulative Systeme und die Ausnutzung schutzbedürftiger Personen sind verbotene Praktiken. Gekennzeichnete Chatbots und Alltagsanwendungen wie Terminplanung sind dagegen zulässig.",
    category: "EU_AI_ACT",
    difficulty: "SCHWER",
    lessonSlug: "verbotene-praktiken",
    tags: ["verbotene-praktiken", "manipulation", "schutzbeduerftige"],
    practiceCase: false
  },
  {
    text: "Das Marketing schlägt vor, per KI Werbebotschaften so zu gestalten, dass sie Kunden unterschwellig und ohne deren Bewusstsein zu Käufen drängen, die ihnen schaden können. Wie ist das zu bewerten?",
    options: [
      { text: "Das ist abzulehnen: Manipulative KI-Techniken, die Menschen unbewusst zu schädlichem Verhalten bewegen, sind verboten", correct: true },
      { text: "Das ist normales Marketing und völlig unbedenklich", correct: false },
      { text: "Das ist erlaubt, solange die Kampagne erfolgreich ist", correct: false },
      { text: "Das ist nur ein Problem, wenn Wettbewerber davon erfahren", correct: false }
    ],
    explanation: "Der EU AI Act verbietet KI-Systeme, die Menschen durch unterschwellige oder manipulative Techniken erheblich schaden können. Solche Kampagnenideen dürfen nicht umgesetzt werden.",
    category: "EU_AI_ACT",
    difficulty: "MITTEL",
    lessonSlug: "verbotene-praktiken",
    tags: ["manipulation", "marketing", "verbotene-praktiken"],
    practiceCase: true
  },
  {
    text: "Welcher der folgenden Anwendungsfälle gilt nach dem EU AI Act typischerweise als Hochrisiko-KI?",
    options: [
      { text: "KI-Systeme zur Auswahl und Bewertung von Bewerberinnen und Bewerbern", correct: true },
      { text: "KI zur automatischen Sortierung des Spam-Ordners", correct: false },
      { text: "KI-gestützte Wettervorhersagen im Intranet", correct: false },
      { text: "Ein Chatbot, der Bürozeiten nennt", correct: false }
    ],
    explanation: "Die Bewerberauswahl ist ein klassisches Hochrisiko-Beispiel, weil KI-Entscheidungen hier erheblich in Lebenschancen eingreifen. Weitere Beispiele sind Bildung/Prüfungen, Kreditwürdigkeit, kritische Infrastruktur und Personalmanagement.",
    category: "EU_AI_ACT",
    difficulty: "LEICHT",
    lessonSlug: "hochrisiko-ki",
    tags: ["hochrisiko", "bewerberauswahl", "beispiele"],
    practiceCase: false
  },
  {
    text: "Die Personalabteilung eines KMU will eine Software einführen, die Bewerbungen automatisch bewertet und ein Ranking erstellt. Welche Einordnung nach dem EU AI Act trifft zu?",
    options: [
      { text: "Es handelt sich in der Regel um Hochrisiko-KI, für die besondere Pflichten und menschliche Aufsicht gelten", correct: true },
      { text: "Es handelt sich um geringes Risiko, weil nur Texte verarbeitet werden", correct: false },
      { text: "Der EU AI Act gilt nicht, weil das Unternehmen klein ist", correct: false },
      { text: "Es handelt sich um eine verbotene Praktik, die niemals eingesetzt werden darf", correct: false }
    ],
    explanation: "KI zur Bewerberauswahl ist im EU AI Act als Hochrisiko-Anwendung eingestuft – unabhängig von der Unternehmensgröße. Sie ist nicht verboten, unterliegt aber strengen Anforderungen wie menschlicher Aufsicht.",
    category: "EU_AI_ACT",
    difficulty: "MITTEL",
    lessonSlug: "hochrisiko-ki",
    tags: ["hr", "hochrisiko", "bewerberauswahl"],
    practiceCase: true
  },
  {
    text: "Eine Bank überlegt, die Kreditwürdigkeit von Privatkunden vollautomatisch per KI bewerten zu lassen. Ein Mitarbeiter fragt, ob das ein Hochrisiko-Fall ist. Was ist die richtige Antwort?",
    options: [
      { text: "Ja, die Bewertung der Kreditwürdigkeit natürlicher Personen zählt zu den Hochrisiko-Anwendungen des EU AI Act", correct: true },
      { text: "Nein, Finanzthemen sind vom EU AI Act komplett ausgenommen", correct: false },
      { text: "Nein, weil Banken ohnehin schon reguliert sind, gilt der EU AI Act dort nicht", correct: false },
      { text: "Ja, aber nur bei Krediten über einer Million Euro", correct: false }
    ],
    explanation: "Die KI-gestützte Bewertung der Kreditwürdigkeit natürlicher Personen ist ein Hochrisiko-Anwendungsfall, weil sie den Zugang zu wesentlichen Leistungen beeinflusst. Die Kredithöhe spielt für die Einstufung keine Rolle.",
    category: "EU_AI_ACT",
    difficulty: "SCHWER",
    lessonSlug: "hochrisiko-ki",
    tags: ["kreditwuerdigkeit", "hochrisiko", "finanzen"],
    practiceCase: true
  },
  {
    text: "Ein Unternehmen setzt ein Hochrisiko-KI-System ein. Welche zwei Pflichten treffen es als Betreiber typischerweise?",
    options: [
      { text: "Das System gemäß der Betriebsanleitung des Anbieters verwenden", correct: true },
      { text: "Eine wirksame menschliche Aufsicht über das System sicherstellen", correct: true },
      { text: "Den Quellcode des Systems selbst neu programmieren", correct: false },
      { text: "Das System mindestens fünf Jahre lang ohne Updates betreiben", correct: false }
    ],
    explanation: "Betreiber von Hochrisiko-KI müssen das System bestimmungsgemäß nach den Anweisungen des Anbieters nutzen und menschliche Aufsicht durch geschultes Personal gewährleisten.",
    category: "EU_AI_ACT",
    difficulty: "SCHWER",
    lessonSlug: "hochrisiko-ki",
    tags: ["betreiberpflichten", "hochrisiko", "menschliche-aufsicht"],
    practiceCase: false
  },
  {
    text: "Wer ist nach dem EU AI Act \"Anbieter\" eines KI-Systems?",
    options: [
      { text: "Wer ein KI-System entwickelt oder entwickeln lässt und es unter eigenem Namen auf den Markt bringt", correct: true },
      { text: "Jede Person, die einen Chatbot benutzt", correct: false },
      { text: "Ausschließlich staatliche Stellen", correct: false },
      { text: "Der Stromversorger des Rechenzentrums", correct: false }
    ],
    explanation: "Anbieter ist, wer ein KI-System entwickelt bzw. entwickeln lässt und es unter eigenem Namen oder eigener Marke in Verkehr bringt. Wer es nur beruflich nutzt, ist in der Regel Betreiber.",
    category: "EU_AI_ACT",
    difficulty: "LEICHT",
    lessonSlug: "rollen-anbieter-betreiber",
    tags: ["anbieter", "rollen", "definition"],
    practiceCase: false
  },
  {
    text: "Ein zehnköpfiges Beratungsunternehmen nutzt ChatGPT täglich für Recherchen und Textentwürfe. Welche Rolle nimmt das Unternehmen nach dem EU AI Act ein?",
    options: [
      { text: "Es ist in der Regel Betreiber, weil es ein KI-System im beruflichen Kontext einsetzt", correct: true },
      { text: "Es ist Anbieter, weil es die Ergebnisse an Kunden weitergibt", correct: false },
      { text: "Es hat keine Rolle, weil ChatGPT ein amerikanisches Produkt ist", correct: false },
      { text: "Es ist automatisch eine Aufsichtsbehörde für KI", correct: false }
    ],
    explanation: "Wer ein KI-System beruflich einsetzt, ohne es selbst zu entwickeln und zu vertreiben, ist in der Regel Betreiber im Sinne des EU AI Act. Das gilt auch für KMU, die Tools wie ChatGPT im Arbeitsalltag nutzen.",
    category: "EU_AI_ACT",
    difficulty: "MITTEL",
    lessonSlug: "rollen-anbieter-betreiber",
    tags: ["betreiber", "kmu", "chatgpt"],
    practiceCase: true
  },
  {
    text: "Eine Mitarbeiterin nutzt zu Hause privat einen KI-Bildgenerator für ihr Hobby. Inwieweit ist sie vom EU AI Act betroffen?",
    options: [
      { text: "Die rein private, nicht berufliche Nutzung ist vom EU AI Act weitgehend nicht erfasst", correct: true },
      { text: "Sie muss sich als private Betreiberin bei einer Behörde registrieren", correct: false },
      { text: "Sie unterliegt denselben Pflichten wie ein KI-Hersteller", correct: false },
      { text: "Sie darf KI privat grundsätzlich nicht verwenden", correct: false }
    ],
    explanation: "Der EU AI Act richtet sich an Anbieter und an Betreiber im beruflichen Kontext. Die rein private Nutzung von KI-Tools ist von den Betreiberpflichten weitgehend ausgenommen.",
    category: "EU_AI_ACT",
    difficulty: "MITTEL",
    lessonSlug: "rollen-anbieter-betreiber",
    tags: ["private-nutzung", "anwendungsbereich", "rollen"],
    practiceCase: false
  },
  {
    text: "Ein KMU kauft ein KI-System ein, verändert es wesentlich und vertreibt es anschließend unter eigenem Firmennamen an Kunden. Was kann das für die Rolle des KMU bedeuten?",
    options: [
      { text: "Es kann dadurch selbst als Anbieter gelten und die entsprechenden Anbieterpflichten übernehmen", correct: true },
      { text: "Nichts – die Rolle des ursprünglichen Herstellers bleibt in jedem Fall unverändert bestehen", correct: false },
      { text: "Das KMU wird dadurch automatisch von allen Pflichten befreit", correct: false },
      { text: "Das KMU gilt dann als Privatnutzer", correct: false }
    ],
    explanation: "Wer ein KI-System wesentlich verändert oder es unter eigenem Namen in Verkehr bringt, kann selbst in die Anbieterrolle rutschen. Damit gehen deutlich umfangreichere Pflichten einher als in der Betreiberrolle.",
    category: "EU_AI_ACT",
    difficulty: "SCHWER",
    lessonSlug: "rollen-anbieter-betreiber",
    tags: ["rollenwechsel", "anbieterpflichten", "vertrieb"],
    practiceCase: true
  },

  // ========== ART4_KOMPETENZ (12 Fragen) ==========
  {
    text: "Was verlangt Art. 4 EU AI Act im Kern?",
    options: [
      { text: "Anbieter und Betreiber sollen sicherstellen, dass Personen, die mit KI-Systemen arbeiten, über ausreichende KI-Kompetenz verfügen", correct: true },
      { text: "Jede Firma braucht eine behördliche KI-Prüfung vor dem ersten KI-Einsatz", correct: false },
      { text: "Alle Mitarbeitenden müssen eine Programmiersprache erlernen", correct: false },
      { text: "KI darf nur noch von externen Dienstleistern bedient werden", correct: false }
    ],
    explanation: "Art. 4 EU AI Act verpflichtet Anbieter und Betreiber, für ausreichende KI-Kompetenz ihres Personals zu sorgen. Es geht um Verständnis und sicheren Umgang, nicht um Programmierkenntnisse oder behördliche Prüfungen.",
    category: "ART4_KOMPETENZ",
    difficulty: "LEICHT",
    lessonSlug: "was-verlangt-art4",
    tags: ["art4", "ki-kompetenz", "grundlagen"],
    practiceCase: false
  },
  {
    text: "An wen richtet sich die Pflicht zur KI-Kompetenz aus Art. 4 EU AI Act?",
    options: [
      { text: "An Anbieter und Betreiber von KI-Systemen", correct: true },
      { text: "Nur an Universitäten und Forschungseinrichtungen", correct: false },
      { text: "Nur an Privatpersonen", correct: false },
      { text: "Nur an Unternehmen mit eigener IT-Abteilung", correct: false }
    ],
    explanation: "Art. 4 adressiert Anbieter und Betreiber von KI-Systemen. Auch kleine Unternehmen, die KI beruflich nutzen, sollen als Betreiber für die Kompetenz ihres Personals sorgen.",
    category: "ART4_KOMPETENZ",
    difficulty: "LEICHT",
    lessonSlug: "was-verlangt-art4",
    tags: ["art4", "anbieter", "betreiber"],
    practiceCase: false
  },
  {
    text: "Welche zwei Bestandteile gehören zur KI-Kompetenz im Sinne von Art. 4 EU AI Act?",
    options: [
      { text: "Ein Grundverständnis von KI, ihren Chancen, Grenzen und Risiken", correct: true },
      { text: "Die Fähigkeit, KI-Ergebnisse kritisch zu prüfen und im Einsatzkontext sicher anzuwenden", correct: true },
      { text: "Die Fähigkeit, neuronale Netze selbst zu programmieren", correct: false },
      { text: "Das Auswendiglernen des gesamten Verordnungstextes", correct: false }
    ],
    explanation: "KI-Kompetenz umfasst ein Grundverständnis der Technologie mit ihren Chancen, Grenzen und Risiken sowie die sichere Anwendung und das kritische Prüfen von Ergebnissen im jeweiligen Einsatzkontext.",
    category: "ART4_KOMPETENZ",
    difficulty: "MITTEL",
    lessonSlug: "was-verlangt-art4",
    tags: ["ki-kompetenz", "inhalte", "art4"],
    practiceCase: false
  },
  {
    text: "Schreibt Art. 4 EU AI Act eine bestimmte Form der Schulung oder ein bestimmtes Zertifikat verbindlich vor?",
    options: [
      { text: "Nein, die Form ist nicht vorgegeben – entscheidend ist ausreichende Kompetenz passend zu Vorwissen, Rolle und Einsatzkontext", correct: true },
      { text: "Ja, es ist ausschließlich ein staatlicher Präsenzkurs von 40 Stunden zulässig", correct: false },
      { text: "Ja, nur Schulungen einer EU-Agentur werden anerkannt", correct: false },
      { text: "Ja, jede Person muss jährlich eine behördliche Prüfung ablegen", correct: false }
    ],
    explanation: "Art. 4 gibt kein bestimmtes Format vor. Unternehmen können selbst entscheiden, wie sie Kompetenz aufbauen – maßgeblich sind Vorwissen, Aufgaben und der konkrete Einsatzkontext der KI.",
    category: "ART4_KOMPETENZ",
    difficulty: "SCHWER",
    lessonSlug: "was-verlangt-art4",
    tags: ["schulungsform", "art4", "flexibilitaet"],
    practiceCase: false
  },
  {
    text: "Die Geschäftsführerin eines KMU fragt: \"Reicht eine einmalige KI-Schulung für immer aus?\" Was ist die beste Antwort?",
    options: [
      { text: "Nein, KI-Kompetenz sollte zum Einsatzkontext passen und bei neuen Tools oder Anwendungsfällen aufgefrischt werden", correct: true },
      { text: "Ja, eine Schulung gilt lebenslang für alle künftigen KI-Systeme", correct: false },
      { text: "Nein, es sind gesetzlich exakt zwölf Schulungen pro Jahr vorgeschrieben", correct: false },
      { text: "Ja, sofern die Schulung mindestens acht Stunden gedauert hat", correct: false }
    ],
    explanation: "KI-Kompetenz ist kein einmaliger Zustand: Neue Tools, neue Einsatzzwecke und geänderte Regeln erfordern Auffrischung. Feste gesetzliche Stundenzahlen oder Intervalle gibt es dagegen nicht.",
    category: "ART4_KOMPETENZ",
    difficulty: "MITTEL",
    lessonSlug: "was-verlangt-art4",
    tags: ["auffrischung", "einsatzkontext", "schulung"],
    practiceCase: true
  },
  {
    text: "Was sollte auf einem Schulungszertifikat zur KI-Kompetenz sinnvollerweise stehen?",
    options: [
      { text: "Name der Person, Kursbezeichnung, Datum, Schulungsinhalte, Testergebnis und eine Zertifikatsnummer", correct: true },
      { text: "Nur der Firmenname, mehr Angaben sind unüblich", correct: false },
      { text: "Ausschließlich das Geburtsdatum der teilnehmenden Person", correct: false },
      { text: "Die privaten Social-Media-Profile der Teilnehmenden", correct: false }
    ],
    explanation: "Ein aussagekräftiges Zertifikat dokumentiert, wer wann welche Inhalte absolviert und mit welchem Ergebnis abgeschlossen hat. Eine Zertifikatsnummer erleichtert die spätere Zuordnung und Überprüfung.",
    category: "ART4_KOMPETENZ",
    difficulty: "LEICHT",
    lessonSlug: "schulungsnachweis",
    tags: ["zertifikat", "dokumentation", "nachweis"],
    practiceCase: false
  },
  {
    text: "Warum ist die Dokumentation von KI-Schulungen für Unternehmen empfehlenswert?",
    options: [
      { text: "Weil sich damit nachvollziehbar belegen lässt, wer wann zu welchen Inhalten geschult wurde und mit welchem Ergebnis", correct: true },
      { text: "Weil undokumentierte Schulungen gesetzlich als Straftat gelten", correct: false },
      { text: "Weil die Dokumentation automatisch jede Haftung ausschließt", correct: false },
      { text: "Weil Schulungen ohne Papierform technisch nicht wirken", correct: false }
    ],
    explanation: "Eine saubere Dokumentation (wer, wann, was, Testergebnis) macht die Umsetzung von Art. 4 nachvollziehbar und ist bei Nachfragen von Kunden oder Aufsichtsbehörden hilfreich. Eine Haftungsbefreiung bewirkt sie nicht automatisch.",
    category: "ART4_KOMPETENZ",
    difficulty: "MITTEL",
    lessonSlug: "schulungsnachweis",
    tags: ["dokumentation", "nachweis", "art4"],
    practiceCase: false
  },
  {
    text: "Ein Großkunde verlangt im Rahmen einer Lieferantenprüfung einen Beleg, dass die Mitarbeitenden im Umgang mit KI geschult sind. Was kann das Unternehmen sinnvollerweise vorlegen?",
    options: [
      { text: "Die Schulungsdokumentation mit Teilnehmerliste, Datum, Inhalten und Testergebnissen bzw. die ausgestellten Zertifikate", correct: true },
      { text: "Eine formlose mündliche Zusicherung ohne Unterlagen", correct: false },
      { text: "Die privaten Chatverläufe der Mitarbeitenden mit KI-Tools", correct: false },
      { text: "Einen Screenshot der Startseite eines KI-Anbieters", correct: false }
    ],
    explanation: "Genau für solche Nachfragen lohnt sich die strukturierte Dokumentation: Wer wurde wann zu welchen Inhalten geschult und mit welchem Ergebnis. Zertifikate und Teilnahmenachweise sind dafür das geeignete Mittel.",
    category: "ART4_KOMPETENZ",
    difficulty: "SCHWER",
    lessonSlug: "schulungsnachweis",
    tags: ["lieferantenpruefung", "nachweis", "dokumentation"],
    practiceCase: true
  },
  {
    text: "Was ist ein privates Schulungszertifikat zur KI-Kompetenz NICHT?",
    options: [
      { text: "Eine staatliche Zulassung oder behördliche Zertifizierung", correct: true },
      { text: "Ein Nachweis über die absolvierten Schulungsinhalte", correct: false },
      { text: "Ein Baustein zur Dokumentation der KI-Kompetenz im Unternehmen", correct: false },
      { text: "Ein Dokument mit Name, Datum und Testergebnis", correct: false }
    ],
    explanation: "Ein privates Schulungszertifikat dokumentiert die Teilnahme und das Ergebnis einer Schulung. Es ist aber keine staatliche Zulassung und keine behördliche Zertifizierung.",
    category: "ART4_KOMPETENZ",
    difficulty: "LEICHT",
    lessonSlug: "grenzen-des-zertifikats",
    tags: ["zertifikat", "grenzen", "einordnung"],
    practiceCase: false
  },
  {
    text: "Ein Kollege sagt nach bestandenem Test: \"Mit dem Zertifikat sind wir jetzt in allen KI-Fragen vollständig abgesichert.\" Wie ist diese Aussage einzuordnen?",
    options: [
      { text: "Sie ist falsch: Das Zertifikat belegt die Schulung, garantiert aber keine vollständige Compliance mit dem EU AI Act", correct: true },
      { text: "Sie ist richtig, weil Zertifikate alle rechtlichen Pflichten ersetzen", correct: false },
      { text: "Sie ist richtig, sofern das Zertifikat laminiert wurde", correct: false },
      { text: "Sie ist falsch, weil Schulungen grundsätzlich wertlos sind", correct: false }
    ],
    explanation: "Das Zertifikat dokumentiert einen wichtigen Baustein der Art.-4-Umsetzung, ersetzt aber keine weiteren Pflichten, etwa bei Hochrisiko-Systemen oder Transparenzanforderungen. Vollständige Compliance erfordert mehr als eine Schulung.",
    category: "ART4_KOMPETENZ",
    difficulty: "MITTEL",
    lessonSlug: "grenzen-des-zertifikats",
    tags: ["compliance", "grenzen", "zertifikat"],
    practiceCase: true
  },
  {
    text: "Welche zwei Aussagen über ein privates Schulungszertifikat zur KI-Kompetenz sind korrekt?",
    options: [
      { text: "Es ist keine behördliche Zertifizierung und keine staatliche Zulassung", correct: true },
      { text: "Es garantiert keine vollständige Compliance mit allen Pflichten des EU AI Act", correct: true },
      { text: "Es verleiht dem Unternehmen automatisch eine Betriebserlaubnis für Hochrisiko-KI", correct: false },
      { text: "Es befreit dauerhaft von allen künftigen Schulungspflichten", correct: false }
    ],
    explanation: "Ein privates Zertifikat ist ein Schulungsnachweis – nicht mehr und nicht weniger. Es ersetzt weder behördliche Verfahren noch die weiteren Pflichten aus dem EU AI Act.",
    category: "ART4_KOMPETENZ",
    difficulty: "SCHWER",
    lessonSlug: "grenzen-des-zertifikats",
    tags: ["zertifikat", "grenzen", "compliance"],
    practiceCase: false
  },
  {
    text: "Das Marketing möchte mit dem KI-Schulungszertifikat des Teams werben. Welche Formulierung ist korrekt und unproblematisch?",
    options: [
      { text: "\"Unser Team hat eine Schulung zur KI-Kompetenz im Sinne von Art. 4 EU AI Act absolviert und mit Test abgeschlossen.\"", correct: true },
      { text: "\"Unsere Firma wurde von einer EU-Behörde als KI-Unternehmen zugelassen.\"", correct: false },
      { text: "\"Mit diesem Zertifikat erfüllen wir automatisch sämtliche Pflichten des EU AI Act.\"", correct: false },
      { text: "\"Unsere KI-Ergebnisse sind dank Zertifikat immer fehlerfrei.\"", correct: false }
    ],
    explanation: "Werbung mit dem Zertifikat muss bei der Wahrheit bleiben: Es belegt eine absolvierte Schulung mit Test. Aussagen über behördliche Zulassungen, vollständige Compliance oder Fehlerfreiheit wären irreführend.",
    category: "ART4_KOMPETENZ",
    difficulty: "SCHWER",
    lessonSlug: "grenzen-des-zertifikats",
    tags: ["werbung", "zertifikat", "irrefuehrung"],
    practiceCase: true
  },

  // ========== UNTERNEHMENSPRAXIS (14 Fragen) ==========
  {
    text: "Welcher KI-Einsatz ist im Büroalltag ein sinnvolles und unproblematisches Beispiel?",
    options: [
      { text: "KI erstellt einen ersten Textentwurf, den ein Mensch anschließend prüft und überarbeitet", correct: true },
      { text: "KI trifft alleinverantwortlich Entscheidungen über Kündigungen", correct: false },
      { text: "KI beantwortet Kundenanfragen mit vertraulichen Daten in einem privaten Gratis-Account", correct: false },
      { text: "KI-Ausgaben werden grundsätzlich ungeprüft an Kunden gesendet", correct: false }
    ],
    explanation: "KI eignet sich hervorragend für Entwürfe, Zusammenfassungen und Ideensammlungen – solange ein Mensch das Ergebnis prüft und die Verantwortung behält.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "LEICHT",
    lessonSlug: "ki-dos",
    tags: ["dos", "bueroalltag", "entwuerfe"],
    practiceCase: false
  },
  {
    text: "Ein Mitarbeiter lässt die KI das Protokoll eines internen Meetings zusammenfassen und will es direkt an alle Teilnehmenden verschicken. Was ist der richtige Zwischenschritt?",
    options: [
      { text: "Die Zusammenfassung vor dem Versand auf Richtigkeit und Vollständigkeit prüfen", correct: true },
      { text: "Kein Zwischenschritt nötig – KI-Zusammenfassungen sind immer korrekt", correct: false },
      { text: "Das Protokoll zusätzlich in einem öffentlichen Forum posten", correct: false },
      { text: "Die Zusammenfassung von der KI zehnmal neu generieren lassen", correct: false }
    ],
    explanation: "KI kann Inhalte falsch gewichten, auslassen oder erfinden. Vor dem Versand muss ein Mensch prüfen, ob die Zusammenfassung Beschlüsse und Aussagen korrekt wiedergibt.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "MITTEL",
    lessonSlug: "ki-dos",
    tags: ["protokoll", "pruefen", "meeting"],
    practiceCase: true
  },
  {
    text: "Warum sollten KI-generierte Inhalte grundsätzlich vor der Verwendung geprüft werden?",
    options: [
      { text: "Weil KI-Systeme überzeugend klingende, aber falsche Informationen erzeugen können (sogenannte Halluzinationen)", correct: true },
      { text: "Weil KI-Systeme nur an Wochentagen zuverlässig arbeiten", correct: false },
      { text: "Weil KI-Texte sonst automatisch gelöscht werden", correct: false },
      { text: "Weil die Prüfung gesetzlich mit exakt 30 Minuten pro Text vorgeschrieben ist", correct: false }
    ],
    explanation: "KI-Modelle können Fakten, Quellen oder Zahlen frei erfinden und dabei sehr überzeugend wirken. Menschliche Prüfung ist deshalb unverzichtbar, bevor Inhalte verwendet werden.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "LEICHT",
    lessonSlug: "ki-dos",
    tags: ["halluzinationen", "pruefen", "qualitaet"],
    practiceCase: false
  },
  {
    text: "Welche Daten gehören NICHT in einen öffentlichen KI-Chatdienst ohne entsprechende Vereinbarungen?",
    options: [
      { text: "Personenbezogene Kundendaten und Geschäftsgeheimnisse", correct: true },
      { text: "Allgemeine Fragen zu Rechtschreibregeln", correct: false },
      { text: "Öffentlich verfügbare Informationen von der eigenen Website", correct: false },
      { text: "Die Bitte um Ideen für einen Blogartikel", correct: false }
    ],
    explanation: "Personenbezogene Daten und vertrauliche Geschäftsinformationen dürfen nicht ohne Weiteres in öffentliche KI-Dienste eingegeben werden, da die Verarbeitung dort oft nicht kontrollierbar ist.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "LEICHT",
    lessonSlug: "ki-donts",
    tags: ["datenschutz", "geschaeftsgeheimnisse", "donts"],
    practiceCase: false
  },
  {
    text: "Ein Mitarbeiter fragt die KI, ob eine bestimmte Kündigung rechtens wäre, und will auf Basis der Antwort direkt handeln. Wie ist die Rolle der KI hier richtig einzuordnen?",
    options: [
      { text: "Die KI darf rechtliche Grundlagen allgemein erklären, ersetzt aber keine geprüfte Rechtsauskunft durch Fachleute", correct: true },
      { text: "Die KI-Antwort ist einer anwaltlichen Beratung rechtlich gleichgestellt", correct: false },
      { text: "KI-Antworten zu Rechtsfragen sind immer aktuell und fehlerfrei", correct: false },
      { text: "Rechtsfragen dürfen an KI gar nicht erst gestellt werden, das ist verboten", correct: false }
    ],
    explanation: "KI kann juristische Konzepte verständlich erklären und beim Vorverständnis helfen. Für verbindliche Entscheidungen – etwa eine Kündigung – ist aber eine geprüfte Auskunft durch qualifizierte Fachleute nötig.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "MITTEL",
    lessonSlug: "ki-donts",
    tags: ["rechtsfragen", "grenzen", "kuendigungsrecht"],
    practiceCase: true
  },
  {
    text: "Ein Vertriebsmitarbeiter kopiert die komplette Kundenliste mit Namen, E-Mail-Adressen und Umsätzen in einen öffentlichen KI-Chat, um Serienmails zu erstellen. Was ist daran problematisch?",
    options: [
      { text: "Er gibt personenbezogene Daten und vertrauliche Geschäftsinformationen ohne Kontrolle an einen externen Dienst weiter", correct: true },
      { text: "Nichts, weil die KI die Daten sicher vergisst", correct: false },
      { text: "Nur die Formatierung der Tabelle ist ein Problem", correct: false },
      { text: "Es ist nur problematisch, wenn die Liste mehr als 1000 Einträge hat", correct: false }
    ],
    explanation: "Kundendaten sind personenbezogene Daten und oft zugleich Geschäftsgeheimnisse. Ihre Eingabe in öffentliche KI-Dienste kann gegen Datenschutzrecht und interne Vorgaben verstoßen – unabhängig von der Anzahl der Einträge.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "MITTEL",
    lessonSlug: "ki-donts",
    tags: ["kundendaten", "datenschutz", "vertrieb"],
    practiceCase: true
  },
  {
    text: "Eine Mitarbeiterin lässt die KI einen Vertragsentwurf für einen wichtigen Kunden erstellen und versendet ihn ungeprüft. Welche Risiken entstehen dadurch vor allem?",
    options: [
      { text: "Fehlerhafte oder unpassende Klauseln können unbemerkt bleiben und das Unternehmen rechtlich und finanziell belasten", correct: true },
      { text: "Keine, weil KI-Verträge automatisch von Gerichten bevorzugt werden", correct: false },
      { text: "Nur das Risiko, dass der Kunde das Layout nicht mag", correct: false },
      { text: "Das Dokument verliert lediglich seine Schriftart", correct: false }
    ],
    explanation: "Verträge haben erhebliche rechtliche und finanzielle Folgen. KI-Entwürfe können veraltete, falsche oder für den Fall ungeeignete Klauseln enthalten und müssen vor dem Versand fachkundig geprüft werden.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "SCHWER",
    lessonSlug: "ki-donts",
    tags: ["vertraege", "pruefen", "haftung"],
    practiceCase: true
  },
  {
    text: "Wozu dient eine interne KI-Richtlinie im Unternehmen?",
    options: [
      { text: "Sie schafft klare Regeln, welche KI-Tools mit welchen Daten für welche Zwecke genutzt werden dürfen", correct: true },
      { text: "Sie verbietet grundsätzlich jede Nutzung von Computern", correct: false },
      { text: "Sie ersetzt sämtliche Gesetze, die für das Unternehmen gelten", correct: false },
      { text: "Sie dient nur der Dekoration des Intranets", correct: false }
    ],
    explanation: "Eine interne KI-Richtlinie gibt Mitarbeitenden Orientierung: erlaubte Tools, zulässige Daten, Prüfpflichten und Zuständigkeiten. Sie ergänzt gesetzliche Vorgaben, ersetzt sie aber nicht.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "LEICHT",
    lessonSlug: "interne-richtlinien",
    tags: ["richtlinie", "regeln", "orientierung"],
    practiceCase: false
  },
  {
    text: "Welche zwei Themen sollte eine gute interne KI-Richtlinie regeln?",
    options: [
      { text: "Welche KI-Tools freigegeben sind und wie neue Tools beantragt werden", correct: true },
      { text: "Welche Datenarten in KI-Tools eingegeben werden dürfen und welche nicht", correct: true },
      { text: "Die private Urlaubsplanung der Geschäftsführung", correct: false },
      { text: "Die Farbgestaltung der Büroräume", correct: false }
    ],
    explanation: "Kernthemen einer KI-Richtlinie sind die freigegebenen Tools samt Freigabeprozess und klare Vorgaben zum Umgang mit Daten. Ergänzend gehören Prüfpflichten und Verantwortlichkeiten hinein.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "MITTEL",
    lessonSlug: "interne-richtlinien",
    tags: ["richtlinie", "tools", "daten"],
    practiceCase: false
  },
  {
    text: "Ein Mitarbeiter entdeckt ein neues, kostenloses KI-Tool und möchte es sofort mit Projektdaten des Unternehmens ausprobieren. Was ist das richtige Vorgehen laut typischer KI-Richtlinie?",
    options: [
      { text: "Das Tool zuerst über den internen Freigabeprozess prüfen und genehmigen lassen, bevor Unternehmensdaten eingegeben werden", correct: true },
      { text: "Sofort loslegen – kostenlose Tools sind automatisch unbedenklich", correct: false },
      { text: "Das Tool heimlich nutzen und niemandem davon erzählen", correct: false },
      { text: "Die Projektdaten zur Sicherheit vorher in mehrere andere Tools hochladen", correct: false }
    ],
    explanation: "Nicht freigegebene Tools (Schatten-IT) sind ein erhebliches Risiko für Datenschutz und Geschäftsgeheimnisse. Neue Tools sollten immer erst über den internen Prozess geprüft und freigegeben werden.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "SCHWER",
    lessonSlug: "interne-richtlinien",
    tags: ["schatten-it", "freigabeprozess", "tools"],
    practiceCase: true
  },
  {
    text: "Ein Team nutzt seit Monaten ein privates Gratis-Konto eines KI-Chatdienstes für Kundendokumente, weil der Firmenzugang \"zu umständlich\" ist. Wie ist das zu bewerten?",
    options: [
      { text: "Kritisch: Vertrauliche Daten laufen über einen nicht freigegebenen Privat-Account – das verstößt gegen Datenschutz- und Sicherheitsvorgaben", correct: true },
      { text: "Unproblematisch, weil das Team dadurch Zeit spart", correct: false },
      { text: "Unproblematisch, solange das Passwort stark ist", correct: false },
      { text: "Nur ein Problem für die IT-Abteilung, nicht für das Team", correct: false }
    ],
    explanation: "Private Konten unterliegen anderen Nutzungsbedingungen und keiner unternehmensseitigen Kontrolle. Kundendokumente dürfen nur über freigegebene Firmenzugänge verarbeitet werden – Bequemlichkeit ist kein Rechtfertigungsgrund.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "SCHWER",
    lessonSlug: "interne-richtlinien",
    tags: ["privat-account", "schatten-it", "kundendaten"],
    practiceCase: true
  },
  {
    text: "Welchen Zweck erfüllt der Abschlusstest dieser Schulung?",
    options: [
      { text: "Er überprüft das erworbene Wissen und dient als dokumentierbarer Baustein des Kompetenznachweises", correct: true },
      { text: "Er entscheidet über eine behördliche Betriebserlaubnis des Unternehmens", correct: false },
      { text: "Er dient ausschließlich der Unterhaltung", correct: false },
      { text: "Er ersetzt alle künftigen Sicherheitsmaßnahmen im Unternehmen", correct: false }
    ],
    explanation: "Der Abschlusstest macht den Lernerfolg messbar und dokumentierbar. Zusammen mit dem Zertifikat unterstützt er den Nachweis der KI-Kompetenz im Sinne von Art. 4 EU AI Act.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "LEICHT",
    lessonSlug: "abschlusstest-info",
    tags: ["abschlusstest", "zweck", "nachweis"],
    practiceCase: false
  },
  {
    text: "Was gilt, wenn eine Teilnehmerin den Abschlusstest im ersten Anlauf nicht besteht?",
    options: [
      { text: "Der Test dient der Lernkontrolle und kann nach erneuter Vorbereitung wiederholt werden", correct: true },
      { text: "Sie darf nie wieder mit KI-Tools arbeiten", correct: false },
      { text: "Das Unternehmen muss den Vorfall einer Behörde melden", correct: false },
      { text: "Alle bisherigen Lektionen werden ungültig", correct: false }
    ],
    explanation: "Ziel des Tests ist der Kompetenzaufbau, nicht das Aussieben. Ein nicht bestandener Versuch zeigt Lernbedarf – der Test kann nach Wiederholung der Inhalte erneut absolviert werden.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "MITTEL",
    lessonSlug: "abschlusstest-info",
    tags: ["abschlusstest", "wiederholung", "lernkontrolle"],
    practiceCase: false
  },
  {
    text: "Warum sollte das Ergebnis des Abschlusstests im Unternehmen dokumentiert werden?",
    options: [
      { text: "Weil das Testergebnis Teil eines nachvollziehbaren Schulungsnachweises ist (wer, wann, was, Ergebnis)", correct: true },
      { text: "Weil undokumentierte Ergebnisse automatisch zu Bußgeldern führen", correct: false },
      { text: "Weil das Ergebnis öffentlich im Handelsregister eingetragen werden muss", correct: false },
      { text: "Weil nur so das KI-Tool weiter funktioniert", correct: false }
    ],
    explanation: "Zu einer belastbaren Schulungsdokumentation gehört neben Person, Datum und Inhalten auch das Testergebnis. So kann das Unternehmen die Umsetzung von Art. 4 später nachvollziehbar belegen.",
    category: "UNTERNEHMENSPRAXIS",
    difficulty: "SCHWER",
    lessonSlug: "abschlusstest-info",
    tags: ["dokumentation", "testergebnis", "nachweis"],
    practiceCase: false
  }
];
