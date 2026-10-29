"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Button, ButtonLink } from "@/components/ui/button";
import { useApply } from "./apply-layout";
import {
  EXPERIENCE_OPTIONS,
  HYBRID_OPTIONS,
} from "./apply-form-data";
import styles from "./apply-page.module.css";

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  inputMode?: "text" | "numeric" | "url";
  autoComplete?: string;
  required?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  inputMode,
  autoComplete,
  required,
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
      />
    </div>
  );
}

function StepHeader({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <span className={styles.eyebrow}>Langkah {step + 1} dari 4</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </>
  );
}

function SaveDraft() {
  return (
    <button type="button" className={styles.saveDraft}>
      Simpan draf
    </button>
  );
}

function RadioOptions({
  name,
  options,
  value,
  onChange,
  columns,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  columns: 2 | 4;
}) {
  return (
    <div
      className={columns === 2 ? styles.optionGrid2 : styles.optionGrid4}
    >
      {options.map((option) => (
        <label key={option} className={styles.option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className={styles.radio}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: ReactNode;
}) {
  return (
    <section className={styles.reviewCard}>
      <div className={styles.reviewHead}>
        <h2 className={styles.reviewTitle}>{title}</h2>
        <button type="button" className={styles.reviewEdit} onClick={onEdit}>
          Ubah
        </button>
      </div>
      <div className={styles.reviewRows}>{children}</div>
    </section>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.reviewRow}>
      <span className={styles.reviewLabel}>{label}</span>
      <span className={styles.reviewValue}>{value}</span>
    </div>
  );
}

export function DataStep() {
  const { draft, update, goNext } = useApply();

  return (
    <form
      className={styles.formBody}
      onSubmit={(event) => {
        event.preventDefault();
        goNext();
      }}
    >
      <StepHeader
        step={0}
        title="Periksa data dirimu"
        subtitle="Kami mengisi data dari profilmu. Ubah jika ada yang sudah tidak sesuai."
      />

      <div className={styles.fieldRow}>
        <Field
          id="name"
          label="Nama lengkap"
          value={draft.name}
          onChange={(value) => update("name", value)}
          autoComplete="name"
          required
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={draft.email}
          onChange={(value) => update("email", value)}
          autoComplete="email"
          required
        />
      </div>

      <div className={styles.fieldRow}>
        <Field
          id="phone"
          label="Nomor telepon"
          type="tel"
          value={draft.phone}
          onChange={(value) => update("phone", value)}
          autoComplete="tel"
          required
        />
        <Field
          id="city"
          label="Kota domisili"
          value={draft.city}
          onChange={(value) => update("city", value)}
          autoComplete="address-level2"
          required
        />
      </div>

      <Field
        id="linkedin"
        label="Profil LinkedIn (opsional)"
        value={draft.linkedin}
        onChange={(value) => update("linkedin", value)}
        placeholder="linkedin.com/in/nama-kamu"
        inputMode="url"
      />

      <label className={styles.checkLine}>
        <input
          type="checkbox"
          defaultChecked
          className={styles.checkbox}
        />
        Simpan perubahan ini ke profilku
      </label>

      <div className={styles.actions}>
        <ButtonLink href="/lowongan" variant="outline">
          Batal
        </ButtonLink>
        <span className={styles.actionsSpacer} />
        <SaveDraft />
        <Button type="submit" className={styles.nextButton}>
          Lanjut ke CV dan portofolio
        </Button>
      </div>
    </form>
  );
}

export function CvStep() {
  const { job, draft, update, cv, setCv, goBack, goNext } = useApply();

  return (
    <form
      className={styles.formBody}
      onSubmit={(event) => {
        event.preventDefault();
        goNext();
      }}
    >
      <StepHeader
        step={1}
        title="Unggah CV dan portofolio"
        subtitle={`Perekrut ${job.company} akan melihat berkas ini bersama profilmu.`}
      />

      <fieldset className={styles.fieldset}>
        <legend className={styles.srOnly}>Pilih CV</legend>
        {job.documents.map((document) => (
          <label key={document.id} className={styles.cvOption}>
            <input
              type="radio"
              name="cv"
              value={document.id}
              checked={cv === document.id}
              onChange={() => setCv(document.id)}
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
        <input type="file" accept=".pdf,.docx" className={styles.fileInput} />
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
        <span className={styles.dropHint}>PDF atau DOCX, maksimal 5 MB</span>
      </label>

      <Field
        id="portfolio"
        label="Tautan portofolio"
        value={draft.portfolio}
        onChange={(value) => update("portfolio", value)}
        placeholder="contoh: behance.net/username"
        inputMode="url"
      />

      <div className={styles.fieldRow}>
        <Field
          id="salary"
          label="Ekspektasi gaji per bulan"
          value={draft.salary}
          onChange={(value) => update("salary", value)}
          placeholder="contoh: Rp 10.000.000"
          inputMode="numeric"
        />
        <Field
          id="start"
          label="Bisa mulai bekerja"
          value={draft.start}
          onChange={(value) => update("start", value)}
          placeholder="contoh: 1 Januari 2026"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="coverLetter">Surat lamaran (opsional)</label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          maxLength={1000}
          placeholder="Ceritakan singkat kenapa kamu cocok untuk peran ini."
          value={draft.coverLetter}
          onChange={(event) => update("coverLetter", event.target.value)}
        />
      </div>

      <span className={styles.characterCount}>
        {draft.coverLetter.length} / 1.000 karakter
      </span>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={goBack}>
          Kembali
        </Button>
        <span className={styles.actionsSpacer} />
        <SaveDraft />
        <Button type="submit" className={styles.nextButton}>
          Lanjut ke pertanyaan perusahaan
        </Button>
      </div>
    </form>
  );
}

export function QuestionsStep() {
  const { job, draft, update, goBack, goNext } = useApply();

  return (
    <form
      className={styles.formBody}
      onSubmit={(event) => {
        event.preventDefault();
        goNext();
      }}
    >
      <StepHeader
        step={2}
        title={`Pertanyaan dari ${job.company}`}
        subtitle="Tiga pertanyaan singkat. Jawabanmu dilihat perekrut bersama CV."
      />

      <fieldset className={styles.question}>
        <legend className={styles.questionTitle}>
          1. Berapa tahun pengalamanmu dengan design system?
        </legend>
        <RadioOptions
          name="experience"
          options={EXPERIENCE_OPTIONS}
          value={draft.experience}
          onChange={(value) => update("experience", value)}
          columns={4}
        />
      </fieldset>

      <fieldset className={styles.question}>
        <legend className={styles.questionTitle}>
          2. Bersediakah kamu bekerja hybrid 3 hari per minggu di kantor Jakarta
          Selatan?
        </legend>
        <RadioOptions
          name="hybrid"
          options={HYBRID_OPTIONS}
          value={draft.hybrid}
          onChange={(value) => update("hybrid", value)}
          columns={2}
        />
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="project">
          3. Ceritakan proyek desain yang paling kamu banggakan.
        </label>
        <textarea
          id="project"
          name="project"
          maxLength={1000}
          value={draft.project}
          onChange={(event) => update("project", event.target.value)}
        />
      </div>

      <span className={styles.characterCount}>
        {draft.project.length} / 1.000 karakter
      </span>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={goBack}>
          Kembali
        </Button>
        <span className={styles.actionsSpacer} />
        <SaveDraft />
        <Button type="submit" className={styles.nextButton}>
          Lanjut ke tinjauan
        </Button>
      </div>
    </form>
  );
}

export function ReviewStep() {
  const {
    job,
    draft,
    cv,
    agreed,
    setAgreed,
    goToStep,
    goBack,
    submit,
  } = useApply();
  const cvName = job.documents.find((document) => document.id === cv)?.name;

  return (
    <form
      className={styles.formBody}
      onSubmit={(event) => {
        event.preventDefault();
        if (agreed) submit();
      }}
    >
      <StepHeader
        step={3}
        title="Tinjau lamaranmu"
        subtitle={`Pastikan semuanya benar sebelum dikirim ke ${job.company}.`}
      />

      <ReviewSection title="Data diri" onEdit={() => goToStep(0)}>
        <ReviewRow label="Nama" value={draft.name} />
        <ReviewRow label="Email" value={draft.email} />
        <ReviewRow label="Telepon" value={draft.phone} />
        <ReviewRow label="Domisili" value={draft.city} />
      </ReviewSection>

      <ReviewSection title="CV dan portofolio" onEdit={() => goToStep(1)}>
        <ReviewRow label="CV" value={cvName ?? "-"} />
        <ReviewRow label="Portofolio" value={draft.portfolio} />
        <ReviewRow label="Ekspektasi gaji" value={`${draft.salary} per bulan`} />
        <ReviewRow label="Bisa mulai" value={draft.start} />
      </ReviewSection>

      <ReviewSection title="Jawaban perusahaan" onEdit={() => goToStep(2)}>
        <ReviewRow label="Pengalaman design system" value={draft.experience} />
        <ReviewRow label="Bersedia hybrid" value={draft.hybrid} />
        <ReviewRow label="Proyek terbaik" value={draft.project} />
      </ReviewSection>

      <label className={styles.checkLine}>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className={styles.checkbox}
        />
        Saya menyatakan data di atas benar dan setuju profil saya dibagikan ke{" "}
        {job.company}.
      </label>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={goBack}>
          Kembali
        </Button>
        <span className={styles.actionsSpacer} />
        <SaveDraft />
        <Button type="submit" className={styles.nextButton} disabled={!agreed}>
          Kirim lamaran
        </Button>
      </div>
    </form>
  );
}
