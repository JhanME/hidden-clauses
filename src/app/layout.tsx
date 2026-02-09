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
    template: "%s | Hidden Clauses",
  },
  description: "Upload a PDF contract and get AI-powered analysis of every clause, highlighting harmful or unfavorable terms.",
  openGraph: {
    title: "Hidden Clauses",
    description: "Upload a PDF contract and get AI-powered analysis of every clause, highlighting harmful or unfavorable terms.",
    url: siteUrl,
    siteName: "Hidden Clauses",
    images: [
      {
        url: `${siteUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Hidden Clauses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hidden Clauses",
    description: "Upload a PDF contract and get AI-powered analysis of every clause, highlighting harmful or unfavorable terms.",
    images: [`${siteUrl}/opengraph-image.png`],
  },
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