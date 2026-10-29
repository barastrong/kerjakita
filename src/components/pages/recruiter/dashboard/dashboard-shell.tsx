"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SESSION_COOKIE } from "@/lib/data/session";
import styles from "./dashboard.module.css";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: string;
  count?: number;
  badge?: string;
  activeWhen?: string[];
};

export type DashboardNavGroup = {
  label: string;
  ariaLabel: string;
  items: DashboardNavItem[];
};

type DashboardShellProps = {
  children: ReactNode;
  brandHref: string;
  sidebarLabel: string;
  theme?: "dark" | "light";
  topCard: {
    initials: string;
    name: string;
    role: string;
    href?: string;
  };
  navGroups: DashboardNavGroup[];
  account?: {
    href: string;
    initials: string;
    name: string;
    role: string;
  };
  footer?: ReactNode;
};

function isActive(pathname: string, item: DashboardNavItem) {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
    return true;
  }

  return Boolean(
    item.activeWhen?.some(
      (href) => pathname === href || pathname.startsWith(`${href}/`),
    ),
  );
}

export function DashboardShell({
  children,
  brandHref,
  sidebarLabel,
  theme = "dark",
  topCard,
  navGroups,
  account,
  footer,
}: DashboardShellProps) {
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

  function renderNav(items: DashboardNavItem[]) {
    return items.map((item) => {
      const active = isActive(pathname, item);

      return (
        <li key={item.label}>
          <Link
            href={item.href}
            className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span
              className={styles.navIcon}
              style={
                {
                  "--nav-icon": `url(/icons/recruiter/${item.icon})`,
                } as CSSProperties
              }
              aria-hidden="true"
            />
            <span>{item.label}</span>
            {item.count ? <span className={styles.navCount}>{item.count}</span> : null}
            {item.badge ? <span className={styles.navBadge}>{item.badge}</span> : null}
          </Link>
        </li>
      );
    });
  }

  const topCardContent = (
    <>
      <span className={styles.companyAvatar} aria-hidden="true">
        {topCard.initials}
      </span>
      <span className={styles.companyText}>
        <span className={styles.companyName}>{topCard.name}</span>
        <span className={styles.companyRole}>{topCard.role}</span>
      </span>
    </>
  );

  return (
    <div className={`${styles.shell} ${theme === "light" ? styles.shellLight : ""}`}>
      <aside
        id="dashboard-sidebar"
        className={`${styles.sidebar} ${menuOpen ? styles.sidebarOpen : ""}`}
        aria-label={sidebarLabel}
      >
        <div className={styles.sidebarInner}>
          <Link
            href={brandHref}
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

          {topCard.href ? (
            <Link
              href={topCard.href}
              className={styles.company}
              onClick={() => setMenuOpen(false)}
            >
              {topCardContent}
            </Link>
          ) : (
            <div className={styles.company}>{topCardContent}</div>
          )}

          {navGroups.map((group) => (
            <nav
              key={group.label}
              className={styles.navGroup}
              aria-label={group.ariaLabel}
            >
              <p className={styles.navLabel}>{group.label}</p>
              <ul className={styles.navList}>{renderNav(group.items)}</ul>
            </nav>
          ))}

          <div className={styles.sidebarFoot}>
            {account ? (
              <Link
                href={account.href}
                className={`${styles.accountLink} ${
                  pathname === account.href ? styles.accountLinkActive : ""
                }`}
                aria-current={pathname === account.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className={styles.accountAvatar} aria-hidden="true">
                  {account.initials}
                </span>
                <span className={styles.accountText}>
                  <span className={styles.accountName}>{account.name}</span>
                  <span className={styles.accountRole}>{account.role}</span>
                </span>
              </Link>
            ) : null}
            {footer}
            <button type="button" className={styles.logout} onClick={handleLogout}>
              <span
                className={styles.logoutIcon}
                style={
                  {
                    "--nav-icon": "url(/icons/recruiter/keluar.svg)",
                  } as CSSProperties
                }
                aria-hidden="true"
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
          <Link href={brandHref} className={styles.mobileBrand}>
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
