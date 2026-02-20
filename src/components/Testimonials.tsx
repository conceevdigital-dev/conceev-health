import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import happyPatient from "@/assets/happy-patient.jpg";

const testimonials = [
  { quote: "Conceev Health made my IVF journey smooth and stress-free. The coordinator was amazing throughout!", name: "Priya S.", area: "Whitefield, Bangalore", rating: 5 },
  { quote: "Transparent pricing and no surprises. I knew exactly what I was paying for my hysterectomy.", name: "Ananya R.", area: "Kukatpally, Hyderabad", rating: 5 },
  { quote: "Found the best hospital near me within a day. The care manager was with me from consultation to discharge.", name: "Deepa M.", area: "HSR Layout, Bangalore", rating: 5 },
  { quote: "EMI option helped me afford my treatment without any financial stress. Highly recommend!", name: "Kavitha J.", area: "Gachibowli, Hyderabad", rating: 5 },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  // Show 3 testimonials on desktop
  const visibleCount = 3;
  const visible = Array.from({ length: visibleCount }, (_, i) => testimonials[(idx + i) % testimonials.length]);

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-primary tracking-wider uppercase mb-2">Testimonials</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-14">
          What Our Patients Say About Their Experience
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {visible.map((t, i) => (
            <div key={t.name + i} className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prev} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
          <button onClick={next} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
