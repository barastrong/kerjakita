"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button/button";
import { CheckIcon } from "@/components/ui/icons/icons";
import dashboardStyles from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import { ApplicantHeading, CompanyMark } from "./applicant-parts";
import styles from "./applicant.module.css";

type Experience = {
  initials: string;
  color: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

type Profile = {
  name: string;
  role: string;
  location: string;
  years: string;
  availability: string;
  workPreference: string;
  skills: string[];
  experiences: Experience[];
  education: {
    degree: string;
    university: string;
    period: string;
    gpa: string;
  };
  cvs: { name: string; meta: string }[];
};

const INITIAL_PROFILE: Profile = {
  name: "Rani Ayu Pratama",
  role: "Product Designer",
  location: "Surabaya",
  years: "4 tahun",
  availability: "Terbuka untuk pekerjaan",
  workPreference: "Hybrid atau remote",
  skills: [
    "Figma · Ahli",
    "Design system · Kuat",
    "Prototyping · Kuat",
    "UX research · Baik",
    "Data analitik · Pemula",
  ],
  experiences: [
    {
      initials: "KS",
      color: "#b45309",
      role: "Product Designer",
      company: "Kopi Sinar Digital",
      period: "Jan 2024 – sekarang · 2 tahun 9 bulan",
      description:
        "Merancang aplikasi pemesanan untuk 120 gerai dan memimpin migrasi design system.",
    },
    {
      initials: "SL",
      color: "#1f2937",
      role: "UI Designer",
      company: "Studio Lokal",
      period: "Jun 2022 – Des 2023 · 1 tahun 7 bulan",
      description: "Mengerjakan identitas digital dan situs untuk klien UMKM.",
    },
  ],
  education: {
    degree: "S1 Desain Komunikasi Visual",
    university: "Universitas Surya Nusa",
    period: "2018 – 2022",
    gpa: "3,64",
  },
  cvs: [
    { name: "CV_Rani_2026.pdf", meta: "Utama · 3 Okt 2026" },
    { name: "CV_Rani_Desain.pdf", meta: "12 Agu 2026" },
  ],
};

const SUGGESTIONS = [
  { label: "Foto profil", done: true },
  { label: "CV diunggah", done: true },
  { label: "Minimal 5 keahlian", done: true },
  { label: "Tambahkan sertifikat", done: false },
  { label: "Tautan LinkedIn", done: false },
];

export function ProfilPage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const cvInputRef = useRef<HTMLInputElement>(null);

  function startEdit() {
    setDraft(profile);
    setSaved(false);
    setEditing(true);
  }

  function cancelEdit() {
    setDraft(profile);
    setEditing(false);
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfile((current) => ({ ...draft, cvs: current.cvs }));
    setEditing(false);
    setSaved(true);
  }

  function addSkill() {
    const value = newSkill.trim();

    if (!value) return;

    setDraft((current) => ({
      ...current,
      skills: [...current.skills, value],
    }));
    setNewSkill("");
  }

  function removeSkill(index: number) {
    setDraft((current) => ({
      ...current,
      skills: current.skills.filter((_, skillIndex) => skillIndex !== index),
    }));
  }

  function updateExperience(index: number, patch: Partial<Experience>) {
    setDraft((current) => ({
      ...current,
      experiences: current.experiences.map((experience, experienceIndex) =>
        experienceIndex === index
          ? { ...experience, ...patch }
          : experience,
      ),
    }));
  }

  function addExperience() {
    setDraft((current) => ({
      ...current,
      experiences: [
        ...current.experiences,
        {
          initials: "",
          color: "#6d28d9",
          role: "",
          company: "",
          period: "",
          description: "",
        },
      ],
    }));
  }

  function removeExperience(index: number) {
    setDraft((current) => ({
      ...current,
      experiences: current.experiences.filter(
        (_, experienceIndex) => experienceIndex !== index,
      ),
    }));
  }

  function updateEducation(patch: Partial<Profile["education"]>) {
    setDraft((current) => ({
      ...current,
      education: { ...current.education, ...patch },
    }));
  }

  function handleCvUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setProfile((current) => ({
      ...current,
      cvs: [{ name: file.name, meta: "Baru diunggah" }, ...current.cvs],
    }));
    event.target.value = "";
  }

  return (
    <div className={dashboardStyles.mainInner}>
      <ApplicantHeading
        title="Profil dan CV"
        subtitle="Perekrut melihat profil ini saat kamu melamar."
        action={
          <Button type="button" size="sm" className={styles.headerButton}>
            Pratinjau profil
          </Button>
        }
      />

      <div className={styles.profileGrid}>
        <div className={styles.profileMain}>
          {editing ? (
            <form
              className={styles.detailCard}
              onSubmit={saveProfile}
            >
              <div>
                <h2 className={styles.cardTitle}>Edit profil</h2>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    <span className={styles.label}>Nama lengkap</span>
                    <input
                      className={styles.input}
                      value={draft.name}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Peran</span>
                    <input
                      className={styles.input}
                      value={draft.role}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          role: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Lokasi</span>
                    <input
                      className={styles.input}
                      value={draft.location}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          location: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Pengalaman</span>
                    <input
                      className={styles.input}
                      value={draft.years}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          years: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Status</span>
                    <input
                      className={styles.input}
                      value={draft.availability}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          availability: event.target.value,
                        }))
                      }
                    />
                  </label>
                  <label className={styles.field}>
                    <span className={styles.label}>Preferensi kerja</span>
                    <input
                      className={styles.input}
                      value={draft.workPreference}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          workPreference: event.target.value,
                        }))
                      }
                    />
                  </label>
                </div>

                <div className={styles.formSection}>
                  <h3 className={styles.formSectionTitle}>Keahlian</h3>
                  <div className={styles.skillTags}>
                    {draft.skills.map((skill, index) => (
                      <span key={`${skill}-${index}`} className={styles.skillTag}>
                        {skill}
                        <button
                          type="button"
                          className={styles.skillRemove}
                          aria-label={`Hapus ${skill}`}
                          onClick={() => removeSkill(index)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className={styles.inlineAdd}>
                    <input
                      className={styles.input}
                      placeholder="Tambah keahlian"
                      value={newSkill}
                      onChange={(event) => setNewSkill(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSkill}
                    >
                      Tambah
                    </Button>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h3 className={styles.formSectionTitle}>Pengalaman</h3>
                  {draft.experiences.map((experience, index) => (
                    <div
                      key={`experience-${index}`}
                      className={styles.editItem}
                    >
                      <div className={styles.formGrid}>
                        <label className={styles.field}>
                          <span className={styles.label}>Posisi</span>
                          <input
                            className={styles.input}
                            value={experience.role}
                            onChange={(event) =>
                              updateExperience(index, {
                                role: event.target.value,
                              })
                            }
                          />
                        </label>
                        <label className={styles.field}>
                          <span className={styles.label}>Perusahaan</span>
                          <input
                            className={styles.input}
                            value={experience.company}
                            onChange={(event) =>
                              updateExperience(index, {
                                company: event.target.value,
                              })
                            }
                          />
                        </label>
                        <label className={styles.field}>
                          <span className={styles.label}>Periode</span>
                          <input
                            className={styles.input}
                            value={experience.period}
                            onChange={(event) =>
                              updateExperience(index, {
                                period: event.target.value,
                              })
                            }
                          />
                        </label>
                        <label
                          className={`${styles.field} ${styles.fieldWide}`}
                        >
                          <span className={styles.label}>Deskripsi</span>
                          <textarea
                            className={styles.textarea}
                            value={experience.description}
                            onChange={(event) =>
                              updateExperience(index, {
                                description: event.target.value,
                              })
                            }
                          />
                        </label>
                      </div>
                      {draft.experiences.length > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className={styles.removeItemButton}
                          onClick={() => removeExperience(index)}
                        >
                          Hapus pengalaman
                        </Button>
                      ) : null}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className={styles.addItemButton}
                    onClick={addExperience}
                  >
                    Tambah pengalaman
                  </Button>
                </div>

                <div className={styles.formSection}>
                  <h3 className={styles.formSectionTitle}>Pendidikan</h3>
                  <div className={styles.formGrid}>
                    <label className={styles.field}>
                      <span className={styles.label}>Jenjang dan jurusan</span>
                      <input
                        className={styles.input}
                        value={draft.education.degree}
                        onChange={(event) =>
                          updateEducation({ degree: event.target.value })
                        }
                      />
                    </label>
                    <label className={styles.field}>
                      <span className={styles.label}>Universitas</span>
                      <input
                        className={styles.input}
                        value={draft.education.university}
                        onChange={(event) =>
                          updateEducation({ university: event.target.value })
                        }
                      />
                    </label>
                    <label className={styles.field}>
                      <span className={styles.label}>Periode</span>
                      <input
                        className={styles.input}
                        value={draft.education.period}
                        onChange={(event) =>
                          updateEducation({ period: event.target.value })
                        }
                      />
                    </label>
                    <label className={styles.field}>
                      <span className={styles.label}>IPK</span>
                      <input
                        className={styles.input}
                        value={draft.education.gpa}
                        onChange={(event) =>
                          updateEducation({ gpa: event.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <Button type="submit">Simpan perubahan</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={cancelEdit}
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <>
              <section className={styles.profileCard}>
                <span className={styles.profileAvatar} aria-hidden="true">
                  {profile.name.charAt(0)}
                </span>
                <div className={styles.profileInfo}>
                  <h2 className={styles.profileName}>{profile.name}</h2>
                  <p className={styles.profileMeta}>
                    {profile.role} · {profile.location} · {profile.years}{" "}
                    pengalaman
                  </p>
                  <div className={styles.profileTags}>
                    <span
                      className={`${styles.profileTag} ${styles.profileTagOpen}`}
                    >
                      {profile.availability}
                    </span>
                    <span className={styles.profileTag}>
                      {profile.workPreference}
                    </span>
                  </div>
                  {saved ? (
                    <p
                      className={`${styles.saveNote} ${styles.profileSaved}`}
                      role="status"
                    >
                      Profil berhasil diperbarui.
                    </p>
                  ) : null}
                </div>
                <div className={styles.profileActions}>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={startEdit}
                  >
                    Edit profil
                  </Button>
                </div>
              </section>

              <section className={styles.skillCard}>
                <h2 className={styles.cardTitle}>Keahlian</h2>
                <div className={styles.skillTags}>
                  {profile.skills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={styles.skillButton}
                  onClick={startEdit}
                >
                  Tambah keahlian
                </Button>
              </section>

              <section className={styles.experienceCard}>
                <h2 className={styles.cardTitle}>Pengalaman</h2>
                <div className={styles.experienceList}>
                  {profile.experiences.map((experience, index) => (
                    <div
                      key={`${experience.company}-${index}`}
                      className={styles.experienceRow}
                    >
                      <CompanyMark
                        initials={
                          experience.initials ||
                          experience.company.slice(0, 2).toUpperCase() ||
                          "BR"
                        }
                        color={experience.color}
                      />
                      <div className={styles.expText}>
                        <p className={styles.expTitle}>
                          {experience.role} · {experience.company}
                        </p>
                        <p className={styles.expMeta}>{experience.period}</p>
                        <p className={styles.expDesc}>
                          {experience.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className={styles.educationCard}>
                <h2 className={styles.cardTitle}>Pendidikan</h2>
                <p className={styles.eduTitle}>
                  {profile.education.degree} ·{" "}
                  {profile.education.university}
                </p>
                <p className={styles.eduMeta}>
                  {profile.education.period} · IPK {profile.education.gpa}
                </p>
              </section>
            </>
          )}
        </div>

        <div className={styles.profileSide}>
          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}>Saran untuk naik ke 90%</h2>
            <div className={styles.suggestionList}>
              {SUGGESTIONS.map((suggestion) => (
                <div key={suggestion.label} className={styles.suggestionItem}>
                  <span
                    className={`${styles.checkCircle} ${
                      suggestion.done ? styles.checkCircleDone : ""
                    }`}
                  >
                    {suggestion.done ? <CheckIcon size={12} /> : null}
                  </span>
                  <span className={suggestion.done ? styles.suggestionDone : ""}>
                    {suggestion.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}>CV saya</h2>
            <div className={styles.cvList}>
              {profile.cvs.map((cv, index) => (
                <div key={`${cv.name}-${index}`} className={styles.cvItem}>
                  <div>
                    <p className={styles.cvName}>{cv.name}</p>
                    <p className={styles.cvMeta}>{cv.meta}</p>
                  </div>
                  <span className={styles.cvLink}>Lihat</span>
                </div>
              ))}
            </div>
            <input
              ref={cvInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={handleCvUpload}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={styles.cvButton}
              onClick={() => cvInputRef.current?.click()}
            >
              Unggah CV baru
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
