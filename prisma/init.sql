-- Deterministisches SQLite-DDL, äquivalent zu prisma/schema.prisma.
-- Nutzung: npm run db:init  (Alternative ohne Engine-Download: siehe docs/DEPLOYMENT.md)
-- In Umgebungen mit Zugriff auf binaries.prisma.sh kann stattdessen `npx prisma db push` verwendet werden.
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS "Plan" (
  "id" TEXT PRIMARY KEY,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "maxParticipants" INTEGER,
  "priceMonthly" INTEGER,
  "features" TEXT NOT NULL DEFAULT '[]',
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);
CREATE UNIQUE INDEX IF NOT EXISTS "Plan_key_key" ON "Plan"("key");

CREATE TABLE IF NOT EXISTS "Company" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "address" TEXT,
  "uid" TEXT,
  "contactName" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "logoUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  "planKey" TEXT NOT NULL DEFAULT 'BASIC',
  "isTest" BOOLEAN NOT NULL DEFAULT false,
  "testExpiresAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("planKey") REFERENCES "Plan"("key")
);

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT PRIMARY KEY,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'PARTICIPANT',
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  "locale" TEXT NOT NULL DEFAULT 'de',
  "theme" TEXT NOT NULL DEFAULT 'system',
  "companyId" TEXT,
  "emailVerifiedAt" DATETIME,
  "birthDate" DATETIME,
  "totpSecret" TEXT,
  "totpEnabledAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("companyId") REFERENCES "Company"("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "Course" (
  "id" TEXT PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  "defaultLocale" TEXT NOT NULL DEFAULT 'de',
  "teachingUnits" INTEGER NOT NULL DEFAULT 4,
  "certificateValidityMonths" INTEGER,
  "publishedAt" DATETIME,
  "archivedAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "Course_slug_key" ON "Course"("slug");

CREATE TABLE IF NOT EXISTS "CourseTranslation" (
  "id" TEXT PRIMARY KEY,
  "courseId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "description" TEXT,
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "CourseTranslation_courseId_locale_key" ON "CourseTranslation"("courseId","locale");

CREATE TABLE IF NOT EXISTS "Module" (
  "id" TEXT PRIMARY KEY,
  "courseId" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "version" INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Module_slug_key" ON "Module"("slug");

CREATE TABLE IF NOT EXISTS "ModuleTranslation" (
  "id" TEXT PRIMARY KEY,
  "moduleId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "ModuleTranslation_moduleId_locale_key" ON "ModuleTranslation"("moduleId","locale");

CREATE TABLE IF NOT EXISTS "Lesson" (
  "id" TEXT PRIMARY KEY,
  "moduleId" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "durationMinutes" INTEGER NOT NULL DEFAULT 5,
  "required" BOOLEAN NOT NULL DEFAULT true,
  "version" INTEGER NOT NULL DEFAULT 1,
  "contentHash" TEXT,
  "videoUrl" TEXT,
  "downloadUrl" TEXT,
  FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Lesson_slug_key" ON "Lesson"("slug");

CREATE TABLE IF NOT EXISTS "LessonTranslation" (
  "id" TEXT PRIMARY KEY,
  "lessonId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "goal" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "example" TEXT NOT NULL,
  "risk" TEXT NOT NULL,
  "memo" TEXT NOT NULL,
  FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "LessonTranslation_lessonId_locale_key" ON "LessonTranslation"("lessonId","locale");

CREATE TABLE IF NOT EXISTS "MiniCheck" (
  "id" TEXT PRIMARY KEY,
  "lessonId" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "MiniCheckTranslation" (
  "id" TEXT PRIMARY KEY,
  "miniCheckId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  FOREIGN KEY ("miniCheckId") REFERENCES "MiniCheck"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "MiniCheckTranslation_miniCheckId_locale_key" ON "MiniCheckTranslation"("miniCheckId","locale");

CREATE TABLE IF NOT EXISTS "LessonProgress" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "lessonId" TEXT NOT NULL,
  "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "LessonProgress_userId_lessonId_key" ON "LessonProgress"("userId","lessonId");

CREATE TABLE IF NOT EXISTS "Question" (
  "id" TEXT PRIMARY KEY,
  "courseId" TEXT NOT NULL,
  "lessonId" TEXT,
  "category" TEXT NOT NULL,
  "difficulty" TEXT NOT NULL DEFAULT 'MITTEL',
  "practiceCase" BOOLEAN NOT NULL DEFAULT false,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "version" INTEGER NOT NULL DEFAULT 1,
  "tags" TEXT NOT NULL DEFAULT '[]',
  "contentHash" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE,
  FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id")
);

CREATE TABLE IF NOT EXISTS "QuestionTranslation" (
  "id" TEXT PRIMARY KEY,
  "questionId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "explanation" TEXT NOT NULL,
  FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "QuestionTranslation_questionId_locale_key" ON "QuestionTranslation"("questionId","locale");

CREATE TABLE IF NOT EXISTS "AnswerOption" (
  "id" TEXT PRIMARY KEY,
  "questionId" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "correct" BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "AnswerOptionTranslation" (
  "id" TEXT PRIMARY KEY,
  "answerOptionId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  FOREIGN KEY ("answerOptionId") REFERENCES "AnswerOption"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "AnswerOptionTranslation_answerOptionId_locale_key" ON "AnswerOptionTranslation"("answerOptionId","locale");

CREATE TABLE IF NOT EXISTS "Exam" (
  "id" TEXT PRIMARY KEY,
  "courseId" TEXT NOT NULL,
  "questionCount" INTEGER NOT NULL DEFAULT 30,
  "passPercentage" INTEGER NOT NULL DEFAULT 75,
  "maxAttempts" INTEGER NOT NULL DEFAULT 3,
  "timeLimitMinutes" INTEGER,
  "attemptResumeHours" INTEGER NOT NULL DEFAULT 24,
  "version" INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "Exam_courseId_key" ON "Exam"("courseId");

CREATE TABLE IF NOT EXISTS "ExamAttempt" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "courseVersion" INTEGER NOT NULL DEFAULT 1,
  "locale" TEXT NOT NULL DEFAULT 'de',
  "status" TEXT NOT NULL DEFAULT 'IN_PROGRESS',
  "questionIds" TEXT NOT NULL DEFAULT '[]',
  "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "submittedAt" DATETIME,
  "expiresAt" DATETIME NOT NULL,
  "scorePoints" INTEGER,
  "scorePercent" INTEGER,
  "passed" BOOLEAN,
  "ip" TEXT,
  "userAgent" TEXT,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
  FOREIGN KEY ("courseId") REFERENCES "Course"("id")
);

CREATE TABLE IF NOT EXISTS "ExamAnswer" (
  "id" TEXT PRIMARY KEY,
  "attemptId" TEXT NOT NULL,
  "questionId" TEXT NOT NULL,
  "selectedOptionIds" TEXT NOT NULL DEFAULT '[]',
  "correct" BOOLEAN,
  "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("attemptId") REFERENCES "ExamAttempt"("id") ON DELETE CASCADE,
  FOREIGN KEY ("questionId") REFERENCES "Question"("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "ExamAnswer_attemptId_questionId_key" ON "ExamAnswer"("attemptId","questionId");

CREATE TABLE IF NOT EXISTS "Certificate" (
  "id" TEXT PRIMARY KEY,
  "certificateNumber" TEXT NOT NULL,
  "verifyCode" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "companyId" TEXT NOT NULL,
  "courseId" TEXT NOT NULL,
  "courseVersion" INTEGER NOT NULL,
  "locale" TEXT NOT NULL DEFAULT 'de',
  "attemptId" TEXT NOT NULL,
  "scorePercent" INTEGER NOT NULL,
  "issuedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "validUntil" DATETIME,
  "status" TEXT NOT NULL DEFAULT 'VALID',
  "revokedAt" DATETIME,
  "revokeReason" TEXT,
  "pdfHash" TEXT,
  "issuedContentSnapshot" TEXT,
  FOREIGN KEY ("userId") REFERENCES "User"("id"),
  FOREIGN KEY ("companyId") REFERENCES "Company"("id"),
  FOREIGN KEY ("courseId") REFERENCES "Course"("id"),
  FOREIGN KEY ("attemptId") REFERENCES "ExamAttempt"("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Certificate_certificateNumber_key" ON "Certificate"("certificateNumber");
CREATE UNIQUE INDEX IF NOT EXISTS "Certificate_verifyCode_key" ON "Certificate"("verifyCode");
CREATE UNIQUE INDEX IF NOT EXISTS "Certificate_attemptId_key" ON "Certificate"("attemptId");

CREATE TABLE IF NOT EXISTS "Invitation" (
  "id" TEXT PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "email" TEXT,
  "code" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'PARTICIPANT',
  "invitedById" TEXT NOT NULL,
  "acceptedAt" DATETIME,
  "expiresAt" DATETIME NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE,
  FOREIGN KEY ("invitedById") REFERENCES "User"("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Invitation_code_key" ON "Invitation"("code");

CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expiresAt" DATETIME NOT NULL,
  "usedAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

CREATE TABLE IF NOT EXISTS "AuditLog" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT,
  "companyId" TEXT,
  "action" TEXT NOT NULL,
  "entityType" TEXT,
  "entityId" TEXT,
  "metadata" TEXT NOT NULL DEFAULT '{}',
  "ip" TEXT,
  "userAgent" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "User"("id"),
  FOREIGN KEY ("companyId") REFERENCES "Company"("id")
);
CREATE INDEX IF NOT EXISTS "AuditLog_companyId_createdAt_idx" ON "AuditLog"("companyId","createdAt");
CREATE INDEX IF NOT EXISTS "AuditLog_action_createdAt_idx" ON "AuditLog"("action","createdAt");

CREATE TABLE IF NOT EXISTS "MailLog" (
  "id" TEXT PRIMARY KEY,
  "to" TEXT NOT NULL,
  "template" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'LOGGED',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "EmailTemplate" (
  "id" TEXT PRIMARY KEY,
  "key" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "EmailTemplate_key_locale_key" ON "EmailTemplate"("key","locale");

CREATE TABLE IF NOT EXISTS "CompanyLegalProfile" (
  "id" TEXT PRIMARY KEY,
  "legalName" TEXT NOT NULL,
  "chineseName" TEXT,
  "address" TEXT NOT NULL,
  "country" TEXT NOT NULL,
  "registrationNumber" TEXT,
  "organisationCode" TEXT,
  "taxNumber" TEXT,
  "registeredCapital" TEXT,
  "foundingDate" TEXT,
  "registrationAuthority" TEXT,
  "email" TEXT NOT NULL,
  "website" TEXT NOT NULL,
  "representativeName" TEXT,
  "legalDisclaimer" TEXT,
  "privacyContactEmail" TEXT,
  "imprintSourceUrl" TEXT,
  "lastCheckedAt" DATETIME
);

-- ===================== QM-MODUL =====================
CREATE TABLE IF NOT EXISTS "FeedbackSurvey" (
  "id" TEXT PRIMARY KEY, "companyId" TEXT, "courseId" TEXT, "locale" TEXT NOT NULL DEFAULT 'de',
  "title" TEXT NOT NULL, "description" TEXT, "triggerEvent" TEXT NOT NULL DEFAULT 'CERTIFICATE_ISSUED',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "FeedbackQuestion" (
  "id" TEXT PRIMARY KEY, "surveyId" TEXT NOT NULL, "category" TEXT NOT NULL, "questionText" TEXT NOT NULL,
  "questionType" TEXT NOT NULL, "isRequired" BOOLEAN NOT NULL DEFAULT true, "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "helpText" TEXT, "options" TEXT, "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("surveyId") REFERENCES "FeedbackSurvey"("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "FeedbackResponse" (
  "id" TEXT PRIMARY KEY, "companyId" TEXT NOT NULL, "courseId" TEXT NOT NULL, "userId" TEXT NOT NULL,
  "examAttemptId" TEXT, "certificateId" TEXT, "surveyId" TEXT NOT NULL,
  "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "averageScore" REAL, "npsScore" INTEGER,
  "sentiment" TEXT NOT NULL DEFAULT 'NEUTRAL', "status" TEXT NOT NULL DEFAULT 'RECEIVED',
  "needsRetraining" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("surveyId") REFERENCES "FeedbackSurvey"("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "FeedbackResponse_userId_surveyId_courseId_key" ON "FeedbackResponse"("userId","surveyId","courseId");
CREATE INDEX IF NOT EXISTS "FeedbackResponse_companyId_submittedAt_idx" ON "FeedbackResponse"("companyId","submittedAt");
CREATE TABLE IF NOT EXISTS "FeedbackAnswer" (
  "id" TEXT PRIMARY KEY, "responseId" TEXT NOT NULL, "questionId" TEXT NOT NULL,
  "ratingValue" INTEGER, "booleanValue" BOOLEAN, "textValue" TEXT, "selectedOptions" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("responseId") REFERENCES "FeedbackResponse"("id") ON DELETE CASCADE,
  FOREIGN KEY ("questionId") REFERENCES "FeedbackQuestion"("id")
);
CREATE TABLE IF NOT EXISTS "QMThreshold" (
  "id" TEXT PRIMARY KEY, "companyId" TEXT, "scope" TEXT NOT NULL DEFAULT 'GLOBAL', "courseId" TEXT,
  "metric" TEXT NOT NULL, "warningThreshold" REAL NOT NULL, "criticalThreshold" REAL NOT NULL,
  "actionRequired" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "QMThreshold_scope_metric_companyId_courseId_key" ON "QMThreshold"("scope","metric","companyId","courseId");
CREATE TABLE IF NOT EXISTS "QualityIssue" (
  "id" TEXT PRIMARY KEY, "companyId" TEXT NOT NULL, "courseId" TEXT, "userId" TEXT, "feedbackResponseId" TEXT,
  "title" TEXT NOT NULL, "description" TEXT NOT NULL, "source" TEXT NOT NULL DEFAULT 'FEEDBACK',
  "severity" TEXT NOT NULL DEFAULT 'MEDIUM', "category" TEXT NOT NULL DEFAULT 'CONTENT',
  "status" TEXT NOT NULL DEFAULT 'OPEN', "ownerId" TEXT, "dueDate" DATETIME, "dedupeKey" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "closedAt" DATETIME,
  FOREIGN KEY ("feedbackResponseId") REFERENCES "FeedbackResponse"("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "QualityIssue_dedupeKey_key" ON "QualityIssue"("dedupeKey");
CREATE INDEX IF NOT EXISTS "QualityIssue_companyId_status_idx" ON "QualityIssue"("companyId","status");
CREATE TABLE IF NOT EXISTS "CorrectiveAction" (
  "id" TEXT PRIMARY KEY, "companyId" TEXT NOT NULL, "qualityIssueId" TEXT NOT NULL, "title" TEXT NOT NULL,
  "rootCause" TEXT, "immediateAction" TEXT, "correctiveAction" TEXT, "preventiveAction" TEXT,
  "ownerId" TEXT, "dueDate" DATETIME, "status" TEXT NOT NULL DEFAULT 'PLANNED',
  "effectivenessCheckDate" DATETIME, "effectivenessResult" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "closedAt" DATETIME,
  FOREIGN KEY ("qualityIssueId") REFERENCES "QualityIssue"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "CorrectiveAction_companyId_status_idx" ON "CorrectiveAction"("companyId","status");
CREATE TABLE IF NOT EXISTS "ManagementReview" (
  "id" TEXT PRIMARY KEY, "companyId" TEXT NOT NULL, "periodStart" DATETIME NOT NULL, "periodEnd" DATETIME NOT NULL,
  "title" TEXT NOT NULL, "summary" TEXT, "feedbackSummary" TEXT, "complaintSummary" TEXT,
  "examResultSummary" TEXT, "certificateSummary" TEXT, "correctiveActionSummary" TEXT, "riskSummary" TEXT,
  "improvementActions" TEXT, "decisions" TEXT, "responsibleUserId" TEXT,
  "status" TEXT NOT NULL DEFAULT 'DRAFT', "approvedById" TEXT, "approvedAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "ManagementReview_companyId_periodStart_periodEnd_key" ON "ManagementReview"("companyId","periodStart","periodEnd");
CREATE TABLE IF NOT EXISTS "ContentRevision" (
  "id" TEXT PRIMARY KEY, "entityType" TEXT NOT NULL, "entityId" TEXT NOT NULL,
  "versionLabel" TEXT NOT NULL, "changeNote" TEXT NOT NULL, "changedById" TEXT, "snapshot" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "ContentRevision_entity_idx" ON "ContentRevision"("entityType","entityId","createdAt");
ALTER TABLE "AuditLog" ADD COLUMN "oldValue" TEXT;
ALTER TABLE "AuditLog" ADD COLUMN "newValue" TEXT;
ALTER TABLE "Company" ADD COLUMN "isTest" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Company" ADD COLUMN "testExpiresAt" DATETIME;
CREATE TABLE IF NOT EXISTS "MaterialDownload" (
  "id" TEXT PRIMARY KEY, "userId" TEXT NOT NULL, "courseId" TEXT NOT NULL,
  "downloadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "pdfHash" TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS "MaterialDownload_userId_courseId_key" ON "MaterialDownload"("userId","courseId");
CREATE TABLE IF NOT EXISTS "InterestLead" (
  "id" TEXT PRIMARY KEY, "topics" TEXT NOT NULL, "message" TEXT,
  "email" TEXT, "name" TEXT, "company" TEXT,
  "consent" BOOLEAN NOT NULL DEFAULT 0, "source" TEXT NOT NULL DEFAULT 'themen',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "InterestLead_createdAt_idx" ON "InterestLead"("createdAt");
CREATE TABLE IF NOT EXISTS "ContentAuditItem" (
  "id" TEXT PRIMARY KEY, "contentRevisionId" TEXT, "entityType" TEXT NOT NULL, "entityId" TEXT NOT NULL,
  "blockKey" TEXT, "entitySlug" TEXT, "title" TEXT NOT NULL, "locale" TEXT NOT NULL DEFAULT 'de',
  "source" TEXT NOT NULL DEFAULT 'AI_ASSISTED', "status" TEXT NOT NULL DEFAULT 'NEEDS_REVIEW',
  "riskLevel" TEXT NOT NULL DEFAULT 'LOW', "requiresOwnerApproval" BOOLEAN NOT NULL DEFAULT 0,
  "contentHash" TEXT NOT NULL, "approvedContentHash" TEXT, "version" INTEGER NOT NULL DEFAULT 1,
  "currentContentSnapshot" TEXT NOT NULL, "previousContentSnapshot" TEXT, "changeSummary" TEXT,
  "riskHits" TEXT, "aiGenerated" BOOLEAN NOT NULL DEFAULT 1,
  "reviewedById" TEXT, "reviewedAt" DATETIME, "approvedById" TEXT, "approvedAt" DATETIME,
  "ownerApprovedById" TEXT, "ownerApprovedAt" DATETIME, "publishedAt" DATETIME, "notes" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "ContentAuditItem_entity_block_locale_key" ON "ContentAuditItem"("entityType","entityId","blockKey","locale");
CREATE INDEX IF NOT EXISTS "ContentAuditItem_status_risk_idx" ON "ContentAuditItem"("status","riskLevel");
CREATE INDEX IF NOT EXISTS "ContentAuditItem_updatedAt_idx" ON "ContentAuditItem"("updatedAt");
CREATE TABLE IF NOT EXISTS "ReviewChecklistTemplate" (
  "id" TEXT PRIMARY KEY, "name" TEXT NOT NULL, "entityType" TEXT, "locale" TEXT,
  "isDefault" BOOLEAN NOT NULL DEFAULT 0, "isActive" BOOLEAN NOT NULL DEFAULT 1,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "ReviewChecklistItem" (
  "id" TEXT PRIMARY KEY, "templateId" TEXT NOT NULL REFERENCES "ReviewChecklistTemplate"("id") ON DELETE CASCADE,
  "key" TEXT NOT NULL, "label" TEXT NOT NULL, "description" TEXT,
  "required" BOOLEAN NOT NULL DEFAULT 1, "sortOrder" INTEGER NOT NULL DEFAULT 0, "riskLevelIfUnchecked" TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS "ReviewChecklistItem_template_key_key" ON "ReviewChecklistItem"("templateId","key");
CREATE TABLE IF NOT EXISTS "ContentReviewChecklistResult" (
  "id" TEXT PRIMARY KEY, "auditItemId" TEXT NOT NULL REFERENCES "ContentAuditItem"("id") ON DELETE CASCADE,
  "templateId" TEXT NOT NULL REFERENCES "ReviewChecklistTemplate"("id"),
  "reviewerId" TEXT NOT NULL, "completedAt" DATETIME, "approvedForPublication" BOOLEAN NOT NULL DEFAULT 0,
  "notes" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS "ContentReviewChecklistResult_item_idx" ON "ContentReviewChecklistResult"("auditItemId");
CREATE TABLE IF NOT EXISTS "ContentReviewChecklistAnswer" (
  "id" TEXT PRIMARY KEY, "checklistResultId" TEXT NOT NULL REFERENCES "ContentReviewChecklistResult"("id") ON DELETE CASCADE,
  "checklistItemId" TEXT NOT NULL REFERENCES "ReviewChecklistItem"("id") ON DELETE CASCADE,
  "checked" BOOLEAN NOT NULL DEFAULT 0, "comment" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS "ContentReviewChecklistAnswer_result_item_key" ON "ContentReviewChecklistAnswer"("checklistResultId","checklistItemId");
CREATE TABLE IF NOT EXISTS "AvvAcceptance" (
  "id" TEXT PRIMARY KEY,
  "companyId" TEXT NOT NULL,
  "acceptedById" TEXT NOT NULL,
  "avvVersion" TEXT NOT NULL,
  "avvContentHash" TEXT,
  "signerName" TEXT NOT NULL,
  "signerBirthDate" TEXT,
  "signerPosition" TEXT NOT NULL,
  "signatureText" TEXT NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "acceptedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("companyId") REFERENCES "Company"("id"),
  FOREIGN KEY ("acceptedById") REFERENCES "User"("id")
);
CREATE INDEX IF NOT EXISTS "AvvAcceptance_company_idx" ON "AvvAcceptance"("companyId","acceptedAt");
