"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Field, { inputClass } from "@/components/ui/Field";
import type { CgpaData } from "@/lib/cgpa";

// Letter grades and their points (5-point scale). Change these if your school uses a different scale.
const grades = [
  { letter: "A", points: 5 },
  { letter: "B", points: 4 },
  { letter: "C", points: 3 },
  { letter: "D", points: 2 },
  { letter: "E", points: 1 },
  { letter: "F", points: 0 },
];

type Row = { id: number; code: string; units: string; grade: string };
type SaveState = "idle" | "saving" | "saved" | "error";

const blankRow = (id: number): Row => ({ id, code: "", units: "", grade: "" });
const startRows = () => [1, 2, 3, 4, 5].map(blankRow);

// `initial` is what this person saved before (from any device), or null the first time.
export default function CgpaCalculator({ initial }: { initial: CgpaData | null }) {
  const [rows, setRows] = useState<Row[]>(initial?.rows ?? startRows());
  const [nextId, setNextId] = useState(() => (initial?.rows ?? []).reduce((max, r) => Math.max(max, r.id), 5) + 1);
  const [prevCgpa, setPrevCgpa] = useState(initial?.prevCgpa ?? "");
  const [prevUnits, setPrevUnits] = useState(initial?.prevUnits ?? "");
  const [saveState, setSaveState] = useState<SaveState>("idle");

  // The last version that is safely saved. Used so we only save when something really changed.
  const lastSaved = useRef(JSON.stringify({ rows, prevCgpa, prevUnits }));

  // Save to the account 0.8 seconds after the person stops typing.
  useEffect(() => {
    const payload = JSON.stringify({ rows, prevCgpa, prevUnits });
    if (payload === lastSaved.current) return;
    setSaveState("saving");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/cgpa", { method: "PUT", headers: { "Content-Type": "application/json" }, body: payload });
        if (res.ok) lastSaved.current = payload;
        setSaveState(res.ok ? "saved" : "error");
      } catch {
        setSaveState("error");
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [rows, prevCgpa, prevUnits]);

  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  // This semester: total units, total points, and GPA = points / units.
  const { gpa, units, points } = useMemo(() => {
    let u = 0;
    let p = 0;
    for (const r of rows) {
      const unit = parseFloat(r.units);
      const g = grades.find((x) => x.letter === r.grade);
      if (!g || !Number.isFinite(unit) || unit <= 0) continue; // skip unfinished rows
      u += unit;
      p += unit * g.points;
    }
    return { gpa: u > 0 ? p / u : null, units: u, points: p };
  }, [rows]);

  // New CGPA = (old CGPA x old units + this semester's points) / (old units + this semester's units).
  const newCgpa = useMemo(() => {
    const pc = parseFloat(prevCgpa);
    const pu = parseFloat(prevUnits);
    if (gpa === null || !Number.isFinite(pc) || !Number.isFinite(pu) || pc < 0 || pc > 5 || pu < 0) return null;
    return (pc * pu + points) / (pu + units);
  }, [gpa, prevCgpa, prevUnits, points, units]);

  // Clears everything on screen and deletes the saved copy.
  const reset = async () => {
    const blank = startRows();
    lastSaved.current = JSON.stringify({ rows: blank, prevCgpa: "", prevUnits: "" });
    setRows(blank);
    setNextId(6);
    setPrevCgpa("");
    setPrevUnits("");
    setSaveState("saving");
    try {
      const res = await fetch("/api/cgpa", { method: "DELETE" });
      setSaveState(res.ok ? "saved" : "error");
    } catch {
      setSaveState("error");
    }
  };

  return (
    <Container className="grid gap-8 py-10 lg:grid-cols-[1fr_340px]">
      <div className="space-y-8">
        <Card className="p-5 sm:p-7">
          <h2 className="font-display text-xl font-semibold text-brand-900">This semester’s courses</h2>
          <p className="mt-1 text-sm text-slate-600">Enter the units and grade for each course. Your entries are saved to your account.</p>
          <p aria-live="polite" className={`mt-1 h-5 text-xs ${saveState === "error" ? "text-red-700" : "text-slate-500"}`}>
            {saveState === "saving" && "Saving…"}
            {saveState === "saved" && "Saved to your account ✓"}
            {saveState === "error" && "Couldn’t save. Check your connection; it will try again when you change something."}
          </p>

          <ul className="mt-3 space-y-3">
            {rows.map((r, i) => (
              <li key={r.id} className="grid grid-cols-[1fr_72px] gap-2 sm:grid-cols-[1fr_88px_140px_40px]">
                <input aria-label={`Course ${i + 1} code`} placeholder="Course code (optional)" maxLength={20} value={r.code} onChange={(e) => update(r.id, { code: e.target.value })} className={`${inputClass} col-span-2 sm:col-span-1`} />
                <input aria-label={`Course ${i + 1} units`} inputMode="numeric" placeholder="Units" maxLength={4} value={r.units} onChange={(e) => update(r.id, { units: e.target.value })} className={inputClass} />
                <select aria-label={`Course ${i + 1} grade`} value={r.grade} onChange={(e) => update(r.id, { grade: e.target.value })} className={inputClass}>
                  <option value="">Grade</option>
                  {grades.map((g) => (
                    <option key={g.letter} value={g.letter}>{g.letter} ({g.points.toFixed(1)})</option>
                  ))}
                </select>
                <button type="button" aria-label={`Remove course ${i + 1}`} onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))} className="cursor-pointer rounded-lg border border-brand-100 text-brand-500 hover:bg-brand-50">
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button type="button" variant="outline" disabled={rows.length >= 30} onClick={() => { setRows((rs) => [...rs, blankRow(nextId)]); setNextId((n) => n + 1); }}>
              + Add course
            </Button>
            <Button type="button" variant="outline" onClick={reset}>Reset all</Button>
          </div>
        </Card>

        <Card className="p-5 sm:p-7">
          <h2 className="font-display text-xl font-semibold text-brand-900">Previous record (optional)</h2>
          <p className="mt-1 text-sm text-slate-600">Fill this in to get your new CGPA after this semester.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Previous CGPA" htmlFor="prev-cgpa">
              <input id="prev-cgpa" inputMode="decimal" placeholder="e.g. 4.25" maxLength={6} value={prevCgpa} onChange={(e) => setPrevCgpa(e.target.value)} className={inputClass} />
            </Field>
            <Field label="Total units passed so far" htmlFor="prev-units">
              <input id="prev-units" inputMode="numeric" placeholder="e.g. 62" maxLength={5} value={prevUnits} onChange={(e) => setPrevUnits(e.target.value)} className={inputClass} />
            </Field>
          </div>
        </Card>
      </div>

      <aside aria-live="polite" className="h-fit rounded-2xl bg-brand-900 p-6 text-white lg:sticky lg:top-24">
        <p className="text-sm text-brand-100">Semester GPA</p>
        <p className="mt-1 font-display text-5xl font-extrabold">{gpa === null ? "—" : gpa.toFixed(2)}</p>
        <p className="mt-1 text-sm text-brand-100">{units} units · {points} points</p>

        <div className="my-6 h-px bg-brand-600" />

        <p className="text-sm text-brand-100">New CGPA</p>
        <p className="mt-1 font-display text-5xl font-extrabold text-accent-500">{newCgpa === null ? "—" : newCgpa.toFixed(2)}</p>
        {newCgpa === null && <p className="mt-1 text-sm text-brand-100">Add your previous CGPA and units to see this.</p>}

        <p className="mt-6 text-xs text-brand-100">Based on the 5-point scale. Results are an estimate; always confirm with your official result.</p>
      </aside>
    </Container>
  );
}