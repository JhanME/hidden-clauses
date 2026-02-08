"use client";

import { useState } from "react";
import type { ComparisonResult, ComparisonDifference } from "@/lib/types";

interface ComparisonPanelProps {
  result: ComparisonResult;
}

const severityColors = {
  safe: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  harmful: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

function DifferenceRow({ diff }: { diff: ComparisonDifference }) {
  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-700">
      <td className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {diff.aspect}
      </td>
      <td className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">
        {diff.contract1}
      </td>
      <td className="px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400">
        {diff.contract2}
      </td>
      <td className="px-3 py-2 text-center">
        {diff.favoredContract === "equal" ? (
          <span className="text-sm text-zinc-400">=</span>
        ) : (
          <span
            className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${diff.favoredContract === "contract1"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
              }`}
          >
            C{diff.favoredContract === "contract1" ? "1" : "2"}
          </span>
        )}
      </td>
    </tr>
  );
}

function SeverityBar({
  label,
  clauses,
}: {
  label: string;
  clauses: { severity: "safe" | "warning" | "harmful" }[];
}) {
  const harmful = clauses.filter((c) => c.severity === "harmful").length;
  const warning = clauses.filter((c) => c.severity === "warning").length;
  const safe = clauses.filter((c) => c.severity === "safe").length;
  const total = clauses.length || 1;

  return (
    <div className="mb-2">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-zinc-600 dark:text-zinc-400">{label}</span>
        <span className="text-zinc-500">
          {harmful} harmful, {warning} warnings, {safe} safe
        </span>
      </div>
      <div className="flex h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        {harmful > 0 && (
          <div
            className="bg-red-500"
            style={{ width: `${(harmful / total) * 100}%` }}
          />
        )}
        {warning > 0 && (
          <div
            className="bg-yellow-500"
            style={{ width: `${(warning / total) * 100}%` }}
          />
        )}
        {safe > 0 && (
          <div
            className="bg-green-500"
            style={{ width: `${(safe / total) * 100}%` }}
          />
        )}
      </div>
    </div>
  );
}

export default function ComparisonPanel({ result }: ComparisonPanelProps) {
  const [expandedContract, setExpandedContract] = useState<1 | 2 | null>(null);

  const recommendationLabel =
    result.recommendation === "contract1"
      ? "Contract 1"
      : result.recommendation === "contract2"
        ? "Contract 2"
        : "Both similar";

  const recommendationColor =
    result.recommendation === "similar"
      ? "bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-600"
      : "bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-700";

  return (
    <div className="flex h-full flex-col overflow-auto p-4">
      {/* Recommendation Banner */}
      <div className={`mb-4 rounded-xl border-2 p-4 ${recommendationColor}`}>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xl">
            {result.recommendation === "similar" ? "=" : "★"}
          </span>
          <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            {result.recommendation === "similar"
              ? "Similar contracts"
              : `Recommendation: ${recommendationLabel}`}
          </span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {result.recommendationReason}
        </p>
      </div>

      {/* Severity Comparison */}
      <div className="mb-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/50">
        <h3 className="mb-3 text-sm font-bold text-zinc-700 dark:text-zinc-300">
          Severity Summary
        </h3>
        <SeverityBar label="Contract 1" clauses={result.contract1Analysis.clauses} />
        <SeverityBar label="Contract 2" clauses={result.contract2Analysis.clauses} />
      </div>

      {/* Key Differences Table */}
      {result.keyDifferences.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Key Differences
          </h3>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
            <table className="w-full text-left">
              <thead className="bg-zinc-100 dark:bg-zinc-800">
                <tr>
                  <th className="px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Aspect
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Contract 1
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Contract 2
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Better
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.keyDifferences.map((diff, idx) => (
                  <DifferenceRow key={idx} diff={diff} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Overall Summary */}
      <div className="mb-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
        <h3 className="mb-2 text-sm font-bold text-blue-800 dark:text-blue-300">
          Overall Summary
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          {result.overallSummary}
        </p>
      </div>

      {/* Expandable Contract Details */}
      <div className="space-y-2">
        {[1, 2].map((num) => {
          const analysis = num === 1 ? result.contract1Analysis : result.contract2Analysis;
          const isExpanded = expandedContract === num;

          return (
            <div
              key={num}
              className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700"
            >
              <button
                onClick={() => setExpandedContract(isExpanded ? null : (num as 1 | 2))}
                className="flex w-full items-center justify-between bg-zinc-50 px-4 py-3 text-left hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Contract {num}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${analysis.verdict === "harmful"
                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                  >
                    {analysis.verdict === "harmful" ? "Harmful" : "Safe"}
                  </span>
                </div>
                <svg
                  className={`h-5 w-5 text-zinc-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isExpanded && (
                <div className="max-h-64 overflow-auto border-t border-zinc-200 p-4 dark:border-zinc-700">
                  <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                    {analysis.verdictSummary}
                  </p>
                  <div className="space-y-2">
                    {analysis.clauses.map((clause) => (
                      <div
                        key={clause.number}
                        className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <span
                            className={`rounded px-1.5 py-0.5 text-xs font-medium ${severityColors[clause.severity]}`}
                          >
                            {clause.severity}
                          </span>
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {clause.title}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {clause.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
