import type { Metadata } from "next";
import { RecruiterPage } from "@/components/pages/recruiter/recruiter-page";

export const metadata: Metadata = {
  title: "Untuk perekrut | Kerjakita",
  description:
    "Pasang lowongan, temukan kandidat yang cocok, dan jadwalkan wawancara dari satu dashboard.",
};

export default function PerekrutPage() {
  return <RecruiterPage />;
}
