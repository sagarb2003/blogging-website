"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, PenLine, LogOut, Loader2, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { signOut } from "@/actions/auth";
import { Logo } from "@/components/landing/Logo";
import { Avatar } from "@/components/Avatar";

export const Appbar = ({ user }: { user: { name: string | null; email: string } }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const displayName = user.name || user.email.split("@")[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) params.set("q", value);
    else params.delete("q");
    startTransition(() => {
      router.replace(`/blogs?${params.toString()}`);
    });
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Logo href="/blogs" compact />

        <div className="relative ml-auto w-full max-w-xs sm:ml-0 sm:max-w-sm sm:flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
            ) : (
              <Search className="h-4 w-4 text-zinc-400" />
            )}
          </div>
          <input
            type="search"
            aria-label="Search stories"
            className="block h-10 w-full rounded-xl border border-black/[0.07] bg-white/80 pl-10 pr-3 text-sm text-ink shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-ember-500/50 focus:bg-white focus:ring-4 focus:ring-ember-500/10"
            placeholder="Search stories…"
            defaultValue={searchParams.get("q") ?? ""}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex items-center gap-2 sm:ml-auto">
          {pathname !== "/blog/publish" && (
            <Link
              href="/blog/publish"
              aria-label="Write a story"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-ink px-3 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors hover:bg-zinc-800 sm:px-4"
            >
              <PenLine className="h-4 w-4" />
              <span className="hidden sm:inline">Write</span>
            </Link>
          )}

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-label="Account menu"
              aria-expanded={isDropdownOpen}
              className="grid h-10 w-10 place-items-center rounded-full transition-opacity hover:opacity-85"
            >
              <Avatar name={displayName} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-64 origin-top-right animate-fade-up rounded-2xl border border-black/[0.06] bg-white p-1.5 shadow-[0_20px_50px_-15px_rgba(12,12,14,0.25)] [animation-duration:200ms]">
                <div className="flex items-center gap-3 px-3 py-3">
                  <Avatar name={displayName} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{displayName}</p>
                    <p className="truncate text-xs text-zinc-500">{user.email}</p>
                  </div>
                </div>
                <div className="my-1 h-px bg-black/[0.06]" />
                <Link
                  href="/blogs"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  <BookOpen className="h-4 w-4 text-zinc-400" />
                  All stories
                </Link>
                <Link
                  href="/blog/publish"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                  <PenLine className="h-4 w-4 text-zinc-400" />
                  Write a story
                </Link>
                <div className="my-1 h-px bg-black/[0.06]" />
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
