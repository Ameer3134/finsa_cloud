// A white rounded box with a thin border. Used for most content blocks.
export default function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-brand-100 bg-white p-6 ${className}`}>{children}</div>;
}
