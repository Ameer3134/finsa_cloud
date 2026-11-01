// Receives Student Voice messages. Only logged-in users can send one.
// Every message is saved in the inbox first. An email copy is then sent as a bonus.
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { getSessionUser } from "@/lib/session";
import { voiceCategories } from "@/lib/site";
import { saveVoiceMessage } from "@/lib/voice";

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please log in to send a message." }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden trap field: real people never fill it in.
  if (typeof body.website === "string" && body.website.trim() !== "") return NextResponse.json({ ok: true });

  const anonymous = body.anonymous === true;
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const category = String(body.category ?? "");
  const message = String(body.message ?? "").trim();

  if (!voiceCategories.includes(category)) return NextResponse.json({ error: "Please select a category." }, { status: 400 });
  if (message.length < 5 || message.length > 2000) return NextResponse.json({ error: "Message must be between 5 and 2000 characters." }, { status: 400 });
  if (!anonymous && (!name || !/^\S+@\S+\.\S+$/.test(email))) {
    return NextResponse.json({ error: "Please enter your name and a valid email, or send anonymously." }, { status: 400 });
  }

  // 1. Save it in the inbox. Anonymous messages keep no name, email or account.
  try {
    await saveVoiceMessage({
      category,
      message,
      anonymous,
      name: anonymous ? "" : name.slice(0, 80),
      email: anonymous ? "" : email.slice(0, 254),
    });
  } catch (err) {
    console.error("[voice] couldn't save:", err);
    return NextResponse.json({ error: "Could not send your message right now. Please try again later." }, { status: 500 });
  }

  // 2. Email a copy. If this fails, the message is still safe in the inbox.
  const site = process.env.SITE_URL?.replace(/\/$/, "");
  await sendMail({
    subject: `Student Voice: ${category}`,
    text:
      `New Student Voice message\n\nCategory: ${category}\nFrom: ${anonymous ? "Anonymous" : `${name} <${email}>`}\n\n${message}` +
      (site ? `\n\nRead and manage messages: ${site}/admin/voice` : ""),
    replyTo: anonymous ? undefined : email,
  });

  return NextResponse.json({ ok: true });
}