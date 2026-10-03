"use client";

import { useState } from "react";
import type { CertificateData } from "@/types/certificate";

const FILE_NAME = "certificate.png";
const GENERIC_ERROR = "Could not download the certificate. Please try again.";

interface DownloadPngButtonProps {
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

function saveBlob(blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = FILE_NAME;
  link.click();
  URL.revokeObjectURL(url);
}

export function DownloadPngButton({ data }: DownloadPngButtonProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (pending) return;
    setPending(true);
    setError(null);
    try {
      const response = await fetch("/api/export/png", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setError(await readError(response));
        return;
      }
      saveBlob(await response.blob());
    } catch {
      setError(GENERIC_ERROR);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        // aria-disabled rather than disabled: a disabled button drops focus.
        aria-disabled={pending}
        className="inline-flex items-center justify-center rounded-sm border border-accent bg-accent px-4 py-2 font-medium text-accent-ink outline-none hover:bg-accent-hover focus-visible:ring-3 focus-visible:ring-focus-ring aria-disabled:cursor-progress aria-disabled:opacity-70 aria-disabled:hover:bg-accent"
      >
        {pending ? "Rendering…" : "Download PNG"}
      </button>
      <p role="alert" className="text-center text-sm text-danger empty:hidden">
        {error}
      </p>
    </div>
  );
}
