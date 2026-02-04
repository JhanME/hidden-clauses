"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { UserButton } from "@clerk/nextjs";
import PdfUploader from "@/components/PdfUploader";
import AnalysisPanel from "@/components/AnalysisPanel";
import ThemeToggle from "@/components/ThemeToggle";
import SensitiveDataWarning from "@/components/SensitiveDataWarning";
import ChatPanel from "@/components/ChatPanel";
import type { AnalysisResult, ValidationResult, SensitiveDataScanResult } from "@/lib/types";
import { extractTextFromPdf } from "@/lib/pdfTextExtractor";
import { scanSensitiveData } from "@/lib/sensitiveData";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <p className="text-zinc-500">Cargando visor PDF...</p>
    </div>
  ),
});

type AnalysisStep = "idle" | "validating" | "scanning" | "analyzing";
type ActiveTab = "analysis" | "chat";

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<AnalysisStep>("idle");
  const [error, setError] = useState<string | null>(null);

  // Sensitive data state
  const [sensitiveDataResult, setSensitiveDataResult] = useState<SensitiveDataScanResult | null>(null);
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  // Chat state
  const [extractedText, setExtractedText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("analysis");

  const runAnalysis = useCallback(async (selectedFile: File) => {
    setAnalysisStep("analyzing");

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
      setAnalysisStep("idle");
    }
  }, []);

  const handleFileSelected = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
    setIsAnalyzing(true);
    setActiveTab("analysis");

    try {
      // Step 1: Validate if document is a contract
      setAnalysisStep("validating");

      const validateFormData = new FormData();
      validateFormData.append("pdf", selectedFile);

      const validateResponse = await fetch("/api/validate", {
        method: "POST",
        body: validateFormData,
      });

      if (!validateResponse.ok) {
        throw new Error("Error al verificar el documento");
      }

      const validation: ValidationResult = await validateResponse.json();

      if (!validation.isContract) {
        setError(`Este documento no es un contrato. Tipo detectado: ${validation.documentType}. ${validation.reason}`);
        setIsAnalyzing(false);
        setAnalysisStep("idle");
        return;
      }

      // Step 2: Extract text and scan for sensitive data
      setAnalysisStep("scanning");

      const text = await extractTextFromPdf(selectedFile);
      setExtractedText(text);

      const scanResult = scanSensitiveData(text);
      setSensitiveDataResult(scanResult);

      if (scanResult.hasSensitiveData) {
        // Show warning modal and wait for user decision
        setPendingFile(selectedFile);
        setShowSensitiveWarning(true);
        setIsAnalyzing(false);
        setAnalysisStep("idle");
        return;
      }

      // Step 3: Run full analysis
      await runAnalysis(selectedFile);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
      setIsAnalyzing(false);
      setAnalysisStep("idle");
    }
  }, [runAnalysis]);

  const handleSensitiveDataCancel = useCallback(() => {
    setShowSensitiveWarning(false);
    setPendingFile(null);
    setSensitiveDataResult(null);
    // Reset to initial state
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFile(null);
    setFileUrl(null);
    setExtractedText("");
  }, [fileUrl]);

  const handleSensitiveDataContinue = useCallback(async () => {
    setShowSensitiveWarning(false);
    if (pendingFile) {
      setIsAnalyzing(true);
      await runAnalysis(pendingFile);
      setPendingFile(null);
    }
  }, [pendingFile, runAnalysis]);

  const handleReset = useCallback(() => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFile(null);
    setFileUrl(null);
    setResult(null);
    setError(null);
    setIsAnalyzing(false);
    setAnalysisStep("idle");
    setSensitiveDataResult(null);
    setShowSensitiveWarning(false);
    setPendingFile(null);
    setExtractedText("");
    setActiveTab("analysis");
  }, [fileUrl]);

  const glowClass = result
    ? result.verdict === "harmful"
      ? "glow-harmful"
      : "glow-safe"
    : "";

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="dot-grid pointer-events-none absolute inset-0 z-0" />

      {/* Sensitive Data Warning Modal */}
      {showSensitiveWarning && sensitiveDataResult && (
        <SensitiveDataWarning
          scanResult={sensitiveDataResult}
          onCancel={handleSensitiveDataCancel}
          onContinue={handleSensitiveDataContinue}
        />
      )}

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
            <UserButton afterSignOutUrl="/" />
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

        {/* Right panel — Analysis/Chat */}
        <div
          className={`flex w-full md:w-1/2 h-1/2 md:h-full flex-col rounded-2xl bg-white shadow-sm dark:bg-zinc-900 ${glowClass}`}
        >
          {/* Tabs - only show when we have results */}
          {result && (
            <div className="shrink-0 flex border-b border-zinc-200 dark:border-zinc-700">
              <button
                onClick={() => setActiveTab("analysis")}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "analysis"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                  }`}
              >
                Análisis
              </button>
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "chat"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                  }`}
              >
                Preguntas
              </button>
            </div>
          )}

          {/* Tab content */}
          <div className="flex-1 overflow-hidden relative">
            <div className={`h-full p-4 ${activeTab === "analysis" ? "block" : "hidden"}`}>
              <AnalysisPanel
                isAnalyzing={isAnalyzing}
                result={result}
                error={error}
                analysisStep={analysisStep}
              />
            </div>
            {result && extractedText && (
              <div className={`h-full ${activeTab === "chat" ? "block" : "hidden"}`}>
                <ChatPanel
                  key={fileUrl}
                  contractText={extractedText}
                  analysisResult={result}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
