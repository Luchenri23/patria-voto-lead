import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import DashboardSection from "@/components/DashboardSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <LeadCaptureForm />
        <StatsSection />
        <AboutSection />
        <DashboardSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
