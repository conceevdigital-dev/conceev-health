import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import LeadFormModal from "./LeadFormModal";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative bg-navy text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy opacity-90" />
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Welcome to Conceev Health, India's most trusted women's surgery experts.
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto">
            Affordable, transparent surgery packages in Bangalore & Hyderabad with trusted hospital partners.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button size="lg" className="rounded-full text-base px-8 bg-primary hover:bg-primary/90" onClick={() => setFormOpen(true)}>
              Get Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <a href="#packages">
                <Search className="h-4 w-4 mr-2" /> View Packages
              </a>
            </Button>
          </div>
        </div>
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
