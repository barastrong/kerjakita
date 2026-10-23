import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import {
  courseCatalog,
  productDesignerPath as path,
} from "@/lib/data/courses";
import styles from "./course-list.module.css";

type CourseListProps = {
  q?: string;
  level?: string;
};

const LEVELS = ["Semua level", "Pemula", "Menengah"];

export function CourseList({ q, level }: CourseListProps) {
  const query = (q ?? "").trim().toLowerCase();
  const selectedLevel = level ?? "Semua level";

  const courses = courseCatalog.filter((course) => {
    const matchQuery = !query || course.title.toLowerCase().includes(query);
    const matchLevel =
      selectedLevel === "Semua level" || course.level === selectedLevel;

    return matchQuery && matchLevel;
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Belajar keahlian yang dicari perekrut
        </h1>
        <p className={styles.heroText}>
          Kursus singkat dan jalur belajar yang disesuaikan dengan lowongan yang
          kamu incar.
        </p>

        <form className={styles.search} action="/kursus" method="get" role="search">
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>Cari kursus</span>
            <input
              className={styles.searchInput}
              type="search"
              name="q"
              defaultValue={q ?? "Design system"}
            />
          </label>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>Kategori</span>
            <select className={styles.searchInput} name="kategori">
              <option>Desain produk</option>
            </select>
          </label>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>Level</span>
            <select
              className={styles.searchInput}
              name="level"
              defaultValue={level ?? "Semua level"}
            >
              {LEVELS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button type="submit" className={styles.searchButton}>
            Cari kursus
          </button>
        </form>
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <header className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              Jalur belajar untuk Product Designer
            </h2>
            <p className={styles.sectionText}>
              Disusun dari keahlian yang paling sering diminta di lowongan
              pilihanmu.
            </p>
          </header>

          <div className={styles.steps}>
            {path.steps.map((step, index) => {
              const isDone = step.state === "done";
              const isActive = step.state === "active";
              const progress = isDone ? 100 : isActive ? 60 : 0;

              return (
                <Link
                  key={step.title}
                  href="/kursus/jalur-belajar/product-designer"
                  className={`${styles.stepCard} ${
                    isActive ? styles.stepCardActive : ""
                  }`}
                >
                  <span
                    className={`${styles.stepNumber} ${
                      isDone ? styles.stepNumberDone : ""
                    } ${isActive ? styles.stepNumberActive : ""}`}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepMeta}>
                    {step.course.duration} · {step.course.modules}
                  </p>
                  <div className={styles.stepTrack} aria-hidden="true">
                    <span
                      className={`${styles.stepFill} ${
                        isDone ? styles.stepFillDone : ""
                      } ${isActive ? styles.stepFillActive : ""}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span
                    className={`${styles.stepTag} ${
                      isDone ? styles.stepTagDone : ""
                    } ${isActive ? styles.stepTagActive : ""}`}
                  >
                    {step.status}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <header className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Kursus populer</h2>
            <p className={styles.sectionText}>
              Dipilih oleh pencari kerja di bidang desain.
            </p>
          </header>

          <div className={styles.courses}>
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/kursus/${course.slug}`}
                className={styles.courseCard}
              >
                <div
                  className={styles.courseImage}
                  style={{ backgroundColor: course.color }}
                  aria-hidden="true"
                >
                  {course.initials}
                </div>
                <div className={styles.courseInfo}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseMeta}>
                    {course.provider} · {course.duration} · {course.level}
                  </p>
                </div>
                <div className={styles.courseFooter}>
                  <span className={styles.rating}>
                    <span aria-hidden="true">★ </span>
                    {course.rating}
                  </span>
                  <span
                    className={`${styles.price} ${
                      course.price === "Gratis" ? styles.priceFree : ""
                    }`}
                  >
                    {course.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {courses.length === 0 ? (
            <p className={styles.empty}>
              Tidak ada kursus yang cocok. Coba kata kunci atau level lain.
            </p>
          ) : null}
        </section>
      </div>
      </main>

      <Footer />
    </div>
  );
}
