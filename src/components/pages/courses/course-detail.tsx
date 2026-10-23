import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@/components/ui/icons/icons";
import { designSystemCourse as course } from "@/lib/data/courses";
import styles from "./course-pages.module.css";

export function CourseDetail() {
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
          <span className={styles.breadcrumbLink}>{course.category}</span>
          <span className={styles.breadcrumbSep} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent}>{course.title}</span>
        </nav>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.tagRow}>
            <span className={styles.tagLight}>{course.level}</span>
            <span className={styles.tagMint}>Bersertifikat</span>
            <span className={styles.tagLight}>{course.category}</span>
          </div>

          <h1 className={styles.heroTitle}>{course.title}</h1>
          <p className={styles.heroText}>{course.summary}</p>

          <div className={styles.heroMeta}>
            <span className={styles.ratingStar} aria-hidden="true">
              ★
            </span>
            <strong>{course.rating}</strong>
            <span>({course.reviewCount} ulasan)</span>
            <span className={styles.metaDot} aria-hidden="true">
              ·
            </span>
            <span>{course.duration}</span>
            <span className={styles.metaDot} aria-hidden="true">
              ·
            </span>
            <span>{course.modules}</span>
            <span className={styles.metaDot} aria-hidden="true">
              ·
            </span>
            <span>{course.lessons}</span>
            <span className={styles.metaDot} aria-hidden="true">
              ·
            </span>
            <span>{course.updated}</span>
          </div>

          <div className={styles.instructorInline}>
            <span
              className={styles.instructorMini}
              style={{ backgroundColor: "#0b7a62" }}
              aria-hidden="true"
            >
              {course.instructor.initials}
            </span>
            <span>
              Dibuat oleh <strong>{course.instructor.name}</strong> ·{" "}
              {course.instructor.role}
            </span>
          </div>
        </div>

        <div
          id="preview"
          className={styles.preview}
          role="img"
          aria-label="Pratinjau video kursus Design System dari Nol"
        >
          <span className={styles.previewPlay} aria-hidden="true" />
          <span className={styles.previewCaption}>
            Pratinjau gratis · 2:30
          </span>
        </div>
      </section>

      <div className={styles.content}>
        <main className={styles.main}>
          <nav className={styles.tabs} aria-label="Bagian kursus">
            <a href="#tentang" className={styles.tabActive}>
              Tentang
            </a>
            <a href="#kurikulum" className={styles.tab}>
              Kurikulum
            </a>
            <a href="#pengajar" className={styles.tab}>
              Pengajar
            </a>
            <a href="#ulasan" className={styles.tab}>
              Ulasan
            </a>
          </nav>

          <Card id="tentang" className={`${styles.card} ${styles.anchor}`}>
            <h2 className={styles.cardTitle}>Yang akan kamu pelajari</h2>
            <ul className={styles.learnGrid}>
              {course.learn.map((item) => (
                <li key={item} className={styles.learnItem}>
                  <span className={styles.check} aria-hidden="true">
                    <CheckIcon size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card id="kurikulum" className={`${styles.card} ${styles.anchor}`}>
            <h2 className={styles.cardTitle}>Kurikulum</h2>
            <p className={styles.cardSubtitle}>
              {course.modules} · {course.lessons} · {course.duration}
            </p>

            <div className={styles.modules}>
              {course.curriculum.map((module, index) =>
                module.items ? (
                  <details
                    key={module.title}
                    open={index === 0}
                    className={`${styles.module} ${styles.moduleOpen}`}
                  >
                    <summary className={styles.moduleHead}>
                      <span className={styles.moduleTitle}>{module.title}</span>
                      <span className={styles.moduleMeta}>
                        {module.lessons} · {module.duration}
                      </span>
                      <ChevronDownIcon
                        size={18}
                        className={styles.chevron}
                      />
                    </summary>
                    <ul className={styles.lessonList}>
                      {module.items.map((lesson) => (
                        <li key={lesson.title} className={styles.lesson}>
                          <span
                            className={styles.lessonDot}
                            aria-hidden="true"
                          />
                          <span className={styles.lessonTitle}>
                            {lesson.title}
                          </span>
                          {lesson.preview ? (
                            <span className={styles.previewBadge}>
                              Pratinjau
                            </span>
                          ) : null}
                          <span className={styles.lessonDuration}>
                            {lesson.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <div key={module.title} className={styles.module}>
                    <div className={styles.moduleHead}>
                      <span className={styles.moduleTitle}>{module.title}</span>
                      <span className={styles.moduleMeta}>
                        {module.lessons} · {module.duration}
                      </span>
                      <ChevronDownIcon
                        size={18}
                        className={styles.chevron}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </Card>

          <Card id="pengajar" className={`${styles.card} ${styles.anchor}`}>
            <h2 className={styles.cardTitle}>Pengajar</h2>
            <div className={styles.instructorCard}>
              <span
                className={styles.instructorLogo}
                style={{ backgroundColor: "#0b7a62" }}
                aria-hidden="true"
              >
                {course.instructor.initials}
              </span>
              <div>
                <h3 className={styles.instructorName}>
                  {course.instructor.name}
                </h3>
                <p className={styles.instructorRole}>
                  {course.instructor.role}
                </p>
                <p className={styles.instructorStats}>
                  <span aria-hidden="true">★</span> {course.instructor.rating}{" "}
                  rating pengajar · {course.instructor.students} peserta
                </p>
                <p className={styles.instructorBio}>{course.instructor.bio}</p>
              </div>
            </div>
          </Card>

          <Card id="ulasan" className={`${styles.card} ${styles.anchor}`}>
            <h2 className={styles.cardTitle}>Ulasan peserta</h2>
            <p className={styles.cardSubtitle}>
              {course.rating} dari 5 · {course.reviewCount} ulasan
            </p>
            <div className={styles.reviews}>
              {course.reviews.map((review) => (
                <div key={review.name} className={styles.review}>
                  <div className={styles.reviewHead}>
                    <span className={styles.reviewName}>{review.name}</span>
                    <span className={styles.stars} aria-hidden="true">
                      {review.stars}
                    </span>
                  </div>
                  <p className={styles.reviewText}>{review.body}</p>
                </div>
              ))}
            </div>
          </Card>
        </main>

        <aside className={styles.sidebar}>
          <Card className={styles.priceCard}>
            <div className={styles.priceRow}>
              <span className={styles.price}>{course.price}</span>
              <span className={styles.oldPrice}>{course.oldPrice}</span>
              <span className={styles.discount}>{course.discount}</span>
            </div>

            <div className={styles.ctaStack}>
              <ButtonLink
                href={`/masuk?next=/kursus/${course.slug}`}
                size="md"
                className={styles.cta}
              >
                Daftar kursus
              </ButtonLink>
              <ButtonLink
                href="#preview"
                variant="outline"
                size="md"
                className={styles.cta}
              >
                Coba pratinjau gratis
              </ButtonLink>
            </div>

            <p className={styles.includeTitle}>Termasuk</p>
            <ul className={styles.includeList}>
              {course.includes.map((item) => (
                <li key={item} className={styles.includeItem}>
                  <CheckIcon size={16} className={styles.includeIcon} />
                  {item}
                </li>
              ))}
            </ul>

          </Card>

          <Card className={styles.skillsCard}>
            <h2 className={styles.cardTitle}>Skill dan lowongan</h2>
            <div className={styles.skillTags}>
              {course.skills.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
            <p className={styles.jobsText}>{course.jobsNote}</p>
            <Link
              href="/lowongan?q=Product+Designer"
              className={styles.jobsLink}
            >
              Lihat lowongannya <ChevronRightIcon size={15} />
            </Link>
          </Card>

          <Card className={styles.relatedCard}>
            <h2 className={styles.cardTitle}>Kursus terkait</h2>
            <div className={styles.relatedList}>
              {course.related.map((item) => (
                <div key={item.slug} className={styles.related}>
                  <span
                    className={styles.relatedLogo}
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  >
                    {item.initials}
                  </span>
                  <span className={styles.relatedInfo}>
                    <span className={styles.relatedTitle}>{item.title}</span>
                    <span className={styles.relatedMeta}>
                      {item.provider} · {item.duration} · {item.price}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
