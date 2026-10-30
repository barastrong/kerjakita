import { ButtonLink } from "@/components/ui/button/button";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import {
  ApplicantHeading,
  ApplicationStatus,
  CompanyMark,
} from "./applicant-parts";
import type { Application, TimelineState } from "./lamaran-data";
import styles from "./applicant.module.css";

const FILES = [
  {
    type: "CV",
    name: "Rani-Ayu-Pratama.pdf",
    meta: "Curriculum vitae - 1,2 MB",
  },
  {
    type: "PF",
    name: "Portofolio Rani Ayu",
    meta: "behance.net/rani-desain",
  },
];

function timelineDotClass(state: TimelineState) {
  if (state === "done") return styles.timelineDotDone;
  if (state === "current") return styles.timelineDotCurrent;
  if (state === "stopped") return styles.timelineDotStopped;
  return styles.timelineDotUpcoming;
}

export function LamaranDetailPage({
  application,
}: {
  application: Application;
}) {
  return (
    <div className={dashboardStyles.mainInner}>
      <ApplicantHeading
        title="Detail lamaran"
        subtitle={`Lamaran ${application.role} di ${application.company}.`}
        action={
          <ButtonLink
            href="/pelamar/lamaran"
            variant="outline"
            size="sm"
            className={styles.headerButton}
          >
            Kembali
          </ButtonLink>
        }
      />

      <section className={styles.detailHero}>
        <CompanyMark
          initials={application.initials}
          color={application.color}
          size="lg"
        />
        <div className={styles.detailHeroInfo}>
          <ApplicationStatus
            status={application.status}
            tone={application.tone}
          />
          <h2 className={styles.detailRole}>{application.role}</h2>
          <p className={styles.detailCompany}>
            {application.company} - {application.location}
          </p>
          <div className={styles.detailMeta}>
            <span className={styles.detailPill}>{application.workType}</span>
            <span className={styles.detailPill}>{application.salary}</span>
            <span className={styles.detailPill}>
              Dikirim {application.sentFull}
            </span>
          </div>
        </div>
        <div className={styles.detailMatch}>
          <span className={styles.detailMatchValue}>{application.match}%</span>
          <span className={styles.detailMatchLabel}>kecocokan</span>
        </div>
      </section>

      <div className={styles.profileGrid}>
        <div className={styles.profileMain}>
          <section className={styles.detailCard}>
            <h2 className={styles.detailTitle}>Progres lamaran</h2>
            <ol className={styles.timeline}>
              {application.timeline.map((event) => (
                <li key={event.label} className={styles.timelineItem}>
                  <span
                    className={`${styles.timelineDot} ${timelineDotClass(
                      event.state,
                    )}`}
                    aria-hidden="true"
                  />
                  <div className={styles.timelineBody}>
                    <p className={styles.timelineLabel}>{event.label}</p>
                    <p className={styles.timelineDate}>{event.date}</p>
                    {event.note ? (
                      <p className={styles.timelineNote}>{event.note}</p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className={styles.detailCard}>
            <h2 className={styles.detailTitle}>Catatan perekrut</h2>
            <p className={styles.detailNote}>{application.note}</p>
          </section>
        </div>

        <aside className={styles.profileSide}>
          <section className={styles.detailCard}>
            <h2 className={styles.detailTitle}>Rincian lamaran</h2>
            <dl className={styles.detailFacts}>
              <div className={styles.detailFact}>
                <dt>Dikirim</dt>
                <dd>{application.sentFull}</dd>
              </div>
              <div className={styles.detailFact}>
                <dt>Status</dt>
                <dd>
                  <ApplicationStatus
                    status={application.status}
                    tone={application.tone}
                  />
                </dd>
              </div>
              <div className={styles.detailFact}>
                <dt>Lokasi</dt>
                <dd>{application.location}</dd>
              </div>
              <div className={styles.detailFact}>
                <dt>Tipe kerja</dt>
                <dd>{application.workType}</dd>
              </div>
              <div className={styles.detailFact}>
                <dt>Gaji</dt>
                <dd>{application.salary}</dd>
              </div>
              <div className={styles.detailFact}>
                <dt>Kecocokan</dt>
                <dd>{application.match}%</dd>
              </div>
            </dl>
          </section>

          <section className={styles.detailCard}>
            <h2 className={styles.detailTitle}>Berkas terkirim</h2>
            <ul className={styles.fileList}>
              {FILES.map((file) => (
                <li key={file.name} className={styles.fileRow}>
                  <span className={styles.fileIcon}>{file.type}</span>
                  <div>
                    <p className={styles.fileName}>{file.name}</p>
                    <p className={styles.fileMeta}>{file.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
