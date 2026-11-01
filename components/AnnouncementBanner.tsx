import Link from "next/link";
import Container from "@/components/ui/Container";
import { getAnnouncements } from "@/lib/announcements";
import { getSessionUser } from "@/lib/session";

// The strip under the menu that shows the newest announcement on every page (logged-in users only).
export default async function AnnouncementBanner() {
  const user = await getSessionUser();
  if (!user) return null;

  const items = await getAnnouncements();
  if (items.length === 0) return null;
  const latest = items[0];
  const preview = latest.body.length > 110 ? `${latest.body.slice(0, 110).trimEnd()}…` : latest.body;

  return (
    <section aria-label="Latest announcement" className="border-b border-accent-500 bg-accent-500/20">
      <Container className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:gap-4">
        <p className="min-w-0 flex-1 text-sm text-brand-900">
          <span aria-hidden="true">📢 </span>
          <strong className="font-semibold">{latest.title}</strong>
          <span> · {preview}</span>
        </p>
        <Link href="/announcements" className="shrink-0 text-sm font-semibold text-brand-500 underline underline-offset-2 hover:text-brand-600">
          {items.length > 1 ? "See all announcements" : "Read more"}
        </Link>
      </Container>
    </section>
  );
}
