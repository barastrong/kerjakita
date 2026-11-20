import type { Metadata } from "next";
import Link from "next/link";
import { ADMIN_ACTIVITY, ADMIN_USERS } from "@/lib/data/admin";
import { PLATFORM_ADMIN_EMAIL } from "@/lib/data/company";
import { PageHeading } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  Chip,
  DataTable,
  DemoTag,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const instant = false;

export const metadata: Metadata = { title: "Pengaturan" };

const TABS = [
  { key: "umum", label: "Umum" },
  { key: "moderasi", label: "Moderasi" },
  { key: "akses", label: "Admin & akses" },
  { key: "log", label: "Log aktivitas" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const RULES = [
  "Lowongan wajib mencantumkan deskripsi, gaji, dan lokasi.",
  "Hanya perusahaan terverifikasi yang boleh menayangkan lowongan.",
  "Laporan pengguna ditinjau maksimal 1x24 jam.",
  "Lowongan yang meminta biaya pelatihan langsung ditolak.",
];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tab: TabKey = TABS.some((item) => item.key === params.tab)
    ? (params.tab as TabKey)
    : "umum";

  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Pengaturan"
        subtitle="Identitas platform, aturan moderasi, dan akses admin."
      />

      <div className={styles.tabs}>
        {TABS.map((item) => (
          <Link
            key={item.key}
            href={
              item.key === "umum"
                ? "/admin/pengaturan"
                : `/admin/pengaturan?tab=${item.key}`
            }
            className={`${styles.tab} ${tab === item.key ? styles.tabActive : ""}`}
            aria-current={tab === item.key ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {tab === "umum" ? (
        <Panel
          title="Identitas platform"
          note="Nilai tetap dari konfigurasi aplikasi."
        >
          <div className={styles.detail}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Nama platform</span>
              <span className={styles.detailValue}>Kerjakita</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Bahasa</span>
              <span className={styles.detailValue}>Indonesia</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Zona waktu</span>
              <span className={styles.detailValue}>WIB (GMT+7)</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email admin</span>
              <span className={styles.detailValue}>{PLATFORM_ADMIN_EMAIL}</span>
            </div>
          </div>
          <p className={styles.note}>
            Halaman ini hanya menampilkan nilai. Perubahan dilakukan di
            konfigurasi aplikasi.
          </p>
        </Panel>
      ) : null}

      {tab === "moderasi" ? (
        <Panel
          title="Aturan moderasi"
          note="Dipakai saat meninjau lowongan dan laporan."
        >
          <ul className={styles.queue}>
            {RULES.map((rule) => (
              <li key={rule} className={styles.queueRow}>
                <span className={styles.queueTitle}>{rule}</span>
                <Chip tone="neutral">Berlaku</Chip>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      {tab === "akses" ? (
        <Panel
          title="Akun admin"
          note="Hanya akun pemilik yang bisa masuk ke panel ini."
          action={<DemoTag />}
        >
          <DataTable
            caption="Daftar akun admin platform"
            head={
              <>
                <th scope="col">Nama</th>
                <th scope="col">Email</th>
                <th scope="col">Peran</th>
                <th scope="col">Terakhir aktif</th>
              </>
            }
          >
            {ADMIN_USERS.map((user) => (
              <tr key={user.email}>
                <td data-label="Nama">
                  <span className={styles.cellTitle}>{user.name}</span>
                </td>
                <td data-label="Email" className={styles.cellMuted}>
                  {user.email}
                </td>
                <td data-label="Peran">
                  <Chip tone={user.role === "Pemilik" ? "ok" : "neutral"}>
                    {user.role}
                  </Chip>
                </td>
                <td data-label="Terakhir aktif" className={styles.cellMuted}>
                  {user.lastActive}
                </td>
              </tr>
            ))}
          </DataTable>
          <p className={styles.note}>
            Akun admin dikelola di server; halaman ini hanya menampilkan.
          </p>
        </Panel>
      ) : null}

      {tab === "log" ? (
        <Panel
          title="Log aktivitas"
          note="Kejadian terbaru dari data lowongan, pelamar, dan tim."
          action={<DemoTag />}
        >
          <ul className={styles.queue}>
            {ADMIN_ACTIVITY.map((activity) => (
              <li key={activity.id}>
                <Link href={activity.href} className={styles.queueRow}>
                  <span>
                    <span className={styles.queueTitle}>{activity.text}</span>
                    <span className={styles.queueNote}>{activity.note}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}
    </div>
  );
}
