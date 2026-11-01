import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import AnnouncementCard from "@/components/AnnouncementCard";
import { getAnnouncements } from "@/lib/announcements";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Announcements" };

export default async function AnnouncementsPage() {
  await requireUser("/announcements");
  const items = await getAnnouncements();

  return (
    <>
      <PageHeader title="Announcements" subtitle="The latest news and notices from the FINSA executives." />
      <Container className="py-10">
        {items.length === 0 ? (
          <Card className="text-slate-600">No announcements yet. Check back soon.</Card>
        ) : (
          <ul className="mx-auto max-w-3xl space-y-6">
            {items.map((a) => (
              <li key={a.id}>
                <AnnouncementCard item={a} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
