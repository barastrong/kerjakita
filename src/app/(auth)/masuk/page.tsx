import type { Metadata } from "next";
import {
  AuthShell,
  MatchCard,
} from "@/components/pages/auth/auth-shell";
import { LoginForm } from "@/components/pages/auth/auth-forms";

export const metadata: Metadata = {
  title: "Masuk — Kerjakita",
};

export default function Page() {
  return (
    <AuthShell
      title={
        <>
          <span>Lanjutkan pencarian</span>
          <span>kerjamu.</span>
        </>
      }
      description="Pantau lamaran, jadwal wawancara, dan rekomendasi lowongan di satu tempat."
      extra={<MatchCard />}
    >
      <LoginForm />
    </AuthShell>
  );
}
