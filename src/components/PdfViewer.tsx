"use client";

import { useState, useCallback, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { Clause } from "@/lib/types";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  fileUrl: string;
  clauses?: Clause[];
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

interface SnippetMatch {
  snippet: string;
  severity: "safe" | "warning" | "harmful";
  clauseNumber: number;
}

const severityColors: Record<string, string> = {
  harmful: "rgba(239, 68, 68, 0.30)",
  warning: "rgba(234, 179, 8, 0.25)",
  safe: "rgba(34, 197, 94, 0.20)",
};

export default function PdfViewer({ fileUrl, clauses }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const snippetMatches: SnippetMatch[] = useMemo(() => {
    if (!clauses) return [];
    const matches: SnippetMatch[] = [];
    for (const clause of clauses) {
      if (!clause.textSnippets) continue;
      for (const snippet of clause.textSnippets) {
        if (snippet && snippet.length > 3) {
          matches.push({
            snippet,
            severity: clause.severity,
            clauseNumber: clause.number,
          });
        }
      }
    }
    // Sort longest first so longer matches take priority
    matches.sort((a, b) => b.snippet.length - a.snippet.length);
    return matches;
  }, [clauses]);

  const customTextRenderer = useCallback(
    (textItem: { str: string }) => {
      if (snippetMatches.length === 0) return textItem.str;

      const text = textItem.str;
      if (!text.trim()) return text;

      const normalizedText = normalize(text);

      // Find which snippets match this text item
      let bestMatch: SnippetMatch | null = null;
      for (const match of snippetMatches) {
        const normalizedSnippet = normalize(match.snippet);
        if (
          normalizedText.includes(normalizedSnippet) ||
          normalizedSnippet.includes(normalizedText)
        ) {
          // Pick the most severe match
          if (
            !bestMatch ||
            severityRank(match.severity) > severityRank(bestMatch.severity)
          ) {
            bestMatch = match;
          }
        }
      }

      if (!bestMatch) return text;

      const color = severityColors[bestMatch.severity];
      const borderColor =
        bestMatch.severity === "harmful"
          ? "border-bottom: 2px solid rgb(239, 68, 68)"
          : bestMatch.severity === "warning"
            ? "border-bottom: 2px solid rgb(234, 179, 8)"
            : "border-bottom: 2px solid rgb(34, 197, 94)";

      return `<mark style="background-color: ${color}; ${borderColor}; color: transparent; padding: 1px 0; border-radius: 2px;" title="Cláusula ${bestMatch.clauseNumber} — ${bestMatch.severity.toUpperCase()}">${text}</mark>`;
    },
    [snippetMatches]
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-auto flex justify-center bg-zinc-100 dark:bg-zinc-900 rounded-xl">
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="py-4"
        >
          <Page
            pageNumber={pageNumber}
            width={550}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            customTextRenderer={
              snippetMatches.length > 0 ? customTextRenderer : undefined
            }
          />
        </Document>
      </div>

      {/* Legend */}
      {snippetMatches.length > 0 && (
        <div className="flex items-center justify-center gap-4 border-b border-zinc-200 py-2 dark:border-zinc-700">
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="inline-block h-3 w-3 rounded-sm bg-red-500/30 ring-1 ring-red-500" />
            Harmful
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="inline-block h-3 w-3 rounded-sm bg-yellow-500/25 ring-1 ring-yellow-500" />
            Warning
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="inline-block h-3 w-3 rounded-sm bg-green-500/20 ring-1 ring-green-500" />
            Safe
          </span>
        </div>
      )}

      {numPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-3">
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="rounded-lg bg-zinc-200 px-3 py-1.5 text-sm font-medium disabled:opacity-40 dark:bg-zinc-700"
          >
            Anterior
          </button>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Página {pageNumber} de {numPages}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="rounded-lg bg-zinc-200 px-3 py-1.5 text-sm font-medium disabled:opacity-40 dark:bg-zinc-700"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

function severityRank(severity: string): number {
  switch (severity) {
    case "harmful":
      return 3;
    case "warning":
      return 2;
    case "safe":
      return 1;
    default:
      return 0;
  }
}
