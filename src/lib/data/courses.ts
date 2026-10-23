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

export const designSystemCourse = {
  slug: "design-system-dari-nol",
  title: "Design System dari Nol",
  category: "Desain produk",
  level: "Menengah",
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
  return slug === designSystemCourse.slug ? designSystemCourse : undefined;
}
