import { ClipboardList, Building2, HeartHandshake } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Share Your Requirement", desc: "Tell us the procedure and preferred location." },
  { icon: Building2, title: "Get Curated Options", desc: "We suggest the best partnered hospitals with package pricing." },
  { icon: HeartHandshake, title: "Choose & Get Treated", desc: "Dedicated coordinator supports you till discharge." },
];

const HowItWorks = () => (
  <section className="bg-muted/50 py-16 md:py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4">
        Simple. Transparent. Guided.
      </h2>
      <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
        Three easy steps to your treatment.
      </p>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-border" />
        {steps.map((s, i) => (
          <div key={s.title} className="text-center relative z-10">
            <div className="w-24 h-24 rounded-full bg-card border-2 border-primary mx-auto flex items-center justify-center mb-4 shadow-sm">
              <s.icon className="h-10 w-10 text-primary" />
            </div>
            <span className="inline-block text-xs font-bold text-primary bg-rose-light px-3 py-1 rounded-full mb-3">
              Step {i + 1}
            </span>
            <h3 className="font-serif text-lg font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
