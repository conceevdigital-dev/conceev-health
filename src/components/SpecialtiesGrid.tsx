import { useState } from "react";
import { Baby, HeartPulse, Stethoscope, Scissors, Activity, ArrowRight, Pill, Syringe, ShieldCheck, Thermometer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tabs = [
  {
    label: "Gynaecology",
    packages: [
      { icon: Stethoscope, title: "Hysterectomy", desc: "Minimally invasive procedures with quick recovery", link: "/hysterectomy-hyderabad", tag: "Popular" },
      { icon: Activity, title: "Fibroid Surgery", desc: "Expert fibroid removal with modern techniques", link: "#packages", tag: null },
      { icon: Scissors, title: "Ovarian Cyst Removal", desc: "Laparoscopic removal by skilled surgeons", link: "#packages", tag: null },
      { icon: Pill, title: "Endometriosis Treatment", desc: "Comprehensive care for endometriosis relief", link: "#packages", tag: null },
      { icon: ShieldCheck, title: "PCOS Management", desc: "Holistic approach to PCOS treatment", link: "#packages", tag: null },
      { icon: Thermometer, title: "Uterine Prolapse Surgery", desc: "Advanced surgical solutions for prolapse", link: "#packages", tag: null },
    ],
  },
  {
    label: "Maternity",
    packages: [
      { icon: Baby, title: "Normal Delivery", desc: "Natural birth with expert medical support", link: "#packages", tag: "Popular" },
      { icon: Baby, title: "C-Section Delivery", desc: "Safe maternity packages with complete care", link: "#packages", tag: null },
      { icon: ShieldCheck, title: "High-Risk Pregnancy Care", desc: "Specialised care for complex pregnancies", link: "#packages", tag: null },
      { icon: Stethoscope, title: "Prenatal Screening", desc: "Comprehensive prenatal health assessments", link: "#packages", tag: null },
      { icon: HeartPulse, title: "Postpartum Care", desc: "Recovery and wellness support after delivery", link: "#packages", tag: null },
    ],
  },
  {
    label: "Fertility",
    packages: [
      { icon: HeartPulse, title: "IVF Treatment", desc: "Complete fertility solutions with top specialists", link: "/ivf-bangalore", tag: "Popular" },
      { icon: Syringe, title: "IUI Treatment", desc: "Affordable fertility assistance programs", link: "/ivf-bangalore", tag: null },
      { icon: ShieldCheck, title: "Egg Freezing", desc: "Preserve your fertility for the future", link: "#packages", tag: null },
      { icon: Activity, title: "ICSI Treatment", desc: "Advanced assisted reproduction technique", link: "#packages", tag: null },
      { icon: Stethoscope, title: "Fertility Assessment", desc: "Complete diagnostic evaluation for couples", link: "#packages", tag: null },
      { icon: HeartPulse, title: "Male Infertility Treatment", desc: "Expert solutions for male fertility issues", link: "#packages", tag: null },
    ],
  },
];

const SpecialtiesGrid = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
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

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTab === i
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Package Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tabs[activeTab].packages.map((s) => (
            <div
              key={s.title}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative flex flex-col"
            >
              {s.tag && (
                <span className="absolute top-4 right-4 text-xs font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {s.tag}
                </span>
              )}
              <s.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-serif text-lg font-bold mb-1 text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{s.desc}</p>
              <Link to={s.link}>
                <Button variant="outline" size="sm" className="rounded-full gap-1.5">
                  View Package <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/packages">
            <Button variant="default" className="rounded-full gap-2">
              View All Packages <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesGrid;
