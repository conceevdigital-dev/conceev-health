import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Building2, UserCheck } from "lucide-react";
import LeadFormModal from "./LeadFormModal";

const HeroSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-light via-background to-purple-light">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Curated Women's Surgery Packages{" "}
              <span className="text-primary">Near You</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Affordable IVF, Gynecology & Maternity procedures in Bangalore & Hyderabad with trusted hospital partners.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-2xl text-base px-8" onClick={() => setFormOpen(true)}>
                Get Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl text-base px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                <a href="#packages">View Packages</a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { icon: Shield, label: "Transparent Pricing" },
                { icon: Building2, label: "Partner Hospitals" },
                { icon: UserCheck, label: "Dedicated Coordinator" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-border">
              <div className="text-center space-y-2 text-muted-foreground">
                <Building2 className="h-16 w-16 mx-auto text-primary/40" />
                <p className="text-sm">Doctor & Patient Image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default HeroSection;
