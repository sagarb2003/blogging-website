import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="BlogVista home">
      <span
        className={`relative grid h-8 w-8 place-items-center rounded-[10px] ${
          inverted ? "bg-white text-ink" : "bg-ink text-white"
        } shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]`}
      >
        <span className="font-serif text-xl leading-none italic">B</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-ember-500 ring-2 ring-paper" />
      </span>
      <span className={`text-[17px] font-semibold tracking-tight ${inverted ? "text-white" : "text-ink"}`}>
        BlogVista
      </span>
    </Link>
  );
}
