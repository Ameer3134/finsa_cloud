import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import CgpaCalculator from "./CgpaCalculator";
import { getCgpa } from "@/lib/cgpa";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "CGPA Calculator" };

export default async function CgpaPage() {
  const user = await requireUser("/cgpa");
  const saved = await getCgpa(user.uid); // this person's saved entries, if any
  return (
    <>
      <PageHeader title="CGPA Calculator" subtitle="Work out your semester GPA and see how it changes your CGPA." />
      <CgpaCalculator initial={saved} />
    </>
  );
}