"use client";

import type { SensitiveDataScanResult, SensitiveDataMatch } from "@/lib/types";

interface SensitiveDataWarningProps {
  scanResult: SensitiveDataScanResult;
  onCancel: () => void;
  onContinue: () => void;
}

const typeLabels: Record<SensitiveDataMatch["type"], string> = {
  dni: "DNI/Gov ID",
  phone: "Phone",
  email: "Email",
  bankAccount: "Bank Account",
  creditCard: "Credit Card",
  address: "Address",
  name: "Name",
};

const typeIcons: Record<SensitiveDataMatch["type"], string> = {
  dni: "🪪",
  phone: "📱",
  email: "📧",
  bankAccount: "🏦",
  creditCard: "💳",
  address: "📍",
  name: "👤",
};

export default function SensitiveDataWarning({
  scanResult,
  onCancel,
  onContinue,
}: SensitiveDataWarningProps) {
  // Group matches by type
  const groupedMatches = scanResult.matches.reduce((acc, match) => {
    if (!acc[match.type]) {
      acc[match.type] = [];
    }
    acc[match.type].push(match);
    return acc;
  }, {} as Record<string, SensitiveDataMatch[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-2xl dark:bg-yellow-900/30">
            ⚠️
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Sensitive data detected
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              The document contains personal information
            </p>
          </div>
        </div>

        {/* Warning message */}
        <div className="mb-4 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            We have detected personal data in this document. This data will be sent to the AI
            for analysis. The AI does not store the documents, but for security we inform you
            of the detected data.
          </p>
        </div>

        {/* Detected data */}
        <div className="mb-6 space-y-3">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {scanResult.summary}
          </p>
          <div className="max-h-48 space-y-2 overflow-auto">
            {Object.entries(groupedMatches).map(([type, matches]) => (
              <div key={type} className="rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                <div className="mb-1 flex items-center gap-2">
                  <span>{typeIcons[type as SensitiveDataMatch["type"]]}</span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {typeLabels[type as SensitiveDataMatch["type"]]} ({matches.length})
                  </span>
                </div>
                <div className="space-y-1">
                  {matches.slice(0, 3).map((match, idx) => (
                    <p key={idx} className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {match.redacted}
                    </p>
                  ))}
                  {matches.length > 3 && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      and {matches.length - 3} more...
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Continue anyway
          </button>
        </div>
      </div>
    </div>
  );
}
