// Turns a successful login into a secure cookie (POST), or logs out (DELETE).
import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminAuth, adminDb, hasAdmin } from "@/lib/firebase-admin";
import { SESSION_COOKIE, SESSION_DAYS } from "@/lib/session";

export async function POST(req: Request) {
  if (!hasAdmin()) {
    return NextResponse.json({ error: "The server isn’t set up yet. Add the Firebase server keys (see the README)." }, { status: 503 });
  }

   let body: { idToken?: unknown; firstName?: unknown; surname?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const idToken = typeof body.idToken === "string" ? body.idToken : "";

  const firstName = typeof body.firstName === "string" ? body.firstName.trim().slice(0, 40) : "";
  const surname = typeof body.surname === "string" ? body.surname.trim().slice(0, 40) : "";
  const name = `${firstName} ${surname}`.trim();

  if (!idToken) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    const decoded = await adminAuth().verifyIdToken(idToken);
    // Only accept a login that just happened.
    if (Date.now() / 1000 - decoded.auth_time > 5 * 60) {
      return NextResponse.json({ error: "Please log in again." }, { status: 401 });
    }

    // First time we see this person: save their profile as a normal student.
    const profile = adminDb().collection("users").doc(decoded.uid);
    if (!(await profile.get()).exists) {
      await profile.set({
        name: name || decoded.name || decoded.email || "Student", firstName, surname,
        email: decoded.email ?? "",
        role: "student",
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    const expiresIn = SESSION_DAYS * 24 * 60 * 60 * 1000;
    const cookie = await adminAuth().createSessionCookie(idToken, { expiresIn });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, cookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Couldn’t log you in. Please try again." }, { status: 401 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
