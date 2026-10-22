import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  BookmarkIcon,
  ShareIcon,
  UserIcon,
} from "@/components/ui/icons/icons";
import { searchDetail } from "@/lib/data/jobs";
import type { Job } from "@/lib/data/jobs";
import styles from "./search-page.module.css";

export function JobDetail({ job }: { job: Job }) {
  return (
    <aside className={styles.detail}>
      <div className={styles.detailHead}>
        <div className={styles.detailCompany}>
          <Avatar
            initials={job.initials}
            color={job.color}
            size="md"
            label={job.company}
          />
          <div className={styles.detailCompanyText}>
            <span className={styles.detailCompanyName}>{job.company}</span>
            <span className={styles.detailCompanyMeta}>
              <span className={styles.star} aria-hidden="true">
                ★
              </span>{" "}
              4,2 · 318 ulasan · E-commerce
            </span>
          </div>
          <Link
            href={`/perusahaan/${job.companySlug}`}
            className={styles.detailCompanyLink}
          >
            Lihat
          </Link>
        </div>

        <h2 className={styles.detailTitle}>{job.title}</h2>
        <p className={styles.detailSalary}>{job.salaryFull}</p>

        <div className={styles.detailTags}>
          <Badge>{job.location}</Badge>
          <Badge>{job.workStyle}</Badge>
          <Badge>{job.employmentType}</Badge>
        </div>

        <div className={styles.detailActions}>
          <ButtonLink
            href={`/lamar/${job.slug}`}
            className={styles.applyButton}
          >
            Lamar sekarang
          </ButtonLink>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Simpan lowongan"
          >
            <BookmarkIcon size={20} />
          </button>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Bagikan lowongan"
          >
            <ShareIcon size={20} />
          </button>
        </div>

        <p className={styles.detailMeta}>
          Diposting {job.posted} · 34 pelamar · ditutup 30 Okt 2026
        </p>
      </div>

      <div className={styles.detailTabs} role="tablist" aria-label="Detail lowongan">
        <button
          type="button"
          role="tab"
          aria-selected="true"
          className={`${styles.detailTab} ${styles.detailTabActive}`}
        >
          Deskripsi
        </button>
        <button type="button" role="tab" aria-selected="false" className={styles.detailTab}>
          Perusahaan
        </button>
        <button type="button" role="tab" aria-selected="false" className={styles.detailTab}>
          Ulasan
        </button>
      </div>

      <div className={styles.detailBody}>
        <div className={styles.matchCard}>
          <span className={styles.matchIcon}>
            <UserIcon size={18} />
          </span>
          <div className={styles.matchText}>
            <strong>Kecocokan dengan profilmu</strong>
            <p>Masuk untuk melihat skor dan skill yang kurang.</p>
          </div>
        </div>

        <h3 className={styles.detailSectionTitle}>Yang akan kamu kerjakan</h3>
        <ul className={styles.detailList}>
          {searchDetail.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.detailSectionTitle}>Yang kami cari</h3>
        <ul className={styles.detailList}>
          {searchDetail.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className={styles.detailSectionTitle}>Mirip dengan lowongan ini</h3>
        <div className={styles.similarList}>
          {searchDetail.similar.map((similar) => (
            <article key={similar.slug} className={styles.similarJob}>
              <Avatar
                initials={similar.initials}
                color={similar.color}
                size="sm"
                className={styles.similarAvatar}
                label={similar.company}
              />
              <div className={styles.similarText}>
                <h4>{similar.title}</h4>
                <p>
                  {similar.company} · {similar.location}
                </p>
              </div>
              <span className={styles.similarSalary}>{similar.salaryShort}</span>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
