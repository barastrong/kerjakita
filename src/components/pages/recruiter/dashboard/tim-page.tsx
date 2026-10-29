import { CheckIcon } from "@/components/ui/icons/icons";
import { Avatar, PageHeading } from "./dashboard-parts";
import styles from "./dashboard.module.css";

type Role = "Admin" | "Hiring manager" | "Perekrut" | "Pewawancara";

type Member = {
  name: string;
  title: string;
  initials: string;
  color: string;
  role: Role;
  jobs: string;
  lastActive: string;
};

const MEMBERS: Member[] = [
  {
    name: "Rina Kusuma",
    title: "HR Manager",
    initials: "RK",
    color: "#7c3aed",
    role: "Admin",
    jobs: "Semua lowongan",
    lastActive: "Hari ini",
  },
  {
    name: "Dina Prameswari",
    title: "Head of Design",
    initials: "DP",
    color: "#3d3bf3",
    role: "Hiring manager",
    jobs: "Desain (4)",
    lastActive: "Hari ini",
  },
  {
    name: "Raka Aditya",
    title: "Engineering Manager",
    initials: "RA",
    color: "#0b7a62",
    role: "Hiring manager",
    jobs: "Engineering (2)",
    lastActive: "Kemarin",
  },
  {
    name: "Salma Putri",
    title: "Recruiter",
    initials: "SP",
    color: "#c2410c",
    role: "Perekrut",
    jobs: "Semua lowongan",
    lastActive: "2 hari lalu",
  },
  {
    name: "Bima Santoso",
    title: "Product Lead",
    initials: "BS",
    color: "#334155",
    role: "Pewawancara",
    jobs: "Product (1)",
    lastActive: "5 hari lalu",
  },
];

const ROLE_CLASS: Record<Role, string> = {
  Admin: styles.roleAdmin,
  "Hiring manager": styles.roleManager,
  Perekrut: styles.roleRecruiter,
  Pewawancara: styles.roleInterviewer,
};

const PERMISSIONS = [
  { label: "Pasang dan ubah lowongan", admin: true, manager: true, recruiter: true, interviewer: false },
  { label: "Tinjau pelamar", admin: true, manager: true, recruiter: true, interviewer: true },
  { label: "Setujui atau tolak pelamar", admin: true, manager: true, recruiter: true, interviewer: false },
  { label: "Jadwalkan wawancara", admin: true, manager: true, recruiter: true, interviewer: false },
  { label: "Beri catatan dan nilai", admin: true, manager: true, recruiter: true, interviewer: true },
  { label: "Ubah profil perusahaan", admin: true, manager: false, recruiter: false, interviewer: false },
  { label: "Kelola anggota tim", admin: true, manager: false, recruiter: false, interviewer: false },
];

function PermissionMark({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <CheckIcon size={16} className={styles.permissionCheck} />
  ) : (
    <span className={styles.permissionDash}>–</span>
  );
}

export function TimPage() {
  return (
    <div className={styles.mainInner}>
      <PageHeading
        title="Tim perekrut"
        subtitle="5 anggota. Atur siapa yang boleh meninjau dan menyetujui pelamar."
      />

      <div className={`${styles.tableCard} ${styles.teamTableCard}`}>
        <div className={styles.tableScroll}>
          <table className={`${styles.table} ${styles.teamTable}`}>
            <thead>
              <tr>
                <th className={styles.colTeamMember}>Anggota</th>
                <th className={styles.colTeamRole}>Peran</th>
                <th className={styles.colTeamJobs}>Lowongan</th>
                <th className={styles.colTeamActive}>Terakhir aktif</th>
                <th className={styles.colTeamAction} aria-label="Tindakan" />
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((member) => (
                <tr key={member.name}>
                  <td>
                    <div className={styles.teamMemberCell}>
                      <Avatar initials={member.initials} color={member.color} />
                      <div className={styles.candidateText}>
                        <span className={styles.candidateName}>{member.name}</span>
                        <span className={styles.candidateMeta}>{member.title}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.tag} ${ROLE_CLASS[member.role]}`}>
                      {member.role}
                    </span>
                  </td>
                  <td>{member.jobs}</td>
                  <td>{member.lastActive}</td>
                  <td>
                    <button type="button" className={styles.manage}>
                      Ubah
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className={`${styles.card} ${styles.permissionsCard}`}>
        <h2 className={styles.cardTitle}>Hak akses per peran</h2>
        <p className={styles.permissionsLabel}>Hak akses</p>

        <div className={styles.tableScroll}>
          <table className={`${styles.table} ${styles.permissionsTable}`}>
            <thead>
              <tr>
                <th className={styles.permissionName} aria-label="Hak akses" />
                <th>Admin</th>
                <th>Hiring manager</th>
                <th>Perekrut</th>
                <th>Pewawancara</th>
              </tr>
            </thead>
            <tbody>
              {PERMISSIONS.map((permission) => (
                <tr key={permission.label}>
                  <td>{permission.label}</td>
                  <td>
                    <PermissionMark allowed={permission.admin} />
                  </td>
                  <td>
                    <PermissionMark allowed={permission.manager} />
                  </td>
                  <td>
                    <PermissionMark allowed={permission.recruiter} />
                  </td>
                  <td>
                    <PermissionMark allowed={permission.interviewer} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
