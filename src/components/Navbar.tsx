import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Treatments", href: "#specialties" },
  { label: "Cities", href: "#cities" },
  { label: "About", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="font-serif text-2xl font-bold text-primary">
          Conceev<span className="text-accent">Health</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <Button size="sm" variant="outline" className="rounded-full gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Phone className="h-4 w-4" /> +91 98765 43210
          </Button>
          <Button size="sm" className="rounded-full">
            Book Consultation
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground/80 hover:text-primary py-2">
              {l.label}
            </a>
          ))}
          <Button size="sm" className="w-full rounded-full gap-2">
            <Phone className="h-4 w-4" /> Call Now
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
