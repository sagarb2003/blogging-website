import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, PenLine } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const STORIES = [
  { src: "/image-1.jpeg", alt: "UX is easy, but we made it complicated — by Kike Pena", w: 1182, h: 508 },
  { src: "/image-2.jpeg", alt: "Learn Rust by coding a command line Connect 4 game — by Bret Cameron", w: 1186, h: 504 },
  { src: "/image-3.jpeg", alt: "How I Won Singapore's GPT-4 Prompt Engineering Competition — by Sheila Teo", w: 1166, h: 496 },
];

export function Stories() {
  return (
    <section id="stories" className="relative scroll-mt-24 overflow-hidden border-t border-black/[0.06] bg-white py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="md:text-left [&>div]:md:mx-0 [&>div]:md:text-left">
            <SectionHeading
              eyebrow="From the community"
              title={
                <>
                  Stories readers <span className="font-serif font-normal italic text-ember-500">can&apos;t put down</span>
                </>
              }
            />
          </div>
          <Link
            href="/signin"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-zinc-50"
          >
            Browse all stories
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <StoryCard story={STORIES[0]} />
            <StoryCard story={STORIES[2]} />
          </div>
          <div className="space-y-5 lg:pt-24">
            <StoryCard story={STORIES[1]} />
            <Link
              href="/signup"
              className="group flex flex-col items-start justify-between gap-8 rounded-3xl border border-dashed border-black/15 bg-paper p-8 transition-colors hover:border-ember-500/50 hover:bg-ember-50/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white">
                <PenLine className="h-4 w-4" />
              </span>
              <div>
                <p className="font-serif text-3xl leading-tight text-ink">Your story could be next.</p>
                <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-ember-600">
                  Start writing
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story }: { story: (typeof STORIES)[number] }) {
  return (
    <Link
      href="/signin"
      className="group relative block overflow-hidden rounded-3xl border border-black/[0.06] bg-zinc-50 p-3 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(12,12,14,0.35)]"
    >
      <Image
        src={story.src}
        alt={story.alt}
        width={story.w}
        height={story.h}
        sizes="(max-width: 1024px) 100vw, 560px"
        className="w-full rounded-2xl"
      />
      <span className="absolute right-6 top-6 grid h-9 w-9 scale-90 place-items-center rounded-full bg-ink text-white opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
