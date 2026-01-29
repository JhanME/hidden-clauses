"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import PdfUploader from "@/components/PdfUploader";
import AnalysisPanel from "@/components/AnalysisPanel";
import ThemeToggle from "@/components/ThemeToggle";
import type { AnalysisResult } from "@/lib/types";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <p className="text-zinc-500">Cargando visor PDF...</p>
    </div>
  ),
});

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const analysis: AnalysisResult = await response.json();
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFile(null);
    setFileUrl(null);
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
  }, [fileUrl]);

  const glowClass = result
    ? result.verdict === "harmful"
      ? "glow-harmful"
      : "glow-safe"
    : "";

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="dot-grid pointer-events-none absolute inset-0 z-0" />

      {/* Header */}
      <header className="relative z-10 shrink-0 border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Hidden Clauses
            </h1>
            <p className="text-sm text-zinc-500">AI-powered PDF contract analysis</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {file && (
              <button
                onClick={handleReset}
                className="rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
              >
                Nuevo análisis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Two-panel layout */}
      <div className="relative z-10 flex flex-1 flex-col md:flex-row gap-4 overflow-hidden p-4">
        {/* Left panel — PDF */}
        <div className="flex w-full md:w-1/2 h-1/2 md:h-full flex-col rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
          {fileUrl ? (
            <PdfViewer fileUrl={fileUrl} clauses={result?.clauses} />
          ) : (
            <PdfUploader onFileSelected={handleFileSelected} />
          )}
        </div>

        {/* Right panel — Analysis */}
        <div
          className={`flex w-full md:w-1/2 h-1/2 md:h-full flex-col rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900 ${glowClass}`}
        >
          <AnalysisPanel
            isAnalyzing={isAnalyzing}
            result={result}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
