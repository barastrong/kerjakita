import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "@/components/ui/icons/icons";
import { submitReport } from "@/lib/actions/reports";
import { jobs } from "@/lib/data/jobs";
import styles from "@/components/pages/apply/apply-page.module.css";

export const instant = false;

export const metadata: Metadata = { title: "Laporkan lowongan | Kerjakita" };

const REASONS = [
  "Meminta biaya atau pembayaran",
  "Informasi gaji tidak sesuai",
  "Perusahaan tidak bisa dihubungi",
  "Penipuan atau spam",
  "Lainnya",
] as const;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ terkirim?: string }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;
  const { terkirim } = await searchParams;
  const job = jobs.find((item) => item.slug === slug);

  if (!job) notFound();

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Jejak navigasi">
        <Link href="/lowongan">Lowongan</Link>
        <span aria-hidden="true">›</span>
        <span>
          {job.title}, {job.company}
        </span>
        <span aria-hidden="true">›</span>
        <span>Laporkan</span>
      </nav>

      <main className={styles.content}>
        <Card className={styles.form}>
          {terkirim === "1" ? (
            <div className={styles.success}>
              <span className={styles.successIcon} aria-hidden="true">
                <CheckIcon size={28} />
              </span>
              <h1 className={styles.title}>Laporan terkirim</h1>
              <p className={styles.subtitle}>
                Laporanmu untuk {job.title} di {job.company} sudah masuk ke
                antrean admin. Terima kasih sudah membantu menjaga lowongan
                tetap aman.
              </p>
              <div className={styles.successActions}>
                <ButtonLink href="/lowongan">Kembali ke lowongan</ButtonLink>
              </div>
            </div>
          ) : (
            <form action={submitReport} className={styles.formBody}>
              <input type="hidden" name="jobSlug" value={job.slug} />
              <div>
                <p className={styles.eyebrow}>Laporkan lowongan</p>
                <h1 className={styles.title}>
                  {job.title} · {job.company}
                </h1>
                <p className={styles.subtitle}>
                  Pilih alasan yang paling sesuai. Admin meninjau laporan ini
                  sebelum menutupnya.
                </p>
              </div>

              <div className={styles.field}>
                <label htmlFor="reason">Alasan laporan</label>
                <select id="reason" name="reason" required defaultValue="">
                  <option value="" disabled>
                    Pilih alasan
                  </option>
                  {REASONS.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="detail">Detail (opsional)</label>
                <textarea
                  id="detail"
                  name="detail"
                  maxLength={300}
                  placeholder="Contoh: diminta transfer Rp150.000 untuk biaya pelatihan sebelum wawancara."
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="reporter">Nama atau email (opsional)</label>
                <input
                  id="reporter"
                  name="reporter"
                  maxLength={60}
                  placeholder="Kosongkan untuk tampil sebagai Pengunjung"
                />
              </div>

              <div className={styles.actions}>
                <ButtonLink href="/lowongan" variant="outline">
                  Batal
                </ButtonLink>
                <span className={styles.actionsSpacer} />
                <Button type="submit">Kirim laporan</Button>
              </div>
            </form>
          )}
        </Card>
      </main>
    </div>
  );
}