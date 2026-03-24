import PreHero from "@/components/PreHero/PreHero";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import TeamSection from "@/components/TeamSection/TeamSection";
import BlogsSection from "@/components/BlogsSection/BlogsSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <PreHero />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <QuoteSection />
      <TeamSection />
      <BlogsSection />
      <Footer />
    </div>
  );
}
