import type { SeedModule } from "./content-lessons";

/**
 * Kurs 2: „KI-Verantwortliche & KI-Beauftragte im Unternehmen"
 * 10 Module, 37 Lektionen. Zielgruppe: die Person, die den KI-Einsatz im
 * Unternehmen koordiniert und verantwortet (KI-Beauftragte, IT-/Compliance-
 * Verantwortliche, Geschäftsführung in KMU).
 * Didaktik wie Basic-Kurs: Lernziel, Erklärung, Praxisbeispiel, Risiko,
 * Merksatz, Mini-Checks. Aufbauend auf dem Basic-Kurs, aber eigenständig
 * absolvierbar.
 */
export const seedModulesOfficer: SeedModule[] = [
  {
    slug: "off-rolle-ki-beauftragte",
    order: 1,
    title: "Rolle und Auftrag der KI-Verantwortlichen",
    description:
      "Was eine KI-Verantwortliche oder ein KI-Beauftragter im Unternehmen leistet, welches Mandat die Rolle braucht und wo ihre Grenzen liegen.",
    lessons: [
      {
        slug: "off-rolle-und-auftrag",
        title: "Warum es eine verantwortliche Person für KI braucht",
        goal: "Du verstehst, warum KI-Einsatz im Unternehmen eine koordinierende Rolle braucht und was diese Rolle konkret leistet.",
        content:
          "KI-Nutzung im Unternehmen scheitert selten an der Technik – sie scheitert daran, dass niemand zuständig ist. Der Vertrieb nutzt Tool A, das Marketing Tool B, die Personalabteilung probiert gerade Tool C, und keiner weiß vom anderen. Genau hier setzt deine Rolle an.\n\nEine KI-verantwortliche Person bündelt, was sonst zersplittert: Sie hat den Überblick, welche KI-Systeme im Haus laufen. Sie sorgt dafür, dass es klare Regeln gibt und dass die Leute sie kennen. Sie ist die Anlaufstelle für Fragen, Tool-Wünsche und Vorfälle. Und sie hält die Nachweise zusammen, die das Unternehmen braucht – von Schulungsnachweisen bis zur Dokumentation der eingesetzten Systeme.\n\nWichtig für dein Selbstverständnis: Der EU AI Act schreibt keine bestimmte Funktionsbezeichnung wie \"KI-Beauftragter\" vor – anders als die DSGVO, die unter bestimmten Voraussetzungen einen Datenschutzbeauftragten verlangt. Aber die Pflichten aus dem AI Act treffen das Unternehmen trotzdem: KI-Kompetenz sicherstellen (Art. 4), Transparenzpflichten einhalten, verbotene Praktiken vermeiden, bei Hochrisiko-Systemen umfangreiche Betreiberpflichten erfüllen. Irgendjemand muss das organisieren – und Unternehmen, die diese Aufgabe bewusst einer Person oder einem kleinen Team zuweisen, sind messbar besser aufgestellt als die, bei denen es \"alle irgendwie mitmachen\".\n\nDeine Rolle ist dabei Koordination, nicht Alleinverantwortung: Die rechtliche Verantwortung trägt die Geschäftsleitung, Fachfragen klärst du mit Datenschutz, IT und Recht. Du bist die Person, die dafür sorgt, dass diese Fäden zusammenlaufen – nicht die, die alles selbst wissen und entscheiden muss.",
        example:
          "Ein Großhändler mit 80 Mitarbeitenden stellt bei einer internen Erhebung fest: 11 verschiedene KI-Tools sind im Einsatz, davon 7 ohne jede Prüfung, zwei Abteilungen haben sich widersprechende \"Regeln\" ausgedacht, und auf die Frage nach Schulungsnachweisen herrscht Schweigen. Die Geschäftsführung benennt eine KI-Verantwortliche mit klarem Auftrag: Inventar aufbauen, Tool-Freigaben bündeln, eine Richtlinie für alle, Schulungen organisieren. Sechs Monate später gibt es 4 freigegebene Tools, eine gelebte Richtlinie und vollständige Nachweise – mit einer Person, die zwei Tage pro Woche dafür Zeit bekommt.",
        risk: "Ohne zuständige Person entsteht organisierte Verantwortungslosigkeit: Jeder nutzt KI, niemand steuert sie, und im Ernstfall – Datenpanne, Behördenanfrage, Kundenreklamation – beginnt die Suche nach Zuständigkeiten erst, wenn es brennt.",
        memo: "KI-Governance braucht einen Namen und ein Gesicht – sonst macht sie niemand.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Schreibt der EU AI Act einen \"KI-Beauftragten\" als Funktion vor?",
            answer:
              "Nein, eine bestimmte Funktionsbezeichnung ist nicht vorgeschrieben. Die Pflichten treffen aber das Unternehmen – deshalb ist es sinnvoll, die Koordination bewusst einer Person oder einem Team zuzuweisen.",
          },
          {
            question: "Was ist der Kern der Rolle: Alleinverantwortung oder Koordination?",
            answer:
              "Koordination. Die rechtliche Verantwortung bleibt bei der Geschäftsleitung; die KI-verantwortliche Person sorgt dafür, dass Überblick, Regeln, Schulung und Nachweise zusammenlaufen.",
          },
        ],
      },
      {
        slug: "off-kompetenzprofil-schnittstellen",
        title: "Kompetenzprofil und Schnittstellen der Rolle",
        goal: "Du kennst die Fähigkeiten, die die Rolle braucht, und weißt, mit welchen Stellen im Unternehmen du eng zusammenarbeitest.",
        content:
          "Du musst kein Programmierer sein und kein Jurist. Was du wirklich brauchst, sind vier Dinge:\n\nGrundverständnis der Technik: Du solltest erklären können, was generative KI kann und was nicht, warum Halluzinationen entstehen und warum Eingaben in fremde Systeme heikel sind – auf dem Niveau des Basic-Kurses, nur sicherer. Du musst kein Modell trainieren können.\n\nProzessdenken: Deine Hauptarbeit sind Abläufe: Wie kommt ein neues Tool sauber ins Haus? Wie läuft eine Vorfallsmeldung? Wer gibt was frei? Wer gut strukturieren kann, ist hier stark.\n\nKommunikationsfähigkeit: Du übersetzt zwischen Welten – Geschäftsführung (\"Was kostet uns das, was bringt es?\"), Mitarbeitende (\"Was darf ich konkret?\"), IT und Datenschutz (\"Welche Anforderungen gelten?\"). Verständlich erklären ist die halbe Rolle.\n\nHartnäckigkeit ohne Alarmismus: Du wirst Dinge einfordern müssen – Nachweise, Prüfungen, Geduld vor Tool-Käufen. Wer nur warnt, wird ignoriert; wer nur durchwinkt, ist nutzlos. Die Kunst ist das ehrliche \"Ja, und zwar so sicher\".\n\nDeine wichtigsten Schnittstellen:\n\nGeschäftsleitung: gibt dir Mandat und Budget, trägt die Letztverantwortung, braucht von dir klare Entscheidungsvorlagen statt Fachchinesisch.\n\nDatenschutz(-beauftragte): Pflichtpartner bei allem, was personenbezogene Daten berührt – von der Tool-Prüfung bis zur Vorfallsmeldung. Klärt eure Aufgabenteilung früh und schriftlich.\n\nIT: setzt technische Kontrollen um (Zugänge, Sperren, Monitoring) und kennt die Systemlandschaft.\n\nBetriebsrat/Personalvertretung (falls vorhanden): KI-Systeme, die Mitarbeitende betreffen könnten, frühzeitig ansprechen – Überraschungen vergiften das Klima.\n\nFachabteilungen: Sie wissen, wo KI wirklich Nutzen bringt. Behandle sie als Kunden deiner Governance, nicht als Regelbrecher in spe.",
        example:
          "Ein neu benannter KI-Beauftragter startet mit einer simplen Runde: je 30 Minuten mit Geschäftsführung, Datenschutzbeauftragter, IT-Leiter und den drei größten Fachabteilungen. Ergebnis: Die Datenschutzbeauftragte übernimmt die AVV-Prüfungen, die IT baut die Tool-Zugänge, der Vertrieb liefert die dringendsten Anwendungsfälle – und die Geschäftsführung gibt schriftlich frei, dass Tool-Entscheidungen über seinen Tisch laufen. Nach einer Woche hat er, wofür andere ein Jahr brauchen: ein funktionierendes Netzwerk statt eines Einzelkämpfer-Postens.",
        risk: "Die Rolle scheitert am häufigsten an unklaren Schnittstellen: Wenn Datenschutz, IT und KI-Verantwortliche ihre Aufgabenteilung nicht klären, bleiben Prüfungen doppelt, dreifach – oder gar nicht – erledigt.",
        memo: "Du musst nicht alles können – du musst wissen, wer was kann, und es zusammenführen.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche vier Kernfähigkeiten braucht die Rolle?",
            answer:
              "Technisches Grundverständnis, Prozessdenken, Kommunikationsfähigkeit über Hierarchien hinweg und Hartnäckigkeit ohne Alarmismus.",
          },
          {
            question: "Warum ist die Datenschutz-Schnittstelle besonders wichtig?",
            answer:
              "Weil fast jede KI-Frage personenbezogene Daten berühren kann – von der Tool-Prüfung bis zum Vorfall. Die Aufgabenteilung sollte früh und schriftlich geklärt werden.",
          },
        ],
      },
      {
        slug: "off-mandat-und-grenzen",
        title: "Mandat, Ressourcen und Grenzen der Rolle",
        goal: "Du weißt, welches Mandat du von der Geschäftsleitung brauchst, und kannst die Grenzen deiner Rolle klar benennen.",
        content:
          "Eine KI-verantwortliche Person ohne Mandat ist ein Feigenblatt. Bevor du die Rolle ernsthaft ausübst, kläre vier Dinge schriftlich:\n\nErstens – der Auftrag: Was genau sollst du verantworten? Typisch: KI-Inventar führen, Tool-Freigaben koordinieren, Richtlinie pflegen, Schulungen organisieren, Vorfälle koordinieren, Management berichten. Was davon gehört dir, was bleibt bei anderen?\n\nZweitens – die Befugnisse: Darfst du eine Tool-Nutzung stoppen, wenn du ein ernstes Risiko siehst? Bekommst du Auskunft von allen Abteilungen? Ohne Eingriffsrechte bist du Berater, nicht Verantwortlicher – auch das kann funktionieren, muss aber allen klar sein.\n\nDrittens – die Ressourcen: Zeit ist die härteste Währung. Als Faustregel für KMU: Aufbauphase deutlich mehr, Regelbetrieb je nach Größe ein fester Wochenanteil. Eine Rolle, die \"nebenbei in der Mittagspause\" laufen soll, wird scheitern – sag das der Geschäftsleitung ehrlich, bevor du sie annimmst.\n\nViertens – die Berichtslinie: Du brauchst direkten Zugang zur Geschäftsleitung, mindestens quartalsweise, plus Ad-hoc-Zugang bei ernsten Vorfällen. Wer über drei Hierarchieebenen berichtet, dessen Warnungen kommen als Flüsterpost an.\n\nUnd die Grenzen? Genauso wichtig wie das Mandat: Du bist nicht der Datenschutzbeauftragte (dessen Rolle hat eigene gesetzliche Anforderungen und Unabhängigkeit), nicht die Rechtsabteilung und nicht die Person, die jede fachliche Einzelentscheidung trifft. Bei echten Rechtsfragen – Vertragsklauseln, Haftung, arbeitsrechtliche Themen – holst du fachlichen und im Zweifel externen Rat. Das offen zu sagen, ist Stärke: Nichts untergräbt die Rolle schneller als selbstgebastelte Rechtsauskünfte, die sich als falsch herausstellen.",
        example:
          "Frau Steiner soll KI-Beauftragte eines Produktionsbetriebs werden. Statt sofort zuzusagen, legt sie der Geschäftsführung eine einseitige Rollenbeschreibung vor: Aufgaben, Befugnisse (Tool-Stopp bei ernstem Risiko, Auskunftsrecht), ein fester Wochentag für die Rolle, Quartalsbericht direkt an die Geschäftsführung, klare Abgrenzung zum externen Datenschutzbeauftragten. Die Geschäftsführung streicht einen Punkt, ergänzt einen anderen – und unterschreibt. Als sechs Monate später ein Bereichsleiter ihre Tool-Nachfrage ignoriert, genügt ein Verweis auf das unterschriebene Mandat.",
        risk: "Ein Feigenblatt-Mandat ist gefährlicher als gar keines: Das Unternehmen wiegt sich in Sicherheit (\"wir haben ja jemanden\"), während die Person weder Zeit noch Befugnisse hat, tatsächlich etwas zu bewirken.",
        memo: "Erst das Mandat, dann die Rolle – Auftrag, Befugnisse, Zeit und Berichtslinie gehören schriftlich fixiert.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche vier Punkte sollten vor Übernahme der Rolle schriftlich geklärt sein?",
            answer:
              "Der konkrete Auftrag, die Befugnisse (z. B. Tool-Stopp, Auskunftsrechte), die verfügbare Zeit/Ressourcen und die direkte Berichtslinie zur Geschäftsleitung.",
          },
          {
            question: "Warum solltest du bei echten Rechtsfragen externen oder fachlichen Rat holen?",
            answer:
              "Weil die Rolle Koordination leistet, keine Rechtsberatung. Falsche selbstgebastelte Rechtsauskünfte untergraben die Glaubwürdigkeit der Rolle und schaffen Haftungsrisiken.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-ai-act-vertiefung",
    order: 2,
    title: "EU AI Act für Verantwortliche: Systematik und Pflichten",
    description:
      "Der risikobasierte Ansatz im Detail: Risikoklassen, verbotene Praktiken, Hochrisiko-Pflichten und Transparenzregeln – aus Sicht der Person, die sie im Unternehmen umsetzen muss.",
    lessons: [
      {
        slug: "off-systematik-risikoklassen",
        title: "Die Systematik: risikobasierter Ansatz und Risikoklassen",
        goal: "Du kannst die Risikoklassen des EU AI Act erklären und typische Unternehmens-Anwendungen der richtigen Klasse zuordnen.",
        content:
          "Der EU AI Act (Verordnung (EU) 2024/1689) reguliert nicht \"die KI\", sondern konkrete Einsatzzwecke – je riskanter der Einsatz, desto strenger die Regeln. Diese Logik musst du im Schlaf beherrschen, denn sie entscheidet über alles Weitere.\n\nDie Stufen:\n\nVerbotene Praktiken: Eine kurze Liste von Einsätzen, die als unvereinbar mit Grundrechten gelten – etwa Social Scoring durch Behörden, gezielte unterschwellige Manipulation, die Menschen erheblich schadet, oder das ungezielte Auslesen von Gesichtsbildern für Datenbanken. Für dich relevant: prüfen, dass nichts im Haus auch nur in die Nähe kommt.\n\nHochrisiko-Systeme: KI in sensiblen Bereichen – z. B. bei der Personalauswahl, Kreditwürdigkeitsprüfung, kritischer Infrastruktur, Bildungszugang oder als Sicherheitskomponente regulierter Produkte. Hier gelten die umfangreichsten Pflichten: Risikomanagement, Datenqualität, Dokumentation, menschliche Aufsicht, Genauigkeit und Robustheit. Die meisten Pflichten treffen die Anbieter; aber auch Betreiber haben klare Pflichten (dazu später mehr).\n\nTransparenzpflichtige Systeme: Chatbots, KI-generierte Inhalte, Deepfakes und Emotionserkennung – hier gilt vor allem: Menschen müssen erkennen können, dass KI im Spiel ist.\n\nMinimales Risiko: Der große Rest – Rechtschreibhilfen, Übersetzungen, die meisten Büro-Assistenten. Keine besonderen Pflichten aus dem AI Act, aber natürlich gelten weiter DSGVO, Urheberrecht und interne Regeln. Und für alle Klassen gilt Art. 4: Die Mitarbeitenden brauchen ausreichende KI-Kompetenz.\n\nDein Handwerkszeug daraus: Jede KI-Anwendung im Haus bekommt eine Einstufung. Für die allermeisten KMU-Anwendungen lautet sie \"minimales Risiko\" oder \"transparenzpflichtig\" – aber genau die Ausnahmen (ein Bewerber-Screening-Tool! ein Kredit-Scoring!) musst du erkennen, bevor sie live gehen.",
        example:
          "Ein Handelsunternehmen inventarisiert seine KI-Nutzung und stuft ein: Text-Assistent fürs Marketing – minimales Risiko, interne Regeln genügen. Kundenservice-Chatbot – transparenzpflichtig, muss sich als KI zu erkennen geben. Ein angebotenes Tool, das Bewerbungen automatisch vorsortiert und bewertet – Achtung: Personalauswahl ist Hochrisiko-Terrain mit erheblichen Pflichten. Die Geschäftsführung entscheidet nach der Vorlage der KI-Verantwortlichen: Die ersten beiden ja, das Recruiting-Tool erst nach vertiefter Prüfung – wenn überhaupt.",
        risk: "Die teuerste Fehleinschätzung ist das übersehene Hochrisiko-System: Wer ein Bewerber-Screening oder Scoring \"einfach mal einführt\", holt sich Pflichten ins Haus, die er nicht erfüllt – mit empfindlichen Bußgeldern und Reputationsschäden im Ernstfall.",
        memo: "Nicht die Technik wird reguliert, sondern der Einsatzzweck – je riskanter, desto strenger.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Welche Risikostufen kennt der EU AI Act?",
            answer:
              "Verbotene Praktiken, Hochrisiko-Systeme, transparenzpflichtige Systeme und minimales Risiko – plus die übergreifende KI-Kompetenzpflicht nach Art. 4.",
          },
          {
            question: "Warum ist ein Tool zur automatischen Bewerber-Vorsortierung besonders kritisch?",
            answer:
              "Weil KI im Bereich Beschäftigung/Personalauswahl zu den Hochrisiko-Anwendungen gehört – mit umfangreichen Pflichten, die vor der Einführung geprüft werden müssen.",
          },
        ],
      },
      {
        slug: "off-verbotene-praktiken-vertieft",
        title: "Verbotene Praktiken: die roten Linien kennen",
        goal: "Du kennst die wichtigsten verbotenen KI-Praktiken und erkennst, wo scheinbar harmlose Ideen in verbotenes Terrain führen.",
        content:
          "Die verbotenen Praktiken (Art. 5 AI Act) wirken auf den ersten Blick weit weg vom Büroalltag – Social Scoring, Manipulation, biometrische Massenüberwachung macht doch niemand bei uns? Vorsicht: Die roten Linien verlaufen näher, als viele denken.\n\nDie wichtigsten Verbote in Alltagssprache:\n\nUnterschwellige Manipulation und Ausnutzung von Schwächen: KI, die Menschen gezielt manipuliert oder die Schwächen besonders verletzlicher Gruppen (Alter, Behinderung, soziale Lage) ausnutzt und ihnen dadurch erheblichen Schaden zufügt. Grenznah wird es bei aggressiven, KI-optimierten Verkaufs- und Suchtmechaniken.\n\nSocial Scoring: Die umfassende Bewertung von Personen anhand ihres Sozialverhaltens mit unverhältnismäßigen Folgen in anderen Lebensbereichen. Grenznah: interne \"Mitarbeiter-Scores\", die Verhalten aus verschiedensten Quellen zusammenziehen und über Beförderung oder Kündigung mitentscheiden.\n\nEmotionserkennung am Arbeitsplatz und in Bildungseinrichtungen: KI, die Emotionen von Mitarbeitenden erkennt oder erkennen soll, ist dort grundsätzlich verboten (enge Ausnahmen für Medizin und Sicherheit). Das trifft real angebotene Produkte – etwa \"Stimmungsanalyse\" in Callcentern oder Video-Interviews mit \"Emotionsauswertung\".\n\nBiometrische Kategorisierung nach sensiblen Merkmalen und ungezieltes Scraping von Gesichtsbildern: ebenfalls verboten.\n\nWas heißt das praktisch für dich? Erstens: Bei jedem Tool, das Menschen bewertet, überwacht oder analysiert, schrillen die Alarmglocken – hier prüfst du besonders gründlich, was das Tool wirklich tut. Zweitens: Anbieter-Marketing schützt dich nicht. Wenn ein Tool \"Engagement-Monitoring\" verkauft und tatsächlich Emotionserkennung am Arbeitsplatz betreibt, ist der Einsatz das Problem deines Unternehmens. Drittens: Die Bußgelder für verbotene Praktiken sind die höchsten des gesamten Gesetzes – bis zu 35 Millionen Euro oder 7 % des weltweiten Jahresumsatzes.",
        example:
          "Einem Callcenter-Betreiber wird ein Tool angeboten, das \"in Echtzeit die Stimmung der Agents analysiert, um Coaching-Bedarf zu erkennen\" – per Stimm- und Gesichtsanalyse. Klingt nach Fürsorge, ist aber Emotionserkennung am Arbeitsplatz und damit verboten. Die KI-Verantwortliche lehnt ab und dokumentiert die Entscheidung. Der Anbieter verweist auf \"viele zufriedene Kunden\" – was am Verbot nichts ändert. Stattdessen führt das Unternehmen freiwillige, anonyme Team-Feedbackrunden ein: Das eigentliche Ziel (Coaching-Bedarf erkennen) geht auch ohne Grundrechtsverletzung.",
        risk: "Verbotene Praktiken kommen selten mit dem Etikett \"verboten\" ins Haus – sie heißen \"Engagement-Analyse\", \"Smart Monitoring\" oder \"Wellbeing-Tracking\". Wer nur auf Produktnamen schaut statt auf die tatsächliche Funktion, kauft sich die höchsten Bußgelder des AI Act ein.",
        memo: "Tools, die Menschen bewerten, überwachen oder durchleuchten, sind immer Chefsache der Prüfung – egal wie freundlich das Marketing klingt.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Warum ist \"Stimmungsanalyse\" von Mitarbeitenden im Callcenter problematisch?",
            answer:
              "Weil Emotionserkennung am Arbeitsplatz nach dem AI Act grundsätzlich verboten ist – unabhängig davon, wie das Produkt vermarktet wird (enge Ausnahmen nur für Medizin/Sicherheit).",
          },
          {
            question: "Wie hoch können Bußgelder bei verbotenen Praktiken sein?",
            answer:
              "Bis zu 35 Millionen Euro oder 7 % des weltweiten Jahresumsatzes – die höchste Bußgeldstufe des AI Act.",
          },
        ],
      },
      {
        slug: "off-hochrisiko-pflichten",
        title: "Hochrisiko-KI: Pflichten für Anbieter und Betreiber",
        goal: "Du kennst die Kernpflichten bei Hochrisiko-Systemen und weißt, was auf dein Unternehmen zukommt, wenn es ein solches System betreibt.",
        content:
          "Hochrisiko heißt nicht verboten – es heißt: nur mit Sicherheitsgurt. Die Liste der Hochrisiko-Bereiche (Anhang III des AI Act) umfasst unter anderem: Beschäftigung und Personalmanagement (Bewerberauswahl, Beförderungsentscheidungen, Aufgabenzuweisung durch Algorithmen), Kreditwürdigkeitsprüfung und Versicherungstarifierung, Zugang zu Bildung, kritische Infrastruktur, Strafverfolgung und Migration.\n\nDie Anbieter solcher Systeme tragen die Hauptlast: Risikomanagementsystem über den gesamten Lebenszyklus, hochwertige Trainingsdaten, technische Dokumentation, Protokollierung, menschliche Aufsicht ermöglichen, Genauigkeit und Robustheit nachweisen, Konformitätsbewertung durchlaufen.\n\nAber – und das betrifft dich direkt – auch Betreiber haben handfeste Pflichten: Das System gemäß Gebrauchsanweisung verwenden. Menschliche Aufsicht durch kompetente, geschulte Personen sicherstellen. Relevante, repräsentative Eingabedaten gewährleisten, soweit ihr sie kontrolliert. Betrieb überwachen und bei Problemen den Anbieter informieren, schwerwiegende Vorfälle melden. Automatisch erzeugte Protokolle aufbewahren. Beschäftigte und ggf. Betroffene informieren, bevor ein Hochrisiko-System bei ihnen eingesetzt wird. Und in bestimmten Fällen – etwa bei Entscheidungen über Personen – muss auf Verlangen eine klare Erklärung der Rolle des KI-Systems her.\n\nDeine Übersetzung als Verantwortliche(r): Ein Hochrisiko-System einzuführen ist ein Projekt, kein Einkauf. Vor dem \"Ja\" stehen Fragen wie: Haben wir die Gebrauchsanweisung wirklich gelesen und können wir sie einhalten? Wer übt die menschliche Aufsicht aus, und ist diese Person dafür geschult und befugt, einzugreifen? Wie archivieren wir Protokolle? Wer meldet Vorfälle an wen? Wenn dein Unternehmen diese Fragen nicht beantworten kann, ist es für dieses System (noch) nicht bereit – so ehrlich musst du sein.",
        example:
          "Ein Personaldienstleister erwägt eine KI, die Bewerbungen automatisch vorsortiert. Die KI-Verantwortliche macht daraus ein strukturiertes Projekt: Anbieter nach Konformitätsunterlagen und Gebrauchsanweisung gefragt, menschliche Aufsicht definiert (zwei geschulte Recruiterinnen prüfen jede automatische Aussortierung), Information der Bewerber in den Prozess eingebaut, Protokollarchivierung mit der IT geklärt, Betriebsrat eingebunden. Erst als alle Punkte stehen, geht das System live – vier Monate später als vom Vertrieb des Anbieters versprochen, aber belastbar.",
        risk: "Die typische KMU-Falle: Ein Hochrisiko-System wird als \"normales Software-Abo\" eingekauft, niemand liest die Gebrauchsanweisung, die \"menschliche Aufsicht\" ist ein Feigenblatt-Klick. Damit verletzt das Unternehmen Betreiberpflichten – und steht bei Fehlentscheidungen des Systems ohne Verteidigung da.",
        memo: "Hochrisiko-KI einführen ist ein Projekt mit Pflichtenheft – kein Software-Abo.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Nenne drei Betreiberpflichten bei Hochrisiko-KI.",
            answer:
              "Zum Beispiel: Nutzung gemäß Gebrauchsanweisung, geschulte menschliche Aufsicht, Überwachung des Betriebs und Meldung schwerwiegender Vorfälle, Aufbewahrung der Protokolle, Information der Beschäftigten und Betroffenen.",
          },
          {
            question: "Welche Bereiche gehören unter anderem zu den Hochrisiko-Anwendungen?",
            answer:
              "Unter anderem Beschäftigung/Personalauswahl, Kreditwürdigkeitsprüfung, Zugang zu Bildung, kritische Infrastruktur, Strafverfolgung und Migration.",
          },
        ],
      },
      {
        slug: "off-gpai-transparenzpflichten",
        title: "Generative KI, GPAI und Transparenzpflichten",
        goal: "Du verstehst, welche Regeln für generative KI-Modelle und ihre Nutzung gelten und welche Transparenzpflichten dein Unternehmen konkret treffen.",
        content:
          "Die Modelle hinter ChatGPT, Copilot & Co. heißen im AI Act \"KI-Modelle mit allgemeinem Verwendungszweck\" (General Purpose AI, GPAI). Für deren Anbieter gelten eigene Pflichten: technische Dokumentation, Informationen für nachgelagerte Anbieter, eine Strategie zur Achtung des EU-Urheberrechts und eine Zusammenfassung der Trainingsinhalte; bei besonders leistungsfähigen Modellen mit systemischem Risiko kommen verschärfte Pflichten dazu.\n\nWarum dich das interessiert, obwohl dein Unternehmen kein Modell baut: Erstens hilft dir das Wissen bei der Anbieterauswahl – seriöse Anbieter können ihre AI-Act-Konformität darlegen; wer auf solche Fragen keine Antworten hat, fällt durch. Zweitens gibt es eine wichtige Grenze: Wer ein GPAI-Modell wesentlich verändert oder unter eigenem Namen als Hochrisiko-System einsetzt, kann selbst in die Anbieterrolle rutschen – dazu mehr im Rollen-Modul.\n\nDie Transparenzpflichten (Art. 50) betreffen dagegen fast jedes Unternehmen direkt:\n\nChatbots und KI-Interaktion: Menschen müssen erkennen können, dass sie mit einer KI kommunizieren – dein Kundenservice-Bot braucht die klare Selbstauskunft.\n\nKI-generierte Inhalte: Anbieter müssen KI-Ausgaben maschinenlesbar als solche kennzeichnen (z. B. Wasserzeichen-Technologien). Für dein Unternehmen praktisch relevanter: Deepfakes – täuschend echte KI-Bilder, -Videos oder -Audios realer Personen, Orte oder Ereignisse – müssen als künstlich erzeugt offengelegt werden. Auch KI-generierte oder -manipulierte Texte, die die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse informieren, brauchen grundsätzlich einen Hinweis.\n\nFür deinen Alltag heißt das: Baue die Transparenz in die Prozesse ein, statt sie dem Einzelfall zu überlassen – Chatbot-Vorlagen mit KI-Hinweis, Kennzeichnungsregeln in der Richtlinie, Freigabe-Checklisten mit dem Punkt \"Kennzeichnung nötig?\". Dann passiert Transparenz automatisch statt zufällig.",
        example:
          "Ein Verlag nutzt generative KI für Illustrationen und einen Website-Chatbot. Die KI-Verantwortliche verankert drei Standards: Der Chatbot beginnt jedes Gespräch mit \"Ich bin der digitale Assistent (KI)\", realistische KI-Bilder tragen den Hinweis \"Bild KI-generiert\" im Bildnachweis, und die Freigabe-Checkliste für Veröffentlichungen enthält den Pflichtpunkt \"KI-Kennzeichnung geprüft\". Als ein Redakteur ein täuschend echtes KI-Bild eines realen Stadtplatzes verwenden will, greift die Checkliste – Kennzeichnung dran, kein Problem.",
        risk: "Transparenzpflichten werden selten vorsätzlich verletzt, sondern vergessen – der Chatbot ohne Hinweis, das realistische KI-Bild ohne Kennzeichnung. Ohne feste Prozessverankerung hängt die Rechtstreue vom Gedächtnis einzelner Mitarbeitender ab.",
        memo: "Transparenz gehört in den Prozess, nicht ins Gedächtnis – Vorlagen und Checklisten statt Einzelfall-Erinnerung.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Was verlangt Art. 50 AI Act bei Chatbots?",
            answer:
              "Menschen müssen erkennen können, dass sie mit einem KI-System kommunizieren – der Chatbot muss sich als KI zu erkennen geben, sofern es nicht offensichtlich ist.",
          },
          {
            question: "Warum solltest du GPAI-Anbieterpflichten kennen, obwohl ihr kein Modell entwickelt?",
            answer:
              "Für die Anbieterauswahl (Konformität erfragen) und um die Grenze zu kennen: Wer Modelle wesentlich verändert oder umwidmet, kann selbst in die Anbieterrolle mit deren Pflichten rutschen.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-rollen-wertschoepfung",
    order: 3,
    title: "Anbieter, Betreiber & Co.: Rollen und ihre Pflichten",
    description:
      "Wer im AI Act welche Pflichten trägt, wie du die Rolle deines Unternehmens je Anwendung bestimmst und welche Fallen zum ungewollten Rollenwechsel führen.",
    lessons: [
      {
        slug: "off-anbieter-betreiber-abgrenzung",
        title: "Rollenbestimmung: Wer ist Anbieter, wer Betreiber?",
        goal: "Du kannst für jede KI-Anwendung im Unternehmen bestimmen, welche AI-Act-Rolle dein Unternehmen einnimmt – und damit, welche Pflichten gelten.",
        content:
          "Der AI Act verteilt Pflichten nach Rollen – und dieselbe Firma kann je nach Anwendung unterschiedliche Rollen haben. Die Rollenbestimmung ist deshalb keine akademische Übung, sondern der erste Schritt jeder Pflichtenanalyse.\n\nDie Hauptrollen:\n\nAnbieter (Provider): Entwickelt ein KI-System oder lässt es entwickeln und bringt es unter eigenem Namen oder eigener Marke in Verkehr bzw. nimmt es in Betrieb. Trägt die umfangreichsten Pflichten – vor allem bei Hochrisiko-Systemen.\n\nBetreiber (Deployer): Verwendet ein KI-System in eigener Verantwortung im beruflichen Kontext. Das ist die Standardrolle der meisten Unternehmen: Ihr nutzt ChatGPT, Copilot oder ein Branchentool – ihr seid Betreiber. Pflichten: kompetente Nutzung (Art. 4!), bei Hochrisiko die Betreiberpflichten aus dem vorigen Modul, Transparenzregeln beachten.\n\nEinführer und Händler: Bringen KI-Systeme aus Drittländern in die EU bzw. stellen sie auf dem Markt bereit – mit eigenen Prüf- und Sorgfaltspflichten. Für dich relevant, wenn dein Unternehmen KI-Produkte weiterverkauft oder aus Nicht-EU-Ländern bezieht.\n\nWichtig: keine Rolle, keine Pause. Auch die reine private Nutzung durch Mitarbeitende auf Firmengeräten oder mit Firmendaten fällt in deinen Governance-Bereich – nicht weil der AI Act sie regelt, sondern weil Datenschutz und Geheimnisschutz keine Rollenfragen kennen.\n\nDeine Methode für die Praxis: Stelle je Anwendung drei Fragen. Erstens: Wer hat das System entwickelt und unter wessen Namen läuft es? Zweitens: Nutzen wir es nur, oder bieten wir es (auch) anderen an? Drittens: Haben wir es verändert, umbenannt oder für einen anderen Zweck eingesetzt als vorgesehen? Aus den Antworten ergibt sich die Rolle – und aus der Rolle das Pflichtenpaket. Dokumentiere die Einstufung im KI-Inventar; bei Grenzfällen hol dir rechtlichen Rat.",
        example:
          "Ein Softwarehaus nutzt intern Copilot (Rolle: Betreiber), verkauft seinen Kunden aber auch ein eigenes Produkt mit eingebauter Sprachmodell-Funktion unter eigener Marke (Rolle: Anbieter dieses Systems!) und vertreibt zusätzlich das KI-Tool eines US-Herstellers exklusiv in Österreich (Rolle: Einführer). Drei Anwendungen, drei Rollen, drei völlig verschiedene Pflichtenpakete. Die KI-Verantwortliche dokumentiert alle drei im Inventar – und zieht für das eigene Produkt und die Einführer-Rolle externe Rechtsberatung bei.",
        risk: "Wer die Rollenfrage überspringt, wendet automatisch das falsche Pflichtenprogramm an – meist das zu laxe. Besonders gefährlich: nicht zu bemerken, dass man für ein Produkt längst Anbieter ist, während man sich als harmloser Nutzer fühlt.",
        memo: "Erst die Rolle klären, dann die Pflichten – dieselbe Firma kann je Anwendung Anbieter, Betreiber oder Einführer sein.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche Rolle hat ein Unternehmen, das ein fremdes KI-Tool im Arbeitsalltag nutzt?",
            answer:
              "Betreiber (Deployer) – mit Pflichten wie kompetenter Nutzung, Transparenzregeln und (bei Hochrisiko) den besonderen Betreiberpflichten.",
          },
          {
            question: "Mit welchen drei Fragen bestimmst du die Rolle je Anwendung?",
            answer:
              "Wer hat es entwickelt / unter wessen Namen läuft es? Nutzen wir es nur oder bieten wir es anderen an? Haben wir es verändert oder zweckentfremdet?",
          },
        ],
      },
      {
        slug: "off-rollenwechsel-fallstricke",
        title: "Der ungewollte Rollenwechsel: Wann Betreiber zu Anbietern werden",
        goal: "Du erkennst die Konstellationen, in denen dein Unternehmen ungewollt vom Betreiber zum Anbieter wird – und die volle Pflichtenlast übernimmt.",
        content:
          "Die gefährlichste Stelle im Rollensystem ist der schleichende Rollenwechsel: Ein Unternehmen startet als harmloser Nutzer und wird – ohne es zu merken – rechtlich zum Anbieter. Beim Hochrisiko-Bereich nennt der AI Act die Fälle ausdrücklich; als Leitplanken solltest du diese Muster kennen:\n\nEigene Marke draufsetzen: Ihr nehmt ein eingekauftes Hochrisiko-System und vermarktet es unter eurem Namen oder eurer Marke. Damit übernehmt ihr die Anbieterpflichten – der Kunde sieht euch, nicht den ursprünglichen Hersteller.\n\nWesentliche Veränderung: Ihr verändert ein Hochrisiko-System so substanziell, dass es anders funktioniert oder neue Risiken entstehen.\n\nZweckänderung in den Hochrisiko-Bereich: Ihr setzt ein System, das für harmlose Zwecke gedacht war, für einen Hochrisiko-Zweck ein – etwa ein allgemeines Textanalyse-Tool plötzlich zur automatischen Bewerberbewertung. Auch so kann man zum Anbieter des \"neuen\" Hochrisiko-Systems werden.\n\nWarum das im Alltag schneller passiert, als man denkt: Die Fachabteilung \"pimpt\" ein Tool mit eigenen Skripten. Das Marketing lässt das Produkt-Logo auf die eingekaufte KI-Lösung setzen, weil es schöner aussieht. Ein findiger Kollege entdeckt, dass sich der Chatbot-Baukasten auch für Bewerber-Interviews eignet. Jede dieser Alltagsentscheidungen kann eine Rollen- und damit Pflichtenlawine auslösen.\n\nDeine Schutzmaßnahmen: Erstens eine klare Regel in der KI-Richtlinie: Zweckänderungen, wesentliche Anpassungen und jedes \"Umbranding\" von KI-Systemen brauchen deine Freigabe. Zweitens die Frage im Freigabeprozess: \"Weicht der geplante Einsatz vom vorgesehenen Zweck des Herstellers ab?\" Drittens: Bei allem, was in Richtung Anbieterrolle geht, externen Rechtsrat einholen, bevor Fakten geschaffen werden – die Anbieterpflichten bei Hochrisiko sind kein Nebenbei-Projekt.",
        example:
          "Ein Beratungsunternehmen kauft einen KI-Chatbot-Baukasten und baut damit einen internen FAQ-Bot – unkritisch. Monate später will ein Partner denselben Baukasten nutzen, um Kandidaten-Interviews \"automatisiert vorzuqualifizieren\" und das Ganze den eigenen Kunden als \"SmartRecruit powered by [Firma]\" anzubieten. Die KI-Verantwortliche stoppt das Vorhaben: Zweckänderung in den Hochrisiko-Bereich plus eigene Marke – das Unternehmen würde zum Anbieter eines Hochrisiko-Systems mit voller Pflichtenlast. Nach der Rechtsberatung entscheidet die Partnerschaft: Das Geschäftsmodell lohnt den Aufwand nicht.",
        risk: "Der ungewollte Rollenwechsel ist deshalb so tückisch, weil ihn keine einzelne \"große\" Entscheidung auslöst, sondern viele kleine: ein Logo, ein Skript, ein neuer Einsatzzweck. Ohne Freigabe-Gate merkt es das Unternehmen erst, wenn ein Kunde oder eine Behörde fragt, wo denn die Konformitätsunterlagen sind.",
        memo: "Eigene Marke, wesentliche Änderung oder neuer Hochrisiko-Zweck = mögliche Anbieterrolle. Immer stoppen, prüfen, freigeben.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche drei Muster können aus einem Betreiber einen Anbieter machen?",
            answer:
              "Das System unter eigenem Namen/eigener Marke vermarkten, es wesentlich verändern oder es für einen (neuen) Hochrisiko-Zweck einsetzen.",
          },
          {
            question: "Welche Schutzmaßnahme verhindert den ungewollten Rollenwechsel am wirksamsten?",
            answer:
              "Ein Freigabe-Gate: Zweckänderungen, wesentliche Anpassungen und Umbranding brauchen die Freigabe der KI-Verantwortlichen – bei Anbieter-Tendenz zusätzlich Rechtsrat.",
          },
        ],
      },
      {
        slug: "off-einfuehrer-haendler-privat",
        title: "Einführer, Händler und die private Nutzung durch Mitarbeitende",
        goal: "Du kennst die Pflichten beim Import und Weiterverkauf von KI-Systemen und weißt, wie du die private KI-Nutzung der Mitarbeitenden sauber abgrenzt.",
        content:
          "Zwei Randbereiche, die in der Praxis regelmäßig unterschätzt werden:\n\nEinführer und Händler: Sobald dein Unternehmen KI-Systeme aus Drittländern in die EU holt (Einführer) oder KI-Produkte anderer auf dem Markt bereitstellt (Händler), gelten eigene Sorgfaltspflichten – bei Hochrisiko-Systemen etwa prüfen, ob der Anbieter die Konformitätsbewertung durchlaufen hat, ob CE-Kennzeichnung und Dokumentation vorliegen, und bei begründeten Zweifeln: nicht bereitstellen. Für dich heißt das: Wenn euer Geschäftsmodell den Weiterverkauf oder die Integration von KI-Produkten umfasst, gehört die AI-Act-Prüfung in den Einkaufs- und Partnerprozess – nicht erst in die Reklamationsabteilung.\n\nPrivate Nutzung durch Mitarbeitende: Der AI Act nimmt die rein persönliche, nicht berufliche Nutzung von den Betreiberpflichten aus. Aber Vorsicht vor dem Fehlschluss \"privat = nicht mein Problem\": Sobald Mitarbeitende private KI-Konten für Firmenaufgaben nutzen, ist es keine private Nutzung mehr – es ist Schatten-KI im beruflichen Kontext, mit allen Datenschutz- und Geheimnisschutzfolgen. Die Grenze verläuft nicht am Konto, sondern am Zweck: Firmenarbeit ist Firmenverantwortung, egal auf welchem Account sie passiert.\n\nDeine Governance-Antwort darauf: Erstens klare Richtlinienregel – Firmenaufgaben nur über freigegebene Firmenzugänge. Zweitens attraktive offizielle Alternativen, sonst wandert die Arbeit in die privaten Konten zurück. Drittens klare Kommunikation, dass es hier nicht um Kontrolle der Privatsphäre geht: Was Mitarbeitende privat zu Hause mit KI machen, ist ihre Sache – es geht ausschließlich um Firmendaten und Firmenaufgaben.\n\nSo entsteht ein sauberes Gesamtbild: Jede KI-Berührung des Unternehmens – Nutzung, Einkauf, Weiterverkauf, Integration – hat eine geklärte Rolle, und die Grenze zur Privatnutzung ist definiert statt diffus.",
        example:
          "Ein IT-Systemhaus will das KI-Videoanalyse-Produkt eines asiatischen Herstellers in sein Portfolio aufnehmen. Die KI-Verantwortliche etabliert eine Einkaufsprüfung: Konformitätsunterlagen? CE-Kennzeichnung? EU-Bevollmächtigter des Herstellers? Der Hersteller liefert nur Marketingfolien. Das Systemhaus verzichtet – und erspart sich die Rolle des Einführers eines nicht konformen Produkts. Parallel stellt eine Mitarbeiterbefragung klar: Einige nutzen private KI-Konten für Kundentexte. Statt Sanktionen gibt es Firmenzugänge für alle und die klare Regel: Firmenarbeit nur noch darüber.",
        risk: "Einführer- und Händlerpflichten werden oft erst entdeckt, wenn das Produkt schon im Katalog ist – dann ist der Rückzug teuer. Und die \"private Nutzung\" ist das beliebteste Feigenblatt für Schatten-KI: Wer die Grenze nicht klar am Zweck zieht, verliert genau die Datenflüsse aus dem Blick, die am meisten schaden.",
        memo: "Weiterverkauf und Import haben eigene Pflichten – und Firmenarbeit bleibt Firmenverantwortung, egal auf welchem Konto.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Was prüfst du, bevor dein Unternehmen ein Hochrisiko-KI-Produkt eines Drittland-Herstellers vertreibt?",
            answer:
              "Ob die Konformitätsbewertung durchlaufen wurde, CE-Kennzeichnung und Dokumentation vorliegen und ein EU-Bevollmächtigter benannt ist – bei Zweifeln wird nicht bereitgestellt.",
          },
          {
            question: "Wo verläuft die Grenze zwischen privater und beruflicher KI-Nutzung?",
            answer:
              "Am Zweck, nicht am Konto: Sobald Firmenaufgaben oder Firmendaten im Spiel sind, ist es berufliche Nutzung in Firmenverantwortung – auch auf einem privaten Account.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-inventar-risiko",
    order: 4,
    title: "KI-Inventar und Risikobewertung",
    description:
      "Wie du alle KI-Anwendungen im Unternehmen erfasst, nach Risiko einstufst und das Inventar dauerhaft aktuell hältst.",
    lessons: [
      {
        slug: "off-ki-inventar-aufbauen",
        title: "Das KI-Inventar aufbauen",
        goal: "Du kannst ein vollständiges KI-Inventar für dein Unternehmen aufbauen und weißt, welche Angaben je Anwendung hineingehören.",
        content:
          "Ohne Inventar ist jede KI-Governance ein Blindflug: Du kannst keine Risiken bewerten, keine Pflichten prüfen und keine Fragen beantworten, wenn du nicht weißt, was überhaupt läuft. Das KI-Inventar ist deshalb dein erstes und wichtigstes Arbeitsprodukt.\n\nSo kommst du an die Informationen:\n\nBefragung der Abteilungen: Kurz und konkret fragen: \"Welche Tools mit KI-Funktionen nutzt ihr – auch die inoffiziellen?\" Wichtig ist die ausdrückliche Straffreiheit für ehrliche Antworten, sonst bleibt die Schatten-KI im Schatten.\n\nIT-Sicht: Softwarelisten, Browser-Statistiken, Rechnungen und Lizenzverwaltung zeigen, was wirklich genutzt und bezahlt wird – oft mehr, als die Abteilungen nennen.\n\nProdukt- und Vertragssicht: Auch eingebettete KI zählt – die KI-Funktion im CRM, die automatische Priorisierung im Ticketsystem, das Übersetzungsmodul im Intranet. Und: Nutzen eure Dienstleister KI mit euren Daten?\n\nJe Anwendung erfasst du mindestens: Name und Anbieter, Einsatzzweck und nutzende Abteilungen, verarbeitete Datenarten (personenbezogen? vertraulich?), Zugangsform (Firmenlizenz, Einzellizenz, kostenlos), AI-Act-Rolle des Unternehmens, Risikoeinstufung (nächste Lektion), Freigabestatus und verantwortliche Ansprechperson. Dazu Vertrags- und AVV-Status – das spart dir später bei jeder Prüfung Stunden.\n\nDas Format ist zweitrangig: Eine gepflegte Tabelle schlägt das ungepflegte Spezialtool. Wichtig sind Vollständigkeit, ein Verantwortlicher (du) und ein fester Aktualisierungsrhythmus.\n\nRealistische Erwartung: Die erste Inventur dauert je nach Unternehmensgröße Tage bis Wochen und fördert fast immer Überraschungen zutage – im Schnitt deutlich mehr Tools als erwartet. Genau dafür machst du sie.",
        example:
          "Die KI-Verantwortliche eines Logistikunternehmens startet die Inventur mit drei Quellen: einer Fünf-Fragen-Umfrage an alle Teamleitungen (mit zugesicherter Straffreiheit), der Lizenz- und Rechnungsliste aus der Buchhaltung und einem Gespräch mit der IT. Erwartet hatte sie 5 Tools – gefunden hat sie 17, darunter ein kostenloses Übersetzungstool, über das täglich Frachtdokumente mit Kundendaten laufen, und eine KI-Funktion im Ticketsystem, von der niemand wusste, dass sie aktiviert ist. Beide Fälle werden priorisiert geprüft; das Inventar wird zur Quartalsroutine.",
        risk: "Das gefährlichste KI-System ist das, von dem du nichts weißt: Es taucht in keiner Prüfung auf, hat keinen Vertrag und keinen Verantwortlichen. Ein Inventar, das nur die offiziellen Tools listet, gibt trügerische Sicherheit.",
        memo: "Erst sehen, dann steuern – das Inventar ist das Fundament jeder KI-Governance.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche drei Quellen nutzt du für die KI-Inventur?",
            answer:
              "Befragung der Abteilungen (mit Straffreiheit für ehrliche Antworten), IT-Sicht (Lizenzen, Rechnungen, Softwarelisten) und die Produkt-/Vertragssicht inklusive eingebetteter KI und Dienstleister-KI.",
          },
          {
            question: "Warum gehört auch eingebettete KI (z. B. im CRM) ins Inventar?",
            answer:
              "Weil auch sie Daten verarbeitet und Risiken trägt – KI-Funktionen in Standardsoftware werden am häufigsten übersehen, obwohl sie oft automatisch aktiviert sind.",
          },
        ],
      },
      {
        slug: "off-risikobewertung-methodik",
        title: "Anwendungsfälle bewerten: eine praxistaugliche Risikomethodik",
        goal: "Du kannst KI-Anwendungen systematisch nach Risiko bewerten und daraus nachvollziehbare Freigabe-Entscheidungen ableiten.",
        content:
          "Nicht jede KI-Anwendung verdient dieselbe Prüftiefe – ein Reim-Generator fürs Teamevent ist kein Bewerber-Screening. Eine gute Risikomethodik sorgt dafür, dass du deine Zeit dort investierst, wo das Risiko sitzt.\n\nBewerte jede Anwendung entlang von vier Fragen:\n\nErstens – Welche Daten fließen hinein? Von öffentlich (Risikostufe niedrig) über intern und vertraulich bis personenbezogen/besonders sensibel (hoch). Die Datenfrage dominiert in der Praxis alles andere.\n\nZweitens – Was wird mit dem Ergebnis gemacht? Interner Entwurf mit menschlicher Prüfung (niedrig), direkte Außenwirkung (mittel bis hoch), automatisierte Entscheidungen über Menschen (hoch bis Hochrisiko im AI-Act-Sinn).\n\nDrittens – Wie ist die AI-Act-Einstufung? Verbotene Praktik (Stopp), Hochrisiko (Projekt mit Pflichtenprogramm), transparenzpflichtig (Kennzeichnung sicherstellen), minimal (Standardregeln).\n\nViertens – Wie kritisch ist die Abhängigkeit? Was passiert, wenn das Tool ausfällt, der Anbieter zusperrt oder die Preise verdreifacht? Je tiefer ein Tool in Kernprozessen steckt, desto wichtiger werden Exit-Szenarien.\n\nAus den Antworten ergibt sich eine einfache Gesamtstufe – etwa Grün (freigegeben mit Standardregeln), Gelb (freigegeben mit Auflagen: nur anonymisierte Daten, Vier-Augen-Prinzip, bestimmte Nutzergruppe) und Rot (nicht freigegeben oder nur als geprüftes Projekt). Entscheidend ist die Dokumentation: Wer hat wann mit welcher Begründung eingestuft? Das macht Entscheidungen nachvollziehbar, verteidigbar und wiederholbar.\n\nUnd: Die Bewertung ist ein Foto, kein Gemälde für die Ewigkeit. Neue Funktionen, neue Datenarten, neue Nutzergruppen – jede wesentliche Änderung löst eine Neubewertung aus.",
        example:
          "Ein Möbelhersteller bewertet drei Anwendungen: Der Marketing-Textassistent verarbeitet nur allgemeine Produktinfos, Ergebnisse werden redaktionell geprüft – Grün mit Standardregeln. Das Kundenservice-Tool soll auf die Bestellhistorie zugreifen – Gelb: Freigabe nur mit AVV, Datenminimierung und klarer Kennzeichnung des Bots. Der Vorschlag eines Bereichsleiters, Schichtzuteilungen künftig \"vollautomatisch von der KI optimieren\" zu lassen – Rot: algorithmische Aufgabenzuweisung an Beschäftigte ist Hochrisiko-Terrain; wenn überhaupt, dann als Projekt mit Pflichtenprüfung, menschlicher Aufsicht und Betriebsratseinbindung.",
        risk: "Ohne dokumentierte Methodik entscheidet Bauchgefühl und Lautstärke: Harmloses wird blockiert, Heikles durchgewunken – und im Nachhinein kann niemand erklären, warum. Nachvollziehbarkeit ist hier kein Selbstzweck, sondern deine Verteidigungslinie.",
        memo: "Daten, Ergebnisnutzung, AI-Act-Stufe, Abhängigkeit – vier Fragen, eine dokumentierte Ampel.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Entlang welcher vier Dimensionen bewertest du eine KI-Anwendung?",
            answer:
              "Eingehende Daten, Verwendung des Ergebnisses (inkl. Automatisierungsgrad), AI-Act-Einstufung und Kritikalität der Abhängigkeit vom Tool/Anbieter.",
          },
          {
            question: "Was löst eine Neubewertung einer bereits freigegebenen Anwendung aus?",
            answer:
              "Jede wesentliche Änderung: neue Funktionen, andere Datenarten, neue Nutzergruppen oder ein veränderter Einsatzzweck.",
          },
        ],
      },
      {
        slug: "off-dsfa-grundrechte",
        title: "Vertiefte Prüfungen: DSFA und Grundrechte-Folgenabschätzung",
        goal: "Du weißt, wann über die Standard-Risikobewertung hinaus eine Datenschutz-Folgenabschätzung oder Grundrechte-Folgenabschätzung nötig wird.",
        content:
          "Für die meisten Anwendungen reicht deine Ampel-Bewertung. Aber es gibt Fälle, in denen formellere Prüfinstrumente vorgeschrieben oder dringend geboten sind – und du musst sie erkennen, auch wenn andere sie durchführen.\n\nDie Datenschutz-Folgenabschätzung (DSFA) nach Art. 35 DSGVO: Sie ist Pflicht, wenn eine Verarbeitung voraussichtlich ein hohes Risiko für die Rechte und Freiheiten natürlicher Personen mit sich bringt – typisch bei systematischer Bewertung persönlicher Aspekte, umfangreicher Verarbeitung sensibler Daten oder neuen Technologien mit unklaren Folgen. Viele ernsthafte KI-Einsätze mit Personenbezug erfüllen diese Kriterien. Die DSFA gehört fachlich zum Datenschutzbeauftragten bzw. Verantwortlichen – deine Aufgabe ist, den Bedarf früh zu erkennen und den Prozess anzustoßen, bevor das Tool live ist.\n\nDie Grundrechte-Folgenabschätzung nach dem AI Act: Bestimmte Betreiber von Hochrisiko-Systemen – öffentliche Stellen und private Betreiber, die öffentliche Aufgaben erfüllen oder etwa Kreditwürdigkeit und Versicherungsrisiken bewerten – müssen vor der Nutzung die Auswirkungen auf Grundrechte prüfen. Auch wenn dein Unternehmen (noch) nicht dazugehört: Die Denkweise ist ein exzellentes Prüfraster – Wer ist betroffen? Welche Schäden sind möglich? Wer könnte diskriminiert werden? Welche Abhilfen gibt es?\n\nWie du das praktisch verzahnst: In deiner Freigabe-Checkliste stehen zwei Trigger-Fragen. Erstens: \"Werden personenbezogene Daten systematisch verarbeitet oder Personen bewertet?\" – wenn ja, Datenschutz einbinden und DSFA-Bedarf prüfen lassen. Zweitens: \"Ist es ein Hochrisiko-System?\" – wenn ja, prüfen, ob eine Grundrechte-Folgenabschätzung gefordert ist. So stellst du sicher, dass die formellen Prüfungen nicht an dir vorbeilaufen – und dass keine an dir hängen bleibt, die fachlich woanders hingehört.",
        example:
          "Ein Versicherungsmakler plant ein KI-Tool, das Kundenanfragen automatisch nach \"Abschlusswahrscheinlichkeit\" bewertet und priorisiert. Die KI-Verantwortliche erkennt beide Trigger: systematische Bewertung von Personen (DSFA-Prüfung durch die Datenschutzbeauftragte) und die Nähe zum Hochrisiko-Bereich der Versicherungs-Risikobewertung (vertiefte AI-Act-Prüfung). Das Ergebnis: Das Tool kommt nur in einer abgespeckten Variante – Priorisierung nach Anfrageart statt nach Personenbewertung. Weniger \"smart\", aber rechtlich tragfähig und dem Kunden erklärbar.",
        risk: "Die formellen Prüfungen (DSFA, Grundrechte-Folgenabschätzung) werden am häufigsten schlicht vergessen – das Tool ist live, bevor jemand die Pflicht bemerkt. Nachgeholte Folgenabschätzungen unter Zeitdruck sind Makulatur und überzeugen keine Behörde.",
        memo: "Zwei Trigger-Fragen in der Checkliste – Personenbewertung? Hochrisiko? – und die formellen Prüfungen laufen automatisch an.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Wann ist eine DSFA typischerweise erforderlich?",
            answer:
              "Wenn die Verarbeitung voraussichtlich hohe Risiken für Betroffene birgt – etwa bei systematischer Bewertung persönlicher Aspekte, umfangreicher sensibler Datenverarbeitung oder riskanten neuen Technologien.",
          },
          {
            question: "Was ist deine Rolle bei DSFA und Grundrechte-Folgenabschätzung?",
            answer:
              "Den Bedarf früh über Trigger-Fragen erkennen und die fachlich zuständigen Stellen (Datenschutz, Recht) rechtzeitig einbinden – nicht, die Prüfungen selbst zu ersetzen.",
          },
        ],
      },
      {
        slug: "off-inventar-aktuell-halten",
        title: "Das Inventar lebendig halten",
        goal: "Du kennst die Routinen, mit denen das KI-Inventar aktuell bleibt, statt nach drei Monaten zu veralten.",
        content:
          "Jedes Inventar ist am Tag seiner Fertigstellung am aktuellsten – danach beginnt der Verfall. Neue Tools kommen, Funktionen ändern sich, Abteilungen probieren Dinge aus. Ohne Pflegeroutinen ist deine schöne Inventur in einem halben Jahr Geschichte.\n\nDie Routinen, die sich bewährt haben:\n\nDer Neuzugangs-Kanal: Jedes neue Tool kommt ausschließlich über den Freigabeprozess ins Haus – und landet damit automatisch im Inventar. Der Freigabeprozess ist deine wichtigste Inventar-Pflegequelle: Was durch ihn läuft, ist erfasst.\n\nDer Quartals-Check: Einmal pro Quartal gleichst du das Inventar mit der Realität ab – neue Rechnungen und Lizenzen aus der Buchhaltung, kurze Rückfrage an die Teamleitungen (\"etwas Neues im Einsatz?\"), Blick auf Update-Ankündigungen der wichtigsten Anbieter. Aufwand: ein halber Tag. Ertrag: ein Inventar, dem man trauen kann.\n\nDer Anlass-Trigger: Bestimmte Ereignisse lösen sofort eine Inventar-Prüfung aus – ein gemeldeter Vorfall, ein großes Funktions-Update eines Anbieters, eine neue Abteilung oder Übernahme, geänderte Nutzungsbedingungen.\n\nDie Jahres-Inventur: Einmal jährlich die große Runde wie beim ersten Mal – inklusive Schatten-KI-Abfrage mit Straffreiheit. Erfahrungsgemäß findest du auch im besten System jedes Jahr ein paar Überraschungen.\n\nUnd das Wichtigste: Verabschiede dich vom Anspruch auf Echtzeit-Perfektion. Ein Inventar, das zu 95 % stimmt und dessen Lücken systematisch gesucht werden, ist Gold wert. Ein Inventar, das perfekt sein soll und deshalb nie fertig wird, ist wertlos. Deine Kennzahl ist nicht \"fehlerfrei\", sondern \"gepflegt und nachweislich geprüft\".",
        example:
          "Nach der Anfangsinventur etabliert ein Handelsbetrieb den Rhythmus: Neue Tools nur über den Freigabeantrag (Formular, 10 Minuten), Quartals-Check anhand der Kreditkartenabrechnungen (\"Wer zahlt eigentlich an welche KI-Anbieter?\") und Jahres-Umfrage. Beim zweiten Quartals-Check fällt eine neue Monatsgebühr an einen unbekannten KI-Dienst auf – ein Teamleiter hatte \"nur kurz was getestet\" und das Kündigen vergessen. Das Tool wird geprüft (harmlos), ins Inventar aufgenommen und regulär gekündigt. Kleiner Fund, aber der Prozess funktioniert.",
        risk: "Ein veraltetes Inventar ist gefährlicher als gar keines, weil es falsche Sicherheit ausstrahlt: Prüfungen, Audits und Vorfallsreaktionen bauen dann auf einem Bild auf, das mit der Realität nichts mehr zu tun hat.",
        memo: "Freigabeprozess als Eingangstor, Quartals-Check, Anlass-Trigger, Jahresinventur – so bleibt das Inventar Wahrheit statt Wunschdenken.",
        durationMinutes: 7,
        required: true,
        miniChecks: [
          {
            question: "Welche Routine ist die wichtigste Pflegequelle des Inventars?",
            answer:
              "Der Freigabeprozess als einziger Eingangskanal für neue Tools – was durch ihn läuft, ist automatisch erfasst.",
          },
          {
            question: "Welche Ereignisse lösen eine sofortige Inventar-Prüfung aus?",
            answer:
              "Vorfälle, große Funktions-Updates, geänderte Nutzungsbedingungen, neue Abteilungen oder Übernahmen.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-schulungsprogramm",
    order: 5,
    title: "Art. 4 umsetzen: das Schulungsprogramm im Unternehmen",
    description:
      "Wie du die KI-Kompetenzpflicht nach Art. 4 EU AI Act organisierst: Bedarf ermitteln, Zielgruppen definieren, Nachweise führen und Wirksamkeit sicherstellen.",
    lessons: [
      {
        slug: "off-schulungsbedarf-ermitteln",
        title: "Was Art. 4 wirklich verlangt – und wie du den Bedarf ermittelst",
        goal: "Du kannst die Anforderungen von Art. 4 EU AI Act in einen konkreten Schulungsbedarf für dein Unternehmen übersetzen.",
        content:
          "Art. 4 EU AI Act verpflichtet Anbieter und Betreiber, nach besten Kräften sicherzustellen, dass ihr Personal – und alle, die in ihrem Auftrag mit KI-Systemen umgehen – über ausreichende KI-Kompetenz verfügt. Dabei sind technisches Wissen, Erfahrung, Ausbildung und der konkrete Einsatzkontext zu berücksichtigen.\n\nDrei Dinge stecken in diesem Satz, die du als Verantwortliche(r) ernst nehmen musst:\n\nErstens: Es ist eine echte Pflicht, aber ohne starres Programm. Das Gesetz schreibt weder Stundenzahl noch Kursformat noch ein bestimmtes Zeugnis vor. Es verlangt, dass die Kompetenz zum Kontext passt – ein Sachbearbeiter mit Text-Assistent braucht anderes Wissen als die Recruiterin, die ein Hochrisiko-System beaufsichtigt.\n\nZweitens: \"Nach besten Kräften sicherstellen\" heißt organisieren, nicht hoffen. Ein Link ins Intranet (\"da ist ein KI-Kurs, macht mal\") genügt dem Anspruch kaum. Du brauchst ein nachvollziehbares System: Wer braucht welches Wissen, wie wird es vermittelt, wie wird es belegt?\n\nDrittens: Auch Externe zählen. Freelancer, Leiharbeitskräfte und Dienstleister, die in eurem Auftrag mit euren KI-Systemen arbeiten, gehören in die Betrachtung.\n\nSo ermittelst du den Bedarf konkret: Nimm dein KI-Inventar und ordne jeder Anwendung die Nutzergruppen zu. Dann frage je Gruppe: Was müssen diese Personen wissen, um sicher zu arbeiten? Für die breite Masse der Büro-Anwendungen deckt eine solide Grundschulung (wie der Basic-Kurs) den Kern ab: Funktionsweise, Grenzen, Datenschutz, Prüfen von Ergebnissen, interne Regeln. Für besondere Rollen kommt Aufbauwissen dazu: Hochrisiko-Aufsichtspersonen brauchen system­spezifisches Training, Führungskräfte Entscheidungswissen, du selbst genau diesen Kurs. So entsteht eine einfache Bedarfsmatrix: Zielgruppe × benötigte Kompetenz × passendes Format.",
        example:
          "Ein Produktionsbetrieb mit 120 Mitarbeitenden erstellt die Bedarfsmatrix: 70 Büro-Beschäftigte nutzen Text- und Übersetzungs-KI – Basic-Schulung für alle. 15 Führungskräfte entscheiden über KI-Einsatz – Basic plus ein interner Workshop zu Freigaben und Verantwortung. 2 Personen beaufsichtigen das geplante Qualitätsprüfungs-KI-System – herstellerspezifisches Training plus Hochrisiko-Grundlagen. 30 Produktionsmitarbeitende ohne KI-Berührung – vorerst nur Kurzinformation, mit Wiedervorlage bei Einführung neuer Systeme. Die Matrix passt auf eine Seite und beantwortet jede Rückfrage nach dem \"Warum diese Schulung für diese Gruppe?\".",
        risk: "Die zwei klassischen Fehler: Gießkanne (alle bekommen dieselbe Minimal-Unterweisung, die für kritische Rollen nicht reicht) und Lücken (Externe, neue Mitarbeitende und eingebettete KI-Nutzer werden vergessen). Beides fliegt genau dann auf, wenn es teuer wird – nach einem Vorfall.",
        memo: "Art. 4 verlangt passende Kompetenz je Kontext – deine Bedarfsmatrix macht daraus ein steuerbares Programm.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Schreibt Art. 4 ein bestimmtes Kursformat oder eine Stundenzahl vor?",
            answer:
              "Nein. Verlangt wird ausreichende KI-Kompetenz passend zu Kontext, Vorwissen und Einsatzbereich – das Wie bleibt dem Unternehmen überlassen, muss aber nachvollziehbar organisiert sein.",
          },
          {
            question: "Wer gehört außer den eigenen Mitarbeitenden noch in die Schulungsbetrachtung?",
            answer:
              "Alle, die im Auftrag des Unternehmens mit den KI-Systemen umgehen – etwa Freelancer, Leiharbeitskräfte und Dienstleister.",
          },
        ],
      },
      {
        slug: "off-zielgruppen-rollenprofile",
        title: "Zielgruppen und Rollenprofile: Wer braucht welche Schulung?",
        goal: "Du kannst Schulungsinhalte und -tiefe je Rolle differenzieren und Sonderfälle wie Neueintritte und Hochrisiko-Aufsicht sauber abdecken.",
        content:
          "Eine gute Schulungsarchitektur hat Stufen statt Einheitsbrei. Bewährt hat sich ein Drei-Ebenen-Modell plus Sonderfälle:\n\nEbene 1 – Alle Anwenderinnen und Anwender: Die Grundschulung für jeden, der mit KI-Tools arbeitet oder arbeiten könnte. Inhalte: Funktionsweise und Grenzen, Halluzinationen, Datenschutz, Urheberrecht, Transparenz, interne Regeln, Meldewege. Abschluss mit Test und Nachweis. Das ist dein Fundament – und für die meisten KMU die größte Gruppe.\n\nEbene 2 – Führungskräfte und Schlüsselrollen: Aufbauend auf Ebene 1 das Entscheidungswissen: Freigabeprozesse, Verantwortung, Rollenlogik des AI Act, Umgang mit Tool-Wünschen des Teams, Vorbildfunktion. Format: kompakter Workshop oder Aufbaumodul – Führungskräfte brauchen weniger Stoff, aber mehr Kontext.\n\nEbene 3 – Die KI-Governance-Rollen: Du selbst und deine Vertretung. Inhalte: genau dieser Kurs – Rollen und Pflichten, Inventar, Risikobewertung, Richtlinien, Vorfallsmanagement, Lieferantensteuerung.\n\nDie Sonderfälle, die gern durchrutschen:\n\nNeueintritte: KI-Grundschulung gehört ins Onboarding – nicht \"irgendwann im ersten Jahr\". Bis zur absolvierten Schulung gelten Einschränkungen (z. B. KI-Nutzung nur unter Anleitung).\n\nHochrisiko-Aufsichtspersonen: Wer die menschliche Aufsicht über ein Hochrisiko-System ausübt, braucht systemspezifisches Training – die Person muss die Grenzen des Systems kennen, Ergebnisse hinterfragen können und eingreifen dürfen und können.\n\nWiederholung und Auffrischung: KI entwickelt sich schnell; eine einmalige Schulung veraltet. Plane Auffrischungen in sinnvollen Abständen und bei Anlässen (neue Tools, neue Regeln, gehäufte Vorfälle in einem Themenfeld).\n\nBerufsgruppen ohne Schreibtisch: Auch wer \"nur\" die KI-Funktion in der Maschinensteuerung oder im Lager-Scanner nutzt, zählt – die Schulung darf hier kürzer und praktischer sein, aber nicht fehlen.",
        example:
          "Ein Dienstleister definiert sein Stufenmodell: Alle 60 Büro-Mitarbeitenden absolvieren den Basic-Kurs (Nachweis in der Personalakte), die 8 Teamleitungen zusätzlich einen halbtägigen Governance-Workshop, die KI-Verantwortliche und ihr Stellvertreter den Aufbaukurs. Im Onboarding-Plan neuer Mitarbeitender steht die KI-Schulung in Woche 1, vorher gilt: KI-Nutzung nur mit Freigabe der Teamleitung. Als das Unternehmen ein Jahr später ein KI-System zur Rechnungsprüfung mit menschlicher Aufsicht einführt, bekommen die zwei Aufsichtspersonen zusätzlich das Hersteller-Training – dokumentiert im Schulungsregister.",
        risk: "Einheitsschulungen erzeugen Scheinsicherheit: Die Recruiterin am Hochrisiko-System hat dann denselben Wissensstand wie der Kollege mit dem Reim-Generator. Umgekehrt vergessen viele Programme die Neueintritte – und nach zwei Jahren Fluktuation ist ein Drittel der Belegschaft ungeschult.",
        memo: "Drei Ebenen plus Sonderfälle: Anwender, Entscheider, Governance – und Neueintritte, Aufsichtspersonen, Auffrischungen nicht vergessen.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche drei Schulungsebenen haben sich bewährt?",
            answer:
              "Grundschulung für alle Anwender, Aufbauwissen für Führungskräfte/Schlüsselrollen und vertieftes Governance-Wissen für die KI-Verantwortlichen selbst.",
          },
          {
            question: "Was gilt für Personen, die die menschliche Aufsicht über ein Hochrisiko-System ausüben?",
            answer:
              "Sie brauchen zusätzlich systemspezifisches Training: Grenzen des Systems kennen, Ergebnisse hinterfragen, eingreifen können und dürfen.",
          },
        ],
      },
      {
        slug: "off-nachweise-dokumentation",
        title: "Nachweise führen: Dokumentation, die im Ernstfall trägt",
        goal: "Du weißt, wie du Schulungsnachweise so führst, dass sie bei Kunden-, Audit- und Behördenanfragen belastbar sind.",
        content:
          "Die beste Schulung nützt wenig, wenn du sie nicht belegen kannst. \"Wir haben da mal was gemacht\" überzeugt weder Kunden noch Auditoren noch Behörden. Dokumentation ist der Unterschied zwischen Kompetenz haben und Kompetenz nachweisen.\n\nWas ein belastbares Schulungsregister enthält:\n\nJe Person: Wer wurde wann zu welchen Inhalten geschult? Mit welchem Ergebnis (Test bestanden, Punktzahl)? Welcher Nachweis liegt vor (Zertifikat mit Nummer und Prüfmöglichkeit)? Wann steht die Auffrischung an?\n\nJe Schulung: Welche Inhalte wurden in welcher Version vermittelt? Die Versionierung ist wichtiger, als sie klingt – wenn sich Regeln ändern, musst du zeigen können, wer noch auf altem Stand geschult ist.\n\nJe Sonderfall: Externe mit KI-Zugang, Hochrisiko-Aufsichtspersonen mit Spezialtraining, Ausnahmen und deren Begründung.\n\nDrei Qualitätsmerkmale entscheiden über die Belastbarkeit: Vollständigkeit (alle Zielgruppen, auch Externe und Neueintritte), Aktualität (das Register lebt mit der Fluktuation mit) und Überprüfbarkeit (Zertifikate mit Verifikationsmöglichkeit schlagen formlose Teilnahmelisten deutlich).\n\nZur Ehrlichkeit gehört auch die Einordnung: Ein Schulungszertifikat – auch das dieser Plattform – ist ein privater Schulungsnachweis. Es gibt kein staatliches Prüfsiegel für KI-Kompetenz nach Art. 4; das Gesetz sieht ein solches Verfahren schlicht nicht vor. Gerade deshalb zählt die Qualität deiner Dokumentation: nachvollziehbare Inhalte, echte Tests, verifizierbare Zertifikate und ein gepflegtes Register. Wer so dokumentiert, kann jede Anfrage souverän beantworten – nicht weil ein Stempel drauf ist, sondern weil das System überzeugt.\n\nPraktischer Tipp: Automatisiere, was geht. Eine Plattform, die Abschlüsse, Zertifikate und Wiedervorlagen automatisch führt, schlägt jede handgepflegte Liste – weniger Aufwand, weniger Lücken, bessere Nachweise.",
        example:
          "Ein Kunde verlangt im Rahmen seiner Lieferantenprüfung den Nachweis der KI-Kompetenz \"aller mit dem Auftrag befassten Personen\". Die KI-Verantwortliche exportiert aus der Schulungsplattform die Nachweisliste: sieben Personen, je mit Kursversion, Abschlussdatum, Testergebnis und verifizierbarer Zertifikatsnummer; für den einen Freelancer liegt der dokumentierte Einzelnachweis bei. Bearbeitungszeit: zwanzig Minuten. Der Mitbewerber, der dieselbe Anfrage bekam, brauchte drei Wochen und lieferte eine formlose Excel-Liste – der Auftrag ging nicht an ihn.",
        risk: "Undokumentierte Schulung ist im Streitfall wertlos – und lückenhafte Register (vergessene Externe, veraltete Versionen, fehlende Neueintritte) fallen genau bei den Anfragen auf, bei denen es um Aufträge oder Haftung geht.",
        memo: "Kompetenz zählt erst, wenn du sie nachweisen kannst – Register, Versionen, verifizierbare Zertifikate.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche drei Qualitätsmerkmale machen ein Schulungsregister belastbar?",
            answer:
              "Vollständigkeit (alle Zielgruppen inkl. Externe), Aktualität (lebt mit Fluktuation und Versionsänderungen mit) und Überprüfbarkeit (verifizierbare Zertifikate statt formloser Listen).",
          },
          {
            question: "Gibt es ein staatliches Prüfsiegel für KI-Kompetenz nach Art. 4?",
            answer:
              "Nein, ein solches Verfahren sieht das Gesetz nicht vor. Nachweise sind private Schulungsnachweise – umso wichtiger sind saubere Dokumentation, echte Tests und Verifizierbarkeit.",
          },
        ],
      },
      {
        slug: "off-wirksamkeit-messen",
        title: "Wirksamkeit sicherstellen: von der Pflichtübung zum echten Können",
        goal: "Du kennst Methoden, um zu prüfen, ob Schulungen tatsächlich wirken – und was du bei schwachen Ergebnissen tust.",
        content:
          "Eine absolvierte Schulung ist ein Input. Was zählt, ist der Output: Verhalten sich die Leute im Alltag kompetenter? Die Wirksamkeitsfrage trennt ernsthafte Programme von Alibi-Veranstaltungen – und sie wird in Audits gern gestellt.\n\nSo misst du Wirksamkeit auf drei Ebenen:\n\nEbene 1 – Lernerfolg: Der Abschlusstest mit echter Bestehensgrenze ist die Basis. Interessanter als die Bestehensquote ist die Kategorien-Auswertung: Wenn viele Teilnehmende im selben Themenfeld schwächeln, ist das ein Inhalts- oder Vermittlungsproblem, kein Personenproblem. Nachschulungen gehören gezielt auf die schwachen Felder, nicht pauschal auf alles.\n\nEbene 2 – Verhalten im Alltag: Hier zeigen Indikatoren mehr als Umfragen: Kommen Tool-Freigabeanträge (gut – die Leute kennen den Prozess)? Werden Vorfälle und Beinahe-Vorfälle gemeldet (sehr gut – Meldekultur lebt)? Sinken die Fälle von Schatten-KI? Tauchen in Stichproben weniger ungeprüfte KI-Texte auf? Ein scheinbar paradoxer Effekt gehört dazu: Direkt nach guten Schulungen steigen die Meldezahlen oft an – nicht weil mehr passiert, sondern weil mehr erkannt wird. Das ist ein Erfolgssignal.\n\nEbene 3 – Feedback und Anpassung: Systematisches Teilnehmer-Feedback (Verständlichkeit, Praxisnähe, Testfairness) fließt in die Überarbeitung. Eine Schulung, die seit zwei Jahren unverändert läuft, während sich die KI-Welt dreht, ist ein Warnsignal für jedes Audit.\n\nWas tun bei schwachen Ergebnissen? Erst Ursache, dann Maßnahme: Fällt eine Person durch, hilft gezielte Nachschulung. Fallen viele durch dieselben Themen, wird der Inhalt überarbeitet. Wissen die Leute alles, handeln aber anders, liegt es selten an der Schulung – sondern an Prozessen, Zeitdruck oder fehlenden Tools. Dann ist die Antwort Prozessverbesserung, nicht die dritte Wiederholung derselben Folien.",
        example:
          "Die Quartalsauswertung eines Unternehmens zeigt: 92 % Bestehensquote, aber die Kategorie Datenschutz liegt quer durch alle Abteilungen unter 65 % – und zwei der drei gemeldeten Vorfälle betrafen Dateneingaben. Die KI-Verantwortliche reagiert zweistufig: Die Datenschutz-Lektionen werden mit konkreteren Alltagsbeispielen überarbeitet, und alle Teilnehmenden mit schwacher Datenschutz-Kategorie bekommen eine gezielte Nachschulung genau dieser Lektionen. Zwei Quartale später: Kategorie-Schnitt bei 82 %, Dateneingabe-Vorfälle auf null. Der Management-Bericht dokumentiert die Kette Messung → Maßnahme → Wirkung.",
        risk: "Wer nur Teilnahmequoten misst, betreibt Schulungstheater: 100 % absolviert, nichts verändert. Und wer bei Verhaltensproblemen reflexhaft nachschult statt Prozesse zu prüfen, verbrennt Zeit und Vertrauen der Belegschaft.",
        memo: "Lernerfolg, Alltagsverhalten, Feedback – Wirksamkeit misst man auf drei Ebenen, und Maßnahmen folgen der Ursache.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum können steigende Meldezahlen nach einer Schulung ein Erfolg sein?",
            answer:
              "Weil mehr erkannt und gemeldet wird, nicht weil mehr passiert – eine funktionierende Meldekultur ist ein Wirksamkeitsindikator.",
          },
          {
            question: "Viele Teilnehmende schwächeln in derselben Testkategorie. Was ist die richtige Reaktion?",
            answer:
              "Den Inhalt bzw. die Vermittlung dieses Themenfelds überarbeiten und gezielt nachschulen – ein gehäuftes Kategorien-Problem ist ein Inhaltsproblem, kein Personenproblem.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-richtlinie-governance",
    order: 6,
    title: "KI-Richtlinie und Freigabeprozesse gestalten",
    description:
      "Wie du eine KI-Richtlinie schreibst, die gelebt wird, einen schlanken Freigabeprozess aufsetzt und mit Ausnahmen und Verstößen umgehst.",
    lessons: [
      {
        slug: "off-richtlinie-erstellen",
        title: "Die KI-Richtlinie schreiben: Inhalt und Ton",
        goal: "Du kannst eine KI-Richtlinie strukturieren, die rechtlich sauber, verständlich und im Alltag anwendbar ist.",
        content:
          "Im Basic-Kurs lernen deine Mitarbeitenden, was in einer KI-Richtlinie steht. Du lernst hier, wie man sie baut – denn du bist die Person, die sie schreiben, pflegen und durchsetzen wird.\n\nDie bewährte Struktur:\n\n1. Geltungsbereich und Zweck: Für wen gilt sie (alle Mitarbeitenden, Externe im Auftrag), wofür (dienstliche Nutzung, Firmendaten – auch auf privaten Konten), und warum es sie gibt (Schutz von Daten, Kundschaft und Mitarbeitenden – nicht Bürokratie).\n\n2. Erlaubte Tools und Zugänge: Die Positivliste mit den freigegebenen Tools samt Einsatzrahmen. Verweise auf eine gepflegte Anlage statt Tools im Fließtext – so bleibt die Richtlinie stabil, während sich die Liste ändert.\n\n3. Datenregeln: Welche Datenkategorien dürfen in welche Tools – idealerweise als einfache Matrix (öffentlich / intern / vertraulich / personenbezogen gegen freigegebene Toolklassen). Mit konkreten Beispielen aus dem eigenen Haus.\n\n4. Prüf- und Kennzeichnungsregeln: Menschliche Prüfung vor Verwendung, Vier-Augen-Prinzip vor Außenwirkung, wann KI-Kennzeichnung nötig ist.\n\n5. Prozesse: Neues Tool beantragen, Vorfall melden, Ausnahmen anfragen – je mit Ansprechperson und erwarteter Reaktionszeit.\n\n6. Verantwortlichkeiten und Folgen: Wer entscheidet was, und was passiert bei Verstößen – ehrlich, aber mit klarer Botschaft: Ehrliche Meldungen werden nicht sanktioniert, vorsätzliches Vertuschen schon.\n\nZum Ton: Schreib die Richtlinie so, dass ein neuer Mitarbeiter sie in 15 Minuten versteht. Kurze Sätze, konkrete Beispiele, keine Paragrafenlyrik. Jede Regel, die niemand versteht, wird nicht befolgt – und eine nicht befolgte Regel ist schlimmer als keine, weil sie Scheinsicherheit dokumentiert. Zwei Seiten, die gelebt werden, schlagen zwanzig Seiten im Intranet-Grab.\n\nUnd: Hol dir vor der Verabschiedung die Reviews – Datenschutz, IT, ggf. Betriebsrat und bei heiklen Punkten Rechtsberatung. Die Richtlinie ist ein internes Regelwerk mit arbeitsrechtlicher Wirkung; sie verdient denselben Respekt wie jede andere Unternehmensrichtlinie.",
        example:
          "Die KI-Verantwortliche eines Handelsunternehmens ersetzt den 22-seitigen Entwurf der Rechtsabteilung durch eine zweiseitige Richtlinie plus Anlagen: Seite 1 – die fünf Kernregeln mit Beispielen und die Datenmatrix. Seite 2 – Prozesse und Ansprechpersonen. Anlage A – Toolliste (lebt separat). Anlage B – Checkliste Außenkommunikation. Der Praxistest: Drei zufällig ausgewählte Mitarbeitende lesen den Entwurf und beantworten fünf Alltagsfragen (\"Darfst du den Kundennamen ins Tool X eingeben?\"). Erst als alle drei alle Fragen richtig beantworten, geht die Richtlinie zur Freigabe.",
        risk: "Die häufigste Fehlform ist die juristisch perfekte, praktisch tote Richtlinie: zwanzig Seiten, die niemand liest, mit Regeln, die keiner auf seinen Alltag übersetzen kann. Sie schützt nicht – sie dokumentiert nur, dass man es hätte wissen müssen.",
        memo: "Zwei gelebte Seiten schlagen zwanzig tote – verständlich, konkret, mit klaren Prozessen und Ansprechpersonen.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Warum gehören die freigegebenen Tools in eine Anlage statt in den Richtlinientext?",
            answer:
              "Weil sich die Toolliste laufend ändert: Die Anlage kann aktualisiert werden, ohne die ganze Richtlinie neu freigeben zu müssen – der Richtlinientext bleibt stabil.",
          },
          {
            question: "Wie testest du die Verständlichkeit einer Richtlinie vor der Freigabe?",
            answer:
              "Praxistest: Mitarbeitende außerhalb des Projekts lesen den Entwurf und beantworten konkrete Alltagsfragen. Erst wenn das klappt, ist die Richtlinie reif.",
          },
        ],
      },
      {
        slug: "off-freigabeprozess-gestalten",
        title: "Den Freigabeprozess aufsetzen: schnell genug für den Alltag",
        goal: "Du kannst einen Tool-Freigabeprozess gestalten, der gründlich prüft, ohne zum Flaschenhals zu werden.",
        content:
          "Der Freigabeprozess ist das Herzstück deiner Governance – und ihr größtes Reputationsrisiko: Ist er zu langsam, arbeiten die Leute an ihm vorbei, und du hast die Schatten-KI, die du verhindern wolltest. Die Kunst ist ein Prozess, der gründlich UND schnell genug ist.\n\nDas Grundgerüst:\n\nEingang: Ein einfaches Antragsformular – Tool, Anbieter, Einsatzzweck, Datenarten, gewünschte Nutzergruppe. Zehn Minuten Aufwand für den Antragsteller, mehr nicht. Jede Hürde am Eingang produziert Schatten-KI.\n\nTriage nach Risiko: Nicht jeder Antrag verdient die volle Prüfung. Ein kostenloses Tool für öffentliche Daten ohne Personenbezug kannst du im Schnellverfahren behandeln (Ziel: wenige Tage). Tools mit personenbezogenen Daten, Vertragsbindung oder Außenwirkung bekommen die Standardprüfung (Datenschutz einbinden, AVV, Nutzungsbedingungen – Ziel: zwei bis vier Wochen). Alles mit Hochrisiko-Nähe wird zum Projekt.\n\nPrüfung mit klaren Rollen: Du koordinierst; Datenschutz prüft Datenschutz, IT prüft Sicherheit und Integration, Einkauf den Vertrag. Definierte Reaktionszeiten je Rolle verhindern, dass Anträge in Postfächern sterben.\n\nEntscheidung mit drei Ausgängen: Freigegeben (mit dokumentiertem Rahmen), freigegeben mit Auflagen (z. B. nur anonymisierte Daten, nur bestimmte Teams) oder abgelehnt – immer mit Begründung und, wenn möglich, mit Alternative (\"Tool X kann das auch und ist freigegeben\"). Eine Ablehnung ohne Alternative ist eine Einladung zur Schattennutzung.\n\nKommunikation des Ergebnisses: Der Antragsteller erfährt Ergebnis und Begründung, die Toolliste und das Inventar werden aktualisiert, bei breit relevanten Tools informierst du aktiv alle.\n\nUnd miss deinen Prozess selbst: Durchlaufzeiten, Antragszahlen, Anteil Schnellverfahren. Wenn drei Monate keine Anträge kommen, ist das kein Erfolg – es heißt fast sicher, dass der Prozess umgangen wird.",
        example:
          "Ein Beratungsunternehmen führt die Triage ein: Anträge für Tools ohne Personenbezug und ohne Vertragskosten entscheidet die KI-Verantwortliche binnen fünf Arbeitstagen selbst (dokumentiert), alles andere geht in die Standardprüfung mit Datenschutz und IT. Ergebnis nach einem halben Jahr: 23 Anträge, davon 14 im Schnellverfahren, mittlere Durchlaufzeit 4 Tage bzw. 18 Tage, zwei Ablehnungen – beide mit freigegebener Alternative. Die anonyme Jahresumfrage zeigt: Schatten-KI-Nutzung deutlich gesunken. Der Prozess ist schnell genug, dass sich das Umgehen nicht mehr lohnt.",
        risk: "Ein Freigabeprozess, der Wochen für Trivialfälle braucht, erzieht das Unternehmen zur Umgehung – und diskreditiert die gesamte Governance. Der Flaschenhals bist im Zweifel du selbst: Ohne Triage und Vertretungsregel hängt alles an einer Person.",
        memo: "Leichter Eingang, Risiko-Triage, klare Fristen, Ablehnung nur mit Alternative – sonst produziert der Prozess seine eigene Schatten-KI.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum braucht der Freigabeprozess eine Risiko-Triage?",
            answer:
              "Damit harmlose Anträge schnell entschieden werden und die Prüftiefe dem Risiko folgt – ein zu langsamer Prozess wird umgangen und erzeugt Schatten-KI.",
          },
          {
            question: "Was gehört zu einer guten Ablehnung?",
            answer:
              "Eine nachvollziehbare Begründung und möglichst eine freigegebene Alternative – sonst wandert der Bedarf in die Schattennutzung.",
          },
        ],
      },
      {
        slug: "off-ausnahmen-eskalationen",
        title: "Ausnahmen, Eskalationen und der Umgang mit Verstößen",
        goal: "Du weißt, wie du mit Ausnahmewünschen, Eskalationen und Regelverstößen umgehst, ohne die Meldekultur zu beschädigen.",
        content:
          "Keine Richtlinie überlebt den Kontakt mit der Realität unverändert. Es wird Ausnahmewünsche geben, Konflikte und Verstöße – und dein Umgang damit entscheidet, ob deine Governance als fair oder als Schikane wahrgenommen wird.\n\nAusnahmen sauber managen: Es gibt legitime Gründe für Ausnahmen – das Pilotprojekt, der Kundenauftrag mit Spezialanforderung, der Einzelfall, den keine Regel vorhersah. Die Antwort ist nie das stille Auge-Zudrücken, sondern die dokumentierte Ausnahme: Wer braucht was, warum, wie lange? Welche Auflagen kompensieren das Risiko (z. B. nur Testdaten, verkürzte Laufzeit, engere Kontrolle)? Wer hat entschieden? Mit Ablaufdatum und Wiedervorlage. Eine dokumentierte Ausnahme stärkt die Regel – eine stillschweigende höhlt sie aus.\n\nEskalationen führen: Wenn eine Fachabteilung deine Ablehnung nicht akzeptiert, ist das kein Angriff, sondern ein normaler Interessenkonflikt. Definiere den Weg vorab: Erst das Fachgespräch (oft löst eine Auflage den Konflikt), dann die dokumentierte Entscheidung der Geschäftsleitung. Wichtig für dich: Wenn die Geschäftsleitung gegen deine Empfehlung entscheidet, ist das ihr gutes Recht – aber deine abweichende Empfehlung steht dokumentiert im Protokoll. Das ist keine Absicherungstaktik, sondern gelebte Verantwortungsteilung: Du berätst, sie entscheidet, beides ist nachvollziehbar.\n\nVerstöße differenziert behandeln: Das Prinzip aus dem Vorfallsmanagement gilt auch hier – ehrliche Fehler und Selbstmeldungen werden nicht sanktioniert, sonst stirbt die Meldekultur. Anders liegt der Fall bei vorsätzlichem Vertuschen, wiederholten bewussten Verstößen trotz Ansprache oder grober Fahrlässigkeit mit Schaden: Hier braucht es arbeitsrechtliche Konsequenzen in Abstimmung mit Personalabteilung und Führungskraft – sonst lernt die Organisation, dass Regeln optional sind. Deine Rolle dabei: Sachverhalt dokumentieren, einordnen, übergeben. Die arbeitsrechtliche Maßnahme selbst ist nicht dein Job.",
        example:
          "Ein Projektteam braucht für einen Kundenauftrag ein nicht freigegebenes Spezial-Tool – der Kunde schreibt es vor. Statt heimlicher Nutzung läuft der Ausnahmeprozess: dokumentierte Ausnahme für dieses Projekt, Auflagen (nur projektbezogene Daten, Löschung nach Projektende, Kunde bestätigt schriftlich seine Anforderung), Laufzeit sechs Monate, Wiedervorlage. Parallel eskaliert ein Bereichsleiter die Ablehnung eines Analyse-Tools zur Geschäftsführung – die folgt nach Anhörung beider Seiten der Empfehlung der KI-Verantwortlichen. Beide Vorgänge stehen im Governance-Protokoll: Ausnahme und Eskalation als normale, geordnete Vorgänge statt als Grabenkämpfe.",
        risk: "Zwei Extreme zerstören Governance gleichermaßen: Der Hardliner ohne Ausnahmen treibt legitime Bedarfe in den Untergrund, der Weichspüler mit stillen Ausnahmen macht Regeln zur Verhandlungsmasse. Und wer ehrliche Fehler bestraft, bekommt nie wieder eine Selbstmeldung.",
        memo: "Ausnahmen dokumentiert und befristet, Eskalationen geordnet, ehrliche Fehler straffrei – Vorsatz und Vertuschung nicht.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Was unterscheidet eine gute Ausnahme von einem stillen Auge-Zudrücken?",
            answer:
              "Die Dokumentation: Grund, Auflagen, Entscheider, Befristung und Wiedervorlage. Eine dokumentierte Ausnahme stärkt die Regel, eine stille höhlt sie aus.",
          },
          {
            question: "Wann sind arbeitsrechtliche Konsequenzen bei KI-Regelverstößen angebracht?",
            answer:
              "Bei vorsätzlichem Vertuschen, wiederholten bewussten Verstößen trotz Ansprache oder grober Fahrlässigkeit mit Schaden – nicht bei ehrlichen Fehlern und Selbstmeldungen.",
          },
        ],
      },
      {
        slug: "off-richtlinie-leben",
        title: "Die Richtlinie zum Leben bringen",
        goal: "Du kennst die Methoden, mit denen eine Richtlinie im Alltag ankommt: Kommunikation, Vorbilder, Wiederholung und Aktualisierung.",
        content:
          "Zwischen \"Richtlinie verabschiedet\" und \"Richtlinie gelebt\" liegt die eigentliche Arbeit. Vier Hebel entscheiden:\n\nHebel 1 – Einführung als Ereignis, nicht als E-Mail: Eine Richtlinie, die als Anhang einer Massenmail eingeführt wird, ist tot geboren. Besser: kurze Team-Sessions (15 Minuten reichen), in denen die Kernregeln an echten Beispielen aus dem jeweiligen Team durchgespielt werden. Der Unterschied zwischen \"Ich habe davon gehört\" und \"Ich weiß, was das für mich heißt\" entsteht genau hier.\n\nHebel 2 – Führungskräfte als Verbündete: Mitarbeitende folgen dem, was ihre Führungskraft tut, nicht dem, was im Intranet steht. Wenn der Abteilungsleiter selbst ungeprüfte KI-Texte verschickt, ist deine Richtlinie in seiner Abteilung Makulatur. Deshalb: Führungskräfte zuerst schulen, ihre Fragen ernst nehmen, sie als Multiplikatoren gewinnen – und Verstöße von Führungskräften genauso behandeln wie andere. Nichts zerstört Glaubwürdigkeit schneller als Sonderrecht nach oben.\n\nHebel 3 – Präsenz im Alltag: Die Richtlinie muss dort auftauchen, wo gearbeitet wird: die Datenmatrix als Karte am Arbeitsplatz oder im Intranet-Schnellzugriff, der KI-Hinweis im Onboarding, die Kennzeichnungs-Checkliste im Freigabeworkflow, ein kurzer Punkt in Teammeetings, wenn es Anlässe gibt. Steter Tropfen – nicht Dauerbeschallung.\n\nHebel 4 – Aktualisierung mit Anlass und Rhythmus: Die Richtlinie lebt: Neue Tools, neue Rechtslage, Erkenntnisse aus Vorfällen und Feedback fließen ein. Bewährt hat sich der Jahresrhythmus für die reguläre Überarbeitung plus anlassbezogene Updates. Jede Änderung wird versioniert, kommuniziert (\"Was ist neu und warum\") und im Schulungsmaterial nachgezogen. Ein Änderungsprotokoll zeigt Auditoren und Kunden, dass das Regelwerk gepflegt wird – gepflegte Regeln sind glaubwürdige Regeln.\n\nDein Realitätscheck: Frag in sechs Monaten fünf zufällige Mitarbeitende nach den drei wichtigsten KI-Regeln. Wenn vier von fünf sie sinngemäß nennen können, lebt deine Richtlinie. Wenn nicht, weißt du, woran du arbeitest – und es ist fast nie der Text.",
        example:
          "Nach der Verabschiedung tourt die KI-Verantwortliche durch acht Teamrunden: je 15 Minuten, drei Kernregeln, zwei teamspezifische Beispiele, offene Fragen. Der Vertrieb fragt nach Kundenlisten im KI-Tool (klare Antwort: nein – mit freigegebener Alternative), die Buchhaltung nach dem Rechnungs-Zusammenfassen (ja, mit dem Firmenzugang). Ein halbes Jahr später der Realitätscheck: Vier von fünf Befragten nennen die Kernregeln, Freigabeanträge kommen regelmäßig, zwei Selbstmeldungen wurden sauber behandelt. Die Richtlinie existiert nicht nur – sie arbeitet.",
        risk: "Der häufigste Tod einer Richtlinie ist nicht der Widerstand, sondern das Vergessen: eingeführt per Mail, nie wieder erwähnt, nach einem Jahr veraltet. Und die zweithäufigste Todesursache ist die Führungskraft, die sich selbst nicht daran hält.",
        memo: "Einführung im Team, Führungskräfte als Vorbilder, Präsenz im Alltag, jährliche Pflege – so wird aus Papier Praxis.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum sind Führungskräfte der kritischste Faktor für eine gelebte Richtlinie?",
            answer:
              "Weil Mitarbeitende dem Verhalten ihrer Führungskraft folgen, nicht dem Intranet-Text – Vorbildverhalten und gleiche Regeln für alle entscheiden über die Glaubwürdigkeit.",
          },
          {
            question: "Wie prüfst du nach einigen Monaten, ob die Richtlinie lebt?",
            answer:
              "Realitätscheck: zufällig ausgewählte Mitarbeitende nach den Kernregeln fragen – plus Indikatoren wie Freigabeanträge, Meldungen und Rückgang der Schatten-KI.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-datenschutz-sicherheit",
    order: 7,
    title: "Datenschutz und Informationssicherheit für KI-Verantwortliche",
    description:
      "Die DSGVO-Schnittstellen des KI-Einsatzes: Rechtsgrundlagen, Auftragsverarbeitung, Drittlandtransfer, technische Maßnahmen und Betroffenenrechte.",
    lessons: [
      {
        slug: "off-dsgvo-schnittstellen",
        title: "KI und DSGVO: die Schnittstellen im Überblick",
        goal: "Du kennst die datenschutzrechtlichen Kernfragen jedes KI-Einsatzes und kannst sie strukturiert mit dem Datenschutz klären.",
        content:
          "Der AI Act ersetzt die DSGVO nicht – beide gelten nebeneinander. Für die meisten KMU sind die Datenschutzfragen sogar der praktisch wichtigste Teil der KI-Governance, denn personenbezogene Daten stecken in fast jedem Büroprozess.\n\nDie fünf Kernfragen, die du je KI-Anwendung mit dem Datenschutz klären musst:\n\nErstens – Werden personenbezogene Daten verarbeitet? Die Antwort ist öfter ja, als man denkt: Namen in E-Mails, Stimmen in Meeting-Aufzeichnungen, Metadaten in Dokumenten. \"Wir geben doch nur Texte ein\" ist keine Antwort, sondern der Anfang der Prüfung.\n\nZweitens – Auf welcher Rechtsgrundlage? Jede Verarbeitung braucht eine: Vertragserfüllung, berechtigtes Interesse (mit dokumentierter Abwägung), Einwilligung. Das klärt der Datenschutz – aber du musst die Frage stellen, bevor das Tool läuft.\n\nDrittens – Wohin fließen die Daten? Bleibt die Verarbeitung beim Anbieter in der EU? Geht sie in Drittländer? Werden Eingaben für das Training verwendet? Diese Fragen entscheiden über AVV und Zulässigkeit (nächste Lektion).\n\nViertens – Wie lange und wofür werden Daten gespeichert? Chatverläufe, Logs, Trainingsdaten – Speicherdauer und Zweckbindung gelten auch für KI-Tools.\n\nFünftens – Sind die Grundsätze eingehalten? Datenminimierung (nur eingeben, was nötig ist – das ist der Punkt, den deine Schulungen trainieren), Transparenz gegenüber Betroffenen (Datenschutzerklärung aktualisieren, wenn KI-Tools Kundendaten verarbeiten!), Richtigkeit und Speicherbegrenzung.\n\nDeine Arbeitsteilung mit dem Datenschutz: Du bringst die KI-Sicht ein (Was tut das Tool wirklich? Welche Einstellungen gibt es?), der Datenschutz die rechtliche Bewertung. Gemeinsames Werkzeug ist das Verarbeitungsverzeichnis: Jede produktive KI-Anwendung mit Personenbezug gehört hinein – und dein KI-Inventar liefert dafür die Vorlage.",
        example:
          "Ein Unternehmen will Meeting-Transkription mit KI einführen. Die Fünf-Fragen-Prüfung mit der Datenschutzbeauftragten ergibt: Personenbezug klar (Stimmen, Namen, Aussagen), Rechtsgrundlage berechtigtes Interesse mit Information aller Teilnehmenden und Widerspruchsmöglichkeit, Verarbeitung beim EU-Anbieter mit AVV, Speicherung 90 Tage mit automatischer Löschung, externe Gäste werden vorab informiert und um Zustimmung gebeten. Das Verarbeitungsverzeichnis bekommt einen neuen Eintrag, die Datenschutzerklärung einen Absatz. Aufwand: zwei Wochen. Der Konkurrent, der \"einfach mal aufzeichnete\", kassierte die erste Kundenbeschwerde nach drei Tagen.",
        risk: "Die gefährlichste Abkürzung ist die nicht gestellte Frage: Ein KI-Tool ohne geklärte Rechtsgrundlage und ohne Eintrag im Verarbeitungsverzeichnis ist eine tickende Beschwerde – und bei Behördenanfragen zählt nur, was dokumentiert ist.",
        memo: "Fünf Fragen vor jedem Go-live: Personenbezug? Rechtsgrundlage? Datenfluss? Speicherung? Grundsätze? – gemeinsam mit dem Datenschutz.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Gilt die DSGVO neben dem AI Act weiter?",
            answer:
              "Ja, beide gelten nebeneinander – für die meisten KMU sind die DSGVO-Fragen sogar der praktisch wichtigste Teil des KI-Einsatzes.",
          },
          {
            question: "Welches Dokument verbindet dein KI-Inventar mit der Datenschutz-Dokumentation?",
            answer:
              "Das Verarbeitungsverzeichnis: Jede produktive KI-Anwendung mit Personenbezug gehört hinein, das Inventar liefert die Grundlage.",
          },
        ],
      },
      {
        slug: "off-avv-drittland",
        title: "Auftragsverarbeitung, Drittlandtransfer und Trainingsnutzung",
        goal: "Du weißt, welche vertraglichen Zusagen ein KI-Anbieter liefern muss und worauf du bei Datenflüssen in Drittländer achtest.",
        content:
          "Wenn ein KI-Anbieter personenbezogene Daten für euch verarbeitet, ist er in der Regel Auftragsverarbeiter – und dann führt an drei Themen kein Weg vorbei:\n\nDer Auftragsverarbeitungsvertrag (AVV): Er regelt, dass der Anbieter Daten nur nach euren Weisungen verarbeitet, Vertraulichkeit und Sicherheit gewährleistet, Unterauftragnehmer offenlegt und bei Betroffenenrechten unterstützt. Kein AVV, keine Verarbeitung personenbezogener Daten – so einfach ist die Regel. Seriöse Business-Angebote haben den AVV standardmäßig; wenn ein Anbieter auf die AVV-Frage ausweicht, ist die Prüfung faktisch beendet.\n\nDer Drittlandtransfer: Verarbeitet der Anbieter Daten außerhalb der EU/des EWR, braucht es eine gültige Transfergrundlage – etwa einen Angemessenheitsbeschluss der EU-Kommission für das Zielland oder Standardvertragsklauseln mit ergänzenden Maßnahmen. Wichtig für deine Prüfpraxis: Nicht nur der Serverstandort zählt, sondern auch Fernzugriffe (Support aus Drittländern!) und die Unterauftragskette. Die Angaben findest du in AVV-Anlagen und Transparenzdokumenten – und die Bewertung macht der Datenschutz, aber du sammelst die Fakten.\n\nDie Trainingsnutzung: Die KI-spezifische Zusatzfrage, die klassische Software nicht kannte: Verwendet der Anbieter eure Eingaben zum Training seiner Modelle? Für Firmendaten ist die Antwort, die du sehen willst: nein, vertraglich ausgeschlossen. Viele Anbieter bieten das in Business-Tarifen an – genau deshalb sind kostenlose Consumer-Versionen für Firmendaten meist tabu. Prüfe auch die Voreinstellungen: Manche Tools haben Trainingsnutzung als Default aktiviert und erlauben das Opt-out nur in den Einstellungen.\n\nDein Prüfpaket je Anbieter (als Checkliste im Freigabeprozess): AVV vorhanden und unterschrieben? Verarbeitungsorte und Unterauftragnehmer dokumentiert? Transfergrundlage bei Drittlandbezug? Trainingsnutzung ausgeschlossen bzw. deaktiviert? Löschfristen und Exportmöglichkeiten geregelt? Fünf Häkchen, die über Freigabe oder Ablehnung entscheiden.",
        example:
          "Zwei Anbieter für dasselbe Einsatzszenario: Anbieter A (Business-Tarif) liefert AVV mit Unterauftragnehmerliste, EU-Verarbeitung, vertraglichem Trainingsausschluss und 30-Tage-Löschung – alle fünf Häkchen in zwei Tagen Prüfzeit. Anbieter B wirbt mit besseren Funktionen, aber: kein AVV im Angebot (\"machen wir sonst nie\"), Verarbeitung \"global\", zur Trainingsnutzung nur vage Aussagen. Die KI-Verantwortliche empfiehlt A – nicht weil B schlechtere KI hat, sondern weil B ein unkalkulierbares Datenschutzrisiko ist. Die Fachabteilung murrt kurz und ist drei Monate später zufrieden: A funktioniert, und die Kundenauditorin nickte beim AVV-Ordner anerkennend.",
        risk: "Ohne AVV und Transferprüfung verarbeitet ihr personenbezogene Daten auf rechtlich ungesichertem Boden – und die Trainingsnutzungs-Falle ist besonders tückisch, weil sie in Voreinstellungen und AGB-Änderungen versteckt sein kann. Anbieterzusagen veralten: Auch Bestandstools brauchen den regelmäßigen Vertrags-Check.",
        memo: "Fünf Häkchen je Anbieter: AVV, Verarbeitungsorte, Transfergrundlage, Trainingsausschluss, Löschregeln – ohne sie keine Firmendaten.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Was ist die Konsequenz, wenn ein Anbieter keinen AVV anbietet?",
            answer:
              "Keine Verarbeitung personenbezogener Daten über dieses Tool – ohne AVV fehlt die vertragliche Grundlage der Auftragsverarbeitung.",
          },
          {
            question: "Warum reicht der Blick auf den Serverstandort beim Drittlandtransfer nicht aus?",
            answer:
              "Weil auch Fernzugriffe (z. B. Support aus Drittländern) und Unterauftragnehmer Transfers auslösen können – die ganze Verarbeitungskette zählt.",
          },
        ],
      },
      {
        slug: "off-tom-fuer-ki",
        title: "Technische und organisatorische Maßnahmen für den KI-Einsatz",
        goal: "Du kennst die wichtigsten technischen und organisatorischen Schutzmaßnahmen, mit denen ihr KI-Nutzung absichert.",
        content:
          "Regeln wirken nur so gut wie die Technik und Organisation dahinter. Die wichtigsten Maßnahmen (TOMs) für den KI-Einsatz – priorisiert nach Wirkung:\n\nZugangs- und Kontosteuerung: Firmenzugänge statt Privatkonten, zentrale Verwaltung (idealerweise Single Sign-on), Zwei-Faktor-Authentifizierung verpflichtend, Rechte nach Rollen (nicht jeder braucht jedes Tool), und ein sauberer Offboarding-Prozess – der Ex-Mitarbeiter mit aktivem KI-Konto und vollen Chatverläufen ist ein Klassiker unter den vermeidbaren Pannen.\n\nKonfiguration der Tools: Die sichersten Einstellungen sind selten die Voreinstellungen. Trainingsnutzung deaktivieren, Historien-Speicherung begrenzen, Datenregionen festlegen (EU), Integrationen und Plugins auf das Nötige beschränken, Admin-Konsolen nutzen, um Richtlinieneinstellungen zentral zu erzwingen statt auf 60 Einzelkonfigurationen zu hoffen.\n\nDatenflusskontrolle: Wo technisch möglich: Schutzmechanismen, die sensible Daten vor der Eingabe erkennen oder maskieren (DLP-Ansätze), Upload-Beschränkungen für bestimmte Dateitypen oder Klassifizierungsstufen, getrennte Umgebungen für Experimente (nur Testdaten) und Produktion.\n\nProtokollierung und Monitoring: Nutzungs- und Admin-Logs der KI-Tools aufbewahren (bei Hochrisiko-Systemen Pflicht!), regelmäßige Auswertung auf Auffälligkeiten – ungewöhnliche Datenmengen, seltsame Zugriffszeiten, unbekannte Geräte. Wichtig: Monitoring transparent machen und mit Betriebsrat/Datenschutz abstimmen – Kontrolle der Datensicherheit ja, heimliche Verhaltensüberwachung nein.\n\nOrganisatorische Maßnahmen: Das Vier-Augen-Prinzip vor Außenwirkung, die dokumentierten Prozesse (Freigabe, Vorfall, Ausnahme), Schulung und Sensibilisierung als Dauerprogramm, klare Verantwortlichkeiten – kurz: alles, was du in diesem Kurs aufbaust, IST ein organisatorischer Schutzbaustein.\n\nDein Vorgehen: Nicht alles auf einmal. Priorisiere nach Risiko: Kontosteuerung und sichere Konfiguration zuerst (großer Effekt, überschaubarer Aufwand), dann Protokollierung, dann die feineren Datenflusskontrollen. Und dokumentiere die Maßnahmen im TOM-Verzeichnis – der Datenschutz braucht sie für seine Nachweise, du für deine Audits.",
        example:
          "Nach der Inventur härtet ein Unternehmen seine KI-Landschaft in drei Wellen: Welle 1 (ein Monat): Alle KI-Tools auf Firmenkonten mit 2FA und zentraler Verwaltung, Trainingsnutzung überall deaktiviert, EU-Datenregion fixiert. Welle 2 (Quartal): Admin-Richtlinien erzwingen die Einstellungen zentral, Offboarding-Checkliste um KI-Konten ergänzt, Logs laufen ins zentrale Monitoring. Welle 3: Upload-Filter für als vertraulich klassifizierte Dokumente. Als ein halbes Jahr später ein Laptop gestohlen wird, ist der Schaden begrenzt: 2FA verhindert den Kontozugriff, die zentrale Verwaltung sperrt alle Zugänge in Minuten.",
        risk: "Die häufigste Lücke ist die Voreinstellung: Tools laufen jahrelang mit aktivierter Trainingsnutzung, unbegrenzter Historie und ohne 2FA, weil nie jemand die Einstellungen geprüft hat. Und ohne Offboarding-Prozess sammeln Ex-Mitarbeitende aktive Zugänge wie Trophäen.",
        memo: "Konten härten, Voreinstellungen misstrauen, zentral erzwingen statt individuell hoffen – und alles im TOM-Verzeichnis dokumentieren.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum solltest du den Voreinstellungen von KI-Tools misstrauen?",
            answer:
              "Weil die sichersten Einstellungen selten Default sind – Trainingsnutzung, unbegrenzte Historien und fehlende Datenregion-Fixierung müssen aktiv deaktiviert bzw. konfiguriert werden.",
          },
          {
            question: "Welche organisatorische Maßnahme schützt vor dem Klassiker \"Ex-Mitarbeiter mit aktivem KI-Konto\"?",
            answer:
              "Ein Offboarding-Prozess, der KI-Zugänge systematisch erfasst und beim Austritt sofort sperrt – am besten über zentrale Kontoverwaltung.",
          },
        ],
      },
      {
        slug: "off-betroffenenrechte-ki",
        title: "Betroffenenrechte und automatisierte Entscheidungen",
        goal: "Du weißt, wie Auskunfts-, Löschungs- und Widerspruchsrechte beim KI-Einsatz funktionieren und wo automatisierte Einzelentscheidungen Grenzen haben.",
        content:
          "Menschen, deren Daten ihr verarbeitet, haben Rechte – und KI-Einsatz macht deren Erfüllung kniffliger, nicht optional. Die Punkte, die du im Griff haben musst:\n\nAuskunft (Art. 15 DSGVO): Wenn ein Kunde fragt, welche Daten ihr über ihn verarbeitet, müssen auch KI-Verarbeitungen in die Antwort – welche Tools, welche Zwecke, welche Empfänger. Das setzt voraus, dass du weißt, wo überall Personendaten in KI-Tools stecken: noch ein Grund für Inventar und Verarbeitungsverzeichnis. Praktisch heikel sind Chatverläufe: Auch dort können personenbezogene Daten von Dritten liegen.\n\nLöschung (Art. 17): \"Recht auf Vergessenwerden\" trifft KI-Realität: Beim Anbieter gespeicherte Verläufe und Uploads müssen löschbar sein – prüfe im Freigabeprozess, ob und wie der Anbieter Löschungen unterstützt (API, Aufbewahrungsfristen, Lösch-Nachweis). In die Modelle eintrainierte Informationen sind praktisch kaum rückholbar – genau deshalb ist der Trainingsausschluss für Firmendaten so zentral: Was nie ins Training fließt, muss nie herausoperiert werden.\n\nWiderspruch und Einschränkung: Betroffene können Verarbeitungen widersprechen, die auf berechtigtem Interesse beruhen. Eure Prozesse müssen das technisch können – etwa einzelne Personen von der KI-Transkription ausnehmen.\n\nAutomatisierte Einzelentscheidungen (Art. 22): Entscheidungen mit rechtlicher oder ähnlich erheblicher Wirkung dürfen grundsätzlich nicht ausschließlich automatisiert getroffen werden – Bewerbungsabsagen, Kreditablehnungen, Vertragskündigungen. Die menschliche Beteiligung muss echt sein: Eine Person, die faktisch nur den KI-Vorschlag durchwinkt, ist keine menschliche Entscheidung. Das verzahnt sich direkt mit der Hochrisiko-Aufsicht aus dem AI Act: Die prüfende Person braucht Kompetenz, Information und tatsächliche Entscheidungsmacht.\n\nDein Beitrag als KI-Verantwortliche(r): Sorge dafür, dass jeder KI-Prozess mit Personenbezug eine Antwort auf vier Fragen hat: Können wir Auskunft geben? Können wir löschen? Können wir ausnehmen? Ist bei folgenreichen Entscheidungen ein Mensch echt beteiligt? Diese vier Fragen gehören in deine Freigabe-Checkliste – dann sind Betroffenenrechte eingebaut statt nachgerüstet.",
        example:
          "Ein Kunde verlangt Auskunft und Löschung seiner Daten. Dank Inventar und Verarbeitungsverzeichnis kann das Unternehmen vollständig antworten – inklusive des KI-Tools im Kundenservice, wo drei Support-Chats mit seinen Daten lagen. Die Löschung läuft über die dokumentierte Anbieter-Schnittstelle, der Löschnachweis geht zu den Akten. Kontrastfall aus dem Vorjahr, vor der KI-Governance: Damals wusste niemand sicher, in welchen Tools Kundendaten steckten – die Auskunft dauerte sechs Wochen, war lückenhaft und brachte eine Beschwerde bei der Datenschutzbehörde ein.",
        risk: "Betroffenenrechte scheitern beim KI-Einsatz fast immer an fehlender Übersicht: Wer nicht weiß, in welchen Tools und Verläufen Personendaten liegen, kann weder vollständig Auskunft geben noch löschen. Und die nur formale menschliche Beteiligung bei automatisierten Entscheidungen ist ein Haftungsrisiko mit Ansage.",
        memo: "Vier Fragen je KI-Prozess: Auskunft möglich? Löschung möglich? Ausnahme möglich? Mensch echt beteiligt?",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum ist der Trainingsausschluss für die Löschbarkeit so wichtig?",
            answer:
              "In Modelle eintrainierte Informationen sind praktisch kaum rückholbar – was nie ins Training fließt, muss bei Löschverlangen auch nicht herausgeholt werden.",
          },
          {
            question: "Wann ist menschliche Beteiligung an einer automatisierten Entscheidung \"echt\"?",
            answer:
              "Wenn die Person kompetent, informiert und tatsächlich entscheidungsbefugt ist – bloßes Durchwinken von KI-Vorschlägen genügt nicht.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-vorfallsmanagement",
    order: 8,
    title: "Vorfallsmanagement und Meldepflichten",
    description:
      "Wie du einen KI-Vorfallsprozess aufbaust, gesetzliche Meldefristen einhältst, im Ernstfall richtig kommunizierst und aus Vorfällen Systemverbesserungen machst.",
    lessons: [
      {
        slug: "off-vorfallsprozess-aufbauen",
        title: "Den Vorfallsprozess aufbauen",
        goal: "Du kannst einen KI-Vorfallsprozess gestalten – von der niederschwelligen Meldung bis zur strukturierten Erstbewertung.",
        content:
          "Deine Mitarbeitenden lernen im Basic-Kurs, Vorfälle zu melden. Du baust die Maschinerie, die diese Meldungen auffängt. Vier Bausteine:\n\nBaustein 1 – Der Meldekanal: So einfach wie möglich – eine E-Mail-Adresse, ein kurzes Formular, die direkte Ansprache. Erfasst werden nur die Basisfakten: Was, wann, welches Tool, welche Daten, was wurde schon getan? Alles Weitere klärst du im Nachgang. Jede Pflichtangabe mehr am Anfang kostet Meldungen.\n\nBaustein 2 – Die Erstbewertung (Triage): Nicht jeder Vorfall ist ein Notfall. Bewerte binnen definierter Frist (z. B. 24 Stunden, bei Personenbezug sofort) drei Fragen: Sind personenbezogene Daten betroffen? Dann sofort Datenschutz einbinden – die 72-Stunden-Frist für Behördenmeldungen läuft ab Kenntnis. Läuft der Abfluss noch? Dann zuerst stoppen (Konto sperren, Inhalt zurückrufen, Tool-Anbieter kontaktieren). Wie groß ist der mögliche Schaden? Danach richtet sich, wen du eskalierst.\n\nBaustein 3 – Die Rollenverteilung: Wer bewertet (du plus Datenschutz), wer entscheidet über Eskalation (definiert nach Schwere), wer kommuniziert intern und extern (nicht jeder!), wer dokumentiert? Im Ernstfall ist keine Zeit für Zuständigkeitsklärung – die Liste muss vorher stehen, inklusive Vertretungen und Erreichbarkeiten.\n\nBaustein 4 – Das Vorfallsregister: Jeder Vorfall wird erfasst – auch die kleinen und die Beinahe-Fälle. Kategorie, Schwere, Ursache, Maßnahmen, Status, Lessons Learned. Das Register ist dein Frühwarnsystem (Muster erkennen!), dein Nachweis gegenüber Prüfern und die Grundlage für Management-Berichte.\n\nUnd übe den Prozess: Ein Trockenlauf pro Jahr – ein fiktiver Vorfall, durchgespielt von Meldung bis Abschluss – deckt mehr Schwächen auf als jede Prozessbeschreibung. Der erste echte Ernstfall ist der falsche Zeitpunkt, um zu merken, dass die Datenschutzbeauftragte im Urlaub keine Vertretung hat.",
        example:
          "Ein Unternehmen baut den Prozess und testet ihn mit einem Trockenlauf: Fiktive Meldung \"Kundenliste in privates KI-Tool eingegeben\", gemeldet Freitag 16 Uhr. Ergebnis des Tests: Die Meldung erreicht die KI-Verantwortliche schnell – aber die Datenschutzbeauftragte ist nicht erreichbar, ihre Vertretung kennt den KI-Prozess nicht, und niemand weiß, wer den Tool-Anbieter kontaktieren darf. Drei Lücken, gefunden in 90 Minuten Übung statt im Ernstfall. Nach der Korrektur (Vertretungsregelung, Anbieter-Kontaktliste, Eskalationskarte) läuft der nächste Trockenlauf sauber durch.",
        risk: "Ohne vorbereiteten Prozess wird jeder Vorfall zum Improvisationstheater: verlorene Stunden bei laufenden Fristen, widersprüchliche Kommunikation, fehlende Dokumentation. Die 72-Stunden-Frist des Datenschutzrechts wartet nicht, bis ihr eure Zuständigkeiten geklärt habt.",
        memo: "Leichter Meldekanal, schnelle Triage, klare Rollen, gepflegtes Register – und einmal im Jahr den Ernstfall üben.",
        durationMinutes: 9,
        required: true,
        miniChecks: [
          {
            question: "Welche drei Fragen klärt die Erstbewertung eines KI-Vorfalls?",
            answer:
              "Sind personenbezogene Daten betroffen (dann sofort Datenschutz, Fristen!)? Läuft der Abfluss noch (dann zuerst stoppen)? Wie groß ist der mögliche Schaden (bestimmt die Eskalation)?",
          },
          {
            question: "Warum solltest du den Vorfallsprozess jährlich im Trockenlauf üben?",
            answer:
              "Weil Übungen Lücken (Vertretungen, Erreichbarkeiten, Zuständigkeiten) gefahrlos aufdecken – der erste echte Ernstfall ist der teuerste Zeitpunkt, sie zu entdecken.",
          },
        ],
      },
      {
        slug: "off-meldepflichten-fristen",
        title: "Gesetzliche Meldepflichten und Fristen im Griff",
        goal: "Du kennst die relevanten Meldepflichten bei KI-Vorfällen – von der DSGVO bis zu den AI-Act-Pflichten bei Hochrisiko-Systemen.",
        content:
          "Bei manchen Vorfällen entscheidet nicht ihr, ob gemeldet wird – das Gesetz tut es. Die Pflichten, die du kennen musst:\n\nDatenschutzverletzungen (DSGVO): Der häufigste Fall im KI-Kontext – personenbezogene Daten sind unbefugt abgeflossen, etwa durch Eingabe in ein ungesichertes Tool oder ein kompromittiertes Konto. Die Regel: Meldung an die Aufsichtsbehörde unverzüglich, möglichst binnen 72 Stunden ab Kenntnis, außer die Verletzung führt voraussichtlich nicht zu einem Risiko für die Betroffenen. Bei hohem Risiko müssen zusätzlich die Betroffenen selbst benachrichtigt werden. Die Bewertung macht der Datenschutz – aber deine Triage muss den Fall schnell genug dorthin bringen. Wichtig: Auch die dokumentierte Entscheidung, NICHT zu melden (mit Begründung), ist Pflicht – das Verletzungsregister führt der Datenschutz, dein Vorfallsregister liefert zu.\n\nSchwerwiegende Vorfälle bei Hochrisiko-KI (AI Act): Betreiber von Hochrisiko-Systemen müssen schwerwiegende Vorfälle den Anbieter informieren und es gelten Meldewege an die Behörden mit engen Fristen. Wenn ihr Hochrisiko-Systeme betreibt, gehört das ins Pflichtenpaket aus Modul 2 – inklusive der Frage, wer meldet und woher die nötigen Informationen kommen.\n\nWeitere Meldewege je nach Kontext: Cybervorfälle können unter NIS-2-Umsetzungen fallen (wenn euer Unternehmen in den Anwendungsbereich fällt), Vorfälle mit Finanzbezug unter sektorale Regeln, vertragliche Informationspflichten gegenüber Kunden (viele B2B-Verträge verlangen Vorfallsmeldungen binnen definierter Fristen!) – und die Versicherung will oft ebenfalls fristgerecht informiert sein, sonst wackelt der Deckungsschutz.\n\nDeine Werkzeuge dafür: Eine Meldepflichten-Übersicht (welcher Vorfallstyp löst welche Pflicht mit welcher Frist aus – mit dem Datenschutz und ggf. Rechtsberatung erstellt), die Kontaktliste (Behörde, Anbieter, Versicherung, Schlüsselkunden) und der Grundsatz aus dem Basic-Kurs, hier in Verantwortlichen-Version: Die Frist läuft ab Kenntnis – deshalb ist jede Stunde, die eine interne Meldung braucht, geliehene Zeit.",
        example:
          "Ein kompromittiertes KI-Konto mit gespeicherten Kundendaten wird Dienstagmittag entdeckt. Die vorbereitete Meldepflichten-Übersicht spielt ihre Stärke aus: Datenschutzverletzung → Datenschutzbeauftragte übernimmt die 72-Stunden-Bewertung (Meldung erfolgt Mittwoch), zwei Großkunden haben vertragliche 48-Stunden-Informationsklauseln → Vertrieb informiert nach abgestimmtem Wortlaut, Cyberversicherung wird fristgerecht notifiziert. Alles dokumentiert, alle Fristen gehalten. Ohne die Übersicht hätte allein die Recherche der Kundenverträge zwei Tage gekostet – die Frist wäre gerissen.",
        risk: "Gerissene Meldefristen verwandeln einen beherrschbaren Vorfall in einen Rechtsverstoß mit eigenem Bußgeldrisiko – und verspätete Kunden- oder Versicherungsinformationen kosten Verträge und Deckung. Die Frist kennt kein \"wir mussten erst intern klären\".",
        memo: "Meldepflichten-Übersicht und Kontaktliste vorbereiten, bevor es brennt – Fristen laufen ab Kenntnis, nicht ab Zuständigkeitsklärung.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche Grundregel gilt für die Meldung von Datenschutzverletzungen an die Behörde?",
            answer:
              "Unverzüglich, möglichst binnen 72 Stunden ab Kenntnis – außer es besteht voraussichtlich kein Risiko für Betroffene; auch die Nicht-Meldung wird dokumentiert und begründet.",
          },
          {
            question: "Welche Meldewege können neben der DSGVO noch relevant sein?",
            answer:
              "AI-Act-Meldungen bei Hochrisiko-Vorfällen, ggf. NIS-2/sektorale Pflichten, vertragliche Informationspflichten gegenüber Kunden und die fristgerechte Information der Versicherung.",
          },
        ],
      },
      {
        slug: "off-krisenkommunikation",
        title: "Kommunikation im Vorfall: intern und extern",
        goal: "Du weißt, wie du bei einem KI-Vorfall intern und extern kommunizierst, ohne Panik zu erzeugen oder Vertrauen zu verspielen.",
        content:
          "Wie ein Unternehmen über einen Vorfall spricht, entscheidet oft stärker über den Schaden als der Vorfall selbst. Die Prinzipien:\n\nIntern – schnell, sachlich, lernorientiert: Die betroffenen Teams brauchen schnelle, klare Information: Was ist passiert, was bedeutet es für ihre Arbeit, was sollen sie tun (und was nicht – z. B. keine eigenen Auskünfte an Kunden geben). Die meldende Person verdient Rückmeldung und, bei ehrlicher Meldung, ausdrücklichen Dank – jede interne Kommunikation, die nach Schuldigensuche riecht, kostet dich die nächsten zehn Meldungen. Größere Vorfälle bekommen nach Abschluss eine kurze interne Aufarbeitung: was passiert ist, was geändert wurde – das zeigt, dass Meldungen wirken.\n\nExtern – ehrlich, koordiniert, aus einer Hand: Wenn Kunden oder Partner betroffen sind, gilt: aktiv informieren, bevor sie es anderswo erfahren; ehrlich über das, was man weiß und noch nicht weiß; konkret bei den Punkten \"Was bedeutet das für Sie?\" und \"Was tun wir dagegen?\". Keine Beschönigungen – nichts fliegt einem so um die Ohren wie ein \"alles unter Kontrolle\", dem drei Tage später neue Details widersprechen. Und: Externe Kommunikation läuft ausschließlich über die definierte Stelle (Geschäftsleitung, ggf. mit Rechtsberatung abgestimmt) – gut gemeinte Einzelauskünfte von Mitarbeitenden erzeugen widersprüchliche Aussagen, die später gegen euch stehen.\n\nDie Balance bei Behörden und Betroffenen: Pflichtmeldungen (vorige Lektion) folgen ihren Formaten und Fristen. Für die Benachrichtigung Betroffener gilt: verständliche Sprache statt Juristendeutsch, konkrete Handlungsempfehlungen (\"ändern Sie dieses Passwort\"), erreichbare Ansprechstelle.\n\nDein Beitrag als KI-Verantwortliche(r): Du lieferst die präzisen Fakten (was ist technisch passiert, welche Daten, welcher Zeitraum) und hältst die Faktenlage konsistent – du bist die Quelle der Wahrheit, aus der alle Kommunikation schöpft. Vorbereitete Bausteine helfen enorm: eine Vorlage für Kundeninformationen und eine für interne Erstinfos, im Ruhezustand geschrieben, im Ernstfall angepasst statt neu erfunden.",
        example:
          "Durch ein fehlkonfiguriertes KI-Tool waren Projektdaten von vier Kunden zeitweise für andere Nutzer einsehbar. Das Unternehmen kommuniziert nach Plan: Tag 1 – Fakten gesichert, Datenschutz bewertet, betroffene Kunden persönlich angerufen (ehrlich: \"Wir wissen X, prüfen Y, melden uns bis Z\"), schriftliche Info mit konkreten Auswirkungen hinterher. Tag 3 – Abschlussinfo mit Ursache und Maßnahmen. Intern: kurze Team-Info, ausdrücklicher Dank an die Kollegin, die es entdeckte. Ergebnis: Kein Kunde kündigt; einer schreibt, die Offenheit habe ihn überzeugt. Der Vorfall wurde zur Vertrauenswerbung – wegen der Kommunikation, nicht trotz ihr.",
        risk: "Die klassischen Kommunikationsfehler – verharmlosen, verzögern, widersprüchliche Aussagen aus mehreren Mündern – richten oft mehr Schaden an als der Vorfall selbst. Und intern gilt: Eine einzige öffentliche Schuldzuweisung beendet die Meldekultur, die du mühsam aufgebaut hast.",
        memo: "Eine Quelle der Wahrheit, ehrlich und aktiv kommunizieren, Vorlagen vorbereiten – der Ton im Vorfall entscheidet über das Vertrauen danach.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum sollte externe Vorfallskommunikation nur über eine definierte Stelle laufen?",
            answer:
              "Weil widersprüchliche Einzelaussagen Vertrauen zerstören und rechtlich gegen das Unternehmen verwendet werden können – eine Stimme, konsistente Fakten.",
          },
          {
            question: "Was gehört in eine gute Information an betroffene Kunden?",
            answer:
              "Ehrliche Fakten (auch was noch unklar ist), die konkreten Auswirkungen für den Kunden, die ergriffenen Maßnahmen, Handlungsempfehlungen und eine erreichbare Ansprechstelle.",
          },
        ],
      },
      {
        slug: "off-lessons-learned",
        title: "Von der Ursachenanalyse zur Systemverbesserung",
        goal: "Du kannst nach Vorfällen strukturierte Ursachenanalysen leiten und Maßnahmen aufsetzen, deren Wirksamkeit überprüft wird.",
        content:
          "Der Basic-Kurs vermittelt das Prinzip \"Ursachen statt Schuldige\". Du führst es durch – und dafür brauchst du Methode:\n\nDie Ursachenanalyse leiten: Sammle zuerst die Fakten (Zeitleiste: Was geschah wann?), dann frage dich systematisch durch die Ebenen: Warum konnte der Fehler passieren (unmittelbare Ursache)? Warum war er so leicht möglich (Prozess-/Systemursache)? Warum hat ihn nichts aufgefangen (fehlende Kontrolle)? Die bewährte Technik ist mehrfaches \"Warum?\" – vier, fünf Stufen tief, bis du bei etwas ankommst, das das Unternehmen ändern kann. \"Frau X war unaufmerksam\" ist nie die Endstation; \"Der Prozess verlangte das Kürzen von E-Mail-Ketten, aber kein Tool unterstützte es\" ist eine.\n\nMaßnahmen mit Verantwortlichen und Terminen: Jede Erkenntnis wird zur Maßnahme mit klarem Eigentümer und Fälligkeit – sonst bleibt sie fromme Absicht. Priorisiere ehrlich: Die eine wirksame Maßnahme schlägt fünf kosmetische. Und denke in der Hierarchie der Wirksamkeit: Technische Verhinderung (Upload-Sperre) schlägt Prozessänderung (Checkliste), Prozessänderung schlägt Appell (\"bitte künftig aufpassen\"). Appelle sind die schwächste Maßnahme der Welt – wenn deine Maßnahmenliste nur aus Erinnerungen und Schulungen besteht, grab tiefer.\n\nWirksamkeit prüfen: Eine Maßnahme ist nicht erledigt, wenn sie umgesetzt ist, sondern wenn sie wirkt. Definiere bei der Maßnahme gleich mit, woran du die Wirkung erkennst (keine Wiederholungsfälle in X Monaten, Stichproben sauber, Kennzahl verbessert) und wann nachgeprüft wird. Erst dann wird geschlossen – und bei ausbleibender Wirkung nachjustiert statt abgehakt.\n\nWissen teilen: Anonymisierte Fallbeispiele aus echten Vorfällen sind das beste Schulungsmaterial, das es gibt – konkret, relevant, aus dem eigenen Haus. Ein jährlicher \"Was wir gelernt haben\"-Überblick für alle schließt den Kreis: Die Belegschaft sieht, dass Meldungen Verbesserungen auslösen, und meldet weiter.",
        example:
          "Nach dem Vorfall \"vertrauliche Kalkulation im KI-Tool\" leitet der KI-Verantwortliche die Analyse: Warum? Der Mitarbeiter wollte ein Angebot verbessern. Warum mit echten Zahlen? Es gab keine greifbare Anleitung zum Anonymisieren. Warum nicht? Die Richtlinie sagte nur \"keine vertraulichen Daten\" – ohne das Wie. Warum fing es nichts ab? Kein technischer Schutz für klassifizierte Dateien. Maßnahmen: Anonymisierungs-Kurzanleitung mit Beispielen (Eigentümer: KI-Verantwortlicher, 2 Wochen), Upload-Filter für als vertraulich markierte Dokumente (IT, 2 Monate), Fallbeispiel in die nächste Schulungsrunde. Wirksamkeitsprüfung nach einem Quartal: null Wiederholungsfälle, Stichproben sauber – Maßnahme geschlossen.",
        risk: "Die zwei Beerdigungsarten für Lessons Learned: Maßnahmen ohne Eigentümer und Termin (verlaufen im Sand) und Wirksamkeit ohne Prüfung (abgehakt statt erreicht). Wer beides zulässt, sammelt Vorfallsberichte statt Verbesserungen.",
        memo: "Warum-Ketten bis zur Systemursache, Maßnahmen mit Eigentümer und Termin, Wirksamkeit prüfen statt abhaken – Technik schlägt Prozess schlägt Appell.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Was ist die Hierarchie der Maßnahmen-Wirksamkeit?",
            answer:
              "Technische Verhinderung schlägt Prozessänderung, Prozessänderung schlägt Appell – reine Erinnerungen und Ermahnungen sind die schwächste Maßnahmenform.",
          },
          {
            question: "Wann darf eine Maßnahme geschlossen werden?",
            answer:
              "Erst wenn ihre Wirkung belegt ist (z. B. keine Wiederholungsfälle im definierten Zeitraum) – Umsetzung allein ist noch keine Wirksamkeit.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-lieferanten-tools",
    order: 9,
    title: "Lieferanten- und Tool-Management",
    description:
      "Wie du KI-Anbieter systematisch auswählst, Verträge mit den richtigen Zusagen schließt und Tools über den Lebenszyklus steuerst – bis zum sauberen Ausstieg.",
    lessons: [
      {
        slug: "off-tool-auswahl-duediligence",
        title: "Anbieter-Auswahl und Due Diligence",
        goal: "Du kannst KI-Anbieter systematisch prüfen und vergleichen – jenseits von Feature-Listen und Marketingversprechen.",
        content:
          "Tool-Entscheidungen sind Lieferanten-Entscheidungen: Du holst dir nicht eine Software ins Haus, sondern eine dauerhafte Datenbeziehung. Entsprechend prüfst du – strukturiert, nicht nach Bauchgefühl und Demo-Effekt.\n\nDie Prüffelder der KI-Due-Diligence:\n\nDatenschutz und Datenfluss (aus Modul 7): AVV, Verarbeitungsorte, Unterauftragnehmer, Transfergrundlage, Trainingsausschluss, Löschkonzept. Das ist das K.-o.-Feld – wer hier durchfällt, ist raus, egal wie gut die Features sind.\n\nSicherheit: Anerkannte Sicherheitsnachweise und Zertifizierungen des Anbieters (z. B. für Informationssicherheits-Management), Verschlüsselung, Zugriffskontrollen, Incident-Historie – hat der Anbieter Vorfälle transparent kommuniziert oder vertuscht?\n\nAI-Act-Konformität: Kann der Anbieter seine Einstufung und Pflichten darlegen? Bei Hochrisiko-Systemen: Konformitätsunterlagen, CE-Kennzeichnung, Gebrauchsanweisung. Bei GPAI-basierten Produkten: Transparenzinformationen. Ausweichende Antworten hier sind ein Warnsignal erster Güte.\n\nWirtschaftliche Stabilität und Abhängigkeit: Wie lange gibt es den Anbieter? Was passiert mit euren Daten bei Insolvenz oder Übernahme? Gibt es Datenexport in offenen Formaten? Ein Startup mit Killer-Feature, aber ohne Exportfunktion ist eine Wette mit euren Prozessen als Einsatz.\n\nBetrieb und Support: Verfügbarkeitszusagen, Support-Wege und -Zeiten, Update-Politik (kündigt der Anbieter wesentliche Änderungen an – wichtig für deine Neubewertungs-Trigger!), Admin-Funktionen für zentrale Steuerung.\n\nPraktisch bewährt: ein standardisierter Fragebogen an jeden Anbieter (einmal erstellt, immer wieder genutzt) plus Proof of Concept mit Testdaten für die Favoriten. Und vergiss den Bestand nicht: Auch langjährige Anbieter ändern Bedingungen, Subunternehmer und Funktionen – die Due Diligence ist keine Einmal-, sondern eine Lebenszyklus-Übung.",
        example:
          "Für ein Dokumentenanalyse-Tool vergleicht die KI-Verantwortliche drei Anbieter mit ihrem Standard-Fragebogen. Anbieter 1: stark bei Features, aber kein Trainingsausschluss möglich – raus. Anbieter 2: alles solide, Sicherheitsnachweise vorhanden, Export als offenes Format, seit acht Jahren am Markt. Anbieter 3: beeindruckende Demo, aber zwei Jahre alt, keine Sicherheitszertifikate, Antwort zur Insolvenzvorsorge: \"Dazu können wir nichts sagen.\" Entscheidung für Anbieter 2 – dokumentiert mit Bewertungsmatrix. Als Anbieter 3 achtzehn Monate später vom Markt verschwindet, liest die Geschäftsführung die alte Entscheidungsvorlage mit sichtbarem Wohlwollen.",
        risk: "Die Demo verkauft, die Datenbeziehung bleibt: Wer nach Feature-Begeisterung statt nach Due Diligence entscheidet, merkt die Probleme – fehlender AVV, kein Export, instabiler Anbieter – erst, wenn Prozesse und Daten schon drinstecken.",
        memo: "Du kaufst keine Software, du gehst eine Datenbeziehung ein – Datenschutz ist das K.-o.-Feld, Exit-Fähigkeit die Versicherung.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welches Prüffeld ist das K.-o.-Kriterium der Anbieter-Auswahl?",
            answer:
              "Datenschutz und Datenfluss: AVV, Verarbeitungsorte, Transfergrundlage, Trainingsausschluss, Löschkonzept – wer hier durchfällt, ist unabhängig von den Features raus.",
          },
          {
            question: "Warum gehört die Exportfähigkeit der Daten in die Auswahlprüfung?",
            answer:
              "Weil sie über eure Unabhängigkeit entscheidet: Ohne Datenexport in offenen Formaten wird jeder Anbieterwechsel oder Anbieterausfall zum Notfall.",
          },
        ],
      },
      {
        slug: "off-vertraege-zusagen",
        title: "Verträge gestalten: die Zusagen, die zählen",
        goal: "Du weißt, welche vertraglichen Regelungen bei KI-Tools wichtig sind und welche Punkte du vor der Unterschrift prüfen lässt.",
        content:
          "Verhandeln wirst du bei den großen KI-Anbietern selten – aber auswählen, welche Vertragsvariante ihr nehmt, und prüfen, was drinsteht, das ist deine Aufgabe (gemeinsam mit Einkauf und Rechtsberatung). Die Punkte, auf die es ankommt:\n\nDatennutzung und Vertraulichkeit: Der Kern aus Modul 7, jetzt vertraglich: Trainingsausschluss ausdrücklich im Vertrag (nicht nur in einer änderbaren Policy!), Vertraulichkeitszusagen, klare Regelung, wem Ein- und Ausgaben gehören. Achte auf Änderungsklauseln: Kann der Anbieter die Datennutzungsbedingungen einseitig ändern? Dann brauchst du mindestens Ankündigungsfristen und Sonderkündigungsrechte.\n\nNutzungsrechte an den Ergebnissen: Dürft ihr KI-Ausgaben kommerziell nutzen? Gibt es Einschränkungen (Branchen, Weiterverkauf, Schutzrechte)? Manche Anbieter bieten sogar Freistellungen bei Urheberrechtsansprüchen Dritter für Business-Kunden – ein echter Unterschied im Risikoprofil.\n\nVerfügbarkeit und Haftung: Realistische Erwartung: KI-Anbieter haften begrenzt, und Verfügbarkeitszusagen sind bei Consumer-Produkten quasi nicht existent. In Business-Verträgen gibt es mehr – Service Level, Supportzeiten, definierte Haftungssummen. Das Delta zwischen \"kostenlos und ohne Zusagen\" und \"Business-Vertrag mit Zusagen\" ist oft der eigentliche Grund für den Aufpreis.\n\nLaufzeit, Preis und Exit: Preisanpassungsklauseln (KI-Preise sind volatil!), Kündigungsfristen, und die Exit-Regelungen: Datenexport bei Vertragsende (Format, Frist, Kosten), Löschbestätigung nach Ende, Übergangsunterstützung. Der beste Zeitpunkt, den Ausstieg zu regeln, ist vor dem Einstieg.\n\nDeine Rolle in der Praxis: Du erstellst die fachliche Anforderungsliste (was MUSS der Vertrag zusagen – aus Risikobewertung und Due Diligence) und prüfst das Angebot dagegen. Die juristische Feinprüfung macht die Rechtsberatung – aber sie kann nur prüfen, was du als kritisch markiert hast. Ein einseitiges \"Vertrags-Anforderungsblatt KI\" spart beiden Seiten Zeit und verhindert, dass der entscheidende Punkt (Trainingsausschluss!) im Kleingedruckten untergeht.",
        example:
          "Ein Unternehmen steht vor der Wahl: Consumer-Abo eines KI-Tools für 20 €/Monat je Nutzer oder Business-Vertrag für 45 €. Die KI-Verantwortliche legt die Verträge nebeneinander: Consumer – Trainingsnutzung per Default, Bedingungen jederzeit änderbar, keine Verfügbarkeitszusage, kein AVV. Business – vertraglicher Trainingsausschluss, AVV, EU-Datenregion, 99,5 % Verfügbarkeitsziel, Datenexport bei Kündigung binnen 30 Tagen. Ihre Vorlage an die Geschäftsführung rechnet vor: Der Aufpreis kauft genau die Zusagen, ohne die das Tool für Firmendaten gar nicht nutzbar wäre. Entscheidung: Business – und zwar bewusst, nicht zufällig.",
        risk: "Die teuerste Vertragslücke ist die fehlende Exit-Regelung: Ohne zugesicherten Datenexport und Löschbestätigung sitzt ihr bei Preiserhöhungen und Qualitätsverfall fest – und die zweitteuerste ist der Trainingsausschluss, der nur in einer Policy stand, die der Anbieter still geändert hat.",
        memo: "Trainingsausschluss in den Vertrag, Exit vor dem Einstieg regeln, Änderungsklauseln im Blick – der Aufpreis für Business-Verträge kauft die Zusagen, die zählen.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum sollte der Trainingsausschluss im Vertrag stehen statt nur in einer Anbieter-Policy?",
            answer:
              "Weil Policies einseitig geändert werden können – vertragliche Zusagen mit Ankündigungsfristen und Sonderkündigungsrechten geben belastbare Sicherheit.",
          },
          {
            question: "Welche Exit-Regelungen gehören in einen KI-Vertrag?",
            answer:
              "Datenexport bei Vertragsende (Format, Frist, Kosten), Löschbestätigung nach Ende und ggf. Übergangsunterstützung – geregelt vor dem Einstieg.",
          },
        ],
      },
      {
        slug: "off-monitoring-exit",
        title: "Tool-Lebenszyklus: Monitoring, Neubewertung und Ausstieg",
        goal: "Du kannst freigegebene Tools über ihren Lebenszyklus steuern – von der laufenden Überwachung bis zum geordneten Ausstieg.",
        content:
          "Mit der Freigabe beginnt die Verantwortung erst richtig: Tools ändern sich, Anbieter ändern sich, euer Bedarf ändert sich. Lebenszyklus-Management heißt, das im Griff zu behalten:\n\nLaufendes Monitoring: Drei Dinge beobachtest du je Tool: Anbieteränderungen (neue Nutzungsbedingungen, neue Unterauftragnehmer, Funktions-Updates – Anbieter-Newsletter und Changelogs sind Pflichtlektüre für kritische Tools), Nutzungsrealität (wird das Tool wie freigegeben genutzt? Stichproben und Log-Auswertungen zeigen Zweckabweichungen) und Leistung (Qualitätsprobleme, Ausfälle, Support-Erfahrungen – die Fachabteilungen sind deine Sensoren).\n\nDie Neubewertungs-Trigger: Wesentliche Funktionsänderungen, geänderte Datenverarbeitung, Anbieterwechsel/Übernahme, Vorfälle mit dem Tool, geänderte Rechtslage – jeder Trigger löst eine verkürzte Wiederholung der Freigabeprüfung aus. Dokumentiert, wie immer.\n\nDer geordnete Ausstieg: Ob wegen Qualität, Preis, Risiko oder Anbieter-Aus – irgendwann endet jede Tool-Beziehung, und dann zahlt sich deine Vorarbeit aus: Datenexport nach Vertragsregelung, Löschbestätigung einholen, Zugänge deaktivieren, Inventar aktualisieren. Dazu die oft vergessene halbe Miete: die Menschen. Die Nutzer brauchen eine Alternative und Übergangszeit – ein abrupt abgeschaltetes Tool ohne Ersatz erzeugt exakt die Schatten-KI, gegen die du arbeitest. Prompts, Vorlagen und eingespielte Arbeitsweisen der Teams sollten dokumentiert und aufs Nachfolge-Tool übertragen werden.\n\nDie Portfolio-Sicht: Einmal jährlich schaust du aufs Ganze: Welche Tools überlappen sich (Konsolidierungspotenzial spart Geld und Prüfaufwand)? Wo sind wir gefährlich abhängig von einem Anbieter? Welche Verträge laufen aus? Diese Portfolio-Runde gehört in deinen Jahresbericht ans Management – sie macht aus der Tool-Verwaltung eine Steuerungsleistung, die auch betriebswirtschaftlich sichtbar ist.",
        example:
          "Ein Anbieter kündigt per Newsletter an, dass sein Übersetzungstool künftig \"anonymisierte Nutzungsdaten zur Dienstverbesserung\" verwendet – der Neubewertungs-Trigger greift. Die Prüfung ergibt: Für das Unternehmen inakzeptabel, der Anbieter bietet kein Opt-out im aktuellen Tarif. Der geordnete Ausstieg läuft nach Plan: Alternative aus dem Portfolio (das zweite freigegebene Tool kann Übersetzungen mit), sechswöchige Übergangszeit mit Team-Info, Datenexport, Löschbestätigung, Inventar-Update. Kein Drama, keine Schatten-Lösungen – nur ein Prozess, der funktioniert, weil er vor dem Ernstfall gebaut wurde.",
        risk: "Unbeobachtete Tools driften: Nutzungsbedingungen ändern sich still, Nutzung weicht vom freigegebenen Zweck ab, und beim überstürzten Ausstieg ohne Alternative flüchten die Teams in private Lösungen. Lebenszyklus-Lücken machen aus guten Freigabe-Entscheidungen schlechte Bestandsrisiken.",
        memo: "Freigabe ist der Anfang, nicht das Ende: beobachten, neu bewerten, geordnet aussteigen – und jährlich das ganze Portfolio prüfen.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche Ereignisse lösen eine Neubewertung eines freigegebenen Tools aus?",
            answer:
              "Wesentliche Funktionsänderungen, geänderte Datenverarbeitung/Nutzungsbedingungen, Anbieterwechsel oder -übernahme, Vorfälle mit dem Tool und geänderte Rechtslage.",
          },
          {
            question: "Warum braucht ein Tool-Ausstieg immer eine Alternative und Übergangszeit?",
            answer:
              "Weil ein abrupt abgeschaltetes Tool ohne Ersatz die Nutzer in private Schatten-Lösungen treibt – der Exit muss die Arbeit der Teams mitdenken.",
          },
        ],
      },
    ],
  },
  {
    slug: "off-qualitaet-audit",
    order: 10,
    title: "Nachweisführung, Audit und kontinuierliche Verbesserung",
    description:
      "Wie du deine KI-Governance dokumentierst, Prüfungen souverän bestehst, mit Kennzahlen steuerst – und was dich im Abschlusstest erwartet.",
    lessons: [
      {
        slug: "off-dokumentation-nachweise",
        title: "Das Nachweissystem: Dokumentation mit System",
        goal: "Du kennst die Dokumente einer belastbaren KI-Governance und kannst sie zu einem konsistenten Nachweissystem verbinden.",
        content:
          "Alles, was du in diesem Kurs aufgebaut hast, entfaltet seinen Wert erst durch Nachweisbarkeit. Bei einer Kundenprüfung, einer Behördenanfrage oder einem Streitfall zählt nicht, was ihr getan habt – sondern was ihr belegen könnt. Dein Nachweissystem im Überblick:\n\nDie Kerndokumente: Das KI-Inventar mit Risikoeinstufungen (Modul 4), die KI-Richtlinie mit Versionshistorie (Modul 6), das Schulungsregister mit verifizierbaren Nachweisen (Modul 5), die Freigabe- und Ausnahme-Dokumentation (Modul 6), das Vorfallsregister mit Maßnahmen und Wirksamkeitsprüfungen (Modul 8), die Anbieter-Akten mit AVV, Prüfungen und Verträgen (Modul 9) – plus die Schnittstellen-Dokumente beim Datenschutz (Verarbeitungsverzeichnis, DSFAs, TOMs).\n\nDie Qualitätsprinzipien: Konsistenz schlägt Umfang – zehn gepflegte, widerspruchsfreie Dokumente überzeugen mehr als fünfzig widersprüchliche. Jedes Dokument hat einen Eigentümer, einen Stand (Datum/Version) und einen Pflege-Rhythmus. Entscheidungen sind mit Begründung dokumentiert, gerade die unbequemen (Ablehnungen, Ausnahmen, abweichende Management-Entscheidungen). Und: Die Dokumente verweisen aufeinander, statt sich zu widersprechen – wenn das Inventar 17 Tools listet und die Toolliste der Richtlinie 12, ist das ein gefundenes Audit-Finding.\n\nDer Praxistest deiner Dokumentation ist die Drei-Fragen-Probe, die jeder Prüfer in Varianten stellt: \"Welche KI-Systeme setzen Sie ein und mit welchem Risiko?\" (Inventar), \"Wie stellen Sie kompetente Nutzung sicher?\" (Richtlinie + Schulungsregister), \"Was passiert bei Problemen?\" (Vorfallsprozess + Register). Wenn du alle drei mit aktuellen Dokumenten in unter einer Stunde beantworten kannst, steht dein System.\n\nZur Aufbewahrung: Nachweise brauchen definierte Aufbewahrungsfristen (orientiert an gesetzlichen und vertraglichen Anforderungen) und müssen auch nach Personalwechseln auffindbar sein – ein geteilter, strukturierter Ablageort statt persönlicher Ordner und Postfächer. Dein Wissen darf nicht mit dir in den Urlaub oder zum nächsten Arbeitgeber gehen.",
        example:
          "Ein Automobilzulieferer wird von seinem größten Kunden auditiert – erstmals mit KI-Governance-Fragen im Katalog. Die KI-Verantwortliche besteht die Drei-Fragen-Probe in 40 Minuten: Inventar mit Ampel-Einstufungen (Stand: letzter Quartals-Check), Richtlinie Version 2.1 mit Änderungsprotokoll, Schulungsregister mit 94 % Abdeckung und verifizierbaren Zertifikaten, Vorfallsregister mit zwei abgeschlossenen Fällen samt Wirksamkeitsnachweis. Das Audit-Ergebnis vermerkt die KI-Governance als Stärke. Der Vertriebsleiter zitiert das Ergebnis seither in jedem Angebot an Neukunden – aus der Pflicht wurde ein Verkaufsargument.",
        risk: "Verstreute, widersprüchliche oder personengebundene Dokumentation fällt genau im Prüfungsmoment auseinander: Der Auditor findet die Widersprüche, die dir nie aufgefallen sind – und aus \"gut gearbeitet, schlecht dokumentiert\" wird im Bericht schlicht \"mangelhaft\".",
        memo: "Nicht was du tust zählt im Prüfungsfall, sondern was du belegen kannst – konsistent, aktuell, auffindbar, mit Eigentümer.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Welche drei Prüferfragen muss dein Nachweissystem schnell beantworten können?",
            answer:
              "Welche KI-Systeme mit welchem Risiko im Einsatz sind (Inventar), wie kompetente Nutzung sichergestellt wird (Richtlinie + Schulungsregister) und was bei Problemen passiert (Vorfallsprozess + Register).",
          },
          {
            question: "Warum ist Konsistenz wichtiger als Dokumentenumfang?",
            answer:
              "Weil widersprüchliche Dokumente (z. B. Inventar vs. Toolliste) das Vertrauen in das gesamte System zerstören – zehn gepflegte Dokumente schlagen fünfzig widersprüchliche.",
          },
        ],
      },
      {
        slug: "off-kennzahlen-verbesserung",
        title: "Steuern mit Kennzahlen und kontinuierliche Verbesserung",
        goal: "Du kannst deine KI-Governance mit wenigen aussagekräftigen Kennzahlen steuern und einen kontinuierlichen Verbesserungszyklus etablieren.",
        content:
          "Was du nicht misst, kannst du nicht steuern – und nicht gegenüber dem Management vertreten. Aber Vorsicht vor dem Kennzahlen-Friedhof: Zehn gepflegte Zahlen mit Konsequenzen schlagen vierzig, die niemand liest.\n\nEin bewährtes Kennzahlen-Set für die KI-Governance:\n\nAbdeckung: Anteil geschulter Mitarbeitender (je Zielgruppe!), Anteil inventarisierter und bewerteter Tools, Anteil der Anbieter mit vollständiger Vertragsakte. Abdeckungslücken sind deine offenen Flanken.\n\nProzess-Gesundheit: Durchlaufzeiten der Freigaben, Anzahl der Anträge (zu wenige = Umgehung!), Anteil dokumentierter Ausnahmen mit gültiger Befristung, überfällige Maßnahmen aus Vorfällen.\n\nRisiko-Signale: Gemeldete Vorfälle und Beinahe-Fälle (mit Trend – und der reifen Interpretation: mehr Meldungen nach Schulungen sind oft ein Kultur-Erfolg), Wiederholungsfälle (der kritischste Indikator: Sie zeigen, dass Maßnahmen nicht wirken), Schatten-KI-Funde.\n\nWirkung: Testergebnisse und schwache Kategorien aus den Schulungen, Wirksamkeitsquote abgeschlossener Maßnahmen, Audit-Findings und deren Abarbeitung.\n\nDer Verbesserungszyklus dazu: Quartalsweise ein kompakter Governance-Bericht ans Management – Kennzahlen, Vorfälle, Entscheidungsbedarfe, nächste Schritte. Jährlich die große Runde: Portfolio-Review (Modul 9), Richtlinien-Überarbeitung (Modul 6), Jahresinventur (Modul 4), Schulungsprogramm-Anpassung (Modul 5) und ein ehrlicher Blick auf das eigene System: Was hat funktioniert, was war Theater, was fehlt? Aus jedem Zyklus kommen konkrete Verbesserungen mit Eigentümer und Termin – derselbe Maßnahmen-Standard, den du von Vorfällen kennst.\n\nUnd die Reifegrad-Ehrlichkeit: Kein Unternehmen startet perfekt. Im ersten Jahr sind Inventar, Richtlinie und Schulung ein großartiges Ergebnis; Kennzahlen-Feintuning und Portfolio-Optimierung kommen danach. Ein ehrliches \"Wir sind bei Stufe zwei von vier, und hier ist der Plan für Stufe drei\" ist glaubwürdiger – intern wie extern – als eine Hochglanz-Fassade, hinter der nichts steht.",
        example:
          "Der Quartalsbericht einer KI-Verantwortlichen an die Geschäftsführung passt auf zwei Seiten: Schulungsabdeckung 96 % (Neueintritte im Onboarding erfasst), 9 Freigabeanträge mit median 6 Tagen Durchlaufzeit, 4 Vorfälle (davon 3 Beinahe-Fälle – Meldekultur funktioniert), null Wiederholungsfälle, eine überfällige Maßnahme (IT-Upload-Filter, neuer Termin begründet). Dazu ein Entscheidungsbedarf: Konsolidierung zweier überlappender Tools spart 8.400 € jährlich. Die Geschäftsführung braucht 15 Minuten, entscheidet die Konsolidierung – und verlängert das Governance-Budget ohne Diskussion. Zahlen schaffen Vertrauen, Vertrauen schafft Ressourcen.",
        risk: "Ohne Kennzahlen ist deine Governance im Management unsichtbar – und unsichtbare Arbeit verliert Budget und Rückhalt. Mit falschen Kennzahlen (reine Aktivitätszählerei ohne Konsequenzen) wird sie zum Theater. Der Unterschied: Jede Zahl braucht eine Frage, die sie beantwortet, und eine Handlung, die aus ihr folgen kann.",
        memo: "Wenige Kennzahlen mit Konsequenzen, Quartalsbericht ans Management, Jahreszyklus für das System selbst – und ehrlich zum eigenen Reifegrad stehen.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Warum ist \"null Anträge im Freigabeprozess\" kein gutes Zeichen?",
            answer:
              "Weil es fast sicher bedeutet, dass der Prozess umgangen wird – ein gesunder Prozess zeigt kontinuierliche Antragszahlen mit akzeptablen Durchlaufzeiten.",
          },
          {
            question: "Welche Kennzahl ist der kritischste Risiko-Indikator und warum?",
            answer:
              "Wiederholungsfälle bei Vorfällen – sie zeigen, dass Maßnahmen beschlossen, aber nicht wirksam sind: Das System lernt nicht.",
          },
        ],
      },
      {
        slug: "off-audit-souveraen",
        title: "Prüfungen souverän bestehen: Kunden-Audits und Behördenanfragen",
        goal: "Du weißt, wie du dich auf KI-bezogene Audits und Anfragen vorbereitest und dabei souverän statt defensiv auftrittst.",
        content:
          "KI-Governance wird zunehmend geprüft – von Kunden in Lieferantenaudits, von Versicherungen bei Vertragsabschluss und im Ernstfall von Behörden. Gute Vorbereitung macht aus der Prüfung eine Bühne für deine Arbeit:\n\nVor der Prüfung: Kläre Anlass und Umfang (was wird geprüft, nach welchem Maßstab – Kundenkatalog, Vertragspflichten, gesetzliche Anforderungen?). Aktualisiere die Kerndokumente und laufe selbst einmal die Drei-Fragen-Probe durch. Identifiziere deine bekannten Schwachstellen vorab – und bereite für jede die ehrliche Antwort vor: Was ist der Stand, was der Plan, was der Termin? Eine bekannte Schwachstelle mit Plan ist ein Reifezeichen; eine vom Prüfer entdeckte, die du kanntest und verschwiegen hast, ist ein Vertrauensbruch.\n\nWährend der Prüfung: Antworte auf die gestellte Frage – präzise, mit Beleg, ohne Ausschweifung. \"Das weiß ich nicht, das kläre ich bis morgen\" ist eine starke Antwort; Spekulieren ist eine schwache. Zeig die Systeme, nicht nur die Dokumente: Ein Prüfer, der live sieht, wie ein Freigabeantrag durchs System läuft und wie das Schulungsregister ein Zertifikat verifiziert, glaubt dem Rest schneller. Und lass Findings zu, ohne zu mauern – ein Audit ohne einziges Finding wirkt auf erfahrene Prüfer eher verdächtig als vorbildlich.\n\nNach der Prüfung: Findings sind Gratis-Beratung. Behandle sie wie Vorfälle: Maßnahme, Eigentümer, Termin, Wirksamkeitsprüfung – und melde die Abarbeitung aktiv zurück. Prüfer, die sehen, dass ihre Findings ernst genommen werden, schreiben beim nächsten Mal wohlwollendere Berichte. Die Findings-Historie mit Abarbeitungsquote ist selbst wieder ein Nachweis deiner Systemreife.\n\nBei Behördenanfragen gilt zusätzlich: Ruhe bewahren, Fristen notieren, sofort Geschäftsleitung und Rechtsberatung einbinden, nur abgestimmt antworten – vollständig und ehrlich, aber koordiniert. Deine Dokumentation ist auch hier dein bester Freund: Wer nachweisen kann, dass er systematisch arbeitet, wird selbst bei einem realen Problem anders behandelt als der, bei dem Chaos sichtbar wird.",
        example:
          "Eine Versicherung macht die Cyber-Police-Verlängerung erstmals von einem KI-Governance-Fragebogen abhängig: 40 Fragen, von Inventar über Schulungsnachweise bis Vorfallsprozess. Die KI-Verantwortliche beantwortet 36 Fragen direkt aus den bestehenden Dokumenten, zwei mit \"in Umsetzung, Termin Q3\" (ehrlich, mit Plan), zwei nach Rückfrage bei der IT. Ergebnis: Police verlängert, Prämie stabil – der Makler erwähnt, dass zwei Mitbewerber wegen \"unzureichender KI-Kontrollen\" Aufschläge zahlen. Dieselbe Dokumentation, die für den AI Act aufgebaut wurde, verdient hier zum zweiten Mal Geld.",
        risk: "Der schlechteste Auftritt in Prüfungen ist die Mischung aus Fassade und Abwehr: geschönte Antworten, gemauerte Findings, verschwiegene bekannte Schwächen. Prüfer sind darauf trainiert, genau das zu durchschauen – und ein enttarnter Beschönigungsversuch entwertet auch die ehrlichen Teile deiner Arbeit.",
        memo: "Vorbereiten, ehrlich antworten, Findings als Gratis-Beratung abarbeiten – Souveränität kommt aus dem System, nicht aus der Fassade.",
        durationMinutes: 8,
        required: true,
        miniChecks: [
          {
            question: "Wie gehst du mit bekannten Schwachstellen vor einem Audit um?",
            answer:
              "Vorab identifizieren und ehrlich mit Stand, Plan und Termin präsentieren – eine bekannte Schwäche mit Plan ist ein Reifezeichen, eine verschwiegene ein Vertrauensbruch.",
          },
          {
            question: "Was tust du mit Audit-Findings nach der Prüfung?",
            answer:
              "Wie mit Vorfällen: Maßnahme mit Eigentümer und Termin, Wirksamkeitsprüfung, aktive Rückmeldung der Abarbeitung an den Prüfer.",
          },
        ],
      },
      {
        slug: "off-abschluss-zertifikat",
        title: "Abschlusstest und dein Nachweis als KI-Verantwortliche(r)",
        goal: "Du kennst den Ablauf des Abschlusstests dieses Kurses und weißt, was dein Zertifikat aussagt – und was nicht.",
        content:
          "Du hast das komplette Handwerkszeug durchgearbeitet: Rolle und Mandat, AI-Act-Systematik, Rollenbestimmung, Inventar und Risikobewertung, Schulungsprogramm, Richtlinie und Freigaben, Datenschutz, Vorfallsmanagement, Lieferantensteuerung und Nachweisführung. Zeit für den Abschluss.\n\nSo läuft der Test: Wie im Basic-Kurs gilt – erst wenn alle Pflichtlektionen abgeschlossen sind, wird der Test freigeschaltet. Er besteht aus 30 Multiple-Choice-Fragen aus allen Modulen dieses Kurses, die Bestehensgrenze liegt bei 75 Prozent. Der Unterschied zum Basic-Test: Die Fragen sind deutlich praxislastiger – du bekommst überwiegend Situationen (\"Ein Anbieter kündigt geänderte Datennutzung an – was tust du zuerst?\") statt reiner Wissensfragen. Genau das ist Absicht: Geprüft wird, ob du die Governance-Denkweise anwenden kannst, nicht ob du Definitionen auswendig kannst.\n\nWenn es nicht klappt: Die Auswertung zeigt dir deine schwachen Themenfelder, die Nachschulung empfiehlt gezielt die passenden Lektionen, und der Übungsmodus steht jederzeit bereit. Ein nicht bestandener erster Versuch ist kein Drama – die Themen sind dichter als im Basic-Kurs.\n\nWas dein Zertifikat aussagt: Es dokumentiert, dass du die Inhalte dieses Aufbaukurses absolviert und den Test bestanden hast – ein qualifizierter, verifizierbarer Baustein für deine Rolle und für die Dokumentation deines Unternehmens. Und in aller Klarheit, wie es sich für dieses Thema gehört: Es ist ein privater Schulungs- und Kompetenznachweis. Es ist keine staatliche Zulassung, keine behördliche Bestellung und kein gesetzlich geschützter Titel – einen solchen \"KI-Beauftragten mit Staatssiegel\" sieht der EU AI Act schlicht nicht vor. Sein Wert liegt in dem, was du ab morgen damit tust: Inventar aufbauen, Richtlinie schreiben, Prozesse etablieren. Die beste Empfehlung für deine Arbeit wird nicht das Zertifikat sein – sondern das funktionierende System, das du hinterlässt, wenn du im Urlaub bist.\n\nViel Erfolg beim Test!",
        example:
          "Herr Brandner schließt den Kurs ab und besteht mit 83 Prozent – schwächste Kategorie: Lieferantenmanagement. Er wiederholt die zwei empfohlenen Lektionen und startet dann mit dem Praxisplan aus dem Kurs: Woche 1–4 Inventur, Woche 5–8 Richtlinien-Entwurf mit Datenschutz und IT, Woche 9–12 Freigabeprozess und Schulungsrollout mit der Plattform. Nach einem halben Jahr besteht sein Unternehmen das erste Kundenaudit mit KI-Fragen – und die Geschäftsführung erweitert sein Mandat. Das Zertifikat hängt im Büro; das System arbeitet.",
        risk: "Das größte Risiko nach diesem Kurs ist die Schublade: Wer das Zertifikat ablegt und im Alltag nichts etabliert, hat einen Nachweis ohne Substanz – im Prüfungsfall zählt das gelebte System, nicht das Dokument an der Wand.",
        memo: "Pflichtlektionen abschließen, 75 Prozent erreichen, Zertifikat erhalten – und dann das System bauen, das den Nachweis mit Leben füllt.",
        durationMinutes: 6,
        required: true,
        miniChecks: [
          {
            question: "Was unterscheidet die Testfragen dieses Kurses vom Basic-Test?",
            answer:
              "Sie sind überwiegend praxisorientierte Situationsfragen – geprüft wird die Anwendung der Governance-Denkweise, nicht das Auswendigwissen von Definitionen.",
          },
          {
            question: "Ist \"KI-Beauftragte(r)\" ein gesetzlich geschützter Titel mit staatlicher Bestellung?",
            answer:
              "Nein. Der EU AI Act sieht weder Titel noch Bestellverfahren vor. Das Zertifikat ist ein privater, verifizierbarer Schulungs- und Kompetenznachweis – sein Wert liegt im etablierten System.",
          },
        ],
      },
    ],
  },
];
