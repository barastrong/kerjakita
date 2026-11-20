import {
  COLUMNS,
  type Candidate,
} from "@/components/pages/recruiter/dashboard/pelamar-data";
import { companyDirectory } from "./company-directory";
import { courseCatalog } from "./courses";
import { jobs } from "./jobs";
import { PLATFORM_ADMIN_EMAIL } from "./company";
import { RECRUITER_TEAM } from "./team";

export type JobModeration = "active" | "pending" | "rejected";

export const DEFAULT_PENDING_JOB_SLUGS = [
  "product-designer-pembayaran-bayarpintar",
  "senior-ux-designer-dagangin",
];

export function jobModeration(
  slug: string,
  decisions: Record<string, "active" | "rejected">,
): JobModeration {
  const decision = decisions[slug];
  if (decision === "active" || decision === "rejected") return decision;
  return DEFAULT_PENDING_JOB_SLUGS.includes(slug) ? "pending" : "active";
}

export const JOB_STATUS_LABEL: Record<JobModeration, string> = {
  active: "Aktif",
  pending: "Menunggu tinjau",
  rejected: "Ditolak",
};

export type AdminReport = {
  id: string;
  jobSlug: string;
  reason: string;
  reporter: string;
  date: string;
};

export const ADMIN_REPORTS: AdminReport[] = [
  {
    id: "laporan-1",
    jobSlug: "senior-ux-designer-dagangin",
    reason: "Deskripsi lowongan meminta biaya pelatihan.",
    reporter: "Rani Ayu P.",
    date: "Hari ini",
  },
  {
    id: "laporan-2",
    jobSlug: "ui-ux-designer-kopi-sinar-digital",
    reason: "Alamat kantor tidak ditemukan saat dihubungi.",
    reporter: "Dimas Pratama",
    date: "Kemarin",
  },
  {
    id: "laporan-3",
    jobSlug: "product-designer-kontrak-garuda-retail-tech",
    reason: "Gaji di wawancara berbeda dari yang tertulis.",
    reporter: "Salsa Nuraini",
    date: "2 hari lalu",
  },
];

export type AdminCandidate = Candidate & { stage: string };

export const ADMIN_CANDIDATES: AdminCandidate[] = COLUMNS.flatMap((column) =>
  column.candidates.map((candidate) => ({ ...candidate, stage: column.title })),
);

export type AdminActivity = {
  id: string;
  text: string;
  note: string;
  href: string;
};

export const ADMIN_ACTIVITY: AdminActivity[] = [
  ...jobs.slice(0, 3).map((job) => ({
    id: `job-${job.slug}`,
    text: `${job.company} menayangkan ${job.title}`,
    note: job.posted,
    href: "/admin/lowongan",
  })),
  ...ADMIN_CANDIDATES.slice(0, 2).map((candidate) => ({
    id: `candidate-${candidate.slug}`,
    text: `${candidate.fullName} melamar ${candidate.role}`,
    note: candidate.time,
    href: "/admin/pengguna",
  })),
  ...RECRUITER_TEAM.slice(0, 2).map((member) => ({
    id: `team-${member.id}`,
    text: `${member.name} (${member.role}) aktif di portal perekrut`,
    note: member.lastActive,
    href: "/admin/perekrut",
  })),
];

export type AdminPlan = {
  name: string;
  price: string;
  limit: string;
  note: string;
};

export const ADMIN_PLANS: AdminPlan[] = [
  {
    name: "Gratis",
    price: "Rp 0",
    limit: "1 lowongan aktif",
    note: "Untuk mencoba portal perekrut.",
  },
  {
    name: "Pro",
    price: "Rp 499.000 / bulan",
    limit: "10 lowongan aktif",
    note: "Paket yang dipakai Tokoloka.",
  },
  {
    name: "Bisnis",
    price: "Rp 1.499.000 / bulan",
    limit: "Lowongan tanpa batas",
    note: "Untuk tim perekrut besar.",
  },
];

export type AdminInvoice = {
  id: string;
  company: string;
  plan: string;
  amount: string;
  date: string;
  status: "Lunas" | "Menunggu";
};

export const ADMIN_INVOICES: AdminInvoice[] = [
  { id: "INV-2026-081", company: "Tokoloka", plan: "Pro", amount: "Rp 499.000", date: "1 Nov 2026", status: "Lunas" },
  { id: "INV-2026-080", company: "Bayarpintar", plan: "Pro", amount: "Rp 499.000", date: "1 Nov 2026", status: "Lunas" },
  { id: "INV-2026-079", company: "Garuda Retail Tech", plan: "Bisnis", amount: "Rp 1.499.000", date: "1 Nov 2026", status: "Lunas" },
  { id: "INV-2026-078", company: "Nawasehat", plan: "Pro", amount: "Rp 499.000", date: "1 Okt 2026", status: "Lunas" },
  { id: "INV-2026-077", company: "Dagangin", plan: "Pro", amount: "Rp 499.000", date: "1 Okt 2026", status: "Menunggu" },
  { id: "INV-2026-076", company: "Pintarta", plan: "Pro", amount: "Rp 499.000", date: "1 Okt 2026", status: "Lunas" },
  { id: "INV-2026-075", company: "Kopi Sinar Digital", plan: "Gratis", amount: "Rp 0", date: "1 Sep 2026", status: "Lunas" },
  { id: "INV-2026-074", company: "Logistik Nusa", plan: "Bisnis", amount: "Rp 1.499.000", date: "1 Sep 2026", status: "Menunggu" },
];

export const ADMIN_USERS = [
  {
    name: "Admin platform",
    email: PLATFORM_ADMIN_EMAIL,
    role: "Pemilik",
    lastActive: "Sekarang",
  },
  {
    name: "Nadia Rahma",
    email: "nadia@kerjakita.id",
    role: "Moderator",
    lastActive: "Kemarin",
  },
];

export const ADMIN_FUNNEL = [
  { label: "Lowongan dilihat", value: 12480 },
  { label: "Disimpan", value: 1240 },
  { label: "Dilamar", value: 318 },
  { label: "Diwawancarai", value: 64 },
  { label: "Diterima", value: 12 },
];

export const ADMIN_COUNTS = {
  companies: companyDirectory.length,
  jobs: jobs.length,
  candidates: ADMIN_CANDIDATES.length,
  courses: courseCatalog.length,
};

function countBy<T>(items: T[], key: (item: T) => string) {
  const counts = new Map<string, number>();

  for (const item of items) {
    const label = key(item);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));
}

export const JOBS_BY_LOCATION = countBy(jobs, (job) => job.location);

export const JOBS_BY_SKILL = countBy(
  jobs.flatMap((job) => job.skills),
  (skill) => skill,
);

export const COMPANIES_BY_INDUSTRY = countBy(
  companyDirectory,
  (company) => company.industry,
);
