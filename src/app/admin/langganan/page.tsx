import type { Metadata } from "next";
import Link from "next/link";
import { ADMIN_INVOICES, ADMIN_PLANS } from "@/lib/data/admin";
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

export const metadata: Metadata = { title: "Langganan & tagihan" };

const TABS = [
  { key: "paket", label: "Paket" },
  { key: "tagihan", label: "Tagihan" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const tab: TabKey = params.tab === "tagihan" ? "tagihan" : "paket";

  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Langganan & tagihan"
        subtitle="Paket portal perekrut dan riwayat tagihan."
      />

      <div className={styles.tabs}>
        {TABS.map((item) => (
          <Link
            key={item.key}
            href={
              item.key === "paket"
                ? "/admin/langganan"
                : "/admin/langganan?tab=tagihan"
            }
            className={`${styles.tab} ${tab === item.key ? styles.tabActive : ""}`}
            aria-current={tab === item.key ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {tab === "paket" ? (
        <Panel
          title="Paket langganan"
          note="Harga dan batas lowongan per paket."
          action={<DemoTag />}
        >
          <DataTable
            caption="Daftar paket langganan"
            head={
              <>
                <th scope="col">Paket</th>
                <th scope="col">Harga</th>
                <th scope="col">Batas lowongan</th>
                <th scope="col">Catatan</th>
              </>
            }
          >
            {ADMIN_PLANS.map((plan) => (
              <tr key={plan.name}>
                <td data-label="Paket">
                  <span className={styles.cellTitle}>{plan.name}</span>
                </td>
                <td data-label="Harga">{plan.price}</td>
                <td data-label="Batas lowongan">{plan.limit}</td>
                <td data-label="Catatan" className={styles.cellMuted}>
                  {plan.note}
                </td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      ) : (
        <Panel
          title="Riwayat tagihan"
          note="Tagihan terakhir per perusahaan."
          action={<DemoTag />}
        >
          <DataTable
            caption="Riwayat tagihan perusahaan"
            head={
              <>
                <th scope="col">ID</th>
                <th scope="col">Perusahaan</th>
                <th scope="col">Paket</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Status</th>
              </>
            }
          >
            {ADMIN_INVOICES.map((invoice) => (
              <tr key={invoice.id}>
                <td data-label="ID" className={styles.cellMuted}>
                  {invoice.id}
                </td>
                <td data-label="Perusahaan">
                  <span className={styles.cellTitle}>{invoice.company}</span>
                </td>
                <td data-label="Paket">{invoice.plan}</td>
                <td data-label="Jumlah">{invoice.amount}</td>
                <td data-label="Tanggal" className={styles.cellMuted}>
                  {invoice.date}
                </td>
                <td data-label="Status">
                  <Chip tone={invoice.status === "Lunas" ? "ok" : "warn"}>
                    {invoice.status}
                  </Chip>
                </td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      )}
    </div>
  );
}
