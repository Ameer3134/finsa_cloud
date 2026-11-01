import Image from "next/image";
import type { Announcement } from "@/lib/announcements";
import { formatDate } from "@/lib/utils";

// One announcement in full: optional image, date, title and message.
export default function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
      {item.imageUrl && (
        
          <img src={item.imageUrl} alt="" className="block max-h[34rem] w-full bg-brand-50 object-contain" />
        
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          {item.pinned && <span className="rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-semibold text-brand-900">Pinned</span>}
          <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
        </div>
        <h2 className="mt-2 font-display text-xl font-bold text-brand-900">{item.title}</h2>
        <p className="mt-2 whitespace-pre-line text-slate-700">{item.body}</p>
      </div>
    </article>
  );
}
