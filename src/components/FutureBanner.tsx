import { Zap, Shield, HeartHandshake } from "lucide-react";

const features = [
  { icon: Zap, title: "Quick Scheduling", desc: "Surgery booked within 3-7 days" },
  { icon: Shield, title: "Trusted Network", desc: "10+ vetted partner hospitals" },
  { icon: HeartHandshake, title: "End-to-End Support", desc: "Dedicated care manager throughout" },
];

const FutureBanner = () => (
  <section className="bg-primary py-12 md:py-16">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-center text-primary-foreground mb-10">
        Welcome to the Future of Surgical Care
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/10 mx-auto flex items-center justify-center mb-3">
              <Icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-sm text-primary-foreground mb-1">{title}</h3>
            <p className="text-xs text-primary-foreground/70">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FutureBanner;
