import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckIcon,
  ChevronRightIcon,
} from "@/components/ui/icons/icons";
import { productDesignerPath as path } from "@/lib/data/courses";
import styles from "./course-pages.module.css";

export function CoursePath() {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbWrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/kursus" className={styles.breadcrumbLink}>
            Kursus
          </Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbLink}>Jalur belajar</span>
          <span className={styles.breadcrumbSep} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent}>Product Designer</span>
        </nav>
      </div>

      <section className={`${styles.hero} ${styles.pathHero}`}>
        <div className={styles.heroLeft}>
          <div className={styles.pathTags}>
            <span>{path.stepsCount}</span>
            <span>{path.duration}</span>
            <span>{path.certificate}</span>
          </div>

          <h1 className={`${styles.heroTitle} ${styles.pathTitle}`}>
            {path.title}
          </h1>
          <p className={styles.heroText}>{path.description}</p>

          <div className={styles.heroActions}>
            <ButtonLink
              href={`/masuk?next=/kursus/jalur-belajar/product-designer`}
              size="md"
            >
              Mulai jalur belajar
            </ButtonLink>
            <ButtonLink href="/kursus" variant="outline" size="md">
              Lihat semua kursus
            </ButtonLink>
          </div>
        </div>

        <Card className={styles.progressCard}>
          <p className={styles.progressLabel}>Progres jalur ini</p>
          <p className={styles.progressValue}>{path.progress}%</p>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuenow={path.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progres jalur belajar"
          >
            <span
              className={styles.progressFill}
              style={{ width: `${path.progress}%` }}
            />
          </div>
          <p className={styles.progressNote}>{path.progressNote}</p>
        </Card>
      </section>

      <div className={styles.content}>
        <main className={styles.main}>
          <div className={styles.steps}>
            {path.steps.map((step, index) => {
              const isDone = step.state === "done";
              const isActive = step.state === "active";

              return (
                <div key={step.title} className={styles.step}>
                  <div className={styles.stepMarker}>
                    <span
                      className={`${styles.markerCircle} ${
                        isDone ? styles.markerDone : ""
                      } ${isActive ? styles.markerActive : ""}`}
                      aria-hidden="true"
                    >
                      {isDone ? <CheckIcon size={16} /> : index + 1}
                    </span>
                    {index < path.steps.length - 1 ? (
                      <span
                        className={`${styles.markerLine} ${
                          isDone ? styles.markerLineDone : ""
                        }`}
                        aria-hidden="true"
                      />
                    ) : null}
                  </div>

                  <Card
                    className={`${styles.stepCard} ${
                      isActive ? styles.stepCardActive : ""
                    } ${isDone ? styles.stepCardDone : ""}`}
                  >
                    <div className={styles.stepHead}>
                      <span
                        className={`${styles.stepStatus} ${
                          isActive ? styles.stepStatusActive : ""
                        } ${isDone ? styles.stepStatusDone : ""}`}
                      >
                        {step.status}
                      </span>
                    </div>
                    <h2 className={styles.stepTitle}>{step.title}</h2>
                    <p className={styles.stepDescription}>{step.description}</p>

                    <Link
                      href={`/kursus/${step.course.slug}`}
                      className={styles.stepCourse}
                    >
                      <span
                        className={styles.stepCourseLogo}
                        style={{ backgroundColor: step.course.color }}
                        aria-hidden="true"
                      >
                        {step.course.initials}
                      </span>
                      <span className={styles.stepCourseInfo}>
                        <span className={styles.stepCourseName}>
                          {step.course.title}
                        </span>
                        <span className={styles.stepCourseMeta}>
                          {step.course.provider} · {step.course.duration} ·{" "}
                          {step.course.modules}
                        </span>
                      </span>
                      <span className={styles.stepCourseAction}>
                        Lihat kursus
                      </span>
                    </Link>

                    {isActive ? (
                      <div className={styles.stepProgress}>
                        <div className={styles.stepProgressTrack}>
                          <span style={{ width: "60%" }} />
                        </div>
                        <span>60% selesai</span>
                      </div>
                    ) : null}

                    <div className={styles.stepSkills}>
                      <span className={styles.skillLabel}>Skill:</span>
                      {step.skills.map((skill) => (
                        <span key={skill} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </main>

        <aside className={styles.sidebar}>
          <Card className={styles.summaryCard}>
            <h2 className={styles.cardTitle}>Ringkasan jalur</h2>
            <div className={styles.summaryList}>
              {path.summary.map((item) => (
                <div key={item.label} className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>{item.label}</span>
                  <span className={styles.summaryValue}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className={styles.pathJobsCard}>
            <h2 className={styles.cardTitle}>Lowongan yang bisa kamu lamar</h2>
            <p className={styles.pathJobsText}>
              Setelah menyelesaikan jalur ini, kamu cocok untuk peran berikut.
            </p>
            <div className={styles.pathJobs}>
              {path.jobs.map((job) => (
                <Link key={job.title} href={job.href} className={styles.pathJob}>
                  <span
                    className={styles.pathJobLogo}
                    style={{ backgroundColor: job.color }}
                    aria-hidden="true"
                  >
                    {job.initials}
                  </span>
                  <span className={styles.pathJobInfo}>
                    <span className={styles.pathJobTitle}>{job.title}</span>
                    <span className={styles.pathJobMeta}>
                      {job.company} ·{" "}
                      <strong className={styles.pathJobSalary}>
                        {job.meta}
                      </strong>
                    </span>
                  </span>
                  <ChevronRightIcon
                    size={15}
                    className={styles.pathJobChevron}
                  />
                </Link>
              ))}
            </div>
          </Card>

          <div className={styles.startCard}>
            <h2 className={styles.startTitle}>Siap mulai belajar?</h2>
            <p className={styles.startText}>
              Masuk atau daftar untuk menyimpan progresmu.
            </p>
            <ButtonLink
              href={`/masuk?next=/kursus/jalur-belajar/product-designer`}
              variant="outline"
              size="sm"
            >
              Mulai belajar sekarang
            </ButtonLink>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
