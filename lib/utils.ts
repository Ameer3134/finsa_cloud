const TITLES = /^(prof|professor|dr|mr|mrs|ms|miss|engr|barr|alh|alhaji|alhaja|hajia|pastor|rev|sir|chief|hon|dean)\.?$/i;

// "Adedokun Jamiu Olasunkanmi" -> "AJ".  "Dr. Full Name" -> "FN".
export function getInitials(name: string): string {
  const parts = name
    .split(/\s+/)
    .map((p) => p.replace(/[^\p{L}.'-]/gu, ""))
    .filter(Boolean)
    .filter((p) => !TITLES.test(p));
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}

// Only allow redirects to pages inside this site.
export function safeNext(value: string | null | undefined): string {
  const v = value ?? "";
  return v.startsWith("/") && !v.startsWith("//") ? v : "/";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" });
}
