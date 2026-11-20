import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  readCompanyDraft,
  readRegisteredCompany,
} from "@/lib/data/company-cookie";
import { CompanyDocumentsForm } from "@/components/pages/auth/company-flow-forms";
import {
  CheckList,
  CompanyFlowShell,
  FlowHeading,
  SideCard,
} from "@/components/pages/auth/company-flow-shell";

export const metadata: Metadata = {
  title: "Dokumen dan Penanggung Jawab — Kerjakita",
  description:
    "Unggah dokumen legalitas dan isi penanggung jawab akun perusahaan Kerjakita.",
};

export default async function DaftarPerusahaanDokumenPage() {
  const draft =
    (await readCompanyDraft()) ?? (await readRegisteredCompany());
  if (!draft) {
    redirect("/daftar-perusahaan");
  }

  const company = await readRegisteredCompany();

  return (
    <CompanyFlowShell
      step={2}
      aside={
        <>
          <SideCard title="Agar cepat disetujui">
            <CheckList
              items={[
                "Nama perusahaan harus sama di semua dokumen.",
                "Foto atau pindai dokumen dengan jelas, tanpa terpotong.",
                "Alamat di form sama dengan alamat di akta atau NIB.",
              ]}
            />
          </SideCard>
          <SideCard title="Setelah dikirim">
            <CheckList
              items={[
                "Admin meninjau dalam 1 – 3 hari kerja.",
                "Hasilnya dikirim ke email dan notifikasi.",
                "Jika perlu perbaikan, kamu bisa mengirim ulang.",
              ]}
            />
          </SideCard>
        </>
      }
    >
      <FlowHeading
        title="Dokumen dan penanggung jawab"
        description="Dokumen dipakai tim Kerjakita untuk memastikan perusahaanmu nyata dan kamu berwenang mengelola akunnya."
      />
      <CompanyDocumentsForm defaults={company} />
    </CompanyFlowShell>
  );
}
