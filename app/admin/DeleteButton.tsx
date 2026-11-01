"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAnnouncement } from "@/app/actions";

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onClick() {
    if (!confirm(`Delete “${title}”? This can’t be undone.`)) return;
    setPending(true);
    const result = await deleteAnnouncement(id);
    setPending(false);
    if (result.error) alert(result.error);
    else router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="cursor-pointer self-start rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
