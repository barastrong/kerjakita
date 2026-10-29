"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import { ApplicantHeading } from "./applicant-parts";
import styles from "./applicant.module.css";

const SECTIONS = [
  { id: "akun", label: "Akun" },
  { id: "notifikasi", label: "Notifikasi" },
  { id: "privasi", label: "Privasi" },
  { id: "preferensi", label: "Preferensi lowongan" },
  { id: "keamanan", label: "Keamanan" },
];

const DEFAULT_TOGGLES: Record<string, boolean> = {
  lowongan: true,
  status: true,
  wawancara: true,
  kursus: false,
  promosi: false,
  profil: true,
  sembunyi: true,
  cv: false,
  remote: true,
  kontak: true,
  duaFaktor: false,
};

const NOTIFICATION_ROWS = [
  { key: "lowongan", label: "Lowongan baru yang cocok dengan profilmu" },
  { key: "status", label: "Perubahan status lamaran" },
  { key: "wawancara", label: "Pengingat wawancara" },
  { key: "kursus", label: "Rekomendasi kursus" },
  { key: "promosi", label: "Email promosi" },
];

const PRIVACY_ROWS = [
  { key: "profil", label: "Profil terlihat oleh perekrut" },
  { key: "sembunyi", label: "Sembunyikan dari perusahaan tempat kerja sekarang" },
  { key: "cv", label: "Izinkan perekrut mengunduh CV" },
];

const PREFERENCE_ROWS = [
  { key: "remote", label: "Terbuka untuk lowongan remote" },
  { key: "kontak", label: "Izinkan perekrut menghubungiku" },
];

function Toggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`${styles.toggle} ${checked ? styles.toggleOn : ""}`}
      onClick={onChange}
    >
      <span className={styles.toggleKnob} />
    </button>
  );
}

export function PengaturanPage() {
  const [activeSection, setActiveSection] = useState("akun");
  const [toggles, setToggles] = useState(DEFAULT_TOGGLES);
  const [saved, setSaved] = useState(false);

  function selectSection(id: string) {
    setActiveSection(id);
    window.setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  function setToggle(key: string) {
    setSaved(false);
    setToggles((current) => ({ ...current, [key]: !current[key] }));
  }

  function reset() {
    setToggles(DEFAULT_TOGGLES);
    setSaved(false);
  }

  return (
    <div className={dashboardStyles.mainInner}>
      <ApplicantHeading
        title="Pengaturan"
        subtitle="Kelola akun, notifikasi, dan privasi."
      />

      <div className={styles.settingsLayout}>
        <nav className={styles.settingsNav} aria-label="Bagian pengaturan">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`${styles.settingsNavButton} ${
                activeSection === section.id
                  ? styles.settingsNavButtonActive
                  : ""
              }`}
              aria-current={activeSection === section.id ? "true" : undefined}
              onClick={() => selectSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <div className={styles.settingsContent}>
          <section id="akun" className={styles.settingsSection}>
            <h2 className={styles.settingsSectionTitle}>Akun</h2>
            <div className={styles.formGrid}>
              <label className={styles.field}>
                <span className={styles.label}>Nama lengkap</span>
                <input
                  className={styles.input}
                  defaultValue="Rani Ayu Pratama"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  className={styles.input}
                  type="email"
                  defaultValue="rani.ayu@email.com"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Nomor telepon</span>
                <input
                  className={styles.input}
                  type="tel"
                  defaultValue="0812 3456 7890"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.label}>Kota</span>
                <input className={styles.input} defaultValue="Surabaya" />
              </label>
            </div>
          </section>

          <section id="notifikasi" className={styles.settingsSection}>
            <h2 className={styles.settingsSectionTitle}>Notifikasi</h2>
            {NOTIFICATION_ROWS.map((row) => (
              <div key={row.key} className={styles.toggleRow}>
                <span className={styles.toggleLabel}>{row.label}</span>
                <Toggle
                  checked={toggles[row.key]}
                  label={row.label}
                  onChange={() => setToggle(row.key)}
                />
              </div>
            ))}
          </section>

          <section id="privasi" className={styles.settingsSection}>
            <h2 className={styles.settingsSectionTitle}>Privasi</h2>
            {PRIVACY_ROWS.map((row) => (
              <div key={row.key} className={styles.toggleRow}>
                <span className={styles.toggleLabel}>{row.label}</span>
                <Toggle
                  checked={toggles[row.key]}
                  label={row.label}
                  onChange={() => setToggle(row.key)}
                />
              </div>
            ))}
          </section>

          {activeSection === "preferensi" ? (
            <section id="preferensi" className={styles.settingsSection}>
              <h2 className={styles.settingsSectionTitle}>
                Preferensi lowongan
              </h2>
              {PREFERENCE_ROWS.map((row) => (
                <div key={row.key} className={styles.toggleRow}>
                  <span className={styles.toggleLabel}>{row.label}</span>
                  <Toggle
                    checked={toggles[row.key]}
                    label={row.label}
                    onChange={() => setToggle(row.key)}
                  />
                </div>
              ))}
            </section>
          ) : null}

          {activeSection === "keamanan" ? (
            <section id="keamanan" className={styles.settingsSection}>
              <h2 className={styles.settingsSectionTitle}>Keamanan</h2>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span className={styles.label}>Kata sandi saat ini</span>
                  <input className={styles.input} type="password" />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>Kata sandi baru</span>
                  <input className={styles.input} type="password" />
                </label>
              </div>
              <div className={styles.toggleRow}>
                <span className={styles.toggleLabel}>
                  Verifikasi dua langkah
                </span>
                <Toggle
                  checked={toggles.duaFaktor}
                  label="Verifikasi dua langkah"
                  onChange={() => setToggle("duaFaktor")}
                />
              </div>
            </section>
          ) : null}

          <div className={styles.settingsActions}>
            <Button
              type="button"
              onClick={() => setSaved(true)}
            >
              Simpan perubahan
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              Batal
            </Button>
            {saved ? (
              <p className={styles.saveNote} role="status">
                Perubahan disimpan.
              </p>
            ) : null}
            <div className={styles.dangerButton}>
              <Button type="button" variant="outline">
                Hapus akun
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
