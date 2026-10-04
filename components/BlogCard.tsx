import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { formatDate, readingTime } from "@/lib/format";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  thumbnail: string;
  /** Renders a wide, two-column hero card for the lead story. */
  featured?: boolean;
}

export const BlogCard = ({ id, authorName, title, content, publishedDate, thumbnail, featured = false }: BlogCardProps) => {
  const { minutes } = readingTime(content);
  const date = formatDate(publishedDate);

  return (
    <Link
      href={`/blog/${id}`}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(12,12,14,0.3)] ${
        featured ? "md:grid md:grid-cols-[1.25fr_1fr] md:items-center md:gap-4" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-[18px] bg-zinc-100 ${
          featured ? "aspect-[16/10] md:aspect-[4/3]" : "aspect-[16/10]"
        }`}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 640px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            priority={featured}
          />
        ) : (
          <div className="absolute inset-0 bg-[#140b10] bg-[radial-gradient(60%_80%_at_20%_20%,rgba(255,122,77,0.85),transparent_65%),radial-gradient(55%_75%_at_85%_25%,rgba(217,70,239,0.7),transparent_65%),radial-gradient(70%_70%_at_50%_115%,rgba(56,189,248,0.6),transparent_60%)]" />
        )}
        <span className="absolute right-3 top-3 grid h-9 w-9 scale-90 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-lg backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className={`flex flex-1 flex-col px-4 pb-4 pt-5 ${featured ? "md:px-6 md:py-6" : ""}`}>
        {featured && (
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-ember-50 px-2.5 py-1 text-xs font-medium text-ember-600">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-500" />
            Latest story
          </span>
        )}
        <h2
          className={`text-balance font-semibold tracking-[-0.02em] text-ink ${
            featured ? "text-2xl leading-tight sm:text-3xl md:text-4xl" : "text-lg leading-snug"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-3 text-pretty leading-relaxed text-zinc-500 ${
            featured ? "line-clamp-3 text-[15px] md:text-base" : "line-clamp-2 text-sm"
          }`}
        >
          {content}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar name={authorName} size="sm" />
            <span className="truncate font-medium text-zinc-700">{authorName}</span>
          </div>
          <span className="shrink-0 text-xs text-zinc-500">
            {date ? `${date} · ` : ""}
            {minutes} min
          </span>
        </div>
      </div>
    </Link>
  );
};
