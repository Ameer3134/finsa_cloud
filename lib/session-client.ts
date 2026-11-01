// Browser helpers that start and end the secure login cookie.
export async function startSession(idToken: string, names?: { firstName: string; surname: string })  {
  const res = await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ idToken, ...names }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? "Couldn’t start your session. Please try again.");
  }
}

export async function endSession() {
  await fetch("/api/session", { method: "DELETE" });
}
