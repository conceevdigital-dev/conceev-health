import { Users, Building2, Stethoscope, Award } from "lucide-react";

const metrics = [
  { icon: Users, value: "500+", label: "Women Assisted" },
  { icon: Building2, value: "10+", label: "Partner Hospitals" },
  { icon: Stethoscope, value: "50+", label: "Specialist Doctors" },
  { icon: Award, value: "4.8★", label: "Patient Rating" },
];

const TrustMetrics = () => (
  <section className="bg-primary py-5">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {metrics.map(({ icon: Icon, value, label }) => (
          <div key={label} className="space-y-1">
            <Icon className="h-5 w-5 mx-auto text-primary-foreground/70" />
            <p className="text-2xl font-bold text-primary-foreground">{value}</p>
            <p className="text-xs text-primary-foreground/70">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustMetrics;
