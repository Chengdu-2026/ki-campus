"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { LEAD_TOPIC_KEYS } from "@/lib/leads";

const leadSchema = z.object({
  topics: z.array(z.enum(LEAD_TOPIC_KEYS)).max(LEAD_TOPIC_KEYS.length),
  message: z.string().trim().max(2000).optional(),
  name: z.string().trim().max(200).optional(),
  email: z.string().trim().max(320).optional(),
  company: z.string().trim().max(200).optional(),
  consent: z.boolean(),
});

/**
 * Öffentliche Themenwunsch-Abgabe (Leadmaschine, /themen).
 * Kein Login nötig. Honeypot-Feld "website" gegen einfache Bots.
 * Kontakt ist optional; E-Mail nur mit Einwilligung.
 */
export async function submitInterestLead(formData: FormData): Promise<void> {
  // Honeypot: echte Nutzer sehen das Feld nicht — Bots füllen es aus.
  const honeypot = String(formData.get("website") ?? "");
  if (honeypot.length > 0) {
    // Still schlucken (kein Fehler an den Bot verraten).
    redirect("/themen?ok=1");
  }

  const parsed = leadSchema.safeParse({
    topics: formData.getAll("topics").map(String).filter((t): t is (typeof LEAD_TOPIC_KEYS)[number] =>
      (LEAD_TOPIC_KEYS as readonly string[]).includes(t)
    ),
    message: String(formData.get("message") ?? "") || undefined,
    name: String(formData.get("name") ?? "") || undefined,
    email: String(formData.get("email") ?? "") || undefined,
    company: String(formData.get("company") ?? "") || undefined,
    consent: formData.get("consent") === "on",
  });
  if (!parsed.success) redirect("/themen?error=input");
  const data = parsed.data;

  // Mindestens ein Thema ODER Freitext.
  if (data.topics.length === 0 && !data.message) redirect("/themen?error=input");

  // E-Mail nur mit Einwilligung und plausiblem Format.
  if (data.email) {
    const emailOk = z.string().email().safeParse(data.email).success;
    if (!emailOk) redirect("/themen?error=email");
    if (!data.consent) redirect("/themen?error=consent");
  }

  await prisma.interestLead.create({
    data: {
      topics: JSON.stringify(data.topics),
      message: data.message ?? null,
      // Kontaktdaten nur speichern, wenn Einwilligung vorliegt (Datensparsamkeit).
      email: data.consent ? (data.email ?? null) : null,
      name: data.consent ? (data.name ?? null) : null,
      company: data.consent ? (data.company ?? null) : null,
      consent: data.consent && !!data.email,
      source: "themen",
    },
  });

  redirect("/themen?ok=1");
}
