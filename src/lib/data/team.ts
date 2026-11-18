export type RecruiterRole =
  | "Admin"
  | "Hiring manager"
  | "Perekrut"
  | "Pewawancara";

export const RECRUITER_ROLES: RecruiterRole[] = [
  "Admin",
  "Hiring manager",
  "Perekrut",
  "Pewawancara",
];

export type RecruiterPermission =
  | "pasang-lowongan"
  | "tinjau-pelamar"
  | "putuskan-pelamar"
  | "jadwalkan-wawancara"
  | "catatan-nilai"
  | "ubah-profil"
  | "kelola-tim";

const ROLE_ACCESS: Record<RecruiterPermission, RecruiterRole[]> = {
  "pasang-lowongan": ["Admin", "Hiring manager", "Perekrut"],
  "tinjau-pelamar": RECRUITER_ROLES,
  "putuskan-pelamar": ["Admin", "Hiring manager", "Perekrut"],
  "jadwalkan-wawancara": ["Admin", "Hiring manager", "Perekrut"],
  "catatan-nilai": RECRUITER_ROLES,
  "ubah-profil": ["Admin"],
  "kelola-tim": ["Admin"],
};

export function can(role: RecruiterRole, permission: RecruiterPermission) {
  return ROLE_ACCESS[permission].includes(role);
}

export const RECRUITER_PERMISSIONS: {
  label: string;
  permission: RecruiterPermission;
}[] = [
  { label: "Pasang dan ubah lowongan", permission: "pasang-lowongan" },
  { label: "Tinjau pelamar", permission: "tinjau-pelamar" },
  { label: "Setujui atau tolak pelamar", permission: "putuskan-pelamar" },
  { label: "Jadwalkan wawancara", permission: "jadwalkan-wawancara" },
  { label: "Beri catatan dan nilai", permission: "catatan-nilai" },
  { label: "Ubah profil perusahaan", permission: "ubah-profil" },
  { label: "Kelola anggota tim", permission: "kelola-tim" },
];

const PAGE_PERMISSION: Record<string, RecruiterPermission> = {
  "/perekrut/pasang-lowongan": "pasang-lowongan",
  "/perekrut/profil-perusahaan": "ubah-profil",
  "/perekrut/tim": "kelola-tim",
};

export function canAccessRecruiterPage(role: RecruiterRole, pathname: string) {
  const permission = PAGE_PERMISSION[pathname];
  return !permission || can(role, permission);
}

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  title: string;
  initials: string;
  color: string;
  role: RecruiterRole;
  jobs: string;
  lastActive: string;
};

export const RECRUITER_TEAM: TeamMember[] = [
  {
    id: "rina",
    name: "Rina Kusuma",
    email: "rina@tokoloka.id",
    title: "HR Manager",
    initials: "RK",
    color: "#7c3aed",
    role: "Admin",
    jobs: "Semua lowongan",
    lastActive: "Hari ini",
  },
  {
    id: "dina",
    name: "Dina Prameswari",
    email: "dina@tokoloka.id",
    title: "Head of Design",
    initials: "DP",
    color: "#3d3bf3",
    role: "Hiring manager",
    jobs: "Desain (4)",
    lastActive: "Hari ini",
  },
  {
    id: "raka",
    name: "Raka Aditya",
    email: "raka@tokoloka.id",
    title: "Engineering Manager",
    initials: "RA",
    color: "#0b7a62",
    role: "Hiring manager",
    jobs: "Engineering (2)",
    lastActive: "Kemarin",
  },
  {
    id: "salma",
    name: "Salma Putri",
    email: "salma@tokoloka.id",
    title: "Recruiter",
    initials: "SP",
    color: "#c2410c",
    role: "Perekrut",
    jobs: "Semua lowongan",
    lastActive: "2 hari lalu",
  },
  {
    id: "bima",
    name: "Bima Santoso",
    email: "bima@tokoloka.id",
    title: "Product Lead",
    initials: "BS",
    color: "#334155",
    role: "Pewawancara",
    jobs: "Product (1)",
    lastActive: "5 hari lalu",
  },
];

export function recruiterMemberForSession(session: string | null | undefined) {
  const email = session?.trim().toLowerCase();
  if (!email) return null;
  return RECRUITER_TEAM.find((member) => member.email === email) ?? null;
}
