export type Job = {
  slug: string;
  title: string;
  company: string;
  companySlug: string;
  initials: string;
  color: string;
  location: string;
  workStyle: string;
  employmentType: string;
  experience: string;
  district?: string;
  postedHours: number;
  salaryShort: string;
  salaryFull: string;
  meta: string;
  posted: string;
  skills: [string, string];
  searchSkills?: string[];
  match: number;
  quickApply?: boolean;
};

export const jobs: Job[] = [
  {
    slug: "senior-product-designer-tokoloka",
    title: "Senior Product Designer",
    company: "Tokoloka",
    companySlug: "tokoloka",
    initials: "TL",
    color: "#3d3bf3",
    location: "Jakarta Selatan",
    workStyle: "Hybrid",
    employmentType: "Penuh waktu",
    experience: "3 – 5 tahun",
    district: "Kebayoran Baru",
    postedHours: 2,
    salaryShort: "Rp 18 – 25 jt",
    salaryFull: "Rp 18 – 25 juta per bulan",
    meta: "Tokoloka · Jakarta Selatan · Hybrid",
    posted: "2 jam lalu",
    skills: ["Figma", "Design system"],
    searchSkills: ["Figma", "Design system", "UX research"],
    match: 92,
    quickApply: true,
  },
  {
    slug: "product-designer-pembayaran-bayarpintar",
    title: "Product Designer, Pembayaran",
    company: "Bayarpintar",
    companySlug: "bayarpintar",
    initials: "BP",
    color: "#0b7a62",
    location: "Remote",
    workStyle: "Remote",
    employmentType: "Penuh waktu",
    experience: "1 – 3 tahun",
    postedHours: 4,
    salaryShort: "Rp 14 – 20 jt",
    salaryFull: "Rp 14 – 20 juta per bulan",
    meta: "Bayarpintar · Remote · Indonesia",
    posted: "4 jam lalu",
    skills: ["UX research", "Prototyping"],
    match: 86,
    quickApply: true,
  },
  {
    slug: "senior-ux-designer-dagangin",
    title: "Senior UX Designer",
    company: "Dagangin",
    companySlug: "dagangin",
    initials: "DG",
    color: "#0f766e",
    location: "Remote",
    workStyle: "Remote",
    employmentType: "Penuh waktu",
    experience: "Lebih dari 5 tahun",
    postedHours: 5,
    salaryShort: "Rp 16 – 22 jt",
    salaryFull: "Rp 16 – 22 juta per bulan",
    meta: "Dagangin · Remote · Indonesia",
    posted: "5 jam lalu",
    skills: ["E-commerce", "Figma"],
    match: 88,
  },
  {
    slug: "ui-ux-designer-kopi-sinar-digital",
    title: "UI/UX Designer",
    company: "Kopi Sinar Digital",
    companySlug: "kopi-sinar-digital",
    initials: "KS",
    color: "#c2410c",
    location: "Surabaya",
    workStyle: "Hybrid",
    employmentType: "Penuh waktu",
    experience: "1 – 3 tahun",
    district: "Gubeng",
    postedHours: 7,
    salaryShort: "Rp 10 – 14 jt",
    salaryFull: "Rp 10 – 14 juta per bulan",
    meta: "Kopi Sinar Digital · Surabaya · Hybrid",
    posted: "7 jam lalu",
    skills: ["Mobile app", "Figma"],
    match: 81,
  },
  {
    slug: "product-designer-lokalkarya",
    title: "Product Designer",
    company: "Lokalkarya",
    companySlug: "lokalkarya",
    initials: "LK",
    color: "#b45309",
    location: "Jakarta",
    workStyle: "Hybrid",
    employmentType: "Penuh waktu",
    experience: "1 – 3 tahun",
    district: "Menteng",
    postedHours: 9,
    salaryShort: "Rp 13 – 18 jt",
    salaryFull: "Rp 13 – 18 juta per bulan",
    meta: "Lokalkarya · Jakarta Pusat · Hybrid",
    posted: "9 jam lalu",
    skills: ["Fintech", "Riset"],
    match: 79,
  },
  {
    slug: "lead-designer-nawasehat",
    title: "Lead Designer, Aplikasi Kesehatan",
    company: "Nawasehat",
    companySlug: "nawasehat",
    initials: "NW",
    color: "#7c3aed",
    location: "Jakarta Barat",
    workStyle: "Onsite",
    employmentType: "Penuh waktu",
    experience: "Lebih dari 5 tahun",
    district: "Grogol Petamburan",
    postedHours: 11,
    salaryShort: "Rp 22 – 30 jt",
    salaryFull: "Rp 22 – 30 juta per bulan",
    meta: "Nawasehat · Jakarta Barat · Onsite",
    posted: "11 jam lalu",
    skills: ["Tim", "Riset pengguna"],
    searchSkills: ["Kepemimpinan tim", "Riset pengguna"],
    match: 74,
  },
  {
    slug: "product-designer-kontrak-garuda-retail-tech",
    title: "Product Designer (Kontrak 12 bulan)",
    company: "Garuda Retail Tech",
    companySlug: "garuda-retail-tech",
    initials: "GR",
    color: "#0f172a",
    location: "Remote",
    workStyle: "Remote",
    employmentType: "Kontrak",
    experience: "1 – 3 tahun",
    postedHours: 48,
    salaryShort: "Rp 12 – 16 jt",
    salaryFull: "Rp 12 – 16 juta per bulan",
    meta: "Garuda Retail Tech · Remote · Indonesia",
    posted: "2 hari lalu",
    skills: ["E-commerce", "Figma"],
    match: 71,
  },
];

export const latestJobs = jobs.slice(0, 6);

export const searchJobs = [
  jobs[0],
  jobs[1],
  jobs[3],
  jobs[5],
  jobs[6],
];

export const searchDetail = {
  job: jobs[0],
  postedMeta: "Diposting 2 jam lalu · 34 pelamar · ditutup 30 Okt 2026",
  responsibilities: [
    "Merancang alur belanja dan pembayaran untuk jutaan pengguna aktif.",
    "Memimpin pengembangan design system bersama tiga desainer.",
    "Menjalankan uji coba pengguna setiap dua minggu.",
  ],
  requirements: [
    "Portofolio produk digital yang sudah rilis.",
    "Terbiasa bekerja dengan engineer dan product manager.",
    "Nilai tambah: pemahaman data analitik produk.",
  ],
  similar: [jobs[2], jobs[4]],
};
