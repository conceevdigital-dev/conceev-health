import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SpecialtiesGrid from "@/components/SpecialtiesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import TrustMetrics from "@/components/TrustMetrics";
import FeaturedPackages from "@/components/FeaturedPackages";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import BlogInsights from "@/components/BlogInsights";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomBar from "@/components/MobileBottomBar";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <HeroSection />
      <ProblemSection />
      <SpecialtiesGrid />
      <WhyChooseUs />
      <TrustMetrics />
      <FeaturedPackages />
      <Testimonials />
      <FAQSection />
      <BlogInsights />
      <FinalCTA />
    </main>
    <Footer />
    <WhatsAppButton />
    <MobileBottomBar />
  </div>
);

export default Index;
