import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyMedia } from "@/components/pages/company/company-media";
import { CompanySection } from "@/components/pages/company/company-section";
import { getCompany } from "@/lib/data/companies";
import { companyDirectory } from "@/lib/data/company-directory";

export const instant = false;

const SECTION_TITLES = {
  ulasan: "Ulasan & rating",
  gaji: "Gaji",
  lowongan: "Lowongan",
  "foto-video": "Foto & video",
} as const;

type SectionId = keyof typeof SECTION_TITLES;

const SECTIONS = Object.keys(SECTION_TITLES) as SectionId[];

function isSection(value: string): value is SectionId {
  return Object.hasOwn(SECTION_TITLES, value);
}

export function generateStaticParams() {
  return companyDirectory.flatMap(({ slug }) =>
    SECTIONS.map((section) => ({ slug, section })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}): Promise<Metadata> {
  const { slug, section } = await params;
  const company = getCompany(slug);

  if (!company || !isSection(section)) {
    return { title: "Halaman tidak ditemukan" };
  }

  const description =
    section === "ulasan"
      ? `Rating dan ulasan karyawan ${company.name}.`
      : section === "gaji"
        ? `Kisaran gaji per posisi di ${company.name}.`
        : section === "lowongan"
          ? `Lowongan terbuka di ${company.name}.`
          : `Video budaya kerja, foto kantor, dan identitas visual ${company.name}.`;

  return {
    title: `${SECTION_TITLES[section]} - ${company.name}`,
    description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; section: string }>;
}) {
  const { slug, section } = await params;
  const company = getCompany(slug);

  if (!company || !isSection(section)) {
    notFound();
  }

  if (section === "foto-video") {
    return <CompanyMedia company={company} />;
  }

  return <CompanySection company={company} section={section} />;
}
