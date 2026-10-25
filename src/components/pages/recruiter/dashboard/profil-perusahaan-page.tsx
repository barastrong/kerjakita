"use client";

import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button/button";
import { PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

const COMPANY = {
  name: "Tokoloka",
  industry: "E-commerce",
  location: "Jakarta Selatan",
  employees: "1.200 karyawan",
  website: "tokoloka.id",
  about:
    "Tokoloka adalah marketplace yang menghubungkan penjual lokal dengan pembeli di seluruh Indonesia. Tim produk bekerja dalam squad kecil dan merilis fitur baru setiap dua minggu.",
};

export function ProfilPerusahaanPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Profil perusahaan"
        subtitle="Informasi ini tampil di halaman publik Tokoloka."
        action={
          <ButtonLink
            href="/perusahaan/tokoloka"
            variant="outline"
            className={styles.headerCta}
          >
            Lihat halaman publik
          </ButtonLink>
        }
      />

      <form
        className={styles.formCard}
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
        onChange={() => setSaved(false)}
      >
        <div className={styles.previewTop}>
          <span className={styles.previewLogo}>TL</span>
          <span className={styles.previewText}>
            <span className={styles.previewTitle}>{COMPANY.name}</span>
            <span className={styles.previewMeta}>
              {COMPANY.industry} · {COMPANY.location}
            </span>
          </span>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="company-name">
              Nama perusahaan
            </label>
            <input
              id="company-name"
              className={styles.input}
              defaultValue={COMPANY.name}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="company-industry">
              Industri
            </label>
            <input
              id="company-industry"
              className={styles.input}
              defaultValue={COMPANY.industry}
            />
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="company-location">
              Lokasi kantor
            </label>
            <input
              id="company-location"
              className={styles.input}
              defaultValue={COMPANY.location}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="company-employees">
              Jumlah karyawan
            </label>
            <input
              id="company-employees"
              className={styles.input}
              defaultValue={COMPANY.employees}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="company-website">
            Website
          </label>
          <input
            id="company-website"
            className={styles.input}
            defaultValue={COMPANY.website}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="company-about">
            Tentang perusahaan
          </label>
          <textarea
            id="company-about"
            className={styles.textarea}
            defaultValue={COMPANY.about}
          />
        </div>

        <div className={styles.formActions}>
          <Button type="submit">Simpan perubahan</Button>
          {saved ? (
            <p className={styles.savedNote} role="status">
              Perubahan disimpan.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
