"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  fileUrl: string;
}

export default function PdfViewer({ fileUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

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
          />
        </Document>
      </div>
      {numPages > 1 && (
        <div className="flex items-center justify-center gap-4 py-3">
          <button
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
            className="rounded-lg bg-zinc-200 px-3 py-1.5 text-sm font-medium disabled:opacity-40 dark:bg-zinc-700"
          >
            Previous
          </button>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={pageNumber >= numPages}
            className="rounded-lg bg-zinc-200 px-3 py-1.5 text-sm font-medium disabled:opacity-40 dark:bg-zinc-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
