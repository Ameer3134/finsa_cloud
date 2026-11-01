"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { inputClass } from "@/components/ui/Field";
import type { HandbookSection } from "@/lib/types";

export default function HandbookList({ sections, pdfUrl }: { sections: HandbookSection[]; pdfUrl: string }) {
  const [query, setQuery] = useState("");
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  // Keep only sections whose title or text contains what was typed.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter((s) => s.title.toLowerCase().includes(q) || s.items.some((i) => i.toLowerCase().includes(q)));
  }, [query, sections]);

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-4 rounded-2xl bg-brand-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Prefer the full document?</h2>
          <p className="mt-1 text-sm text-brand-100">Open the complete handbook PDF on Google Drive.</p>
        </div>
        <ButtonLink href={pdfUrl} target="_blank" rel="noopener noreferrer" variant="accent" className="shrink-0">
          Open PDF ↗
        </ButtonLink>
      </div>

      <div className="mt-8">
        <label htmlFor="handbook-search" className="sr-only">Search the handbook</label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true">🔍</span>
          <input id="handbook-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the handbook" className={`${inputClass} pl-10`} />
        </div>
        <p className="mt-2 text-sm text-slate-600" aria-live="polite">
          {results.length} of {sections.length} sections
        </p>
      </div>

      {results.length === 0 ? (
        <Card className="mt-6 text-slate-600">No sections match “{query}”. Try a different word, or open the full PDF above.</Card>
      ) : (
        <ul className="mt-6 space-y-3">
          {results.map((s) => {
            const open = openTitle === s.title;
            const panelId = `hb-${s.title.replace(/\W+/g, "-").toLowerCase()}`;
            return (
              <li key={s.title} className="rounded-2xl border border-brand-100 bg-white">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenTitle(open ? null : s.title)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-semibold text-brand-900"
                  >
                    {s.title}
                    <span aria-hidden="true" className={`text-brand-500 transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
                  </button>
                </h3>
                {open && (
                  <ul id={panelId} className="list-disc space-y-2 px-10 pb-5 text-sm text-slate-600">
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
}
