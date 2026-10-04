function Bone({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-black/[0.06] ${className}`} />;
}

/** Placeholder for the stories grid while it streams in. */
export const BlogListSkeleton = () => {
  return (
    <main role="status" className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16">
      <Bone className="h-4 w-32" />
      <Bone className="mt-4 h-10 w-72" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="rounded-3xl border border-black/[0.06] bg-white p-2">
            <div className="aspect-[16/10] animate-pulse rounded-[18px] bg-black/[0.05]" />
            <div className="space-y-3 px-4 pb-4 pt-5">
              <Bone className="h-5 w-4/5" />
              <Bone className="h-3 w-full" />
              <Bone className="h-3 w-2/3" />
              <div className="flex items-center gap-2 pt-3">
                <Bone className="h-6 w-6" />
                <Bone className="h-3 w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading stories…</span>
    </main>
  );
};

/** Placeholder for a single article while it streams in. */
export const ArticleSkeleton = () => {
  return (
    <main role="status" className="pb-24 pt-14">
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 sm:px-6">
        <Bone className="h-3 w-40" />
        <Bone className="mt-6 h-10 w-full max-w-xl" />
        <Bone className="mt-3 h-10 w-2/3 max-w-md" />
        <div className="mt-8 flex items-center gap-3">
          <Bone className="h-8 w-8" />
          <Bone className="h-3 w-32" />
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6">
        <div className="aspect-[16/9] animate-pulse rounded-[28px] bg-black/[0.05]" />
      </div>
      <div className="mx-auto mt-14 max-w-[680px] space-y-4 px-4 sm:px-6">
        {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map((w, i) => (
          <Bone key={i} className={`h-3.5 ${w}`} />
        ))}
      </div>
      <span className="sr-only">Loading story…</span>
    </main>
  );
};
