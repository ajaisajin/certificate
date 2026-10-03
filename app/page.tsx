import { BlackBorderCertificate } from "@/components/certificate/BlackBorderCertificate";
import type { CertificateData } from "@/types/certificate";

const PLACEHOLDER_CERTIFICATE: CertificateData = {
  recipientName: "Priya Raghavan",
  courseTitle: "Modern JavaScript From The Beginning 2.0",
  date: "October 1, 2026",
  instructorName: "Brad Traversy",
};

export default function Home() {
  return (
    <main className="flex flex-1 overflow-x-auto bg-stage p-12">
      <div className="m-auto shadow-stage">
        <BlackBorderCertificate data={PLACEHOLDER_CERTIFICATE} />
      </div>
    </main>
  );
}
