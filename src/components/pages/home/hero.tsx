import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { HeroData } from "@/lib/data/home";
import styles from "./home-page.module.css";

type HeroProps = {
  data: HeroData;
};

export function Hero({ data }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{data.title}</h1>
        <p className={styles.heroSubtitle}>{data.subtitle}</p>

        <form className={styles.searchBar} action="/lowongan">
          {data.fields.map((field, index) => (
            <div
              key={field.name}
              className={`${styles.searchField} ${
                index === 0
                  ? styles.searchFieldWide
                  : index === 1
                    ? styles.searchFieldMedium
                    : styles.searchFieldShort
              }`}
            >
              <label htmlFor={`hero-${field.name}`}>{field.label}</label>
              <input
                id={`hero-${field.name}`}
                name={field.name}
                placeholder={field.value}
              />
            </div>
          ))}
          <Button type="submit" size="lg" className={styles.searchButton}>
            Cari lowongan
          </Button>
        </form>

        <div className={styles.popular}>
          <span className={styles.popularLabel}>Populer:</span>
          {data.popular.map((term) => (
            <Link
              key={term}
              href={`/lowongan?q=${encodeURIComponent(term)}`}
              className={styles.popularPill}
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      <Link
        href={`/perusahaan/${data.match.companySlug}`}
        className={styles.matchCard}
        aria-label={`Lihat ${data.match.title} di ${data.match.company}`}
      >
        <div className={styles.matchHeader}>
          <Avatar
            initials={data.match.initials}
            color={data.match.color}
            label={data.match.company}
          />
          <div className={styles.matchTitles}>
            <span className={styles.matchTitle}>{data.match.title}</span>
            <span className={styles.matchCompany}>{data.match.company}</span>
          </div>
        </div>

        <div className={styles.scoreRow}>
          <span className={styles.score}>{data.match.score}%</span>
          <span className={styles.scoreNote}>cocok dengan profilmu</span>
        </div>

        {data.match.skills.map((skill) => (
          <div key={skill.label} className={styles.skillRow}>
            <span className={styles.skillLabel}>{skill.label}</span>
            <Progress
              value={skill.value}
              tone={skill.tone}
              className={styles.matchTrack}
            />
            <span className={styles.level}>{skill.level}</span>
          </div>
        ))}
      </Link>
    </section>
  );
}
