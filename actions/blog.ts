"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { createBlogInput, updateBlogInput } from "@/lib/validations";
import { getUploadSignature } from "@/lib/cloudinary";

type ActionState = { error: string } | null;

export async function getCloudinarySignature() {
  await requireUser();
  return getUploadSignature();
}

export async function createBlog(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();

  const parsed = createBlogInput.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const post = await prisma.post.create({
    data: {
      title: parsed.data.title,
      content: parsed.data.content,
      thumbnail: parsed.data.thumbnail,
      authorName: user.name ?? "Anonymous",
      publishedDate: new Date().toISOString(),
      published: true,
      authorId: user.id,
    },
  });

  revalidatePath("/blogs");
  redirect(`/blog/${post.id}`);
}

export async function updateBlog(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();

  const parsed = updateBlogInput.safeParse({
    id: formData.get("id"),
    title: formData.get("title") || undefined,
    content: formData.get("content") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const { id, ...data } = parsed.data;

  const post = await prisma.post.findUnique({ where: { id }, select: { authorId: true } });
  if (!post || post.authorId !== user.id) {
    return { error: "You can only edit your own posts" };
  }

  await prisma.post.update({ where: { id }, data });

  revalidatePath("/blogs");
  revalidatePath(`/blog/${id}`);
  redirect(`/blog/${id}`);
}
