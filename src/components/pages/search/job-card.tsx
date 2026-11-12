"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons/icons";
import { getCompany } from "@/lib/data/companies";
import type { Job } from "@/lib/data/jobs";
import styles from "./search-page.module.css";

export function JobCard({ job }: { job: Job }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const company = getCompany(job.companySlug);
  const location = job.district
    ? `${job.district}, ${job.location}`
    : job.location;
  const dialogId = `job-detail-${job.slug}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };
    dialog.addEventListener("click", onBackdrop);

    return () => dialog.removeEventListener("click", onBackdrop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function openDialog() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  return (
    <>
      <div className={styles.jobRow}>
        <button
          type="button"
          className={styles.jobSummary}
          onClick={openDialog}
          aria-haspopup="dialog"
          aria-controls={dialogId}
        >
          <Avatar
            initials={job.initials}
            color={job.color}
            size="sm"
            className={styles.jobAvatar}
            label={job.company}
          />
          <div className={styles.jobMain}>
            <div className={styles.jobTitleRow}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              {job.quickApply && <Badge tone="gold">Lamar cepat</Badge>}
            </div>
            <p className={styles.jobMeta}>
              {job.company} · {job.location} · {job.workStyle}
            </p>
            <div className={styles.jobTags}>
              <Badge>{job.employmentType}</Badge>
              <Badge>{job.experience}</Badge>
            </div>
          </div>
          <div className={styles.jobSalary}>
            <strong>{job.salaryShort}</strong>
            <span className={styles.jobPosted}>{job.posted}</span>
          </div>
          <ChevronDownIcon className={styles.jobChevron} size={18} />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        id={dialogId}
        className={styles.jobDialog}
        aria-labelledby={`${dialogId}-title`}
        onClose={() => setOpen(false)}
      >
        <div className={styles.jobDialogHead}>
          <div className={styles.jobDialogTitleWrap}>
            <Avatar
              initials={job.initials}
              color={job.color}
              size="md"
              label={job.company}
            />
            <div className={styles.jobDialogTitle}>
              <h3 id={`${dialogId}-title`} className={styles.jobDialogHeading}>
                {job.title}
              </h3>
              <p className={styles.jobDialogMeta}>
                {job.company} · {job.location} · {job.workStyle}
              </p>
            </div>
          </div>
          <button
            type="button"
            className={styles.dialogClose}
            onClick={() => dialogRef.current?.close()}
            aria-label="Tutup detail lowongan"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div className={styles.jobDialogBody}>
          <div className={styles.jobFacts}>
            <div className={styles.jobFact}>
              <span>Gaji</span>
              <strong>{job.salaryFull}</strong>
            </div>
            <div className={styles.jobFact}>
              <span>Pengalaman</span>
              <strong>{job.experience}</strong>
            </div>
            <div className={styles.jobFact}>
              <span>Tipe kerja</span>
              <strong>
                {job.employmentType} · {job.workStyle}
              </strong>
            </div>
            <div className={styles.jobFact}>
              <span>Lokasi</span>
              <strong>{location}</strong>
            </div>
          </div>

          <div className={styles.jobSkills}>
            {job.skills.map((skill) => (
              <Badge key={skill} tone="mint">
                {skill}
              </Badge>
            ))}
          </div>

          <div className={styles.jobFooter}>
            <p className={styles.companyLine}>
              {company ? (
                <>
                  <strong>{company.name}</strong> · {company.industry} ·{" "}
                  {company.employees} · {company.rating} dari 5 (
                  {new Intl.NumberFormat("id-ID").format(company.reviewCount)}{" "}
                  ulasan)
                </>
              ) : (
                <>
                  <strong>{job.company}</strong> · Profil perusahaan belum
                  tersedia
                </>
              )}
            </p>
            <div className={styles.jobActions}>
              <Link
                href={`/perusahaan/${job.companySlug}`}
                className={styles.companyLink}
              >
                Lihat perusahaan
              </Link>
              <ButtonLink href={`/lamar/${job.slug}`} size="sm">
                Lamar sekarang
              </ButtonLink>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
