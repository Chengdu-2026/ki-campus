import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { appConfig } from "@/config/app";
import { audit } from "@/lib/audit";
import { runThresholdCheck, createQualityIssue } from "@/lib/qm/service";
import { generateManagementReviewDraft, lastQuarter } from "@/lib/qm/review";

export type CronResult = { job: string; processed: number; details?: string[] };

/** Cron 1: Feedback-Erinnerung (Zertifikat ohne Feedback nach 24 h, max. 2 Erinnerungen). */
export async function cronFeedbackReminder(): Promise<CronResult> {
  const certs = await prisma.certificate.findMany({
    where: { issuedAt: { lt: new Date(Date.now() - 24 * 3600_000) }, status: "VALID" },
    include: { user: true },
  });
  let sent = 0;
  for (const cert of certs) {
    const hasFeedback = await prisma.feedbackResponse.findFirst({
      where: { userId: cert.userId, courseId: cert.courseId },
    });
    if (hasFeedback) continue;
    const reminders = await prisma.mailLog.count({
      where: { to: cert.user.email, template: "qm_feedback_reminder" },
    });
    if (reminders >= 2) continue;
    await sendMail("qm_feedback_reminder", cert.user.email, {
      firstName: cert.user.firstName,
      link: `${process.env.APP_URL ?? ""}/feedback/${cert.courseId}`,
      issuer: appConfig.certificateIssuer,
    }, cert.user.locale);
    sent++;
  }
  return { job: "qm-feedback-reminder", processed: sent };
}

/** Cron 2: Schwellenwert-Prüfung je Firma+Kurs (idempotent via dedupeKey). */
export async function cronThresholdCheck(): Promise<CronResult> {
  const companies = await prisma.company.findMany({ where: { status: "ACTIVE" }, select: { id: true } });
  const courses = await prisma.course.findMany({ where: { archivedAt: null }, select: { id: true } });
  const details: string[] = [];
  for (const company of companies) {
    for (const course of courses) {
      const created = await runThresholdCheck(company.id, course.id);
      if (created.length) details.push(`${company.id}/${course.id}: ${created.join(",")}`);
    }
  }
  return { job: "qm-threshold-check", processed: details.length, details };
}

/** Cron 3: Fällige Maßnahmen erinnern / eskalieren. */
export async function cronCapaDueReminder(): Promise<CronResult> {
  const soon = new Date(Date.now() + 3 * 86400_000);
  const actions = await prisma.correctiveAction.findMany({
    where: { status: { notIn: ["CLOSED", "EFFECTIVE"] }, dueDate: { lte: soon } },
    include: { qualityIssue: true },
  });
  let processed = 0;
  for (const action of actions) {
    const overdue = action.dueDate && action.dueDate < new Date();
    const owner = action.ownerId ? await prisma.user.findUnique({ where: { id: action.ownerId } }) : null;
    const recipients = owner ? [owner] : [];
    if (overdue || !owner) {
      const admins = await prisma.user.findMany({ where: { companyId: action.companyId, role: "COMPANY_ADMIN", status: "ACTIVE" } });
      recipients.push(...admins);
    }
    for (const recipient of recipients) {
      await sendMail("qm_capa_reminder", recipient.email, {
        firstName: recipient.firstName,
        actionTitle: action.title,
        dueDate: action.dueDate ? action.dueDate.toLocaleDateString("de-AT") : "—",
        link: `${process.env.APP_URL ?? ""}/company/qm/corrective-actions`,
        issuer: appConfig.certificateIssuer,
      }, recipient.locale);
      processed++;
    }
  }
  return { job: "qm-capa-due-reminder", processed };
}

/** Cron 4: Kritische Fälle ohne Owner/Maßnahme eskalieren. */
export async function cronCriticalEscalation(): Promise<CronResult> {
  const issues = await prisma.qualityIssue.findMany({
    where: { severity: "CRITICAL", status: { notIn: ["CLOSED", "REJECTED"] } },
    include: { correctiveActions: true },
  });
  let processed = 0;
  for (const issue of issues) {
    const hasAction = issue.correctiveActions.some((a) => a.correctiveAction);
    if (issue.ownerId && hasAction) continue;
    const recipients = await prisma.user.findMany({
      where: { status: "ACTIVE", OR: [{ role: "SUPERADMIN" }, { role: "COMPANY_ADMIN", companyId: issue.companyId }] },
    });
    for (const recipient of recipients) {
      await sendMail("qm_bad_feedback", recipient.email, {
        firstName: recipient.firstName,
        courseName: "—",
        issueTitle: `ESKALATION (kritisch, unbearbeitet): ${issue.title}`,
        link: `${process.env.APP_URL ?? ""}/company/qm/complaints`,
        issuer: appConfig.certificateIssuer,
      }, recipient.locale);
      processed++;
    }
  }
  return { job: "qm-critical-escalation", processed };
}

/** Cron 5: Management-Review-Entwürfe fürs letzte Quartal. */
export async function cronManagementReviewGenerator(): Promise<CronResult> {
  const companies = await prisma.company.findMany({ where: { status: "ACTIVE" }, select: { id: true } });
  const period = lastQuarter();
  let processed = 0;
  for (const company of companies) {
    const existing = await prisma.managementReview.findUnique({
      where: { companyId_periodStart_periodEnd: { companyId: company.id, periodStart: period.start, periodEnd: period.end } },
    });
    if (!existing) {
      await generateManagementReviewDraft(company.id, period);
      processed++;
    }
  }
  return { job: "qm-management-review-generator", processed };
}

/** Cron 6: Wirksamkeitsprüfungen fällig. */
export async function cronEffectivenessReminder(): Promise<CronResult> {
  const due = await prisma.correctiveAction.findMany({
    where: {
      effectivenessCheckDate: { lte: new Date() },
      effectivenessResult: null,
      status: { notIn: ["CLOSED"] },
    },
  });
  let processed = 0;
  for (const action of due) {
    await prisma.correctiveAction.update({ where: { id: action.id }, data: { status: "EFFECTIVENESS_PENDING" } });
    const owner = action.ownerId ? await prisma.user.findUnique({ where: { id: action.ownerId } }) : null;
    if (owner) {
      await sendMail("qm_capa_reminder", owner.email, {
        firstName: owner.firstName,
        actionTitle: `Wirksamkeitsprüfung fällig: ${action.title}`,
        dueDate: action.effectivenessCheckDate?.toLocaleDateString("de-AT") ?? "heute",
        link: `${process.env.APP_URL ?? ""}/company/qm/corrective-actions`,
        issuer: appConfig.certificateIssuer,
      }, owner.locale);
    }
    processed++;
  }
  return { job: "qm-effectiveness-check-reminder", processed };
}

/** Cron 7: Wochen-Digest an Unternehmensadmins. */
export async function cronWeeklyDigest(): Promise<CronResult> {
  const weekAgo = new Date(Date.now() - 7 * 86400_000);
  const companies = await prisma.company.findMany({ where: { status: "ACTIVE" } });
  let processed = 0;
  for (const company of companies) {
    const [newFeedback, badFeedback, openIssues, overdue] = await Promise.all([
      prisma.feedbackResponse.count({ where: { companyId: company.id, submittedAt: { gte: weekAgo } } }),
      prisma.feedbackResponse.count({ where: { companyId: company.id, submittedAt: { gte: weekAgo }, sentiment: { in: ["NEGATIVE", "CRITICAL"] } } }),
      prisma.qualityIssue.count({ where: { companyId: company.id, status: { notIn: ["CLOSED", "REJECTED"] } } }),
      prisma.correctiveAction.count({ where: { companyId: company.id, status: { notIn: ["CLOSED", "EFFECTIVE"] }, dueDate: { lt: new Date() } } }),
    ]);
    if (newFeedback + openIssues + overdue === 0) continue;
    const admins = await prisma.user.findMany({ where: { companyId: company.id, role: "COMPANY_ADMIN", status: "ACTIVE" } });
    for (const admin of admins) {
      await sendMail("qm_weekly_digest", admin.email, {
        firstName: admin.firstName,
        newFeedback: String(newFeedback),
        badFeedback: String(badFeedback),
        openIssues: String(openIssues),
        overdue: String(overdue),
        link: `${process.env.APP_URL ?? ""}/company/qm`,
        issuer: appConfig.certificateIssuer,
      }, admin.locale);
      processed++;
    }
  }
  return { job: "qm-weekly-digest", processed };
}

/** Cron 8: Abgelaufene Testzugaenge deaktivieren (Firma auf INACTIVE, auditiert). */
export async function cronDeactivateExpiredTests(): Promise<CronResult> {
  const now = new Date();
  const expired = await prisma.company.findMany({
    where: { isTest: true, status: "ACTIVE", testExpiresAt: { not: null, lt: now } },
    select: { id: true, name: true },
  });
  for (const c of expired) {
    await prisma.company.update({ where: { id: c.id }, data: { status: "INACTIVE" } });
    await audit({
      action: "COMPANY_UPDATED",
      companyId: c.id,
      entityType: "Company",
      entityId: c.id,
      metadata: { reason: "test_access_expired" },
      oldValue: { status: "ACTIVE" },
      newValue: { status: "INACTIVE" },
    });
  }
  return { job: "deactivate-expired-tests", processed: expired.length, details: expired.map((c) => c.name) };
}

export const CRON_JOBS: Record<string, () => Promise<CronResult>> = {
  "qm-feedback-reminder": cronFeedbackReminder,
  "qm-threshold-check": cronThresholdCheck,
  "qm-capa-due-reminder": cronCapaDueReminder,
  "qm-critical-escalation": cronCriticalEscalation,
  "qm-management-review-generator": cronManagementReviewGenerator,
  "qm-effectiveness-check-reminder": cronEffectivenessReminder,
  "qm-weekly-digest": cronWeeklyDigest,
  "deactivate-expired-tests": cronDeactivateExpiredTests,
};
