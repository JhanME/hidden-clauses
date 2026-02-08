import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";

import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hidden Clauses",
  description: "Upload a PDF contract and get AI-powered analysis of every clause, highlighting harmful or unfavorable terms.",
  metadataBase: new URL("https://www.hiddenclauses.org"),
  openGraph: {
    title: "Hidden Clauses",
    description: "Upload a PDF contract and get AI-powered analysis of every clause, highlighting harmful or unfavorable terms.",
    url: "https://www.hiddenclauses.org",
    siteName: "Hidden Clauses",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Hidden Clauses Check",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
