import { parseCertificateData } from "@/lib/certificate-input";
import { renderCertificatePng } from "@/lib/render-png";

function errorResponse(error: string, status: number): Response {
  return Response.json({ error }, { status });
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Request body must be valid JSON.", 400);
  }

  const parsed = parseCertificateData(body);
  if (!parsed.success) return errorResponse(parsed.error, 400);

  try {
    const png = await renderCertificatePng(parsed.data);
    return new Response(Buffer.from(png), {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="certificate.png"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("PNG export failed", error);
    return errorResponse("Could not render the certificate.", 500);
  }
}
