import Header from "@/components/prefeitura/Header";
import HeroSection from "@/components/prefeitura/HeroSection";
import AboutSection from "@/components/prefeitura/AboutSection";
import WorkSection from "@/components/prefeitura/WorkSection";
import NewsSection from "@/components/prefeitura/NewsSection";
import SocialWall from "@/components/prefeitura/SocialWall";
import ContactSection from "@/components/prefeitura/ContactSection";
import Footer from "@/components/prefeitura/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <NewsSection />
        <SocialWall />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
