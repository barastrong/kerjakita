"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button/button";
import { CheckIcon } from "@/components/ui/icons/icons";
import {
  RECRUITER_PERMISSIONS,
  RECRUITER_ROLES,
  RECRUITER_TEAM,
  can,
  type RecruiterRole as Role,
  type TeamMember as Member,
} from "@/lib/data/team";
import { Avatar, PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

const COLORS = ["#7c3aed", "#3d3bf3", "#0b7a62", "#c2410c", "#334155", "#a21caf"];

const ROLE_CLASS: Record<Role, string> = {
  Admin: styles.roleAdmin,
  "Hiring manager": styles.roleManager,
  Perekrut: styles.roleRecruiter,
  Pewawancara: styles.roleInterviewer,
};

const EMPTY_FORM = {
  name: "",
  email: "",
  title: "",
  role: "Perekrut" as Role,
  jobs: "Semua lowongan",
};

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

function PermissionMark({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <CheckIcon size={16} className={styles.permissionCheck} />
  ) : (
    <span className={styles.permissionDash}>–</span>
  );
}

export function TimPage({
  initialMembers = RECRUITER_TEAM,
}: {
  initialMembers?: Member[];
}) {
  const [members, setMembers] = useState(initialMembers);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  }

  function openEdit(member: Member) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      email: member.email,
      title: member.title,
      role: member.role,
      jobs: member.jobs,
    });
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
  }

  function saveMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) return;

    const title = form.title.trim() || "Anggota tim";
    const jobs = form.jobs.trim() || "Semua lowongan";
    const email = form.email.trim().toLowerCase();

    if (editingId) {
      setMembers((current) =>
        current.map((member) =>
          member.id === editingId
            ? {
                ...member,
                name,
                email,
                title,
                jobs,
                role: form.role,
                initials: initialsOf(name),
              }
            : member,
        ),
      );
    } else {
      setMembers((current) => [
        ...current,
        {
          id: `member-${Date.now()}`,
          name,
          email,
          title,
          jobs,
          role: form.role,
          initials: initialsOf(name),
          color: COLORS[current.length % COLORS.length],
          lastActive: "Baru ditambahkan",
        },
      ]);
    }

    closeForm();
  }

  function removeMember() {
    if (!editingId) return;
    setMembers((current) => current.filter((member) => member.id !== editingId));
    closeForm();
  }

  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Tim perekrut"
        subtitle={`${members.length} anggota. Atur siapa yang boleh meninjau dan menyetujui pelamar.`}
        action={
          <Button type="button" onClick={openAdd}>
            Tambah anggota
          </Button>
        }
      />

      {formOpen ? (
        <form className={`${styles.card} ${styles.teamFormCard}`} onSubmit={saveMember}>
          <h2 className={styles.cardTitle}>
            {editingId ? "Ubah anggota" : "Tambah anggota"}
          </h2>

          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="team-name">
                Nama
              </label>
              <input
                id="team-name"
                className={styles.input}
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="team-title">
                Jabatan
              </label>
              <input
                id="team-title"
                className={styles.input}
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({ ...current, title: event.target.value }))
                }
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="team-email">
              Email untuk masuk
            </label>
            <input
              id="team-email"
              type="email"
              className={styles.input}
              value={form.email}
              placeholder="nama@tokoloka.id"
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              required
            />
          </div>

          <div className={styles.twoCol}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="team-role">
                Peran
              </label>
              <select
                id="team-role"
                className={styles.input}
                value={form.role}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    role: event.target.value as Role,
                  }))
                }
              >
                {RECRUITER_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="team-jobs">
                Lowongan
              </label>
              <input
                id="team-jobs"
                className={styles.input}
                value={form.jobs}
                onChange={(event) =>
                  setForm((current) => ({ ...current, jobs: event.target.value }))
                }
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <Button type="submit">
              {editingId ? "Simpan perubahan" : "Tambah anggota"}
            </Button>
            <Button type="button" variant="outline" onClick={closeForm}>
              Batal
            </Button>
            {editingId ? (
              <Button
                type="button"
                variant="outline"
                className={styles.dangerButton}
                onClick={removeMember}
              >
                Hapus anggota
              </Button>
            ) : null}
          </div>
        </form>
      ) : null}

      <div className={`${styles.tableCard} ${styles.teamTableCard}`}>
        <div className={styles.tableScroll}>
          <table className={`${styles.table} ${styles.teamTable}`}>
            <thead>
              <tr>
                <th className={styles.colTeamMember}>Anggota</th>
                <th className={styles.colTeamRole}>Peran</th>
                <th className={styles.colTeamJobs}>Lowongan</th>
                <th className={styles.colTeamActive}>Terakhir aktif</th>
                <th className={styles.colTeamAction} aria-label="Tindakan" />
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className={styles.teamMemberCell}>
                      <Avatar initials={member.initials} color={member.color} />
                      <div className={styles.candidateText}>
                        <span className={styles.candidateName}>{member.name}</span>
                        <span className={styles.candidateMeta}>{member.title}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.tag} ${ROLE_CLASS[member.role]}`}>
                      {member.role}
                    </span>
                  </td>
                  <td>{member.jobs}</td>
                  <td>{member.lastActive}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.manage}
                      onClick={() => openEdit(member)}
                    >
                      Ubah
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className={`${styles.card} ${styles.permissionsCard}`}>
        <h2 className={styles.cardTitle}>Hak akses per peran</h2>
        <p className={styles.permissionsLabel}>Hak akses</p>

        <div className={styles.tableScroll}>
          <table className={`${styles.table} ${styles.permissionsTable}`}>
            <thead>
              <tr>
                <th className={styles.permissionName} aria-label="Hak akses" />
                <th>Admin</th>
                <th>Hiring manager</th>
                <th>Perekrut</th>
                <th>Pewawancara</th>
              </tr>
            </thead>
            <tbody>
              {RECRUITER_PERMISSIONS.map((item) => (
                <tr key={item.label}>
                  <td>{item.label}</td>
                  <td>
                    <PermissionMark allowed={can("Admin", item.permission)} />
                  </td>
                  <td>
                    <PermissionMark allowed={can("Hiring manager", item.permission)} />
                  </td>
                  <td>
                    <PermissionMark allowed={can("Perekrut", item.permission)} />
                  </td>
                  <td>
                    <PermissionMark allowed={can("Pewawancara", item.permission)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
