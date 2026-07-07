import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/roles";
import { assertCompanyScope, companyWhere, type SessionUser } from "@/lib/tenancy";

export { assertCompanyScope, companyWhere };
export type { SessionUser };

/** Session holen oder auf /login umleiten. */
export async function requireUser(): Promise<SessionUser> {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  return session.user as SessionUser;
}

/** Session mit Rollenprüfung — leitet bei fehlender Berechtigung auf /dashboard um. */
export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) redirect("/dashboard");
  return user;
}
