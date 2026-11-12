# DESIGN.md

Dokumen ini adalah sumber kebenaran visual dan copy untuk Kerjakita. Baca sebelum mengubah UI. Jika kode dan dokumen berbeda, perbaiki kode atau ubah dokumen dengan alasan yang jelas.

## 1. Product truth

- Produk: pasar kerja Indonesia untuk pencari kerja early dan mid-career, serta tim rekrutmen kecil.
- Pekerjaan utama pencari kerja: menemukan lowongan yang benar-benar cocok, bukan sekadar daftar lowongan.
- Pekerjaan utama perekrut: menemukan kandidat yang layak dengan cepat, lalu mengambil keputusan.
- Hook produk: skor kecocokan. Skor ini harus terlihat, dijelaskan, dan dipakai konsisten di seluruh produk.
- Nada: jelas, jujur, spesifik. Bukan korporat, bukan hype.

## 2. Design read

- Public: buletin lowongan yang diedit manusia. Rapi, tenang, dan punya sudut pandang.
- Applicant: meja kerja yang tenang. Fokus pada langkah berikutnya, bukan pada metrik.
- Recruiter: papan operasi gelap. Fokus pada antrean tindakan, bukan pada dekorasi.
- Dials: `ENERGY 2/5`, `RHYTHM 2/5`, `MOTION 1/5`.
- Tema mengikuti peran: public dan applicant light, recruiter dark. Dark di sini keputusan operasional, bukan dark mode default.
- Ini bukan: landing page SaaS generik, dashboard template, atau mockup AI dengan gradient dan kartu seragam.

## 3. Brand idea and signature

- Ide: “Meja kerja”. Lowongan, profil, dan keputusan disusun seperti dokumen kerja yang rapi.
- Signature 1: match card dengan skor besar, satu sampai tiga bar keahlian, dan sudut khas.
- Signature 2: corner notch `10/10/10/3` pada logo mark dan chip kecil. Panel besar memakai echo `24/24/24/8`.
- Signature 3: job row. Satu lowongan adalah satu baris data yang mudah dipindai, bukan satu kartu penuh.
- Reuse match card di home, auth, rekomendasi applicant, dan candidate card recruiter.
- Jangan membuat signature baru per halaman. Karakter datang dari pengulangan yang disiplin.

## 4. Principles

1. Match first: skor dan alasan kecocokan muncul sebelum detail sekunder.
2. One clear action: setiap layar punya satu tindakan utama.
3. Data with context: setiap angka punya sumber, tanggal, atau label “Contoh data”.
4. Rows before cards: pakai baris untuk data yang bisa dipindai. Kartu hanya untuk unit yang benar-benar berdiri sendiri.
5. Flat surfaces: border dan tipografi melakukan pekerjaan. Shadow hanya untuk lapisan yang mengambang.
6. Honest prototype: jangan pakai angka pasar, testimoni, logo, atau label “Paling populer” tanpa sumber.
7. Type does the work: ukuran dan bobot font yang disiplin lebih penting daripada warna tambahan.
8. Motion only for feedback: hover, focus, drawer, dan satu match-bar fill. Tidak ada scroll reveal.

## 5. Color

### 5.1 Palette

| Token | Nilai | Pakai | Catatan kontras |
| --- | --- | --- | --- |
| `--brand-ink` | `#101A3A` | Teks utama, dark surface | 17.06:1 di putih |
| `--brand-muted` | `#5B6482` | Teks sekunder, meta | 5.85:1 di putih, 5.13:1 di `--brand-bg` |
| `--brand-line` | `#DDE2EE` | Border, divider | Hanya garis, bukan teks |
| `--brand-surface` | `#FFFFFF` | Card, input, header | Surface utama |
| `--brand-bg` | `#EDF0F7` | Band halaman | Background public |
| `--brand-canvas` | `#F4F6FA` | Canvas aplikasi | Background dashboard |
| `--brand-accent` | `#3D3BF3` | Aksi utama, link | 6.73:1 di putih |
| `--brand-accent-hover` | `#3331DF` | Hover aksi utama | Lebih gelap dari accent |
| `--brand-accent-soft` | `#E6E6FE` | Selected, soft action | 5.49:1 dengan accent |
| `--brand-mint` | `#0B7A62` | Sukses, match tinggi | 4.59:1 di `--brand-mint-soft` |
| `--brand-mint-soft` | `#DDF4EC` | Background sukses | Jangan pakai mint sebagai teks di putih |
| `--brand-gold` | `#E0A100` | Mark, fill, peringatan | 2.02:1 di `--brand-gold-soft`; jangan teks |
| `--brand-gold-soft` | `#FFF1CC` | Background peringatan | Hanya background |
| `--brand-gold-text` | `#7A5300` | Teks peringatan | 6.10:1 di `--brand-gold-soft` |
| `--brand-danger` | `#B42318` | Error, destructive | 6.57:1 di putih, 5.45:1 di `--brand-danger-soft` |
| `--brand-danger-soft` | `#FEE4E2` | Background error | Hanya background |

### 5.2 Semantic aliases

Pakai alias di komponen. Token `--brand-*` hanya boleh dipakai di `globals.css`.

```css
--color-text: var(--brand-ink);
--color-text-muted: var(--brand-muted);
--color-bg: var(--brand-bg);
--color-canvas: var(--brand-canvas);
--color-surface: var(--brand-surface);
--color-line: var(--brand-line);
--color-accent: var(--brand-accent);
--color-accent-soft: var(--brand-accent-soft);
--color-success: var(--brand-mint);
--color-success-soft: var(--brand-mint-soft);
--color-warning: var(--brand-gold-text);
--color-warning-mark: var(--brand-gold);
--color-warning-soft: var(--brand-gold-soft);
--color-danger: var(--brand-danger);
--color-danger-soft: var(--brand-danger-soft);
```

### 5.3 Usage

- Rasio: 70% surface/canvas, 20% ink, 8% accent, 2% semantic.
- Accent hanya untuk aksi, link, selected state, dan match bar.
- Mint hanya untuk sukses dan match tinggi. Gold hanya untuk peringatan atau waktu.
- Jangan memakai gold sebagai teks. Gunakan `--color-warning`.
- Jangan memakai lebih dari satu warna aksen dalam satu komponen.
- Jangan memakai gradient, glow, atau warna neon.
- Warna tidak boleh menjadi satu-satunya penanda status. Selalu sertakan teks.

## 6. Typography

### 6.1 Families

- Display: Bricolage Grotesque 700/800. Untuk page title, section title, stat value, match score, dan wordmark.
- Body: Plus Jakarta Sans 400/600/700. Untuk body, label, tombol, tabel, dan form.
- Jangan menambah font baru tanpa keputusan desain yang eksplisit.

### 6.2 Scale

| Token | Size | Line height | Weight | Pakai |
| --- | --- | --- | --- | --- |
| `--text-xs` | 12px | 1.35 | 600 | Label, badge, meta |
| `--text-sm` | 13px | 1.45 | 400/600 | Body kecil, tabel, tombol sm |
| `--text-base` | 14px | 1.45 | 400/600 | Body utama, UI |
| `--text-md` | 16px | 1.45 | 400 | Lead, form besar |
| `--text-lg` | 18px | 1.35 | 600 | Card title, match score |
| `--text-xl` | 24px | 1.25 | 700 | Section title |
| `--text-wordmark` | 20px | 1.2 | 800 | Wordmark header dan footer saja |
| `--text-2xl` | 32px | 1.2 | 700 | Page title |
| `--text-3xl` | 44px | 1.1 | 800 | Hero tablet |
| `--text-4xl` | 56px | 1.1 | 800 | Hero desktop |

- Hanya sembilan ukuran ini. Jangan memakai 10.5, 11.5, 12.5, 13.5, 14.5, 23, 29, 31, 34, 46, 52, atau 64.
- Display tracking: `-0.02em`. Heading tracking: `-0.01em`. Body tracking: `0`.
- `font-variant-numeric: tabular-nums` untuk skor, count, gaji, tanggal, dan tabel.
- Jangan memakai `line-height: normal`. Selalu pakai token line-height.
- Jangan memakai all-caps untuk heading. All-caps hanya untuk label meta 12px dengan tracking `0.04em`, dan hanya jika benar-benar perlu.

## 7. Space, layout, breakpoints

### 7.1 Spacing

| Token | Nilai |
| --- | --- |
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-24` | 96px |

- `--page-gutter: clamp(1rem, 4vw, 2.5rem)`.
- `--content-max: 80rem` (1280px).
- `--band-max: 90rem` (1440px).
- `--header-height: 4.5rem` (72px).
- `--sidebar-width: 16.25rem` (260px).
- `--filter-rail: 17.5rem` (280px).
- Jangan memakai padding 7, 9, 11, 13, 15, 17, 18, 20, 22, 28, 36, 44, atau 52 kecuali sebagai satu-off yang dijustifikasi.

### 7.2 Grid

- 12 kolom, gutter 24px desktop, 16px mobile.
- Public: konten maksimal 1280px, band full-bleed maksimal 1440px.
- Dashboard: sidebar 260px, main maksimal 1200px.
- Search: filter rail 280px + hasil fleksibel.
- Pakai CSS Grid untuk layout halaman. Jangan memakai flex untuk membentuk grid utama.
- Jangan memakai bento mosaic. Jika semua sel berukuran mirip, pakai grid atau list biasa.
- Jangan memakai tiga pricing column sebagai default. Jumlah tier mengikuti produk nyata, dan hanya satu yang boleh ditonjolkan dengan alasan.
- Footer mengikuti link yang benar-benar ada. Jangan memaksa empat kolom Product/Company/Resources/Legal.
- Setiap section tidak harus memakai komposisi yang sama. Variasi mengikuti RHYTHM 2/5, bukan template.
- Jangan memakai background grid, blueprint lines, dot grid, atau repeating texture sebagai dekorasi.
- Jangan memakai fake terminal window, logo bar “Trusted by”, atau ilustrasi generik yang tidak terhubung ke produk.

### 7.3 Breakpoints

- `640px`: mobile besar.
- `900px`: tablet. Sidebar menjadi drawer, hero menjadi satu kolom, auth menjadi satu kolom.
- `1200px`: desktop penuh.
- Media query memakai angka literal. CSS custom property tidak bisa dipakai di media query.
- Wajib tes 390px, 768px, dan 1440px.
- Mobile first. Tidak boleh ada horizontal scroll.

## 8. Shape, elevation, focus

### 8.1 Radius

| Token | Nilai | Pakai |
| --- | --- | --- |
| `--radius-xs` | 4px | Badge, tag |
| `--radius-sm` | 8px | Input, small control |
| `--radius-md` | 12px | Button, compact card |
| `--radius-lg` | 16px | Card, panel |
| `--radius-xl` | 24px | Hero panel, match card |
| `--radius-pill` | 999px | Filter chip, status pill |
| `--radius-brand` | `10px 10px 10px 3px` | Logo mark, chip kecil |

- Panel besar boleh memakai echo `24px 24px 24px 8px`.
- Jangan memakai radius 3, 5, 9, 11, 13, 17, 18, 21, 22, atau 24 selain token di atas.

### 8.2 Border and shadow

- Card default: `1px solid var(--color-line)`, tanpa shadow.
- Dark surface: `1px solid rgba(255,255,255,.12)`.
- Shadow hanya untuk popover, dropdown, dan drawer: `0 12px 32px rgba(16,26,58,.14)`.
- Overlay: `rgba(16,26,58,.48)`.
- Jangan memakai multi-layer shadow, inner shadow, atau glow.

### 8.3 Focus

- Light surface: `outline: 2px solid var(--color-accent); outline-offset: 2px;`.
- Dark surface: `outline: 2px solid #FFFFFF; outline-offset: 2px;`.
- Hanya `:focus-visible`.
- Jangan menghapus outline tanpa pengganti yang setara.

### 8.4 Z-index

| Token | Nilai |
| --- | --- |
| `--z-header` | 20 |
| `--z-overlay` | 40 |
| `--z-drawer` | 50 |
| `--z-popover` | 60 |

- Jangan memakai `z-index: 9999`.

## 9. Components

### 9.1 Button

- Primary: accent background, white text, hover `--brand-accent-hover`.
- Secondary: surface background, 1.5px ink border, ink text, hover canvas.
- Ghost: transparent, muted text, hover accent-soft.
- Size: sm 36px, md 44px, lg 52px. Radius 12px. Font 13/14/16 weight 600.
- Disabled: opacity .45, cursor not-allowed, tanpa hover.
- Loading: `aria-busy="true"`, teks “Memproses...”, disabled.
- Jangan memakai pill untuk tombol utama. Pill hanya untuk filter chip.

### 9.2 Field

- Label 13px weight 600, di atas input.
- Input 44px, radius 8px, border 1px line, padding 0 12px, font 14px.
- Focus: border accent + focus ring.
- Error: border danger, helper 12px danger, `aria-invalid="true"`, `aria-describedby`.
- Helper: 12px muted.
- Textarea minimal 96px. Select memakai native select.
- Checkbox dan radio minimal 20px, label 14px, target 44px.
- Jangan memakai placeholder sebagai label.

### 9.3 Card

- Default: surface, border 1px, radius 16px, padding 24px.
- Dark: ink background, white text, border putih transparan.
- Inset: canvas background, tanpa border.
- Jangan menaruh card di dalam card. Pakai divider atau section.
- Jangan memakai shadow untuk card.

### 9.4 Badge and status

- Badge: 12px weight 600, padding 4px 8px, radius 4px.
- Status chip: 12px weight 600, padding 4px 10px, radius 999px.
- Tone: neutral, accent, mint, gold, danger.
- Badge bukan tombol. Jika bisa diklik, pakai filter chip.
- Jangan memakai “AI Powered”, “Beta”, atau “New” sebagai capsule dekoratif.
- Jangan menaruh pill badge di atas H1 jika labelnya hanya mengulang headline.
- Dot di badge hanya boleh muncul jika menandai state nyata. Tanpa glow dan tanpa pulse.

### 9.5 MatchScore

- Skor: 18px atau 24px, display 800, tabular nums.
- Label: 12px weight 600.
- Bar: tinggi 6px, track line, fill accent, radius 999px.
- Ambang label: 80+ “Cocok” mint, 60-79 “Cukup cocok” gold-text, di bawah 60 “Perlu dilengkapi” muted.
- Bar tetap accent, bukan warna semantic. Warna semantic hanya pada label.
- Maksimal tiga bar per card.

### 9.6 SectionHeading

- Kicker opsional: 12px weight 600 accent, sentence case.
- Title: 24px atau 32px, display 700.
- Description: 14px atau 16px muted.
- Action di kanan pada desktop, di bawah pada mobile.
- Jangan memakai kicker all-caps di setiap section.

### 9.7 Stat

- Label 12px weight 600 muted.
- Value 32px display 700, tabular nums.
- Note 12px muted.
- Tanpa card secara default.
- Empat stat card sejajar bukan pola default. Pakai satu summary band atau inline stats.

### 9.8 JobRow

- Tinggi 80px desktop, 96px mobile.
- Company mark 40px, title 14px weight 600, meta 13px muted.
- Gaji 13px weight 600. Match 18px weight 700.
- Hover: canvas background. Border-bottom 1px line.
- Mobile: title dan meta stack, match tetap di kanan.
- Jangan membungkus setiap job row dalam card.

### 9.9 StageRail

- Lima tahap: Terkirim, Dilihat, Wawancara, Penawaran, Tidak lanjut.
- Count 24px display 700, label 12px weight 600.
- Active accent, completed mint, upcoming muted.
- Garis penghubung 1px line.
- Di bawah 640px, ubah menjadi daftar vertikal.
- Jangan memakai 5-column kanban di layar sempit.

### 9.10 Table

- Header 12px weight 600 muted.
- Row 64px, border-bottom 1px line.
- Angka rata kanan, aksi rata kanan.
- Kolom dipilih dari keputusan yang diambil user di tabel itu. Taruh field penentu di awal.
- Jangan memakai kolom default Name/Status/Date/Actions jika data punya field yang lebih penting.
- Menu baris hanya berisi aksi yang benar-benar berfungsi.
- Mobile: ubah menjadi stacked rows dengan label.
- Pakai `<table>` untuk data tabular, bukan div.

### 9.11 Tabs and filter chips

- Tab: underline 2px accent, text 14px weight 600, inactive muted.
- Filter chip: tinggi 32px, radius 999px, border 1px line, text 13px weight 600.
- Selected: accent-soft background, accent text, accent border.
- Jangan memakai tab berbentuk pill.

### 9.12 Avatar and CompanyMark

- Avatar: 32/40/48px, circle, initials 12/13px weight 700.
- Empat tone saja: accent, mint, gold, slate.
- Jangan memakai foto orang, stock photo, atau warna rainbow.
- CompanyMark: 40px, radius 12px, monogram 13px weight 700, border 1px line.
- Logo mark brand memakai `--radius-brand`.

### 9.13 EmptyState

- Title 16px weight 600, body 14px muted, satu aksi.
- Padding 32px, border 1px line, radius 16px, surface.
- Tanpa ilustrasi. Copy harus spesifik dan memberi langkah berikutnya.
- Contoh: “Belum ada lamaran. Mulai dari lowongan yang cocok dengan profilmu.”

### 9.14 Drawer and overlay

- Overlay `rgba(16,26,58,.48)`.
- Drawer surface, lebar maksimal 320px, tinggi penuh.
- Fokus pindah ke tombol tutup saat dibuka. Escape menutup. Fokus kembali ke trigger.
- Body scroll dikunci. Main memakai `inert` saat drawer terbuka.
- Jangan memakai drawer untuk konten yang bisa tampil inline di desktop.

### 9.15 Footer

- Navy background, padding 32px, brand 20px display 800.
- Link 13px line, harus punya tujuan.
- Mobile: stack, align left.
- Jangan menampilkan link mati seperti “Syarat”, “Privasi”, atau “Bantuan” tanpa halaman.

## 10. Page patterns

### 10.1 Public shell

- Header 72px, surface, border-bottom.
- Logo mark 32px dengan signature, wordmark 20px display 800.
- Nav 14px weight 600. Active state memakai underline atau rule, bukan pill.
- CTA primary sm di kanan.
- Di bawah 900px, nav menjadi drawer.

### 10.2 Home

- Hero navy full-bleed, padding 64px sampai 96px, split 7/5.
- H1 44px sampai 56px display 800. Body 16px.
- Search bar surface, radius 16px, tiga field + satu tombol.
- Match card sebagai fokus kanan, dengan skor dan dua sampai tiga bar.
- Di bawah hero: satu lead job card + empat job rows, bukan tiga kartu sejajar.
- “Cara kerja” menjadi numbered rail, bukan tiga feature card. Jumlah langkah mengikuti proses nyata, bukan default tiga.
- Bidang pekerjaan menjadi directory list dengan count real.
- Perusahaan menjadi compact monogram row.
- Jangan memakai logo bar “Trusted by” tanpa logo dan izin yang nyata.
- Jangan memakai pill badge di atas H1 jika isinya hanya mengulang headline.
- Semua angka berasal dari data. Jika data statis, beri label “Contoh data”.

### 10.3 Jobs and search

- Header pencarian di band canvas.
- Filter rail 280px sticky di kiri, hasil di kanan.
- Result count real. Empty, loading, dan error state wajib ada.
- Result rows memakai JobRow dan MatchScore.
- Di bawah 900px, filter menjadi drawer.
- Jangan menampilkan “12.480 lowongan” jika data tidak mendukung.

### 10.4 Job detail

- Dua kolom: konten utama 1fr, aside 360px sticky.
- Aside berisi apply card, match score, dan ringkasan lowongan.
- Section: “Yang akan kamu kerjakan”, “Kualifikasi”, “Tentang perusahaan”.
- CTA apply selalu terlihat di desktop, sticky bottom bar di mobile.

### 10.5 Companies

- Directory memakai table atau list dengan monogram, industri, ukuran, lokasi, dan jumlah lowongan real.
- Company detail: hero monogram, meta, tentang, dan open roles.
- Jangan memakai grid logo palsu atau angka “486 perusahaan” tanpa sumber.

### 10.6 Salary

- Hero boleh memakai foto workspace gelap dengan overlay solid; jangan memakai foto orang.
- Form filter posisi, kota, dan pengalaman memakai GET agar hasil bisa dibagikan.
- Ringkasan median dan kuartil memakai satu card, bukan card di dalam card.
- Chart memakai satu accent dan neutral, bukan pelangi.
- Judul chart harus menyatakan pertanyaan yang dijawab chart itu. Jika satu kalimat lebih jelas, pakai kalimat.
- Segmen chart minimal 3:1 terhadap latar.
- Table peran dengan gaji rendah, median, tinggi; tandai baris yang dipilih.
- Sertakan sumber dan tanggal data jika data nyata. Untuk data contoh, label “Contoh data” cukup dan jangan memalsukan tanggal.
- Jangan menampilkan presisi palsu.

### 10.7 Courses

- Catalog memakai grid kartu dengan cover warna, kategori, judul, durasi, level, provider, skill, dan harga.
- Kartu kursus adalah unit mandiri: 3 kolom desktop, 2 kolom tablet, 1 kolom mobile.
- Course detail: curriculum, outcome, dan lowongan terkait.
- Jangan mengubah katalog menjadi baris data padat.

### 10.8 Auth

- Split 45/55. Kiri navy dengan brand dan match card. Kanan form surface.
- Hapus klaim “ribuan lowongan” atau “2,4 juta pencari kerja” jika tidak ada sumber.
- Social auth hanya ditampilkan jika benar-benar berfungsi.
- Di bawah 900px, brand panel menjadi header ringkas.

### 10.9 Applicant

- Shell light, sidebar 260px, top bar mobile.
- Ringkasan: page header, next action card, stage rail, list lamaran, jadwal, rekomendasi.
- Banner recruiter dipindah ke bawah atau dibuat compact. Jangan menaruhnya di atas prioritas pencari kerja.
- Count sidebar berasal dari data, bukan hardcoded 4/12/1.
- Lamaran: tabs/filter + table/list, detail dengan timeline.
- Tersimpan: job rows dengan match dan aksi hapus.
- Wawancara: schedule list + prep checklist.
- Profil: dua kolom form + checklist, preview, dan save state.
- Pengaturan: form dan kontrol yang berfungsi.

### 10.10 Recruiter

- Shell dark, sidebar 260px, main light.
- Ringkasan: action queue di atas, funnel, jadwal, lowongan perlu perhatian.
- Jangan memakai activity feed berisi nama dan event fiktif. Feed hanya berisi event nyata, atau pakai empty state yang jujur.
- Jangan memakai empat stat card default.
- Funnel memakai data yang konsisten. Hapus angka 412/268/74/18/11 jika tidak terhubung ke data.
- Lowongan: table dengan status, pelamar, views, closing date, dan aksi.
- Pelamar: stage tabs + table, detail dengan match breakdown, CV, catatan, dan jadwal.
- Wawancara: week list, bukan full calendar library.
- Profil perusahaan: picker + preview. Perbaiki perilaku nama custom yang tidak mereset field lain.
- Tim dan akun: form/table sederhana, tanpa kontrol mati.

### 10.11 Apply

- Stepper empat langkah: data diri, CV/portofolio, pertanyaan, tinjau.
- Job summary sticky di desktop, collapsible di mobile.
- Validasi inline. Tombol kembali dan lanjut harus berfungsi.
- Success screen jelas dan tidak memalsukan status.
- Jangan memakai copy “500+ perusahaan” tanpa sumber.

### 10.12 Profile and settings

- Shared Field untuk semua form.
- Preview profil dan CV harus berfungsi atau dihapus.
- Upload CV harus jelas: format, ukuran, status, dan error.
- Save state terlihat: “Tersimpan”, “Menyimpan...”, atau “Gagal menyimpan”.
- Jangan menampilkan tombol yang tidak melakukan apa pun.

## 11. Copy

### 11.1 Voice

- Jelas, jujur, spesifik.
- Pakai “kamu” di semua surface produk. “Anda” hanya untuk teks legal atau formal.
- Tulis seperti manusia yang membantu, bukan seperti bot yang menjual.

### 11.2 Rules

- Sentence case untuk heading, tombol, dan label.
- Tanpa em dash. Pakai titik dua, koma, tanda kurung, atau “sampai” untuk rentang.
- Tanpa buzzword: seamless, robust, empower, unleash, revolutionary, next-gen, solusi terbaik, platform terdepan.
- Tanpa “Oops!”, “Ups!”, atau tanda seru berlebihan.
- Tanpa emoji di heading, bullet, tombol, atau badge. Jika butuh penanda, pakai ikon yang relevan atau tidak usah.
- Tanpa panah `→`/`↗` di hampir semua tombol. Simpan untuk aksi yang benar-benar butuh arah.
- Tanpa ikon sparkle, magic, robot, atau AI orb sebagai ikon fitur.
- Tanpa klaim, testimoni, logo, atau angka yang tidak punya sumber.
- “Paling populer” hanya boleh muncul jika ada data yang mendukung.
- “Gratis” hanya boleh muncul jika benar-benar gratis.
- Gunakan “·” untuk memisahkan meta: `Tokoloka · Jakarta Selatan`.
- Gunakan “sampai” atau hyphen untuk rentang: `Rp 10-20 juta`.

### 11.3 Examples

| Jangan | Pakai |
| --- | --- |
| Solusi terbaik untuk karier Anda | Cari lowongan yang cocok dengan keahlianmu |
| Oops! Terjadi kesalahan | Lowongan gagal dimuat. Coba lagi. |
| No data | Belum ada lamaran. Mulai dari lowongan yang cocok dengan profilmu. |
| 12.480 lowongan aktif | 18 lowongan aktif, atau “Contoh data” |
| Paling populer | Hapus, atau ganti dengan alasan yang terukur |
| Daftar sekarang dan raih mimpi | Lihat lowongan yang cocok |

### 11.4 Numbers and dates

- Format Indonesia: `12.480`, `Rp 1.500.000`, `Rp 10-20 juta`.
- Tanggal: `15 Okt 2026`, `10.00 WIB`.
- Jangan memakai `15/10/26` di UI.
- Selalu pakai tabular nums untuk angka di tabel, skor, dan count.

### 11.5 Error and empty states

- Error: apa yang terjadi + apa yang harus dilakukan.
- Empty: keadaan saat ini + satu langkah berikutnya.
- Jangan menyalahkan user.
- Jangan memakai ilustrasi generik atau emoji.

### 11.6 Demo data

- Jika data statis, beri label “Contoh data” di dekat metrik.
- Jangan mencampur angka real dan angka fiktif dalam satu layar.
- Count di sidebar dan dashboard harus berasal dari data yang sama dengan halaman terkait.
- Jangan mengisi field atau kolom kosong dengan data palsu seperti `John Doe` atau `johndoe@example.com`.
- Placeholder harus jujur: `Nama kamu`, `email@contoh.com`, `Tulis pesanmu di sini...`, atau `[ISI DATA]`.

## 12. Motion

- `--duration-fast: 120ms`, `--duration-base: 180ms`, `--duration-match: 400ms`.
- `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover dan focus: 120ms.
- Menu, drawer, popover: 180ms.
- Match bar: 400ms sekali saat pertama muncul.
- Tanpa scroll reveal, parallax, floating blob, animated gradient, cursor follower, atau bounce.
- Tanpa pulse, glow, atau loop tak berujung. Status dot tidak boleh berkedip terus-menerus.
- Jangan menumpuk Fade Up + Fade In + Scale + Bounce dalam satu halaman. Kalau MOTION 1, hampir semuanya diam.
- `prefers-reduced-motion: reduce` mematikan transform dan match fill.

## 13. Accessibility

- Kontras teks minimal AA. Cek pasangan warna sebelum memakai kombinasi baru.
- Target sentuh minimal 44px.
- Setiap input punya label. Placeholder bukan label.
- Error memakai `aria-invalid` dan `aria-describedby`.
- Navigasi memakai `aria-current="page"`.
- Drawer: fokus masuk, Escape menutup, fokus kembali ke trigger.
- Satu `h1` per halaman. Heading berurutan.
- Link untuk navigasi, button untuk aksi.
- Tabel punya caption atau `aria-label`.
- Chart punya ringkasan teks atau tabel pendamping.
- Status tidak boleh hanya dibedakan lewat warna.
- Skip link ke konten utama.
- Zoom 200% tidak boleh memotong konten.
- Hormati `prefers-reduced-motion`.

## 14. Responsive

- 390px: satu kolom, gutter 16px, tap target 44px.
- 768px: dua kolom jika konten mengizinkan, sidebar masih drawer.
- 1440px: grid penuh, content max 1280px, band max 1440px.
- Header: nav menjadi drawer di bawah 900px.
- Dashboard: sidebar menjadi drawer di bawah 900px.
- Search: filter rail menjadi drawer di bawah 900px.
- Auth: split menjadi satu kolom di bawah 900px.
- Home: hero 7/5 menjadi satu kolom di bawah 900px.
- Apply: summary sticky menjadi collapsible di bawah 900px.
- Table: menjadi stacked rows di bawah 640px.
- StageRail: menjadi daftar vertikal di bawah 640px.
- Tidak boleh ada horizontal scroll di 390px.

## 15. Performance

- Setiap `<img>`, `<video>`, `<iframe>`, atau embed punya `width`/`height` atau `aspect-ratio`. Tidak boleh ada layout shift.
- Hero image adalah `<img>` di dalam HTML, `fetchpriority="high"`, dan tidak pernah lazy. Lazy hanya untuk konten di bawah fold.
- Font dimuat lewat `next/font`. Tidak ada layout shift dari late font.
- Tidak ada script pihak ketiga render-blocking di `<head>`. Pakai `defer`/`async`, atau muat saat interaksi.
- Jangan melaporkan metrik yang tidak diukur. Angka performa harus hasil pengukuran nyata.
- Bander atau banner yang muncul kemudian di-overlay, bukan disisipkan di atas konten.

## 16. Anti-slop checklist

### Visual

- [ ] Tidak ada gradient, glassmorphism, neumorphism, 3D blob, atau glow.
- [ ] Tidak ada stock photo orang, foto AI, logo palsu, atau avatar rainbow.
- [ ] Tidak ada tiga kartu fitur sejajar sebagai pola default.
- [ ] Tidak ada empat stat card sejajar sebagai pola default.
- [ ] Tidak ada 5-column kanban di layar sempit.
- [ ] Tidak ada pill untuk semua elemen.
- [ ] Tidak ada shadow berlapis.
- [ ] Tidak ada radius atau font-size di luar token.
- [ ] Tidak ada bento mosaic, fake terminal, background grid, atau colored left stripe tanpa makna.
- [ ] Tidak ada emoji, panah di hampir semua tombol, pill badge di atas H1, atau AI capsule badge.
- [ ] Tidak ada dot status dekoratif dengan glow atau pulse tanpa state nyata.
- [ ] Tidak ada ikon sparkle, magic, robot, atau AI orb sebagai ikon fitur.
- [ ] Tidak ada illustration yang tidak terhubung ke produk.

### Token

- [ ] Tidak ada raw hex di CSS module. Warna hanya lewat token.
- [ ] Tidak ada `line-height: normal`.
- [ ] Tidak ada `z-index: 9999`.
- [ ] Tidak ada spacing acak di luar scale.
- [ ] Avatar hanya memakai empat tone brand.

### Content

- [ ] Tidak ada em dash.
- [ ] Tidak ada buzzword.
- [ ] Tidak ada angka, testimoni, atau label “Paling populer” tanpa sumber.
- [ ] Data statis diberi label “Contoh data”.
- [ ] Semua count berasal dari data yang sama.
- [ ] Tidak ada field atau kolom kosong yang diisi data palsu (`John Doe`, `johndoe@example.com`).
- [ ] Tidak ada activity feed berisi nama dan event fiktif.

### Functional

- [ ] Tidak ada tombol atau link tanpa tujuan.
- [ ] Semua form punya validasi dan error state.
- [ ] Semua halaman data punya empty, loading, dan error state.
- [ ] Preview profil dan CV berfungsi atau dihapus.
- [ ] Footer links punya halaman tujuan.
- [ ] Kolom tabel dipilih dari keputusan user, bukan default Name/Status/Date/Actions.
- [ ] Chart punya judul yang menyatakan pertanyaannya. Kalau tidak, dihapus.
- [ ] Empty, loading, dan error state menyebut sebab dan langkah berikutnya, bukan “No data”.

### Accessibility

- [ ] Kontras AA.
- [ ] Focus visible.
- [ ] Target 44px.
- [ ] Keyboard navigation.
- [ ] `aria-current` pada nav.
- [ ] Reduced motion.
- [ ] Tidak ada horizontal scroll di 390px.

### Performance

- [ ] Semua media punya dimensi atau `aspect-ratio`.
- [ ] Hero image di HTML dengan `fetchpriority="high"`, tidak lazy.
- [ ] Tidak ada script pihak ketiga render-blocking.
- [ ] Metrik performa hanya dilaporkan jika diukur.

### QA

- [ ] `npm run lint` pass.
- [ ] `npx tsc --noEmit` pass.
- [ ] `npm run build` pass.
- [ ] Playwright 390px, 768px, 1440px pass.
- [ ] Tidak ada console error.
- [ ] Screenshot before/after disimpan untuk halaman yang berubah.

## 17. Migration map

### Phase 1: Dokumen

- Buat `DESIGN.md`.
- Tambahkan pointer singkat di `AGENTS.md`: baca `DESIGN.md` sebelum mengubah UI.

### Phase 2: Foundation

- `src/app/globals.css`: token warna, spacing, type, radius, shadow, focus, z-index.
- `src/app/layout.tsx`: ganti em dash di metadata.
- `src/app/(public)/layout.tsx`: pastikan header/footer mengikuti shell baru.

### Phase 3: Shared primitives

- `src/components/ui/button/button.tsx`
- `src/components/ui/button/button.module.css`
- `src/components/ui/card/card.module.css`
- `src/components/ui/badge/badge.module.css`
- `src/components/layout/header/header.tsx`
- `src/components/layout/header/header.module.css`
- `src/components/layout/footer/footer.tsx`
- `src/components/layout/footer/footer.module.css`

### Phase 4: Public pages

- `src/components/pages/home/*`
- `src/components/pages/jobs/*`
- `src/components/pages/search/*`
- `src/components/pages/companies/*`
- `src/components/pages/salary/*`
- `src/components/pages/courses/*`
- `src/components/pages/auth/*`
- `src/components/pages/recruiter/recruiter-*`

### Phase 5: App surfaces

- `src/components/pages/applicant/*`
- `src/components/pages/recruiter/dashboard/*`
- `src/components/pages/apply/*`
- `src/components/pages/applicant/profil-page.tsx`
- `src/components/pages/applicant/lamaran-*`
- `src/components/pages/recruiter/dashboard/profil-perusahaan-page.tsx`

### Phase 6: Data and copy

- `src/lib/data/home.ts`
- `src/lib/data/jobs.ts`
- `src/lib/data/companies.ts`
- `src/lib/data/company-directory.ts`
- `src/lib/data/apply.ts`
- `src/components/pages/applicant/lamaran-data.ts`
- Hapus angka fiktif, turunkan count dari data, dan beri label “Contoh data” jika perlu.

### Phase 7: QA

- Update script Playwright di `C:\Users\USER\AppData\Local\Temp\opencode`.
- Tambahkan satu script audit tanpa dependency untuk em dash, raw hex, font-size, dan radius.
- Jalankan lint, tsc, build, dan screenshot 390/768/1440.

## 18. Definition of done

- Halaman baru bisa dibangun hanya dengan token dan komponen di dokumen ini.
- Reviewer bisa menolak PR dengan menunjuk aturan yang dilanggar.
- Semua checklist anti-slop tercentang.
- Tidak ada kontrol mati.
- Tidak ada data fiktif tanpa label.
- Tidak ada em dash.
- Lint, tsc, build, dan QA responsive pass.
