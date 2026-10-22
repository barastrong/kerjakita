import type { Metadata } from "next";
import { CompaniesPage } from "@/components/pages/companies/companies-page";

export const metadata: Metadata = {
  title: "Perusahaan | Kerjakita",
  description:
    "Baca rating karyawan, lihat gaji, dan cek lowongan yang sedang dibuka.",
};

export default function Page() {
  return <CompaniesPage />;
}
