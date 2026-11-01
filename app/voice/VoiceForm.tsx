"use client";

import { FormEvent, useState } from "react";
import Alert from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import Field, { inputClass } from "@/components/ui/Field";
import { voiceCategories } from "@/lib/site";

const MAX = 2000;

export default function VoiceForm({ defaultName, defaultEmail }: { defaultName: string; defaultEmail: string }) {
  const [anonymous, setAnonymous] = useState(false);
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // hidden trap field for bots
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSent(false);
    setPending(true);
    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonymous, name, email, category, message, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setSent(true);
      setCategory("");
      setMessage("");
      setAnonymous(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-brand-100 bg-white p-5 sm:p-7">
      {/* Trap field: hidden from people, bots fill it in */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <label className="flex items-start gap-3 text-sm text-brand-900">
        <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-500" />
        <span>Send anonymously <span className="text-slate-600">(your name and email will not be shared)</span></span>
      </label>

      {!anonymous && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="v-name">
            <input id="v-name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="v-email">
            <input id="v-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
          </Field>
        </div>
      )}

      <Field label="Category" htmlFor="v-category">
        <select id="v-category" required value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          <option value="">Select a category</option>
          {voiceCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>

      <Field label="Your message" htmlFor="v-message">
        <textarea id="v-message" required rows={7} maxLength={MAX} value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputClass} resize-y`} />
        <p className="mt-1 text-right text-xs text-slate-500">{message.length}/{MAX}</p>
      </Field>

      <Button type="submit" disabled={pending}>{pending ? "Sending…" : "Send message"}</Button>

      <div aria-live="polite" className="space-y-2">
        {sent && <Alert kind="success">Message sent. Thank you for speaking up.</Alert>}
        {error && <Alert kind="error">{error}</Alert>}
      </div>
    </form>
  );
}
