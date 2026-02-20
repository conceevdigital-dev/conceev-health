import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Building2, UserCheck, ChevronDown } from "lucide-react";
import LeadFormModal from "./LeadFormModal";
import heroDoctor from "@/assets/hero-doctor.jpg";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent min-h-[600px]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <p className="text-primary-foreground/70 text-sm font-medium tracking-wider uppercase">
              Expert Women's Healthcare
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground">
              Curated Women's Surgery{" "}
              <span className="text-rose-light">Packages.</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-lg">
              Get transparent pricing on IVF, Gynecology & Maternity procedures at trusted partner hospitals.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="secondary" className="rounded-full text-base px-8" onClick={() => setFormOpen(true)}>
                Get Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <a href="#packages">View Packages</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { icon: Shield, label: "Transparent Pricing" },
                { icon: Building2, label: "Partner Hospitals" },
                { icon: UserCheck, label: "Dedicated Coordinator" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <Icon className="h-4 w-4 text-rose-light" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={heroDoctor} alt="Women's healthcare specialist" className="w-full h-[500px] object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/60 to-transparent h-32" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-4 border border-border">
              <p className="text-2xl font-bold text-primary">500+</p>
              <p className="text-xs text-muted-foreground">Women Assisted</p>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-primary-foreground/50" />
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
