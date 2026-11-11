import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetail } from "@/components/pages/courses/course-detail";
import { courseDetails, getCourse } from "@/lib/data/courses";

export const instant = false;

export function generateStaticParams() {
  return courseDetails.map((course) => ({ slug: course.slug }));
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
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
