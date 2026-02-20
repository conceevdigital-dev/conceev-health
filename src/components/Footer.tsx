import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background py-14">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4 text-rose-light">
            Conceev<span className="text-background/70">Health</span>
          </h3>
          <p className="text-sm text-background/60 leading-relaxed">
            Curated women's surgery packages in Bangalore & Hyderabad with trusted hospital partners.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 text-background/90">Navigation</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link to="/" className="hover:text-background transition-colors">Home</Link></li>
            <li><a href="#specialties" className="hover:text-background transition-colors">Treatments</a></li>
            <li><a href="#why-us" className="hover:text-background transition-colors">About Us</a></li>
            <li><a href="#contact" className="hover:text-background transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 text-background/90">Procedures</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li><Link to="/ivf-bangalore" className="hover:text-background transition-colors">IVF Treatment</Link></li>
            <li><Link to="/hysterectomy-hyderabad" className="hover:text-background transition-colors">Hysterectomy</Link></li>
            <li><a href="#packages" className="hover:text-background transition-colors">C-Section</a></li>
            <li><a href="#packages" className="hover:text-background transition-colors">Fibroid Surgery</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 text-background/90">Contact Us</h4>
          <ul className="space-y-3 text-sm text-background/60">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> care@conceevhealth.com</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Bangalore & Hyderabad</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 mt-10 pt-6 text-center text-xs text-background/40">
        © 2026 Conceev Health. All rights reserved. · <a href="#" className="hover:text-background">Privacy Policy</a> · <a href="#" className="hover:text-background">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
