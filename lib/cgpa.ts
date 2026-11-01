// Saves each person's CGPA calculator entries in the database, so they follow the person to any device.
import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, hasAdmin } from "@/lib/firebase-admin";

export type CgpaRow = { id: number; code: string; units: string; grade: string };
export type CgpaData = { rows: CgpaRow[]; prevCgpa: string; prevUnits: string };

const GRADES = ["", "A", "B", "C", "D", "E", "F"];

// Checks that what arrives really looks like calculator entries. Anything else is refused.
export function cleanCgpa(input: unknown): CgpaData | null {
  if (typeof input !== "object" || input === null) return null;
  const d = input as Record<string, unknown>;
  if (!Array.isArray(d.rows) || d.rows.length > 30) return null;

  const rows: CgpaRow[] = [];
  for (const r of d.rows) {
    if (typeof r !== "object" || r === null) return null;
    const row = r as Record<string, unknown>;
    if (typeof row.id !== "number" || !Number.isInteger(row.id)) return null;
    if (typeof row.code !== "string" || row.code.length > 20) return null;
    if (typeof row.units !== "string" || row.units.length > 4) return null;
    if (typeof row.grade !== "string" || !GRADES.includes(row.grade)) return null;
    rows.push({ id: row.id, code: row.code, units: row.units, grade: row.grade });
  }
  if (typeof d.prevCgpa !== "string" || d.prevCgpa.length > 6) return null;
  if (typeof d.prevUnits !== "string" || d.prevUnits.length > 5) return null;
  return { rows, prevCgpa: d.prevCgpa, prevUnits: d.prevUnits };
}

// Reads this person's saved entries (null if they have none yet).
export async function getCgpa(uid: string): Promise<CgpaData | null> {
  if (!hasAdmin()) return null;
  try {
    const snap = await adminDb().collection("cgpa").doc(uid).get();
    return snap.exists ? cleanCgpa(snap.data()) : null;
  } catch (err) {
    console.error("[cgpa] couldn't load:", err);
    return null;
  }
}

export async function saveCgpa(uid: string, data: CgpaData) {
  await adminDb().collection("cgpa").doc(uid).set({ ...data, updatedAt: FieldValue.serverTimestamp() });
}

export async function deleteCgpa(uid: string) {
  await adminDb().collection("cgpa").doc(uid).delete();
}