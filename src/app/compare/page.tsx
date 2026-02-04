"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import DualPdfUploader from "@/components/DualPdfUploader";
import ComparisonPanel from "@/components/ComparisonPanel";
import ComparisonChatPanel from "@/components/ComparisonChatPanel";
import ThemeToggle from "@/components/ThemeToggle";
import SensitiveDataWarning from "@/components/SensitiveDataWarning";
import type { ComparisonResult, ValidationResult, SensitiveDataScanResult } from "@/lib/types";
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

type ComparisonStep = "idle" | "validating" | "scanning" | "comparing";
type ActiveTab = "comparison" | "chat";

interface SensitiveDataCombined {
  contract1: SensitiveDataScanResult | null;
  contract2: SensitiveDataScanResult | null;
}

export default function ComparePage() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [fileUrl1, setFileUrl1] = useState<string | null>(null);
  const [fileUrl2, setFileUrl2] = useState<string | null>(null);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonStep, setComparisonStep] = useState<ComparisonStep>("idle");
  const [error, setError] = useState<string | null>(null);

  // Sensitive data state
  const [sensitiveDataResult, setSensitiveDataResult] = useState<SensitiveDataCombined>({
    contract1: null,
    contract2: null,
  });
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<{ file1: File; file2: File } | null>(null);

  // Text extraction for chat
  const [extractedText1, setExtractedText1] = useState<string>("");
  const [extractedText2, setExtractedText2] = useState<string>("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("comparison");

  // PDF viewer state
  const [activePdf, setActivePdf] = useState<1 | 2>(1);

  const runComparison = useCallback(async (f1: File, f2: File) => {
    setComparisonStep("comparing");

    try {
      const formData = new FormData();
      formData.append("pdf1", f1);
      formData.append("pdf2", f2);

      const response = await fetch("/api/compare", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Comparison failed");
      }

      const comparison: ComparisonResult = await response.json();
      setResult(comparison);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado");
    } finally {
      setIsComparing(false);
      setComparisonStep("idle");
    }
  }, []);

  const handleFilesSelected = useCallback(async (selectedFile1: File, selectedFile2: File) => {
    setFile1(selectedFile1);
    setFile2(selectedFile2);
    setFileUrl1(URL.createObjectURL(selectedFile1));
    setFileUrl2(URL.createObjectURL(selectedFile2));
    setResult(null);
    setError(null);
    setIsComparing(true);
    setActiveTab("comparison");

    try {
      // Step 1: Validate both documents are contracts
      setComparisonStep("validating");

      const [validateResponse1, validateResponse2] = await Promise.all([
        (async () => {
          const formData = new FormData();
          formData.append("pdf", selectedFile1);
          return fetch("/api/validate", { method: "POST", body: formData });
        })(),
        (async () => {
          const formData = new FormData();
          formData.append("pdf", selectedFile2);
          return fetch("/api/validate", { method: "POST", body: formData });
        })(),
      ]);

      if (!validateResponse1.ok || !validateResponse2.ok) {
        throw new Error("Error al verificar los documentos");
      }

      const [validation1, validation2]: [ValidationResult, ValidationResult] = await Promise.all([
        validateResponse1.json(),
        validateResponse2.json(),
      ]);

      if (!validation1.isContract && !validation2.isContract) {
        setError(
          `Ninguno de los documentos es un contrato. Contrato 1: ${validation1.documentType}. Contrato 2: ${validation2.documentType}.`
        );
        setIsComparing(false);
        setComparisonStep("idle");
        return;
      }

      if (!validation1.isContract) {
        setError(
          `El Contrato 1 no es un contrato. Tipo detectado: ${validation1.documentType}. ${validation1.reason}`
        );
        setIsComparing(false);
        setComparisonStep("idle");
        return;
      }

      if (!validation2.isContract) {
        setError(
          `El Contrato 2 no es un contrato. Tipo detectado: ${validation2.documentType}. ${validation2.reason}`
        );
        setIsComparing(false);
        setComparisonStep("idle");
        return;
      }

      // Step 2: Extract text and scan for sensitive data
      setComparisonStep("scanning");

      const [text1, text2] = await Promise.all([
        extractTextFromPdf(selectedFile1),
        extractTextFromPdf(selectedFile2),
      ]);

      setExtractedText1(text1);
      setExtractedText2(text2);

      const [scanResult1, scanResult2] = [scanSensitiveData(text1), scanSensitiveData(text2)];

      setSensitiveDataResult({ contract1: scanResult1, contract2: scanResult2 });

      if (scanResult1.hasSensitiveData || scanResult2.hasSensitiveData) {
        // Show warning modal and wait for user decision
        setPendingFiles({ file1: selectedFile1, file2: selectedFile2 });
        setShowSensitiveWarning(true);
        setIsComparing(false);
        setComparisonStep("idle");
        return;
      }

      // Step 3: Run comparison
      await runComparison(selectedFile1, selectedFile2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado");
      setIsComparing(false);
      setComparisonStep("idle");
    }
  }, [runComparison]);

  const handleSensitiveDataCancel = useCallback(() => {
    setShowSensitiveWarning(false);
    setPendingFiles(null);
    setSensitiveDataResult({ contract1: null, contract2: null });
    // Reset to initial state
    if (fileUrl1) URL.revokeObjectURL(fileUrl1);
    if (fileUrl2) URL.revokeObjectURL(fileUrl2);
    setFile1(null);
    setFile2(null);
    setFileUrl1(null);
    setFileUrl2(null);
    setExtractedText1("");
    setExtractedText2("");
  }, [fileUrl1, fileUrl2]);

  const handleSensitiveDataContinue = useCallback(async () => {
    setShowSensitiveWarning(false);
    if (pendingFiles) {
      setIsComparing(true);
      await runComparison(pendingFiles.file1, pendingFiles.file2);
      setPendingFiles(null);
    }
  }, [pendingFiles, runComparison]);

  const handleReset = useCallback(() => {
    if (fileUrl1) URL.revokeObjectURL(fileUrl1);
    if (fileUrl2) URL.revokeObjectURL(fileUrl2);
    setFile1(null);
    setFile2(null);
    setFileUrl1(null);
    setFileUrl2(null);
    setResult(null);
    setError(null);
    setIsComparing(false);
    setComparisonStep("idle");
    setSensitiveDataResult({ contract1: null, contract2: null });
    setShowSensitiveWarning(false);
    setPendingFiles(null);
    setExtractedText1("");
    setExtractedText2("");
    setActiveTab("comparison");
  }, [fileUrl1, fileUrl2]);

  // Combine sensitive data for warning modal
  const combinedSensitiveResult: SensitiveDataScanResult | null =
    sensitiveDataResult.contract1?.hasSensitiveData || sensitiveDataResult.contract2?.hasSensitiveData
      ? {
          hasSensitiveData: true,
          matches: [
            ...(sensitiveDataResult.contract1?.matches || []),
            ...(sensitiveDataResult.contract2?.matches || []),
          ],
          summary: [
            sensitiveDataResult.contract1?.hasSensitiveData
              ? `Contrato 1: ${sensitiveDataResult.contract1.summary}`
              : null,
            sensitiveDataResult.contract2?.hasSensitiveData
              ? `Contrato 2: ${sensitiveDataResult.contract2.summary}`
              : null,
          ]
            .filter(Boolean)
            .join(". "),
        }
      : null;

  const glowClass = result
    ? result.recommendation === "similar"
      ? ""
      : "glow-safe"
    : "";

  const stepMessages: Record<ComparisonStep, string> = {
    idle: "",
    validating: "Verificando que ambos documentos sean contratos...",
    scanning: "Escaneando datos sensibles...",
    comparing: "Comparando contratos...",
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="dot-grid pointer-events-none absolute inset-0 z-0" />

      {/* Sensitive Data Warning Modal */}
      {showSensitiveWarning && combinedSensitiveResult && (
        <SensitiveDataWarning
          scanResult={combinedSensitiveResult}
          onCancel={handleSensitiveDataCancel}
          onContinue={handleSensitiveDataContinue}
        />
      )}

      {/* Header */}
      <header className="relative z-10 shrink-0 border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Hidden Clauses
              </h1>
            </Link>
            <p className="text-sm text-zinc-500">Comparar contratos</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UserButton afterSignOutUrl="/" />
            {(file1 || file2) && (
              <button
                onClick={handleReset}
                className="rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600"
              >
                Nueva comparación
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden p-4">
        {!file1 && !file2 ? (
          // Upload state
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">
              <DualPdfUploader onFilesSelected={handleFilesSelected} />
            </div>
          </div>
        ) : (
          // Analysis state - 3 column layout
          <div className="flex flex-1 flex-col gap-4 lg:flex-row">
            {/* Left PDF viewer (mobile: tabs) */}
            <div className="flex w-full flex-col lg:w-1/4">
              {/* Mobile PDF tabs */}
              <div className="mb-2 flex gap-2 lg:hidden">
                <button
                  onClick={() => setActivePdf(1)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activePdf === 1
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Contrato 1
                </button>
                <button
                  onClick={() => setActivePdf(2)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activePdf === 2
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  Contrato 2
                </button>
              </div>

              {/* PDF 1 */}
              <div
                className={`flex-1 rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900 ${
                  activePdf !== 1 ? "hidden lg:flex lg:flex-col" : "flex flex-col"
                }`}
              >
                <div className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Contrato 1
                </div>
                <div className="flex-1 overflow-hidden">
                  {fileUrl1 && (
                    <PdfViewer
                      fileUrl={fileUrl1}
                      clauses={result?.contract1Analysis?.clauses}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Center panel - Results/Chat */}
            <div
              className={`flex w-full flex-col rounded-2xl bg-white shadow-sm dark:bg-zinc-900 lg:w-1/2 ${glowClass}`}
            >
              {/* Show loading state or results */}
              {isComparing ? (
                <div className="flex flex-1 flex-col items-center justify-center p-8">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {stepMessages[comparisonStep]}
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-1 flex-col items-center justify-center p-8">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <svg
                      className="h-8 w-8 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-center text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              ) : result ? (
                <>
                  {/* Tabs */}
                  <div className="shrink-0 flex border-b border-zinc-200 dark:border-zinc-700">
                    <button
                      onClick={() => setActiveTab("comparison")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === "comparison"
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                      }`}
                    >
                      Comparación
                    </button>
                    <button
                      onClick={() => setActiveTab("chat")}
                      className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === "chat"
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                      }`}
                    >
                      Preguntas
                    </button>
                  </div>

                  {/* Tab content */}
                  <div className="flex-1 overflow-hidden">
                    {activeTab === "comparison" ? (
                      <ComparisonPanel result={result} />
                    ) : (
                      <ComparisonChatPanel
                        contract1Text={extractedText1}
                        contract2Text={extractedText2}
                        comparisonResult={result}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center p-8">
                  <p className="text-sm text-zinc-500">
                    Sube dos contratos para comparar
                  </p>
                </div>
              )}
            </div>

            {/* Right PDF viewer */}
            <div
              className={`w-full rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900 lg:w-1/4 ${
                activePdf !== 2 ? "hidden lg:flex lg:flex-col" : "flex flex-col"
              }`}
            >
              <div className="mb-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Contrato 2
              </div>
              <div className="flex-1 overflow-hidden">
                {fileUrl2 && (
                  <PdfViewer
                    fileUrl={fileUrl2}
                    clauses={result?.contract2Analysis?.clauses}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
