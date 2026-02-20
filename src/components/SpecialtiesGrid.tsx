import { Baby, Heart, Stethoscope, Scissors, ArrowRight } from "lucide-react";

const specialties = [
  {
    icon: Baby,
    title: "IVF & Fertility",
    desc: "Advanced fertility treatments with experienced specialists and transparent pricing.",
    color: "bg-rose-light",
  },
  {
    icon: Heart,
    title: "Gynecology Surgery",
    desc: "Hysterectomy, fibroid removal, and more with curated hospital partners.",
    color: "bg-secondary",
  },
  {
    icon: Stethoscope,
    title: "Maternity Care",
    desc: "C-Section and delivery packages at partner hospitals near you.",
    color: "bg-rose-light",
  },
  {
    icon: Scissors,
    title: "Minimally Invasive",
    desc: "Laparoscopic procedures with faster recovery and shorter hospital stays.",
    color: "bg-secondary",
  },
];

const SpecialtiesGrid = () => (
  <section id="specialties" className="bg-muted/30 py-16 md:py-24">
    <div className="container mx-auto px-4">
      <p className="text-center text-sm font-medium text-primary tracking-wider uppercase mb-2">Our Services</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-14 max-w-2xl mx-auto">
        Explore Our Full Range of Women's Health Services
      </h2>
      <div className="space-y-4 max-w-4xl mx-auto">
        {specialties.map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="group bg-card rounded-2xl border border-border p-6 flex items-center gap-6 hover:shadow-lg transition-all cursor-pointer">
            <div className={`p-4 rounded-2xl ${color} shrink-0`}>
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg font-bold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
            <div className="shrink-0">
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-colors">
                <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SpecialtiesGrid;
