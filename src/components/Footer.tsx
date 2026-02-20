import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";

const Footer = () => (
  <footer className="bg-purple-dark text-purple-light py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4 text-rose-light">
            Conceev<span className="text-purple-light">Health</span>
          </h3>
          <p className="text-sm text-purple-light/70">
            Curated women's surgery packages in Bangalore & Hyderabad with trusted hospital partners.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-purple-light/70">
            <li><Link to="/" className="hover:text-purple-light">Home</Link></li>
            <li><a href="#specialties" className="hover:text-purple-light">Treatments</a></li>
            <li><a href="#cities" className="hover:text-purple-light">Cities</a></li>
            <li><a href="#why-us" className="hover:text-purple-light">About Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Procedures</h4>
          <ul className="space-y-2 text-sm text-purple-light/70">
            <li><Link to="/ivf-bangalore" className="hover:text-purple-light">IVF Treatment</Link></li>
            <li><Link to="/hysterectomy-hyderabad" className="hover:text-purple-light">Hysterectomy</Link></li>
            <li><a href="#packages" className="hover:text-purple-light">C-Section</a></li>
            <li><a href="#packages" className="hover:text-purple-light">Fibroid Surgery</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-purple-light/70">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> care@conceevhealth.com</li>
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp Us</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-purple-light/20 mt-8 pt-6 text-center text-xs text-purple-light/50">
        © 2026 Conceev Health. All rights reserved. · <a href="#" className="hover:text-purple-light">Privacy Policy</a> · <a href="#" className="hover:text-purple-light">Terms</a>
      </div>
    </div>
  </footer>
);

export default Footer;
