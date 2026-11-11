"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ButtonLink } from "@/components/ui/button/button";
import {
  CheckIcon,
  ChevronDownIcon,
  GlobeIcon,
} from "@/components/ui/icons/icons";
import { SESSION_COOKIE } from "@/lib/data/session";
import styles from "./header.module.css";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Cari lowongan", href: "/lowongan" },
  { label: "Perusahaan", href: "/perusahaan" },
  { label: "Cek gaji", href: "/gaji" },
  { label: "Kursus", href: "/kursus" },
] as const;

const LANGUAGES = [
  { code: "id", label: "Bahasa Indonesia", short: "ID" },
  { code: "en", label: "English", short: "EN" },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

type HeaderProps = {
  user?: { name: string } | null;
};

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href === "/lowongan") {
    return pathname.startsWith("/lowongan") || pathname.startsWith("/lamar");
  }
  return pathname.startsWith(href);
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("id");
  const [languageOpen, setLanguageOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drawerOpen && !accountOpen && !languageOpen) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;

      if (drawerOpen && !drawerRef.current?.contains(target)) {
        setDrawerOpen(false);
      }

      if (accountOpen && !accountRef.current?.contains(target)) {
        setAccountOpen(false);
      }

      if (languageOpen && !languageRef.current?.contains(target)) {
        setLanguageOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
        setAccountOpen(false);
        setLanguageOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen, accountOpen, languageOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    drawerRef.current?.focus();
  }, [drawerOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  function handleLogout() {
    document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
    setAccountOpen(false);
    setDrawerOpen(false);
    router.refresh();
  }

  const currentLanguage =
    LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];

  return (
    <header className={`nav ${styles.header}`}>
      <Link href="/" className={styles.logo} aria-label="Kerjakita · beranda">
        <span className={styles.logoText}>kerjakita</span>
      </Link>

      <nav aria-label="Navigasi utama" className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                active ? styles.navLinkActive : ""
              }`}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.spacer} />

      <div className={styles.actions}>
        {user ? (
          <div className={styles.accountWrap} ref={accountRef}>
            <button
              type="button"
              className={styles.account}
              aria-label={`Menu akun ${user.name}`}
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              onClick={() => {
                setDrawerOpen(false);
                setLanguageOpen(false);
                setAccountOpen((open) => !open);
              }}
            >
              <span className={styles.accountAvatar} aria-hidden="true">
                {user.name.charAt(0)}
              </span>
              <span className={styles.accountName}>{user.name}</span>
            </button>

            {accountOpen && (
              <div
                className={styles.accountMenu}
                role="menu"
                aria-label="Menu akun"
              >
                <Link
                  href="/pelamar/ringkasan"
                  role="menuitem"
                  className={styles.accountMenuItem}
                  onClick={() => setAccountOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  className={styles.accountMenuItem}
                  onClick={handleLogout}
                >
                  Keluar
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/perekrut" className={styles.recruiterLink}>
              Untuk perekrut
            </Link>
            <Link href="/masuk" className={styles.loginLink}>
              Masuk
            </Link>
            <ButtonLink
              href="/daftar"
              variant="primary"
              size="sm"
              className={`${styles.cta} ${styles.desktopCta}`}
            >
              Daftar
            </ButtonLink>
          </>
        )}

        <div className={styles.langWrap} ref={languageRef}>
          <button
            type="button"
            className={`${styles.language} ${
              languageOpen ? styles.languageOpen : ""
            }`}
            aria-label={`Ubah bahasa, ${currentLanguage.label}`}
            aria-haspopup="listbox"
            aria-expanded={languageOpen}
            onClick={() => {
              setAccountOpen(false);
              setDrawerOpen(false);
              setLanguageOpen((open) => !open);
            }}
          >
            <GlobeIcon size={16} />
            <span>{currentLanguage.short}</span>
            <ChevronDownIcon size={14} />
          </button>

          {languageOpen && (
            <div
              className={styles.languageMenu}
              role="listbox"
              aria-label="Pilih bahasa"
            >
              {LANGUAGES.map((item) => {
                const active = item.code === language;

                return (
                  <button
                    key={item.code}
                    type="button"
                    role="option"
                    aria-selected={active}
                    className={`${styles.languageOption} ${
                      active ? styles.languageOptionActive : ""
                    }`}
                    onClick={() => {
                      setLanguage(item.code);
                      setLanguageOpen(false);
                    }}
                  >
                    <span className={styles.optionText}>
                      <span className={styles.optionTitle}>{item.label}</span>
                      <span className={styles.optionCode}>{item.short}</span>
                    </span>
                    {active && (
                      <CheckIcon size={16} className={styles.optionCheck} />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={drawerOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={drawerOpen}
          aria-controls="mobile-nav"
          onClick={() => {
            setAccountOpen(false);
            setLanguageOpen(false);
            setDrawerOpen((open) => !open);
          }}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>
      </div>

      {drawerOpen && (
        <>
          <div
            className={styles.overlay}
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            id="mobile-nav"
            className={styles.drawer}
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            tabIndex={-1}
          >
            <nav aria-label="Navigasi" className={styles.drawerNav}>
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href, pathname);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.drawerLink} ${
                      active ? styles.drawerLinkActive : ""
                    }`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className={styles.drawerActions}>
              {user ? (
                <>
                  <ButtonLink
                    href="/pelamar/ringkasan"
                    variant="primary"
                    size="md"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Dashboard
                  </ButtonLink>
                  <button
                    type="button"
                    className={styles.drawerLogout}
                    onClick={handleLogout}
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <ButtonLink
                    href="/perekrut"
                    variant="outline"
                    size="md"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Untuk perekrut
                  </ButtonLink>
                  <ButtonLink
                    href="/masuk"
                    variant="outline"
                    size="md"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Masuk
                  </ButtonLink>
                  <ButtonLink
                    href="/daftar"
                    variant="primary"
                    size="md"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Daftar
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
