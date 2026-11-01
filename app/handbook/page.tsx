import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import HandbookList from "./HandbookList";
import { handbookPdfUrl, handbookSections } from "@/lib/content";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Handbook" };

export default async function HandbookPage() {
  await requireUser("/handbook");
  return (
    <>
      <PageHeader title="Department Handbook" subtitle="Rules, guidelines and key information every Finance student should know." />
      <HandbookList sections={handbookSections} pdfUrl={handbookPdfUrl} />
    </>
  );
}
