import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function NotFoundState({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-32 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,84,45,0.14),transparent)] blur-2xl"
      />
      <p className="relative font-serif text-[120px] leading-none text-ink sm:text-[160px]">
        4<span className="italic text-ember-500">0</span>4
      </p>
      <h1 className="relative mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h1>
      <p className="relative mt-3 max-w-sm text-[15px] text-zinc-500">{description}</p>
      <Link
        href={href}
        className="group relative mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {cta}
      </Link>
    </main>
  );
}
