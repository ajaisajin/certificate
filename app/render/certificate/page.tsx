import { Certificate } from "@/components/certificate/Certificate";
import {
  DEFAULT_TEMPLATE_ID,
  isTemplateId,
  type CertificateData,
} from "@/types/certificate";

type SearchParams = { [key: string]: string | string[] | undefined };

function text(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

// Internal page the export route loads in headless Chrome. It shows only the
// certificate, at native size, so the capture matches the live preview.
export default async function RenderCertificatePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const data: CertificateData = {
    recipientName: text(params.recipientName),
    courseTitle: text(params.courseTitle),
    date: text(params.date),
    instructorName: text(params.instructorName),
    templateId: isTemplateId(params.templateId)
      ? params.templateId
      : DEFAULT_TEMPLATE_ID,
  };

  return <Certificate data={data} />;
}
