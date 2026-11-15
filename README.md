# Kerjakita

Platform lowongan kerja Indonesia: cari lowongan, lihat profil perusahaan, cek gaji, ikut kursus, dan rekrut kandidat.

Dibangun dengan Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript, dan CSS Modules.

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lain:

```bash
npm run build   # build produksi
npm start       # jalankan hasil build
npm run lint    # eslint
npx tsc --noEmit
```

## Struktur

```
src/
  app/
    (public)/      # beranda, lowongan, perusahaan, gaji, kursus, perekrut
    (applicant)/   # dashboard pelamar
    (recruiter)/   # dashboard perekrut
    (app)/         # halaman lamar
    (auth)/        # masuk & daftar
  components/
    layout/        # header, footer
    pages/         # komponen per halaman
    ui/            # komponen bersama, termasuk skeleton loading
  lib/data/        # data statis (lowongan, perusahaan, kursus, gaji)
```

Setiap halaman punya `loading.tsx` dengan skeleton yang mengikuti layout halaman aslinya.

## Gambar & Cache

- Foto hero di `public/images/` memakai format WebP.
- `next.config.ts` mengaktifkan AVIF/WebP untuk `next/image` (`minimumCacheTTL` 31 hari).
- Aset di `/images/*` dikirim dengan `Cache-Control: public, max-age=2678400, stale-while-revalidate=86400`.
