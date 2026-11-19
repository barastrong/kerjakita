import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, BenefitList } from "@/components/pages/auth/auth-shell";
import { requireCompanyApplication } from "@/lib/data/recruiter-session";
import { logout } from "@/lib/actions/auth";
import styles from "@/components/pages/auth/auth-page.module.css";

export const metadata: Metadata = {
  title: "Verifikasi Perusahaan — Kerjakita",
};

export default async function Page() {
  const member = await requireCompanyApplication();
  const rejected = member.companyStatus === "rejected";

  return (
    <AuthShell
      tone="company"
      eyebrow="Verifikasi perusahaan"
      title={
        rejected ? (
          <>
            <span>Pengajuan perusahaan</span>
            <span>ditolak.</span>
          </>
        ) : (
          <>
            <span>Pengajuanmu</span>
            <span>sedang ditinjau.</span>
          </>
        )
      }
      description={
        rejected
          ? "Perbaiki data perusahaan lalu daftar ulang."
          : "Admin platform memverifikasi data perusahaan sebelum portal perekrut dibuka."
      }
      extra={
        <BenefitList
          items={[
            "Pengajuan ditinjau admin platform",
            "Portal perekrut terbuka setelah disetujui",
            "Tim perekrut bisa diundang setelahnya",
          ]}
        />
      }
    >
      <div className={styles.form}>
        <div className={styles.intro}>
          <h1 className={styles.title}>
            {rejected ? "Pengajuan ditolak" : "Menunggu verifikasi admin"}
          </h1>
          <p className={styles.subtitle}>{member.company.name}</p>
        </div>
        <p className={styles.demoHint}>
          Admin: {member.name} · {member.email}
          <br />
          Industri: {member.company.industry || "—"} · Kota:{" "}
          {member.company.city || "—"}
          <br />
          Status: {rejected ? "Ditolak" : "Menunggu persetujuan"}
        </p>
        <p className={styles.formFooter}>
          {rejected ? (
            <Link href="/daftar-perusahaan">Daftar ulang perusahaan</Link>
          ) : (
            <>
              Demo:{" "}
              <Link href="/admin/verifikasi-perusahaan">
                buka panel admin platform
              </Link>{" "}
              (admin@kerjakita.id)
            </>
          )}
        </p>
        <form action={logout.bind(null, "company")}>
          <button type="submit" className={styles.submit}>
            Keluar
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
