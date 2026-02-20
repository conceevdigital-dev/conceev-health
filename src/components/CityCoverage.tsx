import { MapPin, ArrowRight } from "lucide-react";

const clinics = [
  { city: "Bangalore", areas: ["Whitefield", "HSR Layout", "Electronic City", "Koramangala", "Marathahalli", "Jayanagar"], count: "6+ Clinics" },
  { city: "Hyderabad", areas: ["Kukatpally", "Madhapur", "Gachibowli", "Kondapur", "Secunderabad", "Banjara Hills"], count: "6+ Clinics" },
];

const CityCoverage = () => (
  <section id="cities" className="py-16 md:py-20 bg-secondary/50">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
        Clinics Near You
      </h2>
      <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
        Partner hospitals across Bangalore & Hyderabad for convenient access.
      </p>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {clinics.map((c) => (
          <div key={c.city} className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-primary" /> {c.city}
              </h3>
              <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">{c.count}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {c.areas.map((a) => (
                <span key={a} className="text-sm bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                  {a}
                </span>
              ))}
            </div>
            <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
              Find Clinics <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CityCoverage;
