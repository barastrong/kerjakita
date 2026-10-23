import type { Metadata } from "next";
import { CourseList } from "@/components/pages/courses/course-list";

export const metadata: Metadata = {
  title: "Kursus | Kerjakita",
  description:
    "Kursus singkat dan jalur belajar yang disesuaikan dengan lowongan yang kamu incar.",
};

export const instant = false;

type Props = {
  searchParams: Promise<{
    q?: string;
    level?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return <CourseList q={params.q} level={params.level} />;
}
