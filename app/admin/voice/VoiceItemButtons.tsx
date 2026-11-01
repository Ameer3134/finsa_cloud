"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteVoiceMessage, markVoiceRead } from "@/app/voice-actions";

export default function VoiceItemButtons({ id, read }: { id: string; read: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function run(action: (id: string) => Promise<{ error?: string }>) {
    setPending(true);
    setError("");
    const result = await action(id);
    setPending(false);
    if (result.error) setError(result.error);
    else router.refresh(); // reload the list
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {!read && (
        <button type="button" disabled={pending} onClick={() => run(markVoiceRead)} className="cursor-pointer rounded-lg border border-brand-100 px-3 py-1.5 text-sm font-medium text-brand-500 hover:bg-brand-50 disabled:opacity-60">
          Mark as read
        </button>
      )}
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (confirm("Delete this message? This can’t be undone.")) run(deleteVoiceMessage);
        }}
        className="cursor-pointer rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
      >
        Delete
      </button>
      {error && <span className="text-sm text-red-700">{error}</span>}
    </div>
  );
}