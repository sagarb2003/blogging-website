const TOPICS = [
  "Engineering",
  "Design",
  "Product",
  "Startups",
  "Rust",
  "Culture",
  "Travel",
  "AI",
  "Personal essays",
  "Open source",
  "Productivity",
  "Fiction",
];

export function TopicMarquee() {
  return (
    <section aria-label="Popular topics" className="border-y border-black/[0.06] bg-white/60 py-8">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
        Writers publish across every corner of the internet
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...TOPICS, ...TOPICS].map((topic, i) => (
            <span
              key={i}
              aria-hidden={i >= TOPICS.length}
              className="whitespace-nowrap rounded-full border border-black/[0.06] bg-white px-4 py-2 text-sm text-zinc-600 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <span className="mr-2 text-ember-500">#</span>
              {topic}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
