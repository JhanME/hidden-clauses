"use client";

import { useMemo } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

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

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const tagline = useMemo(
    () => taglines[Math.floor(Math.random() * taglines.length)],
    []
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Dot grid background */}
      <div className="dot-grid absolute inset-0 z-0" />

      {/* Radial gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.08)_0%,_transparent_60%)]" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="Hidden Clauses" width={36} height={36} priority />
          <span className="text-lg font-bold tracking-tight">Hidden Clauses</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            Analizar
          </a>
          <a href="#how" className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
            Tutoriales
          </a>
          <a href="#about" className="flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
            Ranking
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/JhanME/hidden-clauses"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            GitHub
          </a>
          <button
            onClick={onStart}
            className="rounded-lg bg-cyan-400 px-4 py-1.5 text-sm font-semibold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Comenzar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-12">
        {/* Icon badge */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-lg shadow-cyan-500/5">
          <svg className="h-8 w-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mb-5 max-w-3xl text-center text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Analiza <span className="text-cyan-400">Contratos</span> Inteligentemente
        </h1>

        {/* Subtitle — random tagline */}
        <p className="mb-12 max-w-xl text-center text-lg leading-relaxed text-zinc-400">
          {tagline}
        </p>

        {/* Simulated code editor */}
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#111111] shadow-2xl shadow-cyan-500/5">
            {/* Editor titlebar */}
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-zinc-500">contrato_analisis.ts</span>
            </div>

            {/* Code block */}
            <div className="p-5 font-mono text-sm leading-7">
              <div>
                <span className="text-zinc-500">1 </span>
                <span className="text-blue-400">import</span>
                <span className="text-zinc-300"> {"{"} </span>
                <span className="text-cyan-400">analizarContrato</span>
                <span className="text-zinc-300"> {"}"} </span>
                <span className="text-blue-400">from</span>
                <span className="text-emerald-400"> &quot;hidden-clauses&quot;</span>
                <span className="text-zinc-500">;</span>
              </div>
              <div className="mt-1">
                <span className="text-zinc-500">2</span>
              </div>
              <div>
                <span className="text-zinc-500">3 </span>
                <span className="text-blue-400">const</span>
                <span className="text-zinc-300"> resultado </span>
                <span className="text-blue-400">=</span>
                <span className="text-blue-400"> await</span>
                <span className="text-cyan-400"> analizarContrato</span>
                <span className="text-zinc-300">(</span>
                <span className="text-emerald-400">&quot;contrato.pdf&quot;</span>
                <span className="text-zinc-300">);</span>
              </div>
              <div className="mt-1">
                <span className="text-zinc-500">4</span>
              </div>
              <div>
                <span className="text-zinc-500">5 </span>
                <span className="text-zinc-500">{"// "}Detecta cláusulas ocultas al instante</span>
              </div>
              <div>
                <span className="text-zinc-500">6 </span>
                <span className="text-zinc-300">resultado.</span>
                <span className="text-cyan-400">clausulas</span>
                <span className="text-zinc-300">.</span>
                <span className="text-cyan-400">forEach</span>
                <span className="text-zinc-300">((</span>
                <span className="text-orange-300">c</span>
                <span className="text-zinc-300">) </span>
                <span className="text-blue-400">=&gt;</span>
                <span className="text-zinc-300"> {"{"}</span>
              </div>
              <div>
                <span className="text-zinc-500">7 </span>
                <span className="text-zinc-300">  </span>
                <span className="text-blue-400">if</span>
                <span className="text-zinc-300"> (</span>
                <span className="text-orange-300">c</span>
                <span className="text-zinc-300">.severidad </span>
                <span className="text-blue-400">===</span>
                <span className="text-emerald-400"> &quot;harmful&quot;</span>
                <span className="text-zinc-300">)</span>
              </div>
              <div>
                <span className="text-zinc-500">8 </span>
                <span className="text-zinc-300">    console.</span>
                <span className="text-cyan-400">warn</span>
                <span className="text-zinc-300">(</span>
                <span className="text-emerald-400">&quot;Cuidado:&quot;</span>
                <span className="text-zinc-300">, </span>
                <span className="text-orange-300">c</span>
                <span className="text-zinc-300">.titulo);</span>
              </div>
              <div>
                <span className="text-zinc-500">9 </span>
                <span className="text-zinc-300">{"}"});</span>
              </div>
            </div>

            {/* Floating CTA inside editor */}
            <div className="flex justify-center border-t border-zinc-800 px-5 py-4">
              <button
                onClick={onStart}
                className="rounded-lg bg-cyan-400 px-6 py-2.5 text-sm font-bold text-black transition-all hover:bg-cyan-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
              >
                Comenzar ahora
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Features section */}
      <section id="features" className="relative z-10 border-t border-zinc-800/50 bg-[#0a0a0a] px-6 py-20 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10">
              <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            </div>
            <h3 className="mb-2 text-base font-semibold text-white">Análisis Instantáneo</h3>
            <p className="text-sm leading-relaxed text-zinc-400">Sube tu PDF y obtén un desglose completo de cada cláusula en segundos gracias a la IA de Gemini.</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10">
              <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15.75h.007v.008H12v-.008z" /></svg>
            </div>
            <h3 className="mb-2 text-base font-semibold text-white">Detecta lo Oculto</h3>
            <p className="text-sm leading-relaxed text-zinc-400">Identifica cláusulas abusivas, penalizaciones escondidas y términos desfavorables que pasan desapercibidos.</p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10">
              <svg className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            </div>
            <h3 className="mb-2 text-base font-semibold text-white">Veredicto Claro</h3>
            <p className="text-sm leading-relaxed text-zinc-400">Recibe un veredicto visual: verde si el contrato es seguro, rojo si contiene cláusulas perjudiciales.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800/50 px-6 py-6 text-center text-xs text-zinc-600">
        Hidden Clauses &mdash; Analiza contratos con inteligencia artificial.
      </footer>
    </div>
  );
}
