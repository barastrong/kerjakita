import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import {
  courseCatalog,
  getCourse,
  productDesignerPath as path,
} from "@/lib/data/courses";
import styles from "./course-list.module.css";

type CourseListProps = {
  q?: string;
  level?: string;
};

const LEVELS = ["Semua level", "Pemula", "Menengah"];

export function CourseList({ q, level }: CourseListProps) {
  const query = (q ?? "").trim();
  const selectedLevel =
    level && LEVELS.includes(level) ? level : "Semua level";
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const courses = courseCatalog
    .map((course) => {
      const detail = getCourse(course.slug);

      return {
        ...course,
        category: detail?.category ?? "Kursus",
        summary: detail?.summary ?? "",
        skills: detail?.skills ?? [],
      };
    })
    .filter((course) => {
      const searchable = [
        course.title,
        course.provider,
        course.level,
        ...course.skills,
      ]
        .join(" ")
        .toLowerCase();

      const matchQuery = terms.every((term) => searchable.includes(term));
      const matchLevel =
        selectedLevel === "Semua level" || course.level === selectedLevel;

      return matchQuery && matchLevel;
    });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 className={styles.heroTitle}>
              Belajar keahlian yang dicari perekrut
            </h1>
            <p className={styles.heroText}>
              Kursus singkat dan jalur belajar dari keahlian yang diminta
              lowongan Product Designer.
            </p>

            <form
              className={styles.search}
              action="/kursus"
              method="get"
              role="search"
            >
              <label className={styles.searchField}>
                <span className={styles.searchLabel}>Cari kursus</span>
                <input
                  className={styles.searchInput}
                  type="search"
                  name="q"
                  placeholder="Design system, Figma, riset..."
                  defaultValue={q ?? ""}
                />
              </label>
              <label className={styles.searchLevel}>
                <span className={styles.searchLabel}>Level</span>
                <select
                  className={styles.searchInput}
                  name="level"
                  defaultValue={selectedLevel}
                >
                  {LEVELS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className={styles.searchButton}>
                Cari kursus
              </button>
            </form>
          </div>
        </section>

        <div className={styles.content}>
          <section className={styles.section} aria-labelledby="jalur-belajar">
            <header className={styles.sectionHead}>
              <div className={styles.sectionHeading}>
                <h2 id="jalur-belajar" className={styles.sectionTitle}>
                  {path.title}
                </h2>
                <Badge tone="neutral">Contoh data</Badge>
              </div>
              <p className={styles.sectionText}>
                Empat langkah dari riset pengguna sampai portofolio. Progres di
                bawah adalah contoh, bukan progres akunmu.
              </p>
            </header>

            <div className={styles.pathPanel}>
              {path.steps.map((step, index) => {
                const isDone = step.state === "done";
                const isActive = step.state === "active";
                const progress = isDone ? 100 : isActive ? 60 : 0;

                return (
                  <Link
                    key={step.title}
                    href="/kursus/jalur-belajar/product-designer"
                    className={styles.pathRow}
                  >
                    <span
                      className={`${styles.pathIndex} ${
                        isDone ? styles.pathIndexDone : ""
                      } ${isActive ? styles.pathIndexActive : ""}`}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span className={styles.pathBody}>
                      <span className={styles.pathTitle}>{step.title}</span>
                      <span className={styles.pathMeta}>
                        {step.course.duration} · {step.course.modules} ·{" "}
                        {step.skills.join(", ")}
                      </span>
                      <span className={styles.pathTrack} aria-hidden="true">
                        <span
                          className={`${styles.pathFill} ${
                            isDone ? styles.pathFillDone : ""
                          } ${isActive ? styles.pathFillActive : ""}`}
                          style={{ width: `${progress}%` }}
                        />
                      </span>
                    </span>
                    <span
                      className={`${styles.pathTag} ${
                        isDone ? styles.pathTagDone : ""
                      } ${isActive ? styles.pathTagActive : ""}`}
                    >
                      {step.status}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="katalog-kursus">
            <header className={styles.sectionHead}>
              <div className={styles.sectionHeading}>
                <h2 id="katalog-kursus" className={styles.sectionTitle}>
                  Katalog kursus
                </h2>
                <Badge tone="neutral">Contoh data</Badge>
              </div>
              <div className={styles.sectionAside}>
                {courses.length > 0 ? (
                  <p className={styles.sectionText}>
                    {courses.length} kursus · Pilih berdasarkan durasi, level,
                    dan keahlian yang diminta lowongan.
                  </p>
                ) : null}
                <Link
                  className={styles.sectionLink}
                  href="/lowongan?q=Product%20Designer"
                >
                  Lihat lowongan Product Designer
                </Link>
              </div>
            </header>

            {courses.length > 0 ? (
              <div className={styles.catalog}>
                {courses.map((course) => (
                  <article key={course.slug} className={styles.courseCard}>
                    <Link
                      href={`/kursus/${course.slug}`}
                      className={styles.courseLink}
                    >
                      <div
                        className={styles.courseCover}
                        style={{ backgroundColor: course.color }}
                      >
                        <span className={styles.courseKicker}>
                          {course.category}
                        </span>
                        <h3 className={styles.courseCoverTitle}>
                          {course.title}
                        </h3>
                        <span className={styles.courseCoverMeta}>
                          {course.duration} · {course.level}
                        </span>
                      </div>
                      <div className={styles.courseBody}>
                        <div className={styles.courseProviderRow}>
                          <span className={styles.courseProvider}>
                            {course.provider}
                          </span>
                          <span
                            className={`${styles.price} ${
                              course.price === "Gratis"
                                ? styles.priceFree
                                : ""
                            }`}
                          >
                            {course.price}
                          </span>
                        </div>
                        <p className={styles.courseSummary}>
                          {course.summary}
                        </p>
                        <div className={styles.courseSkills}>
                          {course.skills.map((skill) => (
                            <span key={skill} className={styles.skill}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p className={styles.emptyTitle}>Tidak ada kursus yang cocok</p>
                <p className={styles.emptyText}>
                  {query ? `Tidak ada hasil untuk “${query}”. ` : ""}
                  Coba kata kunci atau level lain.
                </p>
                <Link className={styles.emptyLink} href="/kursus">
                  Reset pencarian
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
