import type {
  CertificateData,
  CertificateTextField,
} from "@/types/certificate";
import { TemplatePicker } from "./TemplatePicker";

const FIELDS: { name: CertificateTextField; label: string }[] = [
  { name: "recipientName", label: "Recipient name" },
  { name: "courseTitle", label: "Course or achievement" },
  { name: "date", label: "Date" },
  { name: "instructorName", label: "Instructor" },
];

interface CertificateFormProps {
  data: CertificateData;
  onChange: <Field extends keyof CertificateData>(
    field: Field,
    value: CertificateData[Field],
  ) => void;
}

export function CertificateForm({ data, onChange }: CertificateFormProps) {
  return (
    <div className="flex flex-col gap-4">
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
      <TemplatePicker
        data={data}
        onChange={(templateId) => onChange("templateId", templateId)}
      />
    </div>
  );
}
