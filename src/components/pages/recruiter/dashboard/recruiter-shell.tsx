"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/data/session";
import styles from "./dashboard.module.css";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  count?: number;
};

const RECRUITMENT_NAV: NavItem[] = [
  { label: "Ringkasan", href: "/perekrut/ringkasan", icon: "ringkasan-muted.svg" },
  { label: "Lowongan", href: "/perekrut/lowongan", icon: "lowongan.svg", count: 6 },
  { label: "Pelamar", href: "/perekrut/pelamar", icon: "pelamar.svg", count: 12 },
  { label: "Wawancara", href: "/perekrut/wawancara", icon: "wawancara.svg", count: 5 },
];

const COMPANY_NAV: NavItem[] = [
  { label: "Profil perusahaan", href: "/perekrut/profil-perusahaan", icon: "profil.svg" },
  { label: "Tim", href: "/perekrut/tim", icon: "tim.svg" },
];

function isActive(pathname: string, href: string) {
  return Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)));
}

export function RecruiterShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleLogout() {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
    router.replace("/masuk");
    router.refresh();
  }

  function renderNav(items: NavItem[]) {
    return items.map((item) => {
      const active =
        isActive(pathname, item.href) ||
        (item.href === "/perekrut/lowongan" &&
          pathname.startsWith("/perekrut/pasang-lowongan"));
      const content = (
        <>
          <Image
            src={`/icons/recruiter/${item.icon}`}
            alt=""
            width={18}
            height={18}
            unoptimized
            className={styles.navIcon}
          />
          <span>{item.label}</span>
          {item.count ? <span className={styles.navCount}>{item.count}</span> : null}
        </>
      );

      return (
        <li key={item.label}>
          <Link
            href={item.href}
            className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {content}
          </Link>
        </li>
      );
    });
  }

  return (
    <div className={styles.shell}>
      <aside
        id="dashboard-sidebar"
        className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}
        aria-label="Navigasi dashboard perekrut"
      >
        <div className={styles.sidebarInner}>
          <Link
            href="/perekrut/ringkasan"
            className={styles.brand}
            onClick={() => setMenuOpen(false)}
          >
            <span className={styles.brandMark} aria-hidden="true" />
            <span className={styles.brandText}>kerjakita</span>
          </Link>

          <button
            type="button"
            className={styles.drawerClose}
            aria-label="Tutup menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

          <div className={styles.company}>
            <span className={styles.companyAvatar} aria-hidden="true">
              TL
            </span>
            <span className={styles.companyText}>
              <span className={styles.companyName}>Tokoloka</span>
              <span className={styles.companyRole}>Portal perekrut</span>
            </span>
          </div>

          <nav className={styles.navGroup} aria-label="Rekrutmen">
            <p className={styles.navLabel}>Rekrutmen</p>
            <ul className={styles.navList}>{renderNav(RECRUITMENT_NAV)}</ul>
          </nav>

          <nav className={styles.navGroup} aria-label="Perusahaan">
            <p className={styles.navLabel}>Perusahaan</p>
            <ul className={styles.navList}>{renderNav(COMPANY_NAV)}</ul>
          </nav>

          <div className={styles.sidebarFoot}>
            <div className={styles.planCard}>
              <p className={styles.planTitle}>Paket Pro</p>
              <div className={styles.planTrack} aria-hidden="true">
                <div className={styles.planFill} />
              </div>
              <p className={styles.planNote}>6 dari 10 lowongan aktif terpakai</p>
            </div>
            <button type="button" className={styles.logout} onClick={handleLogout}>
              <Image
                src="/icons/recruiter/keluar.svg"
                alt=""
                width={18}
                height={18}
                unoptimized
                className={styles.logoutIcon}
              />
              Keluar
            </button>
          </div>
        </div>
      </aside>

      {menuOpen ? (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Tutup menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <main className={styles.main} inert={menuOpen}>
        <div className={styles.mobileTopbar}>
          <Link href="/perekrut/ringkasan" className={styles.mobileBrand}>
            <span className={styles.mobileMark} aria-hidden="true" />
            kerjakita
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuOpen}
            aria-controls="dashboard-sidebar"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
