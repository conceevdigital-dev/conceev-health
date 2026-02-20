import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How does Conceev Health work?", a: "Share your treatment requirement, and we match you with vetted partner hospitals offering transparent fixed-price packages. A dedicated care coordinator guides you through the entire process." },
  { q: "Are consultations free?", a: "Yes! Your initial consultation and second opinion are completely free. We believe you should have all the information before making a decision." },
  { q: "Can I choose my hospital?", a: "Absolutely. We provide curated options based on your location, budget, and procedure. You make the final choice." },
  { q: "Are prices fixed?", a: "Yes, our packages have transparent fixed pricing. What we quote is what you pay — no hidden costs or surprise bills." },
  { q: "Do you offer EMI options?", a: "Yes, we offer flexible EMI plans so you can focus on your health without financial stress. Ask your care coordinator for details." },
  { q: "How soon can surgery be scheduled?", a: "Most procedures can be scheduled within 3-7 days of consultation, depending on the hospital and your medical evaluation." },
];

const FAQSection = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-2xl border border-border px-6 overflow-hidden">
            <AccordionTrigger className="text-left font-semibold text-sm hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
