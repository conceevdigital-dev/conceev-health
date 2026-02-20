import { useState } from "react";
import { MapPin, ArrowRight, Building2, ChevronUp, ChevronDown } from "lucide-react";

const cities = [
  {
    city: "Bangalore",
    count: "6+ Clinics",
    areas: ["Whitefield", "HSR Layout", "Electronic City", "Koramangala", "Marathahalli", "Jayanagar"],
    hospitals: [
      { name: "Apollo Hospital – Whitefield", area: "Whitefield" },
      { name: "Fortis Hospital – Bannerghatta", area: "Jayanagar" },
      { name: "Manipal Hospital – HSR Layout", area: "HSR Layout" },
      { name: "Narayana Health – Electronic City", area: "Electronic City" },
      { name: "Rainbow Hospital – Koramangala", area: "Koramangala" },
      { name: "Columbia Asia – Marathahalli", area: "Marathahalli" },
    ],
  },
  {
    city: "Hyderabad",
    count: "6+ Clinics",
    areas: ["Kukatpally", "Madhapur", "Gachibowli", "Kondapur", "Secunderabad", "Banjara Hills"],
    hospitals: [
      { name: "Apollo Hospital – Jubilee Hills", area: "Banjara Hills" },
      { name: "KIMS Hospital – Secunderabad", area: "Secunderabad" },
      { name: "Yashoda Hospital – Madhapur", area: "Madhapur" },
      { name: "Continental Hospital – Gachibowli", area: "Gachibowli" },
      { name: "Rainbow Hospital – Kukatpally", area: "Kukatpally" },
      { name: "Care Hospital – Kondapur", area: "Kondapur" },
    ],
  },
];

const CityCoverage = () => {
  const [selectedArea, setSelectedArea] = useState<Record<string, string>>({});

  const handleAreaClick = (city: string, area: string) => {
    setSelectedArea((prev) => ({
      ...prev,
      [city]: prev[city] === area ? "" : area,
    }));
  };

  return (
    <section id="cities" className="py-16 md:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Clinics Near You
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          Partner hospitals across Bangalore & Hyderabad for convenient access.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cities.map((c) => {
            const activeArea = selectedArea[c.city] || "";
            const filteredHospitals = activeArea
              ? c.hospitals.filter((h) => h.area === activeArea)
              : [];

            return (
              <div
                key={c.city}
                className="bg-card rounded-2xl border border-border overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* City header */}
                <div className="flex items-center justify-between p-6 pb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl font-bold flex items-center gap-2 text-foreground">
                      <MapPin className="h-5 w-5 text-primary" /> {c.city}
                    </h3>
                    <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {c.count}
                    </span>
                  </div>
                  {activeArea ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                {/* Area chips */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.areas.map((a) => (
                      <button
                        key={a}
                        onClick={() => handleAreaClick(c.city, a)}
                        className={`text-sm px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-medium ${
                          activeArea === a
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                  >
                    Find Clinics <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Hospital cards – shown when an area is selected */}
                {activeArea && filteredHospitals.length > 0 && (
                  <div className="px-6 pb-6 pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
                      Hospitals in {activeArea}
                    </p>
                    <div className="flex flex-col gap-3">
                      {filteredHospitals.map((h) => (
                        <div
                          key={h.name}
                          className="flex items-center gap-3 bg-background rounded-xl border border-border p-4 hover:shadow-sm hover:border-primary/30 transition-all"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground leading-tight">
                              {h.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{h.area}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CityCoverage;
