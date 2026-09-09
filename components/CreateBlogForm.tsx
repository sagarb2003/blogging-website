"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { Upload, ImageIcon, FileText, Eye, X, CheckCircle, Loader2 } from "lucide-react";
import { createBlog, getCloudinarySignature } from "@/actions/blog";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Publishing...
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <FileText className="w-5 h-5 mr-2" />
          Publish Blog Post
        </div>
      )}
    </button>
  );
}

export const CreateBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");

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
    <form action={formAction} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="flex items-center text-lg font-semibold text-gray-700">
          <FileText className="w-5 h-5 mr-2 text-purple-600" />
          Blog Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter an engaging title"
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="flex items-center text-lg font-semibold text-gray-700">
          <Eye className="w-5 h-5 mr-2 text-green-600" />
          Content
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Write your blog content here..."
          rows={8}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 resize-vertical"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center text-lg font-semibold text-gray-700">
          <ImageIcon className="w-5 h-5 mr-2 text-orange-600" />
          Thumbnail Image
        </label>
        <input type="hidden" name="thumbnail" value={thumbnail} />
        {!previewImage ? (
          <div className="relative">
            <input
              type="file"
              id="thumbnail-file"
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <label
              htmlFor="thumbnail-file"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer bg-orange-50 hover:bg-orange-100 transition-all duration-200"
            >
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-2" />
                  <p className="text-orange-600 font-medium">Uploading...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-12 h-12 text-orange-600 mb-2" />
                  <p className="text-orange-600 font-medium">Click to upload image</p>
                  <p className="text-orange-400 text-sm mt-1">JPG, PNG, GIF, WEBP (Max 5MB)</p>
                </div>
              )}
            </label>
          </div>
        ) : (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- local data: URL preview, not an optimizable remote image */}
            <img src={previewImage} alt="Preview" className="w-full h-48 object-cover rounded-xl border-2 border-orange-200" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 bg-green-500 text-white rounded-full p-1">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>

      {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <div className="pt-2">
        <SubmitButton disabled={!thumbnail || isUploading} />
      </div>
    </form>
  );
};
