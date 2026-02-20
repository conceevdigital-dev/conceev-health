import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadFormModal from "./LeadFormModal";
import consultationImg from "@/assets/consultation.jpg";
import doctorPatientImg from "@/assets/doctor-patient.jpg";

const ProblemSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-primary tracking-wider uppercase mb-2">About Us</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-16 max-w-2xl mx-auto">
          Your Trusted Partner in Women's Healthcare
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src={consultationImg} alt="Doctor consultation" className="rounded-2xl w-full h-48 object-cover shadow-md" />
              <img src={doctorPatientImg} alt="Doctor with patient" className="rounded-2xl w-full h-56 object-cover shadow-md" />
            </div>
            <div className="pt-8 space-y-4">
              <img src={consultationImg} alt="Medical care" className="rounded-2xl w-full h-56 object-cover shadow-md" />
              <div className="bg-primary rounded-2xl p-5 text-center shadow-md">
                <p className="text-3xl font-bold text-primary-foreground">35+</p>
                <p className="text-xs text-primary-foreground/70">Years of Combined Experience</p>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="space-y-5">
            <h3 className="font-serif text-xl font-bold text-foreground">
              Curated Surgery Packages for Every Need
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We partner with vetted hospitals across Bangalore & Hyderabad to offer transparent, fixed-price surgery packages. No hidden costs, no surprise bills — just quality care at affordable prices.
            </p>
            <ul className="space-y-3">
              {["Vetted partner hospitals only", "Transparent fixed-price packages", "Dedicated care coordinator throughout"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Button className="rounded-full gap-2 mt-2" onClick={() => setFormOpen(true)}>
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </section>
  );
};

export default ProblemSection;
