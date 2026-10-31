"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { CheckIcon } from "@/components/ui/icons/icons";
import {
  COMPANY_VERIFICATION_COOKIE,
  type CompanyVerification,
} from "@/lib/data/company";
import { companyDirectory } from "@/lib/data/company-directory";
import { getCompany } from "@/lib/data/companies";
import { PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

const COMPANY = {
  name: "Tokoloka",
  industry: "E-commerce",
  size: "1.001 – 5.000 karyawan",
  office: "Jakarta Selatan dan Surabaya",
  about:
    "Tokoloka adalah marketplace yang menghubungkan penjual lokal dengan pembeli di seluruh Indonesia. Tim produk bekerja dalam squad kecil dan merilis fitur baru setiap dua minggu.",
};

const PHOTOS = [
  { label: "Kantor Jakarta", color: "#c9c8fb" },
  { label: "Ruang kolaborasi", color: "#bdf1d8" },
  { label: "Pantry", color: "#f9e08d" },
  { label: "Hackathon", color: "#f9cfe1" },
  { label: "Kantor Surabaya", color: "#bde3f7" },
  { label: "Gathering", color: "#d9d0f7" },
];

const FACILITIES = [
  "Kerja hybrid",
  "Asuransi kesehatan",
  "Dana pelatihan",
  "Cuti 15 hari",
  "Bonus tahunan",
  "Makan siang",
];

const COMPLETENESS = [
  { label: "Logo dan sampul", done: true },
  { label: "Tentang perusahaan", done: true },
  { label: "Minimal 6 foto", done: true },
  { label: "Tambah 1 video lagi", done: false },
  { label: "Isi tautan media sosial", done: false },
];

export function ProfilPerusahaanPage({
  verification: initialVerification,
}: {
  verification: CompanyVerification;
}) {
  const [verification, setVerification] = useState(initialVerification);
  const [companyName, setCompanyName] = useState(COMPANY.name);
  const [industry, setIndustry] = useState(COMPANY.industry);
  const [size, setSize] = useState(COMPANY.size);
  const [office, setOffice] = useState(COMPANY.office);
  const [about, setAbout] = useState(COMPANY.about);

  function updateCompanyName(value: string) {
    setCompanyName(value);
    const match = companyDirectory.find(
      (company) => company.name.toLowerCase() === value.trim().toLowerCase(),
    );
    if (!match) return;

    const detail = getCompany(match.slug);
    setIndustry(detail?.industry ?? match.industry);
    setSize(detail?.employees ?? "");
    setOffice(detail?.locations ?? "");
    setAbout(detail?.about ?? "");
  }

  const statusLabel =
    verification === "verified"
      ? "Terbit"
      : verification === "pending"
        ? "Menunggu verifikasi"
        : "Belum terverifikasi";
  const statusMeta =
    verification === "verified"
      ? "Diperbarui 12 Okt 2026 oleh Rina"
      : verification === "pending"
        ? "Pengajuan verifikasi sedang ditinjau admin."
        : "Ajukan verifikasi untuk menerbitkan halaman publik.";

  function requestVerification() {
    document.cookie = `${COMPANY_VERIFICATION_COOKIE}=pending; path=/; max-age=86400; samesite=lax`;
    setVerification("pending");
  }

  function unpublish() {
    document.cookie = `${COMPANY_VERIFICATION_COOKIE}=unverified; path=/; max-age=86400; samesite=lax`;
    setVerification("unverified");
  }

  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Profil perusahaan"
        subtitle={`Perubahan di sini tampil di halaman publik ${companyName || "perusahaan"}.`}
      />

      <div className={styles.contentGrid}>
        <div className={styles.leftColumn}>
          <form
            className={`${styles.card} ${styles.infoCard}`}
            onSubmit={(event) => event.preventDefault()}
          >
            <h2 className={styles.cardTitle}>Informasi dasar</h2>

            <div className={styles.infoGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="company-name">
                  Nama perusahaan
                </label>
                <input
                  id="company-name"
                  className={styles.input}
                  value={companyName}
                  onChange={(event) => updateCompanyName(event.target.value)}
                  list="company-options"
                  autoComplete="off"
                  aria-describedby="company-name-hint"
                />
                <datalist id="company-options">
                  {companyDirectory.map((company) => (
                    <option key={company.slug} value={company.name} />
                  ))}
                </datalist>
                <span id="company-name-hint" className={styles.cardText}>
                  Pilih perusahaan terdaftar atau ketik nama baru.
                </span>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="company-industry">
                  Industri
                </label>
                <input
                  id="company-industry"
                  className={styles.input}
                  value={industry}
                  onChange={(event) => setIndustry(event.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="company-size">
                  Ukuran
                </label>
                <input
                  id="company-size"
                  className={styles.input}
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="company-office">
                  Kantor
                </label>
                <input
                  id="company-office"
                  className={styles.input}
                  value={office}
                  onChange={(event) => setOffice(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="company-about">
                Tentang perusahaan
              </label>
              <textarea
                id="company-about"
                className={`${styles.textarea} ${styles.aboutInput}`}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>
          </form>

          <section className={`${styles.card} ${styles.mediaCard}`}>
            <h2 className={styles.cardTitle}>Logo dan sampul</h2>

            <div className={styles.mediaRow}>
              <div className={styles.logoBox}>
                <span className={styles.companyLogo}>TL</span>
                <div className={styles.mediaText}>
                  <span className={styles.mediaLabel}>Logo</span>
                  <Button type="button" variant="outline" className={styles.smallButton}>
                    Ganti logo
                  </Button>
                </div>
              </div>

              <div className={styles.coverBox}>
                <span className={styles.coverLabel}>Sampul · 1440 × 320</span>
                <div className={styles.coverPreview} aria-hidden="true" />
                <Button type="button" variant="outline" className={styles.smallButton}>
                  Ganti sampul
                </Button>
              </div>
            </div>
          </section>

          <section className={`${styles.card} ${styles.photoCard}`}>
            <h2 className={styles.cardTitle}>Foto dan video</h2>

            <div className={styles.photoGrid}>
              {PHOTOS.map((photo) => (
                <div
                  key={photo.label}
                  className={styles.photoTile}
                  style={{ backgroundColor: photo.color }}
                >
                  <span className={styles.photoLabel}>{photo.label}</span>
                </div>
              ))}
              {[0, 1].map((item) => (
                <button key={item} type="button" className={styles.photoAdd}>
                  <span className={styles.photoPlus} aria-hidden="true">
                    +
                  </span>
                  Tambah
                </button>
              ))}
            </div>
          </section>

          <section className={`${styles.card} ${styles.facilityCard}`}>
            <h2 className={styles.cardTitle}>Fasilitas</h2>
            <div className={styles.chips}>
              {FACILITIES.map((facility) => (
                <span key={facility} className={styles.chip}>
                  {facility}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={`${styles.card} ${styles.statusCard}`}>
            <h2 className={styles.cardTitle}>Status halaman</h2>
            <div className={styles.statusRow}>
              <span
                className={`${styles.tag} ${
                  verification === "verified" ? styles.tagMint : styles.statusPending
                }`}
              >
                {statusLabel}
              </span>
              <span className={styles.statusMeta}>{statusMeta}</span>
            </div>

            {verification === "unverified" ? (
              <Button
                type="button"
                className={styles.fullButton}
                onClick={requestVerification}
              >
                Ajukan verifikasi
              </Button>
            ) : null}

            {verification === "verified" ? (
              <Button
                type="button"
                variant="outline"
                className={styles.fullButton}
                onClick={unpublish}
              >
                Batalkan publikasi
              </Button>
            ) : null}
          </section>

          <section className={`${styles.card} ${styles.completenessCard}`}>
            <h2 className={styles.cardTitle}>Kelengkapan profil perusahaan</h2>
            <p className={styles.completenessValue}>80%</p>
            <div className={styles.completenessTrack} aria-hidden="true">
              <div className={styles.completenessFill} />
            </div>

            <ul className={styles.checkList}>
              {COMPLETENESS.map((item) => (
                <li key={item.label} className={styles.checkItem}>
                  {item.done ? (
                    <span className={styles.checkIcon}>
                      <CheckIcon size={12} />
                    </span>
                  ) : (
                    <span className={styles.checkEmpty} aria-hidden="true" />
                  )}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={`${styles.card} ${styles.publicCard}`}>
            <h2 className={styles.cardTitle}>Pratinjau halaman publik</h2>
            <div className={styles.publicBanner}>
              <span className={styles.publicLogo}>TL</span>
              <span className={styles.publicName}>
                {companyName || "Nama perusahaan"}
              </span>
            </div>
            <div className={styles.publicTabs}>
              <span className={styles.publicTabActive}>Ringkasan</span>
              <span>Ulasan</span>
              <span>Gaji</span>
              <span>Foto &amp; video</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
