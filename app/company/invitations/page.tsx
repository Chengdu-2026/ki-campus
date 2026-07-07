import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { createInvitation } from "@/app/actions/company-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/ui/empty-state";
import { CopyButton } from "@/components/forms/copy-button";

export const metadata = { title: "Einladungen" };

export default async function InvitationsPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(user.locale);
  if (!user.companyId) return null;

  const invitations = await prisma.invitation.findMany({
    where: { companyId: user.companyId },
    orderBy: { createdAt: "desc" },
  });
  const appUrl = process.env.APP_URL ?? "";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("nav.companyInvitations")}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("company.inviteUser")}</CardTitle>
          <CardDescription>{t("auth.registerText")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ActionForm
            action={createInvitation}
            submitLabel={t("company.inviteUser")}
            successMessage={t("admin.saveDone")}
            errorMap={buildErrorMap(user.locale)}
          >
            <div>
              <Label htmlFor="email">{t("common.email")} ({t("company.inviteByEmail")} — leer lassen für {t("company.inviteByCode")})</Label>
              <Input id="email" name="email" type="email" placeholder="optional" />
            </div>
          </ActionForm>
        </CardContent>
      </Card>

      {invitations.length === 0 ? (
        <EmptyState title={t("company.usersEmpty")} />
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
            {invitations.map((inv) => {
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
    </div>
  );
}
