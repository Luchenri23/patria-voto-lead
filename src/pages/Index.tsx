import Header from "@/components/prefeitura/Header";
import HeroSection from "@/components/prefeitura/HeroSection";
import AboutSection from "@/components/prefeitura/AboutSection";
import WorkSection from "@/components/prefeitura/WorkSection";
import NewsSection from "@/components/prefeitura/NewsSection";
import SocialWall from "@/components/prefeitura/SocialWall";
import ContactSection from "@/components/prefeitura/ContactSection";
import Footer from "@/components/prefeitura/Footer";
import { useSiteSections } from "@/hooks/useSiteContent";

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
        {isVisible("about") && <AboutSection />}
        {isVisible("work") && <WorkSection />}
        {isVisible("news") && <NewsSection />}
        {isVisible("social") && <SocialWall />}
        {isVisible("contact") && <ContactSection />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
