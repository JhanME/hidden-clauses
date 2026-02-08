"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Cloud, Laptop } from "lucide-react";

import GitHubStars from "@/components/GitHubStars";
import ThemeToggle from "@/components/ThemeToggle";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";

const taglines = [
  "Lee lo que nadie lee. Protege lo que todos firman.",
  "Las letras pequeñas ya no serán invisibles.",
  "Descubre lo que esconden los contratos antes de firmar.",
  "Letras pequeñas, grandes consecuencias. Conócelas aquí.",
  "Lo que está en letra pequeña… lo ponemos en grande.",
  "No firmes a ciegas. Descifra la letra pequeña.",
  "Cláusulas ocultas al descubierto.",
  "Porque lo pequeño también cuenta (y mucho).",
  "Lee entre líneas. Evita sorpresas.",
  "Tu defensa contra las letras pequeñas.",
];
export default function LandingPage() {

  const tagline = useMemo(
    () => taglines[Math.floor(Math.random() * taglines.length)],
    []
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-[#0a0a0a] dark:text-white overflow-hidden">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 z-0" />
      {/* Radial gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.06)_0%,_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.08)_0%,_transparent_60%)]" />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between border-b border-zinc-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-[#0a0a0a]/80 md:px-10">
        <div className="flex items-center">
          <span className="text-lg font-bold tracking-tight">Hidden Clauses</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/JhanME/hidden-clauses"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            <GitHubStars />
          </a>

        </div>
      </nav>
      {/* Hero Section */}
      <main className="relative z-10 w-full flex-col items-center justify-center pt-32 pb-16">
        <div className="flex flex-col items-center px-6 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/50 px-4 py-1.5 text-sm font-medium text-zinc-600 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Built in Gemini 3 Hackathon
          </div>

          {/* Title */}
          <h1 className="mb-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-7xl">
            Analiza <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300">Contratos</span> <br className="hidden md:block" /> Inteligentemente
          </h1>

          {/* Subtitle */}
          <p suppressHydrationWarning className="mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
            {tagline}
          </p>

          {/* Action Cards */}
          <div className="flex w-full max-w-3xl flex-col gap-6 sm:flex-row mb-20">
            {/* Analyze Card */}
            <Link
              href="/analyze"
              className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-lg transition-all hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-cyan-500/50 dark:hover:shadow-cyan-500/10"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20 dark:bg-cyan-500/10 dark:group-hover:bg-cyan-500/20" />

              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">Analizar contrato</h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">Detecta cláusulas ocultas, riesgos y oportunidades en segundos.</p>
            </Link>

            {/* Compare Card */}
            <Link
              href="/compare"
              className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 text-left shadow-lg transition-all hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-cyan-500/50 dark:hover:shadow-cyan-500/10"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-blue-500/20 dark:bg-cyan-500/10 dark:group-hover:bg-cyan-500/20" />

              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>

              <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">Comparar contratos</h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">Sube dos versiones y encuentra las diferencias críticas.</p>
            </Link>
          </div>
        </div>

        <FeaturesSection />
        <HowItWorks />
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center gap-4 border-t border-zinc-200 bg-white/80 px-6 py-10 text-center text-base text-zinc-500 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-[#0a0a0a]/80 dark:text-zinc-600">
        <div>Powered by</div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/AndresRJ18" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
            <Cloud size={18} /> Andres
          </a>
          <a href="https://github.com/sebastianherrera77" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
            <Laptop size={18} /> Wilmer
          </a>
          <a href="https://github.com/JhanME" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
            <Laptop size={18} /> Jhan
          </a>
        </div>
        <div className="text-sm">© 2026 Hidden Clauses. MIT License.</div>
      </footer>
    </div>
  );
}
