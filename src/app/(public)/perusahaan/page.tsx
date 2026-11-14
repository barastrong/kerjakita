import type { Metadata } from "next";
import { CompaniesPage } from "@/components/pages/companies/companies-page";

export const metadata: Metadata = {
  title: "Perusahaan | Kerjakita",
  description:
    "Baca rating karyawan, lihat gaji, dan cek lowongan yang sedang dibuka.",
};

export const instant = false;

type Props = {
  searchParams: Promise<{
    q?: string;
    industri?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return <CompaniesPage query={params.q} industry={params.industri} />;
}
