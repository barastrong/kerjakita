export type Category = {
  name: string;
  count: string;
};

export type TagTone = "mint" | "neutral" | "gold" | "accent";

export type JobCard = {
  slug: string;
  title: string;
  company: string;
  companySlug: string;
  initials: string;
  color: string;
  meta: string;
  salary: string;
  match: number;
  tags: { label: string; tone: TagTone }[];
};

export type CompanyCard = {
  slug: string;
  name: string;
  industry: string;
  initials: string;
  color: string;
  openJobs: number;
};

export type Step = {
  number: number;
  title: string;
  description: string;
};

export type SkillMatch = {
  label: string;
  value: number;
  level: string;
  tone: "mint" | "amber";
};

export type HeroData = {
  title: string;
  subtitle: string;
  fields: { name: string; label: string; value: string }[];
  popular: string[];
  match: {
    title: string;
    company: string;
    companySlug: string;
    initials: string;
    color: string;
    score: number;
    skills: SkillMatch[];
  };
};

export const hero: HeroData = {
  title:
    "Cari kerja yang cocok dengan keahlianmu, bukan yang kebetulan lewat.",
  subtitle:
    "Kerjakita membandingkan profilmu dengan setiap lowongan, jadi kamu tahu seberapa cocok sebelum melamar.",
  fields: [
    { name: "q", label: "Posisi atau kata kunci", value: "Product Designer" },
    { name: "location", label: "Lokasi", value: "Jakarta, Remote" },
    { name: "salary", label: "Gaji per bulan", value: "Rp 10 – 20 juta" },
  ],
  popular: ["UI designer", "Data analyst", "Admin", "Barista"],
  match: {
    title: "Senior Product Designer",
    company: "Tokoloka · Jakarta Selatan",
    companySlug: "tokoloka",
    initials: "TL",
    color: "#3d3bf3",
    score: 92,
    skills: [
      { label: "Figma", value: 100, level: "Ahli", tone: "mint" },
      { label: "Design system", value: 90, level: "Kuat", tone: "mint" },
      { label: "UX research", value: 75, level: "Baik", tone: "mint" },
      { label: "Data analitik", value: 35, level: "Kurang", tone: "amber" },
    ],
  },
};

export const categories: Category[] = [
  { name: "Teknologi", count: "5.280 lowongan" },
  { name: "Desain & kreatif", count: "1.140 lowongan" },
  { name: "Keuangan", count: "2.030 lowongan" },
  { name: "Pemasaran", count: "1.870 lowongan" },
  { name: "Kesehatan", count: "960 lowongan" },
  { name: "Pendidikan", count: "1.320 lowongan" },
  { name: "Logistik", count: "2.410 lowongan" },
  { name: "Layanan pelanggan", count: "3.050 lowongan" },
];

export const featuredJobs: JobCard[] = [
  {
    slug: "senior-product-designer-tokoloka",
    title: "Senior Product Designer",
    company: "Tokoloka",
    companySlug: "tokoloka",
    initials: "TL",
    color: "#3d3bf3",
    meta: "Tokoloka · Jakarta Selatan · Hybrid",
    salary: "Rp 18 – 25 juta per bulan",
    match: 92,
    tags: [
      { label: "Figma", tone: "mint" },
      { label: "Design system", tone: "neutral" },
      { label: "Baru hari ini", tone: "gold" },
    ],
  },
  {
    slug: "product-designer-pembayaran-bayarpintar",
    title: "Product Designer, Pembayaran",
    company: "Bayarpintar",
    companySlug: "bayarpintar",
    initials: "BP",
    color: "#0b7a62",
    meta: "Bayarpintar · Remote · Indonesia",
    salary: "Rp 14 – 20 juta per bulan",
    match: 86,
    tags: [
      { label: "UX research", tone: "mint" },
      { label: "Prototyping", tone: "neutral" },
      { label: "Lamar cepat", tone: "gold" },
    ],
  },
  {
    slug: "ui-ux-designer-kopi-sinar-digital",
    title: "UI/UX Designer",
    company: "Kopi Sinar Digital",
    companySlug: "kopi-sinar-digital",
    initials: "KS",
    color: "#c2410c",
    meta: "Kopi Sinar Digital · Surabaya · Hybrid",
    salary: "Rp 10 – 14 juta per bulan",
    match: 81,
    tags: [
      { label: "Mobile app", tone: "mint" },
      { label: "Figma", tone: "neutral" },
      { label: "Segera ditutup", tone: "gold" },
    ],
  },
];

export const hiringCompanies: CompanyCard[] = [
  {
    slug: "tokoloka",
    name: "Tokoloka",
    industry: "E-commerce",
    initials: "TL",
    color: "#3d3bf3",
    openJobs: 24,
  },
  {
    slug: "bayarpintar",
    name: "Bayarpintar",
    industry: "Fintech",
    initials: "BP",
    color: "#0b7a62",
    openJobs: 11,
  },
  {
    slug: "nawasehat",
    name: "Nawasehat",
    industry: "Kesehatan",
    initials: "NW",
    color: "#7c3aed",
    openJobs: 8,
  },
  {
    slug: "kopi-sinar-digital",
    name: "Kopi Sinar Digital",
    industry: "Makanan & minuman",
    initials: "KS",
    color: "#c2410c",
    openJobs: 6,
  },
  {
    slug: "garuda-retail-tech",
    name: "Garuda Retail Tech",
    industry: "Ritel",
    initials: "GR",
    color: "#0f172a",
    openJobs: 15,
  },
];

export const steps: Step[] = [
  {
    number: 1,
    title: "Lengkapi profil",
    description:
      "Unggah CV, isi keahlian, dan tentukan gaji yang kamu harapkan.",
  },
  {
    number: 2,
    title: "Lihat kecocokan",
    description:
      "Setiap lowongan menampilkan skill yang sudah dan belum kamu penuhi.",
  },
  {
    number: 3,
    title: "Lamar lebih cepat",
    description:
      "Kirim lamaran dengan satu klik dan pantau statusnya di dashboard.",
  },
];
