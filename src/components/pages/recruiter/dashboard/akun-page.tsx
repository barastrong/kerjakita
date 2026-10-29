"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Avatar, PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

type AccountPageProps = {
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: string;
  subtitle: string;
  note: string;
  company?: string;
};

export function AccountPage({
  name,
  initials,
  email,
  phone,
  role,
  subtitle,
  note,
  company,
}: AccountPageProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className={styles.mainInner}>
      <PageHeading title="Akun" subtitle={subtitle} />

      <form
        className={styles.formCard}
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
        onChange={() => setSaved(false)}
      >
        <div className={styles.previewTop}>
          <Avatar initials={initials} color="#3d3bf3" />
          <span className={styles.previewText}>
            <span className={styles.previewTitle}>{name}</span>
            <span className={styles.previewMeta}>
              {company ? `${role} di ${company}` : role}
            </span>
          </span>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="account-name">
              Nama lengkap
            </label>
            <input
              id="account-name"
              className={styles.input}
              defaultValue={name}
              required
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="account-email">
              Email
            </label>
            <input
              id="account-email"
              className={styles.input}
              type="email"
              defaultValue={email}
              required
            />
          </div>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="account-phone">
              Nomor telepon
            </label>
            <input
              id="account-phone"
              className={styles.input}
              type="tel"
              defaultValue={phone}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="account-role">
              Peran
            </label>
            <input
              id="account-role"
              className={styles.input}
              defaultValue={role}
              readOnly
            />
          </div>
        </div>

        <p className={styles.cardText}>{note}</p>

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
