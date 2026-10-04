export function Manifesto() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span aria-hidden className="font-serif text-7xl leading-none text-ember-500">&ldquo;</span>
        <blockquote className="-mt-4 text-balance font-serif text-4xl leading-[1.15] tracking-[-0.01em] text-ink sm:text-5xl md:text-6xl">
          Read the unseen, explore the unknown.{" "}
          <span className="italic text-zinc-400">Write your thoughts, unveil the undiscovered.</span>
        </blockquote>
        <p className="mt-10 inline-flex items-center gap-3 text-sm text-zinc-500">
          <span className="h-px w-8 bg-zinc-300" />
          The BlogVista manifesto
          <span className="h-px w-8 bg-zinc-300" />
        </p>
      </div>
    </section>
  );
}
