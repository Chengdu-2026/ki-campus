import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Administration" };

export default async function AdminPage() {
  const user = await requireRole("SUPERADMIN");
  const t = getT(user.locale);

  const [companies, participants, passedExams, certificates, activeCourses, openInvites, recent] = await Promise.all([
    prisma.company.count(),
    prisma.user.count({ where: { role: "PARTICIPANT", company: { isTest: false } } }),
    prisma.examAttempt.count({ where: { passed: true, user: { company: { isTest: false } } } }),
    prisma.certificate.count({ where: { company: { isTest: false } } }),
    prisma.course.count({ where: { archivedAt: null } }),
    prisma.invitation.count({ where: { acceptedAt: null, expiresAt: { gt: new Date() } } }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 10, include: { user: { select: { email: true } } } }),
  ]);

  const stats = [
    { label: t("admin.statCompanies"), value: companies, href: "/admin/companies" },
    { label: t("admin.statParticipants"), value: participants, href: "/admin/users" },
    { label: t("admin.statPassed"), value: passedExams, href: "/admin/exams" },
    { label: t("admin.statCertificates"), value: certificates, href: "/admin/certificates" },
    { label: t("admin.statCoursesActive"), value: activeCourses, href: "/admin/courses" },
    { label: t("admin.statInvitesOpen"), value: openInvites, href: "/admin/companies" },
  ];

  const nav = [
    { href: "/admin/companies", label: t("admin.companies") },
    { href: "/admin/users", label: t("admin.users") },
    { href: "/admin/courses", label: t("admin.coursesNav") },
    { href: "/admin/modules", label: t("admin.modules") },
    { href: "/admin/lessons", label: t("admin.lessons") },
    { href: "/admin/questions", label: t("admin.questions") },
    { href: "/admin/exams", label: t("admin.exams") },
    { href: "/admin/certificates", label: t("admin.certificates") },
    { href: "/admin/qm", label: t("qm.title") },
    { href: "/admin/content-audit", label: t("contentAudit.title") },
    { href: "/admin/leads", label: t("themen.admin.title") },
    { href: "/admin/audit-log", label: t("admin.auditLog") },
    { href: "/admin/settings", label: t("admin.settings") },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("admin.title")}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-colors hover:border-accent-500">
              <CardHeader className="pb-2"><CardDescription>{s.label}</CardDescription></CardHeader>
              <CardContent><p className="text-3xl font-bold text-brand-900 dark:text-white">{s.value}</p></CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <nav aria-label="Admin-Bereiche" className="flex flex-wrap gap-2">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">
            {item.label}
          </Link>
        ))}
      </nav>

      <Card>
        <CardHeader><CardTitle className="text-base">{t("admin.recentActivity")}</CardTitle></CardHeader>
        <CardContent>
          <ul className="divide-y divide-slate-100 text-sm dark:divide-slate-800">
            {recent.map((entry) => (
              <li key={entry.id} className="flex items-center justify-between gap-3 py-2">
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300">{entry.action}</span>
                <span className="text-slate-500">{entry.user?.email ?? "System"} · {formatDate(entry.createdAt)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
