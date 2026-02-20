import { useState } from "react";
import { MapPin, ArrowRight, Building2, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [activeCity, setActiveCity] = useState("Bangalore");
  const [selectedArea, setSelectedArea] = useState<Record<string, string>>({
    Bangalore: "Whitefield",
  });

  const handleCityClick = (city: string) => {
    setActiveCity(city);
    if (!selectedArea[city]) {
      setSelectedArea((prev) => ({ ...prev, [city]: cities.find((c) => c.city === city)!.areas[0] }));
    }
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

        {/* City tabs */}
        <div className="flex gap-4 max-w-5xl mx-auto mb-0">
          {cities.map((c) => (
            <button
              key={c.city}
              onClick={() => handleCityClick(c.city)}
              className={`flex-1 flex items-center justify-between px-6 py-4 rounded-t-2xl border border-b-0 transition-all cursor-pointer ${
                activeCity === c.city
                  ? "bg-card border-border shadow-sm"
                  : "bg-secondary/80 border-transparent hover:bg-secondary"
              }`}
            >
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-lg font-bold flex items-center gap-2 text-foreground">
                  <MapPin className="h-5 w-5 text-primary" /> {c.city}
                </h3>
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {c.count}
                </span>
              </div>
              {activeCity === c.city ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>

        {/* Active city content */}
        {cities
          .filter((c) => c.city === activeCity)
          .map((c) => {
            const activeArea = selectedArea[c.city] || "";
            const filteredHospitals = activeArea
              ? c.hospitals.filter((h) => h.area === activeArea)
              : [];

            return (
              <div
                key={c.city}
                className="bg-card rounded-b-2xl rounded-tr-2xl border border-border p-6 max-w-5xl mx-auto shadow-sm"
                style={{
                  borderTopLeftRadius: activeCity === "Bangalore" ? 0 : undefined,
                  borderTopRightRadius: activeCity === "Hyderabad" ? 0 : undefined,
                }}
              >
                {/* Area chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.areas.map((a) => (
                    <button
                      key={a}
                      onClick={() =>
                        setSelectedArea((prev) => ({ ...prev, [c.city]: a }))
                      }
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
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all mb-4"
                >
                  Find Clinics <ArrowRight className="h-4 w-4" />
                </a>

                {/* Hospital cards */}
                {activeArea && filteredHospitals.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
                      Hospitals in {activeArea}
                    </p>
                    <div className="flex flex-col gap-3">
                      {filteredHospitals.map((h) => (
                        <div
                          key={h.name}
                          className="flex items-center justify-between bg-background rounded-xl border border-border p-4 hover:shadow-sm hover:border-primary/30 transition-all"
                        >
                          <div className="flex items-center gap-3">
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
                          <Button size="sm" variant="outline" className="text-xs shrink-0">
                            View Hospital
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default CityCoverage;
