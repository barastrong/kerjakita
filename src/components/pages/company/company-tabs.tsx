"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CompanyDetail } from "@/lib/data/companies";
import styles from "./company-page.module.css";

type CompanyTabId = "ringkasan" | "ulasan" | "gaji" | "lowongan" | "foto";

type CompanyTabsProps = {
  company: CompanyDetail;
  active?: CompanyTabId;
};

export function CompanyTabs({
  company,
  active = "ringkasan",
}: CompanyTabsProps) {
  const navRef = useRef<HTMLElement>(null);
  const base = `/perusahaan/${company.slug}`;
  const tabs = [
    { id: "ringkasan", label: "Ringkasan", href: base },
    {
      id: "ulasan",
      label: `Ulasan ${company.reviewCount}`,
      href: `${base}/ulasan`,
    },
    { id: "gaji", label: "Gaji", href: `${base}/gaji` },
    {
      id: "lowongan",
      label: `Lowongan ${company.openJobCount}`,
      href: `${base}/lowongan`,
    },
    { id: "foto", label: "Foto & video", href: `${base}/foto-video` },
  ];

  useEffect(() => {
    const nav = navRef.current;
    const activeTab =
      nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !activeTab) return;

    const navRect = nav.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    const padding = 20;
    const overflowRight = tabRect.right + padding - navRect.right;

    if (overflowRight > 0) {
      nav.scrollLeft += overflowRight;
    } else if (tabRect.left - padding < navRect.left) {
      nav.scrollLeft -= navRect.left - tabRect.left + padding;
    }
  }, [active]);

  return (
    <nav
      ref={navRef}
      className={styles.tabs}
      aria-label="Bagian perusahaan"
    >
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`${styles.tab} ${active === tab.id ? styles.tabActive : ""}`}
          aria-current={active === tab.id ? "page" : undefined}
        >
          {tab.label}
          <span className={styles.tabLine} aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}
