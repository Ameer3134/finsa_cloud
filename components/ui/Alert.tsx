// A small message box. kind="error" (red), "success" or "info" (blue).
const looks = {
  error: "bg-red-50 text-red-700",
  success: "bg-brand-50 text-brand-600",
  info: "bg-brand-50 text-brand-600",
};

export default function Alert({ kind = "info", children }: { kind?: keyof typeof looks; children: React.ReactNode }) {
  return <p className={`rounded-lg p-3 text-sm ${looks[kind]}`}>{children}</p>;
}
