import { CheckCircle2 } from "lucide-react";
import hospitalImg from "@/assets/hospital-interior.jpg";

const reasons = [
  "Experienced Specialists",
  "Transparent Fixed Pricing",
  "Dedicated Care Coordinator",
  "EMI Options Available",
];

const WhyChooseUs = () => (
  <section id="why-us" className="relative py-0">
    <div className="relative h-[500px] overflow-hidden">
      <img src={hospitalImg} alt="Modern hospital facility" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg">
            <p className="text-primary-foreground/70 text-sm font-medium tracking-wider uppercase mb-2">Why Choose Us</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Why Women Trust Our Expertise
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              We deliver curated, transparent, and compassionate women's healthcare with partner hospitals you can trust.
            </p>
            <ul className="space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-center gap-3 text-primary-foreground">
                  <CheckCircle2 className="h-5 w-5 text-rose-light shrink-0" />
                  <span className="text-sm">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
