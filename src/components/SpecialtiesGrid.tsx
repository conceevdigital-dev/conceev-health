import { Baby, HeartPulse, Stethoscope, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const specialties = [
  {
    icon: HeartPulse,
    title: "Fertility Treatments",
    items: ["IVF Packages", "IUI", "Fertility Evaluation"],
    link: "/ivf-bangalore",
    color: "text-primary",
  },
  {
    icon: Stethoscope,
    title: "Gynecology Surgeries",
    items: ["Hysterectomy", "Fibroid Surgery", "Ovarian Cyst Removal"],
    link: "/hysterectomy-hyderabad",
    color: "text-accent",
  },
  {
    icon: Baby,
    title: "Maternity Care",
    items: ["Normal Delivery", "C-Section Packages", "Pregnancy Support"],
    link: "#packages",
    color: "text-primary",
  },
];

const SpecialtiesGrid = () => (
  <section id="specialties" className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
        Our Focused Women's Care Specialties
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {specialties.map((s) => (
          <div
            key={s.title}
            className="group bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <s.icon className={`h-10 w-10 ${s.color} mb-4`} />
            <h3 className="font-serif text-xl font-bold mb-4">{s.title}</h3>
            <ul className="space-y-2 mb-6">
              {s.items.map((item) => (
                <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to={s.link}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              Explore <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SpecialtiesGrid;
