import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import MaterialsTabs from "./MaterialsTabs";
import { levels } from "@/lib/content";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Study Materials" };

export default async function MaterialsPage() {
  await requireUser("/materials"); // not logged in? go to login
  return (
    <>
      <PageHeader title="Study" span="Materials" subtitle="Select your level to open the resources folder on Google Drive." />
      <MaterialsTabs levels={levels} />
    </>
  );
}
