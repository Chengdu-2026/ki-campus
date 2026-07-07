import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { TestAccessBanner } from "@/components/layout/test-access-banner";
import { Footer } from "@/components/layout/footer";
import { appConfig } from "@/config/app";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${appConfig.appName} — KI-Kompetenz nach Art. 4 EU AI Act`,
    template: `%s | ${appConfig.appName}`,
  },
  description:
    "B2B-Schulungsplattform: KI-Kompetenz schulen, testen und dokumentieren. Privater Schulungsnachweis nach Art. 4 EU AI Act für Unternehmen in Österreich und der EU — keine behördliche Zertifizierung.",
  keywords: [
    "KI-Kompetenz", "AI Literacy", "Art. 4 EU AI Act", "KI-Schulung",
    "Schulungsnachweis", "EU AI Act Schulung", "KI-Kompetenznachweis",
    "Mitarbeiterschulung KI", "Österreich", "KMU",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_AT",
    siteName: appConfig.appName,
    title: `${appConfig.appName} — KI-Kompetenz nach Art. 4 EU AI Act`,
    description:
      "Lernmodule, Abschlusstest, verifizierbares Zertifikat und Nachweisliste — unterstützt die Dokumentation der KI-Kompetenzpflicht nach Art. 4 EU AI Act.",
    images: [{ url: "/images/hero.jpg", width: 1672, height: 941, alt: "KI-Kompetenz Campus — Schulungs-Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${appConfig.appName} — KI-Kompetenz nach Art. 4 EU AI Act`,
    description: "KI-Schulung mit Test, Zertifikat und QR-Verifikation. Privater Schulungsnachweis, keine behördliche Zertifizierung.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
  other: {
    "geo.region": appConfig.geo.region,
    "geo.placename": appConfig.geo.placename,
    "geo.position": `${appConfig.geo.latitude};${appConfig.geo.longitude}`,
    ICBM: `${appConfig.geo.latitude}, ${appConfig.geo.longitude}`,
  },
};

/** Organization-Strukturdaten (SEO/GEO): Betreiber + inhaltlich Verantwortlicher in Österreich. */
function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: appConfig.appName,
    legalName: appConfig.legalCompanyName,
    url: APP_URL,
    email: appConfig.contactEmail,
    description:
      "Private B2B-Schulungsplattform für KI-Kompetenz nach Art. 4 EU AI Act: Lernmodule, Abschlusstest, privater Schulungs- und Kompetenznachweis mit QR-Verifikation.",
    founder: {
      "@type": "Person",
      name: appConfig.contentResponsiblePerson,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Schulterzucker 2",
        postalCode: "4742",
        addressLocality: "Pram",
        addressRegion: "Oberösterreich",
        addressCountry: "AT",
      },
    },
    areaServed: ["AT", "DE", "EU"],
    knowsAbout: ["KI-Kompetenz", "AI Literacy", "EU AI Act", "Art. 4 Verordnung (EU) 2024/1689"],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={appConfig.defaultLocale} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <ThemeProvider>
          <Header />
          <TestAccessBanner />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
