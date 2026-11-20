import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckIcon, ShieldCheckIcon } from "@/components/ui/icons/icons";
import {
  AlertIcon,
  ClockIcon,
  CompanyFlowShell,
} from "@/components/pages/auth/company-flow-shell";
import styles from "@/components/pages/auth/company-flow.module.css";
import { withdrawCompanyApplication } from "@/lib/actions/auth";
import {
  companyDocuments,
  type RegisteredCompany,
} from "@/lib/data/company";
import { readRegisteredCompany } from "@/lib/data/company-cookie";
import { requireCompanyApplication } from "@/lib/data/recruiter-session";

export const metadata: Metadata = {
  title: "Status Verifikasi Perusahaan — Kerjakita",
};

const DAY = 86_400_000;

function formatDate(iso: string) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(iso: string) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function addDays(iso: string, days: number) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Date(date.getTime() + days * DAY).toISOString();
}

type Tone = "pending" | "rejected" | "approved";

const STATUS: Record<
  Tone,
  { chip: string; title: string; body: string }
> = {
  pending: {
    chip: "Menunggu verifikasi",
    title: "Pengajuan sedang ditinjau",
    body: "Tim Kerjakita sedang memeriksa data dan dokumen perusahaanmu. Hasilnya dikirim ke email dan notifikasi dalam 1 – 3 hari kerja.",
  },
  rejected: {
    chip: "Perlu perbaikan",
    title: "Pengajuan perlu diperbaiki",
    body: "Beberapa bagian pengajuan belum sesuai. Perbaiki sesuai catatan admin, lalu kirim ulang.",
  },
  approved: {
    chip: "Terverifikasi",
    title: "Perusahaanmu sudah terverifikasi",
    body: "Akun perusahaan aktif. Kamu bisa memasang lowongan dan mengelola pelamar dari portal perekrut.",
  },
};

function Timeline({
  items,
}: {
  items: Array<{
    title: string;
    meta: string;
    state: "done" | "active" | "todo" | "bad";
  }>;
}) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => (
        <li
          key={item.title}
          className={styles.timelineItem}
          data-state={item.state}
        >
          <span className={styles.timelineDot} aria-hidden="true">
            {item.state === "done" ? (
              <CheckIcon size={13} />
            ) : item.state === "bad" ? (
              "!"
            ) : item.state === "active" ? (
              <ClockIcon size={15} />
            ) : null}
          </span>
          <div>
            <p className={styles.timelineTitle}>{item.title}</p>
            <p className={styles.timelineMeta}>{item.meta}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function BuildingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M3 16V3.5A1.5 1.5 0 0 1 4.5 2h6A1.5 1.5 0 0 1 12 3.5V16m0-8h2.5A1.5 1.5 0 0 1 16 9.5V16M1.5 16h15M5.5 5.5h4m-4 3h4m-4 3h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M6.5 4.5h9m-9 4.5h9m-9 4.5h9M2.5 4.5h.01M2.5 9h.01M2.5 13.5h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M12 15.5v-1.4a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v1.4M7 8a2.75 2.75 0 1 0 0-5.5A2.75 2.75 0 0 0 7 8Zm6.5.5a2.25 2.25 0 1 0 0-4.5m.5 11.5v-1.4a3 3 0 0 0-1.5-2.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.summaryRow}>
      <span className={styles.summaryLabel}>{label}</span>
      <span className={styles.summaryValue}>{value || "—"}</span>
    </div>
  );
}

function StatusBody({ company }: { company: RegisteredCompany }) {
  const tone: Tone = company.status;
  const status = STATUS[tone];
  const documents = companyDocuments(company).filter((item) => item.file);
  const estimate =
    company.submittedAt &&
    `${formatDate(addDays(company.submittedAt, 1))} – ${formatDate(addDays(company.submittedAt, 3))}`;

  const icon =
    tone === "approved" ? (
      <ShieldCheckIcon size={34} />
    ) : tone === "rejected" ? (
      <AlertIcon />
    ) : (
      <ClockIcon />
    );

  return (
    <>
      <section className={styles.statusCard}>
        <span className={styles.statusIcon} data-tone={tone}>
          {icon}
        </span>
        <span className={styles.statusChip} data-tone={tone}>
          {status.chip}
        </span>
        <h1 className={styles.statusTitle}>{status.title}</h1>
        <p className={styles.statusBody}>{status.body}</p>
        <div className={styles.tiles}>
          <div className={styles.tile}>
            <span className={styles.tileLabel}>ID pengajuan</span>
            <span className={styles.tileValue}>{company.id || "—"}</span>
          </div>
          <div className={styles.tile}>
            <span className={styles.tileLabel}>
              {tone === "approved" ? "Diverifikasi" : "Diajukan"}
            </span>
            <span className={styles.tileValue}>
              {tone === "approved"
                ? formatDateTime(company.reviewedAt)
                : formatDateTime(company.submittedAt)}
            </span>
          </div>
          <div className={styles.tile}>
            <span className={styles.tileLabel}>
              {tone === "pending"
                ? "Estimasi selesai"
                : tone === "rejected"
                  ? "Ditinjau"
                  : "Paket"}
            </span>
            <span className={styles.tileValue}>
              {tone === "pending"
                ? estimate || "1 – 3 hari kerja"
                : tone === "rejected"
                  ? formatDateTime(company.reviewedAt)
                  : "Gratis · 1 lowongan aktif"}
            </span>
          </div>
        </div>
      </section>

      {tone === "pending" ? (
        <>
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Perkembangan pengajuan</h2>
            </div>
            <Timeline
              items={[
                {
                  title: "Pengajuan terkirim",
                  meta: `${formatDateTime(company.submittedAt)} · ${documents.length} dokumen diterima`,
                  state: "done",
                },
                {
                  title: "Sedang ditinjau admin",
                  meta: `Mulai ${formatDateTime(company.submittedAt)} · memeriksa NIB, NPWP, dan akta`,
                  state: "active",
                },
                {
                  title: "Keputusan verifikasi",
                  meta: `Estimasi ${estimate || "1 – 3 hari kerja"}`,
                  state: "todo",
                },
              ]}
            />
          </section>
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Ringkasan pengajuan</h2>
            </div>
            <SummaryRow
              label="Perusahaan"
              value={
                company.brand
                  ? `${company.name} (${company.brand})`
                  : company.name
              }
            />
            <SummaryRow
              label="Industri"
              value={[company.industry, company.size]
                .filter(Boolean)
                .join(" · ")}
            />
            <SummaryRow
              label="Penanggung jawab"
              value={[company.adminName, company.picRole]
                .filter(Boolean)
                .join(" · ")}
            />
            <SummaryRow
              label="Dokumen"
              value={`${documents.map((item) => item.label).join(", ")} (${documents.length} file)`}
            />
          </section>
        </>
      ) : null}

      {tone === "rejected" ? (
        <>
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Catatan dari admin</h2>
            </div>
            {company.reviewNote
              .split("\n")
              .map((note) => note.trim())
              .filter(Boolean)
              .map((note, index) => (
                <div key={`${index}-${note}`} className={styles.noteItem}>
                  <span className={styles.noteNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <p className={styles.noteTitle}>{note}</p>
                    <p className={styles.notePart}>
                      Bagian: data perusahaan dan dokumen
                    </p>
                  </div>
                </div>
              ))}
            {!company.reviewNote ? (
              <p className={styles.noteBody}>
                Admin belum menuliskan catatan. Periksa kembali seluruh data
                dan dokumenmu, lalu kirim ulang pengajuan.
              </p>
            ) : null}
          </section>
          <section className={styles.card}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle}>Perkembangan pengajuan</h2>
            </div>
            <Timeline
              items={[
                {
                  title: "Pengajuan terkirim",
                  meta: formatDateTime(company.submittedAt),
                  state: "done",
                },
                {
                  title: "Ditinjau admin",
                  meta: formatDateTime(company.reviewedAt),
                  state: "done",
                },
                {
                  title: "Perlu perbaikan",
                  meta: "Kirim ulang setelah memperbaiki catatan dari admin",
                  state: "bad",
                },
              ]}
            />
          </section>
        </>
      ) : null}

      {tone === "approved" ? (
        <section className={styles.card}>
          <div className={styles.cardHead}>
            <h2 className={styles.cardTitle}>Langkah berikutnya</h2>
          </div>
          <div className={styles.nextGrid}>
            <Link href="/perekrut/profil-perusahaan" className={styles.nextCard}>
              <span className={styles.nextIcon} aria-hidden="true">
                <BuildingIcon />
              </span>
              <p className={styles.nextTitle}>Lengkapi profil perusahaan</p>
              <p className={styles.nextMeta}>
                Tambahkan deskripsi, benefit, dan foto kantor.
              </p>
            </Link>
            <Link href="/perekrut/pasang-lowongan" className={styles.nextCard}>
              <span className={styles.nextIcon} aria-hidden="true">
                <ListIcon />
              </span>
              <p className={styles.nextTitle}>Pasang lowongan pertama</p>
              <p className={styles.nextMeta}>
                Publikasikan lowongan gratis pertamamu.
              </p>
            </Link>
            <Link href="/perekrut/tim" className={styles.nextCard}>
              <span className={styles.nextIcon} aria-hidden="true">
                <UsersIcon />
              </span>
              <p className={styles.nextTitle}>Undang tim rekrutmen</p>
              <p className={styles.nextMeta}>
                Beri akses rekan tim untuk mengelola pelamar.
              </p>
            </Link>
          </div>
        </section>
      ) : null}

      {tone === "pending" ? (
        <>
          <div className={styles.actionsRow}>
            <Link href="/" className={styles.primaryButton}>
              Kembali ke dashboard
            </Link>
          </div>
          <div className={styles.textActions}>
            <Link href="/daftar-perusahaan" className={styles.textButton}>
              Ubah pengajuan
            </Link>
            <form action={withdrawCompanyApplication}>
              <button type="submit" className={styles.textDanger}>
                Tarik pengajuan
              </button>
            </form>
          </div>
        </>
      ) : null}

      {tone === "rejected" ? (
        <div className={styles.actionsRow}>
          <Link href="/daftar-perusahaan" className={styles.primaryButton}>
            Perbaiki dan kirim ulang
          </Link>
          <Link href="/" className={styles.outlineButton}>
            Kembali ke dashboard
          </Link>
        </div>
      ) : null}

      {tone === "approved" ? (
        <div className={styles.actionsRow}>
          <Link href="/perekrut/ringkasan" className={styles.primaryButton}>
            Buka portal perekrut
          </Link>
          <Link href="/" className={styles.outlineButton}>
            Kembali ke dashboard
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default async function VerifikasiPerusahaanPage() {
  await requireCompanyApplication();
  const company = await readRegisteredCompany();
  if (!company) {
    redirect("/daftar-perusahaan");
  }

  return (
    <CompanyFlowShell
      step={3}
      complete={company.status === "approved"}
      narrow
    >
      <StatusBody company={company} />
    </CompanyFlowShell>
  );
}
