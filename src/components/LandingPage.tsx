"use client";

import { useMemo, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Cloud, Laptop } from "lucide-react";
import { SignInButton, useAuth } from "@clerk/nextjs";
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

interface MousePosition {
  x: number;
  y: number;
}

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const tagline = useMemo(
    () => taglines[Math.floor(Math.random() * taglines.length)],
    []
  );
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative flex min-h-screen flex-col bg-[#0f0f1e] text-[#f0f0f5] overflow-hidden"
    >
      {/* Interactive gradient background */}
      <div className="absolute inset-0 z-0 interactive-bg" />
      
      {/* Mouse-following glow effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(0, 217, 255, 0.05), transparent 80%)`,
          opacity: 0.3,
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between border-b border-[#2d2d4a] bg-[#0f0f1e]/80 px-6 py-4 backdrop-blur-md md:px-10">
        <div className="flex items-center">
          <span className="text-lg font-bold tracking-tight text-[#00d9ff]">Hidden Clauses</span>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://github.com/JhanME/hidden-clauses"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[#2d2d4a] px-3 py-1.5 text-sm text-[#00d9ff] transition-all hover:border-[#00d9ff] hover:bg-[#1a1a2e] hover:text-[#f0f0f5]"
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
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#2d2d4a] bg-[#1a1a2e]/50 px-4 py-1.5 text-sm font-medium text-[#00d9ff] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00d9ff] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00d9ff]"></span>
            </span>
            Built in Gemini 3 Hackathon
          </div>

          {/* Title */}
          <h1 className="mb-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-[#f0f0f5] md:text-7xl">
            Analiza <span className="bg-gradient-to-r from-[#00d9ff] to-[#1e6d9e] bg-clip-text text-transparent">Contratos</span> <br className="hidden md:block" /> Inteligentemente
          </h1>

          {/* Subtitle */}
          <p suppressHydrationWarning className="mb-10 max-w-2xl text-lg text-[#b0b0c0] md:text-xl">
            {tagline}
          </p>

          {/* Action Cards */}
          <div className="flex w-full max-w-3xl flex-col gap-6 sm:flex-row mb-20">
            {/* Analyze Card */}
            {isLoaded && !isSignedIn ? (
              <SignInButton mode="modal" forceRedirectUrl="/analyze">
                <button className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#2d2d4a] bg-[#1a1a2e]/50 p-8 text-left shadow-lg backdrop-blur-sm transition-all hover:border-[#00d9ff] hover:bg-[#1a1a2e]/80 hover:shadow-lg hover:shadow-[#00d9ff]/20">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#00d9ff]/10 blur-2xl transition-all group-hover:bg-[#00d9ff]/20" />

                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e6d9e]/30 text-[#00d9ff]">
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-[#f0f0f5] group-hover:text-[#00d9ff] transition-colors">Analizar contrato</h3>
                  <p className="text-sm leading-relaxed text-[#b0b0c0]">Detecta cláusulas ocultas, riesgos y oportunidades en segundos.</p>
                </button>
              </SignInButton>
            ) : (
              <Link
                href="/analyze"
                className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#2d2d4a] bg-[#1a1a2e]/50 p-8 text-left shadow-lg backdrop-blur-sm transition-all hover:border-[#00d9ff] hover:bg-[#1a1a2e]/80 hover:shadow-lg hover:shadow-[#00d9ff]/20"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#00d9ff]/10 blur-2xl transition-all group-hover:bg-[#00d9ff]/20" />

                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e6d9e]/30 text-[#00d9ff]">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <h3 className="mb-2 text-xl font-bold text-[#f0f0f5] group-hover:text-[#00d9ff] transition-colors">Analizar contrato</h3>
                <p className="text-sm leading-relaxed text-[#b0b0c0]">Detecta cláusulas ocultas, riesgos y oportunidades en segundos.</p>
              </Link>
            )}

            {/* Compare Card */}
            {isLoaded && !isSignedIn ? (
              <SignInButton mode="modal" forceRedirectUrl="/compare">
                <button className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#2d2d4a] bg-[#1a1a2e]/50 p-8 text-left shadow-lg backdrop-blur-sm transition-all hover:border-[#00d9ff] hover:bg-[#1a1a2e]/80 hover:shadow-lg hover:shadow-[#00d9ff]/20">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#00d9ff]/10 blur-2xl transition-all group-hover:bg-[#00d9ff]/20" />

                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e6d9e]/30 text-[#00d9ff]">
                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-[#f0f0f5] group-hover:text-[#00d9ff] transition-colors">Comparar contratos</h3>
                  <p className="text-sm leading-relaxed text-[#b0b0c0]">Sube dos versiones y encuentra las diferencias críticas.</p>
                </button>
              </SignInButton>
            ) : (
              <Link
                href="/compare"
                className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#2d2d4a] bg-[#1a1a2e]/50 p-8 text-left shadow-lg backdrop-blur-sm transition-all hover:border-[#00d9ff] hover:bg-[#1a1a2e]/80 hover:shadow-lg hover:shadow-[#00d9ff]/20"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-[#00d9ff]/10 blur-2xl transition-all group-hover:bg-[#00d9ff]/20" />

                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1e6d9e]/30 text-[#00d9ff]">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>

                <h3 className="mb-2 text-xl font-bold text-[#f0f0f5] group-hover:text-[#00d9ff] transition-colors">Comparar contratos</h3>
                <p className="text-sm leading-relaxed text-[#b0b0c0]">Sube dos versiones y encuentra las diferencias críticas.</p>
              </Link>
            )}
          </div>
        </div>

        <FeaturesSection />
        <HowItWorks />
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-col items-center gap-4 border-t border-[#2d2d4a] bg-[#0f0f1e]/80 px-6 py-10 text-center text-base text-[#b0b0c0] backdrop-blur-sm">
        <div>Powered by</div>
        <div className="flex items-center gap-6">
          <a href="https://github.com/AndresRJ18" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00d9ff] transition-colors">
            <Cloud size={18} /> Andres
          </a>
          <a href="https://github.com/sebastianherrera77" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00d9ff] transition-colors">
            <Laptop size={18} /> Wilmer
          </a>
          <a href="https://github.com/JhanME" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#00d9ff] transition-colors">
            <Laptop size={18} /> Jhan
          </a>
        </div>
        <div className="text-sm">© 2026 Hidden Clauses. MIT License.</div>
      </footer>
    </div>
  );
}
