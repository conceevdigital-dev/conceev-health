import { Shield, Clock, HeartHandshake, IndianRupee } from "lucide-react";
import heroImage from "@/assets/hero-doctor-patient.jpg";

const features = [
  { icon: Clock, title: "Easy Scheduling", desc: "Book within 3-7 days" },
  { icon: IndianRupee, title: "Fixed Pricing", desc: "No hidden costs or surprises" },
  { icon: Shield, title: "Trusted Hospitals", desc: "Only vetted partner hospitals" },
  { icon: HeartHandshake, title: "Dedicated Coordinator", desc: "Support from consult to discharge" },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-16 md:py-20 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
        Why Choose Conceev Health?
      </h2>
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img src={heroImage} alt="Doctor consulting patient" className="w-full h-72 object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-start gap-2 p-4 rounded-xl bg-card border border-border">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
