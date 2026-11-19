import type { CSSProperties } from "react";
import Link from "next/link";
import Script from "next/script";

import { jobs } from "@/lib/data/jobs";

import { RevealSection } from "./reveal-section";

const demoCompanyCount = new Set(jobs.map((job) => job.companySlug)).size;
const demoCityCount = new Set(jobs.map((job) => job.location)).size;
const strongMatchCount = jobs.filter((job) => job.match >= 80).length;

const kitCss = [
  "/assets/system.css",
  "/assets/ui/cards.css",
  "/assets/motion/motion.css",
  "/assets/backgrounds/backgrounds.css",
  "/assets/layout/layout.css",
  "/assets/icons/icon.css",
  "/assets/ui/base.css",
  "/assets/ui/window/fragment.css",
  "/assets/ui/doc/fragment.css",
  "/assets/ui/stat/fragment.css",
  "/assets/ui/checklist/fragment.css",
  "/assets/ui/notify/fragment.css",
  "/assets/ui/toggles/fragment.css",
  "/assets/ui/search/fragment.css",
  "/assets/kerjakita.css",
];

function KitAssets() {
  return (
    <>
      {kitCss.map((href) => (
        <link
          key={href}
          rel="stylesheet"
          href={href}
          precedence="kit"
          data-kit=""
        />
      ))}
      <Script src="/assets/system.js" type="module" strategy="afterInteractive" />
      <Script src="/assets/layout/layout.js" type="module" strategy="afterInteractive" />
      <Script src="/assets/motion/motion.js" type="module" strategy="afterInteractive" />
    </>
  );
}

function WindowPane({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="ui ui-panel ui-win"
      data-ui="window"
      data-ui-opts={compact ? '{"compact":true}' : undefined}
      data-open="Dibuka"
      data-work="Diproses"
      data-done="Dibalas"
    >
      <div className="ui-win__bar">
        <span className="ui-win__crumb">
          Kerjakita <i>/</i> <b>Lowongan</b>
        </span>
        <span className="ui-spacer" />
        <span className="ui-win__search" aria-hidden="true">
          <svg className="ui-icon" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" />
          </svg>
          <span className="ui-win__ph">Cari</span>
          <span className="ui-kbd">/</span>
        </span>
      </div>
      <div className="ui-win__body">
        <nav className="ui-win__side" aria-hidden="true">
          <span className="ui-win__nav is-on">
            <svg className="ui-icon" viewBox="0 0 16 16">
              <path d="M2.5 9h3l1 1.5h3l1-1.5h3" />
              <path d="M2.5 9 4 3.5h8L13.5 9v3.5h-11z" />
            </svg>
            Dibuka
            <em>24</em>
          </span>
          <span className="ui-win__nav">
            <svg className="ui-icon" viewBox="0 0 16 16">
              <circle cx="8" cy="6" r="2.5" />
              <path d="M3.5 13.5c.6-2.3 2.4-3.5 4.5-3.5s3.9 1.2 4.5 3.5" />
            </svg>
            Diproses
            <em>6</em>
          </span>
          <span className="ui-win__nav">
            <svg className="ui-icon" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="5.5" />
              <path d="M8 5v3l2 1.5" />
            </svg>
            Dibalas
            <em>12</em>
          </span>
          <span className="ui-win__label">Kategori</span>
          <span className="ui-win__nav">
            <span className="ui-win__hash">#</span>Frontend
          </span>
          <span className="ui-win__nav">
            <span className="ui-win__hash">#</span>Data
          </span>
          <span className="ui-win__nav">
            <span className="ui-win__hash">#</span>Desain
          </span>
        </nav>
        <div className="ui-win__main">
          <div className="ui-win__cols" aria-hidden="true">
            <span>Perusahaan</span>
            <span>Posisi</span>
            <span>Status</span>
            <span>Umur</span>
          </div>
          <ul className="ui-win__rows">
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="1">TL</span>
              <span className="ui-win__who">Tokoloka</span>
              <span className="ui-win__sub">Frontend Engineer · Jakarta</span>
              <span className="ui-win__st" data-st="">Dibuka</span>
              <span className="ui-win__age">2m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="3">BP</span>
              <span className="ui-win__who">Bayarpintar</span>
              <span className="ui-win__sub">Data Analyst · Jakarta</span>
              <span className="ui-win__st" data-st="">Dibuka</span>
              <span className="ui-win__age">5m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="4">DG</span>
              <span className="ui-win__who">Dagangin</span>
              <span className="ui-win__sub">Product Designer · Jakarta</span>
              <span className="ui-win__st" data-st="">Dibuka</span>
              <span className="ui-win__age">9m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="2">KS</span>
              <span className="ui-win__who">Kopi Sinar Digital</span>
              <span className="ui-win__sub">Backend Engineer · Jakarta</span>
              <span className="ui-win__st" data-st="">Diproses</span>
              <span className="ui-win__age">14m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="5">LK</span>
              <span className="ui-win__who">Lokalkarya</span>
              <span className="ui-win__sub">QA Engineer · Jakarta</span>
              <span className="ui-win__st" data-st="">Dibuka</span>
              <span className="ui-win__age">21m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="3">NW</span>
              <span className="ui-win__who">Nawasehat</span>
              <span className="ui-win__sub">UI Designer · Jakarta</span>
              <span className="ui-win__st is-done" data-st="">Dibalas</span>
              <span className="ui-win__age">26m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="4">GR</span>
              <span className="ui-win__who">Garuda Retail Tech</span>
              <span className="ui-win__sub">Marketing Analyst · Jakarta</span>
              <span className="ui-win__st" data-st="">Dibuka</span>
              <span className="ui-win__age">33m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="1">TL</span>
              <span className="ui-win__who">Tokoloka</span>
              <span className="ui-win__sub">DevOps Engineer · Jakarta</span>
              <span className="ui-win__st" data-st="">Diproses</span>
              <span className="ui-win__age">41m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="2">BP</span>
              <span className="ui-win__who">Bayarpintar</span>
              <span className="ui-win__sub">Content Strategist · Jakarta</span>
              <span className="ui-win__st" data-st="">Dibuka</span>
              <span className="ui-win__age">48m</span>
            </li>
            <li className="ui-win__row" data-row="">
              <span className="ui-avatar" data-tone="5">DG</span>
              <span className="ui-win__who">Dagangin</span>
              <span className="ui-win__sub">Mobile Engineer · Jakarta</span>
              <span className="ui-win__st is-done" data-st="">Dibalas</span>
              <span className="ui-win__age">55m</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function MatchDoc() {
  return (
    <div className="ui ui-doc" data-ui="doc">
      <article className="ui-doc__page">
        <div className="ui-doc__label">Laporan kecocokan · Frontend Engineer</div>
        <div className="ui-doc__title">Kenapa skor 92</div>
        <div className="ui-doc__text">
          Lowongan ini meminta lima tahun React dan pengalaman memimpin tim kecil. Profilmu memenuhi
          keduanya: <mark className="ui-doc__mark is-on">5 tahun React</mark> di dua perusahaan, dan
          satu tahun sebagai lead proyek internal.
        </div>
        <div className="ui-doc__text">
          Tiga syarat lain cocok: kota Jakarta, kerja hibrida, dan gaji di atas batas bawahmu.{" "}
          <mark
            className="ui-doc__mark"
            data-kind="Cocok"
            data-msg="Gaji yang diminta masuk rentang lowongan."
            data-where="Preferensi gaji, 12 Okt"
          >
            Rentang gaji 18 sampai 24 juta
          </mark>{" "}
          juga disebut di lowongan.
        </div>
        <div className="ui-doc__text">
          Satu syarat belum terlihat di profil: pengujian otomatis.{" "}
          <mark
            className="ui-doc__mark"
            data-kind="Celah"
            data-msg="Tidak ada bukti pengujian di profil atau portofolio."
            data-where="Syarat nomor 4"
          >
            Pengalaman menulis tes
          </mark>{" "}
          diminta untuk posisi ini.
        </div>
        <div className="ui-doc__text">
          Kamu bisa menutupnya dengan kursus singkat atau menambahkan contoh pekerjaan. Setelah itu
          skor dihitung ulang saat kamu membuka lowongan ini lagi.
        </div>
        <div className="ui-doc__text">
          Yang perlu kamu bawa saat melamar: portofolio tiga proyek React, satu contoh kepemimpinan
          tim, dan rentang gaji yang kamu tulis di profil.
        </div>
        <div className="ui-doc__text">
          Kerjakita tidak mengirim profilmu ke perusahaan sebelum kamu menekan Kirim lamaran.
        </div>
        <div className="ui-doc__text">
          Kalau ada syarat yang berubah, laporan ini diperbarui dan kamu mendapat notifikasi.
        </div>
        <div className="ui-doc__text">
          Kamu bisa menutup laporan kapan saja dan kembali ke daftar lowongan.
        </div>
      </article>
      <aside className="ui-doc__note ui-panel is-on" aria-live="polite">
        <div className="ui-doc__kind">
          <span className="ui-doc__dot" />
          <span data-doc-kind="">Celah</span>
        </div>
        <div className="ui-doc__msg" data-doc-msg="">
          Kursus pengujian 4 modul menutup syarat ini.
        </div>
        <div className="ui-doc__where" data-doc-where="">
          Rekomendasi Kerjakita
        </div>
      </aside>
    </div>
  );
}

function SearchPane() {
  return (
    <div className="ui ui-panel ui-search" data-ui="search">
      <div className="ui-search__field">
        <svg className="ui-icon" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" />
        </svg>
        <span className="ui-search__q">
          <span data-search-q="">jakarta</span>
        </span>
        <kbd className="ui-search__kbd">Ctrl K</kbd>
      </div>
      <div className="ui-search__group">Lowongan</div>
      <ul className="ui-search__list" data-search-list="">
        <li className="ui-search__row is-sel">
          <span className="ui-search__ico">
            <svg className="ui-icon" viewBox="0 0 16 16">
              <path d="M2.5 9h3l1 1.5h3l1-1.5h3" />
              <path d="M2.5 9 4 3.5h8L13.5 9v3.5h-11z" />
            </svg>
          </span>
          <span className="ui-search__t"><b>Frontend</b> Engineer · <b>Jakarta</b></span>
          <span className="ui-search__m">92%</span>
        </li>
        <li className="ui-search__row">
          <span className="ui-search__ico">
            <svg className="ui-icon" viewBox="0 0 16 16">
              <path d="M2.5 9h3l1 1.5h3l1-1.5h3" />
              <path d="M2.5 9 4 3.5h8L13.5 9v3.5h-11z" />
            </svg>
          </span>
          <span className="ui-search__t"><b>Data</b> Analyst · <b>Jakarta</b></span>
          <span className="ui-search__m">88%</span>
        </li>
        <li className="ui-search__row">
          <span className="ui-search__ico">
            <svg className="ui-icon" viewBox="0 0 16 16">
              <path d="M2.5 9h3l1 1.5h3l1-1.5h3" />
              <path d="M2.5 9 4 3.5h8L13.5 9v3.5h-11z" />
            </svg>
          </span>
          <span className="ui-search__t"><b>UI</b> Designer · <b>Jakarta</b></span>
          <span className="ui-search__m">84%</span>
        </li>
      </ul>
      <div className="ui-search__foot">
        <span><kbd>↑</kbd><kbd>↓</kbd> untuk pindah</span>
        <span><kbd>Enter</kbd> untuk buka</span>
      </div>
    </div>
  );
}

function StatPane() {
  return (
    <div
      className="ui ui-panel ui-stat"
      data-ui="stat"
      data-ui-opts='{"fill":true}'
      data-from="61"
      data-to="92"
      data-suffix="%"
    >
      <div className="ui-stat__head">
        <div className="ui-stat__top">
          <span className="ui-stat__label">Kecocokan dengan profil</span>
          <span className="ui-stat__range">
            7 hari terakhir
            <svg className="ui-icon" viewBox="0 0 16 16" aria-hidden="true">
              <path d="m4.5 6.5 3.5 3.5 3.5-3.5" />
            </svg>
          </span>
        </div>
        <div className="ui-stat__line">
          <span className="ui-stat__num" data-stat-num="">92%</span>
        </div>
      </div>
      <div className="ui-stat__chart">
        <svg
          className="ui-stat__svg"
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path className="ui-stat__grid" d="M0 30.5H400M0 60.5H400M0 90.5H400" />
          <path className="ui-stat__cover" fillRule="evenodd" d="" />
          <g className="ui-stat__bars">
            <rect rx="3" x="0.00" y="64.00" width="21.14" height="56.00" />
            <rect rx="3" x="29.14" y="58.00" width="21.14" height="62.00" />
            <rect rx="3" x="58.29" y="60.00" width="21.14" height="60.00" />
            <rect rx="3" x="87.43" y="54.00" width="21.14" height="66.00" />
            <rect rx="3" x="116.57" y="56.00" width="21.14" height="64.00" />
            <rect rx="3" x="145.71" y="50.00" width="21.14" height="70.00" />
            <rect rx="3" x="174.86" y="52.00" width="21.14" height="68.00" />
            <rect rx="3" x="204.00" y="46.00" width="21.14" height="74.00" />
            <rect rx="3" x="233.14" y="48.00" width="21.14" height="72.00" />
            <rect rx="3" x="262.29" y="40.00" width="21.14" height="80.00" />
            <rect rx="3" x="291.43" y="42.00" width="21.14" height="78.00" />
            <rect rx="3" x="320.57" y="34.00" width="21.14" height="86.00" />
            <rect rx="3" x="349.71" y="36.00" width="21.14" height="84.00" />
            <rect rx="3" x="378.86" y="28.00" width="21.14" height="92.00" />
          </g>
        </svg>
        <div className="ui-stat__axis" aria-hidden="true">
          <span>1 Nov</span>
          <span>5 Nov</span>
          <span>Hari ini</span>
        </div>
      </div>
    </div>
  );
}

function ChecklistPane() {
  const rows = [
    { done: true, label: "Profil dan CV diunggah" },
    { done: true, label: "Preferensi gaji diisi" },
    { done: false, label: "Baca laporan kecocokan" },
    { done: false, label: "Kirim lamaran" },
    { done: false, label: "Siapkan portofolio" },
  ];
  return (
    <div className="ui ui-panel ui-checks" data-ui="checklist">
      <div className="ui-checks__head">
        <div className="ui-title">Langkah melamar</div>
        <span className="ui-spacer" />
          <div className="ui-meta" data-checks-count="">2 dari 5</div>
      </div>
      <div className="ui-checks__bar">
        <i data-checks-bar="" style={{ "--k": 0.4 } as CSSProperties} />
      </div>
      <ul className="ui-checks__list">
        {rows.map((row) => (
          <li key={row.label} className={row.done ? "ui-check is-done" : "ui-check"}>
            <span className="ui-check__box">
              <svg viewBox="0 0 16 16">
                <path d="m4.5 8.2 2.3 2.3 4.7-5" />
              </svg>
            </span>
            <span className="ui-check__label">{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TogglesPane() {
  const rows = [
    { label: "Frontend dan React", sub: "Peran utama yang kamu cari", on: true },
    { label: "Jakarta dan sekitarnya", sub: "Kerja di kantor atau hibrida", on: true },
    { label: "Gaji di atas 15 juta", sub: "Batas bawah yang kamu mau", on: true },
    { label: "Perusahaan tahap awal", sub: "Tim di bawah 100 orang", on: false },
    { label: "Kirim ringkasan mingguan", sub: "Setiap Senin pagi", on: true },
  ];
  return (
    <div className="ui ui-panel ui-toggles" data-ui="toggles">
      <div className="ui-head">
        <svg className="ui-icon ui-toggles__ico" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M8 1.8 13 4v3.6c0 3-2.1 5.4-5 6.6-2.9-1.2-5-3.6-5-6.6V4z" />
          <path d="m5.8 8 1.6 1.6 3-3.2" />
        </svg>
        <div className="ui-title">Preferensi lowongan</div>
        <span className="ui-spacer" />
        <div className="ui-meta" data-tg-count="">4 dari 5 aktif</div>
      </div>
      <ul className="ui-toggles__list">
        {rows.map((row) => (
          <li key={row.label} className="ui-tg">
            <span className="ui-tg__text">
              <span className="ui-tg__label">{row.label}</span>
              <span className="ui-tg__sub">{row.sub}</span>
            </span>
            <span className={row.on ? "ui-switch is-on" : "ui-switch"} aria-hidden="true">
              <i />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotifyPane() {
  return (
    <div className="ui ui-notify" data-ui="notify">
      <ul className="ui-notify__list" data-notify-list="">
        <li className="ui-note">
          <span className="ui-agent ui-note__av" aria-hidden="true" />
          <span className="ui-note__text">
            <span className="ui-note__title">
              <span className="ui-note__t">Lamaranmu dibuka Tokoloka</span><time>2m</time>
            </span>
            <span className="ui-note__body">Frontend Engineer · Jakarta · skor 92</span>
          </span>
          <span className="ui-btn ui-btn--sm ui-note__btn">Buka</span>
        </li>
        <li className="ui-note">
          <span className="ui-avatar ui-note__av" data-tone="5">HD</span>
          <span className="ui-note__text">
            <span className="ui-note__title">
              <span className="ui-note__t">Nawasehat membalas</span><time>1j</time>
            </span>
            <span className="ui-note__body">Mereka ingin wawancara minggu depan</span>
          </span>
        </li>
        <li className="ui-note">
          <span className="ui-note__ico">
            <svg className="ui-icon" viewBox="0 0 16 16">
              <path d="m3.5 8.4 2.8 2.8 6.2-6.4" />
            </svg>
          </span>
          <span className="ui-note__text">
            <span className="ui-note__title">
              <span className="ui-note__t">3 lamaran dibalas</span><time>3j</time>
            </span>
            <span className="ui-note__body">Semua di halaman lamaran</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

function ProfileCard() {
  const rows = [
    { label: "Pengalaman 5 tahun", value: "Selesai" },
    { label: "Keterampilan React", value: "Selesai" },
    { label: "Portofolio 3 proyek", value: "Kurang 1" },
  ];
  return (
    <div className="ui ui-panel kp-profile">
      <div className="kp-profile__head">
        <span className="ui-avatar" data-tone="2">NP</span>
        <div className="kp-profile__who">
          <b>Nadia Putri</b>
          <span>Frontend Engineer · Jakarta</span>
        </div>
        <span className="ui-chip">80%</span>
      </div>
      <div className="kp-profile__bar">
        <i style={{ "--k": 0.8 } as CSSProperties} />
      </div>
      <ul className="kp-profile__rows">
        {rows.map((row) => (
          <li key={row.label}>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m3.5 8.4 2.8 2.8 6.2-6.4" />
            </svg>
            <span>{row.label}</span>
            <em>{row.value}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <KitAssets />
      <main id="top">
        <section className="hero hero--triptych bg-paper" aria-labelledby="hero-h">
          <div className="wrap">
            <div className="hero-text grid hero__grid">
              <div className="span-3">
                <h1 id="hero-h">Lowongan yang cocok di Indonesia.</h1>
                <p className="hero__lead">
                  Kerjakita membaca profil dan lowongan yang sama, lalu menunjukkan kecocokannya.
                  Mulai dari satu lowongan, bukan seratus tab.
                </p>
              </div>
              <div
                className="ly-collage span-6 start-4"
                role="img"
                aria-label="Lowongan Frontend Engineer di Tokoloka dengan skor kecocokan 92, dan lamaran yang sudah dibalas"
              >
                <div className="ly-collage__set is-on">
                  <div className="ly-piece pc-card pc-job">
                    <div className="pc-head">
                      <span className="pc-logo">TL</span>
                      <div>
                        <b>Frontend Engineer</b>
                        <span>Tokoloka · Jakarta</span>
                      </div>
                      <span className="pc-chip">Hibrida</span>
                    </div>
                    <div className="pc-tags">
                      <span>React</span>
                      <span>TypeScript</span>
                      <span>5 tahun</span>
                    </div>
                    <div className="pc-line">
                      <span>18 sampai 24 juta</span>
                      <em>Dibuka 2 hari</em>
                    </div>
                  </div>
                  <div className="ly-piece pc-card pc-match">
                    <span className="pc-label">Skor kecocokan</span>
                    <div className="pc-score">92</div>
                    <div className="pc-bar">
                      <i style={{ "--k": 0.92 } as CSSProperties} />
                    </div>
                    <div className="pc-row"><span>5 tahun React</span><b>Cocok</b></div>
                    <div className="pc-row"><span>Rentang gaji</span><b>Cocok</b></div>
                    <div className="pc-row is-gap"><span>Pengujian otomatis</span><b>Celah</b></div>
                  </div>
                  <div className="ly-piece pc-card pc-apply">
                    <span className="pc-label">Status lamaran</span>
                    <div className="pc-steps">
                      <div className="is-done"><i />Dikirim 12 Okt</div>
                      <div className="is-done"><i />Dibuka Tokoloka</div>
                      <div className="is-now"><i />Menunggu jadwal wawancara</div>
                      <div><i />Balasan</div>
                    </div>
                    <div className="pc-next">
                      <span className="pc-label">Langkah berikutnya</span>
                      <div className="pc-row"><span>Wawancara teknis</span><b>16 Okt, 10.00</b></div>
                      <div className="pc-row"><span>Siapkan</span><b>Portofolio</b></div>
                    </div>
                    <div className="pc-note">Contoh data.</div>
                  </div>
                  <div className="ly-piece pc-card pc-toast">
                    <span className="ui-avatar" data-tone="5">NW</span>
                    <div className="pc-toast__text">
                      <b>Nawasehat membalas</b>
                      <span>Ingin wawancara minggu depan</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="span-3 start-10 hero__cta">
                <Link className="btn btn--primary" href="/lowongan">
                  Cari lowongan
                </Link>
                <span className="hero__note">Gratis untuk pencari kerja.</span>
              </div>
            </div>
          </div>
        </section>

        <RevealSection className="section" id="cara" labelledBy="cara-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="cara-h">
                Satu lowongan, satu laporan dari Kerjakita.
              </h2>
              <p className="t-lead muted">
                Kerjakita membaca syarat lowongan dan profilmu, lalu menulis laporan singkat: apa
                yang cocok, apa yang kurang, dan langkah berikutnya.
              </p>
              <p>
                <Link className="link" href="/lowongan">Lihat lowongan</Link>
              </p>
            </div>
            <div className="ui app fill" role="img" aria-label="Daftar lowongan Kerjakita dan laporan kecocokan untuk Frontend Engineer">
              <div className="app__pane app__pane--list">
                <WindowPane />
              </div>
              <div className="app__pane app__pane--open">
                <MatchDoc />
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section g2" id="produk" labelledBy="produk-h">
          <div className="wrap">
            <div className="group">
              <div className="section-head">
                <h2 id="produk-h">
                  Yang Kerjakita lihat sebelum kamu melamar.{" "}
                  <span className="muted">Empat hal, satu layar.</span>
                </h2>
              </div>
              <div className="grid">
                <article className="card card--row span-6 card--open">
                  <h3>Cari lowongan dengan kata yang kamu pakai.</h3>
                  <p>
                    Ketik peran, kota, atau teknologi. Hasilnya lowongan yang syaratnya sudah dibaca,
                    bukan judul yang mirip.
                  </p>
                  <div className="panel">
                    <div className="stage stage--fade-b">
                      <div
                        className="at-rise fit to-edge"
                        style={{ "--fit-max": "520px", "--ax": "max(24px, 50% - 260px)", "--ay": "56px" } as CSSProperties}
                      >
                        <SearchPane />
                      </div>
                    </div>
                  </div>
                </article>
                <article className="card card--row span-6 card--open">
                  <h3>Lihat skor lowongan sebelum melamar.</h3>
                  <p>
                    Setiap lowongan membawa alasan: syarat yang cocok, yang kurang, dan cara
                    menutupnya.
                  </p>
                  <div className="panel">
                    <div className="stage stage--fade-b">
                      <div
                        className="at-rise fit to-edge"
                        style={{ "--fit-max": "520px", "--ax": "max(24px, 50% - 260px)", "--ay": "56px" } as CSSProperties}
                      >
                        <StatPane />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div className="group">
              <div className="grid">
                <article className="card card--row span-6 card--open">
                  <h3>Atur lowongan yang masuk.</h3>
                  <p>
                    Pilih kota, jenis kerja, dan gaji minimum. Lowongan di luar itu tidak muncul di
                    berandamu.
                  </p>
                  <div className="panel">
                    <div className="stage stage--fade-b">
                      <div
                        className="at-right to-edge"
                        style={{ "--ax": "32px", "--ay": "56px" } as CSSProperties}
                      >
                        <TogglesPane />
                      </div>
                    </div>
                  </div>
                </article>
                <article className="card card--row span-6 card--open">
                  <h3>Tahu langkah lamaran untuk lowongan berikutnya.</h3>
                  <p>
                    Setiap lamaran punya langkah yang jelas: unggah profil, atur preferensi, kirim.
                    Kerjakita menandai yang sudah selesai.
                  </p>
                  <div className="panel">
                    <div className="stage stage--fade-b">
                      <div
                        className="at-rise fit"
                        style={{ "--fit-max": "480px", "--ax": "32px", "--ay": "calc(100% - 180px)", "--ay-sm": "calc(100% - 180px)" } as CSSProperties}
                      >
                        <ChecklistPane />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section ground-surface" id="angka" labelledBy="angka-h">
          <div className="wrap">
            <div className="grid">
              <h2 id="angka-h" className="span-5">Isi katalog contoh Kerjakita.</h2>
              <div className="span-7 start-6">
                <p className="t-lead muted">
                  Angka di halaman ini dihitung dari data contoh yang sama dengan halaman lowongan.
                </p>
                <p>
                  <Link className="link" href="/lowongan">Lihat lowongan terbuka</Link>
                </p>
              </div>
            </div>
            <div className="stats">
              <div className="stat">
                <p className="t-stat">{jobs.length}</p>
                <p className="t-small muted">lowongan contoh di katalog</p>
              </div>
              <div className="stat">
                <p className="t-stat">{demoCompanyCount}</p>
                <p className="t-small muted">perusahaan di katalog</p>
              </div>
              <div className="stat">
                <p className="t-stat">{demoCityCount}</p>
                <p className="t-small muted">kota asal lowongan</p>
              </div>
              <div className="stat">
                <p className="t-stat">{strongMatchCount}</p>
                <p className="t-small muted">lowongan dengan skor 80 ke atas</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section ground-surface" id="langkah" labelledBy="langkah-h">
          <div className="wrap">
            <div className="section-head">
              <h2 id="langkah-h">Tiga langkah menuju lowongan yang cocok.</h2>
            </div>
            <div className="grid">
              <article className="card card--row span-4">
                <span className="step-num">01</span>
                <h3>Lengkapi profil lamaranmu</h3>
                <p>
                  Isi pengalaman, keterampilan, kota, dan gaji yang kamu mau. Sekali, lalu dipakai di
                  semua lamaran.
                </p>
                <div className="panel">
                  <div className="stage stage--fade-b">
                    <div
                      className="at-rise fit"
                      style={{ "--fit-max": "340px", "--ax": "32px", "--ay": "48px" } as CSSProperties}
                    >
                      <ProfileCard />
                    </div>
                  </div>
                </div>
              </article>
              <article className="card card--row span-4">
                <span className="step-num">02</span>
                <h3>Baca lowongan yang cocok</h3>
                <p>
                  Kerjakita menyaring lowongan mitra dan menunjukkan alasannya, bukan hanya judul.
                </p>
                <div className="panel">
                  <div className="stage stage--fade-b">
                    <div
                      className="at-rise fit"
                      style={{ "--fit-max": "440px", "--ax": "24px", "--ay": "48px" } as CSSProperties}
                    >
                      <WindowPane compact />
                    </div>
                  </div>
                </div>
              </article>
              <article className="card card--row span-4">
                <span className="step-num">03</span>
                <h3>Kirim lamaran dan pantau</h3>
                <p>
                  Satu klik mengirim lamaran. Setiap perubahan status masuk ke notifikasi.
                </p>
                <div className="panel">
                  <div className="stage stage--fade-b">
                    <div
                      className="at-rise fit"
                      style={{ "--fit-max": "380px", "--ax": "32px", "--ay": "calc(100% - 180px)", "--ay-sm": "calc(100% - 180px)" } as CSSProperties}
                    >
                      <NotifyPane />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section ground-inverse" id="kursus" labelledBy="kursus-h">
          <div className="wrap">
            <div className="grid">
              <div className="span-5">
                <h2 id="kursus-h">Kursus dari Kerjakita untuk menutup celah.</h2>
                <p className="t-lead muted">
                  Kursus singkat dari mitra, dipilih dari syarat lowongan yang belum kamu penuhi.
                </p>
                <p>
                  <Link className="link" href="/kursus">Lihat semua kursus</Link>
                </p>
              </div>
              <div className="span-7 start-6">
                <ul className="courses">
                  <li className="course">
                    <div className="course__top">
                      <span className="course__no">01</span>
                      <span className="course__mods">12 modul</span>
                    </div>
                    <h3 className="course__name">Dasar SQL untuk analis</h3>
                    <p>Query pertama sampai gabungan tabel, dalam bahasa Indonesia.</p>
                  </li>
                  <li className="course">
                    <div className="course__top">
                      <span className="course__no">02</span>
                      <span className="course__mods">9 modul</span>
                    </div>
                    <h3 className="course__name">React untuk pemula</h3>
                    <p>Komponen, state, dan form; latihan dari lowongan nyata.</p>
                  </li>
                  <li className="course">
                    <div className="course__top">
                      <span className="course__no">03</span>
                      <span className="course__mods">5 modul</span>
                    </div>
                    <h3 className="course__name">Menulis lamaran yang dibaca</h3>
                    <p>Struktur surat, contoh, dan kesalahan yang paling sering.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="section" id="faq" labelledBy="faq-h">
          <div className="wrap">
            <div className="grid">
              <div className="span-5">
                <h2 id="faq-h">Pertanyaan soal lowongan dan lamaran.</h2>
              </div>
              <div className="span-7 start-6">
                <div className="faq">
                  <div className="faq__item">
                    <h3>Apakah Kerjakita gratis?</h3>
                    <p>Untuk pencari kerja, ya. Melamar dan membaca skor tidak dipungut biaya.</p>
                  </div>
                  <div className="faq__item">
                    <h3>Dari mana skor kecocokan lowongan dihitung?</h3>
                    <p>
                      Dari syarat di lowongan dan isi profilmu: pengalaman, keterampilan, kota, dan
                      gaji yang kamu minta.
                    </p>
                  </div>
                  <div className="faq__item">
                    <h3>Apakah semua lowongan sudah diperiksa?</h3>
                    <p>
                      Setiap lowongan dari mitra dicek izin dan detailnya sebelum tayang. Yang tidak
                      lolos tidak muncul.
                    </p>
                  </div>
                  <div className="faq__item">
                    <h3>Berapa lama lowongan membalas lamaran?</h3>
                    <p>
                      Waktu balasan tergantung perusahaan. Setiap perubahan status muncul di halaman
                      lamaran.
                    </p>
                  </div>
                  <div className="faq__item">
                    <h3>Bisakah profil pencari lowongan disembunyikan?</h3>
                    <p>
                      Bisa. Matikan visibilitas di pengaturan profil; lamaran yang sudah dikirim
                      tetap berjalan.
                    </p>
                  </div>
                  <div className="faq__item">
                    <h3>Apakah kursus wajib sebelum melamar lowongan?</h3>
                    <p>
                      Tidak. Kursus hanya muncul saat sebuah lowongan meminta keterampilan yang
                      belum ada di profilmu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </main>

      <footer className="footer closing footer--dark ground-inverse" aria-labelledby="close-h">
        <div className="wrap">
          <div className="closing__cta close--word">
            <div className="section-head--split">
              <div>
                <h2 id="close-h">Siap cari lowongan?</h2>
                <p className="t-lead">Satu profil, satu laporan, satu tempat memantau lamaran.</p>
              </div>
              <Link className="btn btn--primary" href="/lowongan">
                Cari lowongan
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </Link>
            </div>
            <p className="close__word" aria-hidden="true">kerjakita</p>
          </div>
          <div className="closing__links">
            <div className="grid">
              <div className="span-6 stack-4">
                <Link className="nav__logo" href="/">kerjakita</Link>
                <p className="footer__lede">
                  Lowongan kerja yang cocok di Indonesia, dengan alasan yang bisa dibaca.
                </p>
              </div>
              <div className="span-2 footer__col">
                <h3>Cari</h3>
                <ul>
                  <li><Link href="/lowongan">Lowongan</Link></li>
                  <li><Link href="/perusahaan">Perusahaan</Link></li>
                  <li><Link href="/gaji">Cek gaji</Link></li>
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>Belajar</h3>
                <ul>
                  <li><Link href="/kursus">Kursus</Link></li>
                  <li><Link href="/lowongan">Lowongan teknologi</Link></li>
                  <li><Link href="/gaji">Panduan gaji</Link></li>
                </ul>
              </div>
              <div className="span-2 footer__col">
                <h3>Kerjakita</h3>
                <ul>
                  <li><Link href="/masuk">Masuk</Link></li>
                  <li><Link href="/daftar">Daftar</Link></li>
                  <li><Link href="/perekrut">Untuk perekrut</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer__legal">
              <span>© 2026 Kerjakita</span>
              <div className="socials" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
