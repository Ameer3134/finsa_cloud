// The heart of the page protection. Pages call requireUser() before showing anything.
import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb, hasAdmin } from "@/lib/firebase-admin";

export const SESSION_COOKIE = "finsa_session";
export const SESSION_DAYS = 5;

export type SessionUser = { uid: string; name: string; email: string; isAdmin: boolean };

// Who is logged in right now? Returns null if nobody. Runs once per page request.
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  if (!hasAdmin()) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const decoded = await adminAuth().verifySessionCookie(token);
    const profile = (await adminDb().collection("users").doc(decoded.uid).get()).data();
    return {
      uid: decoded.uid,
      email: decoded.email ?? "",
      name: (profile?.name as string) || decoded.name || decoded.email || "Student",
      isAdmin: profile?.role === "admin",
    };
  } catch {
    return null; // expired or invalid login
  }
});

// Use at the top of every private page. Not logged in? Send them to the login page.
export async function requireUser(returnTo: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  return user;
}
