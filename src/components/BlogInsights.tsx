import { ArrowRight } from "lucide-react";
import maternityImg from "@/assets/maternity-care.jpg";
import consultationImg from "@/assets/consultation.jpg";
import doctorPatientImg from "@/assets/doctor-patient.jpg";

const posts = [
  {
    image: maternityImg,
    title: "What to Expect During Your Maternity Journey",
    desc: "A complete guide to maternity care packages and what to look for in a hospital.",
  },
  {
    image: consultationImg,
    title: "Understanding IVF Success Rates in India",
    desc: "Key factors that determine IVF success and how to choose the right clinic.",
  },
  {
    image: doctorPatientImg,
    title: "How to Choose the Right Gynecologist",
    desc: "Tips for selecting a trusted specialist for your surgery needs.",
  },
];

const BlogInsights = () => (
  <section className="bg-muted/30 py-16 md:py-24">
    <div className="container mx-auto px-4">
      <p className="text-center text-sm font-medium text-primary tracking-wider uppercase mb-2">Our Blog</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-14">
        Latest Insights and Tips for Women's Health
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {posts.map((p) => (
          <div key={p.title} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-serif font-bold text-foreground">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
              <button className="flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all mt-2">
                Read More <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BlogInsights;
