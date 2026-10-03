import { CertificateEditor } from "@/components/editor/CertificateEditor";

export default function Home() {
  return (
    <>
      <header className="flex items-center border-b border-border bg-surface px-6 py-3">
        <h1 className="flex items-center gap-2 text-lg font-semibold">
          <span
            aria-hidden="true"
            className="grid size-[26px] place-items-center rounded-sm bg-accent font-serif font-bold text-accent-ink"
          >
            C
          </span>
          Certificreate
        </h1>
      </header>
      <CertificateEditor />
    </>
  );
}
