"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "@/components/ui/Container";
import Avatar from "@/components/ui/Avatar";
import ImageSlot from "@/components/ui/ImageSlot";
import { buttonClass } from "@/components/ui/Button";
import { images } from "@/lib/images";
import { nav, site } from "@/lib/site";
import { endSession } from "@/lib/session-client";

type NavUser = { name: string; isAdmin: boolean } | null;

export default function NavBar({ user }: { user: NavUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  async function logOut() {
    await endSession();
    window.location.assign("/"); // full reload so the page rechecks the login
  }

  const logo = (
    <Link href="/" className="flex shrink-0 items-center gap-3" onClick={close}>
      <ImageSlot src={images.logo} alt={`${site.name} logo`} label="Logo" compact className="h-10 w-30" />
    </Link>
  );

  // ----- Not logged in: only the logo, Log in and Sign up -----
  if (!user) {
    return (
      <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between gap-3">
          {logo}
          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-500 hover:bg-brand-50">
              Log in
            </Link>
            <Link href="/signup" className={buttonClass("primary", "px-4! py-2!")}>
              Sign up
            </Link>
          </div>
        </Container>
      </header>
    );
  }

  // ----- Logged in: full menu -----
    // Admins see the inbox in place of the student form tab.
  const menu = user.isAdmin
    ? nav.map((item) => (item.href === "/voice" ? { href: "/admin/voice", label: "Voices Inbox" } : item))
    : nav;
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4">
        {logo}

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) ? "bg-brand-500 text-white" : "text-brand-500 hover:bg-brand-50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          {user.isAdmin && (
            <Link href="/admin" className="rounded-lg bg-accent-500 px-3 py-2 text-sm font-semibold text-brand-900 hover:bg-accent-500/80">
              Admin
            </Link>
          )}
          <span title={user.name}>
            <Avatar name={user.name} size="sm" />
          </span>
          <button type="button" onClick={logOut} className="cursor-pointer rounded-lg border border-brand-100 px-3 py-2 text-sm font-medium text-brand-500 hover:bg-brand-50">
            Log out
          </button>
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-lg p-2 text-2xl leading-none text-brand-500 hover:bg-brand-50 xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="animate-pop border-t border-brand-100 bg-white xl:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${isActive(item.href) ? "bg-brand-50 text-brand-500" : "text-brand-900"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user.isAdmin && (
              <li>
                <Link href="/admin" onClick={close} className="mt-1 block rounded-lg bg-accent-500 px-3 py-3 text-base font-semibold text-brand-900">
                  Admin
                </Link>
              </li>
            )}
            <li className="mt-2 border-t border-brand-100 pt-2">
              <p className="px-3 py-2 text-sm text-slate-600">Signed in as {user.name}</p>
              <button type="button" onClick={logOut} className="block w-full cursor-pointer rounded-lg px-3 py-3 text-left text-base font-medium text-brand-900 hover:bg-brand-50">
                Log out
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
