import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PeopleTabs from "./PeopleTabs";
import { leader, peopleGroups } from "@/lib/content";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "The Ascendants Administration" };

export default async function PeoplePage() {
  await requireUser("/people");
  return (
    <>
      <PageHeader title="The Ascendants Administration" subtitle={`Led by ${leader}.`} />
      <PeopleTabs groups={peopleGroups} />
    </>
  );
}
