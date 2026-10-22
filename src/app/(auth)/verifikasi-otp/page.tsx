import type { Metadata } from "next";
import {
  AuthShell,
  SecurityNote,
} from "@/components/pages/auth/auth-shell";
import { OtpForm } from "@/components/pages/auth/auth-forms";

export const metadata: Metadata = {
  title: "Verifikasi OTP — Kerjakita",
};

export default function Page() {
  return (
    <AuthShell
      title="Satu langkah lagi."
      description="Kami perlu memastikan email ini benar-benar milikmu sebelum akun aktif."
      extra={
        <SecurityNote>
          Kode hanya berlaku 10 menit dan tidak boleh dibagikan ke siapa pun,
          termasuk tim Kerjakita.
        </SecurityNote>
      }
    >
      <OtpForm />
    </AuthShell>
  );
}
