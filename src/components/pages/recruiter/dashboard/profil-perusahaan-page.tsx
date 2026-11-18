"use client";

import { useRef, useState, type ChangeEvent } from "react";
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

type MediaItem = {
  id: string;
  label: string;
  kind: "photo" | "video";
  color?: string;
  src?: string;
};

const INITIAL_MEDIA: MediaItem[] = PHOTOS.map((photo, index) => ({
  id: `foto-${index}`,
  label: photo.label,
  kind: "photo",
  color: photo.color,
}));

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
  const [logoUrl, setLogoUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const logoInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const replaceInput = useRef<HTMLInputElement>(null);
  const replaceTarget = useRef<MediaItem | null>(null);

  function pickImage(
    event: ChangeEvent<HTMLInputElement>,
    onPick: (url: string) => void,
  ) {
    const file = event.target.files?.[0];
    if (file) onPick(URL.createObjectURL(file));
    event.target.value = "";
  }

  function addMedia(
    event: ChangeEvent<HTMLInputElement>,
    kind: MediaItem["kind"],
  ) {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) {
      setMedia((current) => [
        ...current,
        ...files.map((file, index) => ({
          id: `${kind}-${Date.now()}-${index}`,
          label: kind === "video" ? "Video baru" : "Foto baru",
          kind,
          src: URL.createObjectURL(file),
        })),
      ]);
    }
    event.target.value = "";
  }

  function startReplace(item: MediaItem) {
    replaceTarget.current = item;
    replaceInput.current?.click();
  }

  function replaceMedia(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    const target = replaceTarget.current;
    if (file && target) {
      const src = URL.createObjectURL(file);
      setMedia((current) =>
        current.map((item) => (item.id === target.id ? { ...item, src } : item)),
      );
    }
    replaceTarget.current = null;
    event.target.value = "";
  }

  function removeMedia(id: string) {
    setMedia((current) => current.filter((item) => item.id !== id));
  }

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
              <input
                ref={logoInput}
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => pickImage(event, setLogoUrl)}
              />
              <div className={styles.logoBox}>
                {logoUrl ? (
                  <div
                    className={styles.logoImage}
                    style={{
                      backgroundImage: `url(${logoUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    aria-hidden="true"
                  />
                ) : (
                  <span className={styles.companyLogo}>TL</span>
                )}
                <div className={styles.mediaText}>
                  <span className={styles.mediaLabel}>Logo</span>
                  <Button
                    type="button"
                    variant="outline"
                    className={styles.smallButton}
                    onClick={() => logoInput.current?.click()}
                  >
                    Ganti logo
                  </Button>
                </div>
              </div>

              <input
                ref={coverInput}
                type="file"
                accept="image/*"
                hidden
                onChange={(event) => pickImage(event, setCoverUrl)}
              />
              <div className={styles.coverBox}>
                <span className={styles.coverLabel}>Sampul · 1440 × 320</span>
                <div
                  className={styles.coverPreview}
                  aria-hidden="true"
                  style={
                    coverUrl
                      ? {
                          backgroundImage: `url(${coverUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                />
                <Button
                  type="button"
                  variant="outline"
                  className={styles.smallButton}
                  onClick={() => coverInput.current?.click()}
                >
                  Ganti sampul
                </Button>
              </div>
            </div>
          </section>

          <section className={`${styles.card} ${styles.photoCard}`}>
            <h2 className={styles.cardTitle}>Foto dan video</h2>

            <div className={styles.photoGrid}>
              {media.map((item) => (
                <div
                  key={item.id}
                  className={styles.photoTile}
                  style={
                    item.src
                      ? undefined
                      : { backgroundColor: item.color ?? "#e5e5e5" }
                  }
                >
                  {item.src ? (
                    item.kind === "video" ? (
                      <video
                        className={styles.photoMedia}
                        src={item.src}
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <div
                        className={styles.photoMedia}
                        style={{
                          backgroundImage: `url(${item.src})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        aria-hidden="true"
                      />
                    )
                  ) : null}
                  <span className={styles.photoLabel}>{item.label}</span>
                  <div className={styles.photoActions}>
                    <button
                      type="button"
                      className={styles.photoAction}
                      onClick={() => startReplace(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.photoAction}
                      onClick={() => removeMedia(item.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
              <input
                ref={photoInput}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(event) => addMedia(event, "photo")}
              />
              <input
                ref={videoInput}
                type="file"
                accept="video/*"
                multiple
                hidden
                onChange={(event) => addMedia(event, "video")}
              />
              <input
                ref={replaceInput}
                type="file"
                accept="image/*,video/*"
                hidden
                onChange={replaceMedia}
              />
              <button
                type="button"
                className={styles.photoAdd}
                onClick={() => photoInput.current?.click()}
              >
                <span className={styles.photoPlus} aria-hidden="true">
                  +
                </span>
                Tambah foto
              </button>
              <button
                type="button"
                className={styles.photoAdd}
                onClick={() => videoInput.current?.click()}
              >
                <span className={styles.photoPlus} aria-hidden="true">
                  +
                </span>
                Tambah video
              </button>
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
            <p className={styles.cardText}>
              Perubahan di formulir langsung tampil di pratinjau ini.
            </p>
            <div
              className={styles.publicBanner}
              style={
                coverUrl
                  ? {
                      backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.55), rgba(17, 17, 17, 0.55)), url(${coverUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              {logoUrl ? (
                <div
                  className={styles.publicLogoImage}
                  style={{
                    backgroundImage: `url(${logoUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-hidden="true"
                />
              ) : (
                <span className={styles.publicLogo}>TL</span>
              )}
              <span className={styles.publicName}>
                {companyName || "Nama perusahaan"}
              </span>
            </div>

            <p className={styles.publicMeta}>
              {[industry, size, office].filter(Boolean).join(" · ") ||
                "Industri · Ukuran · Kantor"}
            </p>
            <p className={styles.publicAbout}>
              {about || "Ceritakan tentang perusahaanmu."}
            </p>

            {media.length > 0 ? (
              <div className={styles.publicMediaRow}>
                {media.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className={styles.publicMedia}
                    style={
                      item.src
                        ? {
                            backgroundImage: `url(${item.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : { backgroundColor: item.color ?? "#e5e5e5" }
                    }
                    aria-hidden="true"
                  />
                ))}
                <span className={styles.publicMediaMore}>
                  {media.length} foto &amp; video
                </span>
              </div>
            ) : null}

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
