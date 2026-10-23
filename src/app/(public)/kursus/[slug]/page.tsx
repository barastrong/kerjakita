import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/pages/courses/course-detail";
import { getCourse } from "@/lib/data/courses";

export const instant = false;

export function generateStaticParams() {
  return [{ slug: "design-system-dari-nol" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return { title: "Kursus tidak ditemukan" };
  }

  return {
    title: course.title,
    description: course.summary,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getCourse(slug)) {
    notFound();
  }

  return <CourseDetail />;
}
