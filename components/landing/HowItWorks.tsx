import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Create your account",
    body: "Sign up with just an email and password. Your writing desk is ready the moment you land.",
  },
  {
    n: "02",
    title: "Write your story",
    body: "Give it a title, drop in a cover, and let the words flow in a calm, focused editor.",
  },
  {
    n: "03",
    title: "Publish & be discovered",
    body: "Hit publish and your story goes live instantly — searchable, beautiful and ready to share.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From blank page to published in{" "}
              <span className="font-serif font-normal italic text-ember-500">three steps</span>
            </>
          }
        />

        <ol className="relative mt-16 grid gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[35px] hidden h-px bg-gradient-to-r from-transparent via-black/10 to-transparent md:block"
          />
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="relative rounded-3xl border border-black/[0.06] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
            >
              <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-ink font-mono text-sm text-white">
                {step.n}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
