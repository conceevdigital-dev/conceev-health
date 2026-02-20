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
    <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
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
          <Button size="sm" className="rounded-2xl gap-2">
            <Phone className="h-4 w-4" /> Call Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground/80 hover:text-primary py-2">
              {l.label}
            </a>
          ))}
          <Button size="sm" className="w-full rounded-2xl gap-2">
            <Phone className="h-4 w-4" /> Call Now
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
