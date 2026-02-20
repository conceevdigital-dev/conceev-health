import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const faqs = [
  { q: "How does Conceev Health work?", a: "Share your treatment requirement, and we match you with vetted partner hospitals offering transparent fixed-price packages. A dedicated care coordinator guides you through the entire process." },
  { q: "Are consultations free?", a: "Yes! Your initial consultation and second opinion are completely free. We believe you should have all the information before making a decision." },
  { q: "Can I choose my hospital?", a: "Absolutely. We provide curated options based on your location, budget, and procedure. You make the final choice." },
  { q: "Are prices fixed?", a: "Yes, our packages have transparent fixed pricing. What we quote is what you pay — no hidden costs or surprise bills." },
  { q: "Do you offer EMI options?", a: "Yes, we offer flexible EMI plans so you can focus on your health without financial stress. Ask your care coordinator for details." },
  { q: "How soon can surgery be scheduled?", a: "Most procedures can be scheduled within 3-7 days of consultation, depending on the hospital and your medical evaluation." },
];

const surgeries = ["IVF", "IUI", "Hysterectomy", "Fibroid Surgery", "Ovarian Cyst Removal", "Normal Delivery", "C-Section", "Other"];

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "India", maxLen: 10 },
  { code: "+1", flag: "🇺🇸", name: "US", maxLen: 10 },
  { code: "+44", flag: "🇬🇧", name: "UK", maxLen: 11 },
  { code: "+971", flag: "🇦🇪", name: "UAE", maxLen: 9 },
  { code: "+65", flag: "🇸🇬", name: "SG", maxLen: 8 },
];

const FAQSection = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", surgery: "", location: "", query: "" });
  const [countryIdx, setCountryIdx] = useState(0);
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  const selectedCountry = countryCodes[countryIdx];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.phone.trim() || !form.surgery || !form.location) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    if (form.phone.trim().length < selectedCountry.maxLen) {
      toast({ title: `Please enter a valid ${selectedCountry.maxLen}-digit number`, variant: "destructive" });
      return;
    }
    if (!agreed) {
      toast({ title: "Please agree to Terms & Conditions", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim().slice(0, 100),
      phone: `${selectedCountry.code}${form.phone.trim()}`.slice(0, 15),
      procedure_interest: form.surgery,
      city: form.location,
      source_page: "faq_contact_form",
    });
    setLoading(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Thank you! 🎉", description: "Our care coordinator will contact you shortly." });
      setForm({ firstName: "", lastName: "", phone: "", surgery: "", location: "", query: "" });
    }
  };

  return (
    <section id="faqs" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* FAQ Column */}
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-foreground">
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

          {/* Contact Form Sidebar */}
          <div className="md:mt-16">
            <div className="bg-navy rounded-2xl p-6 text-primary-foreground sticky top-24">
              <MessageCircle className="h-8 w-8 mb-3 text-primary-foreground/70" />
              <h3 className="font-serif text-lg font-bold mb-1">Have Questions? Ask our Expert</h3>
              <p className="text-xs text-primary-foreground/70 mb-4">
                Get personalized advice from our care coordinators.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="First Name *"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    maxLength={50}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm h-9"
                  />
                  <Input
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    maxLength={50}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm h-9"
                  />
                </div>
                <div className="flex gap-1">
                  <Select value={String(countryIdx)} onValueChange={(v) => { setCountryIdx(Number(v)); setForm({ ...form, phone: "" }); }}>
                    <SelectTrigger className="w-[80px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground text-sm h-9 px-2">
                      <SelectValue>{selectedCountry.flag} {selectedCountry.code}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((c, i) => (
                        <SelectItem key={c.code} value={String(i)}>{c.flag} {c.code} {c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Mobile Number *"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, selectedCountry.maxLen);
                      setForm({ ...form, phone: val });
                    }}
                    maxLength={selectedCountry.maxLen}
                    className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm h-9"
                  />
                </div>
                <Select value={form.surgery} onValueChange={(v) => setForm({ ...form, surgery: v })}>
                  <SelectTrigger className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground text-sm h-9">
                    <SelectValue placeholder="Surgery Looking For *" />
                  </SelectTrigger>
                  <SelectContent>
                    {surgeries.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={form.location} onValueChange={(v) => setForm({ ...form, location: v })}>
                  <SelectTrigger className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground text-sm h-9">
                    <SelectValue placeholder="Preferred Location *" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Share your query..."
                  value={form.query}
                  onChange={(e) => setForm({ ...form, query: e.target.value })}
                  maxLength={500}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm min-h-[70px]"
                />
                <div className="flex items-start gap-2">
                  <Checkbox
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(v === true)}
                    className="border-primary-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-0.5"
                  />
                  <label className="text-[11px] text-primary-foreground/60 leading-tight cursor-pointer" onClick={() => setAgreed(!agreed)}>
                    I agree to the Terms & Conditions and Privacy Policy
                  </label>
                </div>
                <Button type="submit" className="w-full rounded-full bg-primary hover:bg-primary/90 text-sm" disabled={loading}>
                  {loading ? "Submitting..." : "Book Free Consultation"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
