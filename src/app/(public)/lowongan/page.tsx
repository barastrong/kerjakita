import type { Metadata } from "next";
import { SearchPage } from "@/components/pages/search/search-page";

export const metadata: Metadata = {
  title: "Cari lowongan | Kerjakita",
  description:
    "Temukan lowongan yang cocok dengan keahlian, lokasi, dan pengalamanmu.",
};

export const instant = false;

type Props = {
  searchParams: Promise<{
    q?: string;
    location?: string;
    tipe?: string;
    lokasi?: string;
    pengalaman?: string;
    kecamatan?: string;
    diperbarui?: string;
    perusahaan?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <SearchPage
      q={params.q}
      location={params.location}
      tipe={params.tipe}
      lokasi={params.lokasi}
      pengalaman={params.pengalaman}
      kecamatan={params.kecamatan}
      diperbarui={params.diperbarui}
      perusahaan={params.perusahaan}
    />
  );
}
