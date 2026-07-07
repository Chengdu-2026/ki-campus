import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getCompanyProgress } from "@/lib/company-data";
import { getT } from "@/lib/i18n";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Unternehmen" };

export default async function CompanyPage() {
  const user = await requireRole("COMPANY_ADMIN", "SUPERADMIN", "TRAINER");
  const t = getT(user.locale);
  if (!user.companyId) return null;

  const company = await prisma.company.findUnique({
    where: { id: user.companyId },
    include: { plan: true, _count: { select: { users: { where: { status: "ACTIVE", role: "PARTICIPANT" } } } } },
  });
  if (!company) return null;
  const members = await getCompanyProgress(company.id);

  const passed = members.filter((m) => m.passed).length;
  const inProgress = members.filter((m) => !m.passed && m.progressPercent > 0).length;
  const notStarted = members.filter((m) => m.progressPercent === 0).length;
  const retraining = members.filter((m) => m.needsRetraining).length;

  const seats = company.plan.maxParticipants
    ? t("company.seatsUsed", { used: company._count.users, limit: company.plan.maxParticipants })
    : t("company.seatsUnlimited", { used: company._count.users });

  const stats = [
    { label: t("company.examPassed"), value: passed, variant: "success" as const },
    { label: t("company.inProgress"), value: inProgress, variant: "accent" as const },
    { label: t("company.notStarted"), value: notStarted, variant: "neutral" as const },
    { label: t("company.retrainingNeeded"), value: retraining, variant: "warning" as const },
  ];

  const links = [
    { href: "/company/users", label: t("company.usersTitle") },
    { href: "/company/invitations", label: t("nav.companyInvitations") },
    { href: "/company/progress", label: t("company.progressTitle") },
    { href: "/company/certificates", label: t("company.certificatesTitle") },
    { href: "/company/export", label: t("company.exportTitle") },
    { href: "/company/qm", label: t("qm.title") },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{company.name}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {company.plan.name} · {seats}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2"><CardDescription>{s.label}</CardDescription></CardHeader>
            <CardContent className="flex items-center gap-3">
              <p className="text-3xl font-bold text-brand-900 dark:text-white">{s.value}</p>
              <Badge variant={s.variant}>{s.label}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-xl border border-slate-200 bg-white p-4 text-center font-medium text-brand-900 transition-colors hover:border-accent-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
