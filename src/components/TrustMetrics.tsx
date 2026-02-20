import { Users, Building2, Stethoscope, ShieldCheck } from "lucide-react";

const metrics = [
  { icon: Users, value: "500+", label: "Women Assisted" },
  { icon: Building2, value: "10+", label: "Partner Hospitals" },
  { icon: Stethoscope, value: "50+", label: "Experienced Specialists" },
  { icon: ShieldCheck, value: "₹0", label: "Hidden Costs" },
];

const TrustMetrics = () => (
  <section className="bg-card border-y border-border">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {metrics.map(({ icon: Icon, value, label }) => (
          <div key={label} className="space-y-1">
            <Icon className="h-6 w-6 mx-auto text-primary" />
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustMetrics;
