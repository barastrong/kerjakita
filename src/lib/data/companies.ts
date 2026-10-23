import { companyDirectory } from "./company-directory";

export type CompanyRating = {
  label: string;
  value: number;
  score: string;
};

export type CompanyReview = {
  title: string;
  stars: string;
  meta: string;
  body: string;
};

export type CompanyDetail = {
  slug: string;
  name: string;
  initials: string;
  color: string;
  industry: string;
  employees: string;
  locations: string;
  rating: string;
  reviewCount: number;
  openJobCount: number;
  about: string;
  facts: { label: string; value: string }[];
  facilities: string[];
  ratings: CompanyRating[];
  reviews: CompanyReview[];
  openJobs: { title: string; meta: string }[];
  salaries: { role: string; range: string }[];
};

const tokoloka: CompanyDetail = {
  slug: "tokoloka",
  name: "Tokoloka",
  initials: "TL",
  color: "#3d3bf3",
  industry: "E-commerce",
  employees: "1.200 karyawan",
  locations: "Jakarta Selatan dan Surabaya",
  rating: "4,2",
  reviewCount: 318,
  openJobCount: 24,
  about:
    "Tokoloka adalah marketplace yang menghubungkan penjual lokal dengan pembeli di seluruh Indonesia. Tim produk bekerja dalam squad kecil dan merilis fitur baru setiap dua minggu.",
  facts: [
    { label: "Berdiri", value: "2016" },
    { label: "Karyawan", value: "1.200" },
    { label: "Kantor", value: "Jakarta, Surabaya" },
    { label: "Industri", value: "E-commerce" },
  ],
  facilities: [
    "Kerja hybrid",
    "Asuransi kesehatan",
    "Dana pelatihan",
    "Cuti 15 hari",
    "Bonus tahunan",
    "Makan siang",
  ],
  ratings: [
    { label: "Budaya kerja", value: 88, score: "4,4" },
    { label: "Keseimbangan hidup", value: 78, score: "3,9" },
    { label: "Gaji dan tunjangan", value: 82, score: "4,1" },
    { label: "Jenjang karier", value: 76, score: "3,8" },
  ],
  reviews: [
    {
      title: "Tim kecil, dampak besar",
      stars: "★★★★★",
      meta: "Product Designer · 2 tahun · Karyawan saat ini",
      body:
        "Desainer dilibatkan sejak tahap riset. Keputusan produk cepat dan berbasis data pengguna.",
    },
    {
      title: "Jam kerja fleksibel, jenjang karier lambat",
      stars: "★★★★☆",
      meta: "Software Engineer · 3 tahun · Mantan karyawan",
      body:
        "Kerja hybrid benar-benar dijalankan, tetapi kenaikan jabatan butuh waktu lebih lama dari yang dijanjikan.",
    },
  ],
  openJobs: [
    {
      title: "Senior Product Designer",
      meta: "Jakarta Selatan · Hybrid · Rp 18 – 25 jt",
    },
    { title: "Product Designer", meta: "Remote · Rp 14 – 18 jt" },
    {
      title: "UX Researcher",
      meta: "Jakarta Selatan · Hybrid · Rp 12 – 17 jt",
    },
    {
      title: "Design System Lead",
      meta: "Surabaya · Onsite · Rp 22 – 28 jt",
    },
  ],
  salaries: [
    { role: "Product Designer", range: "Rp 14 – 22 jt" },
    { role: "Software Engineer", range: "Rp 16 – 30 jt" },
    { role: "Data Analyst", range: "Rp 12 – 20 jt" },
  ],
};

const companies: Record<string, CompanyDetail> = {
  tokoloka,
};

function buildCompany(slug: string): CompanyDetail | undefined {
  const directory = companyDirectory.find((company) => company.slug === slug);
  if (!directory) return undefined;

  const base = Math.round(
    (Number(directory.rating.replace(",", ".")) / 5) * 100,
  );
  const categories = [
    { label: "Budaya kerja", value: Math.min(95, base + 4) },
    { label: "Keseimbangan hidup", value: Math.max(60, base - 8) },
    { label: "Gaji dan tunjangan", value: base },
    { label: "Jenjang karier", value: Math.max(60, base - 5) },
  ];
  const workStyle = directory.workStyle.toLowerCase();

  return {
    slug: directory.slug,
    name: directory.name,
    initials: directory.initials,
    color: directory.color,
    industry: directory.industry,
    employees: "500+ karyawan",
    locations: "Jakarta, Indonesia",
    rating: directory.rating,
    reviewCount: directory.reviewCount,
    openJobCount: directory.openJobs,
    about: `${directory.name} bergerak di bidang ${directory.industry.toLowerCase()} dengan tim yang tersebar di Indonesia. Karyawan bekerja secara ${workStyle} dan berkolaborasi lintas fungsi untuk menghadirkan produk yang relevan bagi pengguna.`,
    facts: [
      { label: "Karyawan", value: "500+" },
      { label: "Kantor", value: "Jakarta, Indonesia" },
      { label: "Industri", value: directory.industry },
      { label: "Tipe kerja", value: directory.workStyle },
    ],
    facilities: [
      `Kerja ${workStyle}`,
      "Asuransi kesehatan",
      "Dana pelatihan",
      "Cuti tahunan",
      "Bonus tahunan",
      "Makan siang",
    ],
    ratings: categories.map((category) => ({
      ...category,
      score: (category.value / 20).toFixed(1).replace(".", ","),
    })),
    reviews: [
      {
        title: "Lingkungan kerja yang suportif",
        stars: "★★★★☆",
        meta: `Karyawan saat ini · ${directory.industry}`,
        body: `Tim di ${directory.name} terbiasa berbagi konteks dan memberi ruang untuk mencoba pendekatan baru.`,
      },
      {
        title: "Banyak ruang untuk belajar",
        stars: "★★★★★",
        meta: "Mantan karyawan · 2 tahun",
        body:
          "Proses kerja terdokumentasi dengan baik dan feedback diberikan secara rutin.",
      },
    ],
    openJobs: [
      {
        title: "Product Designer",
        meta: `Jakarta · ${directory.workStyle} · Rp 14 – 20 jt`,
      },
      {
        title: "UX Researcher",
        meta: `Jakarta · ${directory.workStyle} · Rp 12 – 18 jt`,
      },
      { title: "Frontend Engineer", meta: "Remote · Rp 16 – 26 jt" },
    ],
    salaries: [
      { role: "Product Designer", range: "Rp 14 – 22 jt" },
      { role: "Software Engineer", range: "Rp 16 – 30 jt" },
      { role: "Data Analyst", range: "Rp 12 – 20 jt" },
    ],
  };
}

export function getCompany(slug: string) {
  return companies[slug] ?? buildCompany(slug);
}
