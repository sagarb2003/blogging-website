import Image from "next/image";
import { Feather, ImageUp, Search, ShieldCheck, Zap, BookOpenText, Lock } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors hover:border-white/15 ${className}`}
    >
      {children}
    </div>
  );
}

function CardTitle({ icon: Icon, title, body }: { icon: React.ElementType; title: string; body: string }) {
  return (
    <div className="relative">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-ember-400">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-zinc-400">{body}</p>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 overflow-hidden bg-ink py-28 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,84,45,0.22),transparent)] blur-2xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Features"
          title={
            <>
              Everything you need to write.{" "}
              <span className="font-serif font-normal italic text-zinc-400">Nothing you don&apos;t.</span>
            </>
          }
          description="We sweated the details so you can focus on the words. Every part of BlogVista is designed to feel quiet, quick and considered."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {/* Editor */}
          <Card className="md:col-span-2">
            <CardTitle
              icon={Feather}
              title="An editor that gets out of your way"
              body="A clean, distraction-free canvas for essays, tutorials and fiction. Title, cover, words — publish."
            />
            <div className="relative mt-8 rounded-2xl border border-white/[0.08] bg-black/40 p-5 font-serif">
              <p className="text-2xl text-white">The quiet art of shipping</p>
              <p className="mt-3 font-sans text-sm leading-6 text-zinc-400">
                Great work rarely arrives all at once. It shows up in drafts, in second passes, in the small
                decision to press publish anyway
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-ember-400" />
              </p>
              <div className="absolute -top-3 right-5 rounded-full border border-white/10 bg-zinc-900 px-3 py-1 font-sans text-xs text-zinc-300">
                Title · Cover · Words
              </div>
            </div>
          </Card>

          {/* Covers */}
          <Card>
            <CardTitle
              icon={ImageUp}
              title="Covers that stop the scroll"
              body="Drag in an image and it's optimised and served from a global CDN automatically."
            />
            <div className="mt-8 rounded-2xl border border-dashed border-white/15 p-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-zinc-800">
                <Image
                  src="/image-2.jpeg"
                  alt=""
                  fill
                  sizes="320px"
                  className="origin-[5%_50%] scale-[2.9] object-cover object-left transition-transform duration-700 group-hover:scale-[3.1]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                <span>cover.jpg</span>
                <span className="text-emerald-400">Uploaded</span>
              </div>
            </div>
          </Card>

          {/* Search */}
          <Card>
            <CardTitle
              icon={Search}
              title="Find anything, instantly"
              body="Search every story as you type. No reloads, no waiting."
            />
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40">
              <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3 text-sm">
                <Search className="h-4 w-4 text-zinc-500" />
                <span className="text-white">rust</span>
                <span className="h-4 w-px animate-pulse bg-ember-400" />
              </div>
              {["Learn Rust by coding Connect 4", "Rust ownership, explained simply"].map((t) => (
                <div key={t} className="px-4 py-2.5 text-sm text-zinc-400 first:bg-white/[0.04] first:text-zinc-200">
                  {t}
                </div>
              ))}
            </div>
          </Card>

          {/* Speed */}
          <Card>
            <CardTitle
              icon={Zap}
              title="Fast by default"
              body="Stories are rendered on the server and streamed to readers, so pages feel instant."
            />
            <div className="mt-8 flex h-[108px] items-end gap-2">
              {[38, 52, 44, 68, 60, 82, 74, 96].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-ember-500/20 to-ember-400/80 opacity-70 transition-opacity group-hover:opacity-100"
                />
              ))}
            </div>
          </Card>

          {/* Security */}
          <Card>
            <CardTitle
              icon={ShieldCheck}
              title="Private & secure"
              body="Hashed passwords and httpOnly session cookies keep your account yours."
            />
            <div className="mt-8 flex h-[108px] items-center justify-center">
              <div className="relative grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <span className="absolute inset-0 animate-ping rounded-2xl border border-ember-400/30 [animation-duration:3s]" />
                <Lock className="h-8 w-8 text-white" />
              </div>
            </div>
          </Card>

          {/* Reading */}
          <Card className="md:col-span-3">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <CardTitle
                icon={BookOpenText}
                title="Reading that feels like print"
                body="Generous typography, comfortable line lengths and zero clutter. Your readers stay for the story, not the sidebar."
              />
              <div className="rounded-2xl border border-white/[0.08] bg-paper p-6 text-ink">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">Essay · 6 min read</p>
                <p className="mt-3 font-serif text-3xl leading-tight">UX is easy, but we made it complicated</p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  <span className="float-left mr-2 font-serif text-5xl leading-[0.8] text-ember-500">I</span>t has
                  been striking to observe how, over time, the relationship between companies and the people they
                  build for has quietly drifted apart.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
