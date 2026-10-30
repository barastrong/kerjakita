export type ApplicationTone = "muted" | "mint" | "yellow";
export type ApplicationGroup = "Aktif" | "Wawancara" | "Selesai";
export type TimelineState = "done" | "current" | "upcoming" | "stopped";

export type TimelineEvent = {
  label: string;
  date: string;
  state: TimelineState;
  note?: string;
};

export type Application = {
  id: string;
  initials: string;
  color: string;
  role: string;
  company: string;
  sent: string;
  sentFull: string;
  status: string;
  tone: ApplicationTone;
  group: ApplicationGroup;
  match: number;
  location: string;
  workType: string;
  salary: string;
  note: string;
  timeline: TimelineEvent[];
};

export const APPLICATIONS: Application[] = [
  {
    id: "tokoloka",
    initials: "TL",
    color: "#3d3bf3",
    role: "Senior Product Designer",
    company: "Tokoloka",
    sent: "Hari ini",
    sentFull: "30 Oktober 2026",
    status: "Terkirim",
    tone: "muted",
    group: "Aktif",
    match: 92,
    location: "Jakarta Selatan",
    workType: "Hybrid",
    salary: "Rp 18 - 24 jt",
    note: "Lamaranmu sedang ditinjau tim rekrutmen Tokoloka.",
    timeline: [
      { label: "Lamaran terkirim", date: "30 Oktober 2026", state: "done" },
      {
        label: "Ditinjau perekrut",
        date: "Sedang berlangsung",
        state: "current",
      },
      { label: "Wawancara", date: "Menunggu jadwal", state: "upcoming" },
      { label: "Keputusan", date: "Menunggu", state: "upcoming" },
    ],
  },
  {
    id: "bayarpintar",
    initials: "BP",
    color: "#0b7a62",
    role: "Product Designer, Pembayaran",
    company: "Bayarpintar",
    sent: "11 Okt",
    sentFull: "11 Oktober 2026",
    status: "Terkirim",
    tone: "muted",
    group: "Aktif",
    match: 86,
    location: "Jakarta Pusat",
    workType: "Hybrid",
    salary: "Rp 16 - 22 jt",
    note: "Tim rekrutmen akan menghubungi dalam 5 hari kerja.",
    timeline: [
      { label: "Lamaran terkirim", date: "11 Oktober 2026", state: "done" },
      {
        label: "Ditinjau perekrut",
        date: "Sedang berlangsung",
        state: "current",
      },
      { label: "Wawancara", date: "Menunggu jadwal", state: "upcoming" },
      { label: "Keputusan", date: "Menunggu", state: "upcoming" },
    ],
  },
  {
    id: "kopi-sinar",
    initials: "KS",
    color: "#b45309",
    role: "UI/UX Designer",
    company: "Kopi Sinar Digital",
    sent: "9 Okt",
    sentFull: "9 Oktober 2026",
    status: "Dilihat perekrut",
    tone: "mint",
    group: "Aktif",
    match: 81,
    location: "Bandung",
    workType: "On-site",
    salary: "Rp 10 - 14 jt",
    note: "Profilmu sudah dilihat. Tunggu kabar berikutnya dari tim Kopi Sinar.",
    timeline: [
      { label: "Lamaran terkirim", date: "9 Oktober 2026", state: "done" },
      { label: "Dilihat perekrut", date: "10 Oktober 2026", state: "done" },
      { label: "Wawancara", date: "Menunggu jadwal", state: "upcoming" },
      { label: "Keputusan", date: "Menunggu", state: "upcoming" },
    ],
  },
  {
    id: "nawasehat",
    initials: "NW",
    color: "#6d28d9",
    role: "Lead Designer",
    company: "Nawasehat",
    sent: "5 Okt",
    sentFull: "5 Oktober 2026",
    status: "Wawancara 15 Okt",
    tone: "yellow",
    group: "Wawancara",
    match: 74,
    location: "Jakarta Selatan",
    workType: "Hybrid",
    salary: "Rp 22 - 28 jt",
    note: "Wawancara via Zoom pada Kamis, 15 Oktober 2026 pukul 10.00 WIB.",
    timeline: [
      { label: "Lamaran terkirim", date: "5 Oktober 2026", state: "done" },
      { label: "Dilihat perekrut", date: "6 Oktober 2026", state: "done" },
      {
        label: "Wawancara",
        date: "15 Oktober 2026, 10.00 WIB",
        state: "current",
        note: "Via Zoom bersama Dina P., Head of Design.",
      },
      { label: "Keputusan", date: "Menunggu", state: "upcoming" },
    ],
  },
  {
    id: "garuda-retail",
    initials: "GR",
    color: "#1f2937",
    role: "Product Designer (Kontrak)",
    company: "Garuda Retail Tech",
    sent: "28 Sep",
    sentFull: "28 September 2026",
    status: "Tidak lanjut",
    tone: "muted",
    group: "Selesai",
    match: 71,
    location: "Tangerang",
    workType: "Kontrak - On-site",
    salary: "Rp 14 - 18 jt",
    note: "Posisi ini sudah ditutup. Terima kasih sudah melamar.",
    timeline: [
      { label: "Lamaran terkirim", date: "28 September 2026", state: "done" },
      { label: "Dilihat perekrut", date: "30 September 2026", state: "done" },
      {
        label: "Tidak dilanjutkan",
        date: "2 Oktober 2026",
        state: "stopped",
      },
    ],
  },
  {
    id: "dagangin",
    initials: "DG",
    color: "#0b7a62",
    role: "UX Designer",
    company: "Dagangin",
    sent: "20 Sep",
    sentFull: "20 September 2026",
    status: "Tidak lanjut",
    tone: "muted",
    group: "Selesai",
    match: 68,
    location: "Remote",
    workType: "Remote",
    salary: "Rp 12 - 16 jt",
    note: "Kami memilih kandidat dengan pengalaman riset yang lebih dalam.",
    timeline: [
      { label: "Lamaran terkirim", date: "20 September 2026", state: "done" },
      { label: "Dilihat perekrut", date: "22 September 2026", state: "done" },
      {
        label: "Tidak dilanjutkan",
        date: "26 September 2026",
        state: "stopped",
      },
    ],
  },
  {
    id: "pintarta",
    initials: "PT",
    color: "#6d28d9",
    role: "Design Researcher",
    company: "Pintarta",
    sent: "14 Sep",
    sentFull: "14 September 2026",
    status: "Ditarik",
    tone: "muted",
    group: "Selesai",
    match: 66,
    location: "Yogyakarta",
    workType: "Hybrid",
    salary: "Rp 13 - 17 jt",
    note: "Lamaran ditarik atas permintaanmu.",
    timeline: [
      { label: "Lamaran terkirim", date: "14 September 2026", state: "done" },
      { label: "Dilihat perekrut", date: "15 September 2026", state: "done" },
      { label: "Lamaran ditarik", date: "18 September 2026", state: "stopped" },
    ],
  },
];

export function getApplication(id: string) {
  return APPLICATIONS.find((application) => application.id === id);
}
