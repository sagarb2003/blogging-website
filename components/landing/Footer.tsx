import Link from "next/link";
import { Github, Heart, Twitter } from "lucide-react";
import { Logo } from "./Logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Stories", href: "#stories" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/signin" },
      { label: "Create account", href: "/signup" },
      { label: "Write a story", href: "/blog/publish" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
            A calm, beautiful home for writers and the readers who love them.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://github.com/sagarb2003"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-lg border border-black/[0.08] text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-ink"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://x.com/sagarb2003"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="grid h-9 w-9 place-items-center rounded-lg border border-black/[0.08] text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-ink"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-ink">{col.title}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a href={link.href} className="text-sm text-zinc-500 transition-colors hover:text-ink">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-zinc-500 transition-colors hover:text-ink">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} BlogVista. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 fill-ember-500 text-ember-500" /> by{" "}
            <span className="font-medium text-ink">Sagar</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
