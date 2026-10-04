"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Link2, PenLine } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar } from "@/components/Avatar";
import { formatDate, readingTime } from "@/lib/format";

interface FullBlogProps {
  title: string;
  content: string;
  authorName: string;
  thumbnail: string;
  publishedDate: string;
}

export const FullBlog = ({ title, content, authorName, thumbnail, publishedDate }: FullBlogProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);

  const { words, minutes } = readingTime(content);
  const date = formatDate(publishedDate);
  const paragraphs = content.split("\n").filter((p) => p.trim());

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Couldn't copy the link");
    }
  };

  const actions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setIsLiked((prev) => !prev)}
        aria-pressed={isLiked}
        className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-all ${
          isLiked
            ? "border-ember-500/20 bg-ember-50 text-ember-600"
            : "border-black/[0.08] bg-white text-zinc-600 hover:text-ink"
        }`}
      >
        <Heart className={`h-4 w-4 transition-transform ${isLiked ? "scale-110 fill-current" : ""}`} />
        {isLiked ? "Liked" : "Like"}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 text-sm font-medium text-zinc-600 transition-colors hover:text-ink"
      >
        <Link2 className="h-4 w-4" />
        Share
      </button>
    </div>
  );

  return (
    <>
      {/* Reading progress */}
      <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-0.5">
        <div
          className="h-full origin-left bg-gradient-to-r from-ember-400 to-ember-600"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <article className="pb-24">
        <header className="mx-auto max-w-3xl px-4 pt-10 text-center sm:px-6 sm:pt-14">
          <button
            onClick={() => router.back()}
            className="group mb-10 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to stories
          </button>

          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.16em] text-ember-600">
            {minutes} min read · {words.toLocaleString()} words
          </p>
          <h1 className="mt-5 animate-fade-up text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-ink [animation-delay:60ms] sm:text-5xl md:text-[56px]">
            {title}
          </h1>

          <div className="mt-8 flex animate-fade-up flex-col items-center justify-center gap-4 [animation-delay:120ms] sm:flex-row sm:gap-6">
            <div className="flex items-center gap-3 text-left">
              <Avatar name={authorName} />
              <div>
                <p className="text-sm font-medium text-ink">{authorName}</p>
                {date && <p className="text-xs text-zinc-500">{date}</p>}
              </div>
            </div>
            <span className="hidden h-8 w-px bg-black/[0.08] sm:block" />
            {actions}
          </div>
        </header>

        {thumbnail && (
          <div className="mx-auto mt-12 max-w-5xl animate-fade-up px-4 [animation-delay:180ms] sm:px-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-black/[0.06] bg-zinc-100 shadow-[0_40px_80px_-40px_rgba(12,12,14,0.35)]">
              <Image src={thumbnail} alt={title} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" priority />
            </div>
          </div>
        )}

        <div className="mx-auto mt-14 max-w-[680px] px-4 sm:px-6">
          <div className="text-[18px] leading-[1.8] text-zinc-800 sm:text-[19px] [&>p+p]:mt-7 [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-3 [&>p:first-child]:first-letter:mt-1 [&>p:first-child]:first-letter:font-serif [&>p:first-child]:first-letter:text-[64px] [&>p:first-child]:first-letter:leading-[0.8] [&>p:first-child]:first-letter:text-ember-500">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-center gap-3 text-zinc-300" aria-hidden>
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
          </div>

          <footer className="mt-16 rounded-3xl border border-black/[0.06] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Avatar name={authorName} size="lg" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">Written by</p>
                  <p className="mt-1 text-lg font-semibold tracking-tight text-ink">{authorName}</p>
                  {date && <p className="text-sm text-zinc-500">Published {date}</p>}
                </div>
              </div>
              {actions}
            </div>
          </footer>

          <div className="relative mt-8 overflow-hidden rounded-3xl bg-ink p-8 text-center sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,84,45,0.45),transparent)] blur-2xl"
            />
            <p className="relative font-serif text-3xl text-white sm:text-4xl">
              Have a story of your <span className="italic text-ember-400">own</span>?
            </p>
            <div className="relative mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/blog/publish"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-ink transition-colors hover:bg-zinc-100"
              >
                <PenLine className="h-4 w-4" />
                Start writing
              </Link>
              <Link
                href="/blogs"
                className="inline-flex h-10 items-center rounded-xl border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
              >
                Read more stories
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
