import { Users, Building2, Stethoscope, Award } from "lucide-react";

const metrics = [
  { icon: Users, value: "500+", label: "Women Assisted" },
  { icon: Building2, value: "10+", label: "Partner Hospitals" },
  { icon: Stethoscope, value: "98%", label: "Patient Satisfaction" },
  { icon: Award, value: "50+", label: "Expert Specialists" },
];

const TrustMetrics = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <p className="text-center text-sm font-medium text-primary tracking-wider uppercase mb-2">Our Impact</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-14">
        Delivering Excellence in Women's Healthcare
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {metrics.map(({ icon: Icon, value, label }) => (
          <div key={label} className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-rose-light mx-auto flex items-center justify-center">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustMetrics;
