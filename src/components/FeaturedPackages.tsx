import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const packages = [
  { title: "IVF Package", price: "₹1,20,000", cities: ["Bangalore", "Hyderabad"], link: "/ivf-bangalore" },
  { title: "Hysterectomy Package", price: "₹85,000", cities: ["Bangalore", "Hyderabad"], link: "/hysterectomy-hyderabad" },
  { title: "Fibroid Surgery", price: "₹70,000", cities: ["Bangalore", "Hyderabad"], link: "#" },
  { title: "C-Section Package", price: "₹55,000", cities: ["Bangalore", "Hyderabad"], link: "#" },
];

const FeaturedPackages = () => (
  <section id="packages" className="py-16 md:py-24">
    <div className="container mx-auto px-4">
      <p className="text-center text-sm font-medium text-primary tracking-wider uppercase mb-2">Our Packages</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-14">
        Popular Surgery Packages
      </h2>
      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {packages.map((p) => (
          <div key={p.title} className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow group">
            <h3 className="font-serif text-lg font-bold mb-1">{p.title}</h3>
            <p className="text-2xl font-bold text-primary mb-2">Starting {p.price}*</p>
            <div className="flex gap-2 mb-4">
              {p.cities.map((c) => (
                <span key={c} className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">{c}</span>
              ))}
            </div>
            <Button variant="outline" size="sm" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-1" asChild>
              <Link to={p.link}>View Details <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedPackages;
