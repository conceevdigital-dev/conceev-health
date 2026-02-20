import { useState } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadFormModal from "./LeadFormModal";

const FinalCTA = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contact" className="bg-gradient-to-r from-primary to-accent py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Get the Right Treatment at the Right Price
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
          Speak to our care team today. Limited partner hospital slots available.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" className="rounded-2xl text-base px-8" onClick={() => setFormOpen(true)}>
            Book Free Consultation
          </Button>
          <Button size="lg" variant="outline" className="rounded-2xl text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <Phone className="h-4 w-4 mr-2" /> Call Now
          </Button>
        </div>
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default FinalCTA;
