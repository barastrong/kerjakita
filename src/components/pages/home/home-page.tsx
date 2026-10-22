import { Footer } from "@/components/layout/footer";
import {
  categories,
  featuredJobs,
  hero,
  hiringCompanies,
  steps,
} from "@/lib/data/home";
import { BrowseFields } from "./browse-fields";
import { FeaturedJobs } from "./featured-jobs";
import { Hero } from "./hero";
import { HiringCompanies } from "./hiring-companies";
import { HowItWorks } from "./how-it-works";
import styles from "./home-page.module.css";

export function HomePage() {
  return (
    <div className={styles.page}>
      <Hero data={hero} />
      <main className={styles.content}>
        <BrowseFields categories={categories} />
        <FeaturedJobs jobs={featuredJobs} />
        <HiringCompanies companies={hiringCompanies} />
        <HowItWorks steps={steps} />
      </main>
      <Footer />
    </div>
  );
}
