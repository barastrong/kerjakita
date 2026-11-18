"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./company-page.module.css";

type CompanyVideoCardProps = {
  title: string;
  meta: string;
  color: string;
  large?: boolean;
};

export function CompanyVideoCard({
  title,
  meta,
  color,
  large = false,
}: CompanyVideoCardProps) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <article
        className={`${styles.videoCard} ${
          large ? styles.videoLarge : styles.videoSmall
        }`}
      >
        <button
          type="button"
          className={`${styles.videoThumb} ${styles.videoThumbButton}`}
          style={{ backgroundColor: color }}
          aria-label={`Putar video ${title}`}
          onClick={() => setOpen(true)}
        >
          <span className={styles.playButton} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
        <div className={styles.videoText}>
          <h3 className={styles.videoTitle}>{title}</h3>
          <p className={styles.videoMeta}>{meta}</p>
        </div>
      </article>

      {open ? (
        <div
          className={styles.videoModal}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div
            className={styles.videoModalInner}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.videoModalHead}>
              <div>
                <p className={styles.videoModalTitle}>{title}</p>
                <p className={styles.videoMeta}>{meta}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className={styles.videoClose}
                aria-label="Tutup video"
                onClick={() => setOpen(false)}
              >
                ×
              </button>
            </div>
            <video
              className={styles.videoPlayer}
              src="/videos/perusahaan-demo.mp4"
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
