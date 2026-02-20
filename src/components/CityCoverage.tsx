import { useState } from "react";
import { MapPin, ArrowRight, Building2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cities = [
  {
    city: "Bangalore",
    count: "6+ Clinics",
    areas: ["Whitefield", "HSR Layout", "Electronic City", "Koramangala", "Marathahalli", "Jayanagar"],
    hospitals: [
      { name: "Apollo Hospital", area: "Whitefield", city: "Bangalore", surgeries: ["Hysterectomy", "IVF", "Fibroid Removal"] },
      { name: "Sakra World Hospital", area: "Whitefield", city: "Bangalore", surgeries: ["Laparoscopy", "C-Section", "Ovarian Cyst"] },
      { name: "Narayana Health", area: "Whitefield", city: "Bangalore", surgeries: ["IVF", "Hysterectomy", "Endometriosis"] },
      { name: "Cloudnine Hospital", area: "Whitefield", city: "Bangalore", surgeries: ["C-Section", "Fertility Care", "PCOS Treatment"] },
      { name: "Manipal Hospital", area: "HSR Layout", city: "Bangalore", surgeries: ["Hysterectomy", "Fibroid Removal", "IVF"] },
      { name: "Motherhood Hospital", area: "HSR Layout", city: "Bangalore", surgeries: ["C-Section", "Laparoscopy", "PCOS Treatment"] },
      { name: "Aster CMI Hospital", area: "HSR Layout", city: "Bangalore", surgeries: ["Ovarian Cyst", "Endometriosis", "IVF"] },
      { name: "Fortis Hospital", area: "HSR Layout", city: "Bangalore", surgeries: ["Hysterectomy", "Fibroid Removal", "Fertility Care"] },
      { name: "BGS Gleneagles Hospital", area: "Electronic City", city: "Bangalore", surgeries: ["IVF", "C-Section", "Laparoscopy"] },
      { name: "Sparsh Hospital", area: "Electronic City", city: "Bangalore", surgeries: ["Hysterectomy", "Endometriosis", "PCOS Treatment"] },
      { name: "Narayana Multispeciality", area: "Electronic City", city: "Bangalore", surgeries: ["Fibroid Removal", "Ovarian Cyst", "IVF"] },
      { name: "Sakra Women's Centre", area: "Electronic City", city: "Bangalore", surgeries: ["Fertility Care", "C-Section", "Laparoscopy"] },
      { name: "Rainbow Hospital", area: "Koramangala", city: "Bangalore", surgeries: ["C-Section", "IVF", "PCOS Treatment"] },
      { name: "Apollo Cradle", area: "Koramangala", city: "Bangalore", surgeries: ["Laparoscopy", "Fibroid Removal", "Fertility Care"] },
      { name: "Vikram Hospital", area: "Koramangala", city: "Bangalore", surgeries: ["Hysterectomy", "Endometriosis", "Ovarian Cyst"] },
      { name: "Cloudnine Koramangala", area: "Koramangala", city: "Bangalore", surgeries: ["C-Section", "IVF", "PCOS Treatment"] },
      { name: "Columbia Asia", area: "Marathahalli", city: "Bangalore", surgeries: ["Hysterectomy", "IVF", "Laparoscopy"] },
      { name: "Manipal Marathahalli", area: "Marathahalli", city: "Bangalore", surgeries: ["Fibroid Removal", "C-Section", "PCOS Treatment"] },
      { name: "Motherhood Marathahalli", area: "Marathahalli", city: "Bangalore", surgeries: ["Fertility Care", "Endometriosis", "IVF"] },
      { name: "Aster Marathahalli", area: "Marathahalli", city: "Bangalore", surgeries: ["Ovarian Cyst", "Hysterectomy", "C-Section"] },
      { name: "Fortis Jayanagar", area: "Jayanagar", city: "Bangalore", surgeries: ["IVF", "Laparoscopy", "Fibroid Removal"] },
      { name: "Apollo Jayanagar", area: "Jayanagar", city: "Bangalore", surgeries: ["Hysterectomy", "C-Section", "Endometriosis"] },
      { name: "Sagar Hospital", area: "Jayanagar", city: "Bangalore", surgeries: ["PCOS Treatment", "Ovarian Cyst", "Fertility Care"] },
      { name: "Narayana Jayanagar", area: "Jayanagar", city: "Bangalore", surgeries: ["IVF", "Fibroid Removal", "Laparoscopy"] },
    ],
  },
  {
    city: "Hyderabad",
    count: "6+ Clinics",
    areas: ["Kukatpally", "Madhapur", "Gachibowli", "Kondapur", "Secunderabad", "Banjara Hills"],
    hospitals: [
      { name: "Apollo Hospital", area: "Kukatpally", city: "Hyderabad", surgeries: ["IVF", "Hysterectomy", "C-Section"] },
      { name: "KIMS Hospital", area: "Kukatpally", city: "Hyderabad", surgeries: ["Laparoscopy", "Fibroid Removal", "PCOS Treatment"] },
      { name: "Rainbow Hospital", area: "Kukatpally", city: "Hyderabad", surgeries: ["C-Section", "Fertility Care", "Endometriosis"] },
      { name: "Sunshine Hospital", area: "Kukatpally", city: "Hyderabad", surgeries: ["Ovarian Cyst", "IVF", "Hysterectomy"] },
      { name: "Yashoda Hospital", area: "Madhapur", city: "Hyderabad", surgeries: ["Hysterectomy", "IVF", "Laparoscopy"] },
      { name: "Care Hospital", area: "Madhapur", city: "Hyderabad", surgeries: ["C-Section", "Fibroid Removal", "PCOS Treatment"] },
      { name: "AIG Hospital", area: "Madhapur", city: "Hyderabad", surgeries: ["Fertility Care", "Endometriosis", "IVF"] },
      { name: "Continental Hospital", area: "Madhapur", city: "Hyderabad", surgeries: ["Ovarian Cyst", "Hysterectomy", "C-Section"] },
      { name: "Continental Hospital", area: "Gachibowli", city: "Hyderabad", surgeries: ["IVF", "Hysterectomy", "Laparoscopy"] },
      { name: "AIG Gachibowli", area: "Gachibowli", city: "Hyderabad", surgeries: ["C-Section", "Fibroid Removal", "Fertility Care"] },
      { name: "Citizens Hospital", area: "Gachibowli", city: "Hyderabad", surgeries: ["PCOS Treatment", "Endometriosis", "IVF"] },
      { name: "Medicover Hospital", area: "Gachibowli", city: "Hyderabad", surgeries: ["Ovarian Cyst", "Hysterectomy", "C-Section"] },
      { name: "Care Hospital Kondapur", area: "Kondapur", city: "Hyderabad", surgeries: ["IVF", "Laparoscopy", "Fibroid Removal"] },
      { name: "Sunshine Kondapur", area: "Kondapur", city: "Hyderabad", surgeries: ["C-Section", "Hysterectomy", "PCOS Treatment"] },
      { name: "Medicover Kondapur", area: "Kondapur", city: "Hyderabad", surgeries: ["Fertility Care", "Endometriosis", "Ovarian Cyst"] },
      { name: "Rainbow Kondapur", area: "Kondapur", city: "Hyderabad", surgeries: ["IVF", "C-Section", "Laparoscopy"] },
      { name: "KIMS Secunderabad", area: "Secunderabad", city: "Hyderabad", surgeries: ["Hysterectomy", "IVF", "Fibroid Removal"] },
      { name: "Yashoda Secunderabad", area: "Secunderabad", city: "Hyderabad", surgeries: ["C-Section", "Laparoscopy", "PCOS Treatment"] },
      { name: "Apollo Secunderabad", area: "Secunderabad", city: "Hyderabad", surgeries: ["Fertility Care", "Endometriosis", "IVF"] },
      { name: "Care Secunderabad", area: "Secunderabad", city: "Hyderabad", surgeries: ["Ovarian Cyst", "Hysterectomy", "C-Section"] },
      { name: "Apollo Banjara Hills", area: "Banjara Hills", city: "Hyderabad", surgeries: ["IVF", "Hysterectomy", "Laparoscopy"] },
      { name: "KIMS Banjara Hills", area: "Banjara Hills", city: "Hyderabad", surgeries: ["C-Section", "Fibroid Removal", "Fertility Care"] },
      { name: "Care Banjara Hills", area: "Banjara Hills", city: "Hyderabad", surgeries: ["PCOS Treatment", "Endometriosis", "IVF"] },
      { name: "Medicover Banjara Hills", area: "Banjara Hills", city: "Hyderabad", surgeries: ["Ovarian Cyst", "Hysterectomy", "C-Section"] },
    ],
  },
];

const CityCoverage = () => {
  const [activeCity, setActiveCity] = useState("Bangalore");
  const [selectedArea, setSelectedArea] = useState<Record<string, string>>({
    Bangalore: "Whitefield",
  });
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleCityClick = (city: string) => {
    setActiveCity(city);
    setScrollIndex(0);
    if (!selectedArea[city]) {
      setSelectedArea((prev) => ({ ...prev, [city]: cities.find((c) => c.city === city)!.areas[0] }));
    }
  };

  const handleAreaClick = (city: string, area: string) => {
    setSelectedArea((prev) => ({ ...prev, [city]: area }));
    setScrollIndex(0);
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
        <div className="flex gap-0 max-w-5xl mx-auto">
          {cities.map((c) => (
            <button
              key={c.city}
              onClick={() => handleCityClick(c.city)}
              className={`flex-1 flex items-center justify-between px-6 py-4 border transition-all cursor-pointer ${
                activeCity === c.city
                  ? "bg-card border-border border-b-card rounded-t-2xl shadow-sm z-10"
                  : "bg-secondary/80 border-transparent hover:bg-secondary rounded-t-2xl"
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
            const filteredHospitals = c.hospitals.filter((h) => h.area === activeArea);
            const maxScroll = Math.max(0, filteredHospitals.length - 2);

            return (
              <div
                key={c.city}
                className="bg-card rounded-b-2xl border border-t-0 border-border p-6 max-w-5xl mx-auto shadow-sm"
              >
                {/* Area chips */}
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

                {/* Hospital cards carousel */}
                {activeArea && filteredHospitals.length > 0 && (
                  <div className="pt-5 mt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        Hospitals in {activeArea}
                      </p>
                      {filteredHospitals.length > 2 && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setScrollIndex(Math.max(0, scrollIndex - 1))}
                            disabled={scrollIndex === 0}
                            className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center disabled:opacity-30 hover:bg-accent transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setScrollIndex(Math.min(maxScroll, scrollIndex + 1))}
                            disabled={scrollIndex >= maxScroll}
                            className="w-8 h-8 rounded-full border border-border bg-background flex items-center justify-center disabled:opacity-30 hover:bg-accent transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="overflow-hidden">
                      <div
                        className="flex gap-4 transition-transform duration-300"
                        style={{ transform: `translateX(-${scrollIndex * 292}px)` }}
                      >
                        {filteredHospitals.map((h, i) => (
                          <div
                            key={`${h.name}-${i}`}
                            className="min-w-[270px] max-w-[270px] flex-shrink-0 bg-background rounded-xl border border-border p-5 hover:shadow-md hover:border-primary/30 transition-all flex flex-col gap-3"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Building2 className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-foreground leading-tight">{h.name}</p>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {h.area}, {h.city}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {h.surgeries.map((s) => (
                                <span
                                  key={s}
                                  className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                            <Button size="sm" variant="outline" className="text-xs w-full mt-auto">
                              View Hospital
                            </Button>
                          </div>
                        ))}
                      </div>
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
