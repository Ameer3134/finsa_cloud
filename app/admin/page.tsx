import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import AnnouncementForm from "./AnnouncementForm";
import DeleteButton from "./DeleteButton";
import { getAnnouncements } from "@/lib/announcements";
import { requireUser } from "@/lib/session";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default async function AdminPage() {
  const user = await requireUser("/admin");

   if (!user.isAdmin) notFound();

  const items = await getAnnouncements();

  return (
    <>
      <PageHeader title="Admin" subtitle="Post announcements. They appear at the top of every page and on the Announcements page." />
      <Container className="grid gap-8 py-10 lg:grid-cols-[420px_1fr]">
           <Container className="pt-8">
     <ButtonLink href="/admin/voice" variant="outline">Open the Student Voice inbox →</ButtonLink>
   </Container>
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-900">New announcement</h2>
          <AnnouncementForm />
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-brand-900">Posted announcements ({items.length})</h2>
          {items.length === 0 ? (
            <Card className="mt-4 text-slate-600">Nothing posted yet. Your first announcement will show here.</Card>
          ) : (
            <ul className="mt-4 space-y-3">
              {items.map((a) => (
                <li key={a.id} className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-4">
                  {a.imageUrl && (
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
                      <Image src={a.imageUrl} alt="" fill unoptimized sizes="96px" className="object-cover" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      {a.pinned && <span className="rounded-full bg-accent-500 px-2 py-0.5 font-semibold text-brand-900">Pinned</span>}
                      <time dateTime={a.createdAt}>{formatDate(a.createdAt)}</time>
                    </p>
                    <h3 className="mt-1 truncate font-display font-semibold text-brand-900">{a.title}</h3>
                    <p className="line-clamp-2 text-sm text-slate-600">{a.body}</p>
                  </div>
                  <DeleteButton id={a.id} title={a.title} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </>
  );
}
