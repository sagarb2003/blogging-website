import { Check, Feather } from "lucide-react";

/** Decorative brand panel shown beside the auth forms on large screens. */
export const Quote = () => {
  return (
    <div className="relative m-3 flex h-[calc(100vh-1.5rem)] flex-col justify-between overflow-hidden rounded-[28px] bg-ink p-12 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_70%_30%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(242,84,45,0.45),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(217,70,239,0.25),transparent)] blur-2xl"
      />

      {/* Floating product cards */}
      <div className="relative ml-auto w-full max-w-sm">
        <div className="animate-float rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Feather className="h-3.5 w-3.5 text-ember-400" />
            Draft · just now
          </div>
          <p className="mt-3 font-serif text-2xl leading-tight">The quiet art of shipping</p>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full rounded-full bg-white/10" />
            <div className="h-2 w-5/6 rounded-full bg-white/10" />
            <div className="h-2 w-3/5 rounded-full bg-white/10" />
          </div>
        </div>
        <div className="-mt-4 ml-10 inline-flex animate-float items-center gap-3 rounded-2xl border border-white/10 bg-white p-3 pr-4 text-ink shadow-2xl [animation-delay:1.5s]">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <Check className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium">Story published</p>
            <p className="text-xs text-zinc-500">Live for readers</p>
          </div>
        </div>
      </div>

      <figure className="relative max-w-lg">
        <span aria-hidden className="font-serif text-6xl leading-none text-ember-400">
          &ldquo;
        </span>
        <blockquote className="-mt-2 font-serif text-4xl leading-[1.15] xl:text-5xl">
          Read the unseen, explore the unknown.{" "}
          <span className="italic text-zinc-400">Write your thoughts, unveil the undiscovered.</span>
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-3 text-sm text-zinc-400">
          <span className="h-px w-8 bg-zinc-600" />
          The BlogVista manifesto
        </figcaption>
      </figure>
    </div>
  );
};
