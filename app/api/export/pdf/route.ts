import { handleExport } from "@/lib/export-route";
import { renderCertificatePdf } from "@/lib/render-certificate";

export function POST(request: Request): Promise<Response> {
  return handleExport(request, {
    render: renderCertificatePdf,
    contentType: "application/pdf",
    fileName: "certificate.pdf",
  });
}
