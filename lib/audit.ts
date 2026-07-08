import { prisma } from "@/lib/prisma";

export type AuditAction =
  | "USER_INVITED" | "USER_REGISTERED" | "USER_CREATED" | "USER_UPDATED" | "USER_ACTIVATED" | "USER_DEACTIVATED" | "USER_DELETED"
  | "COMPANY_CREATED" | "COMPANY_UPDATED"
  | "LESSON_COMPLETED"
  | "EXAM_STARTED" | "EXAM_SUBMITTED" | "EXAM_PASSED" | "EXAM_FAILED" | "EXAM_ATTEMPTS_RESET"
  | "CERTIFICATE_ISSUED" | "CERTIFICATE_DOWNLOADED" | "CERTIFICATE_VERIFIED" | "CERTIFICATE_REVOKED"
  | "RETRAINING_RECOMMENDED" | "RETRAINING_COMPLETED"
  | "REPORT_EXPORTED"
  | "COURSE_UPDATED" | "QUESTION_UPDATED" | "TRANSLATION_UPDATED" | "TEMPLATE_UPDATED"
  | "LOGIN_FAILED" | "PASSWORD_RESET_REQUESTED" | "PASSWORD_RESET_DONE"
  | "TOTP_ENABLED" | "TOTP_DISABLED" | "TOTP_FAILED"
  | "QM_FEEDBACK_SUBMITTED" | "QM_FEEDBACK_REVIEWED" | "QM_ISSUE_CREATED" | "QM_ISSUE_UPDATED"
  | "QM_ACTION_CREATED" | "QM_ACTION_UPDATED" | "QM_ACTION_CLOSED" | "QM_EFFECTIVENESS_CHECKED"
  | "QM_REVIEW_CREATED" | "QM_REVIEW_APPROVED" | "QM_THRESHOLD_CHANGED" | "QM_REPORT_EXPORTED"
  | "CONTENT_REVISION_CREATED"
  | "CONTENT_AUDIT_SCANNED" | "CONTENT_AUDIT_CHANGED" | "CONTENT_AUDIT_REVIEW_STARTED"
  | "CONTENT_AUDIT_APPROVED" | "CONTENT_AUDIT_OWNER_APPROVED" | "CONTENT_AUDIT_CHANGES_REQUESTED"
  | "CONTENT_AUDIT_REJECTED" | "CONTENT_AUDIT_PUBLISHED" | "CONTENT_AUDIT_EXPORTED";

export async function audit(params: {
  action: AuditAction;
  userId?: string | null;
  companyId?: string | null;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  oldValue?: unknown;
  newValue?: unknown;
  ip?: string | null;
  userAgent?: string | null;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        action: params.action,
        userId: params.userId ?? null,
        companyId: params.companyId ?? null,
        entityType: params.entityType,
        entityId: params.entityId,
        metadata: JSON.stringify(params.metadata ?? {}),
        oldValue: params.oldValue !== undefined ? JSON.stringify(params.oldValue) : null,
        newValue: params.newValue !== undefined ? JSON.stringify(params.newValue) : null,
        ip: params.ip ?? null,
        userAgent: params.userAgent ?? null,
      },
    });
  } catch (e) {
    console.error("AuditLog-Fehler:", e);
  }
}
