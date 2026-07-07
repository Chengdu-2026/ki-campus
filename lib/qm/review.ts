import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { sendMail } from "@/lib/mail";
import { appConfig } from "@/config/app";
import { courseMetrics } from "@/lib/qm/service";

/** Quartalsgrenzen des letzten abgeschlossenen Quartals. */
export function lastQuarter(now: Date = new Date()): { start: Date; end: Date; label: string } {
  const q = Math.floor(now.getMonth() / 3); // aktuelles Quartal 0-3
  const year = q === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const lastQ = q === 0 ? 3 : q - 1;
  const start = new Date(Date.UTC(year, lastQ * 3, 1));
  const end = new Date(Date.UTC(year, lastQ * 3 + 3, 0, 23, 59, 59));
  return { start, end, label: `Q${lastQ + 1}/${year}` };
}

/** Management-Review-Entwurf mit automatisch befüllten Kennzahlen (idempotent je Firma+Zeitraum). */
export async function generateManagementReviewDraft(companyId: string, period = lastQuarter()) {
  const existing = await prisma.managementReview.findUnique({
    where: { companyId_periodStart_periodEnd: { companyId, periodStart: period.start, periodEnd: period.end } },
  });
  if (existing) return existing;

  const range = { gte: period.start, lte: period.end };
  const [participants, attempts, certificates, feedbacks, issuesOpen, issuesClosed, actionsOpen, actionsClosed, actionsEffective] = await Promise.all([
    prisma.user.count({ where: { companyId, role: "PARTICIPANT" } }),
    prisma.examAttempt.findMany({ where: { user: { companyId }, status: "SUBMITTED", submittedAt: range }, select: { passed: true, scorePercent: true } }),
    prisma.certificate.count({ where: { companyId, issuedAt: range } }),
    prisma.feedbackResponse.findMany({ where: { companyId, submittedAt: range }, select: { averageScore: true, sentiment: true } }),
    prisma.qualityIssue.count({ where: { companyId, status: { notIn: ["CLOSED", "REJECTED"] } } }),
    prisma.qualityIssue.count({ where: { companyId, closedAt: range } }),
    prisma.correctiveAction.count({ where: { companyId, status: { notIn: ["CLOSED"] } } }),
    prisma.correctiveAction.count({ where: { companyId, closedAt: range } }),
    prisma.correctiveAction.count({ where: { companyId, status: "EFFECTIVE" } }),
  ]);

  const passed = attempts.filter((a) => a.passed).length;
  const passRate = attempts.length ? Math.round((passed / attempts.length) * 100) : null;
  const avgScore = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + (a.scorePercent ?? 0), 0) / attempts.length) : null;
  const scored = feedbacks.filter((f) => f.averageScore !== null);
  const avgFeedback = scored.length
    ? (scored.reduce((s, f) => s + (f.averageScore ?? 0), 0) / scored.length).toFixed(2) : "—";
  const negative = feedbacks.filter((f) => f.sentiment === "NEGATIVE" || f.sentiment === "CRITICAL").length;

  const review = await prisma.managementReview.create({
    data: {
      companyId,
      periodStart: period.start,
      periodEnd: period.end,
      title: `Management-Review ${period.label}`,
      summary: `Automatisch erstellter Entwurf für ${period.label}. Bitte prüfen, ergänzen und freigeben.`,
      feedbackSummary: `${feedbacks.length} Feedbacks, Ø ${avgFeedback}, davon ${negative} negativ/kritisch.`,
      complaintSummary: `${issuesOpen} offene QM-Fälle, ${issuesClosed} im Zeitraum geschlossen.`,
      examResultSummary: attempts.length
        ? `${attempts.length} Prüfungen, Bestehensquote ${passRate} %, Ø Ergebnis ${avgScore} %.`
        : "Keine Prüfungen im Zeitraum.",
      certificateSummary: `${certificates} Zertifikate ausgestellt. ${participants} Teilnehmende gesamt.`,
      correctiveActionSummary: `${actionsOpen} offene Maßnahmen, ${actionsClosed} geschlossen, ${actionsEffective} als wirksam bewertet.`,
      riskSummary: negative > 0 || issuesOpen > 0
        ? "Offene QM-Fälle bzw. negatives Feedback vorhanden — Priorisierung im Review festlegen."
        : "Keine besonderen Risiken aus dem QM-Datenbestand erkennbar.",
      status: "DRAFT",
    },
  });
  await audit({ action: "QM_REVIEW_CREATED", companyId, entityType: "ManagementReview", entityId: review.id, metadata: { period: period.label, auto: true } });

  const admins = await prisma.user.findMany({ where: { companyId, role: "COMPANY_ADMIN", status: "ACTIVE" } });
  for (const admin of admins) {
    await sendMail("qm_review_draft", admin.email, {
      firstName: admin.firstName,
      period: period.label,
      link: `${process.env.APP_URL ?? ""}/company/qm/reviews`,
      issuer: appConfig.certificateIssuer,
    }, admin.locale);
  }
  return review;
}
