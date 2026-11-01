"use client";

// A row of pill buttons for switching between groups (levels, people groups).
type Tab = { id: string; label: string };

export default function Tabs({
  tabs,
  active,
  onChange,
  label,
}: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  label: string; // describes the tabs for screen readers
}) {
  return (
    <div role="tablist" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {tabs.map((t) => {
        const selected = t.id === active;
        return (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={selected}
            aria-controls={`panel-${t.id}`}
            type="button"
            onClick={() => onChange(t.id)}
            className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              selected ? "border-brand-500 bg-brand-500 text-white" : "border-brand-100 bg-white text-brand-500 hover:bg-brand-50"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
