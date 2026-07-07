/**
 * Content-Audit: Quellen-Registry + Scan.
 * Erfasst alle prüfpflichtigen Blöcke (DB-Inhalte + importierbare Git-Inhalte
 * + Assets) und synchronisiert sie mit ContentAuditItem:
 * - neuer Block  -> Item mit NEEDS_REVIEW
 * - Hash geändert -> NEEDS_REVIEW, Freigabe verfällt sichtbar, version++
 * - unverändert  -> unangetastet
 * Coverage-Prinzip: was die Registry kennt, kann nicht "vergessen" werden.
 */
import { readdirSync, readFileSync, existsSync } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { audit } from "@/lib/audit";
import { moduleDetailsDe } from "@/lib/module-details.de";
import { de } from "@/lib/i18n";
import { contentHash, scanForRiskWords, riskLevelForHits, type RiskHit } from "./logic";

export interface ScanSource {
  entityType: string;
  entityId: string;
  blockKey: string;
  entitySlug?: string;
  title: string;
  locale: string;
  content: string;
  source: string;
  aiGenerated: boolean;
  requiresOwnerApproval: boolean;
}

/** Kritische Inhalte laut ROADMAP §4.5: persönliche Owner-Freigabe Pflicht. */
function ownerRequired(entityType: string): boolean {
  return ["LEGAL_PAGE", "CERTIFICATE_TEMPLATE", "FEATURE_TEXT", "MARKETING_PAGE"].includes(entityType);
}

/** DB-Inhalte: Kurse, Module, Lektionen (je didaktisches Feld), Fragen. */
async function dbSources(): Promise<ScanSource[]> {
  const sources: ScanSource[] = [];

  const courses = await prisma.course.findMany({
    where: { archivedAt: null },
    include: { translations: true, modules: { include: { translations: true, lessons: { include: { translations: true, miniChecks: { include: { translations: true } } } } } } },
  });

  for (const course of courses) {
    const ct = course.translations.find((t) => t.locale === "de");
    if (ct) {
      sources.push({
        entityType: "COURSE", entityId: course.id, blockKey: `course:${course.slug}#meta`,
        entitySlug: course.slug, title: ct.title, locale: "de",
        content: [ct.title, ct.subtitle, ct.description].filter(Boolean).join("\n"),
        source: "AI_ASSISTED", aiGenerated: true, requiresOwnerApproval: false,
      });
    }
    for (const mod of course.modules) {
      const mt = mod.translations.find((t) => t.locale === "de");
      if (mt) {
        sources.push({
          entityType: "MODULE", entityId: mod.id, blockKey: `module:${mod.slug}#meta`,
          entitySlug: mod.slug, title: mt.title, locale: "de",
          content: [mt.title, mt.description].filter(Boolean).join("\n"),
          source: "AI_ASSISTED", aiGenerated: true, requiresOwnerApproval: false,
        });
      }
      for (const lesson of mod.lessons) {
        const lt = lesson.translations.find((t) => t.locale === "de");
        if (!lt) continue;
        const fields: Array<[string, string | null]> = [
          ["goal", lt.goal], ["content", lt.content], ["example", lt.example],
          ["risk", lt.risk], ["memo", lt.memo],
        ];
        for (const [field, value] of fields) {
          if (!value) continue;
          sources.push({
            entityType: "LESSON", entityId: lesson.id, blockKey: `lesson:${lesson.slug}#${field}`,
            entitySlug: lesson.slug, title: `${lt.title} — ${field}`, locale: "de",
            content: value, source: "AI_ASSISTED", aiGenerated: true, requiresOwnerApproval: false,
          });
        }
        const checks = lesson.miniChecks
          .map((c) => c.translations.find((t) => t.locale === "de"))
          .filter(Boolean)
          .map((t) => `${t!.question}\n${t!.answer}`)
          .join("\n---\n");
        if (checks) {
          sources.push({
            entityType: "LESSON", entityId: lesson.id, blockKey: `lesson:${lesson.slug}#minichecks`,
            entitySlug: lesson.slug, title: `${lt.title} — Mini-Checks`, locale: "de",
            content: checks, source: "AI_ASSISTED", aiGenerated: true, requiresOwnerApproval: false,
          });
        }
      }
    }
  }

  const questions = await prisma.question.findMany({
    where: { active: true },
    include: { translations: true, options: { include: { translations: true }, orderBy: { order: "asc" } }, lesson: { select: { slug: true } } },
  });
  for (const q of questions) {
    const qt = q.translations.find((t) => t.locale === "de");
    if (!qt) continue;
    const options = q.options
      .map((o) => {
        const ot = o.translations.find((t) => t.locale === "de");
        return ot ? `${o.correct ? "[RICHTIG]" : "[FALSCH]"} ${ot.text}` : null;
      })
      .filter(Boolean)
      .join("\n");
    sources.push({
      entityType: "QUESTION", entityId: q.id, blockKey: `question:${q.id}`,
      entitySlug: q.lesson?.slug ?? undefined, title: qt.text.slice(0, 120), locale: "de",
      content: [qt.text, options, qt.explanation].filter(Boolean).join("\n"),
      source: "AI_ASSISTED", aiGenerated: true, requiresOwnerApproval: false,
    });
  }

  return sources;
}

/** Git-Inhalte, die als TS-Module importierbar sind (kein Datei-Parsing nötig). */
function gitSources(): ScanSource[] {
  const sources: ScanSource[] = [];

  // Öffentliche Modul-Detailtexte (Marketing-Schaufenster)
  for (const [slug, detail] of Object.entries(moduleDetailsDe)) {
    const content = [
      ...detail.intro,
      ...detail.examples.flatMap((e) => [e.situation, e.point]),
      detail.outcome,
    ].join("\n");
    sources.push({
      entityType: "MARKETING_PAGE", entityId: `module-detail:${slug}`, blockKey: `module-detail:${slug}`,
      entitySlug: slug, title: `Modul-Detailtext ${slug}`, locale: "de",
      content, source: "AI_ASSISTED", aiGenerated: true, requiresOwnerApproval: ownerRequired("MARKETING_PAGE"),
    });
  }

  // Zentrale i18n-Blöcke mit Außenwirkung (Auswahl laut ROADMAP §4.3)
  const dict = de as unknown as Record<string, unknown>;
  const i18nBlocks: Array<[string, string, unknown]> = [
    ["FEATURE_TEXT", "i18n:feature.review", dict["feature"]],
    ["MARKETING_PAGE", "i18n:themen", dict["themen"]],
    ["MARKETING_PAGE", "i18n:home", dict["home"]],
    ["MARKETING_PAGE", "i18n:pricing", dict["pricing"]],
    ["CERTIFICATE_TEMPLATE", "i18n:certificate", dict["certificate"]],
    ["MARKETING_PAGE", "i18n:muster", dict["muster"]],
    ["MARKETING_PAGE", "i18n:about", dict["about"]],
    // Phase-2-SEO-Seiten (V1.007)
    ["MARKETING_PAGE", "i18n:art4", dict["art4"]],
    ["MARKETING_PAGE", "i18n:fuehrerschein", dict["fuehrerschein"]],
    ["MARKETING_PAGE", "i18n:nachweis", dict["nachweis"]],
    ["MARKETING_PAGE", "i18n:chatgptLp", dict["chatgptLp"]],
    ["MARKETING_PAGE", "i18n:mitarbeiterLp", dict["mitarbeiterLp"]],
  ];
  for (const [entityType, key, value] of i18nBlocks) {
    if (!value) continue;
    sources.push({
      entityType, entityId: key, blockKey: key,
      title: key, locale: "de",
      content: JSON.stringify(value, null, 1),
      source: "AI_ASSISTED", aiGenerated: true, requiresOwnerApproval: ownerRequired(entityType),
    });
  }

  return sources;
}

/** Assets: Modulbilder — Hash über Dateiinhalt. */
function assetSources(): ScanSource[] {
  const sources: ScanSource[] = [];
  const dir = path.join(process.cwd(), "public", "modules");
  if (!existsSync(dir)) return sources;
  for (const file of readdirSync(dir)) {
    if (!/\.(png|jpe?g|webp|svg)$/i.test(file)) continue;
    const buf = readFileSync(path.join(dir, file));
    sources.push({
      entityType: "ASSET", entityId: `public/modules/${file}`, blockKey: `asset:modules/${file}`,
      entitySlug: file.replace(/\.[^.]+$/, ""), title: `Modulbild ${file}`, locale: "de",
      content: buf.toString("base64"),
      source: "AI_GENERATED", aiGenerated: true, requiresOwnerApproval: false,
    });
  }
  return sources;
}

export interface ScanResult {
  created: number;
  changed: number;
  unchanged: number;
  riskFlagged: number;
  total: number;
}

/** Scan ausführen und AuditItems synchronisieren (idempotent). */
export async function runContentAuditScan(actorUserId: string): Promise<ScanResult> {
  const sources = [...(await dbSources()), ...gitSources(), ...assetSources()];
  const result: ScanResult = { created: 0, changed: 0, unchanged: 0, riskFlagged: 0, total: sources.length };

  for (const src of sources) {
    const hash = contentHash(src.content);
    const isAsset = src.entityType === "ASSET";
    const hits: RiskHit[] = isAsset ? [] : scanForRiskWords(src.content);
    const risk = riskLevelForHits(hits, "LOW");
    if (hits.length > 0) result.riskFlagged++;
    // Bilder speichern wir nicht als Base64-Snapshot in der DB — nur Pfad + Hash.
    const snapshot = isAsset ? `[Bilddatei] ${src.entityId}` : src.content;

    const existing = await prisma.contentAuditItem.findUnique({
      where: {
        entityType_entityId_blockKey_locale: {
          entityType: src.entityType, entityId: src.entityId,
          blockKey: src.blockKey, locale: src.locale,
        },
      },
    });

    if (!existing) {
      await prisma.contentAuditItem.create({
        data: {
          entityType: src.entityType, entityId: src.entityId, blockKey: src.blockKey,
          entitySlug: src.entitySlug ?? null, title: src.title, locale: src.locale,
          source: src.source, status: "NEEDS_REVIEW", riskLevel: risk,
          requiresOwnerApproval: src.requiresOwnerApproval,
          contentHash: hash, currentContentSnapshot: snapshot,
          riskHits: hits.length ? JSON.stringify(hits) : null,
          aiGenerated: src.aiGenerated,
        },
      });
      result.created++;
      continue;
    }

    if (existing.contentHash === hash) {
      result.unchanged++;
      continue;
    }

    // Inhalt geändert: Freigabe verfällt sichtbar (approvedContentHash bleibt
    // als Beleg stehen, Status kippt), version++, AuditLog.
    await prisma.contentAuditItem.update({
      where: { id: existing.id },
      data: {
        previousContentSnapshot: existing.currentContentSnapshot,
        currentContentSnapshot: snapshot,
        contentHash: hash,
        version: existing.version + 1,
        status: existing.status === "ARCHIVED" ? "ARCHIVED" : "NEEDS_REVIEW",
        riskLevel: risk,
        riskHits: hits.length ? JSON.stringify(hits) : null,
        changeSummary: `Inhalt geändert (Scan): Hash ${existing.contentHash.slice(0, 12)}… → ${hash.slice(0, 12)}…`,
      },
    });
    await audit({
      action: "CONTENT_AUDIT_CHANGED",
      userId: actorUserId,
      entityType: "ContentAuditItem",
      entityId: existing.id,
      oldValue: { contentHash: existing.contentHash, status: existing.status },
      newValue: { contentHash: hash, status: "NEEDS_REVIEW" },
    });
    result.changed++;
  }

  return result;
}
