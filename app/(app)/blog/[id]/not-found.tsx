import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Blog not found</h1>
      <p className="text-gray-500 mb-6">This post may have been removed.</p>
      <Link href="/blogs" className="text-blue-600 underline">
        Back to blogs
      </Link>
    </div>
  );
}
