// Reads announcements from the database (server only, so only logged-in pages can show them).
import "server-only";
import { cache } from "react";
import { adminDb, hasAdmin } from "@/lib/firebase-admin";

export type Announcement = {
  id: string;
  title: string;
  body: string;
  imageUrl: string | null;
  pinned: boolean;
  createdAt: string; // ISO date text
};

// Latest 20, pinned ones first. cache() means one database read per page, shared by everything on it.
export const getAnnouncements = cache(async (): Promise<Announcement[]> => {
  if (!hasAdmin()) return [];
  try {
    const snap = await adminDb().collection("announcements").orderBy("createdAt", "desc").limit(20).get();
    const list = snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: String(data.title ?? ""),
        body: String(data.body ?? ""),
        imageUrl: (data.imageUrl as string | null) ?? null,
        pinned: data.pinned === true,
        createdAt: (data.createdAt?.toDate?.() ?? new Date()).toISOString(),
      };
    });
    return list.sort((a, b) => Number(b.pinned) - Number(a.pinned));
  } catch (err) {
    console.error("[announcements]", err);
    return [];
  }
});
