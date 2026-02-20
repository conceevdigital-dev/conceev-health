import { Building2 } from "lucide-react";
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
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
        Our Partner Hospitals & Specialists
      </h2>

      {/* Hospital logos */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        {hospitals.map((h) => (
          <div key={h} className="flex items-center gap-2 px-5 py-3 bg-card rounded-2xl border border-border grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">{h}</span>
          </div>
        ))}
      </div>

      {/* Doctor cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {doctors.map((d) => (
          <div key={d.name} className="text-center bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
              <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-serif font-bold text-base">{d.name}</h3>
            <p className="text-sm text-primary mt-1">{d.designation}</p>
            <p className="text-xs text-muted-foreground mt-1">{d.experience} experience</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersAndDoctors;
