import { initials } from "@/lib/format";

const TONES = [
  "from-ember-400 to-ember-600",
  "from-fuchsia-400 to-purple-600",
  "from-sky-400 to-indigo-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-600",
];

/** Initials avatar with a gradient picked deterministically from the name. */
export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const tone = TONES[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % TONES.length];
  const dims = { sm: "h-6 w-6 text-[10px]", md: "h-8 w-8 text-xs", lg: "h-12 w-12 text-base" }[size];
  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-semibold text-white ring-2 ring-white ${tone} ${dims}`}
    >
      {initials(name)}
    </span>
  );
}
