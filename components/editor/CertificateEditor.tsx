"use client";

import { useState } from "react";
import type { CertificateData } from "@/types/certificate";
import { CertificateForm } from "./CertificateForm";
import { CertificatePreview } from "./CertificatePreview";
import { DownloadButtons } from "./DownloadButtons";

const DEFAULT_INSTRUCTOR_NAME = "Brad Traversy";

const INITIAL_CERTIFICATE: CertificateData = {
  recipientName: "Priya Raghavan",
  courseTitle: "Modern JavaScript From The Beginning 2.0",
  date: "October 1, 2026",
  instructorName: DEFAULT_INSTRUCTOR_NAME,
};

export function CertificateEditor() {
  const [data, setData] = useState(INITIAL_CERTIFICATE);

  function handleChange(field: keyof CertificateData, value: string) {
    setData((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="grid flex-1 lg:grid-cols-[380px_1fr]">
      <aside className="border-b border-border bg-surface p-6 lg:border-r lg:border-b-0">
        <CertificateForm data={data} onChange={handleChange} />
      </aside>
      <main className="flex flex-col items-center justify-center gap-6 bg-stage px-4 py-12 sm:px-8">
        <CertificatePreview data={data} />
        <DownloadButtons data={data} />
      </main>
    </div>
  );
}
