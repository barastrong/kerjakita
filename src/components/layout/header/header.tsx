"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const [language, setLanguage] = useState<LanguageCode>("id");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const currentLanguage =
    LANGUAGES.find((item) => item.code === language) ?? LANGUAGES[0];

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="Kerjakita — beranda">
        <span className={styles.logoMark} aria-hidden="true" />
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
        <Link href="/perekrut" className={styles.navLink}>
          Untuk perekrut
        </Link>

        {user ? (
          <>
            <button
              type="button"
              className={styles.notification}
              aria-label="Notifikasi"
            >
              <Image
                src="/icons/bell.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              className={styles.account}
              aria-label={`Menu akun ${user.name}`}
            >
              <span className={styles.accountAvatar} aria-hidden="true">
                {user.name.charAt(0)}
              </span>
              <span className={styles.accountName}>{user.name}</span>
              <Image
                src="/icons/chevron-down-dark.svg"
                alt=""
                width={14}
                height={14}
                aria-hidden="true"
              />
            </button>
          </>
        ) : (
          <>
            <span className={styles.separator} aria-hidden="true" />
            <Link href="/masuk" className={styles.login}>
              Masuk
            </Link>
            <Link href="/daftar" className={styles.register}>
              Daftar
            </Link>
          </>
        )}

        <div className={styles.menuWrap} ref={menuRef}>
          <button
            type="button"
            className={`${styles.language} ${
              menuOpen ? styles.languageOpen : ""
            }`}
            aria-label={`Ubah bahasa, ${currentLanguage.label}`}
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Image
              src="/icons/globe.svg"
              alt=""
              width={18}
              height={18}
              aria-hidden="true"
            />
            <span>{currentLanguage.short}</span>
            <Image
              src="/icons/chevron-down.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />
          </button>

          {menuOpen && (
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
                      setMenuOpen(false);
                    }}
                  >
                    <span className={styles.optionText}>
                      <span className={styles.optionTitle}>{item.label}</span>
                      <span className={styles.optionCode}>{item.short}</span>
                    </span>
                    {active && (
                      <Image
                        src="/icons/check-accent.svg"
                        alt=""
                        width={16}
                        height={16}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
