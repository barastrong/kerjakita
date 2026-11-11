import type { Metadata } from "next";
import { CourseList } from "@/components/pages/courses/course-list";

export const metadata: Metadata = {
  title: "Kursus | Kerjakita",
  description:
    "Kursus singkat dan jalur belajar dari keahlian yang diminta lowongan Product Designer.",
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
