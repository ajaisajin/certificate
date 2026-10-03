import { BlackBorderCertificate } from "@/components/certificate/BlackBorderCertificate";
import type { CertificateData } from "@/types/certificate";

interface CertificatePreviewProps {
  data: CertificateData;
}

// --preview-w and --preview-h must equal the template's --cert-w and --cert-h.
export function CertificatePreview({ data }: CertificatePreviewProps) {
  return (
    <section
      aria-label="Live preview"
      className="flex flex-col gap-6 [--preview-h:816px] [--preview-scale:0.3] [--preview-w:1056px] sm:[--preview-scale:0.5] xl:[--preview-scale:0.58]"
    >
      <div className="flex w-[calc(var(--preview-w)*var(--preview-scale))] items-center justify-between text-sm text-muted">
        <span>Black Border</span>
        <span>Live preview · Letter landscape</span>
      </div>
      <div className="h-[calc(var(--preview-h)*var(--preview-scale))] w-[calc(var(--preview-w)*var(--preview-scale))] shadow-stage">
        <div className="origin-top-left scale-(--preview-scale)">
          <BlackBorderCertificate data={data} />
        </div>
      </div>
    </section>
  );
}
