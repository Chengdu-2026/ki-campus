import { prisma } from "@/lib/prisma";
import { appConfig } from "@/config/app";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Impressum" };

export default async function ImprintPage() {
  const profile = await prisma.companyLegalProfile.findFirst();

  return (
    <article className="mx-auto max-w-3xl space-y-6 py-6">
      <h1 className="text-3xl font-bold text-brand-900 dark:text-white">Impressum</h1>

      <section className="space-y-1 text-slate-700 dark:text-slate-300">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {profile?.legalName ?? appConfig.legalCompanyName}
        </p>
        {profile?.chineseName && <p>{profile.chineseName}</p>}
        <p className="pt-2 whitespace-pre-line">{profile?.address}</p>
        <p>{profile?.country}</p>
      </section>

      <dl className="grid gap-x-8 gap-y-3 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
        {profile?.representativeName && (
          <div><dt className="font-medium text-slate-900 dark:text-slate-100">Juristische Person / Legal Representative</dt><dd>{profile.representativeName}</dd></div>
        )}
        {profile?.registrationNumber && (
          <div><dt className="font-medium text-slate-900 dark:text-slate-100">Einheitlicher Kreditcode</dt><dd>{profile.registrationNumber}</dd></div>
        )}
        {profile?.organisationCode && (
          <div><dt className="font-medium text-slate-900 dark:text-slate-100">Organisationscode</dt><dd>{profile.organisationCode}</dd></div>
        )}
        {profile?.registeredCapital && (
          <div><dt className="font-medium text-slate-900 dark:text-slate-100">Registriertes Kapital</dt><dd>{profile.registeredCapital}</dd></div>
        )}
        {profile?.foundingDate && (
          <div><dt className="font-medium text-slate-900 dark:text-slate-100">Gründungsdatum</dt><dd>{profile.foundingDate}</dd></div>
        )}
        {profile?.registrationAuthority && (
          <div><dt className="font-medium text-slate-900 dark:text-slate-100">Registrierungsbehörde</dt><dd>{profile.registrationAuthority}</dd></div>
        )}
        <div><dt className="font-medium text-slate-900 dark:text-slate-100">Kontakt</dt><dd>{profile?.email ?? appConfig.contactEmail}</dd></div>
        <div><dt className="font-medium text-slate-900 dark:text-slate-100">Website</dt><dd>{profile?.website ?? appConfig.websiteUrl}</dd></div>
      </dl>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <p className="font-medium text-slate-900 dark:text-slate-100">Inhaltlich geprüft und verantwortlich</p>
        <p className="mt-1">
          {appConfig.contentResponsiblePerson}<br />
          {appConfig.contentResponsibleAddress}<br />
          {appConfig.contactEmail}
        </p>
      </section>

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Für den Inhalt verantwortlich: {profile?.legalName ?? appConfig.legalCompanyName}, vertreten durch{" "}
        {profile?.representativeName ?? appConfig.contentResponsiblePerson}. Alle Angaben ohne Gewähr.
        {profile?.imprintSourceUrl && (
          <> Firmendaten übernommen aus dem Impressum von {profile.imprintSourceUrl}
          {profile.lastCheckedAt ? `, geprüft am ${formatDate(profile.lastCheckedAt)}` : ""}.</>
        )}
      </p>
    </article>
  );
}
