import { Building2, ArrowRight } from "lucide-react";
import doctorPriya from "@/assets/doctor-priya.jpg";
import doctorAnita from "@/assets/doctor-anita.jpg";
import doctorMeera from "@/assets/doctor-meera.jpg";

const hospitals = ["Apollo Hospitals", "Fortis Healthcare", "Manipal Hospital", "Narayana Health", "Rainbow Hospital"];

const doctors = [
  { name: "Dr. Priya Sharma", designation: "Senior Fertility Specialist", experience: "15+ years", image: doctorPriya },
  { name: "Dr. Anita Reddy", designation: "Consultant Gynecologist", experience: "12+ years", image: doctorAnita },
  { name: "Dr. Meera Krishnan", designation: "Obstetrician & Surgeon", experience: "18+ years", image: doctorMeera },
];

const PartnersAndDoctors = () => (
  <section id="surgeons" className="py-16 md:py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
          <span className="w-2 h-2 rounded-full bg-primary" /> Top Surgeons
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          Consult Top Surgeons in Bangalore
        </h2>
        <p className="text-muted-foreground mt-2">Experienced specialists handpicked for quality care.</p>
      </div>

      {/* Doctor cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mb-12">
        {doctors.map((d) => (
          <div key={d.name} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
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

      {/* Hospital partners */}
      <div className="flex flex-wrap gap-4">
        {hospitals.map((h) => (
          <div key={h} className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-xl border border-border hover:shadow-sm transition-shadow">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">{h}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersAndDoctors;
