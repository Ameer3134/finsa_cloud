// PUBLIC site info. Anyone can see this, even before logging in.
// Private content (people, materials, handbook) lives in lib/content.ts.

export const site = {
  name: "FINSA Cloud",
  association: "Finance Students’ Association · University of Ilorin",
  description: "Study materials, executives, lecturers, handbook and tools for Finance students at the University of Ilorin.",
  email: "finsaunilorin67@gmail.com",
  address: "Olushola Adekanola, Department of Finance, Faculty of Management Sciences, University of Ilorin.",
  inspiredBy: "This website was inspired by The Ascendant Administration executives council 26/27",
};

// Menu shown to logged-in users.
export const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/materials", label: "Materials" },
  { href: "/announcements", label: "Announcements" },
  { href: "/people", label: "Administration" },
  { href: "/handbook", label: "Handbook" },
  { href: "/cgpa", label: "CGPA" },
  { href: "/voice", label: "Student Voice" },
];

// Cards on the dashboard and links in the footer.
export const quickLinks = [
  { href: "/materials", icon: "📚", label: "Study Materials", text: "Notes, past questions and resources for every level." },
  { href: "/announcements", icon: "📢", label: "Announcements", text: "News and notices from the executives." },
  { href: "/people", icon: "👥", label: "Administration", text: "Executives, SRC, tutors, editorial board and lecturers." },
  { href: "/handbook", icon: "📘", label: "Handbook", text: "Department rules, guidelines and course information." },
  { href: "/cgpa", icon: "🧮", label: "CGPA Calculator", text: "Work out your GPA and CGPA in seconds." },
  { href: "/voice", icon: "💬", label: "Student Voice", text: "Share feedback, complaints and suggestions." },
];

export const socials = [
  { label: "Facebook", href: "https://www.facebook.com/share/1KUrFnr9bY/" },
  { label: "Instagram", href: "https://instagram.com/finsa_unilorin" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/finsa-unilorin/" },
  { label: "TikTok", href: "https://www.tiktok.com/@finsaunilorin.ng" },
  { label: "X", href: "https://x.com/finsa_unilorin" },
];

export const voiceCategories = ["Suggestion", "Complaint", "Academic issue", "Welfare", "Other"];
