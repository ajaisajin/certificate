import { Cormorant_Garamond } from "next/font/google";
import type { CertificateData } from "@/types/certificate";
import styles from "./BlackBorderCertificate.module.css";
import { Flourish } from "./Flourish";
import { LogoMark } from "./LogoMark";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const FLOURISH_CORNERS = [styles.tl, styles.tr, styles.bl, styles.br];

interface BlackBorderCertificateProps {
  data: CertificateData;
}

export function BlackBorderCertificate({ data }: BlackBorderCertificateProps) {
  return (
    <article className={`${cormorant.variable} ${styles.certificate}`}>
      {FLOURISH_CORNERS.map((corner) => (
        <Flourish key={corner} className={`${styles.flourish} ${corner}`} />
      ))}
      <div className={styles.body}>
        <div className={styles.label}>Traversy Media</div>
        <h1 className={styles.title}>Certificate</h1>
        <div className={styles.titleSub}>of completion</div>
        <div className={`${styles.label} ${styles.presented}`}>
          This certificate is proudly presented to
        </div>
        <div className={styles.name}>{data.recipientName}</div>
        <div className={styles.for}>for successfully completing the course</div>
        <div className={styles.course}>{data.courseTitle}</div>
        <div className={styles.footer}>
          <div className={styles.sign}>
            <div className={styles.signValue}>{data.instructorName}</div>
            <div className={styles.label}>Instructor</div>
          </div>
          <LogoMark className={styles.logo} textClassName={styles.logoText} />
          <div className={styles.sign}>
            <div className={styles.signValue}>{data.date}</div>
            <div className={styles.label}>Date</div>
          </div>
        </div>
      </div>
    </article>
  );
}
