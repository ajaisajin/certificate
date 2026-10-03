import { describe, expect, it } from "vitest";
import { MAX_FIELD_LENGTH, parseCertificateData } from "./certificate-input";

const VALID = {
  recipientName: "Ada Lovelace",
  courseTitle: "Analytical Engines",
  date: "October 1, 2026",
  instructorName: "Brad Traversy",
  templateId: "classic",
};

describe("parseCertificateData", () => {
  it("accepts a valid body and drops unknown fields", () => {
    expect(parseCertificateData({ ...VALID, extra: "ignored" })).toEqual({
      success: true,
      data: VALID,
    });
  });

  it("allows empty strings", () => {
    const result = parseCertificateData({ ...VALID, recipientName: "" });

    expect(result.success).toBe(true);
  });

  it.each([null, "text", 42, []])("rejects a non-object body: %j", (body) => {
    expect(parseCertificateData(body)).toEqual({
      success: false,
      error: "Request body must be a JSON object.",
    });
  });

  it("rejects a missing text field", () => {
    const { instructorName, ...body } = VALID;

    expect(instructorName).toBeDefined();
    expect(parseCertificateData(body)).toEqual({
      success: false,
      error: `instructorName must be a string of at most ${MAX_FIELD_LENGTH} characters.`,
    });
  });

  it("rejects a non-string text field", () => {
    const result = parseCertificateData({ ...VALID, courseTitle: 5 });

    expect(result.success).toBe(false);
  });

  it("enforces the field length limit", () => {
    const atLimit = "a".repeat(MAX_FIELD_LENGTH);

    expect(parseCertificateData({ ...VALID, date: atLimit }).success).toBe(true);
    expect(parseCertificateData({ ...VALID, date: `${atLimit}a` }).success).toBe(
      false,
    );
  });

  it("rejects a missing or unknown templateId", () => {
    const error = "templateId must be one of: black-border, classic, minimal.";
    const { templateId, ...withoutTemplate } = VALID;

    expect(templateId).toBeDefined();
    expect(parseCertificateData(withoutTemplate)).toEqual({ success: false, error });
    expect(parseCertificateData({ ...VALID, templateId: "../etc" })).toEqual({
      success: false,
      error,
    });
  });
});
