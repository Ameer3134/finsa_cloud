import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import VoiceForm from "./VoiceForm";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Student Voice" };

export default async function VoicePage() {
  const user = await requireUser("/voice");
  return (
    <>
      <PageHeader title="Student Voice" subtitle="Have a suggestion, complaint or question? Send it straight to the executives." />
      <Container className="grid gap-8 py-10 lg:grid-cols-[1fr_320px]">
        <VoiceForm defaultName={user.name} defaultEmail={user.email} />
        <Card className="h-fit">
          <h2 className="font-display text-lg font-semibold text-brand-900">Good to know</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>Your message goes to the executives’ Student Voice inbox.</li>
            <li>Tick “Send anonymously” if you don’t want your name shared. We won’t be able to reply to you.</li>
            <li>Please keep it respectful and specific.</li>
          </ul>
        </Card>
      </Container>
    </>
  );
}
