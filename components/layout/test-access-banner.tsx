import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getT } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

/** Warnbanner fuer Nutzer einer Testzugang-Firma. Rendert nichts fuer alle anderen. */
export async function TestAccessBanner() {
  const session = await auth();
  const companyId = session?.user?.companyId;
  if (!companyId) return null;

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { isTest: true, testExpiresAt: true },
  });
  if (!company?.isTest) return null;

  const t = getT(session?.user?.locale);
  const text = company.testExpiresAt
    ? t("company.testBannerUntil", { date: formatDate(company.testExpiresAt) })
    : t("company.testBanner");

  return (
    <div
      role="status"
      className="border-b border-amber-300 bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100"
    >
      {text}
    </div>
  );
}
