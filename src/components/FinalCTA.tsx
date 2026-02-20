import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadFormModal from "./LeadFormModal";
import happyPatient from "@/assets/happy-patient.jpg";

const FinalCTA = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="relative bg-gradient-to-r from-primary to-accent py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <p className="text-primary-foreground/70 text-sm font-medium tracking-wider uppercase mb-2">Book Now</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Book a Free Consultation with Our Experts.
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg">
                Speak to our care team today. Limited partner hospital slots available.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button size="lg" variant="secondary" className="rounded-full text-base px-8" onClick={() => setFormOpen(true)}>
                  Book Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone className="h-4 w-4 mr-2" /> Call Now
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img src={happyPatient} alt="Happy patient" className="rounded-3xl shadow-2xl w-full max-w-md mx-auto object-cover h-80" />
            </div>
          </div>
        </div>
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default FinalCTA;
