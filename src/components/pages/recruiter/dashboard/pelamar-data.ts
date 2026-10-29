export type Candidate = {
  slug: string;
  name: string;
  fullName: string;
  initials: string;
  color: string;
  role: string;
  years: string;
  location: string;
  match: number;
  time: string;
};

export type CandidateColumn = {
  title: string;
  total: number;
  candidates: Candidate[];
};

export const COLUMNS: CandidateColumn[] = [
  {
    title: "Baru",
    total: 12,
    candidates: [
      {
        slug: "rani-ayu",
        name: "Rani Ayu P.",
        fullName: "Rani Ayu Pratama",
        initials: "RA",
        color: "#3d3bf3",
        role: "Product Designer",
        years: "4 tahun",
        location: "Surabaya",
        match: 92,
        time: "Hari ini",
      },
      {
        slug: "dimas-pratama",
        name: "Dimas Pratama",
        fullName: "Dimas Pratama",
        initials: "DP",
        color: "#0b7a62",
        role: "Senior Product Designer",
        years: "6 tahun",
        location: "Jakarta",
        match: 89,
        time: "Hari ini",
      },
      {
        slug: "salsa-nuraini",
        name: "Salsa Nuraini",
        fullName: "Salsa Nuraini",
        initials: "SN",
        color: "#7c3aed",
        role: "Product Designer",
        years: "5 tahun",
        location: "Remote",
        match: 85,
        time: "Kemarin",
      },
    ],
  },
  {
    title: "Ditinjau",
    total: 8,
    candidates: [
      {
        slug: "bagas-wicaksono",
        name: "Bagas Wicaksono",
        fullName: "Bagas Wicaksono",
        initials: "BW",
        color: "#c2410c",
        role: "UX Researcher",
        years: "3 tahun",
        location: "Bandung",
        match: 81,
        time: "2 hari lalu",
      },
      {
        slug: "intan-maharani",
        name: "Intan Maharani",
        fullName: "Intan Maharani",
        initials: "IM",
        color: "#0f766e",
        role: "Product Designer",
        years: "4 tahun",
        location: "Jakarta",
        match: 79,
        time: "3 hari lalu",
      },
    ],
  },
  {
    title: "Wawancara",
    total: 5,
    candidates: [
      {
        slug: "fajar-nugroho",
        name: "Fajar Nugroho",
        fullName: "Fajar Nugroho",
        initials: "FN",
        color: "#4338ca",
        role: "Senior Product Designer",
        years: "5 tahun",
        location: "Jakarta",
        match: 88,
        time: "Hari ini 10.00",
      },
      {
        slug: "maya-kusuma",
        name: "Maya Kusuma",
        fullName: "Maya Kusuma",
        initials: "MK",
        color: "#b45309",
        role: "Senior Product Designer",
        years: "4 tahun",
        location: "Remote",
        match: 87,
        time: "Hari ini 14.00",
      },
      {
        slug: "yoga-pranata",
        name: "Yoga Pranata",
        fullName: "Yoga Pranata",
        initials: "YP",
        color: "#be185d",
        role: "UX Researcher",
        years: "6 tahun",
        location: "Surabaya",
        match: 84,
        time: "Kamis 15 Okt",
      },
    ],
  },
  {
    title: "Penawaran",
    total: 2,
    candidates: [
      {
        slug: "citra-lestari",
        name: "Citra Lestari",
        fullName: "Citra Lestari",
        initials: "CL",
        color: "#15803d",
        role: "Product Designer",
        years: "7 tahun",
        location: "Jakarta",
        match: 94,
        time: "Penawaran dikirim",
      },
      {
        slug: "hendra-saputra",
        name: "Hendra Saputra",
        fullName: "Hendra Saputra",
        initials: "HS",
        color: "#1d4ed8",
        role: "Frontend Engineer",
        years: "5 tahun",
        location: "Remote",
        match: 90,
        time: "Menunggu jawaban",
      },
    ],
  },
  {
    title: "Ditolak",
    total: 14,
    candidates: [
      {
        slug: "tio-ardian",
        name: "Tio Ardian",
        fullName: "Tio Ardian",
        initials: "TA",
        color: "#334155",
        role: "Product Designer",
        years: "2 tahun",
        location: "Medan",
        match: 62,
        time: "Tidak sesuai",
      },
      {
        slug: "wulan-sari",
        name: "Wulan Sari",
        fullName: "Wulan Sari",
        initials: "WS",
        color: "#7c3aed",
        role: "UI Designer",
        years: "1 tahun",
        location: "Bali",
        match: 58,
        time: "Tidak sesuai",
      },
    ],
  },
];

const CANDIDATES = COLUMNS.flatMap((column) => column.candidates);

export function getCandidate(slug: string) {
  return CANDIDATES.find((candidate) => candidate.slug === slug) ?? CANDIDATES[0];
}

export function candidateHref(candidate: Candidate) {
  return `/perekrut/pelamar/${candidate.slug}`;
}
