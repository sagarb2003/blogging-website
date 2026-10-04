import { Plus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const FAQS = [
  {
    q: "Is BlogVista free to use?",
    a: "Yes. Creating an account, writing and publishing stories are all free.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "Not at all. If you can write an email, you can publish on BlogVista. There's nothing to install or configure.",
  },
  {
    q: "Can I add images to my posts?",
    a: "Every story can have a cover image. Uploads are optimised automatically and served quickly to readers everywhere.",
  },
  {
    q: "How do readers find my stories?",
    a: "Published stories appear in the community feed and are instantly searchable by every reader on BlogVista.",
  },
  {
    q: "Is my account secure?",
    a: "Passwords are hashed before they're stored and sessions use secure, httpOnly cookies that scripts can't read.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-black/[0.06] py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:[&>div]:mx-0 lg:[&>div]:text-left">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            description="Everything you need to know before you write your first story."
          />
        </div>
        <div className="divide-y divide-black/[0.06] border-y border-black/[0.06]">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5 [&::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-black/[0.08] text-zinc-500 transition-transform duration-300 group-open:rotate-45 group-open:bg-ink group-open:text-white">
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </summary>
              <p className="mt-3 max-w-xl pr-12 text-[15px] leading-relaxed text-zinc-600">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
