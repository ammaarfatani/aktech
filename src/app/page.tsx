import { ProductEcosystem } from "@/sections/home/ProductEcosystem";
import { Hero } from "@/sections/home/Hero";
import { StudioIntro } from "@/sections/home/StudioIntro";
import { ServicesMarquee } from "@/sections/home/ServicesMarquee";
import { CreativeWorkSection } from "@/sections/home/CreativeWorkSection";
import { ServicesShowcase } from "@/sections/home/ServicesShowcase";
import { HowWeWork } from "@/sections/home/HowWeWork";
import { WhyAKTECH } from "@/sections/home/WhyAKTECH";
import { InsightsPreview } from "@/sections/home/InsightsPreview";
import { FAQ } from "@/sections/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <ServicesMarquee />
      <CreativeWorkSection />
      <ProductEcosystem />
      <ServicesShowcase />
      <HowWeWork />
      <WhyAKTECH />
      <InsightsPreview />
      <FAQ />
    </>
  );
}
