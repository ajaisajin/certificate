import type { CertificateData } from "@/types/certificate";

export const CERTIFICATE_FIELDS = [
  "recipientName",
  "courseTitle",
  "date",
  "instructorName",
] as const satisfies readonly (keyof CertificateData)[];

export const MAX_FIELD_LENGTH = 200;

export type ParsedCertificateData =
  | { success: true; data: CertificateData }
  | { success: false; error: string };

/** Validates an untrusted request body. Unknown fields are dropped. */
export function parseCertificateData(value: unknown): ParsedCertificateData {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { success: false, error: "Request body must be a JSON object." };
  }

  const input = value as Record<string, unknown>;
  const data = {} as CertificateData;

  for (const field of CERTIFICATE_FIELDS) {
    const fieldValue = input[field];
    if (typeof fieldValue !== "string" || fieldValue.length > MAX_FIELD_LENGTH) {
      return {
        success: false,
        error: `${field} must be a string of at most ${MAX_FIELD_LENGTH} characters.`,
      };
    }
    data[field] = fieldValue;
  }

  return { success: true, data };
}
