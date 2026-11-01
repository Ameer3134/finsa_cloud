// Saves (PUT) or clears (DELETE) the logged-in person's calculator entries.
import { NextResponse } from "next/server";
import { cleanCgpa, deleteCgpa, saveCgpa } from "@/lib/cgpa";
import { getSessionUser } from "@/lib/session";

export async function PUT(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const data = cleanCgpa(body);
  if (!data) return NextResponse.json({ error: "Invalid data." }, { status: 400 });

  try {
    await saveCgpa(user.uid, data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[cgpa] couldn't save:", err);
    return NextResponse.json({ error: "Couldn’t save right now." }, { status: 500 });
  }
}

export async function DELETE() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  try {
    await deleteCgpa(user.uid);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[cgpa] couldn't clear:", err);
    return NextResponse.json({ error: "Couldn’t clear right now." }, { status: 500 });
  }
}