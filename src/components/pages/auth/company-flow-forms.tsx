"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { CheckIcon, ChevronDownIcon } from "@/components/ui/icons/icons";
import {
  companyInitials,
  type CompanyDraft,
  type RegisteredCompany,
} from "@/lib/data/company";
import {
  saveCompanyData,
  submitCompanyApplication,
} from "@/lib/actions/auth";
import styles from "./company-flow.module.css";

const INDUSTRIES = [
  "E-commerce",
  "Teknologi",
  "Keuangan",
  "Pendidikan",
  "Kesehatan",
  "Manufaktur",
  "Media dan hiburan",
  "Jasa profesional",
  "Lainnya",
];

const SIZES = [
  "1 – 50 karyawan",
  "51 – 200 karyawan",
  "201 – 1.000 karyawan",
  "1.001 – 5.000 karyawan",
  "Lebih dari 5.000 karyawan",
];

const CITIES = [
  "Jakarta Selatan",
  "Jakarta Pusat",
  "Jakarta Barat",
  "Jakarta Timur",
  "Jakarta Utara",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Medan",
  "Makassar",
  "Denpasar",
];

function SelectField({
  id,
  label,
  placeholder,
  options,
  defaultValue,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.selectWrap}>
        <select
          id={id}
          name={id}
          className={styles.select}
          defaultValue={defaultValue ?? ""}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={styles.selectIcon} aria-hidden="true">
          <ChevronDownIcon size={16} />
        </span>
      </div>
    </div>
  );
}

function TextField({
  id,
  label,
  placeholder,
  defaultValue,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        className={styles.input}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
      />
    </div>
  );
}

export function CompanyDataForm({ draft }: { draft: CompanyDraft | null }) {
  const [error, setError] = useState("");
  const [logoName, setLogoName] = useState(draft?.logoName ?? "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const message = await saveCompanyData(new FormData(event.currentTarget));
    if (message) setError(message);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Informasi perusahaan</h2>
        </div>
        <div className={styles.form}>
          <div className={styles.grid2}>
            <TextField
              id="company-name"
              label="Nama resmi perusahaan"
              placeholder="PT Tokoloka Digital Indonesia"
              defaultValue={draft?.name}
            />
            <TextField
              id="company-brand"
              label="Nama brand"
              placeholder="Tokoloka"
              defaultValue={draft?.brand}
            />
          </div>
          <div className={styles.grid2}>
            <SelectField
              id="company-industry"
              label="Industri"
              placeholder="Pilih industri"
              options={INDUSTRIES}
              defaultValue={draft?.industry}
            />
            <SelectField
              id="company-size"
              label="Ukuran perusahaan"
              placeholder="Pilih jumlah karyawan"
              options={SIZES}
              defaultValue={draft?.size}
            />
          </div>
          <div className={styles.grid2}>
            <TextField
              id="company-website"
              label="Situs web"
              placeholder="https://tokoloka.id"
              defaultValue={draft?.website}
            />
            <SelectField
              id="company-city"
              label="Kota kantor pusat"
              placeholder="Pilih kota"
              options={CITIES}
              defaultValue={draft?.city}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="company-address">
              Alamat lengkap kantor pusat
            </label>
            <textarea
              id="company-address"
              name="company-address"
              className={styles.textarea}
              placeholder="Jalan, nomor, kelurahan, kecamatan, kode pos"
              defaultValue={draft?.address}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="company-about">
              Tentang perusahaan
            </label>
            <textarea
              id="company-about"
              name="company-about"
              className={styles.textarea}
              placeholder="Ceritakan singkat bisnis, produk, dan budaya kerja perusahaanmu."
              defaultValue={draft?.about}
            />
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Logo perusahaan</h2>
        </div>
        <input type="hidden" name="company-logo" value={logoName} />
        <div className={styles.logoRow}>
          <span className={styles.logoBox} aria-hidden="true">
            {companyInitials(draft?.name ?? "")}
          </span>
          <div className={styles.logoInfo}>
            <p className={styles.logoName}>
              {logoName || "Belum ada logo"}
            </p>
            <p className={styles.logoHint}>
              PNG atau SVG, minimal 400 × 400 piksel. Tampil di halaman
              perusahaan dan lowongan.
            </p>
          </div>
          <label className={styles.outlineButton}>
            {logoName ? "Ganti logo" : "Pilih logo"}
            <input
              type="file"
              accept="image/png,image/svg+xml"
              className={styles.fileInput}
              onChange={(event) =>
                setLogoName(event.target.files?.[0]?.name ?? logoName)
              }
            />
          </label>
        </div>
      </section>

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.actions}>
        <Link href="/" className={styles.ghostButton}>
          Batal
        </Link>
        <button type="submit" className={styles.primaryButton}>
          Lanjut ke dokumen
        </button>
      </div>
    </form>
  );
}

type DocKey = "nib" | "npwp" | "akta" | "suratKuasa";

type DocFile = { name: string; size: string };

const DOCUMENTS: Array<{
  key: DocKey;
  field: string;
  label: string;
  required: boolean;
  hint: string;
}> = [
  {
    key: "nib",
    field: "doc-nib",
    label: "NIB",
    required: true,
    hint: "Unggah NIB yang masih berlaku.",
  },
  {
    key: "npwp",
    field: "doc-npwp",
    label: "NPWP perusahaan",
    required: true,
    hint: "Unggah NPWP atas nama perusahaan.",
  },
  {
    key: "akta",
    field: "doc-akta",
    label: "Akta pendirian",
    required: true,
    hint: "Unggah akta pendirian dan perubahan terakhir.",
  },
  {
    key: "suratKuasa",
    field: "doc-surat-kuasa",
    label: "Surat kuasa",
    required: false,
    hint: "Hanya jika kamu bukan direksi atau pendiri perusahaan.",
  },
];

function UploadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 10.5V2.5m0 0L5 5.5m3-3 3 3M2.5 11v1.5a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CompanyDocumentsForm({
  defaults,
}: {
  defaults: RegisteredCompany | null;
}) {
  const [error, setError] = useState("");
  const [docs, setDocs] = useState<Record<DocKey, DocFile>>({
    nib: { name: defaults?.nib ?? "", size: "" },
    npwp: { name: defaults?.npwp ?? "", size: "" },
    akta: { name: defaults?.akta ?? "", size: "" },
    suratKuasa: { name: defaults?.suratKuasa ?? "", size: "" },
  });

  function handleFile(key: DocKey, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setDocs((current) => ({
      ...current,
      [key]: {
        name: file.name,
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      },
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const message = await submitCompanyApplication(
      new FormData(event.currentTarget),
    );
    if (message) setError(message);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Dokumen legalitas</h2>
          <p className={styles.cardHint}>
            PDF, JPG, atau PNG, maksimal 5 MB per file. Pastikan teksnya
            terbaca jelas.
          </p>
        </div>
        <div className={styles.docList}>
          {DOCUMENTS.map((document) => {
            const file = docs[document.key];
            const uploaded = Boolean(file.name);
            return (
              <div
                key={document.key}
                className={styles.docRow}
                data-uploaded={uploaded}
              >
                <span className={styles.docIcon} aria-hidden="true">
                  {uploaded ? <CheckIcon size={14} /> : <UploadIcon />}
                </span>
                <div className={styles.docInfo}>
                  <p className={styles.docTitle}>
                    {document.label}
                    <span
                      className={
                        document.required
                          ? styles.badge
                          : styles.badgeOptional
                      }
                    >
                      {document.required ? "Wajib" : "Opsional"}
                    </span>
                  </p>
                  <p className={styles.docMeta}>
                    {uploaded
                      ? file.size
                        ? `${file.name} · ${file.size}`
                        : file.name
                      : document.hint}
                  </p>
                </div>
                <label
                  className={
                    uploaded ? styles.docAction : styles.docButton
                  }
                >
                  {uploaded ? "Ganti" : "Pilih file"}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={styles.fileInput}
                    onChange={(event) =>
                      handleFile(document.key, event)
                    }
                  />
                </label>
                <input
                  type="hidden"
                  name={document.field}
                  value={file.name}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Penanggung jawab akun</h2>
          <p className={styles.cardHint}>
            Orang yang akan mengelola lowongan dan dihubungi tim Kerjakita.
          </p>
        </div>
        <div className={styles.form}>
          <div className={styles.grid2}>
            <TextField
              id="pic-name"
              label="Nama lengkap"
              placeholder="Rani Kusuma"
              defaultValue={defaults?.adminName}
            />
            <TextField
              id="pic-role"
              label="Jabatan"
              placeholder="Head of People"
              defaultValue={defaults?.picRole}
            />
          </div>
          <div className={styles.grid2}>
            <TextField
              id="pic-email"
              label="Email perusahaan"
              type="email"
              placeholder="rani@tokoloka.id"
              defaultValue={defaults?.adminEmail}
            />
            <TextField
              id="pic-phone"
              label="Nomor telepon"
              type="tel"
              placeholder="+62 812 3456 7890"
              defaultValue={defaults?.picPhone}
            />
          </div>
          <div className={styles.field}>
            <span className={styles.label}>
              Hubunganmu dengan perusahaan
            </span>
            <div className={styles.relation}>
              <label className={styles.relationOption}>
                <input
                  type="radio"
                  name="pic-relation"
                  value="direksi"
                  className={styles.radioInput}
                  defaultChecked={
                    (defaults?.picRelation ?? "direksi") === "direksi"
                  }
                />
                <span className={styles.radioDot} aria-hidden="true" />
                Direksi atau pendiri
              </label>
              <label className={styles.relationOption}>
                <input
                  type="radio"
                  name="pic-relation"
                  value="kuasa"
                  className={styles.radioInput}
                  defaultChecked={defaults?.picRelation === "kuasa"}
                />
                <span className={styles.radioDot} aria-hidden="true" />
                Karyawan dengan surat kuasa
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHead}>
          <h2 className={styles.cardTitle}>Pernyataan</h2>
        </div>
        <div className={styles.statements}>
          <label className={styles.checkRow}>
            <input
              type="checkbox"
              name="statement-data"
              className={styles.checkInput}
              defaultChecked
            />
            <span className={styles.checkBox} aria-hidden="true">
              <CheckIcon size={13} />
            </span>
            <span>
              Saya menyatakan data dan dokumen ini benar, serta berwenang
              mewakili perusahaan untuk mengajukan akun.
            </span>
          </label>
          <label className={styles.checkRow}>
            <input
              type="checkbox"
              name="statement-terms"
              className={styles.checkInput}
              defaultChecked
            />
            <span className={styles.checkBox} aria-hidden="true">
              <CheckIcon size={13} />
            </span>
            <span>
              Saya menyetujui Syarat Akun Perusahaan dan Kebijakan Privasi
              Kerjakita.
            </span>
          </label>
        </div>
      </section>

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.actions}>
        <Link href="/daftar-perusahaan" className={styles.outlineButton}>
          Kembali
        </Link>
        <button type="submit" className={styles.primaryButton}>
          Kirim untuk diverifikasi
        </button>
      </div>
    </form>
  );
}
