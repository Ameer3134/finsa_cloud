import Link from "next/link";
import Container from "@/components/ui/Container";
import ImageSlot from "@/components/ui/ImageSlot";
import { getSessionUser } from "@/lib/session";
import { images } from "@/lib/images";
import { quickLinks, site, socials } from "@/lib/site";

export default async function Footer() {
  const user = await getSessionUser();

  return (
    <footer className="mt-20 bg-brand-900 text-brand-100">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div className="flex items-start gap-4">
          <ImageSlot src={images.footerLogo} alt="Ascendant Administration logo" label="Logo" compact className="h-14 w-14 shrink-0 rounded-lg" />
          <p className="max-w-xs text-sm leading-relaxed">{site.inspiredBy}</p>
        </div>

        {/* Quick links only show once logged in */}
        {user && (
          <div>
            <h2 className="font-display text-base font-semibold text-white">Quick links</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent-500">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={user ? "" : "md:col-span-2"}>
          <h2 className="font-display text-base font-semibold text-white">Contact address</h2>
          <p className="mt-3 text-sm leading-relaxed">{site.address}</p>
          <p className="mt-2 text-sm">
            Gmail: <a href={`mailto:${site.email}`} className="underline hover:text-accent-500">{site.email}</a>
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-brand-400 px-3 py-1.5 text-xs font-medium hover:border-accent-500 hover:text-accent-500">
                  {s.label}
                </a>                      
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-brand-600 py-5 text-center text-xs">© {new Date().getFullYear()} FINSA, University of Ilorin. All rights reserved.</div>
    </footer>
  );
}
