import Image from "next/image";
import { getInitials } from "@/lib/utils";

// A round profile picture. No photo yet? It shows the person's initials instead.
//   <Avatar name="Adedokun Jamiu" photo="/people/jamiu.jpg" />   <- with photo
//   <Avatar name="Adedokun Jamiu" />                             <- shows "AJ"
const sizes = {
  sm: "h-8 w-8 text-xs", // small, used in the header
  lg: "h-24 w-24 text-3xl", // people page
};

// Colours chosen from your brand palette.
const tones = [
  "bg-brand-500 text-white",
  "bg-brand-600 text-white",
  "bg-brand-400 text-white",
  "bg-accent-500 text-brand-900",
  "bg-brand-100 text-brand-500",
];

function pickTone(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  return tones[Math.abs(h) % tones.length];
}

export default function Avatar({
  name,
  photo,
  size = "lg",
  seed,
}: {
  name: string;
  photo?: string;
  size?: keyof typeof sizes;
  seed?: string; // makes the colour different for people with the same name
}) {
  const box = `${sizes[size]} shrink-0 overflow-hidden rounded-full`;
  if (photo) {
    return (
      <div className={`relative ${box}`}>
        <Image src={photo} alt={name} fill sizes="160px" className="object-cover rounded-full border-2 border-brand-900 w-40 h-40" />
      </div>
    );
    
  }
  return (
    <div role="img" aria-label={`${name} (no photo yet)`} className={`flex items-center justify-center font-display font-bold ${box} ${pickTone(seed ?? name)}`}>
      <span aria-hidden="true">{getInitials(name)}</span>
    </div>
  );
}
