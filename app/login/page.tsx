import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import LoginForm from "./LoginForm";
import { getSessionUser } from "@/lib/session";
import { safeNext } from "@/lib/utils";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getSessionUser()) redirect(next); // already logged in

  return (
    <section className="py-12">
      <Container>
        <div className="mx-auto max-w-md animate-fade-up">
          <h1 className="font-display text-3xl font-bold text-brand-900">Log in</h1>
          <p className="mt-2 text-slate-600">Welcome back to FINSA Cloud.</p>
          <LoginForm next={next} />
          <p className="mt-6 text-center text-sm text-slate-600">
            New here? <Link href="/signup" className="font-semibold text-brand-500 underline">Create an account</Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
