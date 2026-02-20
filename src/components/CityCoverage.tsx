import { MapPin } from "lucide-react";

const cities = {
  Bangalore: ["Whitefield", "HSR Layout", "Electronic City", "Jayanagar", "Marathahalli", "Koramangala"],
  Hyderabad: ["Kukatpally", "Madhapur", "Gachibowli", "Kondapur", "Secunderabad", "Banjara Hills"],
};

const CityCoverage = () => (
  <section id="cities" className="bg-muted/50 py-16 md:py-20">
    <div className="container mx-auto px-4">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
        Serving Bangalore & Hyderabad
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {Object.entries(cities).map(([city, areas]) => (
          <div key={city} className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> {city}
            </h3>
            <div className="flex flex-wrap gap-2">
              {areas.map((a) => (
                <span key={a} className="text-sm bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full">
                  {a}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default CityCoverage;
