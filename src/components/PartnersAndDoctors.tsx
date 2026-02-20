import { useState } from "react";
import { Building2, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import doctorPriya from "@/assets/doctor-priya.jpg";
import doctorAnita from "@/assets/doctor-anita.jpg";
import doctorMeera from "@/assets/doctor-meera.jpg";

const hospitals = [
  { name: "All", doctors: ["Dr. Priya Sharma", "Dr. Anita Reddy", "Dr. Meera Krishnan"] },
  { name: "Apollo Hospitals", doctors: ["Dr. Priya Sharma", "Dr. Meera Krishnan"] },
  { name: "Fortis Healthcare", doctors: ["Dr. Anita Reddy"] },
  { name: "Manipal Hospital", doctors: ["Dr. Priya Sharma", "Dr. Anita Reddy"] },
  { name: "Narayana Health", doctors: ["Dr. Meera Krishnan"] },
  { name: "Rainbow Hospital", doctors: ["Dr. Anita Reddy", "Dr. Meera Krishnan"] },
];

const allDoctors = [
  { name: "Dr. Priya Sharma", designation: "Senior Fertility Specialist", experience: "15+ years", image: doctorPriya },
  { name: "Dr. Anita Reddy", designation: "Consultant Gynecologist", experience: "12+ years", image: doctorAnita },
  { name: "Dr. Meera Krishnan", designation: "Obstetrician & Surgeon", experience: "18+ years", image: doctorMeera },
];

const PartnersAndDoctors = () => {
  const [activeHospital, setActiveHospital] = useState("All");
  const [scrollIndex, setScrollIndex] = useState(0);

  const selectedHospital = hospitals.find((h) => h.name === activeHospital)!;
  const filteredDoctors = allDoctors.filter((d) => selectedHospital.doctors.includes(d.name));

  const canScrollLeft = scrollIndex > 0;
  const canScrollRight = scrollIndex < filteredDoctors.length - 1;

  return (
    <section id="surgeons" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            <span className="w-2 h-2 rounded-full bg-primary" /> Top Surgeons
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Consult Top Surgeons in Your City
          </h2>
          <p className="text-muted-foreground mt-2">Experienced specialists handpicked for quality care.</p>
        </div>

        {/* Hospital chips */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {hospitals.map((h) => (
            <button
              key={h.name}
              onClick={() => { setActiveHospital(h.name); setScrollIndex(0); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeHospital === h.name
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              {h.name !== "All" && <Building2 className="h-4 w-4" />}
              {h.name}
            </button>
          ))}
        </div>

        {/* Doctor cards carousel */}
        <div className="relative max-w-4xl overflow-x-auto">
          {/* Navigation arrows */}
          {filteredDoctors.length > 3 && (
            <>
              <button
                onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
                disabled={!canScrollLeft}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border shadow flex items-center justify-center disabled:opacity-30 hover:bg-accent transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setScrollIndex(Math.min(filteredDoctors.length - 1, scrollIndex + 1))}
                disabled={!canScrollRight}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border shadow flex items-center justify-center disabled:opacity-30 hover:bg-accent transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-300"
              style={{ transform: `translateX(-${scrollIndex * 280}px)` }}
            >
              {filteredDoctors.map((d) => (
                <div
                  key={d.name}
                  className="min-w-[250px] flex-shrink-0 bg-card rounded-2xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{d.name}</h3>
                    <p className="text-xs text-primary mt-0.5">{d.designation}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{d.experience} experience</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredDoctors.length === 0 && (
            <p className="text-muted-foreground text-sm py-8 text-center">No doctors found for this hospital.</p>
          )}
        </div>

        {/* View All button */}
        <div className="mt-8">
          <Button variant="outline" className="group">
            View All Doctor Profiles
            <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersAndDoctors;
