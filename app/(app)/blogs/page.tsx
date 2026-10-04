import type { Metadata } from "next";
import Link from "next/link";
import { PenLine, SearchX } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/session";
import { BlogCard } from "@/components/BlogCard";

export const metadata: Metadata = { title: "Blogs" };

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const [blogs, user] = await Promise.all([
    prisma.post.findMany({
      where: q ? { title: { contains: q, mode: "insensitive" } } : undefined,
      orderBy: { publishedDate: "desc" },
    }),
    getUser(),
  ]);

  const firstName = user?.name?.split(" ")[0];
  const [lead, ...rest] = blogs;
  const showFeatured = !q && blogs.length > 2;
  const grid = showFeatured ? rest : blogs;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="animate-fade-up">
          {q ? (
            <>
              <p className="text-sm font-medium text-ember-600">Search results</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
                {blogs.length} {blogs.length === 1 ? "story" : "stories"} for{" "}
                <span className="font-serif font-normal italic text-ember-500">&ldquo;{q}&rdquo;</span>
              </h1>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-ember-600">{firstName ? `Welcome back, ${firstName}` : "Welcome back"}</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
                Today&apos;s <span className="font-serif font-normal italic text-ember-500">stories</span>
              </h1>
              <p className="mt-3 text-[15px] text-zinc-500">Fresh writing from the BlogVista community.</p>
            </>
          )}
        </div>
        {blogs.length > 0 && (
          <Link
            href="/blog/publish"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 text-sm font-medium text-ink shadow-sm transition-colors hover:bg-zinc-50"
          >
            <PenLine className="h-4 w-4" />
            Write a story
          </Link>
        )}
      </header>

      {blogs.length === 0 ? (
        <EmptyState query={q} />
      ) : (
        <div className="mt-12 space-y-6">
          {showFeatured && lead && (
            <BlogCard
              featured
              id={lead.id}
              authorName={lead.authorName}
              title={lead.title}
              content={lead.content}
              publishedDate={lead.publishedDate ?? ""}
              thumbnail={lead.thumbnail ?? ""}
            />
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.authorName}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate ?? ""}
                thumbnail={blog.thumbnail ?? ""}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

function EmptyState({ query }: { query?: string }) {
  return (
    <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-black/10 bg-white/60 px-6 py-20 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white">
        {query ? <SearchX className="h-6 w-6" /> : <PenLine className="h-6 w-6" />}
      </span>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
        {query ? "No stories match your search" : "No stories yet"}
      </h2>
      <p className="mt-2 max-w-sm text-[15px] text-zinc-500">
        {query
          ? "Try a different keyword, or be the first to write about it."
          : "The page is blank and waiting. Be the first to publish something worth reading."}
      </p>
      <Link
        href="/blog/publish"
        className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        <PenLine className="h-4 w-4" />
        Write a story
      </Link>
    </div>
  );
}
