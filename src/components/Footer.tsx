import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy text-primary-foreground py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4">
            Conceev<span className="text-primary">Health</span>
          </h3>
          <p className="text-sm text-primary-foreground/60">
            India's most trusted women's surgery experts. Transparent pricing, dedicated care coordinators, and vetted hospital partners.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><Link to="/" className="hover:text-primary-foreground">Home</Link></li>
            <li><a href="#specialties" className="hover:text-primary-foreground">Treatments</a></li>
            <li><a href="#surgeons" className="hover:text-primary-foreground">Surgeons</a></li>
            <li><a href="#why-us" className="hover:text-primary-foreground">Why Us</a></li>
            <li><a href="#faqs" className="hover:text-primary-foreground">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Procedures</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li><Link to="/ivf-bangalore" className="hover:text-primary-foreground">IVF Treatment</Link></li>
            <li><Link to="/hysterectomy-hyderabad" className="hover:text-primary-foreground">Hysterectomy</Link></li>
            <li><a href="#packages" className="hover:text-primary-foreground">C-Section</a></li>
            <li><a href="#packages" className="hover:text-primary-foreground">Fibroid Surgery</a></li>
            <li><a href="#packages" className="hover:text-primary-foreground">Ovarian Cyst</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/60">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> care@conceevhealth.com</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp Us</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Bangalore & Hyderabad</li>
          </ul>
        </div>
      </div>

      {/* Most Popular Treatments by Specialty */}
      <div className="border-t border-primary-foreground/10 mt-8 pt-6 space-y-5">
        <h4 className="font-semibold text-sm">Our Most Popular Treatments</h4>

        {[
          { specialty: "Gynaecology", treatments: ["Hysterectomy", "Fibroid Surgery", "Ovarian Cyst Removal", "Laparoscopic Surgery", "Endometriosis Treatment", "PCOS Management", "Uterine Prolapse Surgery"] },
          { specialty: "Maternity", treatments: ["Normal Delivery", "C-Section Delivery", "High-Risk Pregnancy Care", "Prenatal Screening", "Postpartum Care"] },
          { specialty: "Fertility", treatments: ["IVF Treatment", "IUI Treatment", "Egg Freezing", "ICSI Treatment", "Fertility Assessment", "Male Infertility Treatment"] },
        ].map((s) => (
          <div key={s.specialty}>
            <h5 className="text-xs font-semibold text-primary-foreground/80 mb-1.5">{s.specialty}</h5>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              {s.treatments.map((t, i, arr) => (
                <span key={t}>
                  <a href="#specialties" className="hover:text-primary-foreground transition-colors">{t}</a>
                  {i < arr.length - 1 && <span className="mx-2 text-primary-foreground/30">|</span>}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Most Popular Treatment Costs */}
      <div className="mt-6">
        <h4 className="font-semibold text-sm mb-3">Most Popular Treatment Costs</h4>
        <p className="text-sm text-primary-foreground/60 leading-relaxed">
          {["IVF Cost Estimate", "IUI Cost Estimate", "Hysterectomy Cost Estimate", "Fibroid Surgery Cost Estimate", "C-Section Cost Estimate", "Laparoscopic Surgery Cost Estimate", "Ovarian Cyst Removal Cost Estimate", "Endometriosis Treatment Cost Estimate"].map((t, i, arr) => (
            <span key={t}>
              <a href="#packages" className="hover:text-primary-foreground transition-colors">{t}</a>
              {i < arr.length - 1 && <span className="mx-2 text-primary-foreground/30">|</span>}
            </span>
          ))}
        </p>
      </div>

      <div className="border-t border-primary-foreground/10 mt-6 pt-6 text-center text-xs text-primary-foreground/40">
        © 2026 Conceev Health. All rights reserved. · <a href="#" className="hover:text-primary-foreground">Privacy Policy</a> · <a href="#" className="hover:text-primary-foreground">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
