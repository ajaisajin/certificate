"use client";

import { useState } from "react";
import type { CertificateData } from "@/types/certificate";

type ExportFormat = "png" | "pdf";

const FORMATS: { format: ExportFormat; label: string; className: string }[] = [
  {
    format: "png",
    label: "Download PNG",
    className:
      "border-accent bg-accent text-accent-ink hover:bg-accent-hover aria-disabled:hover:bg-accent",
  },
  {
    format: "pdf",
    label: "Download PDF",
    className: "border-border bg-surface-2 text-text hover:border-accent",
  },
];

const GENERIC_ERROR = "Could not download the certificate. Please try again.";

interface DownloadButtonsProps {
  data: CertificateData;
}

async function readError(response: Response): Promise<string> {
  if (response.status !== 400) return GENERIC_ERROR;
  try {
    const body: unknown = await response.json();
    if (typeof body === "object" && body !== null && "error" in body) {
      return typeof body.error === "string" ? body.error : GENERIC_ERROR;
    }
  } catch {
    // Fall through to the generic message.
  }
  return GENERIC_ERROR;
}

function saveBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function DownloadButtons({ data }: DownloadButtonsProps) {
  const [pending, setPending] = useState<ExportFormat | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(format: ExportFormat) {
    if (pending) return;
    setPending(format);
    setError(null);
    try {
      const response = await fetch(`/api/export/${format}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setError(await readError(response));
        return;
      }
      saveBlob(await response.blob(), `certificate.${format}`);
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-3">
        {FORMATS.map(({ format, label, className }) => (
          <button
            key={format}
            type="button"
            onClick={() => handleClick(format)}
            // aria-disabled rather than disabled: a disabled button drops focus.
            aria-disabled={pending !== null}
            className={`inline-flex items-center justify-center rounded-sm border px-4 py-2 font-medium outline-none focus-visible:ring-3 focus-visible:ring-focus-ring aria-disabled:cursor-progress aria-disabled:opacity-70 ${className}`}
          >
            {pending === format ? "Rendering…" : label}
          </button>
        ))}
      </div>
      <p role="alert" className="text-center text-sm text-danger empty:hidden">
        {error}
      </p>
    </div>
  );
}
