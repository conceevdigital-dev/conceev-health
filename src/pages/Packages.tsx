import { useState } from "react";
import { Baby, HeartPulse, Stethoscope, Scissors, Activity, ArrowRight, Pill, Syringe, ShieldCheck, Thermometer, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadFormModal from "@/components/LeadFormModal";

const tabs = [
  {
    label: "Gynaecology",
    packages: [
      { icon: Stethoscope, title: "Hysterectomy", desc: "Minimally invasive procedures with quick recovery", price: "₹85,000", cities: ["Bangalore", "Hyderabad"], tag: "Popular" },
      { icon: Activity, title: "Fibroid Surgery", desc: "Expert fibroid removal with modern techniques", price: "₹70,000", cities: ["Bangalore", "Hyderabad"], tag: null },
      { icon: Scissors, title: "Ovarian Cyst Removal", desc: "Laparoscopic removal by skilled surgeons", price: "₹60,000", cities: ["Bangalore"], tag: null },
      { icon: Pill, title: "Endometriosis Treatment", desc: "Comprehensive care for endometriosis relief", price: "₹75,000", cities: ["Hyderabad"], tag: null },
      { icon: ShieldCheck, title: "PCOS Management", desc: "Holistic approach to PCOS treatment", price: "₹25,000", cities: ["Bangalore", "Hyderabad"], tag: null },
      { icon: Thermometer, title: "Uterine Prolapse Surgery", desc: "Advanced surgical solutions for prolapse", price: "₹90,000", cities: ["Bangalore"], tag: null },
    ],
  },
  {
    label: "Maternity",
    packages: [
      { icon: Baby, title: "Normal Delivery", desc: "Natural birth with expert medical support", price: "₹45,000", cities: ["Bangalore", "Hyderabad"], tag: "Popular" },
      { icon: Baby, title: "C-Section Delivery", desc: "Safe maternity packages with complete care", price: "₹75,000", cities: ["Bangalore", "Hyderabad"], tag: null },
      { icon: ShieldCheck, title: "High-Risk Pregnancy Care", desc: "Specialised care for complex pregnancies", price: "₹1,20,000", cities: ["Bangalore"], tag: null },
      { icon: Stethoscope, title: "Prenatal Screening", desc: "Comprehensive prenatal health assessments", price: "₹15,000", cities: ["Bangalore", "Hyderabad"], tag: null },
      { icon: HeartPulse, title: "Postpartum Care", desc: "Recovery and wellness support after delivery", price: "₹20,000", cities: ["Hyderabad"], tag: null },
    ],
  },
  {
    label: "Fertility",
    packages: [
      { icon: HeartPulse, title: "IVF Treatment", desc: "Complete fertility solutions with top specialists", price: "₹1,50,000", cities: ["Bangalore", "Hyderabad"], tag: "Popular" },
      { icon: Syringe, title: "IUI Treatment", desc: "Affordable fertility assistance programs", price: "₹25,000", cities: ["Bangalore", "Hyderabad"], tag: null },
      { icon: ShieldCheck, title: "Egg Freezing", desc: "Preserve your fertility for the future", price: "₹1,00,000", cities: ["Bangalore"], tag: null },
      { icon: Activity, title: "ICSI Treatment", desc: "Advanced assisted reproduction technique", price: "₹1,80,000", cities: ["Bangalore", "Hyderabad"], tag: null },
      { icon: Stethoscope, title: "Fertility Assessment", desc: "Complete diagnostic evaluation for couples", price: "₹10,000", cities: ["Bangalore", "Hyderabad"], tag: null },
      { icon: HeartPulse, title: "Male Infertility Treatment", desc: "Expert solutions for male fertility issues", price: "₹50,000", cities: ["Hyderabad"], tag: null },
    ],
  },
];

const Packages = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">
            All Treatment Packages
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Transparent, fixed-price packages across Gynaecology, Maternity & Fertility — no hidden costs.
          </p>
        </div>
      </section>

      {/* Tabs + Packages */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === i
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tabs[activeTab].packages.map((pkg) => (
              <div
                key={pkg.title}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 relative flex flex-col"
              >
                {pkg.tag && (
                  <span className="absolute top-4 right-4 text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                    {pkg.tag}
                  </span>
                )}
                <pkg.icon className="h-9 w-9 text-primary mb-3" />
                <h3 className="font-serif text-lg font-bold text-foreground mb-1">{pkg.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 flex-1">{pkg.desc}</p>
                <p className="text-xl font-bold text-foreground mb-1">
                  Starting at <span className="text-primary">{pkg.price}</span>
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                  <MapPin className="h-3 w-3" />
                  {pkg.cities.join(" · ")}
                </div>
                <Button
                  className="w-full rounded-full gap-1.5"
                  onClick={() => setFormOpen(true)}
                >
                  Get Package Details <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
            Not sure which package is right for you?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our care coordinators will help you find the best option based on your needs and budget.
          </p>
          <Button className="rounded-full" size="lg" onClick={() => setFormOpen(true)}>
            Book Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} sourcePage="packages" />
    </div>
  );
};

export default Packages;
