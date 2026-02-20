import { Baby, HeartPulse, Stethoscope, Scissors, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const specialties = [
  { icon: HeartPulse, title: "IVF Treatment", desc: "Complete fertility solutions with top specialists", link: "/ivf-bangalore", tag: "Popular" },
  { icon: Stethoscope, title: "Hysterectomy", desc: "Minimally invasive procedures with quick recovery", link: "/hysterectomy-hyderabad", tag: null },
  { icon: Activity, title: "Fibroid Surgery", desc: "Expert fibroid removal with modern techniques", link: "#packages", tag: null },
  { icon: Baby, title: "C-Section", desc: "Safe maternity packages with complete care", link: "#packages", tag: null },
  { icon: Scissors, title: "Ovarian Cyst", desc: "Laparoscopic removal by skilled surgeons", link: "#packages", tag: null },
  { icon: HeartPulse, title: "IUI Treatment", desc: "Affordable fertility assistance programs", link: "/ivf-bangalore", tag: null },
];

const SpecialtiesGrid = () => (
  <section id="specialties" className="py-16 md:py-20 bg-secondary/50">
    <div className="container mx-auto px-4">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
          <span className="w-2 h-2 rounded-full bg-primary" /> Specialties
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Conceev Health Specialties
        </h2>
        <p className="text-muted-foreground mt-2 max-w-lg">
          Comprehensive women's healthcare packages curated for your needs.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {specialties.map((s) => (
          <Link
            key={s.title}
            to={s.link}
            className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
          >
            {s.tag && (
              <span className="absolute top-4 right-4 text-xs font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                {s.tag}
              </span>
            )}
            <s.icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-serif text-lg font-bold mb-1 text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{s.desc}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Learn More <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#packages" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
          View All Packages <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  </section>
);

export default SpecialtiesGrid;
