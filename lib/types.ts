// Shapes of the data used around the site. Safe to import anywhere.
export type Person = { name: string; role: string; phone?: string; photo?: string };
export type PeopleGroup = { id: string; label: string; blurb: string; members: Person[] };
export type Level = { id: string; label: string; driveUrl: string; blurb: string };
export type HandbookSection = { title: string; items: string[] };
