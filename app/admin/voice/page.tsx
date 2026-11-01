import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import VoiceItemButtons from "./VoiceItemButtons";
import { listVoiceMessages } from "@/lib/voice";
import { requireUser } from "@/lib/session";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Student Voice inbox", robots: { index: false } };

export default async function VoiceInboxPage() {
  const user = await requireUser("/admin/voice");
  
  // Logged in but not an admin: show a normal "page not found", so students can't tell this page exists.
  if (!user.isAdmin) notFound();

  const messages = await listVoiceMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <>
      <PageHeader
        title="Student Voice inbox"
        subtitle={`${messages.length} message${messages.length === 1 ? "" : "s"}, ${unread} unread.`}
      />
      <Container className="py-10">
        <ButtonLink href="/admin" variant="outline">← Back to admin</ButtonLink>

        {messages.length === 0 ? (
          <Card className="mt-6 text-slate-600">No messages yet. When students use Student Voice, they will show here.</Card>
        ) : (
          <ul className="mt-6 space-y-4">
            {messages.map((m) => (
              <li key={m.id} className={`rounded-2xl border bg-white p-5 ${m.read ? "border-brand-100" : "border-brand-400"}`}>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                  {!m.read && <span className="rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-semibold text-brand-900">New</span>}
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-500">{m.category}</span>
                  <time dateTime={m.createdAt}>{formatDate(m.createdAt)}</time>
                </div>
                <p className="mt-2 text-sm font-medium text-brand-900">
                  {m.anonymous ? "Anonymous" : (
                    <>
                      {m.name} · <a href={`mailto:${m.email}`} className="text-brand-500 underline">{m.email}</a>
                    </>
                  )}
                </p>
                <p className="mt-2 whitespace-pre-line text-slate-700">{m.message}</p>
                <VoiceItemButtons id={m.id} read={m.read} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}