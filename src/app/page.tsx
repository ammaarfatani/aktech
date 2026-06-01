import { Hero } from "@/sections/home/Hero";
import { Story } from "@/sections/home/Story";
import { Services } from "@/sections/home/Services";
import { CaseStudies } from "@/sections/home/CaseStudies";
import { Trust } from "@/sections/home/Trust";
import { FAQ } from "@/sections/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Services />
      <CaseStudies />
      <Trust />
      <FAQ />
    </>
  );
}
