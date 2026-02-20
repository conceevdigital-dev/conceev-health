import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { quote: "Conceev Health made my IVF journey smooth and stress-free. The coordinator was amazing throughout!", name: "Priya S.", area: "Whitefield, Bangalore" },
  { quote: "Transparent pricing and no surprises. I knew exactly what I was paying for my hysterectomy.", name: "Ananya R.", area: "Kukatpally, Hyderabad" },
  { quote: "Found the best hospital near me within a day. The care manager was with me from consultation to discharge.", name: "Deepa M.", area: "HSR Layout, Bangalore" },
  { quote: "EMI option helped me afford my treatment without any financial stress. Highly recommend!", name: "Kavitha J.", area: "Gachibowli, Hyderabad" },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const t = testimonials[idx];

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">What Our Patients Say</h2>
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 relative">
          <Quote className="h-8 w-8 text-primary/20 mx-auto mb-4" />
          <p className="text-lg text-foreground mb-6 leading-relaxed">"{t.quote}"</p>
          <p className="font-semibold text-foreground">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.area}</p>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"><ChevronLeft className="h-5 w-5" /></button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <span key={i} className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
