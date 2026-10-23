import type { Metadata } from "next";
import { CoursePath } from "@/components/pages/courses/course-path";

export const metadata: Metadata = {
  title: "Jalur belajar Product Designer",
  description:
    "Urutan kursus untuk menjadi Product Designer, dari riset pengguna sampai portofolio.",
};

export default function Page() {
  return <CoursePath />;
}
