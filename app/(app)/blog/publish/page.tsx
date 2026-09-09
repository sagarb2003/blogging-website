import type { Metadata } from "next";
import { CreateBlogForm } from "@/components/CreateBlogForm";

export const metadata: Metadata = { title: "Publish a blog" };

export default function PublishPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Blog Post</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>
        <CreateBlogForm />
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">💡 Writing Tips</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Use a compelling title that grabs attention</li>
            <li>• Break your content into paragraphs for better readability</li>
            <li>• Choose a high-quality thumbnail that represents your content</li>
            <li>• Proofread before publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
