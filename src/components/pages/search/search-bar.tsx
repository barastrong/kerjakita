import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BellIcon, PinIcon, SearchIcon } from "@/components/ui/icons/icons";
import styles from "./search-page.module.css";

type Filters = {
  tipe: string[];
  lokasi: string[];
  pengalaman: string[];
  kecamatan: string[];
  diperbarui: string;
};

export function SearchBar({
  q,
  location,
  tipe,
  lokasi,
  pengalaman,
  kecamatan,
  diperbarui,
}: { q: string; location: string } & Filters) {
  function href({
    tipe: nextTipe = tipe,
    lokasi: nextLokasi = lokasi,
    pengalaman: nextPengalaman = pengalaman,
    kecamatan: nextKecamatan = kecamatan,
    diperbarui: nextDiperbarui = diperbarui,
  }: Partial<Filters> = {}) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (location) params.set("location", location);
    if (nextTipe.length > 0) params.set("tipe", nextTipe.join(","));
    if (nextLokasi.length > 0) params.set("lokasi", nextLokasi.join(","));
    if (nextPengalaman.length > 0) {
      params.set("pengalaman", nextPengalaman.join(","));
    }
    if (nextKecamatan.length > 0) {
      params.set("kecamatan", nextKecamatan.join(","));
    }
    if (nextDiperbarui) params.set("diperbarui", nextDiperbarui);

    return `/lowongan${params.toString() ? `?${params.toString()}` : ""}`;
  }

  function removeHref(key: keyof Filters, value: string) {
    if (key === "diperbarui") return href({ diperbarui: "" });

    const next = {
      tipe: key === "tipe" ? tipe.filter((item) => item !== value) : tipe,
      lokasi:
        key === "lokasi" ? lokasi.filter((item) => item !== value) : lokasi,
      pengalaman:
        key === "pengalaman"
          ? pengalaman.filter((item) => item !== value)
          : pengalaman,
      kecamatan:
        key === "kecamatan"
          ? kecamatan.filter((item) => item !== value)
          : kecamatan,
    };
    return href(next);
  }

  const activeFilters = [
    ...tipe.map((value) => ({ key: "tipe" as const, value })),
    ...lokasi.map((value) => ({ key: "lokasi" as const, value })),
    ...pengalaman.map((value) => ({ key: "pengalaman" as const, value })),
    ...kecamatan.map((value) => ({ key: "kecamatan" as const, value })),
    ...(diperbarui
      ? [{ key: "diperbarui" as const, value: diperbarui }]
      : []),
  ];

  return (
    <section className={styles.searchSection}>
      <form className={styles.searchRow} role="search" action="/lowongan">
        <label className={styles.searchField}>
          <span className={styles.srOnly}>Posisi atau kata kunci</span>
          <SearchIcon size={18} className={styles.fieldIcon} />
          <input name="q" defaultValue={q} placeholder="Posisi atau kata kunci" />
        </label>
        <label className={`${styles.searchField} ${styles.locationField}`}>
          <span className={styles.srOnly}>Lokasi</span>
          <PinIcon size={18} className={styles.fieldIcon} />
          <input
            name="location"
            defaultValue={location}
            placeholder="Lokasi"
          />
        </label>
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
        {kecamatan.length > 0 && (
          <input type="hidden" name="kecamatan" value={kecamatan.join(",")} />
        )}
        {diperbarui && (
          <input type="hidden" name="diperbarui" value={diperbarui} />
        )}
        <Button type="submit" className={styles.searchButton}>
          Cari
        </Button>
        <button type="button" className={styles.saveButton}>
          <BellIcon size={18} />
          Simpan pencarian
        </button>
      </form>

      {activeFilters.length > 0 && (
        <div className={styles.activeFilters}>
          <span className={styles.activeLabel}>Filter aktif:</span>
          {activeFilters.map((filter) => (
            <Link
              key={`${filter.key}-${filter.value}`}
              href={removeHref(filter.key, filter.value)}
              className={styles.activeFilter}
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
              kecamatan: [],
              diperbarui: "",
            })}
            className={styles.clearFilters}
          >
            Hapus semua
          </Link>
        </div>
      )}
    </section>
  );
}
