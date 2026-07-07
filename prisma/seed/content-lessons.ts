export interface SeedMiniCheck {
  question: string;
  answer: string;
}

export interface SeedLesson {
  slug: string;
  title: string;
  goal: string;
  content: string;
  example: string;
  risk: string;
  memo: string;
  durationMinutes: number;
  required: boolean;
  miniChecks: SeedMiniCheck[];
}

export interface SeedModule {
  slug: string;
  order: number;
  title: string;
  description: string;
  lessons: SeedLesson[];
}

export const seedModules: SeedModule[] = [
  {
    slug: "einfuehrung-ki",
    order: 1,
    title: "Einführung in künstliche Intelligenz",
    description:
      "Was künstliche Intelligenz ist, was sie im Büroalltag leisten kann und wie sie sich von klassischer Software unterscheidet.",
    lessons: [
      {
        slug: "was-ist-ki",
        title: "Was ist KI?",
        goal: "Du verstehst, was künstliche Intelligenz ist und erkennst typische KI-Anwendungen in deinem Arbeitsalltag.",
        content:
          "Künstliche Intelligenz (KI) bezeichnet Computersysteme, die Aufgaben erledigen, für die normalerweise menschliche Intelligenz nötig ist. Dazu gehören zum Beispiel: Texte verstehen und schreiben, Bilder erkennen und erzeugen, Muster in großen Datenmengen finden oder Vorschläge für Entscheidungen machen.\n\nWichtig ist: KI \"denkt\" nicht wie ein Mensch. Sie hat kein Bewusstsein und kein echtes Verständnis. Moderne KI-Systeme wurden mit riesigen Datenmengen trainiert. Aus diesen Daten haben sie Muster gelernt. Wenn du eine Frage stellst, berechnet die KI, welche Antwort am wahrscheinlichsten passt. Das funktioniert oft erstaunlich gut, ist aber keine Garantie für Richtigkeit.\n\nIm Büroalltag begegnet dir KI schon heute an vielen Stellen: Ein Chat-Assistent wie ChatGPT schreibt einen E-Mail-Entwurf. Microsoft Copilot fasst ein langes Meeting zusammen. Eine Buchhaltungssoftware mit KI findet Auffälligkeiten in einer Rechnung. Ein Bildgenerator erstellt ein Motiv für einen Marketing-Beitrag.\n\nFür dich als Anwenderin oder Anwender heißt das: KI ist ein sehr nützliches Werkzeug, das dir Arbeit abnehmen kann. Aber wie bei jedem Werkzeug musst du wissen, wofür es geeignet ist, wo seine Grenzen liegen und wann du das Ergebnis kontrollieren musst. Genau darum geht es in dieser Schulung.",
        example:
          "Anna aus dem Vertrieb bekommt eine lange Kundenanfrage mit vielen Detailfragen. Sie bittet ein KI-Tool, die Anfrage in Stichpunkten zusammenzufassen und einen Antwortentwurf zu schreiben. Die KI liefert in Sekunden einen brauchbaren Entwurf. Anna prüft die Fakten, passt Preise und Fristen an und schickt die E-Mail dann selbst ab. Zeitersparnis: rund 20 Minuten – bei voller Kontrolle über den Inhalt.",
        risk: "KI versteht Inhalte nicht wie ein Mensch. Sie berechnet wahrscheinliche Antworten aus gelernten Mustern. Deshalb kann sie überzeugend klingen und trotzdem falsch liegen. Verlasse dich nie blind auf ein KI-Ergebnis – besonders nicht bei Zahlen, Namen und Fakten.",
        memo: "KI ist ein Werkzeug, kein Wahrheitsautomat.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Denkt eine KI wie ein Mensch?",
            answer:
              "Nein. KI hat kein Bewusstsein und kein echtes Verständnis. Sie berechnet auf Basis von Trainingsdaten, welche Antwort am wahrscheinlichsten passt.",
          },
          {
            question: "Nenne zwei Beispiele für KI im Büroalltag.",
            answer:
              "Zum Beispiel: ein E-Mail-Entwurf von ChatGPT, eine Meeting-Zusammenfassung von Copilot, eine KI-gestützte Rechnungsprüfung oder ein KI-generiertes Marketingbild.",
          },
        ],
      },
      {
        slug: "klassische-software-vs-ki",
        title: "Klassische Software vs. KI",
        goal: "Du kennst den Unterschied zwischen regelbasierter Software und KI und weißt, warum KI-Ergebnisse Kontrolle brauchen.",
        content:
          "Klassische Software folgt festen Regeln, die Menschen programmiert haben. Ein Taschenrechner rechnet 7 mal 8 immer als 56 – heute, morgen und in zehn Jahren. Wenn klassische Software einen Fehler macht, liegt es an einem Programmierfehler, nicht an \"Unsicherheit\".\n\nKI funktioniert anders. Sie wurde nicht Regel für Regel programmiert, sondern mit großen Datenmengen trainiert. Aus diesen Trainingsdaten hat sie Muster und Wahrscheinlichkeiten gelernt. Wenn du eine Frage stellst, erzeugt sie die Antwort, die statistisch am besten passt. Das hat zwei Folgen:\n\nErstens: KI kann Aufgaben lösen, für die es keine festen Regeln gibt – etwa einen höflichen Text formulieren oder eine Zusammenfassung schreiben. Das kann klassische Software nicht.\n\nZweitens: KI-Antworten sind nie garantiert richtig. Dieselbe Frage kann unterschiedliche Antworten ergeben. Eine KI-Antwort kann sehr überzeugend und professionell klingen und trotzdem sachlich falsch sein. Genau das macht sie tückisch: Der Ton wirkt sicher, auch wenn der Inhalt nicht stimmt.\n\nDaraus folgt eine einfache Faustregel für den Alltag: Je enger und klarer die Aufgabe (z. B. Text kürzen), desto verlässlicher ist die KI. Je freier und offener die Aufgabe (z. B. Fakten recherchieren, rechtliche Fragen), desto wichtiger ist deine menschliche Kontrolle.",
        example:
          "Herr Berger fragt ein KI-Tool nach der aktuellen Mehrwertsteuerregelung für eine bestimmte Dienstleistung. Die KI antwortet flüssig, mit Prozentsätzen und Begründung – klingt völlig plausibel. Zum Vergleich rechnet sein Taschenrechner eine Summe: Das Ergebnis ist garantiert korrekt. Die KI-Antwort dagegen stellt sich nach Rückfrage beim Steuerberater als veraltet heraus. Gleiche Selbstsicherheit, ganz unterschiedliche Verlässlichkeit.",
        risk: "Der größte Denkfehler im Umgang mit KI: Sie wie einen Taschenrechner zu behandeln. Ein überzeugender Tonfall ist kein Beweis für Richtigkeit. Gerade bei Fakten, Zahlen und rechtlichen Aussagen musst du KI-Antworten immer gegenprüfen.",
        memo: "Je freier die Aufgabe, desto wichtiger ist menschliche Kontrolle.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Was ist der Kernunterschied zwischen klassischer Software und KI?",
            answer:
              "Klassische Software folgt festen, programmierten Regeln und liefert immer dasselbe Ergebnis. KI arbeitet mit Wahrscheinlichkeiten und Mustern aus Trainingsdaten – ihre Antworten können variieren und falsch sein.",
          },
          {
            question: "Warum sind überzeugend klingende KI-Antworten trotzdem riskant?",
            answer:
              "Weil der sichere Tonfall nichts über die Richtigkeit aussagt. Die KI formuliert plausibel, auch wenn der Inhalt sachlich falsch oder veraltet ist.",
          },
        ],
      },
    ],
  },
  {
    slug: "generative-ki",
    order: 2,
    title: "Generative KI und Large Language Models",
    description:
      "Wie generative KI neue Inhalte erzeugt und wie Sprachmodelle (LLMs) im Hintergrund funktionieren.",
    lessons: [
      {
        slug: "was-ist-generative-ki",
        title: "Was ist generative KI?",
        goal: "Du weißt, was generative KI ist, welche Inhalte sie erzeugen kann und warum diese Inhalte nicht automatisch richtig sind.",
        content:
          "Generative KI ist eine besondere Art von künstlicher Intelligenz: Sie erzeugt neue Inhalte, statt nur vorhandene Daten auszuwerten. Zu diesen Inhalten gehören Texte, Bilder, Tabellen, Programmcode und sogar ganze Präsentationen.\n\nDas Besondere daran: Die Inhalte sind nicht kopiert, sondern werden neu \"zusammengesetzt\" – auf Basis der Muster, die das System beim Training gelernt hat. Deshalb kann generative KI auch Aufgaben lösen, die vorher niemand exakt so gestellt hat.\n\nTypische Anwendungen im Büroalltag sind: eine Stellenanzeige entwerfen, eine freundliche Antwort auf eine Kundenbeschwerde formulieren, eine komplizierte Excel-Formel in einfachen Worten erklären, einen Social-Media-Post texten oder einen langen Vertragsentwurf in fünf Kernpunkten zusammenfassen.\n\nDie Kehrseite: Weil generative KI Inhalte erzeugt statt nachzuschlagen, kann sie auch Dinge erzeugen, die es gar nicht gibt. Sie kann Fakten, Namen, Zahlen und Quellen erfinden – und das in perfektem, seriösem Deutsch. Man nennt das \"Halluzination\" (dazu später mehr).\n\nDie richtige Haltung ist deshalb: Nutze generative KI für Entwürfe, Ideen und Strukturvorschläge. Behandle jedes Ergebnis wie den Entwurf einer neuen Praktikantin oder eines Praktikanten – hilfreich, aber vor Verwendung immer von dir zu prüfen.",
        example:
          "Die HR-Abteilung eines Handwerksbetriebs braucht eine Stellenanzeige für eine Bürokraft. Statt bei null anzufangen, gibt Frau Leitner der KI die Eckdaten: Aufgaben, Arbeitszeit, Standort, gewünschter Ton. Die KI liefert einen strukturierten Entwurf. Frau Leitner streicht eine erfundene Zusatzleistung, ergänzt die korrekten Gehaltsangaben und die Pflichtangaben – fertig in 15 statt 60 Minuten.",
        risk: "Generative KI kann Inhalte komplett erfinden: Zahlen, Zitate, Produkteigenschaften, sogar Quellenangaben. Wer KI-Texte ungeprüft an Kundinnen und Kunden schickt oder veröffentlicht, riskiert Falschinformationen im Namen der Firma – und damit echten Reputationsschaden.",
        memo: "Generative KI erzeugt plausiblen Inhalt, nicht automatisch richtigen Inhalt.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Was unterscheidet generative KI von anderen KI-Systemen?",
            answer:
              "Generative KI erzeugt neue Inhalte wie Texte, Bilder, Tabellen oder Präsentationen, statt nur vorhandene Daten auszuwerten oder zu sortieren.",
          },
          {
            question: "Wie solltest du ein Ergebnis von generativer KI behandeln?",
            answer:
              "Wie einen Entwurf: hilfreich als Ausgangspunkt, aber immer prüfen und korrigieren, bevor es verwendet oder weitergegeben wird.",
          },
        ],
      },
      {
        slug: "was-sind-llms",
        title: "Was sind Large Language Models (LLMs)?",
        goal: "Du verstehst in einfachen Worten, wie Sprachmodelle funktionieren, und weißt, dass sie kein Wissen über deine Firma haben.",
        content:
          "Hinter Tools wie ChatGPT, Copilot oder Gemini stecken sogenannte Large Language Models – auf Deutsch: große Sprachmodelle, kurz LLMs.\n\nEin LLM wurde auf riesigen Textmengen trainiert: Webseiten, Bücher, Artikel und mehr. Beim Training hat es gelernt, wie Sprache funktioniert – welche Wörter typischerweise aufeinander folgen, wie Sätze aufgebaut sind, wie man Fragen beantwortet und Texte strukturiert.\n\nDas Grundprinzip ist überraschend einfach: Ein LLM sagt immer wieder das wahrscheinlichste nächste Wort vorher. Aus \"Sehr geehrte Frau...\" wird ein Name, dann ein Komma, dann ein passender Einstiegssatz – Wort für Wort entsteht so ein kompletter Text. Weil das Modell mit so vielen Texten trainiert wurde, wirken die Ergebnisse flüssig und oft sehr kompetent.\n\nZwei Dinge musst du daraus mitnehmen: Erstens hat das Modell kein Verständnis und keine Absicht – es setzt wahrscheinliche Wortfolgen zusammen. Zweitens kennt es deine Firma nicht. Es weiß nichts über eure Kundinnen und Kunden, eure Preise, eure internen Abläufe oder aktuelle Projekte – außer du gibst ihm diese Informationen im Gespräch mit. Und genau da beginnt das Thema Datenschutz: Was du eingibst, verlässt unter Umständen dein Unternehmen. Dazu kommt später ein eigenes Modul.",
        example:
          "Herr Novak soll einem langjährigen Bewerber höflich absagen. Er schreibt der KI: \"Formuliere eine wertschätzende Absage an einen Bewerber, der in der Endrunde war. Grund: Wir haben uns für eine Person mit mehr Buchhaltungserfahrung entschieden. Ton: herzlich, ehrlich, kurz.\" Die KI liefert einen einfühlsamen Entwurf mit passenden Formulierungen. Herr Novak ergänzt nur noch den Namen und einen persönlichen Satz – die schwierige Formulierungsarbeit hat ihm das Sprachmodell abgenommen.",
        risk: "Ein LLM hat kein echtes Wissen über deine Firma, deine Kunden oder aktuelle interne Vorgänge. Wenn es dazu Aussagen macht, sind diese geraten. Und umgekehrt: Interne Informationen, die du eingibst, können das Unternehmen verlassen – gib daher nie ungeprüft Vertrauliches ein.",
        memo: "Ein Sprachmodell sagt das wahrscheinlichste nächste Wort vorher – es weiß nichts über deine Firma, außer du sagst es ihm.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Nach welchem Grundprinzip erzeugt ein LLM seine Texte?",
            answer:
              "Es sagt Schritt für Schritt das wahrscheinlichste nächste Wort vorher, basierend auf Mustern aus riesigen Trainings-Textmengen.",
          },
          {
            question: "Kennt ein LLM die internen Daten deiner Firma?",
            answer:
              "Nein. Es kennt nur seine Trainingsdaten und das, was du ihm im Gespräch mitgibst. Aussagen über deine Firma ohne diese Informationen sind geraten.",
          },
        ],
      },
    ],
  },
  {
    slug: "chancen-grenzen",
    order: 3,
    title: "Chancen und Grenzen von KI",
    description:
      "Wo KI im Arbeitsalltag echten Nutzen bringt – und in welchen Situationen du ihr nicht blind vertrauen darfst.",
    lessons: [
      {
        slug: "wo-ki-hilft",
        title: "Wo KI im Alltag wirklich hilft",
        goal: "Du kennst die typischen Aufgaben, bei denen KI im Büro zuverlässig Zeit spart und die Qualität verbessert.",
        content:
          "KI ist besonders stark bei Aufgaben, die mit Sprache, Struktur und Ideen zu tun haben – also genau dort, wo im Büro viel Zeit draufgeht.\n\nTexte schreiben und überarbeiten: E-Mails, Angebotstexte, Protokolle, Newsletter. Die KI liefert schnell einen Entwurf, den du nur noch anpasst. Sie hilft auch beim Umformulieren, etwa wenn ein Text freundlicher oder kürzer werden soll.\n\nZusammenfassen: Lange Dokumente, Meetingmitschriften oder E-Mail-Verläufe in wenigen Punkten auf den Kern bringen. Das spart Lesezeit und hilft, nichts Wichtiges zu übersehen.\n\nIdeen entwickeln: Vorschläge für einen Veranstaltungstitel, Argumente für ein Kundengespräch, Fragen für ein Bewerbungsinterview. Die KI ist ein unermüdlicher Brainstorming-Partner.\n\nÜbersetzen: Geschäftliche Texte in andere Sprachen übertragen – deutlich flüssiger als frühere Übersetzungsprogramme.\n\nStrukturieren: Ungeordnete Kundenanfragen sortieren, aus Stichpunkten eine Gliederung machen, Schulungsunterlagen und Checklisten erstellen.\n\nFehler finden: Rechtschreibung, Grammatik, unklare Formulierungen oder Unstimmigkeiten in Texten und Tabellen aufspüren.\n\nDie gemeinsame Logik dahinter: Bei all diesen Aufgaben bleibt der Mensch die letzte Instanz. Die KI liefert Rohmaterial und Vorschläge – du entscheidest, was davon verwendet wird. In diesem Zusammenspiel liegt der größte Nutzen: schneller zum Entwurf, mehr Zeit für das, was wirklich dein Urteil braucht.",
        example:
          "Ein dreiköpfiges Assistenzteam bereitet die jährliche Kundenveranstaltung vor. Die KI hilft an mehreren Stellen: Sie macht aus dem Planungs-Chat eine übersichtliche Aufgabenliste, entwirft die Einladungs-E-Mail in Deutsch und Englisch, schlägt zehn Titel für den Vortragsabend vor und erstellt eine Checkliste für den Veranstaltungstag. Das Team prüft und verfeinert alles – und spart insgesamt fast einen ganzen Arbeitstag.",
        risk: "Auch bei \"harmlosen\" Aufgaben gilt: Namen, Termine, Preise und Fakten in KI-Entwürfen können falsch sein. Wer aus Zeitersparnis auf die Endkontrolle verzichtet, macht aus dem Produktivitätswerkzeug eine Fehlerquelle.",
        memo: "KI liefert den Entwurf – du lieferst das Urteil.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Bei welchen Aufgabentypen ist KI im Büro besonders hilfreich?",
            answer:
              "Bei Texten und Umformulierungen, Zusammenfassungen, Ideenfindung, Übersetzungen, beim Strukturieren von Informationen (z. B. Checklisten, Schulungsunterlagen) und beim Finden von Fehlern.",
          },
          {
            question: "Was haben alle sinnvollen KI-Einsätze gemeinsam?",
            answer:
              "Der Mensch bleibt die letzte Instanz: Die KI liefert Vorschläge und Entwürfe, die Entscheidung und Endkontrolle liegen bei dir.",
          },
        ],
      },
      {
        slug: "wo-ki-nicht-blind",
        title: "Wo du KI nicht blind vertrauen darfst",
        goal: "Du erkennst Situationen, in denen KI-Ergebnisse nicht ohne strenge Prüfung oder gar nicht verwendet werden dürfen.",
        content:
          "Es gibt Bereiche, in denen KI-Fehler nicht nur peinlich, sondern richtig teuer oder für Menschen schädlich sind. Hier gilt: strengste Prüfung – oder ganz die Finger davon lassen.\n\nRecht und Steuern: KI-Auskünfte zu Gesetzen, Verträgen oder Steuerfragen dürfen nie ungeprüft übernommen werden. Die KI kann Paragraphen erfinden oder veraltete Regelungen nennen. Solche Fragen gehören zu Anwältin, Steuerberater oder einer anderen Fachperson.\n\nMedizin und Gesundheit: KI ersetzt keine ärztliche Einschätzung – weder für dich noch für Aussagen gegenüber Mitarbeitenden oder Kundschaft.\n\nEntscheidungen über Menschen: Kündigungen, Bewerberauswahl, Beförderungen oder Bonitätsentscheidungen darf eine KI nicht allein treffen. Solche Entscheidungen greifen tief in Leben ein und können diskriminierend ausfallen. Hier ist menschliche Entscheidung Pflicht – und teilweise sogar gesetzlich vorgeschrieben.\n\nSicherheitskritische Entscheidungen: Alles, was Gesundheit, Sicherheit oder den Betrieb wichtiger Anlagen betrifft, gehört nicht in die Hände eines Chat-Tools.\n\nVertrauliche Daten: Kundendaten, Gesundheitsdaten oder Geschäftsgeheimnisse haben in offenen, frei zugänglichen KI-Tools nichts verloren – dazu kommt ein eigenes Modul.\n\nEine einfache Orientierung für den Alltag: Frage dich vor jedem KI-Einsatz, wie groß die Auswirkung auf Menschen ist, wenn das Ergebnis falsch ist. Bei einem internen Textentwurf ist sie klein. Bei einer Personalentscheidung oder Rechtsauskunft ist sie groß – und entsprechend streng muss die Kontrolle sein.",
        example:
          "Ein Geschäftsführer lässt sich von einem KI-Tool eine Kündigungsbegründung mit \"passenden Gesetzesstellen\" formulieren und will sie direkt verschicken. Die Personalleiterin stoppt ihn: Zwei der genannten Paragraphen existieren in dieser Form nicht, und arbeitsrechtliche Schreiben ohne fachliche Prüfung sind ein erhebliches Risiko. Der Fall geht zur Anwältin – die KI-Version hätte den Betrieb vor Gericht teuer zu stehen kommen können.",
        risk: "In sensiblen Bereichen kann ein einziger ungeprüfter KI-Fehler zu Rechtsstreitigkeiten, Diskriminierung, finanziellen Schäden oder Gefahr für Menschen führen. Im Zweifel gilt: Fachperson fragen statt KI vertrauen.",
        memo: "Je größer die Auswirkung auf Menschen, desto strenger muss geprüft werden.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Nenne drei Bereiche, in denen KI-Ergebnisse nicht ungeprüft verwendet werden dürfen.",
            answer:
              "Zum Beispiel: Rechts- und Steuerfragen, medizinische Themen, Entscheidungen über Menschen (Kündigung, Bewerberauswahl, Bonität), sicherheitskritische Entscheidungen, Umgang mit vertraulichen Daten.",
          },
          {
            question: "Welche Kontrollfrage hilft dir vor jedem KI-Einsatz?",
            answer:
              "Wie groß ist die Auswirkung auf Menschen, wenn das Ergebnis falsch ist? Je größer die Auswirkung, desto strenger die Prüfung.",
          },
        ],
      },
    ],
  },
  {
    slug: "halluzinationen",
    order: 4,
    title: "Halluzinationen, Quellenprüfung und Faktencheck",
    description:
      "Warum KI-Systeme Fakten erfinden können und wie du KI-Ergebnisse systematisch überprüfst.",
    lessons: [
      {
        slug: "was-sind-halluzinationen",
        title: "Was sind Halluzinationen?",
        goal: "Du verstehst, warum KI-Systeme falsche Inhalte erfinden, und erkennst typische Formen von Halluzinationen.",
        content:
          "Wenn eine KI Inhalte erfindet und als Tatsachen präsentiert, nennt man das eine Halluzination. Das ist kein seltener Ausrutscher, sondern eine eingebaute Eigenschaft: Ein Sprachmodell erzeugt immer die wahrscheinlichste Wortfolge – auch dann, wenn es die richtige Antwort schlicht nicht kennt. Statt \"Ich weiß es nicht\" zu sagen, produziert es oft eine plausibel klingende, aber falsche Antwort.\n\nTypische Formen von Halluzinationen sind:\n\nFalsche Fakten: Die KI nennt ein falsches Gründungsjahr, eine falsche Funktionsbezeichnung oder erfindet Produkteigenschaften.\n\nErfundene Quellen: Die KI zitiert Studien, Bücher oder Artikel, die es nicht gibt – oft mit täuschend echten Titeln, Autorennamen und Jahreszahlen.\n\nFalsche Paragraphen und Gesetze: Besonders heikel im Geschäftsalltag. Die KI nennt Gesetzesstellen, die nicht existieren oder etwas ganz anderes regeln.\n\nFalsche Zahlen: Prozentsätze, Fristen, Preise oder Statistiken, die frei erfunden oder veraltet sind.\n\nDas Gefährliche daran: Halluzinationen sehen genauso aus wie richtige Antworten. Es gibt kein Warnsignal, keinen anderen Tonfall, keine Kennzeichnung. Eine erfundene Quelle ist genauso sauber formatiert wie eine echte.\n\nDeshalb lautet die wichtigste Regel dieser Schulung: Jede Tatsachenbehauptung einer KI ist erst einmal ein unbestätigter Entwurf. Wie du solche Behauptungen prüfst, lernst du in der nächsten Lektion.",
        example:
          "Ein Sachbearbeiter fragt ein KI-Tool nach der gesetzlichen Aufbewahrungsfrist für bestimmte Unterlagen. Die KI antwortet selbstsicher und nennt ein \"Bürodokumenten-Aufbewahrungsgesetz\" mit konkretem Paragraphen. Klingt seriös – aber dieses Gesetz existiert nicht. Erst der Blick in eine offizielle Quelle und die Rückfrage bei der Steuerberaterin liefern die korrekte Frist. Hätte er die KI-Antwort übernommen, wären wichtige Unterlagen womöglich zu früh vernichtet worden.",
        risk: "Halluzinationen sind von richtigen Antworten äußerlich nicht zu unterscheiden. Besonders gefährlich sind erfundene Gesetze, Quellen und Zahlen, weil sie seriös wirken und gern ungeprüft weiterverwendet werden.",
        memo: "Eine KI sagt selten \"Ich weiß es nicht\" – sie erfindet lieber eine plausible Antwort.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Was ist eine Halluzination bei KI-Systemen?",
            answer:
              "Eine erfundene, aber plausibel klingende Antwort – etwa falsche Fakten, erfundene Quellen, nicht existierende Gesetze oder falsche Zahlen, die als Tatsachen präsentiert werden.",
          },
          {
            question: "Woran erkennst du eine Halluzination im Text?",
            answer:
              "Am Text selbst meist gar nicht – Halluzinationen sehen aus wie richtige Antworten. Deshalb müssen Tatsachenbehauptungen immer extern geprüft werden.",
          },
        ],
      },
      {
        slug: "ki-ergebnisse-pruefen",
        title: "KI-Ergebnisse richtig prüfen",
        goal: "Du kannst KI-Ergebnisse systematisch auf Richtigkeit prüfen, bevor du sie verwendest oder weitergibst.",
        content:
          "Gegen Halluzinationen hilft eine einfache Prüf-Routine. Sie kostet ein paar Minuten – und schützt dich und deine Firma vor teuren Fehlern.\n\n1. Fakten gegenprüfen: Prüfe jede wichtige Tatsachenbehauptung in einer unabhängigen, verlässlichen Quelle – etwa auf offiziellen Webseiten von Behörden, in Fachportalen oder in internen Unterlagen. Verlasse dich nie allein auf die KI.\n\n2. Quellen verlangen: Bitte die KI, ihre Quellen zu nennen. Aber Achtung: Auch Quellenangaben können erfunden sein.\n\n3. Originalquellen öffnen: Klicke genannte Quellen tatsächlich an bzw. suche sie selbst. Existiert die Quelle? Steht dort wirklich das, was die KI behauptet? Dieser Schritt entlarvt die meisten Halluzinationen.\n\n4. Zahlen nachrechnen: Summen, Prozentsätze und Fristen selbst nachrechnen oder in der Originalquelle prüfen. KI-Systeme verrechnen sich erstaunlich oft.\n\n5. Nichts Ungeprüftes nach außen: An Kundinnen, Kunden und andere Externe geht nur, was du geprüft hast. Intern kannst du Entwürfe lockerer handhaben – nach außen zählt jede Zahl.\n\n6. Fachperson einschalten: Bei Recht, Steuern, Medizin und Sicherheit ersetzt keine Prüf-Routine die Fachperson. Hier dient die KI höchstens zur Vorbereitung des Gesprächs.\n\nFaustregel für die Praxis: Je wichtiger die Entscheidung und je weiter der Text verbreitet wird, desto gründlicher die Prüfung.",
        example:
          "Frau Hofer erstellt mit KI-Hilfe einen Newsletter-Text mit drei Branchenstatistiken. Vor dem Versand prüft sie jede Zahl: Zwei findet sie in den verlinkten Originalberichten bestätigt. Die dritte Statistik samt \"Studie\" existiert nirgends – die KI hat sie erfunden. Frau Hofer streicht die Zahl und ersetzt sie durch eine belegbare Angabe. Fünf Minuten Prüfaufwand, ein peinlicher Fehler weniger im Namen der Firma.",
        risk: "Der häufigste Fehler ist nicht das Nutzen der KI, sondern das Weglassen der Prüfung – meist aus Zeitdruck. Ein einziger ungeprüfter Fakt in einer Kunden-E-Mail oder Veröffentlichung kann Vertrauen zerstören, das jahrelang aufgebaut wurde.",
        memo: "Vertrauen ist schlecht. Prüfen ist Pflicht.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Warum genügt es nicht, die KI nach ihren Quellen zu fragen?",
            answer:
              "Weil auch Quellenangaben halluziniert sein können. Du musst die genannten Quellen selbst öffnen und prüfen, ob sie existieren und den Inhalt wirklich belegen.",
          },
          {
            question: "Was gilt für KI-Inhalte, die an Kundinnen und Kunden gehen?",
            answer:
              "Nach außen geht nur, was vorher geprüft wurde – Fakten gegengeprüft, Zahlen nachgerechnet, Quellen kontrolliert.",
          },
          {
            question: "Wann musst du zusätzlich eine Fachperson einschalten?",
            answer:
              "Bei Themen wie Recht, Steuern, Medizin und Sicherheit – hier ersetzt keine eigene Prüfung die fachliche Beurteilung.",
          },
        ],
      },
    ],
  },
  {
    slug: "datenschutz",
    order: 5,
    title: "Datenschutz und vertrauliche Informationen",
    description:
      "Welche Daten nicht in KI-Tools gehören und wie du KI trotzdem sicher und produktiv nutzt.",
    lessons: [
      {
        slug: "verbotene-daten",
        title: "Diese Daten gehören nicht in offene KI-Tools",
        goal: "Du kannst sicher einschätzen, welche Daten du niemals in frei zugängliche KI-Tools eingeben darfst.",
        content:
          "Alles, was du in ein offenes KI-Tool eingibst, verlässt potenziell dein Unternehmen. Je nach Anbieter und Einstellungen können Eingaben gespeichert, ausgewertet oder sogar für das Training künftiger Modelle verwendet werden. Deshalb gilt eine klare Regel: Bestimmte Datenkategorien haben in offenen, frei zugänglichen KI-Tools nichts verloren.\n\nPersonenbezogene Daten: Namen, Adressen, Geburtsdaten, Telefonnummern, E-Mail-Adressen von Kundinnen, Kunden, Mitarbeitenden oder Geschäftspartnern. Solche Daten unterliegen der DSGVO.\n\nBesonders sensible Daten: Gesundheitsdaten, Informationen über Krankenstände, religiöse oder politische Überzeugungen. Hier drohen die höchsten Bußgelder.\n\nPersonal- und Bewerberdaten: Lebensläufe, Zeugnisse, Gehälter, Beurteilungen, Passkopien und Ausweisdokumente.\n\nGeschäftsdaten: Verträge, Kalkulationen, Preislisten, Angebote, Kundendaten und alles, was unter Betriebs- und Geschäftsgeheimnisse fällt. Wer solche Inhalte in fremde Systeme lädt, kann den rechtlichen Schutz des Geschäftsgeheimnisses gefährden.\n\nZugangs- und Bankdaten: Passwörter, Zugangsdaten, PINs, Kontonummern, Kreditkartendaten – niemals, in keinem Fall.\n\nMerke dir den einfachen Test: Würdest du diese Information einer fremden Person am Nachbartisch im Café laut vorlesen? Wenn nein, dann gehört sie auch nicht in ein offenes KI-Tool. Wie du trotzdem mit KI arbeiten kannst, zeigt die nächste Lektion.",
        example:
          "Ein Mitarbeiter der Buchhaltung will sich von einem offenen KI-Tool eine Mahnung formulieren lassen. Er kopiert dazu den kompletten Kundendatensatz in das Tool: Name, Adresse, Kundennummer, offener Betrag, bisheriger Schriftverkehr. Damit hat er personenbezogene Daten und Geschäftsinterna an einen externen Anbieter übermittelt – ein klarer Datenschutzverstoß, der meldepflichtig sein kann. Für den Mahntext hätte ein anonymisiertes Beispiel völlig gereicht.",
        risk: "Datenschutzverstöße durch KI-Eingaben können Bußgelder, Meldepflichten und massiven Vertrauensverlust bei Kundschaft und Belegschaft auslösen. Und: Einmal eingegebene Daten lassen sich nicht zuverlässig zurückholen.",
        memo: "Was du nicht laut im Café vorlesen würdest, gehört nicht in ein offenes KI-Tool.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Nenne drei Datenkategorien, die nicht in offene KI-Tools gehören.",
            answer:
              "Zum Beispiel: personenbezogene Daten (Namen, Adressen), Gesundheitsdaten, Gehälter und Bewerberdaten, Verträge und Kalkulationen, Betriebsgeheimnisse, Zugangsdaten und Bankdaten.",
          },
          {
            question: "Warum sind Eingaben in offene KI-Tools riskant?",
            answer:
              "Weil die Eingaben das Unternehmen verlassen und je nach Anbieter gespeichert, ausgewertet oder für das Training verwendet werden können – zurückholen lassen sie sich nicht.",
          },
        ],
      },
      {
        slug: "sichere-nutzung",
        title: "KI sicher nutzen: Anonymisieren und Regeln beachten",
        goal: "Du kennst konkrete Techniken, um KI produktiv zu nutzen, ohne vertrauliche Daten preiszugeben.",
        content:
          "Die gute Nachricht: Für fast alle Büroaufgaben brauchst du gar keine echten vertraulichen Daten. Mit ein paar einfachen Techniken arbeitest du sicher und trotzdem produktiv.\n\nAnonymisieren: Entferne alles, was eine Person oder ein konkretes Geschäft identifizierbar macht, bevor du etwas eingibst. Statt \"Max Müller, Kunde Nr. 1042, schuldet uns 5.240 Euro\" schreibst du: \"Ein Kunde hat eine offene Forderung von rund 5.000 Euro und reagiert nicht auf Zahlungserinnerungen.\" Die KI kann dir damit genauso gut helfen.\n\nPlatzhalter verwenden: Ersetze Namen durch \"[Kunde A]\", \"[Mitarbeiterin B]\" oder \"[Firma X]\". Nach dem KI-Entwurf setzt du die echten Namen in deinem eigenen Dokument wieder ein – nicht im KI-Tool.\n\nFirmeninterne Tools bevorzugen: Viele Unternehmen stellen geprüfte KI-Lösungen mit Vertrag und Datenschutzgarantien bereit. Wenn es so ein Tool gibt, nutze es – dort gelten andere Regeln als bei frei zugänglichen Diensten. Frage nach, welche Tools bei euch freigegeben sind.\n\nRichtlinie beachten: Wenn dein Unternehmen eine KI-Richtlinie hat, ist sie verbindlich. Sie regelt, welche Tools erlaubt sind und welche Daten tabu bleiben. Im Zweifel: Vorgesetzte oder Datenschutzbeauftragte fragen, bevor du etwas eingibst.\n\nDokumentieren: Halte bei wichtigen Arbeitsergebnissen fest, dass und wofür KI verwendet wurde. Das schafft Nachvollziehbarkeit – und schützt dich, wenn später Fragen auftauchen.",
        example:
          "Frau Steiner will einen schwierigen Brief an einen säumigen Kunden formulieren. Statt den echten Vorgang einzugeben, schreibt sie: \"Formuliere eine höfliche, aber bestimmte zweite Zahlungserinnerung an einen Geschäftskunden. Offene Forderung im mittleren vierstelligen Bereich, erste Erinnerung blieb unbeantwortet, Geschäftsbeziehung soll erhalten bleiben.\" Die KI liefert einen passenden Entwurf – ganz ohne Namen, Kundennummer oder exakten Betrag. Diese ergänzt Frau Steiner erst in ihrem eigenen Dokument.",
        risk: "Auch scheinbar anonyme Angaben können in Kombination eine Person identifizierbar machen – etwa \"unser einziger Vertriebsmitarbeiter in Vorarlberg\". Prüfe deshalb nicht nur Namen, sondern das Gesamtbild deiner Eingabe.",
        memo: "Was nicht in fremde Hände darf, gehört nicht ungeprüft in ein KI-Tool.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Wie machst du eine Anfrage mit Kundenbezug KI-tauglich?",
            answer:
              "Durch Anonymisieren: Namen, Kundennummern und exakte Beträge entfernen oder durch Platzhalter ersetzen – z. B. \"Ein Kunde hat eine offene Forderung...\" statt echter Daten.",
          },
          {
            question: "Welche KI-Tools solltest du bevorzugen, wenn verfügbar?",
            answer:
              "Firmenintern freigegebene KI-Lösungen mit vertraglichen Datenschutzgarantien – und immer die interne KI-Richtlinie beachten.",
          },
        ],
      },
    ],
  },
  {
    slug: "urheberrecht",
    order: 6,
    title: "Urheberrecht und Nutzung von KI-Inhalten",
    description:
      "Was du bei der Verwendung von KI-Texten und KI-Bildern rechtlich beachten musst.",
    lessons: [
      {
        slug: "ki-texte-urheberrecht",
        title: "KI-Texte und Urheberrecht",
        goal: "Du weißt, welche urheberrechtlichen Risiken bei KI-generierten Texten bestehen und wie du sie vermeidest.",
        content:
          "KI-generierte Texte fühlen sich an wie \"frisch erzeugt\" – aber das Urheberrecht macht die Sache komplizierter, als es scheint. Ein paar Grundregeln schützen dich vor den häufigsten Fehlern.\n\nKeine fremden Texte kopieren lassen: Bitte die KI nie, einen fremden geschützten Text \"leicht umzuschreiben\", damit er wie ein eigener wirkt. Ein Zeitungsartikel, ein Buchkapitel oder der Websitetext eines Mitbewerbers bleibt urheberrechtlich geschützt – auch nach einer KI-Umformulierung kann eine unzulässige Übernahme vorliegen.\n\nAuf unbeabsichtigte Ähnlichkeit achten: KI-Systeme wurden mit fremden Texten trainiert. In seltenen Fällen können Ergebnisse geschützten Vorlagen sehr nahekommen. Bei wichtigen, öffentlich verwendeten Texten lohnt eine kurze Prüfung, ob auffällige Passagen woanders schon existieren.\n\nGeschützte Logos und Marken: Lass die KI keine geschützten Logos, Slogans oder Markennamen in deine Inhalte einbauen, als wären es eure eigenen.\n\nBildrechte prüfen: Auch wenn diese Lektion von Texten handelt – sobald ein KI-Tool Bilder in ein Dokument einfügt, gelten Bildrechte. Prüfe, woher das Material stammt und was die Nutzungsbedingungen des Tools erlauben.\n\nKommerzielle Nutzung: Bei allem, was verkauft, beworben oder groß veröffentlicht wird, ist besondere Vorsicht nötig. Prüfe die Nutzungsbedingungen deines KI-Tools: Erlauben sie kommerzielle Nutzung? Im Zweifel intern nachfragen, bevor etwas nach außen geht.",
        example:
          "Ein Marketing-Mitarbeiter findet den Blogartikel eines Mitbewerbers \"perfekt\" und bittet die KI, ihn \"in eigenen Worten\" für die Firmenwebsite umzuschreiben. Das Ergebnis übernimmt Aufbau, Argumente und Beispiele fast eins zu eins. Die Marketingleiterin stoppt die Veröffentlichung: Das ist keine eigene Leistung, sondern eine verschleierte Übernahme – rechtlich riskant und dem Ruf der Firma nicht würdig. Stattdessen liefert das Team der KI eigene Stichpunkte und Erfahrungen als Grundlage für einen wirklich eigenen Artikel.",
        risk: "Urheberrechtsverletzungen können Abmahnungen, Unterlassungsansprüche und Schadenersatz nach sich ziehen – die Verantwortung trägt dein Unternehmen, nicht der KI-Anbieter. Besonders riskant ist die kommerzielle Nutzung ungeprüfter Inhalte.",
        memo: "Umschreiben lassen macht fremde Inhalte nicht zu deinen.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Darfst du die KI einen fremden Artikel \"in eigenen Worten\" umschreiben lassen und veröffentlichen?",
            answer:
              "Nein. Der fremde Text bleibt geschützt – auch eine KI-Umformulierung kann eine unzulässige Übernahme sein. Nutze stattdessen eigene Inhalte als Grundlage.",
          },
          {
            question: "Worauf musst du bei kommerzieller Nutzung von KI-Inhalten achten?",
            answer:
              "Auf die Nutzungsbedingungen des KI-Tools (ist kommerzielle Nutzung erlaubt?) und auf mögliche Rechte Dritter – im Zweifel intern klären, bevor etwas veröffentlicht wird.",
          },
        ],
      },
      {
        slug: "ki-bilder-marken",
        title: "KI-Bilder, Marken und Persönlichkeitsrechte",
        goal: "Du kennst die wichtigsten Regeln für den Einsatz von KI-generierten Bildern in Werbung und Kommunikation.",
        content:
          "KI-Bildgeneratoren sind beeindruckend – und gerade deshalb entstehen hier schnell rechtliche Probleme. Drei Regeln solltest du bei jedem KI-Bild für die Firma beachten.\n\nKein \"Stil\" lebender Künstlerinnen und Künstler für Werbung: Prompts wie \"im Stil von [bekannter lebender Künstler]\" sind für kommerzielle Zwecke tabu. Auch wenn die Rechtslage im Detail komplex ist: Wer den unverwechselbaren Stil einer lebenden Person für Werbung imitiert, riskiert rechtliche Auseinandersetzungen und einen echten Imageschaden.\n\nKeine Markenlogos und geschützten Designs: Lass die KI keine fremden Logos, Markenprodukte oder geschützten Figuren in eure Bilder einbauen. Ein KI-Bild mit dem Logo eines bekannten Konzerns im Hintergrund eurer Anzeige ist eine Markenverletzung – auch wenn \"nur die KI\" es erzeugt hat.\n\nKeine echten Personen ohne Einwilligung: Erzeuge keine Bilder, die reale Personen zeigen oder erkennbar nachahmen – weder Prominente noch Mitarbeitende oder Kundinnen und Kunden. Das verletzt Persönlichkeitsrechte, und bei täuschend echten Darstellungen entsteht schnell der Vorwurf der Irreführung.\n\nGrundsätzlich gilt: Der KI-Anbieter erzeugt das Bild, aber dein Unternehmen veröffentlicht es – und haftet dafür. Prüfe vor jeder Verwendung: Ist etwas Geschütztes oder eine reale Person zu erkennen? Erlauben die Nutzungsbedingungen des Tools die geplante Verwendung? Im Zweifel: anderes Motiv wählen oder intern freigeben lassen.",
        example:
          "Für eine Werbekampagne generiert eine Agentur-Mitarbeiterin ein KI-Bild: eine lächelnde Frau mit Kaffeebecher, auf dem deutlich das Logo einer bekannten Kaffeehauskette prangt – und die Frau sieht einer bekannten Schauspielerin verblüffend ähnlich. Vor der Freigabe fällt beides auf: Logo und Gesicht müssen raus. Die Mitarbeiterin generiert das Motiv neu, mit neutralem Becher und einer eindeutig fiktiven Person. Gleicher Werbeeffekt, kein rechtliches Risiko.",
        risk: "Markenverletzungen und verletzte Persönlichkeitsrechte durch KI-Bilder können teure Abmahnungen und Klagen auslösen. Die Ausrede \"das hat die KI gemacht\" schützt nicht – veröffentlicht und verantwortlich ist dein Unternehmen.",
        memo: "KI erstellt Inhalt, aber du bleibst für die Nutzung verantwortlich.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Warum solltest du für Werbung keine KI-Bilder \"im Stil eines lebenden Künstlers\" erzeugen?",
            answer:
              "Weil die Imitation des unverwechselbaren Stils einer lebenden Person für kommerzielle Zwecke rechtlich riskant ist und dem Ruf des Unternehmens schaden kann.",
          },
          {
            question: "Was prüfst du vor der Veröffentlichung eines KI-Bildes?",
            answer:
              "Ob geschützte Logos, Marken oder erkennbare reale Personen enthalten sind und ob die Nutzungsbedingungen des Tools die geplante (kommerzielle) Verwendung erlauben.",
          },
        ],
      },
    ],
  },
  {
    slug: "bias-ethik",
    order: 7,
    title: "Bias, Diskriminierung und ethische Risiken",
    description:
      "Warum KI-Systeme Menschen unbeabsichtigt benachteiligen können und wie du Diskriminierung im KI-Einsatz verhinderst.",
    lessons: [
      {
        slug: "was-ist-bias",
        title: "Was ist Bias?",
        goal: "Du verstehst, wie Verzerrungen (Bias) in KI-Systeme gelangen und welche Folgen sie für Menschen haben können.",
        content:
          "Bias bedeutet Verzerrung. Bei KI-Systemen entsteht Bias vor allem durch die Trainingsdaten: Die KI lernt aus Daten der Vergangenheit – und übernimmt dabei auch die Ungerechtigkeiten und Schieflagen, die in diesen Daten stecken.\n\nEin einfaches Bild: Wenn du einem System zeigst, wie in den letzten 30 Jahren eingestellt, befördert und bewertet wurde, lernt es nicht nur die guten Entscheidungen – sondern auch jede Bevorzugung und Benachteiligung, die damals passiert ist. Die KI hält diese Muster dann für \"normal\" und führt sie fort.\n\nDrei bekannte Beispiele:\n\nBewerberbewertung: Ein KI-System zur Vorauswahl von Bewerbungen wurde mit historischen Einstellungsdaten trainiert, in denen überwiegend Männer eingestellt wurden. Ergebnis: Das System bewertete Bewerbungen von Frauen systematisch schlechter – ohne dass das je jemand so programmiert hätte.\n\nKreditrisiko: KI-Einschätzungen zur Kreditwürdigkeit können Menschen aus bestimmten Wohngegenden oder Gruppen unfair schlechter bewerten, weil die historischen Daten diese Muster enthalten.\n\nBildgeneratoren: Bittet man KI um ein Bild einer \"Führungskraft\", erscheinen überproportional oft Männer in Anzügen; bei \"Pflegekraft\" überwiegend Frauen. Die KI reproduziert Stereotype aus ihren Trainingsdaten.\n\nDas Wichtigste zum Mitnehmen: Bias ist keine böse Absicht und kein seltener Defekt. Er ist eine natürliche Folge davon, dass KI aus unvollkommenen menschlichen Daten lernt. Deshalb muss man aktiv damit umgehen – wie, zeigt die nächste Lektion.",
        example:
          "Ein KMU testet ein Tool, das eingehende Bewerbungen automatisch mit Punkten bewertet. Der HR-Leiterin fällt auf: Bewerbungen mit Lücken im Lebenslauf – oft durch Karenzzeiten – bekommen auffallend schlechte Bewertungen. Das Tool hat aus alten Daten gelernt, dass \"lückenlose\" Lebensläufe bevorzugt wurden. Ohne diese Kontrolle wären vor allem Bewerberinnen mit Kindern systematisch aussortiert worden, ohne dass es je jemand bemerkt hätte.",
        risk: "Bias wirkt unsichtbar: Das System liefert scheinbar objektive Zahlen und Rankings, während es in Wahrheit ganze Gruppen benachteiligt. Gerade der Anschein von Objektivität macht KI-Diskriminierung so gefährlich.",
        memo: "KI lernt aus der Vergangenheit – auch deren Ungerechtigkeiten.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Wie entsteht Bias in KI-Systemen?",
            answer:
              "Vor allem durch die Trainingsdaten: Die KI lernt aus Daten der Vergangenheit und übernimmt darin enthaltene Schieflagen und Benachteiligungen als \"normale\" Muster.",
          },
          {
            question: "Nenne ein Beispiel für Bias in der Praxis.",
            answer:
              "Zum Beispiel: Bewerbungssoftware, die bestimmte Gruppen schlechter bewertet, unfaire Kreditrisiko-Einschätzungen oder Bildgeneratoren, die Stereotype reproduzieren (Führungskraft = Mann).",
          },
        ],
      },
      {
        slug: "diskriminierung-verhindern",
        title: "Diskriminierung durch KI verhindern",
        goal: "Du kennst konkrete Maßnahmen, mit denen dein Unternehmen Diskriminierung durch KI-Einsatz vermeidet.",
        content:
          "Gegen Bias hilft kein einzelner Trick, sondern eine klare Grundhaltung plus einfache Regeln.\n\nKI entscheidet nicht allein über Menschen: Die wichtigste Regel zuerst. Ob Bewerberauswahl, Beförderung, Kündigung oder Kreditvergabe – die endgültige Entscheidung trifft immer ein Mensch, der das KI-Ergebnis als einen Hinweis unter mehreren behandelt. Ein KI-Ranking ist ein Vorschlag, kein Urteil.\n\nErgebnisse regelmäßig prüfen: Schau dir an, wen das System bevorzugt und wen es aussortiert. Fallen bestimmte Gruppen auffällig oft durch? Werden Muster sichtbar, die nichts mit der eigentlichen Eignung zu tun haben? Solche Stichproben decken Bias auf, bevor er Schaden anrichtet.\n\nMenschliche Kontrolle ernst nehmen: \"Ein Mensch schaut drüber\" darf kein Feigenblatt sein. Die kontrollierende Person braucht Zeit, Kompetenz und die echte Möglichkeit, vom KI-Vorschlag abzuweichen – ohne sich rechtfertigen zu müssen, wenn sie es tut.\n\nSensible Merkmale meiden: Geschlecht, Herkunft, Alter, Religion, Gesundheit und ähnliche Merkmale haben in KI-gestützten Bewertungen nichts verloren. Vorsicht auch bei indirekten Hinweisen: Der Wohnort oder eine Lücke im Lebenslauf kann als \"Ersatzmerkmal\" wirken.\n\nVerantwortlichkeit festlegen: Für jedes KI-System, das Menschen bewertet, muss klar sein, wer im Unternehmen dafür verantwortlich ist – wer es prüft, wer Beschwerden nachgeht, wer es notfalls abschaltet. Ohne klare Verantwortung passiert im Zweifel: nichts.",
        example:
          "Ein Unternehmen nutzt KI, um eingehende Bewerbungen vorzusortieren. Die Regeln dazu: Die KI erstellt nur eine unverbindliche Vorsortierung, jede aussortierte Bewerbung wird zusätzlich von einer HR-Mitarbeiterin gesichtet, und einmal pro Quartal prüft die HR-Leitung, ob bestimmte Gruppen auffällig oft schlecht bewertet werden. Als sich zeigt, dass Teilzeit-Erfahrung vom System abgewertet wird, wird das Kriterium entfernt – die Verantwortliche war benannt und konnte sofort handeln.",
        risk: "Diskriminierung durch KI kann gegen Gleichbehandlungsrecht verstoßen und Klagen, Entschädigungen und öffentliche Kritik nach sich ziehen – auch wenn niemand im Unternehmen diskriminieren wollte. Fehlende menschliche Kontrolle ist dabei keine Entschuldigung, sondern Teil des Problems.",
        memo: "KI kann diskriminieren, auch wenn niemand es beabsichtigt.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Was ist die wichtigste Regel beim KI-Einsatz für Entscheidungen über Menschen?",
            answer:
              "Die KI entscheidet nie allein: Die endgültige Entscheidung trifft ein Mensch, der den KI-Vorschlag kritisch prüft und wirklich davon abweichen kann.",
          },
          {
            question: "Warum reicht es nicht, sensible Merkmale wie Geschlecht einfach wegzulassen?",
            answer:
              "Weil indirekte \"Ersatzmerkmale\" wie Wohnort oder Lebenslauf-Lücken dieselbe benachteiligende Wirkung haben können. Deshalb müssen die Ergebnisse regelmäßig auf Muster geprüft werden.",
          },
        ],
      },
    ],
  },
  {
    slug: "eu-ai-act",
    order: 8,
    title: "EU AI Act Grundlagen",
    description:
      "Die wichtigsten Grundzüge der europäischen KI-Verordnung: Risikoklassen, verbotene Praktiken, Hochrisiko-KI und Rollen.",
    lessons: [
      {
        slug: "was-ist-eu-ai-act",
        title: "Was ist der EU AI Act?",
        goal: "Du kennst den Zweck des EU AI Act und verstehst seinen risikobasierten Ansatz mit den verschiedenen Risikostufen.",
        content:
          "Der EU AI Act – offiziell die Verordnung (EU) 2024/1689 – ist das europäische Regelwerk für künstliche Intelligenz. Als EU-Verordnung gilt er unmittelbar in allen Mitgliedstaaten, also auch für dein Unternehmen, wenn es KI einsetzt.\n\nDas Ziel: KI soll in Europa genutzt werden können, ohne dass Sicherheit, Gesundheit und Grundrechte von Menschen darunter leiden. Der AI Act verbietet KI deshalb nicht pauschal – er reguliert sie nach dem Risiko, das von ihrem Einsatz ausgeht. Man nennt das den risikobasierten Ansatz.\n\nVereinfacht gibt es vier Stufen:\n\nVerbotene Praktiken: Bestimmte KI-Anwendungen gelten als so gefährlich, dass sie in der EU grundsätzlich verboten sind – etwa manipulative Systeme. Details dazu in der nächsten Lektion.\n\nHochrisiko-KI: Systeme, die wichtige Entscheidungen über Menschen beeinflussen (z. B. bei Bewerbungen oder Krediten), sind erlaubt, unterliegen aber strengen Pflichten: Qualitätsanforderungen, Dokumentation, menschliche Aufsicht.\n\nTransparenzpflichten: Manche Systeme sind wenig riskant, müssen aber offengelegt werden – etwa Chatbots, die sich als KI zu erkennen geben müssen, oder täuschend echte KI-Bilder, die zu kennzeichnen sind.\n\nGeringes Risiko: Die große Mehrheit der KI-Anwendungen – etwa Rechtschreibhilfen oder Spamfilter – bleibt weitgehend frei nutzbar.\n\nFür dich als Mitarbeiterin oder Mitarbeiter heißt das: Nicht jedes KI-Tool ist ein Compliance-Fall. Aber du solltest die Stufen kennen, um einschätzen zu können, wann Vorsicht und interne Abstimmung nötig sind.",
        example:
          "Bei einer Teambesprechung schlägt ein Kollege vor, ein KI-Tool zur automatischen Vorbewertung von Bewerbungen einzuführen, ein anderer möchte nur eine KI-Rechtschreibprüfung für den Newsletter. Die Geschäftsführerin ordnet mit dem risikobasierten Ansatz ein: Die Rechtschreibprüfung ist unkritisch und kann einfach genutzt werden. Das Bewerbungs-Tool dagegen berührt den Hochrisiko-Bereich – hier wird zuerst geprüft, welche Pflichten gelten, bevor irgendetwas eingeführt wird.",
        risk: "Wer den AI Act ignoriert, riskiert je nach Verstoß empfindliche Geldbußen und muss KI-Systeme im schlimmsten Fall wieder abschalten. Unwissenheit schützt nicht – gerade bei Systemen, die über Menschen mitentscheiden.",
        memo: "Der EU AI Act reguliert KI nach Risiko: je riskanter der Einsatz, desto strenger die Regeln.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Was bedeutet der risikobasierte Ansatz des EU AI Act?",
            answer:
              "KI wird nicht pauschal verboten, sondern nach dem Risiko ihres Einsatzes reguliert: verbotene Praktiken, Hochrisiko-KI mit strengen Pflichten, Transparenzpflichten und weitgehend freie Nutzung bei geringem Risiko.",
          },
          {
            question: "Gilt der EU AI Act auch für dein Unternehmen?",
            answer:
              "Ja. Als EU-Verordnung (Verordnung (EU) 2024/1689) gilt er unmittelbar in allen Mitgliedstaaten – auch für KMU, die KI beruflich einsetzen.",
          },
        ],
      },
      {
        slug: "verbotene-praktiken",
        title: "Verbotene KI-Praktiken",
        goal: "Du kennst die wichtigsten KI-Praktiken, die der EU AI Act grundsätzlich verbietet, und weißt, dass Einzelfälle fachlich geprüft werden müssen.",
        content:
          "Ganz oben in der Risikopyramide des EU AI Act stehen Praktiken, die in der EU grundsätzlich verboten sind. Der Gedanke dahinter: Manche KI-Einsätze verletzen die Würde und die Rechte von Menschen so stark, dass keine Schutzmaßnahme sie akzeptabel macht.\n\nZu den wichtigsten verbotenen Praktiken gehören – vereinfacht dargestellt:\n\nManipulative Systeme: KI, die Menschen unterschwellig oder gezielt täuschend beeinflusst, sodass sie Entscheidungen treffen, die ihnen erheblich schaden können.\n\nAusnutzung schutzbedürftiger Personen: KI, die gezielt die Schwächen bestimmter Gruppen ausnutzt – etwa von Kindern, älteren Menschen oder Personen in schwierigen Lebenslagen – um ihr Verhalten zu ihrem Schaden zu beeinflussen.\n\nSocial Scoring: Bestimmte Formen der umfassenden Bewertung von Menschen anhand ihres Sozialverhaltens oder persönlicher Merkmale, wenn daraus ungerechtfertigte Nachteile in anderen Lebensbereichen entstehen.\n\nBiometrische Überwachung: Bestimmte Formen biometrischer Erkennung und Kategorisierung – etwa Emotionserkennung am Arbeitsplatz oder bestimmte Gesichtserkennung im öffentlichen Raum – sind je nach Kontext verboten oder nur unter engen Ausnahmen zulässig.\n\nZwei wichtige Hinweise: Erstens sind die genauen Abgrenzungen juristisch anspruchsvoll – ob ein konkretes System unter ein Verbot fällt, ist immer eine Einzelfallprüfung durch Fachleute. Diese Schulung ist keine Rechtsberatung. Zweitens ist die Praxisregel für dich einfach: Wenn ein KI-Einsatz darauf abzielt, Menschen zu überwachen, zu manipulieren oder umfassend zu bewerten, ist das ein klares Stopp-Signal – nicht einführen, sondern zuerst intern und fachlich klären.",
        example:
          "Ein Vertriebsleiter entdeckt auf einer Messe eine Software, die per Kamera und KI die \"Emotionen und Aufmerksamkeit\" der Mitarbeitenden im Kundenservice auswerten soll, um \"Motivationstiefs\" zu erkennen. Klingt nach Effizienz – ist aber genau die Art von System, die im Beschäftigungskontext unter die verbotene Emotionserkennung fallen kann. Die Geschäftsführung stoppt die Anschaffung und holt zuerst eine fachliche Einschätzung ein, statt sich auf die Werbeversprechen des Anbieters zu verlassen.",
        risk: "Der Einsatz verbotener KI-Praktiken zieht die höchsten Bußgelder des AI Act nach sich. Vorsicht bei Tools, die Überwachung, Verhaltensbewertung oder Emotionserkennung versprechen – Werbeversprechen der Anbieter ersetzen keine rechtliche Prüfung des Einzelfalls.",
        memo: "Wenn KI Menschen manipuliert, überwacht oder umfassend bewertet: Stopp – erst fachlich prüfen lassen.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Nenne zwei Beispiele für grundsätzlich verbotene KI-Praktiken.",
            answer:
              "Zum Beispiel: manipulative Systeme, die Menschen zu ihrem Schaden beeinflussen, Ausnutzung schutzbedürftiger Personen, bestimmte Formen von Social Scoring sowie bestimmte biometrische Überwachung wie Emotionserkennung am Arbeitsplatz.",
          },
          {
            question: "Kannst du selbst abschließend beurteilen, ob ein System verboten ist?",
            answer:
              "Nein. Die Abgrenzung ist eine juristische Einzelfallprüfung. Deine Aufgabe ist es, Warnsignale zu erkennen und die Frage intern bzw. an Fachleute weiterzugeben.",
          },
        ],
      },
      {
        slug: "hochrisiko-ki",
        title: "Hochrisiko-KI: Wenn der Einsatzkontext entscheidet",
        goal: "Du kennst typische Hochrisiko-Bereiche des EU AI Act und verstehst, dass der Einsatzkontext über die Einstufung entscheidet.",
        content:
          "Hochrisiko-KI ist nicht verboten – aber streng reguliert. In diese Kategorie fallen KI-Systeme, deren Fehler oder Verzerrungen gravierende Folgen für Menschen haben können. Der EU AI Act listet die betroffenen Einsatzbereiche konkret auf.\n\nFür den Büro- und KMU-Alltag sind vor allem diese Bereiche relevant:\n\nBewerberauswahl und Personalmanagement: KI, die Bewerbungen filtert, Kandidaten bewertet oder bei Beförderungen, Aufgabenzuteilung und Kündigungen mitentscheidet.\n\nBildung und Prüfungen: KI, die über Zulassungen entscheidet, Prüfungen bewertet oder Lernende einstuft.\n\nKreditwürdigkeit: KI, die die Bonität von Personen bewertet und damit über den Zugang zu Krediten mitentscheidet.\n\nKritische Infrastruktur: KI in der Steuerung von Energie-, Wasser- oder Verkehrssystemen.\n\nWichtige Dienstleistungen: KI, die über den Zugang zu wesentlichen privaten und öffentlichen Leistungen mitentscheidet – etwa bestimmte Versicherungs- oder Sozialleistungen.\n\nDer entscheidende Punkt für die Praxis: Nicht das Tool an sich, sondern der Einsatzkontext bestimmt die Einstufung. Dasselbe Sprachmodell ist unkritisch, wenn es Marketingtexte entwirft – aber es berührt den Hochrisiko-Bereich, wenn es Bewerbungen bewertet. Für Hochrisiko-Systeme gelten dann strenge Pflichten: unter anderem Risikomanagement, Datenqualität, Dokumentation, menschliche Aufsicht und ausreichende Kompetenz der Bedienenden.\n\nFür dich heißt das: Bevor ein KI-Tool für Entscheidungen über Menschen eingesetzt wird, muss die Frage geklärt sein, ob ein Hochrisiko-Einsatz vorliegt – und das ist Sache der Verantwortlichen im Unternehmen, nicht eine Bauchentscheidung im Tagesgeschäft.",
        example:
          "Ein KMU nutzt ChatGPT seit Monaten unkritisch für Textentwürfe im Marketing. Nun schlägt die HR-Abteilung vor, dasselbe Tool zu nutzen, um eingehende Bewerbungen zu bewerten und eine Rangliste zu erstellen. Die Geschäftsführung erkennt: Das ist ein völlig anderer Einsatzkontext – Bewerberauswahl ist ein Hochrisiko-Bereich. Statt einfach loszulegen, wird geprüft, welche Pflichten gelten würden, und entschieden: Die KI darf höchstens Stellenanzeigen formulieren, aber keine Bewerbungen bewerten.",
        risk: "Die größte Falle: ein harmloses Alltagstool schleichend für Hochrisiko-Zwecke zu verwenden, ohne die Pflichten zu kennen. Wer KI unbemerkt über Bewerbungen, Kredite oder Personalentscheidungen mitentscheiden lässt, verstößt schnell gegen den AI Act.",
        memo: "Nicht jedes KI-Tool ist Hochrisiko, aber der Einsatzkontext entscheidet.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Nenne drei Hochrisiko-Bereiche nach dem EU AI Act.",
            answer:
              "Zum Beispiel: Bewerberauswahl und Personalmanagement, Bildung und Prüfungen, Kreditwürdigkeitsprüfung, kritische Infrastruktur, Zugang zu wichtigen Dienstleistungen.",
          },
          {
            question: "Warum kann dasselbe KI-Tool einmal unkritisch und einmal Hochrisiko sein?",
            answer:
              "Weil der Einsatzkontext entscheidet: Marketingtexte entwerfen ist unkritisch, Bewerbungen bewerten fällt in einen Hochrisiko-Bereich mit strengen Pflichten.",
          },
        ],
      },
      {
        slug: "rollen-anbieter-betreiber",
        title: "Rollen im AI Act: Anbieter, Betreiber, Nutzer",
        goal: "Du kannst die Rollen Anbieter und Betreiber unterscheiden und weißt, welche Rolle dein Unternehmen typischerweise hat.",
        content:
          "Der EU AI Act verteilt seine Pflichten nach Rollen. Wer welche Rolle hat, entscheidet darüber, welche Regeln gelten. Die zwei wichtigsten Rollen:\n\nAnbieter: Wer ein KI-System entwickelt oder entwickeln lässt und es unter eigenem Namen auf den Markt bringt. Anbieter tragen die umfangreichsten Pflichten – sie müssen ihre Systeme sicher gestalten, dokumentieren und je nach Risikoklasse aufwendige Anforderungen erfüllen. Beispiele: die Hersteller von ChatGPT, Copilot oder einer KI-Recruiting-Software.\n\nBetreiber: Wer ein KI-System in eigener Verantwortung beruflich einsetzt. Und das ist der entscheidende Punkt für dich: Ein KMU, das ChatGPT oder ein anderes KI-Tool im Geschäftsalltag nutzt, ist in der Regel Betreiber. Betreiber haben eigene Pflichten – deutlich schlankere als Anbieter, aber echte Pflichten: das System bestimmungsgemäß verwenden, bei Hochrisiko-KI menschliche Aufsicht sicherstellen und dafür sorgen, dass das eigene Personal über ausreichende KI-Kompetenz verfügt. Genau daher kommt diese Schulung.\n\nNutzer im Alltag: Du als Mitarbeiterin oder Mitarbeiter bedienst die Tools im Rahmen deiner Arbeit. Die rechtlichen Pflichten treffen das Unternehmen als Betreiber – aber erfüllen kann es sie nur, wenn alle im Team die Regeln kennen und einhalten.\n\nWichtig ist auch die Abgrenzung zur privaten Nutzung: Wer KI rein privat verwendet – etwa zu Hause ein Rezept generiert – fällt nicht unter die Betreiberpflichten. Sobald KI aber beruflich eingesetzt wird, ist der berufliche Rahmen mit seinen Regeln maßgeblich. Und: Rollen können sich ändern – wer ein KI-System stark verändert oder unter eigenem Namen anbietet, kann selbst zum Anbieter werden. Solche Fälle gehören immer in fachliche Prüfung.",
        example:
          "Die Firma Muster GmbH nutzt Microsoft Copilot für E-Mails und Protokolle. Rollenverteilung: Microsoft ist Anbieter des KI-Systems, die Muster GmbH ist Betreiber, die Mitarbeitenden nutzen das Tool im Arbeitsalltag. Als Betreiber sorgt die Geschäftsführung dafür, dass alle geschult sind und die interne KI-Richtlinie kennen. Als ein Mitarbeiter dasselbe Tool privat für seine Vereinshomepage nutzt, ist das seine Privatsache – im Büro gelten dagegen die betrieblichen Regeln.",
        risk: "Viele KMU glauben, die Pflichten träfen nur die großen KI-Hersteller. Das stimmt nicht: Wer KI beruflich einsetzt, ist in der Regel Betreiber und hat eigene Pflichten – darunter die KI-Kompetenz des Personals. Wer das ignoriert, riskiert Verstöße trotz \"fremder\" Software.",
        memo: "Anbieter bauen KI, Betreiber setzen sie beruflich ein – dein KMU ist meist Betreiber, und Pflichten hat es auch.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche Rolle hat ein KMU, das ChatGPT beruflich nutzt?",
            answer:
              "In der Regel die Rolle des Betreibers: Es setzt ein fremdes KI-System in eigener Verantwortung beruflich ein und hat dadurch eigene Pflichten, etwa zur KI-Kompetenz des Personals.",
          },
          {
            question: "Was unterscheidet Anbieter und Betreiber?",
            answer:
              "Der Anbieter entwickelt bzw. vertreibt das KI-System unter eigenem Namen und trägt die umfangreichsten Pflichten. Der Betreiber setzt das System beruflich ein und hat schlankere, aber echte eigene Pflichten.",
          },
          {
            question: "Gelten die Betreiberpflichten auch bei rein privater KI-Nutzung?",
            answer:
              "Nein. Rein private Nutzung fällt nicht unter die Betreiberpflichten – sobald KI beruflich eingesetzt wird, gelten die betrieblichen Regeln.",
          },
        ],
      },
    ],
  },
  {
    slug: "art4-kompetenz",
    order: 9,
    title: "Art. 4 EU AI Act: KI-Kompetenz",
    description:
      "Was Artikel 4 des EU AI Act von Unternehmen verlangt, wie Schulungen nachgewiesen werden und was ein Schulungszertifikat leisten kann – und was nicht.",
    lessons: [
      {
        slug: "was-verlangt-art4",
        title: "Was verlangt Artikel 4?",
        goal: "Du weißt, was Artikel 4 des EU AI Act von Anbietern und Betreibern verlangt und was ausreichende KI-Kompetenz konkret umfasst.",
        content:
          "Artikel 4 des EU AI Act ist der Grund für diese Schulung. Er verlangt – vereinfacht gesagt – dass Anbieter und Betreiber von KI-Systemen sicherstellen, dass ihr Personal und alle Personen, die in ihrem Auftrag mit KI arbeiten, über ausreichende KI-Kompetenz verfügen.\n\nWas heißt \"ausreichende KI-Kompetenz\"? Es geht nicht darum, dass alle Mitarbeitenden Technik-Profis werden. Es geht um das Wissen und Können, das nötig ist, um KI im eigenen Arbeitsbereich informiert und verantwortungsvoll einzusetzen. Dazu gehören:\n\nGrundverständnis: Wissen, was KI ist und wie sie grundsätzlich funktioniert – wie du es in den ersten Modulen gelernt hast.\n\nChancen und Grenzen kennen: Einschätzen können, wofür KI taugt und wofür nicht.\n\nRisiken erkennen: Halluzinationen, Bias, Datenschutzprobleme und rechtliche Fallstricke im Alltag bemerken, bevor sie Schaden anrichten.\n\nSichere Anwendung: KI-Tools praktisch so bedienen, dass gute und sichere Ergebnisse entstehen.\n\nDatenschutz: Wissen, welche Daten in welche Tools dürfen – und welche nicht.\n\nKritisches Prüfen: KI-Ergebnisse hinterfragen und kontrollieren, statt sie blind zu übernehmen.\n\nEinsatzkontext verstehen: Wissen, in welchem Zusammenhang die KI im eigenen Unternehmen eingesetzt wird und welche Regeln dort gelten.\n\nDas Maß der nötigen Kompetenz hängt vom Kontext ab: Wer nur gelegentlich Texte entwerfen lässt, braucht weniger Tiefe als jemand, der KI-Ergebnisse für wichtige Entscheidungen aufbereitet. Diese Schulung deckt die Grundlagen ab, die für den typischen Büroalltag in KMU gebraucht werden.",
        example:
          "Die Geschäftsführung eines 25-Personen-Betriebs stellt fest: Fast alle nutzen inzwischen irgendein KI-Tool – aber jede und jeder anders, ohne gemeinsame Regeln, ohne Wissen über Risiken. Um die Anforderung aus Artikel 4 zu erfüllen, führt der Betrieb genau diese Schulung ein: Alle Mitarbeitenden mit KI-Kontakt absolvieren die Module, machen den Abschlusstest und kennen danach dieselben Grundregeln. Der KI-Einsatz wird dadurch nicht gebremst, sondern sicherer und einheitlicher.",
        risk: "Ohne geschultes Personal drohen genau die Fehler, die diese Schulung behandelt: Datenschutzverstöße, ungeprüfte Falschinformationen, diskriminierende Ergebnisse. Artikel 4 macht KI-Kompetenz zur Aufgabe des Unternehmens – wer sie ignoriert, riskiert Verstöße und praktische Schäden zugleich.",
        memo: "Artikel 4 verlangt: Wer beruflich mit KI arbeitet, muss sie ausreichend verstehen und sicher anwenden können.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Von wem verlangt Artikel 4 die Sicherstellung von KI-Kompetenz?",
            answer:
              "Von Anbietern und Betreibern von KI-Systemen – sie müssen sicherstellen, dass ihr Personal und in ihrem Auftrag handelnde Personen über ausreichende KI-Kompetenz verfügen.",
          },
          {
            question: "Was umfasst ausreichende KI-Kompetenz im Büroalltag?",
            answer:
              "Grundverständnis von KI, Kenntnis von Chancen und Grenzen, Erkennen von Risiken, sichere Anwendung, Datenschutzwissen, kritisches Prüfen von Ergebnissen und Verständnis des eigenen Einsatzkontexts.",
          },
        ],
      },
      {
        slug: "schulungsnachweis",
        title: "Schulung dokumentieren und nachweisen",
        goal: "Du verstehst, warum Schulungen dokumentiert werden müssen und was ein sauberer Schulungsnachweis enthält.",
        content:
          "Eine Schulung, die niemand belegen kann, hilft im Ernstfall wenig. Wenn eine Behörde, ein Auftraggeber oder ein Gericht fragt, wie das Unternehmen die KI-Kompetenz seines Personals sicherstellt, zählt, was dokumentiert ist. Deshalb gehört zur Schulung immer der Nachweis.\n\nEin sauberer Schulungsnachweis beantwortet drei Fragen:\n\nWer wurde geschult? Name und Funktion der geschulten Person. So lässt sich zeigen, dass alle relevanten Mitarbeitenden erfasst sind – und auffinden, wer noch fehlt, etwa neue Kolleginnen und Kollegen.\n\nWann wurde geschult? Datum von Abschluss und Test. Das ist wichtig, weil sich KI-Technik und Regeln weiterentwickeln – ein Nachweis von vor drei Jahren sagt wenig über heutige Kompetenz. Viele Unternehmen planen deshalb regelmäßige Auffrischungen ein.\n\nWas wurde geschult? Die Inhalte der Schulung – also welche Themen behandelt wurden: Grundlagen, Risiken, Datenschutz, EU AI Act und so weiter. So wird nachvollziehbar, dass die Schulung die relevanten Kompetenzen tatsächlich abdeckt.\n\nDazu kommt der Kompetenznachweis: In dieser Schulung ist das der bestandene Abschlusstest. Er zeigt, dass die Inhalte nicht nur angeklickt, sondern verstanden wurden. Bei Bestehen wird automatisch ein Zertifikat erstellt, das die genannten Punkte festhält.\n\nFür das Unternehmen bedeutet das: Die Nachweise werden zentral aufbewahrt, bei Personalwechsel aktualisiert und bei Bedarf vorgelegt. Für dich bedeutet es: Schließe die Module ehrlich ab – der Test prüft genau das, was du im Alltag wirklich brauchst.",
        example:
          "Ein Kunde eines IT-Dienstleisters verlangt vor Vertragsabschluss einen Beleg, dass die Mitarbeitenden im Projekt sicher mit KI-Tools umgehen. Die Geschäftsführerin öffnet die Schulungsübersicht: Alle fünf Projektmitglieder haben die KI-Kompetenz-Schulung abgeschlossen, der Abschlusstest ist mit Datum dokumentiert, die Zertifikate mit den Schulungsinhalten liegen als PDF vor. Der Nachweis ist in zehn Minuten erbracht – ohne Dokumentation hätte die Antwort gelautet: \"Wir haben da mal was gemacht, aber belegen können wir es nicht.\"",
        risk: "Ohne Dokumentation lässt sich im Ernstfall nicht belegen, dass das Unternehmen seiner Kompetenz-Verpflichtung nachgekommen ist – selbst wenn tatsächlich geschult wurde. Lücken entstehen besonders leicht bei neuen Mitarbeitenden und nach längerer Zeit ohne Auffrischung.",
        memo: "Nicht nur schulen. Auch nachweisen.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Welche drei Fragen beantwortet ein sauberer Schulungsnachweis?",
            answer:
              "Wer wurde geschult (Person und Funktion), wann wurde geschult (Datum von Abschluss und Test) und was wurde geschult (die behandelten Inhalte).",
          },
          {
            question: "Warum reicht die Schulung allein nicht aus?",
            answer:
              "Weil das Unternehmen im Ernstfall belegen können muss, dass es die KI-Kompetenz sichergestellt hat – dazu braucht es Dokumentation, bestandenen Test und Zertifikat.",
          },
        ],
      },
      {
        slug: "grenzen-des-zertifikats",
        title: "Was das Zertifikat leistet – und was nicht",
        goal: "Du kannst realistisch einordnen, was ein privater Schulungsnachweis leistet, und kennst die weitergehende Verantwortung der Führungskräfte.",
        content:
          "Zum ehrlichen Umgang mit dieser Schulung gehört auch eine klare Einordnung: Was leistet das Zertifikat am Ende – und was leistet es nicht?\n\nWas es leistet: Das Zertifikat ist ein privater Schulungs- und Kompetenznachweis. Es dokumentiert, dass du die Inhalte durchgearbeitet und den Abschlusstest bestanden hast. Damit ist es ein sinnvoller Baustein, mit dem das Unternehmen seine Bemühungen um KI-Kompetenz nach Artikel 4 belegen kann.\n\nWas es nicht leistet: Es ist keine staatliche Zulassung und keine behördliche Zertifizierung. Es garantiert auch keine vollständige Compliance mit dem EU AI Act – denn der AI Act stellt je nach eingesetzten Systemen und Einsatzkontext weitere Anforderungen, die eine Mitarbeiterschulung allein nicht abdecken kann. Ein Zertifikat ersetzt außerdem keine Rechtsberatung im Einzelfall.\n\nDaraus ergibt sich die Verantwortung der Führungskräfte. Die Schulung des Teams ist ein Anfang, aber Geschäftsführung und Leitungsebene müssen darüber hinaus:\n\nden Einsatzkontext bewerten: Welche KI-Systeme werden wofür eingesetzt? Berührt etwas den Hochrisiko-Bereich? Welche Pflichten folgen daraus?\n\ninterne Richtlinien schaffen: verbindliche Regeln, welche Tools erlaubt sind, welche Daten tabu bleiben und wer was freigibt (mehr dazu in Modul 11).\n\nDokumentationspflichten erfüllen: Schulungsnachweise, eingesetzte Systeme und getroffene Maßnahmen im Unternehmen nachvollziehbar festhalten.\n\nKurz gesagt: Diese Schulung macht dein Team fit für den sicheren KI-Alltag und liefert einen dokumentierten Nachweis. Die Gesamtverantwortung für den regelkonformen KI-Einsatz bleibt beim Unternehmen und seiner Führung.",
        example:
          "Nach Abschluss der Schulung erklärt der Geschäftsführer eines Steuerberatungsbüros im Teammeeting: \"Ihr habt alle das Zertifikat – ein dokumentierter Nachweis unserer Schulung, und darauf bin ich stolz. Aber es ist kein Freifahrtschein: Es ist keine behördliche Zertifizierung, und es nimmt uns nicht die Pflicht ab, unsere Tools und Prozesse sauber zu halten. Deshalb bewerten Frau Maier und ich jetzt jedes KI-Tool vor der Einführung und halten unsere KI-Richtlinie aktuell.\"",
        risk: "Gefährlich wird es, wenn ein Zertifikat als Vollkasko-Beleg missverstanden wird: \"Wir sind geschult, also sind wir abgesichert.\" Der AI Act kann je nach Einsatz weitere Pflichten auslösen. Wer sich allein auf den Schulungsnachweis verlässt, übersieht womöglich genau diese.",
        memo: "Das Zertifikat belegt die Schulung – die Verantwortung für den regelkonformen KI-Einsatz bleibt beim Unternehmen.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Was ist das Zertifikat dieser Schulung – und was ist es nicht?",
            answer:
              "Es ist ein privater Schulungs- und Kompetenznachweis über die durchgearbeiteten Inhalte und den bestandenen Test. Es ist keine staatliche Zulassung, keine behördliche Zertifizierung und garantiert keine vollständige Compliance mit dem EU AI Act.",
          },
          {
            question: "Welche Aufgaben bleiben bei den Führungskräften?",
            answer:
              "Den Einsatzkontext der KI-Systeme bewerten, interne Richtlinien schaffen und die Dokumentationspflichten im Unternehmen erfüllen – die Mitarbeiterschulung allein deckt das nicht ab.",
          },
        ],
      },
    ],
  },
  {
    slug: "sichere-anwendung",
    order: 10,
    title: "Sichere Anwendung von KI im Unternehmen",
    description:
      "Wie du mit guten Prompts bessere Ergebnisse erzielst, Ergebnisse gezielt verbesserst und typische Sicherheitsfallen vermeidest.",
    lessons: [
      {
        slug: "gute-prompts",
        title: "Gute Prompts schreiben",
        goal: "Du kannst Prompts so formulieren, dass die KI brauchbare, passgenaue Ergebnisse liefert.",
        content:
          "Ein Prompt ist deine Anweisung an die KI. Die Qualität des Ergebnisses hängt stark davon ab, wie klar du diese Anweisung formulierst. Die gute Nachricht: Gute Prompts folgen einem einfachen Baukasten.\n\nRolle: Sag der KI, aus welcher Perspektive sie arbeiten soll. \"Du bist eine erfahrene HR-Assistentin\" liefert andere Ergebnisse als eine Anfrage ohne Rolle.\n\nZiel: Was genau soll entstehen? Eine E-Mail, eine Checkliste, eine Zusammenfassung, drei Vorschläge?\n\nKontext: Gib die nötigen Hintergrundinformationen – Branche, Anlass, was vorher passiert ist. Ohne Kontext rät die KI.\n\nFormat: Wie soll das Ergebnis aussehen? Fließtext, Stichpunkte, Tabelle, maximale Länge?\n\nEinschränkungen: Was soll die KI weglassen oder vermeiden? Zum Beispiel: keine Fachbegriffe, keine Rechtsberatung, keine erfundenen Zahlen.\n\nSprache und Tonalität: Deutsch oder Englisch? Förmlich, freundlich, locker?\n\nZielgruppe: Für wen ist der Text? Kundinnen, Kolleginnen, Geschäftsführung?\n\nDer Unterschied in der Praxis: Ein schlechter Prompt lautet \"Schreib mir was über Datenschutz.\" – die KI weiß weder wofür, noch für wen, noch in welcher Form. Ein guter Prompt lautet: \"Erstelle eine kurze interne Checkliste für Büromitarbeiter in einem österreichischen KMU zur sicheren Nutzung von KI-Tools. Keine Rechtsberatung. Maximal 10 Punkte.\" Gleiches Thema, aber Rolle des Textes, Zielgruppe, Format, Umfang und Einschränkung sind klar – das Ergebnis ist sofort brauchbar.\n\nMerke: Du musst nicht jedes Element in jedem Prompt verwenden. Aber je wichtiger das Ergebnis, desto mehr lohnt sich ein sorgfältiger Prompt.",
        example:
          "Herr Aigner braucht eine Antwort auf eine Kundenbeschwerde über eine verspätete Lieferung. Erster Versuch: \"Schreib eine Antwort auf eine Beschwerde.\" – das Ergebnis ist generisch und unbrauchbar. Zweiter Versuch mit Baukasten: \"Du bist Kundenservice-Mitarbeiter eines Möbelhändlers. Schreibe eine Antwort auf eine Beschwerde über eine um zwei Wochen verspätete Lieferung. Entschuldige dich aufrichtig, biete einen Gutschein über 10 Prozent an, Ton: warm und professionell, Länge: maximal 150 Wörter, Deutsch, per Sie.\" Das Ergebnis braucht nur noch Feinschliff.",
        risk: "Vage Prompts erzeugen vage Ergebnisse – und verleiten dazu, den erstbesten generischen Text zu übernehmen. Achte außerdem darauf, dass auch in gut gebaute Prompts keine vertraulichen Daten gehören: Der Baukasten funktioniert auch mit anonymisierten Angaben.",
        memo: "Rolle, Ziel, Kontext, Format, Einschränkungen – wer klar fragt, bekommt klare Antworten.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Aus welchen Bausteinen besteht ein guter Prompt?",
            answer:
              "Rolle, Ziel, Kontext, Format, Einschränkungen, Sprache/Tonalität und Zielgruppe – nicht alle sind immer nötig, aber je wichtiger das Ergebnis, desto vollständiger der Prompt.",
          },
          {
            question: "Warum ist \"Schreib mir was über Datenschutz\" ein schlechter Prompt?",
            answer:
              "Weil Ziel, Zielgruppe, Format, Umfang und Einschränkungen fehlen – die KI muss raten und liefert einen generischen, kaum brauchbaren Text.",
          },
        ],
      },
      {
        slug: "ergebnisse-verbessern",
        title: "KI-Ergebnisse gezielt verbessern",
        goal: "Du kannst KI-Ergebnisse durch gezieltes Nachfragen und Verfeinern Schritt für Schritt auf das gewünschte Niveau bringen.",
        content:
          "Der erste KI-Entwurf ist selten der beste. Die eigentliche Stärke der Arbeit mit KI liegt im Dialog: Du verfeinerst das Ergebnis Schritt für Schritt, bis es passt. Diese Techniken helfen dabei:\n\nNachfragen und präzisieren: Sag konkret, was dir nicht gefällt. \"Der zweite Absatz ist zu förmlich, formuliere ihn lockerer\" bringt mehr als ein kompletter Neustart.\n\nKürzen lassen: KI-Texte sind oft zu lang und zu blumig. \"Kürze auf die Hälfte\" oder \"Streiche alle Füllwörter\" wirkt Wunder.\n\nBeispiele geben: Zeig der KI, was du meinst. Füge einen Beispieltext ein und schreibe: \"Formuliere in diesem Stil.\" Die KI übernimmt Ton und Aufbau erstaunlich gut.\n\nZielgruppe definieren: \"Erkläre das so, dass es eine neue Kollegin ohne Vorwissen versteht\" verändert das Ergebnis grundlegend.\n\nTonalität anpassen: \"Freundlicher\", \"sachlicher\", \"selbstbewusster\" – die Tonlage lässt sich gezielt nachsteuern.\n\nQuellen und Begründungen verlangen: \"Woher stammt diese Zahl?\" oder \"Begründe deinen Vorschlag\" zwingt die KI, ihre Aussagen zu untermauern – und macht Schwachstellen sichtbar. Denk daran: Genannte Quellen musst du trotzdem selbst prüfen.\n\nAlternativen anfordern: \"Gib mir drei Varianten in unterschiedlicher Tonalität\" liefert Auswahl statt Einbahnstraße.\n\nUnd über allem steht das kritische Prüfen: Verbessern heißt nicht nur schöner machen, sondern auch kontrollieren. Stimmen die Fakten noch nach der dritten Überarbeitung? Ist beim Kürzen nichts Wichtiges verloren gegangen? Der Dialog mit der KI endet immer mit deinem prüfenden Blick.",
        example:
          "Frau Wagner lässt sich einen Entwurf für das Firmenjubiläums-Mailing schreiben. Erster Entwurf: zu lang, zu werblich. Sie steuert nach: \"Kürze auf 120 Wörter.\" Dann: \"Weniger Superlative, mehr Dankbarkeit gegenüber den Kunden.\" Dann fügt sie das Mailing vom Vorjahr als Stilbeispiel ein: \"Übernimm diesen Ton.\" Nach drei Runden passt der Text. Zum Schluss prüft sie Datum, Firmenname und Fakten – im Eifer des Kürzens hatte die KI aus 20 Jahren Firmengeschichte 25 gemacht.",
        risk: "Bei mehrfachem Überarbeiten schleichen sich Fehler ein: Zahlen verändern sich, Aussagen verschieben sich, Wichtiges fällt beim Kürzen weg. Prüfe deshalb nicht nur den ersten Entwurf, sondern immer die finale Version – vollständig.",
        memo: "Der erste Entwurf ist der Anfang des Gesprächs, nicht das Ende.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Nenne drei Techniken, um ein KI-Ergebnis zu verbessern.",
            answer:
              "Zum Beispiel: gezielt nachfragen und präzisieren, kürzen lassen, Stilbeispiele geben, Zielgruppe definieren, Tonalität anpassen, Quellen und Begründungen verlangen, Varianten anfordern.",
          },
          {
            question: "Warum musst du auch die finale Version noch einmal komplett prüfen?",
            answer:
              "Weil sich beim mehrfachen Überarbeiten Fehler einschleichen können: Zahlen ändern sich, Aussagen verschieben sich oder wichtige Inhalte gehen beim Kürzen verloren.",
          },
        ],
      },
      {
        slug: "prompt-sicherheit",
        title: "Prompt-Sicherheit: Manipulation und Datenrisiken",
        goal: "Du verstehst, was Prompt-Injection ist, und kennst die wichtigsten Sicherheitsregeln im Umgang mit KI-Tools.",
        content:
          "KI-Tools bringen neben Datenschutzfragen auch eigene Sicherheitsrisiken mit. Die wichtigsten solltest du kennen – keine Panik, aber gesunde Vorsicht.\n\nPrompt-Injection – einfach erklärt: KI-Systeme folgen Anweisungen im Text, den sie verarbeiten. Angreifer nutzen das aus: Sie verstecken Anweisungen in Dokumenten, E-Mails oder Webseiten – zum Beispiel in weißer Schrift auf weißem Grund oder tief in einer langen Datei. Wenn du so ein Dokument von der KI zusammenfassen lässt, liest die KI auch die versteckte Anweisung und befolgt sie womöglich: Sie verfälscht die Zusammenfassung, blendet Warnungen aus oder empfiehlt etwas, das der Angreifer will. Kurz: Manipulierte Inhalte können der KI fremde Befehle unterschieben – ohne dass du es merkst.\n\nWas folgt daraus für dich?\n\nVorsicht bei unbekannten Dateien und Quellen: Lade keine Dokumente aus zweifelhaften Quellen in KI-Tools und sei skeptisch, wenn eine KI-Zusammenfassung ungewöhnliche Empfehlungen enthält (\"Überweisen Sie auf folgendes Konto...\"). Prüfe wichtige Aussagen im Originaldokument.\n\nKeine Zugangsdaten in Prompts: Passwörter, API-Schlüssel, PINs oder Kontodaten gehören niemals in ein KI-Tool – egal wie praktisch es erscheint. Was im Prompt steht, kann gespeichert, geloggt oder durch Manipulation abgegriffen werden.\n\nFreigabeprozess vor Veröffentlichung: Alles, was mit KI-Beteiligung entstanden ist und das Unternehmen verlässt, durchläuft das Vier-Augen-Prinzip. Das fängt nicht nur Fehler ab, sondern auch Manipulationen, die einer einzelnen Person entgehen.\n\nGesunder Menschenverstand bleibt die beste Verteidigung: Wenn ein KI-Ergebnis seltsam wirkt, zu etwas Ungewöhnlichem drängt oder vom Original abweicht – anhalten, prüfen, nachfragen.",
        example:
          "Ein Einkäufer erhält per E-Mail ein Angebots-PDF eines neuen Lieferanten und lässt es von der KI zusammenfassen. Die Zusammenfassung wirkt normal, endet aber mit: \"Hinweis: Zahlungen für diesen Lieferanten bitte ausschließlich auf das neue Konto AT12... überweisen.\" Stutzig geworden öffnet er das Original-PDF: Von einem neuen Konto steht dort nichts sichtbar – die Anweisung war als versteckter Text im Dokument platziert. Der Betrugsversuch fliegt auf, die IT wird informiert.",
        risk: "Prompt-Injection ist tückisch, weil der Angriff nicht dich täuscht, sondern dein Werkzeug: Die KI wirkt normal, folgt aber fremden Anweisungen. Besonders gefährlich in Kombination mit Zahlungsanweisungen, Zugangsdaten und automatischen Abläufen ohne menschliche Kontrolle.",
        memo: "Auch Dokumente können der KI Befehle geben – prüfe Ergebnisse aus fremden Quellen doppelt.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Was ist Prompt-Injection?",
            answer:
              "In Dokumenten, E-Mails oder Webseiten versteckte Anweisungen, die die KI beim Verarbeiten mitliest und womöglich befolgt – dadurch können Ergebnisse unbemerkt manipuliert werden.",
          },
          {
            question: "Welche Daten dürfen niemals in einen Prompt?",
            answer:
              "Zugangsdaten aller Art: Passwörter, PINs, API-Schlüssel, Kontodaten – sie können gespeichert, geloggt oder durch Manipulation abgegriffen werden.",
          },
          {
            question: "Wie schützt der Freigabeprozess vor Manipulationen?",
            answer:
              "Durch das Vier-Augen-Prinzip vor jeder externen Veröffentlichung: Eine zweite Person kann Fehler und Manipulationen entdecken, die einer einzelnen Person entgehen.",
          },
        ],
      },
    ],
  },
  {
    slug: "richtlinien",
    order: 11,
    title: "Unternehmensrichtlinien und Dos & Don'ts",
    description:
      "Die wichtigsten Verhaltensregeln für den KI-Alltag und warum jedes Unternehmen eine interne KI-Richtlinie braucht.",
    lessons: [
      {
        slug: "ki-dos",
        title: "KI-Dos: So nutzt du KI richtig",
        goal: "Du kennst die wichtigsten positiven Verhaltensregeln für den sicheren und produktiven KI-Einsatz im Arbeitsalltag.",
        content:
          "Zum Abschluss der inhaltlichen Module fassen wir zusammen, was du im Alltag aktiv tun solltest. Diese sechs Dos machen dich zu einer sicheren und produktiven KI-Anwenderin bzw. einem sicheren Anwender:\n\nNutze KI für Entwürfe: Lass dir Rohfassungen, Gliederungen, Ideen und Varianten liefern. Das ist die Kernstärke der Werkzeuge – der schnelle erste Wurf, den du dann veredelst.\n\nPrüfe jedes Ergebnis: Fakten, Zahlen, Namen, Quellen – alles, was wichtig ist, wird kontrolliert, bevor es verwendet wird. Bei externen Empfängern gilt das doppelt.\n\nSchütze sensible Daten: Anonymisiere Eingaben, verwende Platzhalter, nutze bevorzugt die intern freigegebenen Tools. Im Zweifel: erst fragen, dann eingeben.\n\nKontrolliere Quellen: Verlange Belege, öffne die Originalquellen, rechne Zahlen nach. Eine erfundene Quelle erkennt man nur durch Nachschauen.\n\nDokumentiere den KI-Einsatz: Halte bei wichtigen Arbeitsergebnissen fest, dass und wofür KI verwendet wurde. Das schafft Nachvollziehbarkeit im Team und schützt dich bei Rückfragen.\n\nBeachte die internen Regeln: Die KI-Richtlinie deines Unternehmens ist verbindlich – sie sagt dir, welche Tools erlaubt sind und welche Abläufe gelten. Wenn du unsicher bist, frag deine Führungskraft oder die benannte Ansprechperson.\n\nDiese Regeln kosten wenig Zeit und verhindern die teuersten Fehler. Wer sie verinnerlicht, kann KI mit gutem Gewissen intensiv nutzen – genau das ist das Ziel.",
        example:
          "Frau Berger bereitet eine Präsentation für einen wichtigen Kunden vor. Sie lässt die KI eine Gliederung und Formulierungsvorschläge erstellen (Entwurf), prüft alle Zahlen gegen den internen Quartalsbericht (prüfen), gibt dabei keine Kundennamen ins Tool ein (Daten schützen), kontrolliert die eine zitierte Studie im Original (Quellen), vermerkt im Foliensatz-Entwurf \"Erstfassung mit KI-Unterstützung\" (dokumentieren) und nutzt dafür das firmenintern freigegebene Tool (Regeln beachten). Alle sechs Dos in einem einzigen Arbeitsablauf.",
        risk: "Die Dos wirken nur zusammen: Wer prüft, aber sensible Daten eingibt, oder anonymisiert, aber nichts kontrolliert, lässt eine Lücke offen. Mach die sechs Regeln zur Routine – einzeln angewendet schützen sie nicht.",
        memo: "Entwerfen lassen, prüfen, schützen, kontrollieren, dokumentieren, Regeln beachten.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Nenne vier der sechs KI-Dos.",
            answer:
              "KI für Entwürfe nutzen, jedes Ergebnis prüfen, sensible Daten schützen, Quellen kontrollieren, den KI-Einsatz dokumentieren, interne Regeln beachten.",
          },
          {
            question: "Warum sollst du den KI-Einsatz bei wichtigen Ergebnissen dokumentieren?",
            answer:
              "Damit nachvollziehbar bleibt, wie ein Ergebnis entstanden ist – das hilft dem Team bei Rückfragen und schützt dich, wenn später Fragen zur Entstehung auftauchen.",
          },
        ],
      },
      {
        slug: "ki-donts",
        title: "KI-Don'ts: Das darfst du nicht tun",
        goal: "Du kennst die wichtigsten Verbote im KI-Alltag und verstehst, warum jedes einzelne davon existiert.",
        content:
          "So wichtig wie die Dos sind die Don'ts – die Dinge, die im KI-Alltag tabu sind. Hinter jedem Verbot steht ein reales Schadensszenario aus dieser Schulung:\n\nKeine Kundendaten in offene Tools: Namen, Adressen, Kundennummern, Vertragsdaten – nichts davon gehört in frei zugängliche KI-Dienste. Das ist ein Datenschutzverstoß mit Bußgeldrisiko, und die Daten sind nicht zurückholbar.\n\nKeine ungeprüften Rechtsauskünfte: Übernimm keine KI-Aussagen zu Gesetzen, Fristen oder Verträgen, ohne dass eine Fachperson oder eine verlässliche Quelle sie bestätigt hat. Erfundene Paragraphen sind eine der häufigsten Halluzinationen.\n\nKeine automatischen Entscheidungen über Personen: Bewerberauswahl, Kündigungen, Beförderungen, Kreditentscheidungen – hier entscheidet immer ein Mensch. KI darf zuarbeiten, aber nie das letzte Wort haben.\n\nKeine vertraulichen Dokumente hochladen: Verträge, Kalkulationen, Strategiepapiere und interne Berichte bleiben im Haus. Wer sie in fremde Tools lädt, gefährdet Geschäftsgeheimnisse und verletzt womöglich Verträge mit Kunden und Partnern.\n\nNichts blind veröffentlichen: Kein KI-Inhalt geht ungeprüft nach außen – nicht auf die Website, nicht in Social Media, nicht an Kunden. Immer gilt: prüfen und freigeben lassen.\n\nWichtig: Diese Don'ts sind keine Misstrauenserklärung gegen KI. Sie markieren die Grenzen, innerhalb derer du KI umso freier und intensiver nutzen kannst. Wer die Grenzen kennt, muss sich innerhalb davon keine Sorgen machen.",
        example:
          "Ein neuer Mitarbeiter will besonders effizient sein: Er lädt die komplette Kundenliste in ein offenes KI-Tool, um \"personalisierte Mailings\" zu generieren, und plant, die Ergebnisse automatisiert zu versenden. Seine Teamleiterin stoppt ihn rechtzeitig und erklärt die Don'ts: Kundendaten gehören nicht in offene Tools, und ohne Prüfung wird nichts versendet. Die Lösung: anonymisierte Textvorlagen per KI erstellen, die Personalisierung erfolgt im firmeneigenen System, der Versand nach Freigabe.",
        risk: "Die meisten Verstöße gegen diese Don'ts passieren nicht aus bösem Willen, sondern aus Effizienzdenken und Zeitdruck – \"nur schnell mal eben\". Genau in diesen Momenten entstehen die Fälle, die später Bußgelder, Rechtsstreits oder Reputationsschäden kosten.",
        memo: "KI darf unterstützen, aber nicht unkontrolliert entscheiden.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Nenne drei zentrale KI-Don'ts.",
            answer:
              "Keine Kundendaten in offene Tools, keine ungeprüften Rechtsauskünfte übernehmen, keine automatischen Entscheidungen über Personen, keine vertraulichen Dokumente hochladen, nichts blind veröffentlichen.",
          },
          {
            question: "Warum darf KI nicht automatisch über Personen entscheiden?",
            answer:
              "Weil solche Entscheidungen tief in Leben eingreifen, diskriminierend ausfallen können und menschliche Letztentscheidung nötig ist – KI darf zuarbeiten, aber nicht das letzte Wort haben.",
          },
        ],
      },
      {
        slug: "interne-richtlinien",
        title: "Die interne KI-Richtlinie",
        goal: "Du verstehst, warum dein Unternehmen eine KI-Richtlinie braucht, was hineingehört und welche Rolle Führungskräfte dabei spielen.",
        content:
          "Einzelne geschulte Mitarbeitende sind gut – gemeinsame, verbindliche Regeln sind besser. Genau dafür gibt es die interne KI-Richtlinie.\n\nWarum eine Richtlinie? Ohne sie entscheidet jede und jeder nach Gefühl: Der eine nutzt fünf verschiedene Tools, die andere traut sich gar nichts. Eine Richtlinie schafft Klarheit und Fairness – alle wissen, was erlaubt ist, und niemand muss Angst haben, aus Unwissenheit einen Fehler zu machen. Für das Unternehmen ist sie zugleich ein wichtiger Baustein, um seine Sorgfalt beim KI-Einsatz zu belegen.\n\nWas gehört hinein?\n\nErlaubte Tools: Eine klare Liste, welche KI-Dienste freigegeben sind – und der Hinweis, dass andere Tools erst nach Prüfung genutzt werden dürfen.\n\nVerbotene Daten: Welche Datenkategorien tabu sind (personenbezogene Daten, Geschäftsgeheimnisse, Zugangsdaten usw.) – am besten mit konkreten Beispielen aus dem eigenen Betrieb.\n\nFreigabeprozesse: Wer gibt KI-generierte Inhalte frei, bevor sie das Unternehmen verlassen? Wie läuft das Vier-Augen-Prinzip konkret ab?\n\nVerantwortliche: Wer ist Ansprechperson für KI-Fragen? Wer entscheidet über neue Tools? Wer hält die Richtlinie aktuell?\n\nMeldewege: An wen wendet man sich, wenn etwas schiefgegangen ist – etwa versehentlich eingegebene Kundendaten? Wichtig: Eine gute Meldekultur bestraft ehrliche Meldungen nicht, sonst erfährt niemand von Problemen.\n\nDie Rolle der Führungskräfte: Sie erstellen die Richtlinie nicht nur, sie leben sie vor. Führungskräfte entscheiden über Tool-Freigaben, bewerten Einsatzkontexte, sorgen für Schulung neuer Mitarbeitender und schaffen ein Klima, in dem Fragen und Fehlermeldungen willkommen sind. Eine Richtlinie, die nur im Intranet liegt und von oben ignoriert wird, ist wertlos.",
        example:
          "Ein 15-Personen-Betrieb führt eine zweiseitige KI-Richtlinie ein: Zwei freigegebene Tools sind namentlich genannt, eine Tabelle zeigt erlaubte und verbotene Datenarten mit Beispielen, für externe Veröffentlichungen gilt das Vier-Augen-Prinzip, Frau Huber ist als KI-Ansprechperson benannt, und für Pannen gibt es eine einfache Regel: sofort melden, ohne Schuldzuweisung. Als ein Kollege versehentlich einen Kundennamen in ein Tool eingibt, meldet er es noch am selben Tag – und der Fall kann sauber geprüft und dokumentiert werden.",
        risk: "Ohne Richtlinie entsteht Schatten-KI: Mitarbeitende nutzen heimlich private Tools, niemand hat den Überblick, und Vorfälle werden aus Angst verschwiegen. Das größte Risiko ist nicht die KI-Nutzung selbst, sondern die unkontrollierte und verdeckte Nutzung.",
        memo: "Eine gelebte KI-Richtlinie schützt alle – die Mitarbeitenden, die Kundschaft und das Unternehmen.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Was gehört in eine interne KI-Richtlinie?",
            answer:
              "Erlaubte Tools, verbotene Datenkategorien, Freigabeprozesse für externe Inhalte, benannte Verantwortliche und klare Meldewege für Vorfälle.",
          },
          {
            question: "Welche Rolle haben Führungskräfte bei der KI-Richtlinie?",
            answer:
              "Sie erstellen die Richtlinie, leben sie vor, entscheiden über Tool-Freigaben, bewerten Einsatzkontexte, sorgen für Schulungen und schaffen eine offene Meldekultur.",
          },
        ],
      },
    ],
  },
  {
    slug: "informationssicherheit",
    order: 12,
    title: "Informationssicherheit und KI-Risiken",
    description:
      "Wie du KI-Konten absicherst, KI-gestützte Angriffe wie Phishing und Deepfakes erkennst und Geschäftsgeheimnisse schützt.",
    lessons: [
      {
        slug: "ki-konten-absichern",
        title: "KI-Konten und Zugänge absichern",
        goal: "Du weißt, warum KI-Konten ein Sicherheitsrisiko sind und wie du sie mit einfachen Mitteln absicherst.",
        content:
          "Ein KI-Konto ist mehr als ein Login. In deinem Chatverlauf steckt oft monatelange Arbeit: Entwürfe, interne Überlegungen, vielleicht sogar Daten, die dort nie hätten landen sollen. Wer dein Konto übernimmt, liest all das mit.\n\nDeshalb gelten für KI-Tools dieselben Sicherheitsregeln wie für E-Mail und Firmenkonten – nur dass sie hier gern vergessen werden, weil viele KI-Tools \"nebenbei\" eingerichtet wurden.\n\nDie wichtigsten Regeln:\n\nEigenes, starkes Passwort: Kein Passwort doppelt verwenden. Wenn dein KI-Konto dasselbe Passwort hat wie ein gehackter Online-Shop, ist es offen wie ein Scheunentor.\n\nZwei-Faktor-Authentifizierung (2FA) aktivieren: Ein zweiter Faktor (z. B. Code am Handy) stoppt die meisten Kontoübernahmen – auch wenn das Passwort geklaut wurde. Wenn dein KI-Tool 2FA anbietet: einschalten. Dauert zwei Minuten.\n\nFirmen-Konto statt Privat-Konto: Nutze für die Arbeit den Zugang, den die Firma bereitstellt. Private Konten haben oft andere Datenschutz-Einstellungen, und die Firma hat keinerlei Kontrolle darüber, was dort gespeichert wird.\n\nAbmelden auf fremden Geräten: Am Messestand schnell was nachgeschaut? Danach abmelden. Ein offenes KI-Konto auf einem fremden Rechner ist ein offenes Firmenarchiv.\n\nChatverläufe aufräumen: Viele Tools speichern Verläufe unbegrenzt. Lösche alte Chats mit sensiblen Themen – was nicht mehr da ist, kann auch nicht abfließen.",
        example:
          "Herr Maier nutzt für ein KI-Tool dasselbe Passwort wie für ein altes Online-Forum. Das Forum wird gehackt, die Passwörter landen im Netz. Wochen später bemerkt die IT verdächtige Logins auf seinem KI-Konto – aus dem Ausland, mitten in der Nacht. Zum Glück hatte er kurz davor 2FA aktiviert: Der Angreifer kam ohne den Code am Handy nicht hinein. Seitdem gilt bei seiner Firma: 2FA ist Pflicht für alle KI-Zugänge.",
        risk: "Ein übernommenes KI-Konto gibt Angreifern Zugriff auf alle gespeicherten Chatverläufe – und damit oft auf interne Informationen aus Monaten. Passwort-Wiederverwendung und fehlende 2FA sind die häufigsten Einfallstore.",
        memo: "Dein KI-Konto ist ein Firmenarchiv – sichere es wie dein E-Mail-Konto.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Warum ist ein KI-Konto ein lohnendes Ziel für Angreifer?",
            answer:
              "Weil im Chatverlauf oft monatelang gesammelte interne Informationen stecken. Wer das Konto übernimmt, liest alles mit.",
          },
          {
            question: "Welche zwei Maßnahmen schützen dein KI-Konto am wirksamsten?",
            answer:
              "Ein eigenes, starkes Passwort (nirgendwo doppelt verwendet) und aktivierte Zwei-Faktor-Authentifizierung.",
          },
        ],
      },
      {
        slug: "phishing-deepfakes-erkennen",
        title: "KI-gestützte Angriffe: Phishing und Deepfakes erkennen",
        goal: "Du erkennst, wie Angreifer KI für täuschend echte Phishing-Mails, gefälschte Stimmen und Videos nutzen, und weißt, wie du dich schützt.",
        content:
          "Früher erkannte man Phishing-Mails an holprigem Deutsch und seltsamen Formulierungen. Diese Zeiten sind vorbei: Mit KI schreiben Angreifer fehlerfreie, persönlich zugeschnittene Mails – in Sekunden und in jeder Sprache.\n\nWas heute möglich ist:\n\nPerfekte Phishing-Mails: KI-Texte imitieren den Stil deiner Chefin, deines Lieferanten oder deiner Bank. Rechtschreibung und Tonfall stimmen. Die Mail wirkt völlig normal – nur das Ziel ist dasselbe wie immer: dich zu einer Zahlung, einem Klick oder zur Preisgabe von Zugangsdaten zu bewegen.\n\nStimmen-Klone (Audio-Deepfakes): Aus wenigen Sekunden Sprachaufnahme erzeugt KI eine täuschend echte Stimme. Der Anruf \"vom Geschäftsführer\", der dringend eine Überweisung braucht, kann eine Fälschung sein – auch wenn die Stimme absolut echt klingt.\n\nGefälschte Videos: Selbst Videoanrufe sind kein sicherer Beweis mehr. Es gab bereits Betrugsfälle, bei denen ganze Videokonferenzen mit KI-generierten Teilnehmern gefälscht wurden.\n\nWie du dich schützt – die goldene Regel: Verlasse dich nicht auf den Eindruck, sondern auf den Rückkanal. Bei ungewöhnlichen Bitten – Geld, Zugangsdaten, vertrauliche Unterlagen, Eile und Geheimhaltung – prüfst du über einen zweiten, unabhängigen Weg: Ruf die Person unter der dir bekannten Nummer zurück. Frag persönlich nach. Nutze die offiziellen Freigabeprozesse.\n\nGerade die Kombination aus Dringlichkeit (\"sofort!\") und Geheimhaltung (\"sag niemandem etwas\") ist das klassische Alarmsignal – egal wie echt Stimme oder Mail wirken.",
        example:
          "Die Buchhalterin eines Mittelständlers erhält einen Anruf: Die Stimme des Geschäftsführers – eindeutig er – bittet dringend um eine Überweisung von 24.000 Euro an einen neuen Lieferanten, absolute Vertraulichkeit, er sei gleich im Flieger. Sie folgt der Firmenregel: Bei telefonischen Zahlungsanweisungen immer Rückruf unter der bekannten Nummer. Der echte Geschäftsführer hebt ab – und weiß von nichts. Der Anruf war ein KI-Stimmen-Klon. Die Regel hat 24.000 Euro gerettet.",
        risk: "KI macht Betrug skalierbar: fehlerfreie Phishing-Mails, geklonte Stimmen, gefälschte Videos. Wer sich auf Klang, Optik oder Schreibstil verlässt, ist angreifbar. Nur unabhängige Rückkanäle und feste Freigabeprozesse schützen zuverlässig.",
        memo: "Dringend + geheim + Geld = Stopp. Immer über einen zweiten Kanal prüfen.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum sind Phishing-Mails heute schwerer zu erkennen als früher?",
            answer:
              "Weil KI fehlerfreie, stilistisch passende und persönlich zugeschnittene Mails erzeugt – die alten Erkennungszeichen wie schlechtes Deutsch fallen weg.",
          },
          {
            question: "Wie reagierst du auf einen dringenden Zahlungsauftrag per Anruf, der echt klingt?",
            answer:
              "Nicht auf den Klang verlassen: Rückruf unter der bekannten Nummer bzw. Prüfung über einen zweiten, unabhängigen Kanal – erst dann handeln.",
          },
        ],
      },
      {
        slug: "geschaeftsgeheimnisse-schuetzen",
        title: "Geschäftsgeheimnisse und interne Informationen schützen",
        goal: "Du verstehst, warum Geschäftsgeheimnisse in KI-Tools besonders gefährdet sind und wie du sie im Alltag schützt.",
        content:
          "Beim Datenschutz denken viele zuerst an Kundendaten. Aber es gibt eine zweite Kategorie, die genauso geschützt werden muss: die Geheimnisse deiner eigenen Firma.\n\nWas dazu gehört: Preiskalkulationen und Margen, Kundenlisten, Strategie- und Übernahmepläne, Rezepturen und Konstruktionsdaten, Quellcode, Vertragskonditionen, interne Schwachstellenanalysen – kurz: alles, was Mitbewerber nicht wissen sollen und was den Wert eures Unternehmens ausmacht.\n\nWarum KI-Tools hier heikel sind: Was du in ein öffentliches KI-Tool eingibst, verlässt das Haus. Je nach Anbieter und Einstellung werden Eingaben gespeichert, ausgewertet oder für das Training künftiger Modelle verwendet. Ein Geschäftsgeheimnis ist rechtlich aber nur geschützt, solange die Firma angemessene Geheimhaltungsmaßnahmen trifft – wer es sorglos in fremde Systeme kippt, gefährdet im Ernstfall sogar diesen rechtlichen Schutz.\n\nDie Alltagsregeln:\n\nVor jeder Eingabe kurz denken: \"Würde ich das auch einem externen Dienstleister ohne Vertrag schicken?\" Wenn nein: nicht eingeben.\n\nAnonymisieren und abstrahieren: Oft brauchst du die echten Zahlen gar nicht. \"Kalkuliere ein Angebot mit Beispielzahlen\" funktioniert genauso gut wie die echte Marge.\n\nFreigegebene Tools nutzen: Firmenversionen von KI-Tools haben oft vertragliche Zusagen (keine Trainingsnutzung, Datenverarbeitung in der EU). Genau deshalb gilt: nur die freigegebenen Zugänge verwenden.\n\nDokumente nicht komplett hochladen: Ein ganzer Vertrag oder eine komplette Kalkulation enthält fast immer mehr Vertrauliches, als dir beim schnellen Hochladen bewusst ist.",
        example:
          "Ein Vertriebsleiter will ein wichtiges Angebot verbessern und lädt die komplette Kalkulation – inklusive Einkaufspreisen und Marge – in ein kostenloses KI-Tool. Monate später fragt sich die Geschäftsführung bei einer Ausschreibung, warum der Mitbewerber so präzise unter den eigenen Preisen liegt. Ob es einen Zusammenhang gibt, lässt sich nie klären – und genau das ist das Problem: Die Daten sind draußen, unwiderruflich. Heute gilt im Betrieb: Kalkulationen nur noch mit Beispielzahlen in die KI.",
        risk: "Einmal in ein fremdes KI-System eingegebene Geschäftsgeheimnisse sind nicht mehr kontrollierbar. Neben dem wirtschaftlichen Schaden kann auch der rechtliche Geheimnisschutz verloren gehen, wenn die Firma keine angemessene Geheimhaltung nachweisen kann.",
        memo: "Was Mitbewerber nicht wissen dürfen, hat in öffentlichen KI-Tools nichts verloren.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Nenne drei Beispiele für Geschäftsgeheimnisse.",
            answer:
              "Zum Beispiel Preiskalkulationen und Margen, Kundenlisten, Strategiepläne, Rezepturen, Quellcode oder Vertragskonditionen.",
          },
          {
            question: "Wie kannst du KI trotzdem für eine Kalkulation nutzen, ohne Geheimnisse preiszugeben?",
            answer:
              "Mit anonymisierten Beispielzahlen arbeiten statt mit echten Werten – die Struktur der Aufgabe bleibt, die vertraulichen Daten bleiben im Haus.",
          },
        ],
      },
    ],
  },
  {
    slug: "transparenz-kennzeichnung",
    order: 13,
    title: "Transparenz und Kennzeichnung",
    description:
      "Wann KI-Inhalte gekennzeichnet werden müssen, wie du das im Alltag praktisch umsetzt und warum Transparenz Vertrauen schafft.",
    lessons: [
      {
        slug: "transparenz-ki-inhalte",
        title: "Transparenz bei KI-generierten Inhalten",
        goal: "Du weißt, wann KI-generierte Inhalte gekennzeichnet werden müssen oder sollten und warum ein interner Freigabeprozess sinnvoll ist.",
        content:
          "Nicht jeder KI-Einsatz muss offengelegt werden – aber in bestimmten Fällen ist Transparenz Pflicht oder zumindest dringend zu empfehlen.\n\nWann Kennzeichnung wichtig ist:\n\nTäuschend echte KI-Bilder und -Videos: Wenn KI-generierte Inhalte echte Personen, Orte oder Ereignisse täuschend echt darstellen (Stichwort Deepfakes), verlangt der EU AI Act grundsätzlich eine Kennzeichnung. Niemand soll KI-Fälschungen für echte Aufnahmen halten.\n\nChatbots: Wenn Menschen mit einem KI-System kommunizieren, müssen sie das erkennen können. Ein Kundenservice-Chatbot auf eurer Website darf sich also nicht als menschliche Mitarbeiterin ausgeben – er muss sich als KI zu erkennen geben, sofern das nicht ohnehin offensichtlich ist.\n\nDarüber hinaus gilt: Auch wo keine Pflicht besteht, schafft freiwillige Transparenz Vertrauen – etwa ein Hinweis \"Bild KI-generiert\" bei Illustrationen in Newslettern oder Präsentationen.\n\nDer interne Freigabeprozess: Bevor KI-generierte Inhalte das Unternehmen verlassen – ob Website, Social Media, Kundenmailing oder Pressetext – sollte eine zweite Person sie freigeben. Der Freigabeprozess prüft: Stimmen die Fakten? Sind Rechte Dritter betroffen? Ist eine Kennzeichnung nötig? Passt der Inhalt zur Firma?\n\nSo ein Prozess klingt bürokratisch, ist aber schlank umsetzbar: eine kurze Checkliste und ein Vier-Augen-Prinzip genügen in den meisten KMU. Wichtig ist, dass jede und jeder weiß: Ungeprüft veröffentlicht wird nichts.",
        example:
          "Ein KMU stellt einen Chatbot für häufige Kundenfragen auf die Website. Im Begrüßungstext steht klar: \"Hallo! Ich bin der digitale Assistent der Firma Muster – eine KI. Bei komplexen Anliegen verbinde ich Sie gern mit einem Menschen.\" Zusätzlich vereinbart das Team: Jedes KI-generierte Bild für Social Media wird vor der Veröffentlichung von der Marketingleitung freigegeben und bei realistischen Darstellungen als KI-generiert gekennzeichnet.",
        risk: "Wer täuschend echte KI-Inhalte unmarkiert verbreitet oder einen Chatbot als Menschen ausgibt, riskiert Verstöße gegen Transparenzpflichten und – oft schlimmer – den Vertrauensverlust bei Kundschaft und Öffentlichkeit, wenn die Täuschung auffliegt.",
        memo: "Wo KI drinsteckt und Menschen getäuscht werden könnten, muss KI draufstehen.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Muss sich ein Kundenservice-Chatbot als KI zu erkennen geben?",
            answer:
              "Ja. Menschen müssen erkennen können, dass sie mit einem KI-System kommunizieren – der Chatbot darf sich nicht als Mensch ausgeben.",
          },
          {
            question: "Was leistet ein interner Freigabeprozess vor der Veröffentlichung?",
            answer:
              "Eine zweite Person prüft Fakten, Rechte Dritter, notwendige Kennzeichnung und Passung zur Firma – ungeprüft wird nichts veröffentlicht.",
          },
        ],
      },
      {
        slug: "kennzeichnung-im-alltag",
        title: "Kennzeichnung im Arbeitsalltag umsetzen",
        goal: "Du kannst für typische Alltagssituationen entscheiden, ob und wie du KI-Einsatz kennzeichnest – von der E-Mail bis zum Kundenbericht.",
        content:
          "\"Muss ich jetzt unter jede E-Mail schreiben, dass die KI geholfen hat?\" – Nein. Aber du solltest wissen, wo die Grenze verläuft. Hier die typischen Fälle aus dem Büroalltag:\n\nInterne Entwürfe und Routinetexte: Wenn die KI dir hilft, eine E-Mail zu formulieren oder ein Protokoll zusammenzufassen, und du das Ergebnis geprüft und verantwortet hast, brauchst du keine Kennzeichnung. Du bist die Autorin oder der Autor – die KI war dein Werkzeug, wie früher die Rechtschreibprüfung.\n\nVeröffentlichte Bilder und Videos: Sobald KI-Bilder realistisch wirken – Menschen, Orte, Ereignisse – gehört ein Hinweis dazu. Bei offensichtlich künstlerischen Illustrationen ist es rechtlich entspannter, aber ein kleiner Hinweis \"Bild: KI-generiert\" kostet nichts und erspart Diskussionen.\n\nChatbots und automatische Antworten: Immer als KI erkennbar machen. Das gilt auch für automatisch generierte Antwortvorschläge im Kundenservice, wenn sie ungeprüft rausgehen.\n\nBerichte und Gutachten für Kunden: Hier zählt Ehrlichkeit gegenüber dem Auftraggeber. Wenn wesentliche Teile KI-generiert sind, sollte das transparent sein – spätestens auf Nachfrage. Manche Branchen und Verträge verlangen die Offenlegung ausdrücklich. Im Zweifel: intern klären, was vereinbart ist.\n\nDie einfache Faustregel für alle Fälle: Frage dich, ob die Empfängerin oder der Empfänger sich getäuscht fühlen würde, wenn der KI-Einsatz später herauskommt. Wenn ja: kennzeichnen oder offenlegen. Wenn nein: prüfen, verantworten, fertig.\n\nUnd egal ob gekennzeichnet oder nicht: Verantwortlich für den Inhalt bist immer du bzw. deine Firma – \"das hat die KI geschrieben\" ist keine Ausrede.",
        example:
          "Eine Agentur liefert einem Kunden eine Marktanalyse. Die Recherche-Zusammenfassungen hat ein KI-Tool erstellt, die Bewertung und Empfehlungen stammen vom Team. Im Anhang steht ein kurzer Methodikhinweis: \"Quellenauswertung KI-unterstützt, alle Kernaussagen redaktionell geprüft.\" Der Kunde reagiert positiv – die Transparenz wirkt professionell. Ein Mitbewerber, bei dem der verschwiegene KI-Einsatz später aufflog, verlor dagegen genau diesen Kunden.",
        risk: "Verschwiegener KI-Einsatz dort, wo Kunden oder Öffentlichkeit ihn erwarten würden, wirkt wie Täuschung – und der Vertrauensschaden ist meist größer als jede rechtliche Folge. Umgekehrt gilt: Kennzeichnung ersetzt keine Prüfung. Ein falscher KI-Text bleibt falsch, auch mit Hinweis.",
        memo: "Würde sich der Empfänger getäuscht fühlen, wenn der KI-Einsatz herauskommt? Dann offenlegen.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Musst du eine intern genutzte, von dir geprüfte KI-formulierte E-Mail kennzeichnen?",
            answer:
              "Nein. Wenn du das Ergebnis geprüft hast und verantwortest, ist die KI ein Werkzeug – eine Kennzeichnungspflicht besteht hier nicht.",
          },
          {
            question: "Wie lautet die Faustregel für die Kennzeichnungs-Entscheidung?",
            answer:
              "Würde sich die Empfängerin oder der Empfänger getäuscht fühlen, wenn der KI-Einsatz später herauskommt? Wenn ja: kennzeichnen oder offenlegen.",
          },
        ],
      },
    ],
  },
  {
    slug: "ki-tools-freigabe",
    order: 14,
    title: "KI-Tools, Freigabeprozesse und Schatten-KI",
    description:
      "Warum nur freigegebene KI-Tools genutzt werden dürfen, wie du neue Tools richtig beantragst und warum Schatten-KI gefährlich ist.",
    lessons: [
      {
        slug: "freigegebene-tools",
        title: "Warum nur freigegebene KI-Tools?",
        goal: "Du verstehst, warum dein Unternehmen KI-Tools prüft und freigibt, und welchen Schutz dir die freigegebene Tool-Liste bietet.",
        content:
          "\"Das neue Tool ist viel besser, warum darf ich es nicht einfach nutzen?\" – Eine berechtigte Frage. Die Antwort: Weil zwischen einem guten und einem schlechten KI-Tool von außen kaum ein Unterschied zu sehen ist.\n\nWas bei der Freigabe geprüft wird:\n\nWo landen die Daten? Verarbeitet der Anbieter Eingaben in der EU oder außerhalb? Gibt es einen Vertrag zur Auftragsverarbeitung? Werden Eingaben für das Training weiterverwendet?\n\nWie sicher ist der Anbieter? Gibt es Sicherheitszertifikate, eine saubere Historie, einen erreichbaren Support? Oder ist es ein Drei-Personen-Startup, das nächsten Monat verschwunden sein kann – mitsamt euren Daten?\n\nWas sagen die Nutzungsbedingungen? Darf man die Ergebnisse kommerziell verwenden? Wem gehören die Ausgaben? Haftet der Anbieter für irgendetwas?\n\nPasst das Tool zum Einsatzzweck? Ein Tool für Marketing-Texte muss andere Anforderungen erfüllen als eines, das Vertragsentwürfe analysiert.\n\nDiese Prüfung kannst du als einzelne Person im Alltag nicht leisten – und musst du auch nicht. Genau dafür gibt es die freigegebene Tool-Liste: Sie ist kein Verbotskatalog, sondern dein Schutz. Alles auf der Liste kannst du guten Gewissens nutzen, in dem Rahmen, der dabei steht.\n\nWichtig zu wissen: Die Freigabe gilt oft nur für eine bestimmte Version oder einen bestimmten Zugang. Die Firmen-Lizenz von einem Tool kann freigegeben sein, während die kostenlose Privat-Version desselben Tools tabu ist – weil nur die Firmenversion vertragliche Datenschutz-Zusagen enthält.",
        example:
          "Zwei Tools sehen fast gleich aus: Beide fassen Dokumente zusammen, beide haben eine hübsche Website. Die IT prüft beide. Tool A: Datenverarbeitung in der EU, Vertrag zur Auftragsverarbeitung, keine Trainingsnutzung der Eingaben. Tool B: Server außerhalb der EU, die Nutzungsbedingungen erlauben dem Anbieter, alle Eingaben \"zur Verbesserung der Dienste\" zu verwenden – also fürs Training. Von außen unsichtbar, im Kleingedruckten entscheidend. Tool A kommt auf die Liste, Tool B nicht.",
        risk: "Nicht geprüfte Tools können Eingaben speichern, weiterverwenden oder unsicher übertragen – und du siehst es ihnen nicht an. Wer am Freigabeprozess vorbei arbeitet, trägt Risiken, die er selbst gar nicht bewerten kann.",
        memo: "Die Tool-Liste ist kein Verbot, sondern dein Schutz – von außen erkennst du ein unsicheres Tool nicht.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Was wird bei einer Tool-Freigabe unter anderem geprüft?",
            answer:
              "Datenverarbeitung und Speicherort, Trainingsnutzung der Eingaben, Vertrag zur Auftragsverarbeitung, Seriosität des Anbieters und die Nutzungsbedingungen.",
          },
          {
            question: "Warum kann die Firmenversion eines Tools erlaubt sein, die kostenlose Version aber nicht?",
            answer:
              "Weil oft nur die Firmenversion vertragliche Zusagen enthält – etwa keine Trainingsnutzung und Datenverarbeitung in der EU. Die kostenlose Version hat diese Zusagen meist nicht.",
          },
        ],
      },
      {
        slug: "schatten-ki",
        title: "Schatten-KI: das unsichtbare Risiko",
        goal: "Du weißt, was Schatten-KI ist, warum sie entsteht und warum sie für das Unternehmen gefährlicher ist als offene KI-Nutzung.",
        content:
          "Schatten-KI bedeutet: Mitarbeitende nutzen KI-Tools, von denen die Firma nichts weiß. Das private ChatGPT-Konto für Kundentexte, die Übersetzungs-App am Privathandy für den Vertragsentwurf, das kostenlose Zusammenfassungs-Tool für interne Dokumente.\n\nWarum entsteht Schatten-KI? Selten aus böser Absicht. Meist, weil Mitarbeitende produktiv sein wollen und die offiziellen Wege zu langsam, zu unklar oder gar nicht vorhanden sind. Wenn die Firma kein gutes Tool bereitstellt, suchen sich die Leute selbst eines – so einfach ist das.\n\nWarum ist das gefährlich?\n\nNiemand hat den Überblick: Die Firma kann Risiken nicht managen, von denen sie nichts weiß. Welche Daten sind in welchen Tools? Keiner weiß es.\n\nKeine vertragliche Absicherung: Private und kostenlose Konten haben keine Firmen-Datenschutzvereinbarungen. Eingaben können gespeichert und fürs Training verwendet werden.\n\nVorfälle bleiben unsichtbar: Wenn über ein Schatten-Tool Daten abfließen, erfährt es die Firma erst, wenn der Schaden da ist – und kann weder reagieren noch ihre Meldepflichten erfüllen.\n\nDas Wissen verschwindet: Arbeitet jemand mit privaten Tools und verlässt die Firma, sind Prompts, Verläufe und eingespielte Arbeitsweisen weg.\n\nWas du tun kannst: Nutze die freigegebenen Tools. Wenn sie dir nicht reichen, sag es – laut und offiziell. Der Wunsch nach einem besseren Tool ist legitim und wichtig; die heimliche Nutzung ist das Problem. Und wenn du merkst, dass du selbst längst ein nicht freigegebenes Tool nutzt: Jetzt ist der richtige Moment, das zu melden und sauber umzuziehen. Eine gute Firma bestraft das nicht – sie ist froh, dass sie es erfährt.",
        example:
          "Bei einer internen Umfrage stellt ein Betrieb fest: 14 von 40 Büro-Mitarbeitenden nutzen regelmäßig private KI-Konten für die Arbeit – von Kundentexten bis zu Kalkulationshilfen. Niemand wollte etwas Böses; das offizielle Tool war schlicht umständlich zu beantragen. Die Firma reagiert richtig: Sie vereinfacht den Zugang, gibt zwei gute Tools für alle frei und bietet eine straffreie \"Umzugsfrist\" für alle Schatten-Nutzer. Drei Monate später läuft fast alles über die offiziellen Zugänge – und die Firma weiß endlich, wo ihre Daten sind.",
        risk: "Schatten-KI ist gefährlicher als offene KI-Nutzung, weil sie unsichtbar ist: keine Datenschutz-Verträge, kein Überblick, keine Vorfallserkennung. Das größte Risiko ist nicht das einzelne Tool, sondern dass niemand von ihm weiß.",
        memo: "Nicht die KI-Nutzung ist das Problem – die heimliche ist es.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Was ist Schatten-KI?",
            answer:
              "Die Nutzung von KI-Tools für die Arbeit, von denen das Unternehmen nichts weiß – etwa private Konten oder nicht freigegebene kostenlose Tools.",
          },
          {
            question: "Was solltest du tun, wenn dir die freigegebenen Tools nicht ausreichen?",
            answer:
              "Den Bedarf offiziell melden und ein neues Tool zur Prüfung vorschlagen – statt heimlich ein nicht freigegebenes Tool zu nutzen.",
          },
        ],
      },
      {
        slug: "neues-tool-beantragen",
        title: "Neues KI-Tool gewünscht? So läuft die Freigabe",
        goal: "Du weißt, wie du ein neues KI-Tool zur Freigabe vorschlägst und welche Informationen die Prüfung braucht.",
        content:
          "Du hast ein KI-Tool entdeckt, das dir richtig Arbeit abnehmen würde? Super – genau solche Vorschläge bringen die Firma weiter. Damit aus der Idee eine sichere Freigabe wird, hilft ein einfacher Ablauf:\n\nSchritt 1 – Bedarf beschreiben: Was soll das Tool können, und welches Problem löst es? \"Ich brauche etwas, das lange Ausschreibungen zusammenfasst\" ist eine brauchbare Basis. Oft gibt es schon ein freigegebenes Tool, das das kann – frag zuerst die KI-Ansprechperson.\n\nSchritt 2 – Basisinfos zum Tool sammeln: Name und Anbieter, Link, geplanter Einsatzzweck, welche Art von Daten hinein soll. Du musst keine juristische Prüfung liefern – aber je klarer dein Anwendungsfall, desto schneller die Prüfung.\n\nSchritt 3 – Prüfung abwarten: Die verantwortliche Stelle prüft Datenschutz, Nutzungsbedingungen, Sicherheit und Kosten. Das Ergebnis kann sein: freigegeben (ggf. mit Auflagen, z. B. \"nur für anonymisierte Daten\"), abgelehnt (mit Begründung) oder \"Alternative vorhanden\".\n\nSchritt 4 – Rahmen respektieren: Eine Freigabe gilt für den geprüften Zweck und Zugang. \"Freigegeben für Marketing-Texte\" heißt nicht \"freigegeben für Kundendaten\".\n\nBis zur Entscheidung gilt: Das Tool wird nicht mit echten Firmendaten genutzt. Wenn du es unbedingt ausprobieren willst, dann nur mit erfundenen Beispieldaten – das ist in den meisten Firmen in Ordnung und liefert der Prüfung sogar nützliche Erkenntnisse.\n\nDieser Prozess schützt übrigens auch dich persönlich: Wer ein freigegebenes Tool im freigegebenen Rahmen nutzt, hat bei einem Problem nichts falsch gemacht. Wer eigenmächtig handelt, steht allein da.",
        example:
          "Frau Berger aus dem Einkauf findet ein KI-Tool, das Lieferantenangebote tabellarisch vergleicht. Statt es einfach zu nutzen, schreibt sie der KI-Ansprechperson drei Sätze: was das Tool ist, wofür sie es braucht, welche Daten hinein sollen (Angebots-PDFs von Lieferanten). Die Prüfung ergibt: Anbieter seriös, aber die kostenlose Version nutzt Eingaben fürs Training. Die Firma kauft fünf Lizenzen der Business-Version mit Datenschutzvertrag. Ergebnis: Frau Berger hat ihr Tool – sicher, legal und sogar für vier Kolleginnen mit.",
        risk: "Wer ein neues Tool eigenmächtig mit echten Daten testet, schafft Fakten, bevor irgendjemand die Risiken bewerten konnte. Der offizielle Weg dauert etwas länger – aber er schützt die Firma und dich persönlich.",
        memo: "Tool-Wunsch? Melden statt heimlich testen – geprüft nutzt es allen.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Was gibst du beim Vorschlag eines neuen KI-Tools an?",
            answer:
              "Name und Anbieter des Tools, den geplanten Einsatzzweck und welche Art von Daten verarbeitet werden soll.",
          },
          {
            question: "Darfst du das gewünschte Tool vor der Freigabe schon nutzen?",
            answer:
              "Nicht mit echten Firmendaten. Höchstens mit erfundenen Beispieldaten – die eigentliche Nutzung beginnt erst nach der Freigabe.",
          },
        ],
      },
    ],
  },
  {
    slug: "ki-vorfaelle",
    order: 15,
    title: "KI-Vorfälle und Meldewege",
    description:
      "Was ein KI-Vorfall ist, wie du richtig meldest und warum eine offene Fehlerkultur das Unternehmen schützt.",
    lessons: [
      {
        slug: "was-ist-ein-ki-vorfall",
        title: "Was ist ein KI-Vorfall?",
        goal: "Du erkennst typische KI-Vorfälle im Arbeitsalltag und weißt, warum auch \"kleine\" Pannen gemeldet gehören.",
        content:
          "Ein KI-Vorfall klingt nach Katastrophe – meistens ist es aber etwas erstaunlich Alltägliches. Die häufigsten Fälle:\n\nVersehentliche Dateneingabe: Du merkst, dass du Kundendaten, Personaldaten oder Vertrauliches in ein KI-Tool eingegeben hast – oder siehst es bei jemand anderem. Das ist der Klassiker.\n\nFalsche KI-Inhalte im Umlauf: Ein KI-generierter Text mit erfundenen Fakten, falschen Preisen oder frei erfundenen Quellen wurde bereits verschickt oder veröffentlicht.\n\nVerdächtige KI-Kommunikation: Du vermutest, dass eine E-Mail, ein Anruf oder ein Video KI-gefälscht ist – auch wenn du nicht sicher bist.\n\nDiskriminierende oder unangemessene Ergebnisse: Ein KI-System benachteiligt erkennbar bestimmte Gruppen oder produziert Inhalte, die der Firma schaden könnten.\n\nUngewöhnliches Tool-Verhalten: Ein KI-Tool zeigt plötzlich fremde Chatverläufe, verlangt seltsame Berechtigungen oder verhält sich anders als gewohnt.\n\nWarum auch Beinahe-Vorfälle zählen: Der Fall, der gerade noch gut gegangen ist, ist die günstigste Lernchance, die es gibt. Wenn du den Fehler abgefangen hast, bevor Schaden entstand – großartig. Aber melde ihn trotzdem: Beim nächsten Mal fängt ihn vielleicht niemand ab, und die Firma kann nur Lücken schließen, von denen sie weiß.\n\nDie Grundregel ist einfach: Lieber einmal zu viel gemeldet als einmal zu wenig. Du musst nicht entscheiden, ob es \"schlimm genug\" ist – das bewerten die Verantwortlichen. Deine Aufgabe ist nur: hinschauen und Bescheid geben.",
        example:
          "Ein Sachbearbeiter kopiert eine E-Mail-Kette in ein KI-Tool, um eine Antwort formulieren zu lassen – und merkt danach, dass ganz unten in der Kette eine Gehaltsauskunft stand. Sichtbarer Schaden: keiner. Er meldet es trotzdem. Die Prüfung ergibt: Das Tool war die freigegebene Firmenversion ohne Trainingsnutzung – Glück gehabt. Aber der Fall führt zu einer neuen Regel, die alle schützt: E-Mail-Ketten vor der KI-Nutzung kürzen. Aus einem Beinahe-Vorfall wurde eine Verbesserung.",
        risk: "Das größte Risiko ist nicht der Vorfall selbst, sondern der unentdeckte Vorfall: Was niemand meldet, kann niemand eindämmen – und aus einer kleinen Panne wird still ein großes Problem. Auch Meldefristen (etwa im Datenschutz) laufen ab, ob gemeldet wird oder nicht.",
        memo: "Du musst nicht entscheiden, ob es schlimm ist – nur melden. Bewerten ist Aufgabe der Verantwortlichen.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Nenne drei typische KI-Vorfälle.",
            answer:
              "Zum Beispiel: versehentliche Eingabe vertraulicher Daten, versendete KI-Inhalte mit erfundenen Fakten, vermutete Deepfake-Kommunikation, diskriminierende KI-Ergebnisse oder ungewöhnliches Tool-Verhalten.",
          },
          {
            question: "Warum solltest du auch Beinahe-Vorfälle melden?",
            answer:
              "Weil sie die günstigste Lernchance sind: Die Firma kann die Lücke schließen, bevor beim nächsten Mal echter Schaden entsteht.",
          },
        ],
      },
      {
        slug: "richtig-melden",
        title: "Richtig melden: schnell, ehrlich, ohne Umwege",
        goal: "Du weißt, wie und an wen du einen KI-Vorfall meldest und warum Schnelligkeit wichtiger ist als eine perfekte Beschreibung.",
        content:
          "Wenn etwas passiert ist, zählt vor allem eines: Zeit. Hier der Ablauf, der sich in der Praxis bewährt:\n\nSchritt 1 – Sofort melden, nicht erst \"aufräumen\": Der Reflex, den Fehler erst selbst zu beheben oder zu verstecken, ist menschlich – und genau falsch. Manche Fristen laufen ab dem Zeitpunkt des Vorfalls, nicht ab deiner Meldung. Bei möglichen Datenschutzverletzungen kann die Firma zur Meldung an die Behörde innerhalb von 72 Stunden verpflichtet sein – das schafft sie nur, wenn sie schnell von dir erfährt.\n\nSchritt 2 – An die richtige Stelle: Melde an die in deiner Firma benannte Stelle – KI-Ansprechperson, IT, Datenschutzbeauftragte oder direkte Führungskraft. Wenn du nicht weißt, wer zuständig ist: Nimm die Führungskraft, die leitet weiter. Hauptsache, die Meldung ist raus.\n\nSchritt 3 – Die wichtigsten Fakten mitgeben: Was ist passiert? Welches Tool, welche Daten, wann? Was hast du schon unternommen? Keine Sorge um Vollständigkeit – eine schnelle Meldung mit Lücken ist besser als eine perfekte Meldung am nächsten Tag.\n\nSchritt 4 – Nichts löschen oder vertuschen: Lösche keine Chatverläufe, Screenshots oder E-Mails, die mit dem Vorfall zu tun haben. Die Verantwortlichen brauchen sie, um Ausmaß und Ursache zu verstehen.\n\nUnd das Wichtigste zum Schluss: Ehrliche Meldungen werden nicht bestraft. Eine Firma, die Meldungen sanktioniert, erzieht sich schweigende Mitarbeitende – und schweigende Mitarbeitende sind das teuerste Risiko von allen. Wer meldet, handelt richtig. Punkt.",
        example:
          "Freitagnachmittag, 16:40 Uhr: Eine Mitarbeiterin bemerkt, dass sie vormittags eine Bewerberliste mit Namen und Gehaltsvorstellungen in ein nicht freigegebenes KI-Tool geladen hat. Kurz überlegt sie, es bis Montag zu verschweigen – meldet es dann aber sofort der Datenschutzbeauftragten. Die kann noch am selben Abend prüfen: Welches Tool, welche Daten, welche Löschmöglichkeiten, ist eine Behördenmeldung nötig? Am Montag wäre die 72-Stunden-Frist fast abgelaufen gewesen. Ihre schnelle Meldung hat der Firma die Handlungsfähigkeit gerettet – und ihr selbst wurde ausdrücklich gedankt.",
        risk: "Verzögerte oder verschwiegene Meldungen nehmen der Firma die Chance zu reagieren – und können Meldefristen reißen lassen, was aus einer Panne einen echten Rechtsverstoß macht. Vertuschen ist der einzige Fehler, der wirklich Konsequenzen verdient.",
        memo: "Schnell und ehrlich melden schlägt perfekt und zu spät – Fristen warten nicht.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Warum ist bei möglichen Datenschutzverletzungen Schnelligkeit entscheidend?",
            answer:
              "Weil die Firma unter Umständen innerhalb von 72 Stunden an die Behörde melden muss – die Frist läuft ab dem Vorfall, und ohne deine schnelle Meldung kann sie nicht reagieren.",
          },
          {
            question: "Was gehört in eine Vorfallsmeldung?",
            answer:
              "Was passiert ist, welches Tool und welche Daten betroffen sind, wann es passiert ist und was schon unternommen wurde – lieber schnell mit Lücken als spät und perfekt.",
          },
        ],
      },
      {
        slug: "aus-vorfaellen-lernen",
        title: "Aus Vorfällen lernen",
        goal: "Du verstehst, was nach einer Meldung passiert und wie aus Vorfällen dauerhafte Verbesserungen werden.",
        content:
          "Mit der Meldung ist deine Pflicht erfüllt – aber für die Firma beginnt jetzt der wertvollste Teil: aus dem Vorfall zu lernen. Wenn du verstehst, was nach deiner Meldung passiert, meldest du übrigens auch lieber. Deshalb hier der Blick hinter die Kulissen:\n\nEindämmen: Zuerst wird der Schaden begrenzt – Zugänge sperren, Inhalte zurückrufen, Löschanträge beim Tool-Anbieter stellen, Betroffene oder Behörden informieren, falls nötig.\n\nVerstehen: Dann wird die Ursache gesucht – und zwar die echte. \"Frau X war unvorsichtig\" ist selten die ganze Wahrheit. Warum war es so leicht, den Fehler zu machen? Fehlte ein freigegebenes Tool? War die Regel unklar? Wusste niemand vom Meldeweg? Gute Ursachenanalyse fragt nach dem System, nicht nach dem Schuldigen.\n\nVerbessern: Aus der Ursache folgt die Maßnahme – eine klarere Regel, ein besseres Tool, ein Hinweis in der Schulung, eine technische Sperre. Und wichtig: Es wird geprüft, ob die Maßnahme tatsächlich wirkt, nicht nur, ob sie beschlossen wurde.\n\nDokumentieren: Der Vorfall, die Ursache und die Maßnahme werden festgehalten. Das ist keine Bürokratie, sondern doppelt wertvoll: Die Firma erkennt Muster (\"dritter Fall mit E-Mail-Ketten in drei Monaten\") und kann bei Nachfragen belegen, dass sie sorgfältig arbeitet.\n\nWas das für dich heißt: Deine Meldung verschwindet nicht in einem schwarzen Loch – sie ist der Rohstoff, aus dem bessere Regeln und sicherere Abläufe entstehen. Die besten Verbesserungen in den meisten Firmen gehen auf aufmerksame Mitarbeitende zurück, die etwas gemeldet haben, das \"vielleicht gar nichts war\".",
        example:
          "In einem Betrieb melden innerhalb weniger Wochen drei Mitarbeitende unabhängig voneinander dasselbe Muster: Beim Zusammenfassen langer E-Mail-Ketten rutschen immer wieder vertrauliche Altnachrichten mit in die KI. Die Ursachenanalyse zeigt: Das Problem ist nicht Unachtsamkeit, sondern der Arbeitsablauf – niemand liest 40 Mails, bevor er sie zusammenfassen lässt. Die Lösung: eine Kurzanleitung \"E-Mail-Ketten vor KI-Nutzung kürzen\" plus ein freigegebenes Tool, das Anhänge und Signaturen automatisch entfernt. Die Vorfälle hören auf – wegen drei Meldungen, die einzeln \"nicht der Rede wert\" schienen.",
        risk: "Firmen, die Vorfälle nur \"abhaken\" statt Ursachen zu beheben, erleben dieselben Pannen im Wiederholmodus – nur irgendwann mit größerem Schaden. Und wer Schuldige sucht statt Ursachen, bekommt bald gar keine Meldungen mehr.",
        memo: "Melden – eindämmen – Ursache finden – verbessern – wirksam? Das ist der Kreislauf, der Firmen sicherer macht.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Warum sucht eine gute Ursachenanalyse nicht nach Schuldigen?",
            answer:
              "Weil die echte Ursache meist im System liegt (unklare Regeln, fehlende Tools, unbekannte Meldewege) – und weil Schuldzuweisungen künftige Meldungen verhindern.",
          },
          {
            question: "Was passiert mit einem Vorfall nach der Meldung?",
            answer:
              "Eindämmen, Ursache analysieren, Verbesserungsmaßnahme umsetzen, Wirksamkeit prüfen und alles dokumentieren – so entsteht aus dem Vorfall eine dauerhafte Verbesserung.",
          },
        ],
      },
    ],
  },
  {
    slug: "qualitaet-feedback",
    order: 16,
    title: "Qualität, Feedback und Nachschulung",
    description:
      "Wie du die Qualität deiner KI-Nutzung dauerhaft hoch hältst, warum dein Feedback zählt und wie Nachschulung dich gezielt weiterbringt.",
    lessons: [
      {
        slug: "ki-qualitaet-sichern",
        title: "KI-Qualität im Arbeitsalltag sichern",
        goal: "Du kennst einfache Routinen, mit denen deine KI-Ergebnisse dauerhaft gut und verlässlich bleiben.",
        content:
          "Nach ein paar Wochen KI-Nutzung passiert bei fast allen dasselbe: Die Kontrolle wird lässiger. Die ersten fünfzig Ergebnisse waren gut, also wird das einundfünfzigste ungelesen übernommen. Genau da entstehen die teuren Fehler.\n\nGewohnheiten, die Qualität dauerhaft sichern:\n\nDie Stichproben-Regel: Auch bei Routineaufgaben, die \"immer funktionieren\", prüfst du regelmäßig gründlich nach – nicht jedes Mal alles, aber nie wochenlang gar nichts. KI-Tools ändern sich durch Updates; was gestern verlässlich war, kann heute anders reagieren.\n\nKritische Inhalte immer voll prüfen: Alles mit Zahlen, Namen, Rechtsaussagen oder Außenwirkung wird vollständig geprüft – ohne Ausnahme, egal wie viel Routine du hast. Die Faustregel bleibt: Je höher der Schaden bei einem Fehler, desto gründlicher die Kontrolle.\n\nBewährte Prompts wiederverwenden: Wenn ein Prompt gut funktioniert, speichere ihn – als Textbaustein oder in der Team-Sammlung. Das spart Zeit und hält die Qualität konstant, statt jedes Mal neu zu improvisieren.\n\nVeränderungen ernst nehmen: Liefert dein Tool plötzlich schlechtere, seltsamere oder auffällig andere Ergebnisse? Das ist ein Signal – erst prüfen, dann weiterarbeiten, bei Verdacht melden.\n\nWissen im Team teilen: Der Kollege, der einen Fehler gefunden hat, die Kollegin mit dem besseren Prompt – dieses Wissen gehört ins Team, nicht in die Schublade. Fünf Minuten Austausch im Teammeeting bringen oft mehr als jede neue Software.\n\nKurz gesagt: Qualität ist kein Zustand, sondern eine Gewohnheit. Die Schulung hat dir das Fundament gegeben – die tägliche Sorgfalt hält es tragfähig.",
        example:
          "Ein Team nutzt seit Monaten KI für Produktbeschreibungen – fehlerfrei, bis nach einem Tool-Update plötzlich technische Daten \"kreativ ergänzt\" werden. Aufgefallen ist es nur, weil eine Kollegin die Stichproben-Regel ernst nimmt: Jeden Freitag prüft sie drei zufällige Texte der Woche komplett. Sie findet erfundene Wattangaben bei zwei Produkten, das Team zieht die Texte zurück, bevor sie in den Webshop gehen, und meldet die Auffälligkeit. Ohne die Routine wären die falschen Daten live gegangen.",
        risk: "Die gefährlichste Phase der KI-Nutzung ist nicht der Anfang, sondern die Routine: Nachlassende Kontrolle plus blindes Vertrauen führt genau dann zu Fehlern, wenn niemand mehr damit rechnet.",
        memo: "Vertrauen ist gut, Stichprobe ist Pflicht – Qualität ist eine Gewohnheit, kein Zustand.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Warum bleibt die Stichprobenprüfung auch bei eingespielten KI-Routinen wichtig?",
            answer:
              "Weil sich KI-Tools durch Updates verändern können und nachlassende Kontrolle genau dann zu Fehlern führt, wenn niemand mehr damit rechnet.",
          },
          {
            question: "Welche Inhalte prüfst du immer vollständig, egal wie viel Routine du hast?",
            answer:
              "Alles mit Zahlen, Namen, rechtlichen Aussagen oder Außenwirkung – je höher der mögliche Schaden, desto gründlicher die Kontrolle.",
          },
        ],
      },
      {
        slug: "feedback-und-nachschulung",
        title: "Feedback geben und Nachschulung nutzen",
        goal: "Du weißt, warum dein Feedback die Schulung verbessert und wie du Nachschulung und Übungsmodus gezielt für dich nutzt.",
        content:
          "Zwei Werkzeuge machen aus einer einmaligen Schulung dauerhaftes Können: dein Feedback und die Nachschulung. Beide werden oft unterschätzt.\n\nWarum dein Feedback zählt: Nach dem Abschlusstest wirst du um eine kurze Bewertung gebeten – Verständlichkeit, Praxisnähe, Technik, Fairness des Tests. Das ist keine Höflichkeitsumfrage: Die Bewertungen werden systematisch ausgewertet. Wenn mehrere Teilnehmende dieselbe Lektion als unklar bewerten, wird sie überarbeitet. Wenn der Test als unfair empfunden wird, werden die Fragen geprüft. Dein ehrliches Feedback – auch das kritische, gerade das kritische – verbessert die Schulung für alle, die nach dir kommen.\n\nNachschulung ist kein Makel: Wenn du im Test in einzelnen Themenfeldern schwach warst, bekommst du gezielte Lektionsempfehlungen. Das ist kein Durchfallen light, sondern der effizienteste Weg zu lernen: Du wiederholst genau das, was dir fehlt – nicht alles noch einmal. Auch nach bestandenem Test lohnt der Blick in die Auswertung: 80 Prozent bestanden heißt auch 20 Prozent Luft nach oben.\n\nDer Übungsmodus für zwischendurch: Du kannst jederzeit freiwillig üben – falsch beantwortete Fragen wiederholen, schwache Kategorien trainieren oder eine komplette Testsimulation durchspielen. Fünf Minuten Übung vor dem echten Test nehmen mehr Nervosität als eine Stunde Grübeln.\n\nUnd langfristig? KI entwickelt sich schnell weiter – neue Tools, neue Regeln, neue Risiken. Die Schulung, die du gerade abschließt, ist der Startpunkt, nicht das Ende. Wenn deine Firma Auffrischungen oder neue Module anbietet: Nimm sie mit. KI-Kompetenz ist wie Erste Hilfe – man will sie aktuell halten, bevor man sie braucht.",
        example:
          "Herr Kowalski besteht den Test mit 78 Prozent, aber in der Kategorie Datenschutz lag er unter 60 Prozent. Die Plattform empfiehlt ihm zwei Lektionen zur Wiederholung. Er investiert 15 Minuten, versteht den Unterschied zwischen anonymisierten und personenbezogenen Daten diesmal wirklich – und zwei Wochen später fängt er im Alltag genau damit einen Fehler ab, bevor Kundendaten in ein Tool wandern. Im Feedback schreibt er, welche Lektion ihm unklar war; sie wird im nächsten Update präzisiert. Sein Test war Durchschnitt – sein Lernprozess vorbildlich.",
        risk: "Wer Nachschulung als Strafe versteht, verschenkt ihren Wert – und wer kein ehrliches Feedback gibt, lässt vermeidbare Schwächen der Schulung bestehen. Beides kostet am Ende die Qualität, von der alle profitieren.",
        memo: "Ehrliches Feedback verbessert die Schulung – gezielte Nachschulung verbessert dich.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Was passiert mit deinem Feedback nach der Schulung?",
            answer:
              "Es wird systematisch ausgewertet: Als unklar bewertete Inhalte werden überarbeitet, Hinweise auf unfaire Fragen werden geprüft – Feedback fließt direkt in die Verbesserung ein.",
          },
          {
            question: "Wofür ist die Nachschulung nach dem Test da?",
            answer:
              "Sie empfiehlt gezielt die Lektionen zu den Themenfeldern, in denen du schwach warst – effizientes Wiederholen statt alles von vorn.",
          },
        ],
      },
    ],
  },
  {
    slug: "abschluss",
    order: 17,
    title: "Abschlusstest und Zertifikat",
    description:
      "Alles Wichtige zum Abschlusstest, zur Bestehensgrenze und zu deinem Zertifikat.",
    lessons: [
      {
        slug: "abschlusstest-info",
        title: "So funktionieren Abschlusstest und Zertifikat",
        goal: "Du kennst den Ablauf des Abschlusstests, die Bestehensregeln und weißt, was dein Zertifikat aussagt.",
        content:
          "Du hast es fast geschafft – hier erfährst du, wie der Abschluss deiner Schulung abläuft.\n\nSchritt 1 – Alle Pflichtlektionen abschließen: Bevor du zum Test antreten kannst, müssen alle Pflichtlektionen der Module 1 bis 16 abgeschlossen sein. Deine Fortschrittsübersicht zeigt dir, ob noch etwas offen ist.\n\nSchritt 2 – Der Multiple-Choice-Test: Der Abschlusstest besteht aus 30 Multiple-Choice-Fragen, die sich auf alle Module verteilen. Gefragt wird genau das, was du in den Lektionen gelernt hast – vom Grundverständnis über Datenschutz und Halluzinationen bis zu den Grundzügen des EU AI Act. Die Bestehensgrenze liegt bei 75 Prozent, du musst also mindestens 23 der 30 Fragen richtig beantworten. Keine Sorge: Wenn es beim ersten Mal nicht klappt, kannst du den Test wiederholen. Nutze die Zeit dazwischen, um die Lektionen zu den Themen aufzufrischen, bei denen du unsicher warst – die Merksätze und Mini-Checks sind dafür ideal.\n\nSchritt 3 – Dein Zertifikat: Bei Bestehen wird automatisch dein persönliches Zertifikat erstellt. Es dokumentiert, wer wann welche Inhalte absolviert und den Test bestanden hat – genau der Nachweis, den dein Unternehmen für die Dokumentation der KI-Kompetenz nach Artikel 4 verwenden kann.\n\nZur ehrlichen Einordnung noch einmal in aller Klarheit: Dieses Zertifikat ist ein privater Schulungs- und Kompetenznachweis. Es ist keine staatliche Zulassung und keine behördliche Zertifizierung.\n\nViel Erfolg beim Test – du bist gut vorbereitet!",
        example:
          "Herr Steinbauer hat alle Pflichtlektionen abgeschlossen und startet den Test. Bei drei Fragen zum EU AI Act ist er unsicher und erreicht am Ende 70 Prozent – knapp unter der Grenze. Er wiederholt gezielt Modul 8 und 9, achtet dabei auf die Merksätze und tritt am nächsten Tag erneut an: 87 Prozent, bestanden. Sein Zertifikat wird automatisch erstellt, und die HR-Abteilung legt es in der Schulungsdokumentation ab.",
        risk: "Wer den Test nur mit Raten oder fremder Hilfe besteht, betrügt sich selbst: Die Wissenslücken bleiben und zeigen sich im Arbeitsalltag – genau dort, wo Fehler teuer werden. Nimm den Test als ehrliche Standortbestimmung.",
        memo: "Pflichtlektionen abschließen, 75 Prozent im Test erreichen, Zertifikat erhalten – und das Gelernte im Alltag anwenden.",
        durationMinutes: 5,
        required: true,
        miniChecks: [
          {
            question: "Welche Voraussetzungen gelten für den Abschlusstest?",
            answer:
              "Alle Pflichtlektionen müssen abgeschlossen sein. Der Test umfasst 30 Multiple-Choice-Fragen, die Bestehensgrenze liegt bei 75 Prozent, eine Wiederholung ist möglich.",
          },
          {
            question: "Was sagt das Zertifikat aus – und was nicht?",
            answer:
              "Es ist ein privater Schulungs- und Kompetenznachweis über die absolvierten Inhalte und den bestandenen Test. Es ist keine staatliche Zulassung und keine behördliche Zertifizierung.",
          },
        ],
      },
    ],
  },
];
