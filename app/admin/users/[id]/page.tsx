import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { updateUserAsSuperadmin } from "@/app/actions/admin-actions";
import { buildErrorMap } from "@/lib/i18n/error-map";
import { ActionForm } from "@/components/forms/action-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VersionBadge } from "@/components/ui/version-badge";

export const metadata = { title: "Nutzer bearbeiten" };

const SELECT_CLS =
  "flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";
const ROLE_KEYS = ["SUPERADMIN", "COMPANY_ADMIN", "TRAINER", "PARTICIPANT"] as const;

/** Superadmin: einzelnen Nutzer bearbeiten (Rolle, Status, Name, E-Mail). Keine Mandanten-Verschiebung. */
export default async function AdminUserEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await requireRole("SUPERADMIN");
  const t = getT(admin.locale);

  const target = await prisma.user.findUnique({
    where: { id },
    include: { company: { select: { name: true } } },
  });
  if (!target) notFound();

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.editUser")}</h1>
        <VersionBadge feature="superadmin-verwaltung" />
        <Link href="/admin/users" className="text-sm text-brand-700 hover:underline dark:text-accent-400">
          {t("common.back")}
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {target.firstName} {target.lastName} · {target.company?.name ?? "—"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ActionForm
            action={updateUserAsSuperadmin}
            submitLabel={t("common.save")}
            successMessage={t("admin.saveDone")}
            successRedirect="/admin/users"
            errorMap={buildErrorMap(admin.locale)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <input type="hidden" name="userId" value={target.id} />
            <div>
              <Label htmlFor="u-fn">{t("auth.firstName")}</Label>
              <Input id="u-fn" name="firstName" defaultValue={target.firstName} required />
            </div>
            <div>
              <Label htmlFor="u-ln">{t("auth.lastName")}</Label>
              <Input id="u-ln" name="lastName" defaultValue={target.lastName} required />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="u-em">{t("common.email")}</Label>
              <Input id="u-em" name="email" type="email" defaultValue={target.email} required />
            </div>
            <div>
              <Label htmlFor="u-role">{t("common.role")}</Label>
              <select id="u-role" name="role" defaultValue={target.role} className={SELECT_CLS}>
                {ROLE_KEYS.map((r) => (
                  <option key={r} value={r}>{t(`roles.${r}`)}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="u-status">{t("common.status")}</Label>
              <select id="u-status" name="status" defaultValue={target.status} className={SELECT_CLS}>
                <option value="ACTIVE">{t("common.active")}</option>
                <option value="INACTIVE">{t("common.inactive")}</option>
              </select>
            </div>
          </ActionForm>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{t("admin.editUserNote")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
