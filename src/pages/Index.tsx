import { lazy, Suspense } from "react";
import Header from "@/components/prefeitura/Header";
import HeroSection from "@/components/prefeitura/HeroSection";
import { useSiteSections } from "@/hooks/useSiteContent";

const AboutSection = lazy(() => import("@/components/prefeitura/AboutSection"));
const WorkSection = lazy(() => import("@/components/prefeitura/WorkSection"));
const NewsSection = lazy(() => import("@/components/prefeitura/NewsSection"));
const SocialWall = lazy(() => import("@/components/prefeitura/SocialWall"));
const ContactSection = lazy(() => import("@/components/prefeitura/ContactSection"));
const Footer = lazy(() => import("@/components/prefeitura/Footer"));

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

const Index = () => {
  const { data: sections } = useSiteSections();

  const isVisible = (key: string) => {
    if (!sections) return true;
    const section = sections.find(s => s.section_key === key);
    return section ? section.visible : true;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {isVisible("hero") && <HeroSection />}
        <Suspense fallback={<SectionFallback />}>
          {isVisible("about") && <AboutSection />}
          {isVisible("work") && <WorkSection />}
          {isVisible("news") && <NewsSection />}
          {isVisible("social") && <SocialWall />}
          {isVisible("contact") && <ContactSection />}
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
