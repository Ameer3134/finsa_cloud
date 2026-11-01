// Student Voice messages, saved in the database so executives can read them on the website.
import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, hasAdmin } from "@/lib/firebase-admin";

export type VoiceMessage = {
  id: string;
  category: string;
  message: string;
  anonymous: boolean;
  name: string; // empty for anonymous messages
  email: string; // empty for anonymous messages
  read: boolean;
  createdAt: string; // ISO date text
};

export async function saveVoiceMessage(m: { category: string; message: string; anonymous: boolean; name: string; email: string }) {
  await adminDb().collection("voice").add({ ...m, read: false, createdAt: FieldValue.serverTimestamp() });
}

// Newest first, up to 200.
export async function listVoiceMessages(): Promise<VoiceMessage[]> {
  if (!hasAdmin()) return [];
  try {
    const snap = await adminDb().collection("voice").orderBy("createdAt", "desc").limit(200).get();
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        category: String(data.category ?? ""),
        message: String(data.message ?? ""),
        anonymous: data.anonymous === true,
        name: String(data.name ?? ""),
        email: String(data.email ?? ""),
        read: data.read === true,
        createdAt: (data.createdAt?.toDate?.() ?? new Date()).toISOString(),
      };
    });
  } catch (err) {
    console.error("[voice] couldn't load messages:", err);
    return [];
  }
}