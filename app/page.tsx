import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import PreHero from "@/components/PreHero/PreHero";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProjectsSection from "@/components/ProjectSection/ProjectSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import TeamSection from "@/components/TeamSection/TeamSection";
import Footer from "@/components/Footer/Footer";


export default function Home() {

  return(
    <LayoutWrapper>
      <PreHero />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <QuoteSection />
      <TeamSection />
      <Footer />
    </LayoutWrapper>

  )
}