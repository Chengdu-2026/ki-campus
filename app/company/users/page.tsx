import Link from "next/link";
import { requireRole } from "@/lib/rbac";
import { getCompanyProgress } from "@/lib/company-data";
import { getT } from "@/lib/i18n";
import { createParticipant, toggleUserStatus, deleteUserGdpr } from "@/app/actions/company-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmButton } from "@/components/forms/confirm-button";

export const metadata = { title: "Mitarbeitende" };

export default async function CompanyUsersPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(user.locale);
  if (!user.companyId) return null;
  const members = await getCompanyProgress(user.companyId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("company.usersTitle")}</h1>

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
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/company/users/${m.userId}`} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                      Bearbeiten
                    </Link>
                    <form action={toggleUserStatus.bind(null, m.userId)}>
                      <button type="submit" className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
                        {m.status === "ACTIVE" ? t("company.deactivate") : t("company.activate")}
                      </button>
                    </form>
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

      <Card>
        <CardHeader><CardTitle className="text-base">{t("company.createUser")}</CardTitle></CardHeader>
        <CardContent>
          <ActionForm
            action={createParticipant}
            submitLabel={t("company.createUser")}
            successMessage={t("admin.saveDone")}
            errorMap={buildErrorMap(user.locale)}
            className="grid gap-4 sm:grid-cols-2"
          >
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
              <Input id="password" name="password" type="password" required minLength={10} />
            </div>
            <div>
              <Label htmlFor="birthDate">Geburtsdatum (optional)</Label>
              <Input id="birthDate" name="birthDate" type="date" />
            </div>
          </ActionForm>
        </CardContent>
      </Card>
    </div>
  );
}
