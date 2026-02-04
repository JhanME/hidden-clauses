"use client";

import { useCallback, useState } from "react";

interface DualPdfUploaderProps {
  onFilesSelected: (file1: File, file2: File) => void;
}

export default function DualPdfUploader({ onFilesSelected }: DualPdfUploaderProps) {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);

  const handleFile = useCallback(
    (file: File, slot: 1 | 2) => {
      if (file.type === "application/pdf") {
        if (slot === 1) {
          setFile1(file);
        } else {
          setFile2(file);
        }
      } else {
        alert("Por favor sube un archivo PDF.");
      }
    },
    []
  );

  const handleDrop1 = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging1(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file, 1);
    },
    [handleFile]
  );

  const handleDrop2 = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging2(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file, 2);
    },
    [handleFile]
  );

  const handleCompare = useCallback(() => {
    if (file1 && file2) {
      onFilesSelected(file1, file2);
    }
  }, [file1, file2, onFilesSelected]);

  const removeFile = useCallback((slot: 1 | 2) => {
    if (slot === 1) {
      setFile1(null);
    } else {
      setFile2(null);
    }
  }, []);

  const DropZone = ({
    slot,
    file,
    isDragging,
    setIsDragging,
    onDrop,
  }: {
    slot: 1 | 2;
    file: File | null;
    isDragging: boolean;
    setIsDragging: (v: boolean) => void;
    onDrop: (e: React.DragEvent) => void;
  }) => (
    <div
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      className={`flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-colors ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
          : file
            ? "border-green-500 bg-green-50 dark:border-green-600 dark:bg-green-950/20"
            : "border-zinc-300 dark:border-zinc-700"
      }`}
    >
      {file ? (
        <div className="flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Contrato {slot}
          </p>
          <p className="mb-3 max-w-[200px] truncate text-xs text-zinc-500 dark:text-zinc-400">
            {file.name}
          </p>
          <button
            onClick={() => removeFile(slot)}
            className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Eliminar
          </button>
        </div>
      ) : (
        <>
          <svg
            className="mb-3 h-10 w-10 text-zinc-400"
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
          <p className="mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Contrato {slot}
          </p>
          <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
            Arrastra o haz clic
          </p>
          <label className="cursor-pointer rounded-lg bg-zinc-200 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600">
            Seleccionar PDF
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f, slot);
              }}
            />
          </label>
        </>
      )}
    </div>
  );

  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-xl font-bold text-zinc-800 dark:text-zinc-200">
          Comparar Contratos
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Sube dos contratos para comparar cuál te conviene más
        </p>
      </div>

      <div className="flex w-full max-w-2xl flex-col gap-4 md:flex-row">
        <DropZone
          slot={1}
          file={file1}
          isDragging={isDragging1}
          setIsDragging={setIsDragging1}
          onDrop={handleDrop1}
        />
        <DropZone
          slot={2}
          file={file2}
          isDragging={isDragging2}
          setIsDragging={setIsDragging2}
          onDrop={handleDrop2}
        />
      </div>

      <button
        onClick={handleCompare}
        disabled={!file1 || !file2}
        className="mt-6 rounded-lg bg-blue-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-600 disabled:hover:shadow-none dark:bg-cyan-500 dark:hover:bg-cyan-400"
      >
        Comparar contratos
      </button>
    </div>
  );
}
