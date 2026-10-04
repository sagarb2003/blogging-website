import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { TopicMarquee } from "@/components/landing/TopicMarquee";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Stories } from "@/components/landing/Stories";
import { Manifesto } from "@/components/landing/Manifesto";
import { Faq } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-ember-100 selection:text-ink">
      <Nav />
      <main>
        <Hero />
        <TopicMarquee />
        <Features />
        <HowItWorks />
        <Stories />
        <Manifesto />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
