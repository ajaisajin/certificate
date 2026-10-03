import { parseCertificateData } from "@/lib/certificate-input";
import type { CertificateData } from "@/types/certificate";

interface ExportFormat {
  render: (data: CertificateData) => Promise<Uint8Array>;
  contentType: string;
  fileName: string;
}

function errorResponse(error: string, status: number): Response {
  return Response.json({ error }, { status });
}

/** Shared body of the export route handlers: validate, render, respond. */
export async function handleExport(
  request: Request,
  { render, contentType, fileName }: ExportFormat,
): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Request body must be valid JSON.", 400);
  }

  const parsed = parseCertificateData(body);
  if (!parsed.success) return errorResponse(parsed.error, 400);

  try {
    const file = await render(parsed.data);
    return new Response(Buffer.from(file), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(`Export of ${fileName} failed`, error);
    return errorResponse("Could not render the certificate.", 500);
  }
}
