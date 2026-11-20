import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { reviewQueueCompany } from "@/lib/actions/admin";
import { readAdminState } from "@/lib/data/admin-state";
import { companyDirectory } from "@/lib/data/company-directory";
import {
  ActionButton,
  Chip,
  DemoTag,
} from "@/components/pages/admin/admin-parts";
import { CheckIcon } from "@/components/ui/icons/icons";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const instant = false;

export const metadata: Metadata = { title: "Detail pengajuan" };

type DemoApplication = {
  legalName: string;
  brand: string;
  size: string;
  city: string;
  id: string;
  submittedAt: string;
  submitter: string;
  documents: { label: string; meta: string }[];
  checks: { label: string; warn?: boolean }[];
};

const APPLICATIONS: Record<string, DemoApplication> = {
  tokoloka: {
    legalName: "PT Tokoloka Digital Nusantara",
    brand: "Tokoloka",
    size: "1.001 – 5.000 karyawan",
    city: "Jakarta Selatan",
    id: "KRJ–2026–0412",
    submittedAt: "14 Okt 2026, 10.12",
    submitter: "Rani Ayu Pratama",
    documents: [
      { label: "NIB", meta: "NIB_Tokoloka.pdf · 312 KB" },
      { label: "NPWP perusahaan", meta: "NPWP_Tokoloka.pdf · 188 KB" },
      { label: "Akta pendirian", meta: "Akta_Tokoloka.pdf · 1,2 MB" },
    ],
    checks: [
      { label: "NIB valid dan masih aktif" },
      { label: "Nama NPWP cocok dengan nama perusahaan" },
      { label: "Alamat di form sama dengan alamat di akta", warn: true },
      { label: "Penanggung jawab berwenang mewakili perusahaan" },
    ],
  },
  bayarpintar: {
    legalName: "PT Bayarpintar Teknologi",
    brand: "Bayarpintar",
    size: "201 – 500 karyawan",
    city: "Bandung",
    id: "KRJ–2026–0398",
    submittedAt: "12 Okt 2026, 09.40",
    submitter: "Dimas Prasetyo",
    documents: [
      { label: "NIB", meta: "NIB_Bayarpintar.pdf · 298 KB" },
      { label: "NPWP perusahaan", meta: "NPWP_Bayarpintar.pdf · 164 KB" },
      { label: "Akta pendirian", meta: "Akta_Bayarpintar.pdf · 1,0 MB" },
    ],
    checks: [
      { label: "NIB valid dan masih aktif" },
      { label: "Nama NPWP cocok dengan nama perusahaan" },
      { label: "Tanggal akta sesuai dengan data pengajuan", warn: true },
      { label: "Penanggung jawab berwenang mewakili perusahaan" },
    ],
  },
  nawasehat: {
    legalName: "PT Nawasehat Medika",
    brand: "Nawasehat",
    size: "51 – 200 karyawan",
    city: "Surabaya",
    id: "KRJ–2026–0375",
    submittedAt: "11 Okt 2026, 15.05",
    submitter: "Sari Wulandari",
    documents: [
      { label: "NIB", meta: "NIB_Nawasehat.pdf · 264 KB" },
      { label: "NPWP perusahaan", meta: "NPWP_Nawasehat.pdf · 152 KB" },
      { label: "Akta pendirian", meta: "Akta_Nawasehat.pdf · 1,1 MB" },
    ],
    checks: [
      { label: "NIB valid dan masih aktif" },
      { label: "Nama NPWP cocok dengan nama perusahaan", warn: true },
      { label: "Alamat di form sama dengan alamat di akta" },
      { label: "Penanggung jawab berwenang mewakili perusahaan" },
    ],
  },
};

function DocumentIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 9v5" />
      <path d="M12 17.5h.01" />
    </svg>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = companyDirectory.find((row) => row.slug === slug);
  const application = APPLICATIONS[slug];
  if (!company || !application) notFound();

  const state = await readAdminState();
  const review = state.companies[slug];

  return (
    <div className={dashboard.mainInner}>
      <Link href="/admin/verifikasi-perusahaan" className={styles.backLink}>
        ← Kembali ke verifikasi
      </Link>

      <section className={styles.appSheet} aria-label="Detail pengajuan">
        <div className={styles.appHead}>
          <span
            className={styles.appAvatar}
            style={{ background: company.color }}
            aria-hidden="true"
          >
            {company.initials}
          </span>
          <div className={styles.appHeadText}>
            <h1 className={styles.appTitle}>{application.legalName}</h1>
            <p className={styles.appMeta}>
              {application.id} · diajukan {application.submittedAt} oleh{" "}
              {application.submitter}
            </p>
          </div>
          <div className={styles.appAside}>
            {review ? (
              review.decision === "approved" ? (
                <Chip tone="ok">Disetujui &amp; aktif</Chip>
              ) : (
                <Chip tone="bad">Perlu perbaikan</Chip>
              )
            ) : (
              <Chip tone="warn">Menunggu verifikasi</Chip>
            )}
            <DemoTag />
          </div>
        </div>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Brand</dt>
            <dd className={styles.factValue}>{application.brand}</dd>
          </div>
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Industri</dt>
            <dd className={styles.factValue}>{company.industry}</dd>
          </div>
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Ukuran</dt>
            <dd className={styles.factValue}>{application.size}</dd>
          </div>
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Kota</dt>
            <dd className={styles.factValue}>{application.city}</dd>
          </div>
        </dl>

        <section aria-labelledby="dokumen">
          <h2 id="dokumen" className={styles.sectionTitle}>
            Dokumen
          </h2>
          <ul className={styles.docList}>
            {application.documents.map((document) => (
              <li key={document.label} className={styles.doc}>
                <span className={styles.docIcon} aria-hidden="true">
                  <DocumentIcon />
                </span>
                <span className={styles.docText}>
                  <span className={styles.docTitle}>{document.label}</span>
                  <span className={styles.docMeta}>{document.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="pemeriksaan">
          <h2 id="pemeriksaan" className={styles.sectionTitle}>
            Pemeriksaan
          </h2>
          <ul className={styles.checks}>
            {application.checks.map((check) => (
              <li
                key={check.label}
                className={`${styles.check} ${
                  check.warn ? styles.checkWarn : ""
                }`}
              >
                <span
                  className={`${styles.checkIcon} ${
                    check.warn ? styles.checkIconWarn : ""
                  }`}
                  aria-hidden="true"
                >
                  {check.warn ? <WarningIcon /> : <CheckIcon size={14} />}
                </span>
                <span className={styles.checkLabel}>{check.label}</span>
                {check.warn ? <Chip tone="warn">Perlu dicek</Chip> : null}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="catatan-pemohon">
          <h2 id="catatan-pemohon" className={styles.noteHeading}>
            Catatan untuk pemohon
          </h2>
          {review ? (
            <div className={styles.reviewDone}>
              <p className={styles.note}>
                {review.decision === "approved"
                  ? "Pengajuan ini sudah disetujui dan akun perekrut diaktifkan."
                  : "Permintaan perbaikan sudah dikirim ke pemohon."}
              </p>
              {review.note ? (
                <blockquote className={styles.reviewQuote}>
                  {review.note}
                </blockquote>
              ) : null}
            </div>
          ) : (
            <form action={reviewQueueCompany} className={styles.reviewForm}>
              <input type="hidden" name="slug" value={slug} />
              <label htmlFor="review-note" className={styles.srOnly}>
                Catatan untuk pemohon
              </label>
              <textarea
                id="review-note"
                name="note"
                rows={3}
                className={styles.noteInput}
                placeholder="Tulis catatan untuk pemohon jika perlu perbaikan"
              />
              <div className={styles.reviewActions}>
                <ActionButton
                  tone="primary"
                  name="intent"
                  value="approve"
                  className={styles.reviewButton}
                >
                  Setujui dan aktifkan akun
                </ActionButton>
                <ActionButton
                  name="intent"
                  value="fix"
                  className={styles.reviewButton}
                >
                  Minta perbaikan
                </ActionButton>
              </div>
            </form>
          )}
        </section>
      </section>
    </div>
  );
}
