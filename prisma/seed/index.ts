/**
 * Seed: Pläne, Rechtsprofil, E-Mail-Templates, Superadmin, Demo-Unternehmen,
 * Kurs 1 „KI-Kompetenz Basic" (17 Module, 41 Lektionen, 154 Fragen),
 * Kurs 2 „KI-Verantwortliche & KI-Beauftragte" (10 Module, 37 Lektionen, 84 Fragen),
 * Kurs 3 „Richtig Prompten" (10 Module, 32 Lektionen, 74 Fragen),
 * Prüfungskonfigurationen, 1 bestandener Test, 1 Demo-Zertifikat.
 *
 * Hinweis: bewusst nur relative Imports (tsx ohne Pfad-Aliase).
 */
import { PrismaClient } from "../../lib/generated/prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import path from "path";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { appConfig, legalProfileSeed } from "../../config/app";
import { seedModules, type SeedModule } from "./content-lessons";
import { seedModulesOfficer } from "./content-lessons-officer";
import { seedQuestions1, type SeedQuestion } from "./content-questions-1";
import { seedQuestions2 } from "./content-questions-2";
import { seedQuestions3 } from "./content-questions-3";
import { seedQuestionsOfficer1 } from "./content-questions-officer-1";
import { seedQuestionsOfficer2 } from "./content-questions-officer-2";
import { seedModulesPrompting } from "./content-lessons-prompting";
import { seedQuestionsPrompting1 } from "./content-questions-prompting-1";
import { seedQuestionsPrompting2 } from "./content-questions-prompting-2";

const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const dbUrl = rawUrl.startsWith("file:./")
  ? "file:" + path.join(__dirname, "..", rawUrl.slice(7))
  : rawUrl;
const prisma = new PrismaClient({ adapter: new PrismaLibSQL({ url: dbUrl }) });
const LOCALE = "de";

async function main() {
  console.log("Seed startet …");

  // ---------- Pläne ----------
  const plans = [
    { key: "BASIC", name: "Basic", maxParticipants: 10, priceMonthly: 12900, sortOrder: 1,
      features: ["Bis 10 Teilnehmende — Flatrate", "Alle 3 Kurse für alle: Basic (17 Module), KI-Verantwortliche (10 Module) & Richtig Prompten (10 Module)", "Zertifikate mit QR-Verifikation", "Übungsmodus unbegrenzt · Nachschulung inklusive", "Abschlusstest: 3 Versuche pro Kurs inklusive", `Nur falls jemand mehr braucht: Nachprüfung € ${appConfig.examRetakeFeeEur} pro Teilnehmer`, "Bei Jahreszahlung −10 %"] },
    { key: "BUSINESS", name: "Business", maxParticipants: 50, priceMonthly: 29900, sortOrder: 2,
      features: ["Bis 50 Teilnehmende — Flatrate", "Alle 3 Kurse für alle: Basic (17 Module), KI-Verantwortliche (10 Module) & Richtig Prompten (10 Module)", "CSV-Export & Nachweisliste für die Personalakte", "Fortschritts- und Lückenanalyse", "Firmenlogo auf Zertifikat", "Abschlusstest: 3 Versuche pro Kurs inklusive", `Nur falls jemand mehr braucht: Nachprüfung € ${appConfig.examRetakeFeeEur} pro Teilnehmer`, "Bei Jahreszahlung −15 %"] },
    { key: "ENTERPRISE", name: "Enterprise", maxParticipants: null, priceMonthly: null, sortOrder: 3,
      features: ["Unbegrenzte Teilnehmende — Flatrate", "Eigene Inhalte & Richtlinien", "Individuelle Zertifikatsvorlagen", "Persönlicher Ansprechpartner", "API (optional)"] },
  ];
  for (const p of plans) {
    await prisma.plan.upsert({
      where: { key: p.key },
      update: { name: p.name, maxParticipants: p.maxParticipants, priceMonthly: p.priceMonthly, features: JSON.stringify(p.features), sortOrder: p.sortOrder },
      create: { key: p.key, name: p.name, maxParticipants: p.maxParticipants, priceMonthly: p.priceMonthly, features: JSON.stringify(p.features), sortOrder: p.sortOrder },
    });
  }
  console.log("Pläne: ok");

  // ---------- Rechtsprofil (Quelle: hainan.at Impressum, geprüft 2026-07-06) ----------
  const existingProfile = await prisma.companyLegalProfile.findFirst();
  if (existingProfile) {
    // Kontaktdaten aktuell halten (offizielle Adresse info@ki-nachweis.at, 2026-07-08)
    await prisma.companyLegalProfile.update({
      where: { id: existingProfile.id },
      data: { email: legalProfileSeed.email, privacyContactEmail: legalProfileSeed.privacyContactEmail },
    });
  }
  if (!existingProfile) {
    await prisma.companyLegalProfile.create({
      data: {
        legalName: legalProfileSeed.legalName,
        chineseName: legalProfileSeed.chineseName,
        address: legalProfileSeed.address,
        country: legalProfileSeed.country,
        registrationNumber: legalProfileSeed.registrationNumber,
        organisationCode: legalProfileSeed.organisationCode,
        registeredCapital: legalProfileSeed.registeredCapital,
        foundingDate: legalProfileSeed.foundingDate,
        registrationAuthority: legalProfileSeed.registrationAuthority,
        email: legalProfileSeed.email,
        website: legalProfileSeed.website,
        representativeName: legalProfileSeed.representativeName,
        privacyContactEmail: legalProfileSeed.privacyContactEmail,
        imprintSourceUrl: legalProfileSeed.imprintSourceUrl,
        lastCheckedAt: new Date(legalProfileSeed.lastCheckedAt),
      },
    });
  }
  console.log("Rechtsprofil: ok");

  // ---------- E-Mail-Templates ----------
  const templates = [
    { key: "invitation", subject: "Einladung zur KI-Kompetenz-Schulung von {{companyName}}",
      body: "Hallo,\n\n{{companyName}} lädt Sie zur Schulung „KI-Kompetenz Basic nach Art. 4 EU AI Act“ ein.\n\nZugang erstellen: {{link}}\n\nDie Schulung dauert rund 4 Unterrichtseinheiten und schließt mit einem Test und einem privaten Schulungsnachweis ab.\n\nFreundliche Grüße\n{{issuer}}" },
    { key: "verify_email", subject: "Bitte bestätigen Sie Ihre E-Mail-Adresse",
      body: "Hallo {{firstName}},\n\nbitte bestätigen Sie Ihre E-Mail-Adresse: {{link}}\n\nFreundliche Grüße\n{{issuer}}" },
    { key: "password_reset", subject: "Passwort zurücksetzen",
      body: "Hallo {{firstName}},\n\nSie können Ihr Passwort über folgenden Link zurücksetzen (1 Stunde gültig):\n{{link}}\n\nWenn Sie das nicht angefordert haben, ignorieren Sie diese E-Mail.\n\nFreundliche Grüße\n{{issuer}}" },
    { key: "reminder_open", subject: "Erinnerung: Ihre KI-Schulung wartet",
      body: "Hallo {{firstName}},\n\nIhre Schulung „KI-Kompetenz Basic nach Art. 4 EU AI Act“ ist noch nicht abgeschlossen.\n\nJetzt fortsetzen: {{link}}\n\nFreundliche Grüße\n{{issuer}}" },
    { key: "exam_failed", subject: "Testergebnis: Nachschulung empfohlen",
      body: "Hallo {{firstName}},\n\nSie haben den Abschlusstest leider nicht bestanden. Wiederholen Sie die empfohlenen Lektionen und starten Sie den Test erneut.\n\nZur Nachschulung: {{link}}\n\nFreundliche Grüße\n{{issuer}}" },
    { key: "certificate_ready", subject: "Ihr Zertifikat ist verfügbar",
      body: "Hallo {{firstName}},\n\nherzlichen Glückwunsch! Sie haben den Abschlusstest bestanden. Ihr privater Schulungs- und Kompetenznachweis steht bereit:\n{{link}}\n\nHinweis: Es handelt sich um einen privaten Schulungsnachweis, keine behördliche Zertifizierung.\n\nFreundliche Grüße\n{{issuer}}" },
  ];
  for (const tpl of templates) {
    await prisma.emailTemplate.upsert({
      where: { key_locale: { key: tpl.key, locale: LOCALE } },
      update: { subject: tpl.subject, body: tpl.body },
      create: { key: tpl.key, locale: LOCALE, subject: tpl.subject, body: tpl.body },
    });
  }
  console.log("E-Mail-Templates: ok");

  // ---------- Nutzer & Unternehmen ----------
  const hash = (pw: string) => bcrypt.hashSync(pw, 10);

  const superadmin = await prisma.user.upsert({
    where: { email: "sascha.morocutti@gmail.com" },
    update: { role: "SUPERADMIN" },
    create: {
      email: "sascha.morocutti@gmail.com",
      passwordHash: hash("Morocutti#Admin2026"),
      firstName: "Sascha",
      lastName: "Morocutti",
      role: "SUPERADMIN",
      emailVerifiedAt: new Date(),
    },
  });

  const demoCompany = await prisma.company.upsert({
    where: { id: "demo-company" },
    update: {},
    create: {
      id: "demo-company",
      name: "Musterfirma Handel GmbH",
      address: "Beispielstraße 12, 5020 Salzburg, Österreich",
      uid: "ATU12345678",
      contactName: "Maria Muster",
      email: "hr@musterfirma.example",
      planKey: "BUSINESS",
    },
  });

  const companyAdmin = await prisma.user.upsert({
    where: { email: "hr@musterfirma.example" },
    update: {},
    create: {
      email: "hr@musterfirma.example",
      passwordHash: hash("Firmenadmin#2026"),
      firstName: "Maria",
      lastName: "Muster",
      role: "COMPANY_ADMIN",
      companyId: demoCompany.id,
      emailVerifiedAt: new Date(),
    },
  });

  const participants = [] as { id: string; email: string; firstName: string; lastName: string }[];
  const participantData = [
    { email: "anna.beispiel@musterfirma.example", firstName: "Anna", lastName: "Beispiel" },
    { email: "bernd.tester@musterfirma.example", firstName: "Bernd", lastName: "Tester" },
    { email: "clara.demo@musterfirma.example", firstName: "Clara", lastName: "Demo" },
  ];
  for (const p of participantData) {
    const user = await prisma.user.upsert({
      where: { email: p.email },
      update: {},
      create: {
        email: p.email,
        passwordHash: hash("Teilnehmer#2026"),
        firstName: p.firstName,
        lastName: p.lastName,
        role: "PARTICIPANT",
        companyId: demoCompany.id,
        emailVerifiedAt: new Date(),
      },
    });
    participants.push(user);
  }
  console.log("Nutzer & Unternehmen: ok");

  // ---------- Kurse ----------
  interface CourseSeedDef {
    slug: string;
    teachingUnits: number;
    title: string;
    subtitle: string;
    description: string;
    modules: SeedModule[];
    questions: SeedQuestion[];
  }

  async function seedCourse(def: CourseSeedDef) {
    const dbCourse = await prisma.course.upsert({
      where: { slug: def.slug },
      update: { teachingUnits: def.teachingUnits },
      create: {
        slug: def.slug,
        version: 1,
        defaultLocale: LOCALE,
        teachingUnits: def.teachingUnits,
        publishedAt: new Date(),
        translations: {
          create: {
            locale: LOCALE,
            title: def.title,
            subtitle: def.subtitle,
            description: def.description,
          },
        },
      },
    });

    await prisma.exam.upsert({
      where: { courseId: dbCourse.id },
      update: {},
      create: {
        courseId: dbCourse.id,
        questionCount: appConfig.defaultExamQuestionCount,
        passPercentage: appConfig.defaultPassPercentage,
        maxAttempts: appConfig.maxExamAttempts,
        attemptResumeHours: appConfig.attemptResumeHours,
      },
    });

    // Module, Lektionen, Mini-Checks
    const lessonIdBySlug = new Map<string, string>();
    for (const mod of def.modules) {
      const dbModule = await prisma.module.upsert({
        where: { slug: mod.slug },
        update: { order: mod.order },
        create: {
          courseId: dbCourse.id,
          slug: mod.slug,
          order: mod.order,
          translations: { create: { locale: LOCALE, title: mod.title, description: mod.description } },
        },
      });
      let order = 1;
      for (const lesson of mod.lessons) {
        const dbLesson = await prisma.lesson.upsert({
          where: { slug: lesson.slug },
          // moduleId im Update: verschobene Lektionen (z. B. transparenz-ki-inhalte) wandern korrekt mit
          update: { order, moduleId: dbModule.id, durationMinutes: lesson.durationMinutes },
          create: {
            moduleId: dbModule.id,
            slug: lesson.slug,
            order,
            durationMinutes: lesson.durationMinutes,
            required: lesson.required,
            translations: {
              create: {
                locale: LOCALE,
                title: lesson.title,
                goal: lesson.goal,
                content: lesson.content,
                example: lesson.example,
                risk: lesson.risk,
                memo: lesson.memo,
              },
            },
          },
        });
        lessonIdBySlug.set(lesson.slug, dbLesson.id);

        const existingChecks = await prisma.miniCheck.count({ where: { lessonId: dbLesson.id } });
        if (existingChecks === 0) {
          let checkOrder = 1;
          for (const check of lesson.miniChecks) {
            await prisma.miniCheck.create({
              data: {
                lessonId: dbLesson.id,
                order: checkOrder++,
                translations: { create: { locale: LOCALE, question: check.question, answer: check.answer } },
              },
            });
          }
        }
        order++;
      }
    }

    // Fragen (nur wenn für diesen Kurs noch keine existieren — Inhalts-Updates laufen über db:init && db:seed)
    const existingQuestions = await prisma.question.count({ where: { courseId: dbCourse.id } });
    if (existingQuestions === 0) {
      for (const q of def.questions) {
        const lessonId = lessonIdBySlug.get(q.lessonSlug) ?? null;
        // Antwortoptionen durchmischen — die Rohdaten haben die richtige Antwort systematisch an Position A
        const shuffledOptions = [...q.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }
        await prisma.question.create({
          data: {
            courseId: dbCourse.id,
            lessonId,
            category: q.category,
            difficulty: q.difficulty,
            practiceCase: q.practiceCase,
            tags: JSON.stringify(q.tags),
            translations: { create: { locale: LOCALE, text: q.text, explanation: q.explanation } },
            options: {
              create: shuffledOptions.map((opt, i) => ({
                order: i + 1,
                correct: opt.correct,
                translations: { create: { locale: LOCALE, text: opt.text } },
              })),
            },
          },
        });
      }
    }
    const questionCount = await prisma.question.count({ where: { courseId: dbCourse.id } });
    console.log(`Kurs ${def.slug}: ${def.modules.length} Module, ${lessonIdBySlug.size} Lektionen, ${questionCount} Fragen`);
    return dbCourse;
  }

  const course = await seedCourse({
    slug: "ki-kompetenz-basic",
    teachingUnits: 6,
    title: "KI-Kompetenz Basic nach Art. 4 EU AI Act",
    subtitle: "Privater Schulungs- und Kompetenznachweis für den verantwortungsvollen Umgang mit KI im Unternehmen",
    description: "Grundlagenschulung für alle Mitarbeitenden: was KI ist, wie generative KI funktioniert, wo Risiken liegen (Datenschutz, Informationssicherheit, Urheberrecht), wie man KI sicher nutzt, Vorfälle meldet und was Art. 4 EU AI Act für Unternehmen bedeutet.",
    modules: seedModules,
    questions: [...seedQuestions1, ...seedQuestions2, ...seedQuestions3],
  });

  await seedCourse({
    slug: "ki-verantwortliche-beauftragte",
    teachingUnits: 8,
    title: "KI-Verantwortliche & KI-Beauftragte im Unternehmen",
    subtitle: "Aufbaukurs für die Person, die den KI-Einsatz koordiniert: Governance, Pflichten, Prozesse und Nachweise",
    description: "Vertiefungskurs: Rolle und Mandat, EU AI Act für Verantwortliche (Risikoklassen, Rollen, Pflichten), KI-Inventar und Risikobewertung, Schulungsprogramm nach Art. 4, KI-Richtlinie und Freigabeprozesse, Datenschutz-Schnittstellen, Vorfallsmanagement, Lieferantensteuerung und Audit-Vorbereitung.",
    modules: seedModulesOfficer,
    questions: [...seedQuestionsOfficer1, ...seedQuestionsOfficer2],
  });

  await seedCourse({
    slug: "richtig-prompten",
    teachingUnits: 6,
    title: "Richtig Prompten — KI-Assistenten wirksam nutzen",
    subtitle: "Praxiskurs für alle Mitarbeitenden: bessere Ergebnisse mit ChatGPT, Copilot, Claude & Co. — sicher und effizient",
    description: "Anwendungskurs: wie KI-Assistenten ticken, die Prompt-Formel (Rolle, Ziel, Kontext, Format, Ton), Iterieren statt Neuwürfeln, Kontext und Dokumente richtig mitgeben, Textarbeit im Alltag (E-Mails, Angebote, Protokolle), Analysieren und Zusammenfassen, Kreativ- und Bild-Prompts inkl. Kennzeichnung, Tool-Kunde nach Prinzipien, sicher prompten (Datenschutz, Prompt-Injection, Halluzinations-Kontrolle) und die Prompt-Bibliothek fürs Team.",
    modules: seedModulesPrompting,
    questions: [...seedQuestionsPrompting1, ...seedQuestionsPrompting2],
  });
  console.log("Kurse & Prüfungen: ok");

  // ---------- Demo: Anna hat alle Lektionen abgeschlossen + Test bestanden + Zertifikat ----------
  const anna = participants[0];
  const allLessons = await prisma.lesson.findMany({ where: { module: { courseId: course.id } } });
  for (const lesson of allLessons) {
    await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: anna.id, lessonId: lesson.id } },
      update: {},
      create: { userId: anna.id, lessonId: lesson.id },
    });
  }

  const existingAttempt = await prisma.examAttempt.findFirst({ where: { userId: anna.id, courseId: course.id } });
  if (!existingAttempt) {
    const pool = await prisma.question.findMany({
      where: { courseId: course.id, active: true },
      include: { options: true, translations: true },
      take: 30,
    });
    const started = new Date(Date.now() - 40 * 60 * 1000);
    const attempt = await prisma.examAttempt.create({
      data: {
        userId: anna.id,
        courseId: course.id,
        courseVersion: course.version,
        locale: LOCALE,
        status: "SUBMITTED",
        questionIds: JSON.stringify(pool.map((q) => q.id)),
        startedAt: started,
        submittedAt: new Date(started.getTime() + 28 * 60 * 1000),
        expiresAt: new Date(started.getTime() + 24 * 3600 * 1000),
      },
    });

    let points = 0;
    for (let i = 0; i < pool.length; i++) {
      const q = pool[i];
      const correctIds = q.options.filter((o) => o.correct).map((o) => o.id);
      const wrongIds = q.options.filter((o) => !o.correct).map((o) => o.id);
      const answerWrong = i % 6 === 5; // 5 von 30 falsch => 25/30 = 83 %
      const selected = answerWrong ? [wrongIds[0] ?? correctIds[0]] : correctIds;
      const correct = !answerWrong;
      if (correct) points++;
      await prisma.examAnswer.create({
        data: {
          attemptId: attempt.id,
          questionId: q.id,
          selectedOptionIds: JSON.stringify(selected),
          correct,
        },
      });
    }
    const percent = Math.round((points / pool.length) * 100);
    await prisma.examAttempt.update({
      where: { id: attempt.id },
      data: { scorePoints: points, scorePercent: percent, passed: percent >= appConfig.defaultPassPercentage },
    });

    const year = new Date().getFullYear();
    const moduleTitles = seedModules.map((m) => m.title);
    const certificate = await prisma.certificate.create({
      data: {
        certificateNumber: `${appConfig.certificateNumberPrefix}-${year}-000001`,
        // Fester Code: /verify/demo... dient als öffentliche Demo-Prüfseite (/musterzertifikat)
        verifyCode: "demo1234demo1234demo1234demo1234",
        userId: anna.id,
        companyId: demoCompany.id,
        courseId: course.id,
        courseVersion: course.version,
        locale: LOCALE,
        attemptId: attempt.id,
        scorePercent: percent,
        issuedContentSnapshot: JSON.stringify({ moduleTitles, courseVersion: course.version }),
      },
    });
    console.log(`Demo-Zertifikat: ${certificate.certificateNumber} — Verify: /verify/${certificate.verifyCode} (${percent} %)`);
  }

  // ---------- Offene Einladung ----------
  const existingInvite = await prisma.invitation.findFirst({ where: { companyId: demoCompany.id } });
  if (!existingInvite) {
    await prisma.invitation.create({
      data: {
        companyId: demoCompany.id,
        email: "neu@musterfirma.example",
        code: randomUUID().slice(0, 8).toUpperCase(),
        invitedById: companyAdmin.id,
        expiresAt: new Date(Date.now() + 14 * 24 * 3600 * 1000),
      },
    });
  }

  await prisma.auditLog.create({
    data: {
      userId: superadmin.id,
      action: "COMPANY_CREATED",
      entityType: "Company",
      entityId: demoCompany.id,
      metadata: JSON.stringify({ seed: true }),
    },
  });

  // ---------- QM: Standard-Fragebogen ----------
  let survey = await prisma.feedbackSurvey.findFirst({ where: { companyId: null, locale: LOCALE } });
  if (!survey) {
    survey = await prisma.feedbackSurvey.create({
      data: {
        locale: LOCALE,
        title: "Feedback zur KI-Kompetenz-Schulung",
        description: "Ihre Rückmeldung hilft uns, die Schulung laufend zu verbessern.",
        triggerEvent: "CERTIFICATE_ISSUED",
        questions: {
          create: [
            { category: "UNDERSTANDABILITY", questionText: "Wie verständlich waren die Lerninhalte?", questionType: "RATING_1_5", sortOrder: 1 },
            { category: "PRACTICAL_RELEVANCE", questionText: "Wie praxisnah waren die Beispiele?", questionType: "RATING_1_5", sortOrder: 2 },
            { category: "TECHNICAL_USABILITY", questionText: "Wie gut war die technische Bedienung der Plattform?", questionType: "RATING_1_5", sortOrder: 3 },
            { category: "EXAM_FAIRNESS", questionText: "War der Abschlusstest fair und nachvollziehbar?", questionType: "RATING_1_5", sortOrder: 4 },
            { category: "OVERALL_SATISFACTION", questionText: "Fühlen Sie sich nach der Schulung sicherer im Umgang mit KI?", questionType: "RATING_1_5", sortOrder: 5 },
            { category: "OVERALL_SATISFACTION", questionText: "Würden Sie die Schulung weiterempfehlen? (0 = nein, 10 = unbedingt)", questionType: "RATING_1_10", sortOrder: 6 },
            { category: "FREE_TEXT", questionText: "Gab es Inhalte, die unklar waren?", questionType: "FREE_TEXT", isRequired: false, sortOrder: 7 },
            { category: "FREE_TEXT", questionText: "Was sollten wir verbessern?", questionType: "FREE_TEXT", isRequired: false, sortOrder: 8 },
            { category: "TECHNICAL_USABILITY", questionText: "Gab es technische Probleme?", questionType: "YES_NO_TEXT", isRequired: false, sortOrder: 9, helpText: "Falls ja: Bitte kurz beschreiben." },
            { category: "SUPPORT", questionText: "Benötigen Sie weitere Nachschulung?", questionType: "YES_NO", isRequired: false, sortOrder: 10 },
          ],
        },
      },
    });
  }
  console.log("QM-Fragebogen: ok");

  // ---------- QM: Default-Schwellenwerte ----------
  const thresholds = [
    { metric: "AVERAGE_FEEDBACK_SCORE", warningThreshold: 3.5, criticalThreshold: 3.0 },
    { metric: "TECHNICAL_SCORE", warningThreshold: 3.5, criticalThreshold: 3.0 },
    { metric: "EXAM_FAIRNESS_SCORE", warningThreshold: 3.5, criticalThreshold: 3.0 },
    { metric: "NPS_SCORE", warningThreshold: 7, criticalThreshold: 6 },
    { metric: "EXAM_FAIL_RATE", warningThreshold: 25, criticalThreshold: 40 },
    { metric: "COURSE_DROPOUT_RATE", warningThreshold: 20, criticalThreshold: 35 },
  ];
  for (const t of thresholds) {
    const exists = await prisma.qMThreshold.findFirst({ where: { scope: "GLOBAL", metric: t.metric, companyId: null, courseId: null } });
    if (!exists) await prisma.qMThreshold.create({ data: { scope: "GLOBAL", ...t } });
  }
  console.log("QM-Schwellenwerte: ok");

  // ---------- QM: Mail-Templates ----------
  const qmTemplates = [
    { key: "qm_feedback_reminder", subject: "Bitte bewerten Sie Ihre KI-Kompetenz-Schulung",
      body: "Hallo {{firstName}},\n\nSie haben die Schulung abgeschlossen. Bitte geben Sie uns eine kurze Rückmeldung, damit wir die Qualität laufend verbessern können:\n{{link}}\n\nFreundliche Grüße\n{{issuer}}" },
    { key: "qm_bad_feedback", subject: "QM-Hinweis: Kritisches Feedback zur Schulung",
      body: "Hallo {{firstName}},\n\nfür den Kurs {{courseName}} wurde eine Bewertung unterhalb des festgelegten Schwellenwerts abgegeben bzw. ein QM-Fall erzeugt:\n{{issueTitle}}\n\nBitte prüfen Sie den Fall: {{link}}\n\n{{issuer}}" },
    { key: "qm_capa_reminder", subject: "QM-Maßnahme bald fällig",
      body: "Hallo {{firstName}},\n\ndie Maßnahme {{actionTitle}} ist am {{dueDate}} fällig. Bitte aktualisieren Sie den Status:\n{{link}}\n\n{{issuer}}" },
    { key: "qm_review_draft", subject: "Management-Review-Entwurf wurde erstellt",
      body: "Hallo {{firstName}},\n\nfür den Zeitraum {{period}} wurde automatisch ein Management-Review-Entwurf erstellt:\n{{link}}\n\n{{issuer}}" },
    { key: "qm_weekly_digest", subject: "Ihre QM-Wochenübersicht",
      body: "Hallo {{firstName}},\n\nIhre QM-Woche: {{newFeedback}} neue Feedbacks ({{badFeedback}} negativ), {{openIssues}} offene QM-Fälle, {{overdue}} überfällige Maßnahmen.\n\nZum QM-Dashboard: {{link}}\n\n{{issuer}}" },
  ];
  for (const tpl of qmTemplates) {
    await prisma.emailTemplate.upsert({
      where: { key_locale: { key: tpl.key, locale: LOCALE } },
      update: { subject: tpl.subject, body: tpl.body },
      create: { key: tpl.key, locale: LOCALE, subject: tpl.subject, body: tpl.body },
    });
  }
  console.log("QM-Templates: ok");

  // ---------- Content-Audit: Standard-Checklisten (konfigurierbar) ----------
  const checklistTemplates: Array<{
    name: string; entityType: string | null; isDefault: boolean;
    items: Array<{ key: string; label: string; required?: boolean }>;
  }> = [
    {
      name: "Allgemeiner Content-Review", entityType: null, isDefault: true,
      items: [
        { key: "read", label: "Inhalt vollständig gelesen" },
        { key: "language", label: "Sprache und Rechtschreibung geprüft" },
        { key: "plausible", label: "Sachlich plausibel" },
        { key: "no-false-claims", label: "Keine offensichtlichen Falschaussagen" },
        { key: "no-misleading", label: "Keine irreführenden Versprechen" },
        { key: "feature-status", label: "Feature-Verfügbarkeit geprüft (nichts als live behauptet, was geplant ist)" },
        { key: "no-hardcoded", label: "Keine hardcodierten Texte (i18n berücksichtigt)" },
      ],
    },
    {
      name: "AI-Act / Zertifikat / Compliance-Texte", entityType: "CERTIFICATE_TEMPLATE", isDefault: false,
      items: [
        { key: "no-state-claim", label: "Keine staatliche oder behördliche Anerkennung suggeriert" },
        { key: "no-eu-cert", label: "Keine EU-Zertifizierungs-Behauptung" },
        { key: "no-aiact-guarantee", label: "Keine Garantie vollständiger AI-Act-Compliance" },
        { key: "no-legal-advice", label: "Keine Rechtsberatung behauptet" },
        { key: "cert-effect", label: "Zertifikatswirkung korrekt beschrieben" },
        { key: "private-proof", label: "Private Nachweiswirkung klar formuliert" },
        { key: "feature-status", label: "Feature-Status geprüft" },
      ],
    },
    {
      name: "ISO / QM-Texte", entityType: "QM_TEXT", isDefault: false,
      items: [
        { key: "no-iso-cert", label: "Keine ISO-Zertifizierungs-Behauptung" },
        { key: "no-iso-guarantee", label: "Keine Garantie ISO-9001-Konformität" },
        { key: "no-audit-replace", label: "Audit wird nicht ersetzt" },
        { key: "qm-support", label: "QM-Unterstützung korrekt beschrieben" },
        { key: "improvement", label: "Kontinuierliche Verbesserung sachlich formuliert" },
      ],
    },
    {
      name: "Übersetzungen", entityType: "TRANSLATION", isDefault: false,
      items: [
        { key: "compared", label: "Übersetzung mit deutscher Fassung verglichen" },
        { key: "meaning", label: "Sinn nicht verändert" },
        { key: "legal-terms", label: "Rechtliche Begriffe nicht falsch übersetzt" },
        { key: "german-authoritative", label: "Hinweis „Maßgeblich ist die deutsche Fassung“ geprüft" },
        { key: "errors-reserved", label: "Hinweis „Übersetzungsfehler vorbehalten“ geprüft" },
      ],
    },
    {
      name: "Rechtstexte", entityType: "LEGAL_PAGE", isDefault: false,
      items: [
        { key: "formal-style", label: "Formaler Stil beibehalten (nicht im lockeren Lernstil)" },
        { key: "no-risky-shortening", label: "Keine Verkürzung mit Rechtsrisiko" },
        { key: "legal-review", label: "Juristische Prüfung empfohlen oder dokumentiert" },
        { key: "german-authoritative", label: "Deutsche Fassung als maßgeblich gekennzeichnet (falls Übersetzung)" },
      ],
    },
  ];
  for (const tpl of checklistTemplates) {
    const existingTpl = await prisma.reviewChecklistTemplate.findFirst({ where: { name: tpl.name } });
    if (existingTpl) continue;
    await prisma.reviewChecklistTemplate.create({
      data: {
        name: tpl.name, entityType: tpl.entityType, isDefault: tpl.isDefault, isActive: true,
        items: {
          create: tpl.items.map((item, idx) => ({
            key: item.key, label: item.label, required: item.required ?? true, sortOrder: idx + 1,
          })),
        },
      },
    });
  }
  console.log("Content-Audit-Checklisten: ok (5 Templates)");

  // ---------- Versionsregister ----------
  const revisionCount = await prisma.contentRevision.count();
  if (revisionCount === 0) {
    await prisma.contentRevision.create({
      data: {
        entityType: "COURSE", entityId: course.id, versionLabel: "V1.003",
        changeNote: "Initiale Freigabe: 12 Module, 29 Lektionen, 124 Prüfungsfragen, QM-Modul, FAQ mit Gesetzes-Fundstellen.",
        changedById: superadmin.id,
      },
    });
  }
  const v1004 = await prisma.contentRevision.findFirst({ where: { versionLabel: "V1.004" } });
  if (!v1004) {
    await prisma.contentRevision.create({
      data: {
        entityType: "COURSE", entityId: course.id, versionLabel: "V1.004",
        changeNote: "Basic-Kurs auf 17 Module / 41 Lektionen erweitert (Informationssicherheit, Transparenz & Kennzeichnung, Tools & Freigabe, Vorfälle & Meldewege, Qualität & Feedback); Fragenpool Basic auf 154. Neuer Kurs 'KI-Verantwortliche & KI-Beauftragte' (10 Module, 37 Lektionen, 84 Fragen, mind. 40 % Praxisfälle). Zertifikatstitel je Kurs, Disclaimer präzisiert.",
        changedById: superadmin.id,
      },
    });
  }
  const v1005 = await prisma.contentRevision.findFirst({ where: { versionLabel: "V1.005" } });
  if (!v1005) {
    await prisma.contentRevision.create({
      data: {
        entityType: "COURSE", entityId: course.id, versionLabel: "V1.005",
        changeNote: "Öffentliche Modul-Detailseiten für alle 27 Module (Erklärtexte im Praxisstil mit Alltagsbeispielen, Abkürzungs-Glossar, Modulbilder). Kategorien-Anzeigenamen vervollständigt (15 fehlende Keys). Plan-Feature-Texte präzisiert (Nachprüfung). Inhaltsstand im Footer sichtbar.",
        changedById: superadmin.id,
      },
    });
  }
  const v1006 = await prisma.contentRevision.findFirst({ where: { versionLabel: "V1.006" } });
  if (!v1006) {
    await prisma.contentRevision.create({
      data: {
        entityType: "COURSE", entityId: course.id, versionLabel: "V1.006",
        changeNote: "Neuer Kurs 3 'Richtig Prompten — KI-Assistenten wirksam nutzen' (10 Module, 32 Lektionen, 74 Fragen, ≥ 40 % Praxisfälle, eigene Prüfung 30 Fragen / 75 %). In der Flatrate enthalten; Plan-Feature-Texte auf 3 Kurse aktualisiert. Modul-Detailtexte und Kategorien-Anzeigenamen ergänzt.",
        changedById: superadmin.id,
      },
    });
  }
  const v1007 = await prisma.contentRevision.findFirst({ where: { versionLabel: "V1.007" } });
  if (!v1007) {
    await prisma.contentRevision.create({
      data: {
        entityType: "COURSE", entityId: course.id, versionLabel: "V1.007",
        changeNote: "Fünf öffentliche SEO-/Ratgeberseiten (Phase 2 aus SEO_GEO_TRUST_REPORT): Art. 4 einfach erklärt (zitierfähige Definition, Quellenblock, Autorenblock), KI-Führerschein-Einordnung (FAQ-Schema), KI-Kompetenz-Nachweis, ChatGPT-/Prompt-Schulung (Kurs-3-Landingpage), KI-Schulung Mitarbeiter (FAQ-Schema). llms.txt und Footer/Startseite intern verlinkt.",
        changedById: superadmin.id,
      },
    });
  }
  console.log("Versionsregister: ok (V1.003 + V1.004 + V1.005 + V1.006 + V1.007)");

  console.log("Seed abgeschlossen.");
  console.log("Logins: sascha.morocutti@gmail.com / Morocutti#Admin2026 | hr@musterfirma.example / Firmenadmin#2026 | anna.beispiel@musterfirma.example / Teilnehmer#2026");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
