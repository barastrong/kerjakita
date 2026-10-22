"use client";

import { useState } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { ApplicationJob } from "@/lib/data/apply";
import styles from "./apply-page.module.css";

type ApplyFormProps = {
  job: ApplicationJob;
};

export function ApplyForm({ job }: ApplyFormProps) {
  const [coverLetter, setCoverLetter] = useState("");

  return (
    <Card className={styles.form}>
      <form
        className={styles.formBody}
        onSubmit={(event) => event.preventDefault()}
      >
        <span className={styles.eyebrow}>Langkah 2 dari 4</span>
        <h1 className={styles.title}>Unggah CV dan portofolio</h1>
        <p className={styles.subtitle}>
          Perekrut {job.company} akan melihat berkas ini bersama profilmu.
        </p>

        <fieldset className={styles.fieldset}>
          <legend className={styles.srOnly}>Pilih CV</legend>
          {job.documents.map((document, index) => (
            <label key={document.id} className={styles.cvOption}>
              <input
                type="radio"
                name="cv"
                value={document.id}
                defaultChecked={index === 0}
                className={styles.radio}
              />
              <span className={styles.cvText}>
                <span className={styles.cvName}>{document.name}</span>
                <span className={styles.cvMeta}>{document.meta}</span>
              </span>
              <span className={styles.cvAction}>Lihat</span>
            </label>
          ))}
        </fieldset>

        <label className={styles.dropzone}>
          <input
            type="file"
            accept=".pdf,.docx"
            className={styles.fileInput}
          />
          <Image
            src="/icons/upload.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className={styles.dropTitle}>
            Tarik file ke sini atau pilih dari komputer
          </span>
          <span className={styles.dropHint}>
            PDF atau DOCX, maksimal 5 MB
          </span>
        </label>

        <div className={styles.field}>
          <label htmlFor="portfolio">Tautan portofolio</label>
          <input
            id="portfolio"
            name="portfolio"
            type="text"
            inputMode="url"
            placeholder="contoh: behance.net/username"
          />
        </div>

        <div className={styles.fieldRow}>
          <div className={styles.field}>
            <label htmlFor="salary">Ekspektasi gaji per bulan</label>
            <input
              id="salary"
              name="salary"
              type="text"
              inputMode="numeric"
              placeholder="contoh: Rp 10.000.000"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="start">Bisa mulai bekerja</label>
            <input
              id="start"
              name="start"
              type="text"
              placeholder="contoh: 1 Januari 2026"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="coverLetter">Surat lamaran (opsional)</label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            maxLength={1000}
            placeholder="Ceritakan singkat kenapa kamu cocok untuk peran ini."
            value={coverLetter}
            onChange={(event) => setCoverLetter(event.target.value)}
          />
        </div>

        <span className={styles.characterCount}>
          {coverLetter.length} / 1.000 karakter
        </span>

        <div className={styles.actions}>
          <ButtonLink href={`/perusahaan/${job.companySlug}`} variant="outline">
            Kembali
          </ButtonLink>
          <span className={styles.actionsSpacer} />
          <button type="button" className={styles.saveDraft}>
            Simpan draf
          </button>
          <ButtonLink
            href={`/lamar/${job.slug}/pertanyaan`}
            className={styles.nextButton}
          >
            Lanjut ke pertanyaan perusahaan
          </ButtonLink>
        </div>
      </form>
    </Card>
  );
}
