import { ButtonLink } from "@/components/ui/button/button";
import { Avatar, PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

type Interview = {
  time: string;
  day: string;
  name: string;
  initials: string;
  color: string;
  role: string;
  channel: string;
  status: "Terkonfirmasi" | "Menunggu";
};

const INTERVIEWS: Interview[] = [
  {
    time: "10.00",
    day: "Hari ini",
    name: "Fajar Nugroho",
    initials: "FN",
    color: "#4338ca",
    role: "Senior Product Designer",
    channel: "Zoom",
    status: "Terkonfirmasi",
  },
  {
    time: "14.00",
    day: "Hari ini",
    name: "Maya Kusuma",
    initials: "MK",
    color: "#b45309",
    role: "Senior Product Designer",
    channel: "Google Meet",
    status: "Terkonfirmasi",
  },
  {
    time: "09.30",
    day: "Kamis, 15 Okt",
    name: "Yoga Pranata",
    initials: "YP",
    color: "#be185d",
    role: "UX Researcher",
    channel: "Zoom",
    status: "Menunggu",
  },
  {
    time: "13.00",
    day: "Jumat, 16 Okt",
    name: "Citra Lestari",
    initials: "CL",
    color: "#15803d",
    role: "Product Designer",
    channel: "Google Meet",
    status: "Terkonfirmasi",
  },
  {
    time: "11.00",
    day: "Senin, 19 Okt",
    name: "Hendra Saputra",
    initials: "HS",
    color: "#1d4ed8",
    role: "Frontend Engineer",
    channel: "Zoom",
    status: "Menunggu",
  },
];

export function WawancaraPage() {
  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Wawancara"
        subtitle="5 wawancara mendatang, 2 di antaranya hari ini."
        action={
          <ButtonLink href="/perekrut/pelamar" className={styles.headerCta}>
            Jadwalkan wawancara
          </ButtonLink>
        }
      />

      <section className={`${styles.card} ${styles.queueCard}`}>
        <h2 className={styles.cardTitle}>Jadwal mendatang</h2>
        <p className={styles.cardSub}>Semua wawancara dalam 7 hari ke depan.</p>

        {INTERVIEWS.map((interview) => (
          <div key={`${interview.day}-${interview.time}`} className={styles.queueRow}>
            <span className={styles.timeTag}>{interview.time}</span>
            <Avatar initials={interview.initials} color={interview.color} />
            <div className={styles.candidateText}>
              <p className={styles.candidateName}>{interview.name}</p>
              <p className={`${styles.candidateMeta} ${styles.interviewDetail}`}>
                {interview.role} · {interview.channel}
              </p>
            </div>
            <span className={styles.queueSpacer} />
            <span className={styles.interviewMeta}>
              <span className={styles.timeNote}>{interview.day}</span>
              <span
                className={`${styles.tag} ${
                  interview.status === "Terkonfirmasi"
                    ? styles.tagMint
                    : styles.tagMuted
                }`}
              >
                {interview.status}
              </span>
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
