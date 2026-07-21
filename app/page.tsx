import LayoutWrapper from "@/components/LayoutWrapper/LayoutWrapper";
import PreHero from "@/components/PreHero/PreHero";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProjectsSection from "@/components/ProjectSection/ProjectSection";
import QuoteSection from "@/components/QuoteSection/QuoteSection";
import TeamSection from "@/components/TeamSection/TeamSection";
import Footer from "@/components/Footer/Footer";
import DevDataToggle from "@/components/DevDataToggle/DevDataToggle";


async function getHeroImages() {
  const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${adminApiUrl}/api/hero-images`, {
      next: { revalidate: 10 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) {
      console.warn(`[getHeroImages] API returned status ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (data && Array.isArray(data.images)) {
      return data.images.map((img: any) => ({
        src: img.url,
        alt: img.alt || img.title || "Hero Image",
        title: img.title || "",
      }));
    }
    return null;
  } catch (error) {
    console.error("[getHeroImages] Failed to fetch hero images:", error);
    return null;
  }
}

async function getProjects() {
  const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${adminApiUrl}/api/projects`, {
      next: { revalidate: 10 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) {
      console.warn(`[getProjects] API returned status ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("[getProjects] Failed to fetch projects:", error);
    return null;
  }
}

async function getTeamMembers() {
  const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${adminApiUrl}/api/team`, {
      next: { revalidate: 10 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) {
      console.warn(`[getTeamMembers] API returned status ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("[getTeamMembers] Failed to fetch team members:", error);
    return null;
  }
}

export default async function Home() {
  const slides = await getHeroImages();
  const projects = await getProjects();
  const team = await getTeamMembers();

  return (
    <LayoutWrapper>
      <PreHero />
      <HeroSection slides={slides || undefined} />
      <AboutSection />
      <ProjectsSection projects={projects || undefined} />
      <QuoteSection />
      <TeamSection team={team || undefined} />
      <Footer />
      <DevDataToggle />
    </LayoutWrapper>
  );
}