export type Draft = {
  name: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  portfolio: string;
  salary: string;
  start: string;
  coverLetter: string;
  experience: string;
  hybrid: string;
  project: string;
};

export const INITIAL_DRAFT: Draft = {
  name: "Rani Ayu Pratama",
  email: "rani.ayu@email.com",
  phone: "0812 3456 7890",
  city: "Surabaya",
  linkedin: "",
  portfolio: "behance.net/rani-desain",
  salary: "Rp 20.000.000",
  start: "1 Desember 2026",
  coverLetter: "",
  experience: "3 – 5 tahun",
  hybrid: "Ya, bersedia",
  project:
    "Saya memimpin migrasi design system untuk 120 gerai Kopi Sinar. Hasilnya waktu rilis fitur turun dari 3 minggu menjadi 1 minggu karena komponen dipakai ulang oleh tim engineering.",
};

export const EXPERIENCE_OPTIONS = [
  "Kurang dari 1 tahun",
  "1 – 3 tahun",
  "3 – 5 tahun",
  "Lebih dari 5 tahun",
];

export const HYBRID_OPTIONS = ["Ya, bersedia", "Tidak, saya hanya bisa remote"];
