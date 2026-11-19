import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthShell, BenefitList } from "@/components/pages/auth/auth-shell";
import { approveCompany, rejectCompany, logout } from "@/lib/actions/company";
import {
  COMPANY_SESSION_COOKIE,
  PLATFORM_ADMIN_EMAIL,
  REGISTERED_COMPANY_COOKIE,
  parseRegisteredCompany,
} from "@/lib/data/company";
import styles from "@/components/pages/auth/auth-page.module.css";

export const metadata: Metadata = {
  title: "Verifikasi Perusahaan — Admin",
};

const STATUS_LABEL = {
  pending: "Menunggu persetujuan",
  approved: "Disetujui",
  rejected: "Ditolak",
};

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore
    .get(COMPANY_SESSION_COOKIE)
    ?.value?.trim()
    .toLowerCase();
  if (session !== PLATFORM_ADMIN_EMAIL) {
    redirect("/masuk-admin");
  }

  const company = parseRegisteredCompany(
    cookieStore.get(REGISTERED_COMPANY_COOKIE)?.value,
  );

  return (
    <AuthShell
      eyebrow="Admin platform"
      title={
        <>
          <span>Verifikasi</span>
          <span>perusahaan.</span>
        </>
      }
      description="Tinjau pengajuan perusahaan baru sebelum portal perekrut dibuka."
      extra={
        <BenefitList
          items={[
            "Cek nama, industri, dan kota",
            "Setujui untuk membuka portal perekrut",
            "Tolak jika data tidak valid",
          ]}
        />
      }
    >
      <div className={styles.form}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Pengajuan perusahaan</h1>
          <p className={styles.subtitle}>
            {company ? company.name : "Tidak ada pengajuan yang menunggu."}
          </p>
        </div>
        {company ? (
          <>
            <p className={styles.demoHint}>
              {company.name} · {company.industry || "Industri belum diisi"} ·{" "}
              {company.city || "Kota belum diisi"}
              <br />
              Admin: {company.adminName} ({company.adminEmail})
              <br />
              Status: {STATUS_LABEL[company.status]}
            </p>
            {company.status === "pending" ? (
              <>
                <form action={approveCompany}>
                  <button type="submit" className={styles.submit}>
                    Setujui perusahaan
                  </button>
                </form>
                <form action={rejectCompany}>
                  <button type="submit" className={styles.submit}>
                    Tolak pengajuan
                  </button>
                </form>
              </>
            ) : null}
          </>
        ) : null}
        <p className={styles.demoHint}>
          Demo: pengajuan tersimpan di browser ini. Daftarkan perusahaan di
          browser yang sama agar muncul di panel ini.
        </p>
        <form action={logout}>
          <button type="submit" className={styles.submit}>
            Keluar
          </button>
        </form>
      </div>
    </AuthShell>
  );
}
