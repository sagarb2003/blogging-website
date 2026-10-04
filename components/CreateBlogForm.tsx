"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { AlertCircle, Check, ImagePlus, Loader2, Send, X } from "lucide-react";
import { createBlog, getCloudinarySignature } from "@/actions/blog";
import { readingTime } from "@/lib/format";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_-12px_rgba(12,12,14,0.6)] transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:shadow-none"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Publishing…
        </>
      ) : (
        <>
          <Send className="h-4 w-4 transition-transform group-enabled:group-hover:translate-x-0.5" />
          Publish story
        </>
      )}
    </button>
  );
}

export const CreateBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { words, minutes } = readingTime(content);
  const checklist = [
    { label: "Add a title", done: title.trim().length > 0 },
    { label: "Upload a cover image", done: Boolean(thumbnail) },
    { label: "Write your story", done: content.trim().length > 0 },
  ];

  const validateImageFile = (file: File) => {
    const validExtensions = ["jpg", "jpeg", "png", "gif", "webp", "bmp"];
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!validExtensions.includes(ext)) {
      toast.error(`Invalid file type. Please upload: ${validExtensions.join(", ").toUpperCase()}`);
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return false;
    }
    return true;
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!validateImageFile(file)) {
      event.target.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);

      const { cloudName, apiKey, timestamp, folder, signature } = await getCloudinarySignature();

      const data = new FormData();
      data.append("file", file);
      data.append("api_key", apiKey);
      data.append("timestamp", String(timestamp));
      data.append("folder", folder);
      data.append("signature", signature);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Upload failed");
      const uploaded = await res.json();
      setThumbnail(uploaded.secure_url);
      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Failed to upload image. Please try again.");
      setPreviewImage("");
      event.target.value = "";
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setThumbnail("");
    setPreviewImage("");
  };

  return (
    <form action={formAction} className="grid gap-8 lg:grid-cols-[1fr_300px] lg:gap-12">
      <div className="min-w-0">
        {/* Cover */}
        <input type="hidden" name="thumbnail" value={thumbnail} />
        {!previewImage ? (
          <div>
            <input
              type="file"
              id="thumbnail-file"
              onChange={handleImageUpload}
              accept="image/*"
              className="peer sr-only"
            />
            <label
              htmlFor="thumbnail-file"
              className="group flex aspect-[16/7] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-black/15 bg-white/60 text-center transition-colors hover:border-ember-500/50 hover:bg-ember-50/40 peer-focus-visible:ring-4 peer-focus-visible:ring-ember-500/20"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-zinc-500 shadow-sm ring-1 ring-black/[0.06] transition-colors group-hover:text-ember-500">
                <ImagePlus className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-medium text-ink">Add a cover image</p>
              <p className="mt-1 text-xs text-zinc-500">JPG, PNG, GIF or WEBP · up to 5MB</p>
            </label>
          </div>
        ) : (
          <div className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-black/[0.06] bg-zinc-100">
            {/* eslint-disable-next-line @next/next/no-img-element -- local data: URL preview, not an optimizable remote image */}
            <img src={previewImage} alt="Cover preview" className="h-full w-full object-cover" />
            {isUploading && (
              <div className="absolute inset-0 grid place-items-center bg-white/60 backdrop-blur-sm">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-lg">
                  <Loader2 className="h-4 w-4 animate-spin text-ember-500" />
                  Uploading…
                </span>
              </div>
            )}
            {!isUploading && (
              <>
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow backdrop-blur">
                  <Check className="h-3.5 w-3.5" />
                  Cover uploaded
                </span>
                <button
                  type="button"
                  onClick={removeImage}
                  aria-label="Remove cover image"
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-zinc-700 shadow backdrop-blur transition-colors hover:bg-white hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        )}

        {/* Title */}
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your story's title"
          className="mt-10 w-full bg-transparent text-4xl font-semibold tracking-[-0.03em] text-ink outline-none placeholder:text-zinc-300 sm:text-5xl"
          required
        />

        {/* Content */}
        <label htmlFor="content" className="sr-only">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell your story…"
          rows={14}
          className="mt-6 field-sizing-content min-h-[50vh] w-full resize-none bg-transparent text-[18px] leading-[1.8] text-zinc-800 outline-none placeholder:text-zinc-300"
          required
        />
      </div>

      {/* Sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400">Ready to publish</p>
          <ul className="mt-4 space-y-3">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <span
                  className={`grid h-5 w-5 place-items-center rounded-full transition-colors ${
                    item.done ? "bg-emerald-500 text-white" : "border border-black/10 text-transparent"
                  }`}
                >
                  <Check className="h-3 w-3" />
                </span>
                <span className={item.done ? "text-zinc-400 line-through" : "text-zinc-700"}>{item.label}</span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-black/[0.06] pt-5 text-sm">
            <div>
              <dt className="text-xs text-zinc-400">Words</dt>
              <dd className="mt-0.5 font-medium tabular-nums text-ink">{content.trim() ? words.toLocaleString() : 0}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-400">Reading time</dt>
              <dd className="mt-0.5 font-medium text-ink">{content.trim() ? `${minutes} min` : "—"}</dd>
            </div>
          </dl>

          {state?.error && (
            <p
              role="alert"
              className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {state.error}
            </p>
          )}

          <div className="mt-5">
            <SubmitButton disabled={!thumbnail || isUploading} />
          </div>
        </div>

        <div className="mt-4 rounded-3xl border border-black/[0.06] bg-white/60 p-5">
          <p className="font-serif text-xl text-ink">Writing tips</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-500">
            <li>Lead with a title that makes a promise.</li>
            <li>Keep paragraphs short — press Enter often.</li>
            <li>Pick a cover that sets the mood.</li>
            <li>Read it aloud once before you publish.</li>
          </ul>
        </div>
      </aside>
    </form>
  );
};
