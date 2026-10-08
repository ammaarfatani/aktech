import { ProductEcosystem, FeaturedCaseStudy } from "@/sections/home/ProductEcosystem";
import { Hero } from "@/sections/home/Hero";
import { StudioIntro } from "@/sections/home/StudioIntro";
import { ServicesMarquee } from "@/sections/home/ServicesMarquee";
import { CreativeWorkSection } from "@/sections/home/CreativeWorkSection";
import { ServicesShowcase } from "@/sections/home/ServicesShowcase";
import { HowWeWork } from "@/sections/home/HowWeWork";
import { Testimonials } from "@/sections/home/Testimonials";
import { FAQ } from "@/sections/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <StudioIntro />
      <ServicesMarquee />
      <CreativeWorkSection />
      <ProductEcosystem />
      {/* <FeaturedCaseStudy /> */}
      <ServicesShowcase />
      <HowWeWork />
      <Testimonials />
      <FAQ />
    </>
  );
}
