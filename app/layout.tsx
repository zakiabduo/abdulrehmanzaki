import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { profile } from "@/data/content";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const desc = `${profile.name} is an AI/ML trainee, MERN full-stack developer and UX/UI designer.`;
export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} – AI/ML & Full-Stack Developer`, template: `%s | ${profile.name}` },
  description: desc,
  icons: { icon: "/icon.png" },
  openGraph: { title: profile.name, description: desc, type: "website", url: profile.siteUrl },
  twitter: { card: "summary_large_image", title: profile.name, description: desc },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: profile.roles[0], url: profile.siteUrl, sameAs: [profile.linkedin] };
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
