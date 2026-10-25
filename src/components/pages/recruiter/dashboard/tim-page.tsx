import { Avatar, PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

type Member = {
  name: string;
  initials: string;
  color: string;
  email: string;
  role: string;
  status: "Aktif" | "Menunggu undangan";
};

const MEMBERS: Member[] = [
  {
    name: "Rani Ayu P.",
    initials: "RA",
    color: "#3d3bf3",
    email: "rani@tokoloka.id",
    role: "Admin",
    status: "Aktif",
  },
  {
    name: "Aditya Pratama",
    initials: "AP",
    color: "#0b7a62",
    email: "aditya@tokoloka.id",
    role: "Perekrut",
    status: "Aktif",
  },
  {
    name: "Nadia Putri",
    initials: "NP",
    color: "#7c3aed",
    email: "nadia@tokoloka.id",
    role: "Hiring manager",
    status: "Aktif",
  },
  {
    name: "Rizky Hidayat",
    initials: "RH",
    color: "#c2410c",
    email: "rizky@tokoloka.id",
    role: "Pewawancara",
    status: "Menunggu undangan",
  },
];

export function TimPage() {
  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Tim"
        subtitle="4 anggota dengan akses ke portal perekrut."
      />

      <section className={`${styles.card} ${styles.queueCard}`}>
        <h2 className={styles.cardTitle}>Anggota tim</h2>
        <p className={styles.cardSub}>
          Kelola siapa yang bisa melihat pelamar dan wawancara.
        </p>

        {MEMBERS.map((member) => (
          <div key={member.email} className={styles.queueRow}>
            <Avatar initials={member.initials} color={member.color} />
            <div className={styles.candidateText}>
              <p className={styles.candidateName}>{member.name}</p>
              <p className={styles.candidateMeta}>{member.email}</p>
            </div>
            <span className={styles.queueSpacer} />
            <span className={styles.memberMeta}>
              <span className={`${styles.tag} ${styles.tagMuted}`}>
                {member.role}
              </span>
              <span
                className={`${styles.tag} ${
                  member.status === "Aktif" ? styles.tagMint : styles.tagMuted
                }`}
              >
                {member.status}
              </span>
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
