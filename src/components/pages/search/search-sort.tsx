"use client";

import type { ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@/components/ui/icons/icons";
import styles from "./search-page.module.css";

type SortOption = {
  value: string;
  label: string;
};

export function SearchSort({
  value,
  options,
}: {
  value: string;
  options: SortOption[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    const next = event.target.value;

    if (next === "relevan") {
      params.delete("urutkan");
    } else {
      params.set("urutkan", next);
    }

    router.push(
      params.toString() ? `/lowongan?${params.toString()}` : "/lowongan",
      { scroll: false },
    );
  }

  return (
    <label className={styles.sortField}>
      <span className={styles.sortLabel}>Urutkan</span>
      <span className={styles.selectWrap}>
        <select
          name="urutkan"
          value={value}
          onChange={onChange}
          aria-label="Urutkan lowongan"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon size={14} />
      </span>
    </label>
  );
}
