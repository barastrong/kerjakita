import { Footer } from "@/components/layout/footer";
import { BrowseGroups } from "./browse-groups";
import { JobAlert } from "./job-alert";
import { JobsHero } from "./jobs-hero";
import { LatestJobs } from "./latest-jobs";
import { PopularSearches } from "./popular-searches";
import styles from "./jobs-page.module.css";

export function JobsPage() {
  return (
    <div className={styles.page}>
      <JobsHero />
      <main className={styles.content}>
        <PopularSearches />
        <BrowseGroups />
        <LatestJobs />
        <JobAlert />
      </main>
      <Footer />
    </div>
  );
}
