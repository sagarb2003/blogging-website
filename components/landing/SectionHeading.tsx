export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] ${
          dark ? "text-ember-400" : "text-ember-600"
        }`}
      >
        <span className="h-px w-6 bg-current opacity-50" />
        {eyebrow}
        <span className="h-px w-6 bg-current opacity-50" />
      </p>
      <h2
        className={`mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-pretty text-lg leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
