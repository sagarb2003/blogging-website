import Link from "next/link";
import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#stories", label: "Stories" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border border-black/[0.06] bg-white/70 pl-4 pr-2 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-black/[0.04] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/signin"
            className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:text-ink sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-ink px-3.5 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.2)] transition-all hover:bg-zinc-800"
          >
            Start writing
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <details className="group/menu relative md:hidden">
            <summary
              className="grid h-9 w-9 cursor-pointer list-none place-items-center rounded-lg text-zinc-700 hover:bg-black/[0.04] [&::-webkit-details-marker]:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-12 w-56 rounded-2xl border border-black/[0.06] bg-white p-2 shadow-xl">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
                >
                  {link.label}
                </a>
              ))}
              <Link href="/signin" className="block rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                Sign in
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
