import { LogoMark } from "./LogoMark";
import styles from "./MinimalCertificate.module.css";
import type { TemplateProps } from "./templates";

export function MinimalCertificate({ data }: TemplateProps) {
  return (
    <div className={styles.template}>
      <div className={styles.body}>
        <div className={styles.label}>Traversy Media</div>
        <h2 className={styles.title}>Certificate</h2>
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
    </div>
  );
}
