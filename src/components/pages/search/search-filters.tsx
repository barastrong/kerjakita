"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@/components/ui/icons/icons";
import { jobs } from "@/lib/data/jobs";
import styles from "./search-page.module.css";

type FilterKey = "tipe" | "lokasi" | "pengalaman" | "kecamatan";

const DISTRICTS = Array.from(
  new Set(
    jobs
      .map((job) => job.district)
      .filter((district): district is string => Boolean(district)),
  ),
).map((district) => ({
  label: district,
  count: String(jobs.filter((job) => job.district === district).length),
}));

const FILTER_GROUPS: {
  key: FilterKey;
  title: string;
  items: { label: string; count: string }[];
}[] = [
  {
    key: "tipe",
    title: "Tipe kerja",
    items: [
      { label: "Penuh waktu", count: "812" },
      { label: "Kontrak", count: "214" },
      { label: "Magang", count: "96" },
      { label: "Paruh waktu", count: "58" },
    ],
  },
  {
    key: "lokasi",
    title: "Lokasi kerja",
    items: [
      { label: "Remote", count: "2.960" },
      { label: "Hybrid", count: "1.420" },
      { label: "Onsite", count: "880" },
    ],
  },
  {
    key: "pengalaman",
    title: "Pengalaman",
    items: [
      { label: "Fresh graduate", count: "140" },
      { label: "1 – 3 tahun", count: "461" },
      { label: "3 – 5 tahun", count: "387" },
      { label: "Lebih dari 5 tahun", count: "260" },
    ],
  },
  {
    key: "kecamatan",
    title: "Kecamatan",
    items: DISTRICTS,
  },
];

const UPDATED_OPTIONS = [
  { label: "Kapanpun", value: "" },
  { label: "24 jam terakhir", value: "24 jam terakhir" },
  { label: "Seminggu terakhir", value: "Seminggu terakhir" },
  { label: "Sebulan terakhir", value: "Sebulan terakhir" },
];

export function SearchFilters({
  tipe,
  lokasi,
  pengalaman,
  kecamatan,
  diperbarui,
}: {
  tipe: string[];
  lokasi: string[];
  pengalaman: string[];
  kecamatan: string[];
  diperbarui: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = { tipe, lokasi, pengalaman, kecamatan };

  function push(params: URLSearchParams) {
    router.push(
      params.toString() ? `/lowongan?${params.toString()}` : "/lowongan",
      { scroll: false },
    );
  }

  function toggle(key: FilterKey, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const values = (params.get(key) ?? "").split(",").filter(Boolean);
    const next = values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];

    if (next.length > 0) {
      params.set(key, next.join(","));
    } else {
      params.delete(key);
    }

    push(params);
  }

  function setUpdated(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("diperbarui", value);
    } else {
      params.delete("diperbarui");
    }
    push(params);
  }

  function reset() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tipe");
    params.delete("lokasi");
    params.delete("pengalaman");
    params.delete("kecamatan");
    params.delete("diperbarui");
    push(params);
  }

  return (
    <aside className={styles.filters}>
      <div className={styles.filterHead}>
        <h2>Filter</h2>
        <button type="button" className={styles.resetButton} onClick={reset}>
          Reset
        </button>
      </div>

      {FILTER_GROUPS.map((group) => (
        <details key={group.title} className={styles.filterGroup} open>
          <summary className={styles.filterSummary}>
            {group.title}
            <ChevronDownIcon size={16} />
          </summary>
          <div className={styles.filterBody}>
            {group.items.map((item) => (
              <label key={item.label} className={styles.checkRow}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={selected[group.key]?.includes(item.label) ?? false}
                  onChange={() => toggle(group.key, item.label)}
                />
                <span>{item.label}</span>
                <span className={styles.filterCount}>{item.count}</span>
              </label>
            ))}
          </div>
        </details>
      ))}

      <details className={styles.filterGroup} open>
        <summary className={styles.filterSummary}>
          Terakhir diperbarui
          <ChevronDownIcon size={16} />
        </summary>
        <div className={styles.filterBody}>
          {UPDATED_OPTIONS.map((option) => (
            <label key={option.label} className={styles.checkRow}>
              <input
                type="radio"
                name="diperbarui"
                className={styles.radio}
                checked={diperbarui === option.value}
                onChange={() => setUpdated(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </details>
    </aside>
  );
}
