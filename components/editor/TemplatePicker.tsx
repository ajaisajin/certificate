import { Certificate } from "@/components/certificate/Certificate";
import { TEMPLATES } from "@/components/certificate/templates";
import {
  TEMPLATE_IDS,
  type CertificateData,
  type TemplateId,
} from "@/types/certificate";

interface TemplatePickerProps {
  data: CertificateData;
  onChange: (templateId: TemplateId) => void;
}

// --thumb-w and --thumb-h must equal the theme's --cert-w and --cert-h.
export function TemplatePicker({ data, onChange }: TemplatePickerProps) {
  return (
    <fieldset className="[--thumb-h:816px] [--thumb-scale:0.08] [--thumb-w:1056px]">
      <legend className="mb-3 text-xs font-semibold tracking-[0.08em] text-muted uppercase">
        Template
      </legend>
      <div className="grid grid-cols-3 gap-2">
        {TEMPLATE_IDS.map((id) => (
          <label
            key={id}
            className="flex cursor-pointer flex-col items-center gap-1 rounded-sm border border-border bg-bg p-2 text-center text-xs text-muted has-checked:border-accent has-checked:bg-accent-soft has-checked:text-text has-focus-visible:ring-3 has-focus-visible:ring-focus-ring"
          >
            <input
              type="radio"
              name="templateId"
              value={id}
              checked={data.templateId === id}
              onChange={() => onChange(id)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              inert
              className="block h-[calc(var(--thumb-h)*var(--thumb-scale))] w-[calc(var(--thumb-w)*var(--thumb-scale))] overflow-hidden rounded-[3px]"
            >
              <span className="block origin-top-left scale-(--thumb-scale)">
                <Certificate data={{ ...data, templateId: id }} />
              </span>
            </span>
            {TEMPLATES[id].name}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
