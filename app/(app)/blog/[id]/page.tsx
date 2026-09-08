import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FullBlog } from "@/components/FullBlog";

async function getBlog(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) return { title: "Blog not found" };
  const excerpt = blog.content.slice(0, 160);
  return {
    title: blog.title,
    description: excerpt,
    openGraph: {
      title: blog.title,
      description: excerpt,
      images: blog.thumbnail ? [blog.thumbnail] : undefined,
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await getBlog(id);
  if (!blog) notFound();

  return (
    <FullBlog
      title={blog.title}
      authorName={blog.authorName}
      content={blog.content}
      thumbnail={blog.thumbnail ?? ""}
      publishedDate={blog.publishedDate ?? ""}
    />
  );
}
