"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, CloseIcon } from "@/components/ui/icons/icons";
import styles from "./search-page.module.css";

export type FilterKey =
  | "tipe"
  | "lokasi"
  | "pengalaman"
  | "pendidikan"
  | "kecamatan";

export type FilterGroup = {
  key: FilterKey;
  title: string;
  items: { label: string; count: number }[];
};

export type UpdatedOption = {
  label: string;
  value: string;
  count: number;
};

type SelectedFilters = {
  tipe: string[];
  lokasi: string[];
  pengalaman: string[];
  pendidikan: string[];
  kecamatan: string[];
  diperbarui: string;
};

function formatCount(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function FilterPanel({
  groups,
  selected,
  updatedOptions,
  onToggle,
  onUpdated,
  idPrefix,
}: {
  groups: FilterGroup[];
  selected: SelectedFilters;
  updatedOptions: UpdatedOption[];
  onToggle: (key: FilterKey, value: string) => void;
  onUpdated: (value: string) => void;
  idPrefix: string;
}) {
  return (
    <>
      {groups.map((group) => (
        <details key={group.key} className={styles.filterGroup} open>
          <summary className={styles.filterSummary}>
            {group.title}
            <ChevronDownIcon size={16} />
          </summary>
          <div className={styles.filterBody}>
            {group.items.map((item) => (
              <label key={item.label} className={styles.checkRow}>
                <input
                  type="checkbox"
                  name={`${idPrefix}-${group.key}`}
                  value={item.label}
                  className={styles.checkbox}
                  checked={selected[group.key].includes(item.label)}
                  onChange={() => onToggle(group.key, item.label)}
                />
                <span className={styles.filterLabel}>{item.label}</span>
                <span className={styles.filterCount}>
                  {formatCount(item.count)}
                </span>
              </label>
            ))}
          </div>
        </details>
      ))}

      <details className={styles.filterGroup} open>
        <summary className={styles.filterSummary}>
          Terakhir diperbarui
          <ChevronDownIcon size={16} />
        </summary>
        <div className={styles.filterBody}>
          {updatedOptions.map((option) => (
            <label key={option.label} className={styles.checkRow}>
                <input
                  type="radio"
                  name={`diperbarui-${idPrefix}`}
                  value={option.value}
                  className={styles.radio}
                  checked={selected.diperbarui === option.value}
                  onChange={() => onUpdated(option.value)}
                />
              <span className={styles.filterLabel}>{option.label}</span>
              <span className={styles.filterCount}>
                {formatCount(option.count)}
              </span>
            </label>
          ))}
        </div>
      </details>
    </>
  );
}

export function SearchFilters({
  groups,
  tipe,
  lokasi,
  pengalaman,
  pendidikan,
  kecamatan,
  diperbarui,
  updatedOptions,
  resultCount,
}: {
  groups: FilterGroup[];
  tipe: string[];
  lokasi: string[];
  pengalaman: string[];
  pendidikan: string[];
  kecamatan: string[];
  diperbarui: string;
  updatedOptions: UpdatedOption[];
  resultCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const selected = { tipe, lokasi, pengalaman, pendidikan, kecamatan, diperbarui };
  const activeCount =
    tipe.length +
    lokasi.length +
    pengalaman.length +
    pendidikan.length +
    kecamatan.length +
    (diperbarui ? 1 : 0);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function push(params: URLSearchParams) {
    router.push(
      params.toString() ? `/lowongan?${params.toString()}` : "/lowongan",
      { scroll: false },
    );
  }

  function toggle(key: FilterKey, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const values = (params.get(key) ?? "").split(",").filter(Boolean);
    const next = values.includes(value)
      ? values.filter((item) => item !== value)
      : [...values, value];

    if (next.length > 0) {
      params.set(key, next.join(","));
    } else {
      params.delete(key);
    }

    push(params);
  }

  function setUpdated(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("diperbarui", value);
    } else {
      params.delete("diperbarui");
    }

    push(params);
  }

  function reset() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tipe");
    params.delete("lokasi");
    params.delete("pengalaman");
    params.delete("pendidikan");
    params.delete("kecamatan");
    params.delete("diperbarui");
    push(params);
  }

  function openDrawer() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function closeDrawer() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        className={styles.filterTrigger}
        onClick={openDrawer}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="filter-dialog"
      >
        Filter
        {activeCount > 0 && (
          <span className={styles.filterTriggerCount}>{activeCount}</span>
        )}
      </button>

      <aside className={styles.filters}>
        <div className={styles.filterHead}>
          <h2 className={styles.filterTitle}>Filter</h2>
          {activeCount > 0 && (
            <button type="button" className={styles.resetButton} onClick={reset}>
              Reset
            </button>
          )}
        </div>
        <FilterPanel
          groups={groups}
          selected={selected}
          updatedOptions={updatedOptions}
          onToggle={toggle}
          onUpdated={setUpdated}
          idPrefix="inline"
        />
      </aside>

      <dialog
        ref={dialogRef}
        id="filter-dialog"
        className={styles.filterDialog}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDrawer();
        }}
        aria-labelledby="filter-dialog-title"
      >
        <div className={styles.dialogHead}>
          <h2 id="filter-dialog-title" className={styles.filterTitle}>
            Filter
          </h2>
          <button
            type="button"
            className={styles.dialogClose}
            onClick={closeDrawer}
            aria-label="Tutup filter"
          >
            <CloseIcon size={20} />
          </button>
        </div>
        <div className={styles.dialogBody}>
          {activeCount > 0 && (
            <button
              type="button"
              className={styles.dialogReset}
              onClick={reset}
            >
              Reset semua filter
            </button>
          )}
          <FilterPanel
            groups={groups}
            selected={selected}
            updatedOptions={updatedOptions}
            onToggle={toggle}
            onUpdated={setUpdated}
            idPrefix="dialog"
          />
        </div>
        <div className={styles.dialogFoot}>
          <Button type="button" onClick={closeDrawer}>
            Lihat {formatCount(resultCount)} lowongan
          </Button>
        </div>
      </dialog>
    </>
  );
}
