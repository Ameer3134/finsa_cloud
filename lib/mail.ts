// Sends email through a Gmail account that you control (free).
// Used to email a copy of each Student Voice message to the executives.
import "server-only";
import nodemailer from "nodemailer";

// True only when all three email settings are filled in.
export const hasMail = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && process.env.FINSA_TO_EMAIL);

// Returns true if Gmail accepted the email, false if email isn't set up or something failed.
export async function sendMail(opts: { subject: string; text: string; replyTo?: string }): Promise<boolean> {
  if (!hasMail()) return false;
  const user = process.env.SMTP_USER as string;
  const port = Number(process.env.SMTP_PORT ?? 465);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port,
      secure: port === 465,
      // Google shows the app password in groups of four letters with spaces. Spaces are removed here.
      auth: { user, pass: (process.env.SMTP_PASS as string).replace(/\s/g, "") },
    });
    await transporter.sendMail({
      from: `FINSA Cloud <${user}>`,
      to: process.env.FINSA_TO_EMAIL, // several addresses can be separated with commas
      subject: opts.subject,
      text: opts.text,
      replyTo: opts.replyTo,
    });
    return true;
  } catch (err) {
    console.error("[mail] couldn't send:", err);
    return false;
  }
}