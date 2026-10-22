import { notFound } from "next/navigation";
import { getCompany } from "@/lib/data/companies";
import { CompanyAbout } from "./company-about";
import { CompanyCover } from "./company-cover";
import { CompanyFacilities } from "./company-facilities";
import { CompanyJobs } from "./company-jobs";
import { CompanyRating } from "./company-rating";
import { CompanyReviews } from "./company-reviews";
import { CompanySalaries } from "./company-salaries";
import { CompanyTabs } from "./company-tabs";
import styles from "./company-page.module.css";

type CompanyPageProps = {
  slug: string;
};

export function CompanyPage({ slug }: CompanyPageProps) {
  const company = getCompany(slug);

  if (!company) notFound();

  return (
    <div className={styles.page}>
      <CompanyCover company={company} />
      <CompanyTabs company={company} />
      <main className={styles.content}>
        <div className={styles.main}>
          <CompanyAbout company={company} />
          <CompanyFacilities company={company} />
          <CompanyRating company={company} />
          <CompanyReviews company={company} />
        </div>
        <aside className={styles.sidebar}>
          <CompanyJobs company={company} />
          <CompanySalaries company={company} />
        </aside>
      </main>
    </div>
  );
}
