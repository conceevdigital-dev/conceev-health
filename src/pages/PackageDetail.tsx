import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, CalendarCheck, CheckCircle2, Building2, ArrowRight, Star, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadFormModal from "@/components/LeadFormModal";
import { getPackageBySlug } from "@/data/packages";

// Reuse hospital data from CityCoverage
const hospitals = [
  { name: "Apollo Hospital", area: "Whitefield", city: "Bangalore", surgeries: ["Hysterectomy", "IVF", "Fibroid Removal"] },
  { name: "Sakra World Hospital", area: "Whitefield", city: "Bangalore", surgeries: ["Laparoscopy", "C-Section", "Ovarian Cyst"] },
  { name: "Narayana Health", area: "HSR Layout", city: "Bangalore", surgeries: ["IVF", "Hysterectomy", "Endometriosis"] },
  { name: "Manipal Hospital", area: "HSR Layout", city: "Bangalore", surgeries: ["Hysterectomy", "Fibroid Removal", "IVF"] },
  { name: "Fortis Hospital", area: "Koramangala", city: "Bangalore", surgeries: ["Hysterectomy", "Fibroid Removal", "Fertility Care"] },
  { name: "Cloudnine Hospital", area: "Koramangala", city: "Bangalore", surgeries: ["C-Section", "Fertility Care", "PCOS Treatment"] },
  { name: "Yashoda Hospital", area: "Madhapur", city: "Hyderabad", surgeries: ["Hysterectomy", "IVF", "Laparoscopy"] },
  { name: "Care Hospital", area: "Madhapur", city: "Hyderabad", surgeries: ["C-Section", "Fibroid Removal", "PCOS Treatment"] },
  { name: "Apollo Hospital", area: "Banjara Hills", city: "Hyderabad", surgeries: ["IVF", "Hysterectomy", "Laparoscopy"] },
  { name: "KIMS Hospital", area: "Kukatpally", city: "Hyderabad", surgeries: ["Laparoscopy", "Fibroid Removal", "PCOS Treatment"] },
  { name: "Rainbow Hospital", area: "Kondapur", city: "Hyderabad", surgeries: ["IVF", "C-Section", "Laparoscopy"] },
  { name: "Continental Hospital", area: "Gachibowli", city: "Hyderabad", surgeries: ["IVF", "Hysterectomy", "Laparoscopy"] },
];

const PackageDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [formOpen, setFormOpen] = useState(false);
  const pkg = getPackageBySlug(slug || "");

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4 text-foreground">Package Not Found</h1>
          <Link to="/packages">
            <Button variant="outline" className="rounded-full gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Packages
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter hospitals available in the package's cities
  const availableHospitals = hospitals.filter((h) => pkg.cities.includes(h.city));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy text-primary-foreground py-14 md:py-20">
        <div className="container mx-auto px-4">
          <Link to="/packages" className="inline-flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground mb-6">
            <ArrowLeft className="h-4 w-4" /> All Packages
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
              <pkg.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-serif text-4xl md:text-5xl font-bold">{pkg.title}</h1>
                {pkg.tag && (
                  <span className="text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-0.5 rounded-full">
                    {pkg.tag}
                  </span>
                )}
              </div>
              <p className="text-primary-foreground/70 text-lg mb-4">{pkg.desc}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary-foreground/50" /> {pkg.details.duration}</span>
                <span className="flex items-center gap-1.5"><CalendarCheck className="h-4 w-4 text-primary-foreground/50" /> Recovery: {pkg.details.recovery}</span>
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary-foreground/50" /> {pkg.cities.join(" & ")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{pkg.details.overview}</p>
              </div>

              {/* What's included */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pkg.details.includes.map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-card rounded-xl border border-border p-4">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Hospitals */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Available Hospitals</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {availableHospitals.slice(0, 6).map((h, i) => (
                    <div key={`${h.name}-${i}`} className="bg-card rounded-xl border border-border p-4 flex items-start gap-3 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{h.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" /> {h.area}, {h.city}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {h.surgeries.map((s) => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Rate & Stats */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Success Rate & Stats</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card rounded-xl border border-border p-5 text-center">
                    <TrendingUp className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{pkg.successRate}</p>
                    <p className="text-xs text-muted-foreground mt-1">Success Rate</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-5 text-center">
                    <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{pkg.totalPatients}</p>
                    <p className="text-xs text-muted-foreground mt-1">Patients Treated</p>
                  </div>
                  <div className="bg-card rounded-xl border border-border p-5 text-center">
                    <Star className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{pkg.avgRating}/5</p>
                    <p className="text-xs text-muted-foreground mt-1">Avg Rating</p>
                  </div>
                </div>
              </div>

              {/* Patient Reviews */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Patient Reviews</h2>
                <div className="space-y-4">
                  {pkg.reviews.map((review, i) => (
                    <div key={i} className="bg-card rounded-xl border border-border p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-bold text-foreground">{review.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {review.city}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${j < review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Pricing & CTA */}
            <div>
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                <p className="text-3xl font-bold text-primary mb-1">{pkg.price}</p>
                <p className="text-xs text-muted-foreground mb-6">Fixed price · No hidden costs</p>

                <Button className="w-full rounded-full mb-3" size="lg" onClick={() => setFormOpen(true)}>
                  Book Free Consultation
                </Button>
                <Button variant="outline" className="w-full rounded-full gap-1.5" size="lg" asChild>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>

                <div className="mt-6 pt-6 border-t border-border space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> EMI options available</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Free second opinion</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Dedicated care coordinator</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Insurance assistance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} sourcePage={`package-${slug}`} />
    </div>
  );
};

export default PackageDetail;
