// A label on top of a form control.
//   <Field label="Email" htmlFor="email"><input id="email" className={inputClass} /></Field>
export const inputClass =
  "w-full rounded-lg border border-brand-100 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:outline-2 focus:outline-brand-400";

export default function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-brand-900">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
