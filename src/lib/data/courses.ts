export type CourseLesson = {
  title: string;
  duration: string;
  preview?: boolean;
};

export type CourseModule = {
  title: string;
  lessons: string;
  duration: string;
  items?: CourseLesson[];
};

export type RelatedCourse = {
  slug: string;
  title: string;
  provider: string;
  duration: string;
  price: string;
  initials: string;
  color: string;
};

export type PathStepState = "done" | "active" | "todo";

export type PathStep = {
  title: string;
  description: string;
  state: PathStepState;
  course: {
    slug: string;
    title: string;
    provider: string;
    duration: string;
    modules: string;
    initials: string;
    color: string;
  };
  skills: string[];
  status: string;
};

export type CourseDetailData = {
  slug: string;
  title: string;
  category: string;
  level: string;
  summary: string;
  rating: string;
  reviewCount: string;
  duration: string;
  modules: string;
  lessons: string;
  updated: string;
  color: string;
  instructor: {
    initials: string;
    name: string;
    role: string;
    rating: string;
    students: string;
    courses: string;
    bio: string;
  };
  price: string;
  oldPrice: string;
  discount: string;
  includes: string[];
  skills: string[];
  jobsNote: string;
  learn: string[];
  curriculum: CourseModule[];
  reviews: { name: string; stars: string; body: string }[];
  related: RelatedCourse[];
};

export type CatalogCourse = {
  slug: string;
  title: string;
  provider: string;
  duration: string;
  level: string;
  rating: string;
  price: string;
  initials: string;
  color: string;
};

export const courseCatalog: CatalogCourse[] = [
  {
    slug: "dasar-ux-research",
    title: "Dasar UX Research",
    provider: "Belajarin",
    duration: "6 jam",
    level: "Pemula",
    rating: "4,6",
    price: "Gratis",
    initials: "UX",
    color: "#3d3bf3",
  },
  {
    slug: "design-system-dari-nol",
    title: "Design System dari Nol",
    provider: "Studio Lokal",
    duration: "9 jam",
    level: "Menengah",
    rating: "4,7",
    price: "Rp 249.000",
    initials: "DS",
    color: "#0b7a62",
  },
  {
    slug: "analitik-produk-untuk-desainer",
    title: "Analitik Produk untuk Desainer",
    provider: "Pintarta",
    duration: "8 jam",
    level: "Menengah",
    rating: "4,4",
    price: "Rp 199.000",
    initials: "AN",
    color: "#c2410c",
  },
  {
    slug: "menulis-studi-kasus-portofolio",
    title: "Menulis Studi Kasus Portofolio",
    provider: "Lokalkarya",
    duration: "4 jam",
    level: "Pemula",
    rating: "4,5",
    price: "Gratis",
    initials: "PF",
    color: "#7c3aed",
  },
  {
    slug: "figma-auto-layout-mahir",
    title: "Figma Auto Layout Mahir",
    provider: "Belajarin",
    duration: "5 jam",
    level: "Menengah",
    rating: "4,8",
    price: "Rp 149.000",
    initials: "FG",
    color: "#0f766e",
  },
  {
    slug: "persiapan-wawancara-desainer",
    title: "Persiapan Wawancara Desainer",
    provider: "Nawasehat",
    duration: "3 jam",
    level: "Pemula",
    rating: "4,3",
    price: "Gratis",
    initials: "WW",
    color: "#b45309",
  },
];

const relatedFor = (slug: string): RelatedCourse[] =>
  courseCatalog
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
    .map(({ slug, title, provider, duration, price, initials, color }) => ({
      slug,
      title,
      provider,
      duration,
      price,
      initials,
      color,
    }));

export const designSystemCourse: CourseDetailData = {
  slug: "design-system-dari-nol",
  title: "Design System dari Nol",
  category: "Desain produk",
  level: "Menengah",
  color: "#0b7a62",
  summary:
    "Bangun design system yang dipakai ulang oleh tim desain dan engineering: dari token warna dan tipografi sampai komponen, dokumentasi, dan serah terima.",
  rating: "4,7",
  reviewCount: "1.284",
  duration: "9 jam",
  modules: "7 modul",
  lessons: "31 pelajaran",
  updated: "Diperbarui Sep 2026",
  instructor: {
    initials: "AW",
    name: "Arya Wirawan",
    role: "Design Systems Lead, Studio Lokal",
    rating: "4,8",
    students: "6.400",
    courses: "5",
    bio: "Sepuluh tahun membangun design system untuk produk e-commerce dan fintech di Indonesia.",
  },
  price: "Rp 249.000",
  oldPrice: "Rp 399.000",
  discount: "Hemat 38%",
  includes: [
    "9 jam video pelajaran",
    "7 modul dan 24 latihan",
    "Sertifikat Kerjakita",
    "Akses seumur hidup",
    "Garansi uang kembali 14 hari",
  ],
  skills: ["Design system", "Figma", "Komponen"],
  jobsNote:
    "Dibutuhkan di 1.240 lowongan Product Designer yang sedang dibuka.",
  learn: [
    "Menyusun token warna, tipografi, dan spasi",
    "Membuat komponen dengan variants dan auto layout",
    "Menulis dokumentasi yang mudah dipakai tim",
    "Menamai layer dan komponen secara konsisten",
    "Menyiapkan serah terima ke engineer",
    "Mengaudit antarmuka yang sudah ada",
    "Mengukur pemakaian ulang komponen",
    "Menyusun studi kasus untuk portofolio",
  ],
  curriculum: [
    {
      title: "1. Dasar design system",
      lessons: "3 pelajaran",
      duration: "42 mnt",
      items: [
        {
          title: "Apa itu design system dan kapan dibutuhkan",
          duration: "12:30",
          preview: true,
        },
        {
          title: "Audit antarmuka yang sudah ada",
          duration: "14:10",
        },
        {
          title: "Menentukan prinsip dan ruang lingkup",
          duration: "15:20",
        },
      ],
    },
    {
      title: "2. Token warna dan tipografi",
      lessons: "4 pelajaran",
      duration: "1 j 10 m",
    },
    {
      title: "3. Komponen dasar di Figma",
      lessons: "6 pelajaran",
      duration: "1 j 45 m",
    },
    {
      title: "4. Variants dan auto layout",
      lessons: "5 pelajaran",
      duration: "1 j 30 m",
    },
    {
      title: "5. Dokumentasi dan penamaan",
      lessons: "4 pelajaran",
      duration: "1 j 05 m",
    },
    {
      title: "6. Serah terima ke engineer",
      lessons: "4 pelajaran",
      duration: "1 j 20 m",
    },
    {
      title: "7. Studi kasus: sistem untuk aplikasi pemesanan",
      lessons: "5 pelajaran",
      duration: "1 j 55 m",
    },
  ] satisfies CourseModule[],
  reviews: [
    {
      name: "Ayu R.",
      stars: "★★★★★",
      body:
        "Contoh studi kasusnya nyata. Setelah selesai, saya langsung merapikan komponen di tim saya.",
    },
    {
      name: "Bima S.",
      stars: "★★★★☆",
      body:
        "Materi auto layout sangat jelas. Saya berharap ada lebih banyak latihan di modul akhir.",
    },
  ],
  related: [
    {
      slug: "figma-auto-layout-mahir",
      title: "Figma Auto Layout Mahir",
      provider: "Belajarin",
      duration: "5 jam",
      price: "Rp 149.000",
      initials: "FG",
      color: "#0f766e",
    },
    {
      slug: "dasar-ux-research",
      title: "Dasar UX Research",
      provider: "Belajarin",
      duration: "6 jam",
      price: "Gratis",
      initials: "UX",
      color: "#3d3bf3",
    },
    {
      slug: "analitik-produk-untuk-desainer",
      title: "Analitik Produk untuk Desainer",
      provider: "Pintarta",
      duration: "8 jam",
      price: "Rp 199.000",
      initials: "AN",
      color: "#c2410c",
    },
  ] satisfies RelatedCourse[],
};

export const uxResearchCourse: CourseDetailData = {
  slug: "dasar-ux-research",
  title: "Dasar UX Research",
  category: "Riset pengguna",
  level: "Pemula",
  color: "#3d3bf3",
  summary:
    "Pelajari cara memahami pengguna sebelum mulai mendesain: menyusun pertanyaan riset, mewawancarai pengguna, menguji kegunaan, dan merangkum temuan menjadi keputusan desain.",
  rating: "4,6",
  reviewCount: "864",
  duration: "6 jam",
  modules: "4 modul",
  lessons: "18 pelajaran",
  updated: "Diperbarui Agu 2026",
  instructor: {
    initials: "NP",
    name: "Nadia Prameswari",
    role: "UX Researcher, Belajarin",
    rating: "4,7",
    students: "9.200",
    courses: "7",
    bio: "Menjalankan riset pengguna untuk produk edukasi dan marketplace selama delapan tahun.",
  },
  price: "Gratis",
  oldPrice: "",
  discount: "",
  includes: [
    "6 jam video pelajaran",
    "4 modul dan 12 latihan",
    "Sertifikat Kerjakita",
    "Akses seumur hidup",
    "Gratis, tanpa kartu kredit",
  ],
  skills: ["UX research", "Wawancara pengguna", "Usability test"],
  jobsNote:
    "Dibutuhkan di 680 lowongan UX Researcher dan Product Designer yang sedang dibuka.",
  learn: [
    "Menulis pertanyaan riset yang bisa dijawab",
    "Memilih metode riset sesuai kebutuhan",
    "Memandu wawancara tanpa menggiring jawaban",
    "Menjalankan usability test sederhana",
    "Mengelompokkan temuan dengan affinity diagram",
    "Membedakan temuan, insight, dan rekomendasi",
    "Menulis laporan riset yang dibaca tim",
    "Menghubungkan temuan riset ke keputusan desain",
  ],
  curriculum: [
    {
      title: "1. Riset itu untuk apa",
      lessons: "3 pelajaran",
      duration: "45 mnt",
      items: [
        {
          title: "Kenapa riset sebelum mendesain",
          duration: "11:20",
          preview: true,
        },
        { title: "Menulis pertanyaan riset", duration: "16:05" },
        { title: "Memilih metode yang tepat", duration: "17:40" },
      ],
    },
    {
      title: "2. Wawancara pengguna",
      lessons: "5 pelajaran",
      duration: "1 j 50 m",
    },
    {
      title: "3. Observasi dan usability test",
      lessons: "5 pelajaran",
      duration: "1 j 55 m",
    },
    {
      title: "4. Sintesis dan laporan riset",
      lessons: "5 pelajaran",
      duration: "1 j 30 m",
    },
  ] satisfies CourseModule[],
  reviews: [
    {
      name: "Dinda A.",
      stars: "★★★★★",
      body:
        "Cara menjelaskan wawancara sangat praktis. Template pertanyaannya langsung saya pakai di proyek pertama.",
    },
    {
      name: "Fajar N.",
      stars: "★★★★☆",
      body:
        "Materinya ringkas dan jelas. Bagian sintesis butuh latihan lebih banyak, tapi contohnya membantu.",
    },
  ],
  related: relatedFor("dasar-ux-research"),
};

export const productAnalyticsCourse: CourseDetailData = {
  slug: "analitik-produk-untuk-desainer",
  title: "Analitik Produk untuk Desainer",
  category: "Analitik produk",
  level: "Menengah",
  color: "#c2410c",
  summary:
    "Ukur dampak desain dengan data: pahami metrik produk, baca funnel dan dashboard, jalankan A/B test, dan pakai temuan data untuk membela keputusan desain.",
  rating: "4,4",
  reviewCount: "612",
  duration: "8 jam",
  modules: "6 modul",
  lessons: "24 pelajaran",
  updated: "Diperbarui Sep 2026",
  instructor: {
    initials: "RM",
    name: "Raka Mahendra",
    role: "Product Analyst, Pintarta",
    rating: "4,5",
    students: "5.100",
    courses: "4",
    bio: "Menganalisis perilaku pengguna di produk fintech dan membantu tim desain membaca data tanpa takut angka.",
  },
  price: "Rp 199.000",
  oldPrice: "Rp 299.000",
  discount: "Hemat 33%",
  includes: [
    "8 jam video pelajaran",
    "6 modul dan 18 latihan",
    "Sertifikat Kerjakita",
    "Akses seumur hidup",
    "Garansi uang kembali 14 hari",
  ],
  skills: ["Metrik produk", "A/B test", "SQL dasar"],
  jobsNote:
    "Dibutuhkan di 540 lowongan Product Designer yang meminta kemampuan analitik.",
  learn: [
    "Memilih metrik yang relevan untuk fitur baru",
    "Membaca funnel dan mencari titik kebocoran",
    "Menyusun hipotesis yang bisa diuji",
    "Merancang A/B test bersama tim data",
    "Menulis query SQL dasar untuk menjawab pertanyaan desain",
    "Menghindari kesimpulan yang salah dari data kecil",
    "Menyajikan temuan data ke pemangku kepentingan",
    "Menggabungkan data kuantitatif dengan riset kualitatif",
  ],
  curriculum: [
    {
      title: "1. Dari desain ke metrik",
      lessons: "3 pelajaran",
      duration: "48 mnt",
      items: [
        {
          title: "Metrik yang penting untuk desainer",
          duration: "14:10",
          preview: true,
        },
        { title: "Membaca funnel produk", duration: "16:30" },
        { title: "Menentukan pertanyaan data", duration: "17:20" },
      ],
    },
    {
      title: "2. Dasar analitik produk",
      lessons: "4 pelajaran",
      duration: "1 j 15 m",
    },
    {
      title: "3. Membaca dashboard",
      lessons: "4 pelajaran",
      duration: "1 j 20 m",
    },
    {
      title: "4. A/B test untuk desainer",
      lessons: "5 pelajaran",
      duration: "1 j 45 m",
    },
    {
      title: "5. SQL dasar untuk desainer",
      lessons: "4 pelajaran",
      duration: "1 j 30 m",
    },
    {
      title: "6. Studi kasus: memperbaiki onboarding",
      lessons: "4 pelajaran",
      duration: "1 j 22 m",
    },
  ] satisfies CourseModule[],
  reviews: [
    {
      name: "Yuda P.",
      stars: "★★★★★",
      body:
        "Akhirnya paham cara membaca funnel tanpa harus jadi data analyst. Studi kasusnya sangat relevan.",
    },
    {
      name: "Intan S.",
      stars: "★★★★☆",
      body:
        "Modul SQL padat tapi dijelaskan perlahan. Cocok untuk desainer yang baru mulai pakai data.",
    },
  ],
  related: relatedFor("analitik-produk-untuk-desainer"),
};

export const portfolioCaseStudyCourse: CourseDetailData = {
  slug: "menulis-studi-kasus-portofolio",
  title: "Menulis Studi Kasus Portofolio",
  category: "Portofolio",
  level: "Pemula",
  color: "#7c3aed",
  summary:
    "Ubah proyek yang sudah kamu kerjakan menjadi studi kasus yang meyakinkan: struktur cerita, bukti proses, dan hasil yang membuat perekrut ingin mengobrol.",
  rating: "4,5",
  reviewCount: "1.048",
  duration: "4 jam",
  modules: "3 modul",
  lessons: "14 pelajaran",
  updated: "Diperbarui Jul 2026",
  instructor: {
    initials: "SK",
    name: "Sari Kusuma",
    role: "Career Coach, Lokalkarya",
    rating: "4,6",
    students: "7.800",
    courses: "6",
    bio: "Membantu ratusan desainer menyusun portofolio dan berlatih menceritakan proses kerja mereka.",
  },
  price: "Gratis",
  oldPrice: "",
  discount: "",
  includes: [
    "4 jam video pelajaran",
    "3 modul dan 9 latihan",
    "Sertifikat Kerjakita",
    "Akses seumur hidup",
    "Gratis, tanpa kartu kredit",
  ],
  skills: ["Storytelling", "Studi kasus", "Presentasi"],
  jobsNote:
    "Portofolio dengan studi kasus diminta di 1.870 lowongan desainer yang sedang dibuka.",
  learn: [
    "Memilih proyek yang layak ditulis",
    "Menyusun kerangka masalah sampai hasil",
    "Menulis ringkasan satu paragraf yang kuat",
    "Menunjukkan proses tanpa membocorkan rahasia kantor",
    "Memilih visual pendukung yang relevan",
    "Menulis dampak dengan angka yang jujur",
    "Menyunting tulisan agar mudah dipindai",
    "Menyiapkan versi presentasi untuk wawancara",
  ],
  curriculum: [
    {
      title: "1. Struktur studi kasus",
      lessons: "4 pelajaran",
      duration: "1 j 05 m",
      items: [
        {
          title: "Kenapa perekrut membaca studi kasus",
          duration: "12:00",
          preview: true,
        },
        { title: "Kerangka masalah sampai hasil", duration: "18:40" },
        { title: "Menulis ringkasan satu paragraf", duration: "15:10" },
      ],
    },
    {
      title: "2. Menulis cerita dari proyek",
      lessons: "5 pelajaran",
      duration: "1 j 25 m",
    },
    {
      title: "3. Menyunting dan memublikasikan",
      lessons: "5 pelajaran",
      duration: "1 j 30 m",
    },
  ] satisfies CourseModule[],
  reviews: [
    {
      name: "Rani M.",
      stars: "★★★★★",
      body:
        "Setelah ikut kelas ini, dua studi kasus saya dirapikan dan akhirnya dapat panggilan wawancara.",
    },
    {
      name: "Bagas W.",
      stars: "★★★★☆",
      body:
        "Template kerangkanya sangat membantu. Saya hanya ingin lebih banyak contoh industri lain.",
    },
  ],
  related: relatedFor("menulis-studi-kasus-portofolio"),
};

export const figmaAutoLayoutCourse: CourseDetailData = {
  slug: "figma-auto-layout-mahir",
  title: "Figma Auto Layout Mahir",
  category: "Desain produk",
  level: "Menengah",
  color: "#0f766e",
  summary:
    "Kuasai auto layout sampai tingkat lanjut: komponen responsif, variants, nested layout, dan file yang rapi untuk kolaborasi tim desain dan engineering.",
  rating: "4,8",
  reviewCount: "1.572",
  duration: "5 jam",
  modules: "5 modul",
  lessons: "20 pelajaran",
  updated: "Diperbarui Okt 2026",
  instructor: {
    initials: "YP",
    name: "Yoga Pratama",
    role: "Product Designer, Belajarin",
    rating: "4,9",
    students: "11.400",
    courses: "3",
    bio: "Desainer produk yang dikenal karena file Figma-nya rapi dan komponennya dipakai lintas tim.",
  },
  price: "Rp 149.000",
  oldPrice: "Rp 249.000",
  discount: "Hemat 40%",
  includes: [
    "5 jam video pelajaran",
    "5 modul dan 15 latihan",
    "Sertifikat Kerjakita",
    "Akses seumur hidup",
    "Garansi uang kembali 14 hari",
  ],
  skills: ["Figma", "Auto layout", "Komponen"],
  jobsNote:
    "Diminta di 920 lowongan Product Designer yang menyebut Figma secara eksplisit.",
  learn: [
    "Mengatur arah, padding, dan gap dengan benar",
    "Membuat komponen yang menyesuaikan ukuran konten",
    "Menggabungkan beberapa auto layout bertingkat",
    "Menyusun variants yang tidak membingungkan",
    "Memakai constraints untuk layout responsif",
    "Menamai dan merapikan struktur layer",
    "Membuat komponen yang siap dipakai tim",
    "Menyerahkan file yang mudah dipahami engineer",
  ],
  curriculum: [
    {
      title: "1. Ulang dasar auto layout",
      lessons: "3 pelajaran",
      duration: "42 mnt",
      items: [
        {
          title: "Arah, padding, dan gap",
          duration: "13:20",
          preview: true,
        },
        { title: "Resizing dan constraints", duration: "14:50" },
        { title: "Praktik: kartu responsif", duration: "13:50" },
      ],
    },
    {
      title: "2. Komponen dan variants",
      lessons: "4 pelajaran",
      duration: "1 j 05 m",
    },
    {
      title: "3. Nested auto layout",
      lessons: "4 pelajaran",
      duration: "1 j 10 m",
    },
    {
      title: "4. Layout untuk tim",
      lessons: "4 pelajaran",
      duration: "1 j 05 m",
    },
    {
      title: "5. Studi kasus: halaman lowongan",
      lessons: "5 pelajaran",
      duration: "1 j 20 m",
    },
  ] satisfies CourseModule[],
  reviews: [
    {
      name: "Kevin H.",
      stars: "★★★★★",
      body:
        "Nested auto layout akhirnya masuk akal. File kerja saya jauh lebih rapi dan cepat diubah.",
    },
    {
      name: "Laras D.",
      stars: "★★★★★",
      body:
        "Latihannya menantang dengan cara yang bagus. Setiap modul langsung terasa manfaatnya.",
    },
  ],
  related: relatedFor("figma-auto-layout-mahir"),
};

export const designerInterviewCourse: CourseDetailData = {
  slug: "persiapan-wawancara-desainer",
  title: "Persiapan Wawancara Desainer",
  category: "Karier",
  level: "Pemula",
  color: "#b45309",
  summary:
    "Hadapi wawancara desainer dengan lebih tenang: pahami tahapan rekrutmen, siapkan cerita portofolio, latih pertanyaan umum, dan tindak lanjuti dengan rapi.",
  rating: "4,3",
  reviewCount: "438",
  duration: "3 jam",
  modules: "3 modul",
  lessons: "11 pelajaran",
  updated: "Diperbarui Jun 2026",
  instructor: {
    initials: "MA",
    name: "Maya Anggraini",
    role: "Talent Partner, Nawasehat",
    rating: "4,4",
    students: "4.600",
    courses: "5",
    bio: "Bertahun-tahun mewawancarai desainer dan menyusun panduan rekrutmen untuk perusahaan teknologi.",
  },
  price: "Gratis",
  oldPrice: "",
  discount: "",
  includes: [
    "3 jam video pelajaran",
    "3 modul dan 8 latihan",
    "Sertifikat Kerjakita",
    "Akses seumur hidup",
    "Gratis, tanpa kartu kredit",
  ],
  skills: ["Wawancara kerja", "Portofolio", "Komunikasi"],
  jobsNote:
    "Dibutuhkan di 2.300 lowongan desainer yang sedang membuka proses wawancara.",
  learn: [
    "Memahami tahapan rekrutmen desainer",
    "Menyiapkan cerita untuk setiap proyek portofolio",
    "Menjawab pertanyaan tentang proses desain",
    "Menangani pertanyaan tentang kegagalan proyek",
    "Berlatih studi kasus saat wawancara",
    "Mengajukan pertanyaan yang tepat ke perekrut",
    "Menegosiasikan tawaran dengan percaya diri",
    "Menulis email tindak lanjut yang profesional",
  ],
  curriculum: [
    {
      title: "1. Memahami proses rekrutmen",
      lessons: "3 pelajaran",
      duration: "40 mnt",
      items: [
        {
          title: "Tahapan rekrutmen desainer",
          duration: "12:10",
          preview: true,
        },
        { title: "Apa yang dinilai perekrut", duration: "14:30" },
        { title: "Menyiapkan cerita pengalaman", duration: "13:20" },
      ],
    },
    {
      title: "2. Wawancara portofolio",
      lessons: "4 pelajaran",
      duration: "1 j 10 m",
    },
    {
      title: "3. Latihan dan tindak lanjut",
      lessons: "4 pelajaran",
      duration: "1 j 10 m",
    },
  ] satisfies CourseModule[],
  reviews: [
    {
      name: "Sinta R.",
      stars: "★★★★★",
      body:
        "Latihan menjawab pertanyaan portofolio membuat saya jauh lebih siap. Akhirnya lolos wawancara kedua.",
    },
    {
      name: "Dimas A.",
      stars: "★★★★☆",
      body:
        "Panduannya praktis, terutama bagian negosiasi. Saya ingin contoh gaji yang lebih banyak.",
    },
  ],
  related: relatedFor("persiapan-wawancara-desainer"),
};

export const courseDetails: CourseDetailData[] = [
  designSystemCourse,
  uxResearchCourse,
  productAnalyticsCourse,
  portfolioCaseStudyCourse,
  figmaAutoLayoutCourse,
  designerInterviewCourse,
];

export const productDesignerPath = {
  title: "Jalur belajar: Product Designer",
  category: "Desain produk",
  description:
    "Urutan kursus yang disusun dari keahlian yang paling sering diminta di lowongan Product Designer, dari riset pengguna sampai portofolio.",
  stepsCount: "4 langkah",
  duration: "27 jam",
  certificate: "Sertifikat jalur",
  progress: 40,
  progressNote: "1 dari 4 langkah selesai. Langkah 2 sedang berjalan.",
  summary: [
    { label: "Total durasi", value: "27 jam" },
    { label: "Kursus", value: "4 kursus · 20 modul" },
    { label: "Sertifikat", value: "Sertifikat jalur Kerjakita" },
    { label: "Akses", value: "Seumur hidup" },
  ],
  steps: [
    {
      title: "Dasar riset pengguna",
      description: "Pahami kebutuhan pengguna sebelum mulai merancang.",
      state: "done",
      status: "Selesai",
      course: {
        slug: "dasar-ux-research",
        title: "Dasar UX Research",
        provider: "Belajarin",
        duration: "6 jam",
        modules: "4 modul",
        initials: "UX",
        color: "#3d3bf3",
      },
      skills: ["Wawancara pengguna", "Sintesis riset"],
    },
    {
      title: "Design system lanjutan",
      description: "Bangun komponen yang konsisten dan mudah dipakai ulang.",
      state: "active",
      status: "Berjalan · 60%",
      course: {
        slug: "design-system-dari-nol",
        title: "Design System dari Nol",
        provider: "Studio Lokal",
        duration: "9 jam",
        modules: "7 modul",
        initials: "DS",
        color: "#0b7a62",
      },
      skills: ["Design system", "Auto layout", "Komponen"],
    },
    {
      title: "Analitik produk",
      description: "Ukur dampak desain dengan data.",
      state: "todo",
      status: "Belum mulai",
      course: {
        slug: "analitik-produk-untuk-desainer",
        title: "Analitik Produk untuk Desainer",
        provider: "Pintarta",
        duration: "8 jam",
        modules: "6 modul",
        initials: "AN",
        color: "#c2410c",
      },
      skills: ["Metrik produk", "A/B test"],
    },
    {
      title: "Studi kasus portofolio",
      description: "Ubah proyekmu menjadi cerita yang meyakinkan perekrut.",
      state: "todo",
      status: "Belum mulai",
      course: {
        slug: "menulis-studi-kasus-portofolio",
        title: "Menulis Studi Kasus Portofolio",
        provider: "Lokalkarya",
        duration: "4 jam",
        modules: "3 modul",
        initials: "PF",
        color: "#7c3aed",
      },
      skills: ["Storytelling", "Presentasi"],
    },
  ] satisfies PathStep[],
  jobs: [
    {
      title: "Senior Product Designer",
      company: "Tokoloka",
      meta: "Rp 18 – 25 jt",
      initials: "TL",
      color: "#3d3bf3",
      href: "/lamar/senior-product-designer-tokoloka",
    },
    {
      title: "Product Designer",
      company: "Bayarpintar",
      meta: "Rp 14 – 20 jt",
      initials: "BP",
      color: "#0b7a62",
      href: "/lamar/product-designer-pembayaran-bayarpintar",
    },
    {
      title: "UI/UX Designer",
      company: "Kopi Sinar Digital",
      meta: "Rp 10 – 14 jt",
      initials: "KS",
      color: "#c2410c",
      href: "/lamar/ui-ux-designer-kopi-sinar-digital",
    },
  ],
};

export function getCourse(slug: string) {
  return courseDetails.find((course) => course.slug === slug);
}
