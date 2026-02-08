"use client";

import { useState, useEffect } from "react";
import type { AnalysisResult, Clause } from "@/lib/types";

type AnalysisStep = "idle" | "validating" | "scanning" | "analyzing";

interface AnalysisPanelProps {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
  analysisStep?: AnalysisStep;
}

const severityConfig = {
  safe: {
    border: "border-green-500",
    bg: "bg-green-50 dark:bg-green-950/20",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    label: "Safe",
  },
  warning: {
    border: "border-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/20",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    label: "Warning",
  },
  harmful: {
    border: "border-red-500",
    bg: "bg-red-50 dark:bg-red-950/20",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    label: "Harmful",
  },
};

function ClauseCard({ clause }: { clause: Clause }) {
  const config = severityConfig[clause.severity];

  return (
    <div className={`rounded-xl border-l-4 ${config.border} ${config.bg} p-4`}>
      <div className="mb-2 flex items-center gap-2">
        <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
          {clause.number}. {clause.title}
        </span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.badge}`}>
          {config.label}
        </span>
      </div>
      <p className="mb-2 text-sm text-zinc-700 dark:text-zinc-300">{clause.summary}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{clause.explanation}</p>
    </div>
  );
}

const stepMessages: Record<AnalysisStep, { title: string; subtitle: string }> = {
  idle: { title: "", subtitle: "" },
  validating: {
    title: "Verifying document type...",
    subtitle: "Checking if it is a valid contract",
  },
  scanning: {
    title: "Scanning for sensitive data...",
    subtitle: "Searching for personal information",
  },
  analyzing: {
    title: "Analyzing contract...",
    subtitle: "Identifying clauses and risks",
  },
};


const analysisMessages = [
  "Reading your contract...",
  "Analyzing clauses for hidden risks...",
  "Comparing against legal standards...",
  "Identifying potential loopholes...",
  "Translating legalese to plain English...",
  "Almost there, detecting fine print...",
  "Generating your safety report...",
];

export default function AnalysisPanel({ isAnalyzing, result, error, analysisStep = "analyzing" }: AnalysisPanelProps) {
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  useEffect(() => {
    if (isAnalyzing && analysisStep === "analyzing") {
      const interval = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % analysisMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing, analysisStep]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="rounded-xl bg-cyan-50 p-6 text-center dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800">
          <p className="text-lg font-bold text-cyan-700 dark:text-cyan-400">Oops! It looks like this isn't a contract.</p>
          <p className="mt-2 text-sm text-cyan-600 dark:text-cyan-300">{error}</p>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    const { title, subtitle } = stepMessages[analysisStep];
    const displayTitle = analysisStep === "analyzing" ? analysisMessages[loadingMsgIndex] : title;

    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-cyan-100 border-t-cyan-500 dark:border-cyan-900 dark:border-t-cyan-400" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 animate-in fade-in slide-in-from-bottom-2 duration-500 key={loadingMsgIndex}">
            {displayTitle}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <p className="text-center text-zinc-500">
          Upload a PDF contract to see the clause analysis here.
        </p>
      </div>
    );
  }

  const isHarmful = result.verdict === "harmful";

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Verdict banner */}
      <div
        className={`shrink-0 rounded-xl p-4 text-center ${isHarmful
          ? "bg-red-100 dark:bg-red-950/30"
          : "bg-green-100 dark:bg-green-950/30"
          }`}
      >
        <p
          className={`text-lg font-bold ${isHarmful
            ? "text-red-700 dark:text-red-400"
            : "text-green-700 dark:text-green-400"
            }`}
        >
          {isHarmful ? "Harmful Clauses Detected" : "Contract Appears Safe"}
        </p>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {result.verdictSummary}
        </p>
      </div>

      {/* Clause list */}
      <div className="mt-4 flex-1 space-y-3 overflow-auto pr-1">
        {result.clauses.map((clause) => (
          <ClauseCard key={clause.number} clause={clause} />
        ))}
      </div>
    </div>
  );
}
