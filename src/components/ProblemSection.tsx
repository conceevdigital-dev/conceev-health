import { HelpCircle, Search, IndianRupee, ShieldQuestion } from "lucide-react";

const painPoints = [
  { icon: ShieldQuestion, text: "Not sure which hospital to trust?" },
  { icon: IndianRupee, text: "Getting different price quotes everywhere?" },
  { icon: HelpCircle, text: "Worried about hidden costs?" },
  { icon: Search, text: "Searching endlessly for the right doctor?" },
];

const ProblemSection = () => (
  <section className="bg-muted/50 py-16 md:py-20">
    <div className="container mx-auto px-4 text-center max-w-3xl">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
        Confused About Surgery Costs & Hospital Choices?
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left max-w-xl mx-auto">
        {painPoints.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border">
            <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-foreground">{text}</p>
          </div>
        ))}
      </div>
      <p className="text-lg text-accent font-semibold font-serif">
        That's where Conceev Health helps.
      </p>
    </div>
  </section>
);

export default ProblemSection;
