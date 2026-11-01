import Image from "next/image";

// Shows your image if src is set. Otherwise shows a dashed placeholder box.
// Size it with className, e.g. "aspect-[4/3] w-full" or "h-10 w-10".
export default function ImageSlot({
  src,
  alt,
  label,
  className = "",
  compact = false,
  priority = false,
}: {
  src?: string | null;
  alt: string;
  label: string; // text shown inside the placeholder
  className?: string;
  compact?: boolean; // icon only (for small boxes)
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${alt}`}
      className={`flex flex-col items-center justify-center gap-2 overflow-hidden border border-dashed border-brand-400 bg-brand-50 text-brand-500 ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={compact ? "h-5 w-5" : "h-8 w-8"} aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="m4 18 5-5 4 4 3-3 4 4" />
      </svg>
      {!compact && <span className="px-3 text-center text-xs font-medium">{label}</span>}
    </div>
  );
}
