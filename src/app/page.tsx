import { Hero } from "@/sections/home/Hero";
import { Story } from "@/sections/home/Story";
import { Services } from "@/sections/home/Services";
import { CaseStudies } from "@/sections/home/CaseStudies";
import { Trust } from "@/sections/home/Trust";
import { Testimonials } from "@/sections/home/Testimonials";
import { FAQ } from "@/sections/home/FAQ";
import { Marquee } from "@/components/shared/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Story />
      <Services />
      <CaseStudies />
      <Trust />
      <Testimonials />
      <FAQ />
    </>
  );
}
