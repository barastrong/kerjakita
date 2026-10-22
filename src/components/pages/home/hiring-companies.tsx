import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { SectionHeading } from "@/components/ui/section-heading";
import type { CompanyCard } from "@/lib/data/home";
import styles from "./home-page.module.css";

type HiringCompaniesProps = {
  companies: CompanyCard[];
};

export function HiringCompanies({ companies }: HiringCompaniesProps) {
  return (
    <section className={styles.section}>
      <SectionHeading title="Perusahaan yang sedang merekrut" />
      <div className={styles.companyGrid}>
        {companies.map((company) => (
          <Link
            key={company.slug}
            href={`/perusahaan/${company.slug}`}
            className={styles.companyCard}
          >
            <Avatar
              initials={company.initials}
              color={company.color}
              label={company.name}
            />
            <span className={styles.companyText}>
              <span className={styles.companyName}>{company.name}</span>
              <span className={styles.companyIndustry}>{company.industry}</span>
            </span>
            <span className={styles.companyJobs}>
              {company.openJobs} lowongan
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
