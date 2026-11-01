"use server";
// Actions on Student Voice messages. Only admins can run them.

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";
import { getSessionUser } from "@/lib/session";

type Result = { error?: string };

const validId = (id: string) => /^[A-Za-z0-9]{10,40}$/.test(id);

export async function markVoiceRead(id: string): Promise<Result> {
  const user = await getSessionUser();
  if (!user?.isAdmin) return { error: "Only admins can do this." };
  if (!validId(id)) return { error: "Missing message." };
  try {
    await adminDb().collection("voice").doc(id).update({ read: true });
  } catch (err) {
    console.error("[voice] couldn't mark read:", err);
    return { error: "Couldn’t update that message. Try again." };
  }
  revalidatePath("/admin/voice");
  return {};
}

export async function deleteVoiceMessage(id: string): Promise<Result> {
  const user = await getSessionUser();
  if (!user?.isAdmin) return { error: "Only admins can do this." };
  if (!validId(id)) return { error: "Missing message." };
  try {
    await adminDb().collection("voice").doc(id).delete();
  } catch (err) {
    console.error("[voice] couldn't delete:", err);
    return { error: "Couldn’t delete that message. Try again." };
  }
  revalidatePath("/admin/voice");
  return {};
}