import type { CertificateData } from "@/types/certificate";

const FIELDS: { name: keyof CertificateData; label: string }[] = [
  { name: "recipientName", label: "Recipient name" },
  { name: "courseTitle", label: "Course or achievement" },
  { name: "date", label: "Date" },
  { name: "instructorName", label: "Instructor" },
];

interface CertificateFormProps {
  data: CertificateData;
  onChange: (field: keyof CertificateData, value: string) => void;
}

export function CertificateForm({ data, onChange }: CertificateFormProps) {
  return (
    <section aria-labelledby="recipient-heading">
      <h2
        id="recipient-heading"
        className="mb-3 text-xs font-semibold tracking-[0.08em] text-muted uppercase"
      >
        Recipient
      </h2>
      {FIELDS.map(({ name, label }) => (
        <div key={name} className="mb-4 flex flex-col gap-1">
          <label htmlFor={`certificate-${name}`} className="text-sm font-medium">
            {label}
          </label>
          <input
            id={`certificate-${name}`}
            name={name}
            type="text"
            autoComplete="off"
            value={data[name]}
            onChange={(event) => onChange(name, event.target.value)}
            className="w-full rounded-sm border border-border bg-bg px-3 py-2 text-text outline-none focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-focus-ring"
          />
        </div>
      ))}
    </section>
  );
}
