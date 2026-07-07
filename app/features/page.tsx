import { getT } from "@/lib/i18n";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, ClipboardCheck, Award, QrCode, Users, FileSpreadsheet, Moon, ShieldCheck, RefreshCw } from "lucide-react";
import { optionalImage } from "@/lib/assets";

export const metadata = { title: "Funktionen" };

const FEATURES = [
  { icon: BookOpen, title: "3 Kurse, 37 fertige Lernmodule", text: "Grundschulung für alle (17 Module), Aufbaukurs für KI-Verantwortliche (10) und Praxiskurs Richtig Prompten (10) — mit Praxisbeispielen aus dem Büroalltag, Merksätzen und Mini-Checks." },
  { icon: ClipboardCheck, title: "Abschlusstest mit Fragenpool", text: "Über 300 Fragen in 30 Themenkategorien, zufällige Auswahl je Test, eigener Test je Kurs, konfigurierbare Bestehensgrenze (Standard 75 %) und Wiederholungsversuche." },
  { icon: RefreshCw, title: "Adaptive Nachschulung", text: "Falsche Antworten werden Themen zugeordnet. Teilnehmende sehen genau, welche Module sie wiederholen sollten — inklusive Übungsmodus." },
  { icon: Award, title: "Automatisches Zertifikat", text: "Nach bestandenem Test wird sofort ein hochwertiges A4-PDF erstellt: privater Schulungs- und Kompetenznachweis mit eindeutiger Nummer." },
  { icon: QrCode, title: "QR-Verifikation", text: "Jedes Zertifikat trägt einen QR-Code zur öffentlichen Prüfseite — datensparsam und ohne Login prüfbar." },
  { icon: Users, title: "Team-Verwaltung", text: "Mitarbeitende per E-Mail-Link oder Registrierungscode einladen, Fortschritt verfolgen, Erinnerungen senden, Nachschulungen zuweisen." },
  { icon: FileSpreadsheet, title: "CSV-Export & Nachweisliste", text: "Dokumentation für Personalakte und interne Compliance: wer wurde wann geschult, mit welchem Ergebnis, mit welchem Zertifikat." },
  { icon: ShieldCheck, title: "Mandantentrennung & Audit-Log", text: "Strikte Trennung zwischen Unternehmen, rollenbasierte Rechte und Protokollierung administrativer Aktionen." },
  { icon: Moon, title: "Hell-/Dunkelmodus & Mobile", text: "Vollständiger Dark Mode, responsives Design — die Schulung funktioniert am Handy genauso gut wie am Desktop." },
];

export default function FeaturesPage() {
  const t = getT();
  const certificateImage = optionalImage("images/certificate.jpg");
  return (
    <div className="py-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-brand-900 dark:text-white">{t("nav.features")}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 h-7 w-7 text-accent-500" aria-hidden="true" />
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      {certificateImage && (
        <section className="mx-auto mt-10 max-w-4xl">
          <img
            src={certificateImage}
            alt="Illustration: bestandener Abschlusstest mit Zertifikatsansicht (KI-generiertes Bild)"
            className="w-full rounded-2xl border border-slate-200 shadow-sm dark:border-slate-700"
          />
        </section>
      )}
      <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">{t("footer.disclaimerShort")}</p>
    </div>
  );
}
