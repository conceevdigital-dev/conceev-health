import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustMetrics from "@/components/TrustMetrics";
import ProblemSection from "@/components/ProblemSection";
import SpecialtiesGrid from "@/components/SpecialtiesGrid";
import HowItWorks from "@/components/HowItWorks";
import FeaturedPackages from "@/components/FeaturedPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import PartnersAndDoctors from "@/components/PartnersAndDoctors";
import PackageInclusions from "@/components/PackageInclusions";
import Testimonials from "@/components/Testimonials";
import CityCoverage from "@/components/CityCoverage";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBottomBar from "@/components/MobileBottomBar";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <HeroSection />
      <TrustMetrics />
      <ProblemSection />
      <SpecialtiesGrid />
      <HowItWorks />
      <FeaturedPackages />
      <WhyChooseUs />
      <PartnersAndDoctors />
      <PackageInclusions />
      <Testimonials />
      <CityCoverage />
      <FAQSection />
      <FinalCTA />
    </main>
    <Footer />
    <WhatsAppButton />
    <MobileBottomBar />
  </div>
);

export default Index;
