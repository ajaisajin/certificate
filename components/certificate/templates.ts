import type { ComponentType } from "react";
import type { CertificateData, TemplateId } from "@/types/certificate";
import { BlackBorderCertificate } from "./BlackBorderCertificate";
import { ClassicCertificate } from "./ClassicCertificate";
import { MinimalCertificate } from "./MinimalCertificate";

export interface TemplateProps {
  data: CertificateData;
}

interface TemplateDefinition {
  name: string;
  Component: ComponentType<TemplateProps>;
}

// To add a template: add its id to TEMPLATE_IDS, then its entry here.
export const TEMPLATES: Record<TemplateId, TemplateDefinition> = {
  "black-border": { name: "Black Border", Component: BlackBorderCertificate },
  classic: { name: "Classic", Component: ClassicCertificate },
  minimal: { name: "Minimal", Component: MinimalCertificate },
};
