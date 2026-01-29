"use client";

import { useMemo } from "react";
import { Cloud, Laptop } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import GitHubStars from "@/components/GitHubStars";
import ThemeToggle from "@/components/ThemeToggle";
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
          <SignInButton mode="modal" forceRedirectUrl="/analyze">
            <button className="hidden md:flex rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] dark:bg-cyan-400 dark:text-black dark:hover:bg-cyan-300 dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              Comenzar
            </button>
          </SignInButton>
        </div>
      </nav>
      {/* Hero Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-24">
        {/* Icon badge */}
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 shadow-lg shadow-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900/80 dark:shadow-cyan-500/5">
          <svg className="h-8 w-8 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        {/* Title */}
        <h1 className="mb-5 max-w-3xl text-center text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          Analiza <span className="text-blue-600 dark:text-cyan-400">Contratos</span> Inteligentemente
        </h1>
        {/* Subtitle — random tagline */}
        <p suppressHydrationWarning className="mb-12 max-w-xl text-center text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
          {tagline}
        </p>
        {/* Simulated code editor */}
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-2xl shadow-blue-500/10 dark:shadow-cyan-500/5 dark:border-zinc-800 dark:bg-[#111111]">
            {/* Editor titlebar */}
            <div className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-zinc-500">contrato_analisis.ts</span>
            </div>
            {/* Code block */}
            <div className="p-5 font-mono text-sm leading-7">
              <div>
                <span className="text-zinc-500">1 </span>
                <span className="text-blue-700 dark:text-blue-400">import</span>
                <span className="text-zinc-800 dark:text-zinc-300"> {"{"} </span>
                <span className="text-blue-600 dark:text-cyan-400">analizarContrato</span>
                <span className="text-zinc-800 dark:text-zinc-300"> {"}"} </span>
                <span className="text-blue-700 dark:text-blue-400">from</span>
                <span className="text-emerald-700 dark:text-emerald-400"> &quot;hidden-clauses&quot;</span>
                <span className="text-zinc-500">;</span>
              </div>
              <div className="mt-1">
                <span className="text-zinc-500">2</span>
              </div>
              <div>
                <span className="text-zinc-500">3 </span>
                <span className="text-blue-700 dark:text-blue-400">const</span>
                <span className="text-zinc-800 dark:text-zinc-300"> resultado </span>
                <span className="text-blue-700 dark:text-blue-400">=</span>
                <span className="text-blue-700 dark:text-blue-400"> await</span>
                <span className="text-cyan-400"> analizarContrato</span>
                <span className="text-zinc-800 dark:text-zinc-300">(</span>
                <span className="text-emerald-700 dark:text-emerald-400">&quot;contrato.pdf&quot;</span>
                <span className="text-zinc-800 dark:text-zinc-300">);</span>
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
                <span className="text-zinc-800 dark:text-zinc-300">resultado.</span>
                <span className="text-blue-600 dark:text-cyan-400">clausulas</span>
                <span className="text-zinc-800 dark:text-zinc-300">.</span>
                <span className="text-blue-600 dark:text-cyan-400">forEach</span>
                <span className="text-zinc-800 dark:text-zinc-300">((</span>
                <span className="text-orange-600 dark:text-orange-300">c</span>
                <span className="text-zinc-800 dark:text-zinc-300">) </span>
                <span className="text-blue-700 dark:text-blue-400">=&gt;</span>
                <span className="text-zinc-800 dark:text-zinc-300"> {"{"}</span>
              </div>
              <div>
                <span className="text-zinc-500">7 </span>
                <span className="text-zinc-800 dark:text-zinc-300">  </span>
                <span className="text-blue-700 dark:text-blue-400">if</span>
                <span className="text-zinc-800 dark:text-zinc-300"> (</span>
                <span className="text-orange-600 dark:text-orange-300">c</span>
                <span className="text-zinc-800 dark:text-zinc-300">.severidad </span>
                <span className="text-blue-700 dark:text-blue-400">===</span>
                <span className="text-emerald-700 dark:text-emerald-400"> &quot;harmful&quot;</span>
                <span className="text-zinc-800 dark:text-zinc-300">)</span>
              </div>
              <div>
                <span className="text-zinc-500">8 </span>
                <span className="text-zinc-800 dark:text-zinc-300">    console.</span>
                <span className="text-blue-600 dark:text-cyan-400">warn</span>
                <span className="text-zinc-800 dark:text-zinc-300">(</span>
                <span className="text-emerald-700 dark:text-emerald-400">&quot;Cuidado:&quot;</span>
                <span className="text-zinc-800 dark:text-zinc-300">, </span>
                <span className="text-orange-600 dark:text-orange-300">c</span>
                <span className="text-zinc-800 dark:text-zinc-300">.titulo);</span>
              </div>
              <div>
                <span className="text-zinc-500">9 </span>
                <span className="text-zinc-800 dark:text-zinc-300">{"}"});</span>
              </div>
            </div>
            {/* Floating CTA inside editor */}
            <div className="flex justify-center border-t border-zinc-200 px-5 py-4 dark:border-zinc-800">
              <SignInButton mode="modal" forceRedirectUrl="/analyze">
                <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-[0_0_24px_rgba(37,99,235,0.4)] dark:bg-cyan-400 dark:text-black dark:hover:bg-cyan-300 dark:hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]">
                  Comenzar ahora
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center gap-4 border-t border-zinc-200 bg-white/80 px-6 py-10 text-center text-base text-zinc-500 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-[#0a0a0a]/80 dark:text-zinc-600">
        <div>Powered by</div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/AndresRJ18" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
            <Cloud size={20} /> Andres
          </a>
          <a href="https://github.com/sebastianherrera77" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
            <Laptop size={20} /> Wilmer
          </a>
          <a href="https://github.com/JhanME" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
            <Laptop size={20} /> Jhan
          </a>
        </div>
        <div>© 2026 todos los derechos reservados</div>
      </footer>
    </div>
  );
}
