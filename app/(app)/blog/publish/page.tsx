import type { Metadata } from "next";
import { CreateBlogForm } from "@/components/CreateBlogForm";

export const metadata: Metadata = { title: "Publish a blog" };

export default function PublishPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <div className="mb-10 animate-fade-up">
        <p className="text-sm font-medium text-ember-600">New story</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
          What&apos;s on your <span className="font-serif font-normal italic text-ember-500">mind</span>?
        </h1>
      </div>
      <CreateBlogForm />
    </main>
  );
}
