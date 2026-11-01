import Link from "next/link";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getAnnouncements } from "@/lib/announcements";
import type { SessionUser } from "@/lib/session";
import { quickLinks } from "@/lib/site";
import { formatDate } from "@/lib/utils";

// The home page logged-in users see: a greeting by name, latest announcements and quick links.
export default async function Dashboard({ user }: { user: SessionUser }) {
  const latest = (await getAnnouncements()).slice(0, 3);

  return (
    <>
      {/* Greeting */}
      <section className="bg-brand-900 text-white">
        <Container className="animate-fade-up py-12 sm:py-16">
          {/* <p className="text-sm font-semibold text-accent-500 mb-4 mt-0">Student Dashboard</p> */}

          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Welcome back,  <span className="text-accent-500">{user.name}</span></h1>

          <p className="mt-3 flex flex-wrap items-center gap-5 text-brand-100">
            <span className="rounded-full bg-accent-500 px-3 py-0.5 text-xs font-semibold text-brand-900">{user.isAdmin ? "Admin" : "Student"}</span>
            {/* <span>{user.email}</span> */}
          </p>
          {user.isAdmin && (
            <ButtonLink href="/admin" variant="accent" className="mt-6">
              Post an announcement
            </ButtonLink>
          )}
        </Container>
      </section>

      {/* Latest announcements */}
      <section className="pt-12">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold text-brand-900">Latest announcements</h2>
            <Link href="/announcements" className="text-sm font-semibold text-brand-500 underline underline-offset-2 hover:text-brand-600">
              See all
            </Link>
          </div>
          {latest.length === 0 ? (
            <Card className="mt-5 text-slate-600">No announcements yet. Check back soon.</Card>
          ) : (
            <ul className="mt-5 grid gap-4 md:grid-cols-3">
              {latest.map((a) => (
                <li key={a.id}>
                  <Card className="h-full">
                    <p className="text-xs text-slate-600">
                      {a.pinned && <span className="mr-2 rounded-full bg-accent-500 px-2 py-0.5 font-semibold text-brand-900">Pinned</span>}
                      {formatDate(a.createdAt)}
                    </p>
                    <h3 className="mt-2 font-display text-base font-semibold text-brand-900">{a.title}</h3>
                    <p className="mt-1 line-clamp-3 text-sm text-slate-600">{a.body}</p>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Quick links */}
      <section className="pt-12">
        <Container>
          <h2 className="font-display text-2xl font-bold text-brand-900">Quick links</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="group block h-full rounded-2xl border border-brand-100 bg-white p-6 transition-colors hover:border-brand-400">
                  <span className="text-3xl" aria-hidden="true">{c.icon}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-brand-900">{c.label}</h3>
                  <p className="mt-1 text-sm text-slate-600">{c.text}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-brand-500 group-hover:text-brand-600">Open </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
