import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/BlogCard";

export const metadata: Metadata = { title: "Blogs" };

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const blogs = await prisma.post.findMany({
    where: q ? { title: { contains: q, mode: "insensitive" } } : undefined,
    orderBy: { publishedDate: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 py-16">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {blogs.map((blog) => (
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
      )}
    </div>
  );
}
