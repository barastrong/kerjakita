"use client";

import { useRouter } from "next/navigation";
import {
  RECRUITER_ROLE_COOKIE,
  RECRUITER_ROLES,
  type RecruiterRole,
} from "@/lib/data/team";
import styles from "./dashboard.module.css";

export function RoleSwitcher({ role }: { role: RecruiterRole }) {
  const router = useRouter();

  return (
    <label className={styles.roleSwitcher}>
      <span className={styles.roleSwitcherLabel}>Peran akses</span>
      <select
        className={styles.roleSelect}
        value={role}
        onChange={(event) => {
          document.cookie = `${RECRUITER_ROLE_COOKIE}=${event.target.value}; path=/; max-age=86400; samesite=lax`;
          router.refresh();
        }}
      >
        {RECRUITER_ROLES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
