import { jobs } from "./jobs";

export type ApplicationStep = {
  label: string;
  status: "done" | "current" | "todo";
};

export type ApplicationJob = {
  slug: string;
  title: string;
  company: string;
  companySlug: string;
  initials: string;
  color: string;
  meta: string;
  salary: string;
  type: string;
  score: number;
  skills: { label: string; value: number; level: string; tone: "mint" | "amber" }[];
  documents: { id: string; name: string; meta: string }[];
  checklist: { label: string; done: boolean }[];
};

export const applicationSteps: ApplicationStep[] = [
  { label: "Data diri", status: "done" },
  { label: "CV & portofolio", status: "current" },
  { label: "Pertanyaan perusahaan", status: "todo" },
  { label: "Tinjau & kirim", status: "todo" },
];

const applications: Record<string, ApplicationJob> = {
  "senior-product-designer-tokoloka": {
    slug: "senior-product-designer-tokoloka",
    title: "Senior Product Designer",
    company: "Tokoloka",
    companySlug: "tokoloka",
    initials: "TL",
    color: "#3d3bf3",
    meta: "Tokoloka · Jakarta Selatan · Hybrid",
    salary: "Rp 18 – 25 jt",
    type: "Penuh waktu",
    score: 92,
    skills: [
      { label: "Figma", value: 100, level: "Ahli", tone: "mint" },
      { label: "Design system", value: 90, level: "Kuat", tone: "mint" },
      { label: "Data analitik", value: 35, level: "Kurang", tone: "amber" },
    ],
    documents: [
      {
        id: "cv-2026",
        name: "CV_Rani_2026.pdf",
        meta: "Diunggah 3 Okt 2026 · 214 KB",
      },
      {
        id: "cv-desain",
        name: "CV_Rani_Desain.pdf",
        meta: "Diunggah 12 Agu 2026 · 188 KB",
      },
    ],
    checklist: [
      { label: "CV terbaru dipilih", done: true },
      { label: "Portofolio tersambung", done: true },
      { label: "Ekspektasi gaji diisi", done: true },
      { label: "Jawab 3 pertanyaan perusahaan", done: false },
    ],
  },
};

export function getApplication(slug: string) {
  const application = applications[slug];
  if (application) return application;

  const job = jobs.find((item) => item.slug === slug);
  if (!job) return undefined;

  const template = applications["senior-product-designer-tokoloka"];

  return {
    ...template,
    slug: job.slug,
    title: job.title,
    company: job.company,
    companySlug: job.companySlug,
    initials: job.initials,
    color: job.color,
    meta: job.meta,
    salary: job.salaryShort,
    type: job.employmentType,
    score: job.match,
    skills: job.skills.map((label, index) => ({
      label,
      value: index === 0 ? 95 : 85,
      level: index === 0 ? "Ahli" : "Kuat",
      tone: "mint" as const,
    })),
  };
}
