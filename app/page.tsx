import { Hero } from "@/components/home/hero";
import { FeaturedProject } from "@/components/home/featured-project";
import { Catalog } from "@/components/home/catalog";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProject />
      <Catalog />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
