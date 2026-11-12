import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PinIcon, SearchIcon } from "@/components/ui/icons/icons";
import styles from "./search-page.module.css";

type Filters = {
  tipe: string[];
  lokasi: string[];
  pengalaman: string[];
  pendidikan: string[];
  kecamatan: string[];
  diperbarui: string;
  perusahaan: string;
  urutkan: string;
};

type ActiveKey =
  | "tipe"
  | "lokasi"
  | "pengalaman"
  | "pendidikan"
  | "kecamatan"
  | "diperbarui"
  | "perusahaan";

export function SearchBar({
  q,
  location,
  tipe,
  lokasi,
  pengalaman,
  pendidikan,
  kecamatan,
  diperbarui,
  perusahaan,
  urutkan,
  companyName,
}: {
  q: string;
  location: string;
  companyName?: string;
} & Filters) {
  function href(overrides: Partial<Filters> = {}) {
    const next = {
      tipe,
      lokasi,
      pengalaman,
      pendidikan,
      kecamatan,
      diperbarui,
      perusahaan,
      urutkan,
      ...overrides,
    };
    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (location) params.set("location", location);
    if (next.tipe.length > 0) params.set("tipe", next.tipe.join(","));
    if (next.lokasi.length > 0) params.set("lokasi", next.lokasi.join(","));
    if (next.pengalaman.length > 0) {
      params.set("pengalaman", next.pengalaman.join(","));
    }
    if (next.pendidikan.length > 0) {
      params.set("pendidikan", next.pendidikan.join(","));
    }
    if (next.kecamatan.length > 0) {
      params.set("kecamatan", next.kecamatan.join(","));
    }
    if (next.diperbarui) params.set("diperbarui", next.diperbarui);
    if (next.perusahaan) params.set("perusahaan", next.perusahaan);
    if (next.urutkan !== "relevan") params.set("urutkan", next.urutkan);

    return `/lowongan${params.toString() ? `?${params.toString()}` : ""}`;
  }

  function removeHref(key: ActiveKey, value: string) {
    if (key === "diperbarui") return href({ diperbarui: "" });
    if (key === "perusahaan") return href({ perusahaan: "" });

    const next: Partial<Filters> = {};
    if (key === "tipe") next.tipe = tipe.filter((item) => item !== value);
    if (key === "lokasi") next.lokasi = lokasi.filter((item) => item !== value);
    if (key === "pengalaman") {
      next.pengalaman = pengalaman.filter((item) => item !== value);
    }
    if (key === "pendidikan") {
      next.pendidikan = pendidikan.filter((item) => item !== value);
    }
    if (key === "kecamatan") {
      next.kecamatan = kecamatan.filter((item) => item !== value);
    }

    return href(next);
  }

  const activeFilters: { key: ActiveKey; value: string }[] = [
    ...tipe.map((value) => ({ key: "tipe" as const, value })),
    ...lokasi.map((value) => ({ key: "lokasi" as const, value })),
    ...pengalaman.map((value) => ({ key: "pengalaman" as const, value })),
    ...pendidikan.map((value) => ({ key: "pendidikan" as const, value })),
    ...kecamatan.map((value) => ({ key: "kecamatan" as const, value })),
    ...(diperbarui
      ? [{ key: "diperbarui" as const, value: diperbarui }]
      : []),
    ...(perusahaan
      ? [{ key: "perusahaan" as const, value: companyName ?? perusahaan }]
      : []),
  ];

  return (
    <section className={styles.searchSection}>
      <div className={styles.searchInner}>
        <h1 className={styles.srOnly}>Cari lowongan</h1>

        <form
          className={styles.searchForm}
          role="search"
          action="/lowongan"
          method="get"
        >
          <div className={styles.searchRow}>
            <label className={`${styles.searchField} ${styles.keywordField}`}>
              <span className={styles.fieldControl}>
                <SearchIcon size={18} className={styles.fieldIcon} />
                <input
                  name="q"
                  defaultValue={q}
                  aria-label="Cari posisi atau kata kunci"
                  placeholder="Cari posisi atau kata kunci"
                />
              </span>
            </label>
            <label className={`${styles.searchField} ${styles.locationField}`}>
              <span className={styles.fieldControl}>
                <PinIcon size={18} className={styles.fieldIcon} />
                <input
                  name="location"
                  defaultValue={location}
                  aria-label="Lokasi"
                  placeholder="Kota atau Remote"
                />
              </span>
            </label>
            <Button type="submit" size="lg" className={styles.searchButton}>
              Cari lowongan
            </Button>
          </div>

          {tipe.length > 0 && (
            <input type="hidden" name="tipe" value={tipe.join(",")} />
          )}
          {lokasi.length > 0 && (
            <input type="hidden" name="lokasi" value={lokasi.join(",")} />
          )}
          {pengalaman.length > 0 && (
            <input
              type="hidden"
              name="pengalaman"
              value={pengalaman.join(",")}
            />
          )}
          {pendidikan.length > 0 && (
            <input
              type="hidden"
              name="pendidikan"
              value={pendidikan.join(",")}
            />
          )}
          {kecamatan.length > 0 && (
            <input
              type="hidden"
              name="kecamatan"
              value={kecamatan.join(",")}
            />
          )}
          {diperbarui && (
            <input type="hidden" name="diperbarui" value={diperbarui} />
          )}
          {perusahaan && (
            <input type="hidden" name="perusahaan" value={perusahaan} />
          )}
          {urutkan !== "relevan" && (
            <input type="hidden" name="urutkan" value={urutkan} />
          )}
        </form>

        {activeFilters.length > 0 && (
          <div className={styles.activeFilters}>
            <span className={styles.activeLabel}>Filter aktif:</span>
            {activeFilters.map((filter) => (
              <Link
                key={`${filter.key}-${filter.value}`}
                href={removeHref(filter.key, filter.value)}
                className={styles.activeFilter}
                aria-label={`Hapus filter ${filter.value}`}
              >
                {filter.value}
                <span aria-hidden="true">×</span>
              </Link>
            ))}
            <Link
              href={href({
                tipe: [],
                lokasi: [],
                pengalaman: [],
                pendidikan: [],
                kecamatan: [],
                diperbarui: "",
                perusahaan: "",
              })}
              className={styles.clearFilters}
            >
              Hapus semua
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
