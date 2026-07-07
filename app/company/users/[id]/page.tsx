import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole, assertCompanyScope } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { updateParticipant } from "@/app/actions/company-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Teilnehmer bearbeiten" };

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await requireRole("COMPANY_ADMIN", "SUPERADMIN");
  const t = getT(admin.locale);

  const target = await prisma.user.findUnique({ where: { id }, include: { company: true } });
  if (!target) notFound();
  try {
    assertCompanyScope(admin, target.companyId);
  } catch {
    redirect("/company/users");
  }

  const birthDateValue = target.birthDate ? target.birthDate.toISOString().slice(0, 10) : "";
  const backHref = admin.role === "SUPERADMIN" && admin.companyId !== target.companyId
    ? `/admin/companies/${target.companyId}`
    : "/company/users";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">
          {target.firstName} {target.lastName}
        </h1>
        <Badge variant={target.status === "ACTIVE" ? "success" : "neutral"}>
          {target.status === "ACTIVE" ? t("common.active") : t("common.inactive")}
        </Badge>
        <Link href={backHref} className="text-sm text-brand-700 hover:underline dark:text-accent-400">
          {t("common.back")}
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stammdaten bearbeiten</CardTitle>
          <CardDescription>{target.company?.name} · {t(`roles.${target.role}`)}</CardDescription>
        </CardHeader>
        <CardContent>
          <ActionForm
            action={updateParticipant}
            submitLabel={t("common.save")}
            successMessage={t("admin.saveDone")}
            errorMap={buildErrorMap(admin.locale)}
          >
            <input type="hidden" name="userId" value={target.id} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">{t("auth.firstName")}</Label>
                <Input id="firstName" name="firstName" defaultValue={target.firstName} required />
              </div>
              <div>
                <Label htmlFor="lastName">{t("auth.lastName")}</Label>
                <Input id="lastName" name="lastName" defaultValue={target.lastName} required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">{t("common.email")}</Label>
              <Input id="email" name="email" type="email" defaultValue={target.email} required />
            </div>
            <div>
              <Label htmlFor="birthDate">Geburtsdatum (optional)</Label>
              <Input id="birthDate" name="birthDate" type="date" defaultValue={birthDateValue} />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Erscheint auf dem Zertifikat und macht den Nachweis eindeutig zuordenbar.
              </p>
            </div>
          </ActionForm>
        </CardContent>
      </Card>
    </div>
  );
}
