import { Building2, User } from "lucide-react";

const hospitals = ["Apollo Hospitals", "Fortis Healthcare", "Manipal Hospital", "Narayana Health", "Rainbow Hospital"];

const doctors = [
  { name: "Dr. Priya Sharma", designation: "Senior Fertility Specialist", experience: "15+ years" },
  { name: "Dr. Anita Reddy", designation: "Consultant Gynecologist", experience: "12+ years" },
  { name: "Dr. Meera Krishnan", designation: "Obstetrician & Surgeon", experience: "18+ years" },
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
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
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
