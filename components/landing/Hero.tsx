import Link from "next/link";
import { ArrowRight, Bold, Check, Heading2, ImageIcon, Italic, Link2, List, Quote, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 sm:pt-28">
      {/* Backdrop: fine grid fading out, plus a warm glow behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(12,12,14,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(12,12,14,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,84,45,0.16),transparent)] blur-2xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="#features"
            className="group mb-8 inline-flex animate-fade-up items-center gap-2 rounded-full border border-black/[0.07] bg-white/80 py-1 pl-1 pr-3 text-[13px] text-zinc-600 shadow-sm backdrop-blur transition-colors hover:border-black/15"
          >
            <span className="rounded-full bg-ember-50 px-2 py-0.5 text-xs font-medium text-ember-600">New</span>
            <span className="sm:hidden">A calmer editor, just shipped</span>
            <span className="hidden sm:inline">Cover uploads, instant search &amp; a calmer editor</span>
            <ArrowRight className="h-3 w-3 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
          </a>

          <h1 className="animate-fade-up text-balance text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-ink [animation-delay:80ms] sm:text-6xl md:text-[76px]">
            Where ideas become{" "}
            <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-ember-500">
              stories
            </span>{" "}
            worth reading.
          </h1>

          <p className="mx-auto mt-6 max-w-xl animate-fade-up text-pretty text-lg leading-relaxed text-zinc-600 [animation-delay:160ms]">
            BlogVista is the beautifully simple home for your writing. Draft without distraction, publish in seconds,
            and reach readers who actually care.
          </p>

          <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-ink px-6 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_-10px_rgba(12,12,14,0.6)] transition-all hover:-translate-y-px hover:bg-zinc-800"
            >
              Start writing — it&apos;s free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/signin"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-6 text-[15px] font-medium text-ink shadow-sm transition-colors hover:bg-zinc-50"
            >
              Explore stories
            </Link>
          </div>

          <p className="mt-6 animate-fade-up text-[13px] text-zinc-500 [animation-delay:320ms]">
            No credit card. No setup. Your first post can be live in under a minute.
          </p>
        </div>

        <ProductMock />
      </div>
    </section>
  );
}

function ProductMock() {
  return (
    <div className="relative mx-auto mt-20 max-w-5xl animate-fade-up [animation-delay:420ms]">
      {/* Glow under the window */}
      <div
        aria-hidden
        className="absolute inset-x-10 -bottom-6 top-10 rounded-[32px] bg-gradient-to-b from-ember-400/20 via-fuchsia-400/10 to-transparent blur-3xl"
      />

      <div className="relative rounded-[22px] border border-black/[0.06] bg-white/60 p-2 shadow-[0_30px_80px_-20px_rgba(12,12,14,0.25)] backdrop-blur">
        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-black/[0.06] bg-zinc-50/80 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center rounded-md border border-black/[0.06] bg-white font-mono text-[11px] text-zinc-500">
              blogvista.app/blog/publish
            </div>
            <div className="w-12" />
          </div>

          <div className="grid md:grid-cols-[1fr_260px]">
            {/* Editor */}
            <div className="p-6 sm:p-10">
              <div className="mb-6 flex flex-wrap items-center gap-1 text-zinc-400">
                {[Heading2, Bold, Italic, Quote, List, Link2, ImageIcon].map((Icon, i) => (
                  <span
                    key={i}
                    className={`grid h-8 w-8 place-items-center rounded-md ${i === 1 ? "bg-zinc-100 text-ink" : ""}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
                <span className="ml-auto hidden items-center gap-1.5 text-xs text-zinc-400 sm:flex">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember-500" />
                  Writing…
                </span>
              </div>

              <div className="relative mb-6 aspect-[16/6] overflow-hidden rounded-xl bg-[#140b10]">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(60%_80%_at_20%_20%,rgba(255,122,77,0.9),transparent_65%),radial-gradient(55%_75%_at_85%_25%,rgba(217,70,239,0.75),transparent_65%),radial-gradient(70%_70%_at_50%_115%,rgba(56,189,248,0.7),transparent_60%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_top,#000,transparent_70%)]"
                />
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
                  <ImageIcon className="h-3 w-3" />
                  cover.jpg
                </div>
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Learn Rust by building a terminal Connect&nbsp;4
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-zinc-600">
                In this piece we&apos;ll explore how Rust helps you write fast, reliable command-line apps — and why a
                game is the friendliest way to learn ownership
                <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 animate-pulse bg-ember-500" />
              </p>
              <div className="mt-5 space-y-2.5">
                <div className="h-2.5 w-full rounded-full bg-zinc-100" />
                <div className="h-2.5 w-11/12 rounded-full bg-zinc-100" />
                <div className="h-2.5 w-4/6 rounded-full bg-zinc-100" />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden border-l border-black/[0.06] bg-zinc-50/60 p-5 md:block">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">Publish</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-zinc-500">Status</dt>
                  <dd className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">Draft</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-zinc-500">Author</dt>
                  <dd className="font-medium text-ink">You</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-zinc-500">Visibility</dt>
                  <dd className="font-medium text-ink">Public</dd>
                </div>
              </dl>
              <div className="mt-6 rounded-xl border border-black/[0.06] bg-white p-3">
                <p className="text-xs font-medium text-ink">Cover image</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Optimised &amp; uploaded
                </div>
              </div>
              <div className="mt-6 flex h-10 items-center justify-center rounded-lg bg-ink text-sm font-medium text-white">
                Publish story
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      <div className="absolute -left-6 top-40 hidden animate-float rounded-2xl border border-black/[0.06] bg-white/90 p-3 pr-4 shadow-xl backdrop-blur lg:flex lg:items-center lg:gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink">Story published</p>
          <p className="text-xs text-zinc-500">Live for readers · just now</p>
        </div>
      </div>
      <div className="absolute -right-8 bottom-24 hidden animate-float rounded-2xl border border-black/[0.06] bg-white/90 p-3 pr-4 shadow-xl backdrop-blur [animation-delay:1.5s] lg:flex lg:items-center lg:gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-ember-50 text-ember-500">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-medium text-ink">Focus mode</p>
          <p className="text-xs text-zinc-500">Just you and the page</p>
        </div>
      </div>
    </div>
  );
}
