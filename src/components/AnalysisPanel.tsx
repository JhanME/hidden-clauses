"use client";

import type { AnalysisResult, Clause } from "@/lib/types";

interface AnalysisPanelProps {
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
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

export default function AnalysisPanel({ isAnalyzing, result, error }: AnalysisPanelProps) {
  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="rounded-xl bg-red-50 p-6 text-center dark:bg-red-950/20">
          <p className="text-lg font-medium text-red-700 dark:text-red-400">Analysis Failed</p>
          <p className="mt-2 text-sm text-red-600 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-800 dark:border-zinc-600 dark:border-t-zinc-200" />
        <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
          Analyzing contract...
        </p>
        <p className="text-sm text-zinc-500">This may take a moment</p>
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
        className={`shrink-0 rounded-xl p-4 text-center ${
          isHarmful
            ? "bg-red-100 dark:bg-red-950/30"
            : "bg-green-100 dark:bg-green-950/30"
        }`}
      >
        <p
          className={`text-lg font-bold ${
            isHarmful
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
