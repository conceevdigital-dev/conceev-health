import { Check, Package } from "lucide-react";

const inclusions = [
  "Surgeon Fees",
  "OT Charges",
  "Room Charges",
  "Nursing Care",
  "Basic Medications",
  "Standard Hospital Stay",
];

const PackageInclusions = () => (
  <section className="bg-muted/50 py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            What's Included in Our Surgery Packages
          </h2>
          <ul className="space-y-3 mb-6">
            {inclusions.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div className="p-1 rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-accent font-semibold font-serif text-lg">
            No hidden billing surprises.
          </p>
        </div>
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-light to-purple-light flex items-center justify-center border border-border">
          <div className="text-center space-y-2 text-muted-foreground">
            <Package className="h-16 w-16 mx-auto text-primary/40" />
            <p className="text-sm">Package Illustration</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PackageInclusions;
