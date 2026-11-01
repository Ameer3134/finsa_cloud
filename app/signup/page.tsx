import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import SignupForm from "./SignupForm";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = { title: "Sign up" };

export default async function SignupPage() {
  if (await getSessionUser()) redirect("/"); // already logged in

  return (
    <section className="py-12">
      <Container>
        <div className="mx-auto max-w-md animate-fade-up">
          <h1 className="font-display text-3xl font-bold text-brand-900">Create your account</h1>
          <p className="mt-2 text-slate-600">Sign up to join FINSA Cloud.</p>
          <SignupForm />
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account? <Link href="/login" className="font-semibold text-brand-500 underline">Log in</Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
