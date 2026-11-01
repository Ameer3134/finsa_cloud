"use server";
// Actions that only admins can run. Each one checks the login first.

import { revalidatePath } from "next/cache";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";

type Result = { error?: string };

export async function createAnnouncement(input: {
  title: string;
  body: string;
  pinned: boolean;
  imageUrl: string | null;
}): Promise<Result> {
  const user = await getSessionUser();
  if (!user?.isAdmin) return { error: "Only admins can post announcements." };

  const title = input.title.trim();
  const body = input.body.trim();
  if (title.length < 3 || title.length > 120) return { error: "The title must be 3 to 120 characters." };
  if (body.length < 3 || body.length > 2000) return { error: "The message must be 3 to 2000 characters." };
  if (input.imageUrl && !input.imageUrl.startsWith("https://res.cloudinary.com/")) return { error: "That image link isn’t allowed." };

  try {
    await adminDb().collection("announcements").add({
      title,
      body,
      imageUrl: input.imageUrl,
      pinned: input.pinned === true,
      createdBy: user.uid,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch {
    return { error: "The announcement wasn’t saved. Please try again." };
  }
  revalidatePath("/", "layout");
  return {};
}

export async function deleteAnnouncement(id: string): Promise<Result> {
  const user = await getSessionUser();
  if (!user?.isAdmin) return { error: "Only admins can delete announcements." };
  if (!id) return { error: "Missing announcement." };
  try {
    await adminDb().collection("announcements").doc(id).delete();
  } catch {
    return { error: "Couldn’t delete that announcement. Try again." };
  }
  revalidatePath("/", "layout");
  return {};
}
