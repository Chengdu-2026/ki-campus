import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getCompanyProgress } from "@/lib/company-data";
import { getDefaultCourse } from "@/lib/content";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import {
  createInvitation, createParticipant, toggleUserStatus, deleteUserGdpr, resetAttempts, sendReminder,
} from "@/app/actions/company-actions";
import { updateCompany, setCompanyTestAccess } from "@/app/actions/admin-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { ConfirmButton } from "@/components/forms/confirm-button";
import { CopyButton } from "@/components/forms/copy-button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/ui/empty-state";
import { VersionBadge } from "@/components/ui/version-badge";
import { PasswordInput } from "@/components/ui/password-input";

export const metadata = { title: "Firma verwalten" };

const SELECT_CLS =
  "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";

/** Superadmin: Teilnehmerverwaltung einer beliebigen Firma (anlegen, einladen, bearbeiten). */
export default async function AdminCompanyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);

  const company = await prisma.company.findUnique({
    where: { id },
    include: { plan: true, invitations: { orderBy: { createdAt: "desc" }, take: 10 } },
  });
  if (!company) notFound();

  const [members, course] = await Promise.all([getCompanyProgress(company.id), getDefaultCourse()]);
  const appUrl = process.env.APP_URL ?? "";
  const plans = await prisma.plan.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{company.name}</h1>
        <Badge variant="neutral">{company.plan.name}</Badge>
        {company.isTest && <Badge variant="warning">{t("admin.testBadge")}</Badge>}
        <Link href="/admin/companies" className="text-sm text-brand-700 hover:underline dark:text-accent-400">
          {t("common.back")}
        </Link>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">{t("admin.editCompany")} <VersionBadge feature="superadmin-verwaltung" /></CardTitle>
          </CardHeader>
          <CardContent>
            <ActionForm
              action={updateCompany}
              submitLabel={t("common.save")}
              successMessage={t("admin.saveDone")}
              errorMap={buildErrorMap(user.locale)}
              className="grid gap-4 sm:grid-cols-2"
            >
              <input type="hidden" name="companyId" value={company.id} />
              <div className="sm:col-span-2">
                <Label htmlFor="c-name">{t("common.name")}</Label>
                <Input id="c-name" name="name" defaultValue={company.name} required minLength={2} />
              </div>
              <div>
                <Label htmlFor="c-contact">{t("admin.companyContact")}</Label>
                <Input id="c-contact" name="contactName" defaultValue={company.contactName ?? ""} />
              </div>
              <div>
                <Label htmlFor="c-uid">{t("admin.companyUid")}</Label>
                <Input id="c-uid" name="uid" defaultValue={company.uid ?? ""} />
              </div>
              <div>
                <Label htmlFor="c-email">{t("common.email")}</Label>
                <Input id="c-email" name="email" type="email" defaultValue={company.email ?? ""} />
              </div>
              <div>
                <Label htmlFor="c-phone">{t("admin.companyPhone")}</Label>
                <Input id="c-phone" name="phone" defaultValue={company.phone ?? ""} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="c-address">{t("admin.companyAddress")}</Label>
                <Input id="c-address" name="address" defaultValue={company.address ?? ""} />
              </div>
              <div>
                <Label htmlFor="c-plan">{t("admin.companyPlan")}</Label>
                <select id="c-plan" name="planKey" defaultValue={company.planKey} className={SELECT_CLS}>
                  {plans.map((p) => (
                    <option key={p.key} value={p.key}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="c-status">{t("common.status")}</Label>
                <select id="c-status" name="status" defaultValue={company.status} className={SELECT_CLS}>
                  <option value="ACTIVE">{t("common.active")}</option>
                  <option value="INACTIVE">{t("common.inactive")}</option>
                </select>
              </div>
            </ActionForm>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">{t("admin.testAccessTitle")} <VersionBadge feature="tester-freigabe" /></CardTitle>
            <CardDescription>{t("admin.testAccessHint")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ActionForm
              action={setCompanyTestAccess}
              submitLabel={t("common.save")}
              successMessage={t("admin.saveDone")}
              errorMap={buildErrorMap(user.locale)}
            >
              <input type="hidden" name="companyId" value={company.id} />
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <input
                  type="checkbox"
                  name="isTest"
                  defaultChecked={company.isTest}
                  className="h-4 w-4 rounded border-slate-300 text-accent-600 focus:ring-accent-500"
                />
                {t("admin.enableTestAccess")}
              </label>
              <div>
                <Label htmlFor="c-testexp">{t("admin.testExpiresAt")}</Label>
                <Input
                  id="c-testexp"
                  name="testExpiresAt"
                  type="date"
                  defaultValue={company.testExpiresAt ? company.testExpiresAt.toISOString().slice(0, 10) : ""}
                />
              </div>
              {company.isTest && (
                <p className="rounded-lg bg-amber-50 p-2 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                  {t("admin.testActiveNote")}
                </p>
              )}
            </ActionForm>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("company.inviteUser")}</CardTitle>
            <CardDescription>{t("company.inviteByEmail")} — leer lassen für {t("company.inviteByCode")}.</CardDescription>
          </CardHeader>
          <CardContent>
            <ActionForm
              action={createInvitation}
              submitLabel={t("company.inviteUser")}
              successMessage={t("admin.saveDone")}
              errorMap={buildErrorMap(user.locale)}
            >
              <input type="hidden" name="companyId" value={company.id} />
              <div>
                <Label htmlFor="invite-email">{t("common.email")}</Label>
                <Input id="invite-email" name="email" type="email" placeholder="optional" />
              </div>
            </ActionForm>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("company.createUser")}</CardTitle>
          </CardHeader>
          <CardContent>
            <ActionForm
              action={createParticipant}
              submitLabel={t("company.createUser")}
              successMessage={t("admin.saveDone")}
              errorMap={buildErrorMap(user.locale)}
              className="grid gap-4 sm:grid-cols-2"
            >
              <input type="hidden" name="companyId" value={company.id} />
              <div>
                <Label htmlFor="firstName">{t("auth.firstName")}</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div>
                <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                <Input id="lastName" name="lastName" required />
              </div>
              <div>
                <Label htmlFor="email">{t("common.email")}</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password">{t("auth.password")}</Label>
                <PasswordInput id="password" name="password" required minLength={10} autoComplete="new-password" />
              </div>
              <div>
                <Label htmlFor="birthDate">Geburtsdatum (optional)</Label>
                <Input id="birthDate" name="birthDate" type="date" />
              </div>
            </ActionForm>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{t("company.usersTitle")}</h2>
        {members.length === 0 ? (
          <EmptyState title={t("company.usersEmpty")} />
        ) : (
          <Table>
            <THead>
              <Tr>
                <Th>{t("common.name")}</Th>
                <Th>{t("common.email")}</Th>
                <Th>{t("common.status")}</Th>
                <Th>{t("company.courseProgress")}</Th>
                <Th>{t("company.examState")}</Th>
                <Th>{t("common.actions")}</Th>
              </Tr>
            </THead>
            <TBody>
              {members.map((m) => (
                <Tr key={m.userId}>
                  <Td className="font-medium">{m.firstName} {m.lastName}</Td>
                  <Td>{m.email}</Td>
                  <Td>
                    <Badge variant={m.status === "ACTIVE" ? "success" : "neutral"}>
                      {m.status === "ACTIVE" ? t("common.active") : t("common.inactive")}
                    </Badge>
                  </Td>
                  <Td>{m.progressPercent} %</Td>
                  <Td>
                    <Badge variant={m.passed ? "success" : m.failed ? "danger" : "neutral"}>
                      {m.passed ? t("company.examPassed") : m.failed ? t("company.examFailed") : t("company.examOpen")}
                    </Badge>
                  </Td>
                  <Td>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/company/users/${m.userId}`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                        Bearbeiten
                      </Link>
                      <form action={toggleUserStatus.bind(null, m.userId)}>
                        <button type="submit" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                          {m.status === "ACTIVE" ? t("company.deactivate") : t("company.activate")}
                        </button>
                      </form>
                      <form action={sendReminder.bind(null, m.userId)}>
                        <button type="submit" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                          {t("company.sendReminder")}
                        </button>
                      </form>
                      {m.failed && course && (
                        <form action={resetAttempts.bind(null, m.userId, course.id)}>
                          <button type="submit" className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-200 dark:hover:bg-amber-950">
                            {t("company.resetAttempts")}
                          </button>
                        </form>
                      )}
                      <ConfirmButton
                        action={deleteUserGdpr.bind(null, m.userId)}
                        confirmText={t("company.deleteConfirm")}
                        label={t("company.deleteUser")}
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-brand-900 dark:text-white">{t("nav.companyInvitations")}</h2>
        {company.invitations.length === 0 ? (
          <EmptyState title={t("common.none")} />
        ) : (
          <Table>
            <THead>
              <Tr>
                <Th>{t("common.email")}</Th>
                <Th>{t("company.inviteCode")}</Th>
                <Th>{t("company.inviteLink")}</Th>
                <Th>{t("common.status")}</Th>
                <Th>{t("common.date")}</Th>
              </Tr>
            </THead>
            <TBody>
              {company.invitations.map((inv) => {
                const expired = inv.expiresAt < new Date() && !inv.acceptedAt;
                return (
                  <Tr key={inv.id}>
                    <Td>{inv.email ?? "—"}</Td>
                    <Td className="font-mono">{inv.code}</Td>
                    <Td><CopyButton text={`${appUrl}/invite/${inv.code}`} label={t("company.inviteLink")} /></Td>
                    <Td>
                      <Badge variant={inv.acceptedAt ? "success" : expired ? "danger" : "warning"}>
                        {inv.acceptedAt ? t("company.inviteAccepted") : expired ? t("company.inviteExpired") : t("company.invitePending")}
                      </Badge>
                    </Td>
                    <Td>{formatDate(inv.createdAt)}</Td>
                  </Tr>
                );
              })}
            </TBody>
          </Table>
        )}
      </section>
    </div>
  );
}
