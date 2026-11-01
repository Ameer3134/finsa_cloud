"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createAnnouncement } from "@/app/actions";
import Alert from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import Field, { inputClass } from "@/components/ui/Field";
import { hasCloudinary, uploadImage } from "@/lib/cloudinary";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4 MB

export default function AnnouncementForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const body = String(data.get("body") ?? "").trim();
    const pinned = data.get("pinned") === "on";
    const file = data.get("image");

    if (title.length < 3 || title.length > 120) return setError("The title must be 3 to 120 characters.");
    if (body.length < 3 || body.length > 2000) return setError("The message must be 3 to 2000 characters.");

    setPending(true);
    try {
      // 1. Upload the picture (if there is one)
      let imageUrl: string | null = null;
      if (file instanceof File && file.size > 0) {
        if (!ALLOWED_TYPES.includes(file.type)) throw new Error("Upload a JPG, PNG or WebP image.");
        if (file.size > MAX_IMAGE_BYTES) throw new Error("The image is too large. Keep it under 4 MB.");
        imageUrl = await uploadImage(file);
      }
      // 2. Save the announcement on the server
      const result = await createAnnouncement({ title, body, pinned, imageUrl });
      if (result.error) throw new Error(result.error);

      form.reset();
      setMessage("Announcement posted. It now shows on every page.");
      router.refresh(); // update the list on this page
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-5 rounded-2xl border border-brand-100 bg-white p-5">
      <Field label="Title" htmlFor="title">
        <input id="title" name="title" required minLength={3} maxLength={120} className={inputClass} />
      </Field>
      <Field label="Message" htmlFor="body">
        <textarea id="body" name="body" required minLength={3} maxLength={2000} rows={6} className={`${inputClass} resize-y`} />
      </Field>
      <Field
        label="Image (optional)"
        htmlFor="image"
        hint={hasCloudinary ? "JPG, PNG or WebP, up to 4 MB." : "Image upload is off. Add your Cloudinary keys to .env.local to turn it on (see the README)."}
      >
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={!hasCloudinary}
          className="block w-full text-sm file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:font-semibold file:text-brand-500 hover:file:bg-brand-100 disabled:opacity-50"
        />
      </Field>
      <label className="flex items-start gap-3 text-sm text-brand-900">
        <input type="checkbox" name="pinned" className="mt-0.5 h-4 w-4 accent-brand-500" />
        <span>Pin to the top <span className="text-slate-600">(pinned announcements show first)</span></span>
      </label>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Posting…" : "Post announcement"}
      </Button>
      <div aria-live="polite" className="space-y-2">
        {error && <Alert kind="error">{error}</Alert>}
        {message && <Alert kind="success">{message}</Alert>}
      </div>
    </form>
  );
}
