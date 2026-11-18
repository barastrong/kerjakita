import type { Metadata } from "next";
import {
  AuthShell,
  BenefitList,
} from "@/components/pages/auth/auth-shell";
import { CompanyRegisterForm } from "@/components/pages/auth/auth-forms";

export const metadata: Metadata = {
  title: "Daftar Perusahaan — Kerjakita",
};

export default function Page() {
  return (
    <AuthShell
      title="Buka lowongan untuk perusahaanmu."
      description="Daftarkan perusahaan, jadi Admin, lalu undang tim perekrut dengan peran masing-masing."
      extra={
        <BenefitList
          items={[
            "Kelola lowongan dan pelamar",
            "Atur peran Admin, Perekrut, dan Pewawancara",
            "Profil perusahaan tampil untuk kandidat",
          ]}
        />
      }
    >
      <CompanyRegisterForm />
    </AuthShell>
  );
}
