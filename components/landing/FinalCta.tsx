import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-ink px-6 py-20 text-center sm:px-16 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,84,45,0.45),transparent)] blur-2xl"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-6xl">
            Your next story{" "}
            <span className="font-serif font-normal italic text-ember-400">deserves</span> to be read.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-zinc-400">
            Join the writers turning ideas into stories on BlogVista. It takes less than a minute to begin.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-[15px] font-medium text-ink shadow-[0_10px_40px_-10px_rgba(242,84,45,0.6)] transition-all hover:-translate-y-px hover:bg-zinc-100"
            >
              Start writing for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/signin"
              className="inline-flex h-12 items-center rounded-xl border border-white/15 px-6 text-[15px] font-medium text-white transition-colors hover:bg-white/[0.06]"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
