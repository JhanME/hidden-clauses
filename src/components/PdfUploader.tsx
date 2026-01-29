"use client";

import { useCallback, useState } from "react";

interface PdfUploaderProps {
  onFileSelected: (file: File) => void;
}

export default function PdfUploader({ onFileSelected }: PdfUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type === "application/pdf") {
        onFileSelected(file);
      } else {
        alert("Please upload a PDF file.");
      }
    },
    [onFileSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
          : "border-zinc-300 dark:border-zinc-700"
      }`}
    >
      <svg
        className="mb-4 h-16 w-16 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <p className="mb-2 text-lg font-medium text-zinc-700 dark:text-zinc-300">
        Drop your PDF contract here
      </p>
      <p className="mb-4 text-sm text-zinc-500">or click to browse</p>
      <label className="cursor-pointer rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300">
        Select PDF
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
}
