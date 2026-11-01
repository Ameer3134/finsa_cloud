"use client";

import { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import Alert from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import Field, { inputClass } from "@/components/ui/Field";
import { friendlyAuthError } from "@/lib/authErrors";
import { getFirebaseAuth, hasFirebaseClient } from "@/lib/firebase-client";
import { startSession } from "@/lib/session-client";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (firstName.trim().length < 2) return setError("Enter your first name.");
    if (surname.trim().length < 2) return setError("Enter your last name.");
    if (password.length < 8) return setError("Use a password with at least 8 characters.");
    if (password !== confirm) return setError("The two passwords don’t match.");
    if (!hasFirebaseClient) return setError(friendlyAuthError({ code: "not-configured" }));
    const fullName =`${surname.trim()} ${firstName.trim()}`;

    setPending(true);
    try {
      // 1. Firebase creates the account
      const auth = getFirebaseAuth();
      const cred = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      await updateProfile(cred.user, { displayName: fullName });
      // 2. Our server saves the profile and starts the secure login cookie

    await startSession(await cred.user.getIdToken(), { firstName: firstName.trim(), surname: surname.trim() });

      await signOut(auth);
      // 3. Go to the dashboard
      window.location.assign("/");
    } catch (err) {
      setError(friendlyAuthError(err));
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5 rounded-2xl border border-brand-100 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
  <Field label="First name" htmlFor="firstName">
    <input id="firstName" required autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
  </Field>
  <Field label="Surname" htmlFor="surname">
    <input id="surname" required autoComplete="family-name" value={surname} onChange={(e) => setSurname(e.target.value)} className={inputClass} />
  </Field>
</div>
      <Field label="Email" htmlFor="email">
        <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
      </Field>
      <Field label="Password" htmlFor="password" hint="At least 8 characters.">
        <input id="password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
      </Field>
      <Field label="Confirm password" htmlFor="confirm">
        <input id="confirm" type="password" required minLength={8} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputClass} />
      </Field>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating account…" : "Sign up"}
      </Button>
      <div aria-live="polite">{error && <Alert kind="error">{error}</Alert>}</div>
    </form>
  );
}
