import { Building2, Package, MessageSquare, CreditCard, UserCheck, MapPin } from "lucide-react";

const reasons = [
  { icon: Building2, title: "Curated Hospital Network", desc: "Only vetted, trusted partner hospitals." },
  { icon: MapPin, title: "Location-Based Matching", desc: "Hospitals near your preferred area." },
  { icon: Package, title: "Fixed Transparent Packages", desc: "Know your total cost upfront." },
  { icon: MessageSquare, title: "Free Second Opinion", desc: "Get expert advice before deciding." },
  { icon: CreditCard, title: "EMI Options Available", desc: "Flexible payment plans for all treatments." },
  { icon: UserCheck, title: "Dedicated Care Manager", desc: "One point of contact throughout." },
];

const WhyChooseUs = () => (
  <section id="why-us" className="bg-gradient-to-br from-purple-light to-rose-light py-16 md:py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
        Why Women Choose Conceev Health
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {reasons.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4 p-5 bg-card/80 rounded-2xl border border-border backdrop-blur-sm">
            <div className="p-2 rounded-xl bg-primary/10 shrink-0">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">{title}</h3>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
