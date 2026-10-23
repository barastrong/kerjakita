import type { CompanyDetail } from "@/lib/data/companies";
import { CompanyCover } from "./company-cover";
import { CompanyJobs } from "./company-jobs";
import { CompanyRating } from "./company-rating";
import { CompanyReviews } from "./company-reviews";
import { CompanySalaries } from "./company-salaries";
import { CompanyTabs } from "./company-tabs";
import styles from "./company-page.module.css";

export type CompanySectionId = "ulasan" | "gaji" | "lowongan";

type CompanySectionProps = {
  company: CompanyDetail;
  section: CompanySectionId;
};

export function CompanySection({ company, section }: CompanySectionProps) {
  return (
    <div className={styles.page}>
      <CompanyCover company={company} />
      <CompanyTabs company={company} active={section} />
      <main className={styles.sectionContent}>
        <div className={styles.sectionColumn}>
          {section === "ulasan" && (
            <>
              <CompanyRating company={company} />
              <CompanyReviews company={company} />
            </>
          )}
          {section === "gaji" && <CompanySalaries company={company} />}
          {section === "lowongan" && <CompanyJobs company={company} />}
        </div>
      </main>
    </div>
  );
}
