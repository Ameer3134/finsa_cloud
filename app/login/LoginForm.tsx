"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import Alert from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import Field, { inputClass } from "@/components/ui/Field";
import { friendlyAuthError } from "@/lib/authErrors";
import { getFirebaseAuth, hasFirebaseClient } from "@/lib/firebase-client";
import { startSession } from "@/lib/session-client";

export default function LoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!hasFirebaseClient) return setError(friendlyAuthError({ code: "not-configured" }));
    setPending(true);
    try {
      // 1. Firebase checks the email and password
      const auth = getFirebaseAuth();
      const cred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      // 2. Our server turns that into a secure login cookie
      await startSession(await cred.user.getIdToken());
      await signOut(auth);
      // 3. Reload so every page sees the new login
      window.location.assign(next);
    } catch (err) {
      setError(friendlyAuthError(err));
      setPending(false);
    }
  }

  async function onForgot() {
    setError("");
    setMessage("");
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Type your email above first, then tap “Forgot password?”.");
    if (!hasFirebaseClient) return setError(friendlyAuthError({ code: "not-configured" }));
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email.trim().toLowerCase());
      setMessage("If that email has an account, a reset link is on its way. Check your inbox and spam folder.");
    } catch (err) {
      setError(friendlyAuthError(err));
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5 rounded-2xl border border-brand-100 bg-white p-6">
      <Field label="Email" htmlFor="email">
        <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
      </Field>
      <Field label="Password" htmlFor="password">
        <input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        <button type="button" onClick={onForgot} className="mt-2 cursor-pointer text-sm font-medium text-brand-500 underline">
          Forgot password?
        </button>
      </Field>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Logging in…" : "Log in"}
      </Button>
      <div aria-live="polite" className="space-y-2">
        {error && <Alert kind="error">{error}</Alert>}
        {message && <Alert kind="success">{message}</Alert>}
      </div>
    </form>
  );
}
