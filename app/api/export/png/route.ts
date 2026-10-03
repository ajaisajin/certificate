import { handleExport } from "@/lib/export-route";
import { renderCertificatePng } from "@/lib/render-certificate";

export function POST(request: Request): Promise<Response> {
  return handleExport(request, {
    render: renderCertificatePng,
    contentType: "image/png",
    fileName: "certificate.png",
  });
}
