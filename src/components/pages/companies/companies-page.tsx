import { companyDirectory } from "@/lib/data/company-directory";
import { CompaniesHero } from "./companies-hero";
import { CompanyGrid } from "./company-grid";
import styles from "./companies-page.module.css";

type CompaniesPageProps = {
  query?: string;
  industry?: string;
};

export function CompaniesPage({
  query = "",
  industry = "",
}: CompaniesPageProps) {
  const q = query.trim().toLowerCase();

  const companies = companyDirectory
    .filter((company) => !q || company.name.toLowerCase().includes(q))
    .filter((company) => !industry || company.industry === industry)
    .sort(
      (a, b) =>
        parseFloat(b.rating.replace(",", ".")) -
        parseFloat(a.rating.replace(",", ".")),
    );

  return (
    <div className={styles.page}>
      <CompaniesHero query={query} industry={industry} />
      <CompanyGrid companies={companies} filtered={Boolean(q || industry)} />
    </div>
  );
}
