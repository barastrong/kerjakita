import type { Metadata } from "next";
import Link from "next/link";
import { courseCatalog } from "@/lib/data/courses";
import { PageHeading, Avatar } from "@/components/pages/recruiter/dashboard/dashboard-parts";
import {
  Chip,
  DataTable,
  Panel,
} from "@/components/pages/admin/admin-parts";
import dashboard from "@/components/pages/recruiter/dashboard/dashboard.module.css";
import styles from "@/components/pages/admin/admin.module.css";

export const metadata: Metadata = { title: "Kursus" };

export default function Page() {
  return (
    <div className={dashboard.mainInner}>
      <PageHeading
        title="Kursus"
        subtitle={`${courseCatalog.length} kursus di katalog publik.`}
      />

      <Panel
        title="Katalog kursus"
        note="Harga dan level mengikuti data katalog."
      >
        <DataTable
          caption="Daftar kursus di katalog"
          head={
            <>
              <th scope="col">Kursus</th>
              <th scope="col">Penyedia</th>
              <th scope="col">Durasi</th>
              <th scope="col">Level</th>
              <th scope="col">Rating</th>
              <th scope="col">Harga</th>
              <th scope="col">Halaman</th>
            </>
          }
        >
          {courseCatalog.map((course) => (
            <tr key={course.slug}>
              <td data-label="Kursus">
                <span className={styles.cellStack}>
                  <span className={styles.cellTitle}>
                    <Avatar
                      initials={course.initials}
                      color={course.color}
                      size="sm"
                    />{" "}
                    {course.title}
                  </span>
                </span>
              </td>
              <td data-label="Penyedia">{course.provider}</td>
              <td data-label="Durasi" className={styles.cellMuted}>
                {course.duration}
              </td>
              <td data-label="Level">
                <Chip tone="neutral">{course.level}</Chip>
              </td>
              <td data-label="Rating">{course.rating}</td>
              <td data-label="Harga">{course.price}</td>
              <td data-label="Halaman">
                <div className={styles.actions}>
                  <Link
                    href={`/kursus/${course.slug}`}
                    className={styles.action}
                  >
                    Lihat kursus
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}
