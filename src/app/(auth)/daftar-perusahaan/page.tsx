import type { Metadata } from "next";
import {
  readCompanyDraft,
  readRegisteredCompany,
} from "@/lib/data/company-cookie";
import { CompanyDataForm } from "@/components/pages/auth/company-flow-forms";
import {
  CheckList,
  CompanyFlowShell,
  FlowHeading,
  SideCard,
} from "@/components/pages/auth/company-flow-shell";

export const metadata: Metadata = {
  title: "Daftar Perusahaan — Kerjakita",
  description:
    "Ajukan akun perusahaan Kerjakita untuk memasang lowongan dan mengelola pelamar.",
};

export default async function DaftarPerusahaanPage() {
  const draft =
    (await readCompanyDraft()) ?? (await readRegisteredCompany());

  return (
    <CompanyFlowShell
      step={1}
      aside={
        <>
          <SideCard title="Kenapa perlu diverifikasi?">
            <CheckList
              items={[
                "Melindungi pelamar dari lowongan palsu.",
                "Perusahaanmu mendapat lencana Terverifikasi.",
                "Lowongan terbit lebih cepat dan lebih dipercaya.",
              ]}
            />
          </SideCard>
          <SideCard title="Siapkan dokumen ini">
            <CheckList
              icon="file"
              items={[
                "NIB (Nomor Induk Berusaha)",
                "NPWP perusahaan",
                "Akta pendirian perusahaan",
                "Surat kuasa, jika kamu bukan direksi atau pendiri",
              ]}
            />
          </SideCard>
        </>
      }
    >
      <FlowHeading
        title="Daftarkan perusahaanmu"
        description="Ajukan akun perusahaan untuk memasang lowongan dan mengelola pelamar. Tim Kerjakita memverifikasi dalam 1 – 3 hari kerja."
      />
      <CompanyDataForm draft={draft} />
    </CompanyFlowShell>
  );
}
