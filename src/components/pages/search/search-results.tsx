import { ButtonLink } from "@/components/ui/button";
import { SearchIcon } from "@/components/ui/icons/icons";
import type { Job } from "@/lib/data/jobs";
import { JobCard } from "./job-card";
import { SearchSort } from "./search-sort";
import styles from "./search-page.module.css";

type SortOption = {
  value: string;
  label: string;
};

function EmptyState() {
  return (
    <div className={styles.empty}>
      <span className={styles.emptyIcon}>
        <SearchIcon size={22} />
      </span>
      <h3 className={styles.emptyTitle}>Tidak ada lowongan yang cocok</h3>
      <p className={styles.emptyText}>
        Coba hapus satu filter atau gunakan kata kunci yang lebih umum.
      </p>
      <ButtonLink href="/lowongan" variant="outline" size="sm">
        Cari semua lowongan
      </ButtonLink>
    </div>
  );
}

export function SearchResults({
  jobs,
  query,
  companyName,
  sort,
  sortLabel,
  sortOptions,
}: {
  jobs: Job[];
  query: string;
  companyName?: string;
  sort: string;
  sortLabel: string;
  sortOptions: SortOption[];
}) {
  return (
    <section className={styles.results} aria-labelledby="results-title">
      <div className={styles.resultsHead}>
        <div className={styles.resultsHeading}>
          <div className={styles.resultsTitleRow}>
            <h2 id="results-title" className={styles.resultsTitle}>
              {jobs.length} lowongan
              {companyName ? ` di ${companyName}` : ""}
              {query ? ` untuk “${query}”` : ""}
            </h2>
            <span className={styles.resultsDataTag}>Contoh data</span>
          </div>
          <p className={styles.resultsSubtitle}>
            Diurutkan: {sortLabel}. Angka diambil dari daftar lowongan contoh
            di halaman ini.
          </p>
        </div>
        <SearchSort value={sort} options={sortOptions} />
      </div>

      {jobs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.resultList}>
          {jobs.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}
