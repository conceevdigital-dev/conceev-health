import { useState } from "react";
import { Star, Quote } from "lucide-react";
import testimonialPriya from "@/assets/testimonial-priya.jpg";
import testimonialAnanya from "@/assets/testimonial-ananya.jpg";
import testimonialDeepa from "@/assets/testimonial-deepa.jpg";
import testimonialKavitha from "@/assets/testimonial-kavitha.jpg";
import testimonialMeera from "@/assets/testimonial-meera.jpg";

const testimonials = [
  { quote: "Conceev Health made my IVF journey smooth and stress-free. The coordinator was amazing throughout!", name: "Priya S.", area: "Whitefield, Bangalore", rating: 4.8, image: testimonialPriya },
  { quote: "Transparent pricing and no surprises. I knew exactly what I was paying for my hysterectomy. The team was incredibly supportive and made the entire process worry-free.", name: "Ananya R.", area: "Kukatpally, Hyderabad", rating: 4.7, image: testimonialAnanya },
  { quote: "Found the best hospital near me within a day. The care manager was with me from consultation to discharge. I felt heard and cared for every step of the way.", name: "Deepa M.", area: "HSR Layout, Bangalore", rating: 4.9, image: testimonialDeepa },
  { quote: "EMI option helped me afford my treatment without any financial stress. Highly recommend Conceev Health to anyone looking for transparent and compassionate healthcare support!", name: "Kavitha J.", area: "Gachibowli, Hyderabad", rating: 4.6, image: testimonialKavitha },
  { quote: "The dedicated coordinator made all the difference. From finding the right doctor to post-surgery follow-ups, everything was taken care of seamlessly.", name: "Meera L.", area: "Koramangala, Bangalore", rating: 4.8, image: testimonialMeera },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(2);
  const t = testimonials[idx];

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Authentic Patient Experiences
          </h2>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl border border-border shadow-lg p-6 md:p-10">
          {/* Avatars row */}
          <div className="flex items-end justify-center gap-3 md:gap-4 mb-8">
            {testimonials.map((item, i) => {
              const isActive = i === idx;
              return (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 flex-shrink-0 ${
                    isActive
                      ? "w-28 h-36 md:w-36 md:h-44 ring-2 ring-primary shadow-xl z-10"
                      : "w-20 h-28 md:w-28 md:h-36 opacity-70 hover:opacity-100 grayscale hover:grayscale-0"
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {isActive && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-card px-2 py-0.5 rounded-full shadow text-sm font-semibold">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {item.rating}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Name */}
          <h3 className="text-xl md:text-2xl font-serif font-bold text-center text-foreground mb-1">
            {t.name}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-6">{t.area}</p>

          {/* Quote */}
          <div className="flex items-start justify-center gap-3 max-w-3xl mx-auto">
            <Quote className="h-6 w-6 text-primary/30 flex-shrink-0 mt-1 rotate-180" />
            <p className="text-center text-muted-foreground leading-relaxed">
              {t.quote}
            </p>
            <Quote className="h-6 w-6 text-primary/30 flex-shrink-0 mt-1" />
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === idx ? "w-6 h-2.5 bg-primary" : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
