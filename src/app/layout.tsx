import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: 'swap',
});

// Configuramos la URL base. En producción usará tu dominio, 
// y en desarrollo evitará errores de metadatos.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith("http") ? process.env.NEXT_PUBLIC_SITE_URL : `https://${process.env.NEXT_PUBLIC_SITE_URL}`)
  : "https://www.hiddenclauses.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hidden Clauses",
    template: "%s | Hidden Clauses", // Esto permite que páginas internas tengan títulos como "Analizar | Hidden Clauses"
  },
  description: "Upload a PDF contract and get AI-powered analysis of every clause, highlighting harmful or unfavorable terms.",

  // OpenGraph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: "Hidden Clauses",
    description: "AI-powered contract analysis. Find harmful terms in seconds.",
    url: siteUrl,
    siteName: "Hidden Clauses",
    images: [
      {
        url: "/opengraph-image.png", // Next.js resolverá esto a https://www.hiddenclauses.org/opengraph-image.png
        width: 1200,
        height: 630,
        alt: "Hidden Clauses AI Analysis Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Hidden Clauses",
    description: "Don't sign before you scan. AI-powered contract analysis.",
    images: ["/opengraph-image.png"], // Reutiliza la misma imagen
  },

  // Extras útiles para SEO
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}