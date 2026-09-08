import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h1>
      <Link href="/" className="text-blue-600 underline">
        Go home
      </Link>
    </div>
  );
}
