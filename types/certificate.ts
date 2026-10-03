export const TEMPLATE_IDS = ["black-border", "classic", "minimal"] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const DEFAULT_TEMPLATE_ID: TemplateId = "black-border";

export function isTemplateId(value: unknown): value is TemplateId {
  return TEMPLATE_IDS.some((id) => id === value);
}

export interface CertificateData {
  recipientName: string;
  courseTitle: string;
  /** Already formatted for display. */
  date: string;
  instructorName: string;
  templateId: TemplateId;
}

export type CertificateTextField = Exclude<keyof CertificateData, "templateId">;
