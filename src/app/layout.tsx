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
  openGraph: {
    images: ["/opengraph-image.png"],
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
