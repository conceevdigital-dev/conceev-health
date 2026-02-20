import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Building2, MapPin, Stethoscope, Calendar, User, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadFormModal from "@/components/LeadFormModal";
import { doctors } from "@/data/doctors";

const allCities = [...new Set(doctors.flatMap((d) => d.cities))].sort();
const allHospitals = [...new Set(doctors.flatMap((d) => d.hospitals))].sort();
const allSpecializations = [...new Set(doctors.flatMap((d) => d.specializations))].sort();

const Doctors = () => {
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const [hospitalFilter, setHospitalFilter] = useState<string | null>(null);
  const [specFilter, setSpecFilter] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.designation.toLowerCase().includes(q) ||
        d.surgeries.some((s) => s.toLowerCase().includes(q));
      const matchesCity = !cityFilter || d.cities.includes(cityFilter);
      const matchesHospital = !hospitalFilter || d.hospitals.includes(hospitalFilter);
      const matchesSpec = !specFilter || d.specializations.includes(specFilter);
      return matchesSearch && matchesCity && matchesHospital && matchesSpec;
    });
  }, [search, cityFilter, hospitalFilter, specFilter]);

  const activeFilters = [cityFilter, hospitalFilter, specFilter].filter(Boolean).length;

  const clearAll = () => {
    setSearch("");
    setCityFilter(null);
    setHospitalFilter(null);
    setSpecFilter(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
            Our Expert Doctors
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our network of {doctors.length}+ top specialists across cities. Search by name, filter by city, hospital, or specialization.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {/* Search + Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, speciality, or surgery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>

          {/* Filter chips */}
          <div className="space-y-3">
            {/* City */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> City
              </span>
              {allCities.map((c) => (
                <button
                  key={c}
                  onClick={() => setCityFilter(cityFilter === c ? null : c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    cityFilter === c
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Hospital */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" /> Hospital
              </span>
              {allHospitals.map((h) => (
                <button
                  key={h}
                  onClick={() => setHospitalFilter(hospitalFilter === h ? null : h)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    hospitalFilter === h
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Specialization */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <Stethoscope className="h-3.5 w-3.5" /> Specialization
              </span>
              {allSpecializations.map((s) => (
                <button
                  key={s}
                  onClick={() => setSpecFilter(specFilter === s ? null : s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    specFilter === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {activeFilters > 0 && (
            <button onClick={clearAll} className="text-xs text-primary font-medium flex items-center gap-1 hover:underline cursor-pointer">
              <X className="h-3 w-3" /> Clear all filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> doctor{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Doctor grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => (
            <div
              key={d.slug}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-primary/20 shadow-md">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-foreground text-lg leading-tight">{d.name}</h3>
                  <p className="text-sm text-primary font-medium mt-0.5">{d.designation}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.experience} experience</p>
                </div>
              </div>

              {/* Cities & Hospitals */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {d.cities.map((c) => (
                  <Badge key={c} variant="outline" className="text-xs gap-1">
                    <MapPin className="h-3 w-3" /> {c}
                  </Badge>
                ))}
              </div>

              {/* Top Surgeries */}
              <div className="mb-5 flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Top Surgeries</p>
                <div className="flex flex-wrap gap-1.5">
                  {d.surgeries.slice(0, 4).map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {s}
                    </span>
                  ))}
                  {d.surgeries.length > 4 && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                      +{d.surgeries.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 rounded-full gap-1.5" onClick={() => setFormOpen(true)}>
                  <Calendar className="h-3.5 w-3.5" /> Book Appointment
                </Button>
                <Link to={`/doctors/${d.slug}`}>
                  <Button size="sm" variant="outline" className="rounded-full gap-1.5">
                    <User className="h-3.5 w-3.5" /> Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No doctors match your search. Try adjusting your filters.</p>
            <Button variant="outline" className="mt-4 rounded-full" onClick={clearAll}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} />
    </div>
  );
};

export default Doctors;
