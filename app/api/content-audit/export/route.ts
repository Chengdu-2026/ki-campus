import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { approvalIsCurrent } from "@/lib/content-audit/logic";

function csv(rows: string[][]): string {
  const esc = (v: string) => (/[";\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  return "﻿" + rows.map((r) => r.map(esc).join(";")).join("\n");
}

/** CSV-Export aller Content-Audit-Items (QM-Nachweis; nur Superadmin). */
export async function GET() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id || user.role !== "SUPERADMIN") {
    return NextResponse.json({ error: "Zugriff verweigert." }, { status: 403 });
  }

  const items = await prisma.contentAuditItem.findMany({ orderBy: [{ entityType: "asc" }, { updatedAt: "desc" }] });
  const userIds = [...new Set(items.flatMap((i) => [i.approvedById, i.ownerApprovedById]).filter((v): v is string => !!v))];
  const users = await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, firstName: true, lastName: true } });
  const nameOf = (id: string | null) => {
    const u = users.find((x) => x.id === id);
    return u ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() : "";
  };

  const rows: string[][] = [
    ["Status", "Risiko", "Typ", "BlockKey", "Titel", "Sprache", "Version", "Hash aktuell", "Quelle", "Freigegeben von", "Freigegeben am", "Owner-Freigabe von", "Owner-Freigabe am", "Letzte Änderung"],
    ...items.map((i) => [
      i.status, i.riskLevel, i.entityType, i.blockKey ?? "", i.title, i.locale, String(i.version),
      approvalIsCurrent(i) ? "ja" : i.approvedContentHash ? "nein (geändert)" : "nie freigegeben",
      i.source, nameOf(i.approvedById), i.approvedAt ? i.approvedAt.toISOString() : "",
      nameOf(i.ownerApprovedById), i.ownerApprovedAt ? i.ownerApprovedAt.toISOString() : "",
      i.updatedAt.toISOString(),
    ]),
  ];

  await audit({ action: "CONTENT_AUDIT_EXPORTED", userId: user.id, entityType: "ContentAuditItem", metadata: { count: items.length } });

  return new NextResponse(csv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="content-audit-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
