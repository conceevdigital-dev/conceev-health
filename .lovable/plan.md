

# Conceev Health – Homepage + Procedure Pages

## Overview
A warm, women-focused healthcare platform with a **Warm Rose + Soft Purple** color palette, featuring a conversion-optimized homepage and 2-3 procedure-specific landing pages. Lead form submissions will be captured via a backend (Lovable Cloud with Supabase).

---

## Page 1: Homepage

### Navigation
- Sticky transparent navbar with logo, menu links (Home, Treatments, Cities, About, Contact), and a highlighted "Call Now" button
- Mobile: hamburger menu + sticky bottom "Call Now" bar

### Hero Section
- Split layout: headline + CTAs on left, placeholder doctor/patient image on right
- City selector dropdown (Bangalore / Hyderabad)
- Trust badges below CTAs (Transparent Pricing, Partner Hospitals, Dedicated Coordinator)
- Floating WhatsApp button (bottom-right, persistent across all sections)

### Trust Metrics Strip
- Horizontal bar: 500+ Women Assisted · 10+ Hospitals · 0 Hidden Costs

### Problem Section
- Emotional connection: "Confused About Surgery Costs & Hospital Choices?" with pain-point bullets, transitioning to "That's where Conceev Health helps"

### Specialties Grid
- 3 cards (Fertility, Gynecology, Maternity) with icons, sub-procedures listed, and "Explore →" links
- Hover lift effect, soft shadows, rounded corners

### How It Works
- 3-step horizontal timeline: Share Requirement → Get Options → Get Treated
- Clean connecting line with numbered circles

### Featured Procedure Packages
- 2×2 card grid (IVF, Hysterectomy, Fibroid Surgery, C-Section) with placeholder prices, city tags, and "View Details" links

### Why Choose Conceev Health
- 2-column icon grid: Curated Hospitals, Fixed Packages, Free Second Opinion, EMI Options, Dedicated Coordinator, Location Matching

### Partner Hospitals & Doctors
- Hospital logo row (grayscale → color on hover)
- 3 featured doctor cards with circular photos, name, designation

### Package Inclusions
- Split layout: checklist (Surgeon Fees, OT, Room, Nursing, Medicines) on left, illustration placeholder on right
- "No hidden billing surprises" tagline

### Testimonials
- Carousel with 3-4 placeholder testimonials (name + area)

### City Coverage
- Two-column: area lists for Bangalore & Hyderabad + placeholder map visual

### FAQ Section
- Accordion with 6 common questions (cost, safety, hospital choice, EMI, scheduling, free consultation)

### Final CTA
- Bold brand-colored background section with "Book Free Consultation" and "Call Now" buttons
- Urgency line: "Limited partner hospital slots available"

### Footer
- Dark background with logo, nav links, contact info, WhatsApp, privacy/terms links

---

## Page 2-3: Procedure Landing Pages (e.g., /ivf-bangalore, /hysterectomy-hyderabad)

Each procedure page will follow a similar but focused structure:
- Hero with procedure-specific headline and CTA
- Key benefits (specialists, transparent cost, EMI, success rates)
- Lead capture form prominent above the fold
- Package details with placeholder pricing
- Doctor profiles relevant to procedure
- Testimonials filtered to procedure
- FAQ specific to procedure
- Strong bottom CTA

---

## Lead Capture System (Backend)
- Lead form collecting: Name, Phone, Procedure Interest, City
- Submissions stored in a Supabase database table
- Toast confirmation on successful submission
- Form appears in hero section and as a modal triggered by CTA buttons throughout

---

## Design System
- **Colors**: Warm Rose primary, Soft Purple accents, white/light grey backgrounds
- **Typography**: Large bold headings, clean sans-serif, generous spacing
- **UI**: Rounded corners (16-24px), soft shadows, subtle gradients, lots of whitespace
- **Mobile**: Fully responsive, sticky Call + WhatsApp buttons, stacked layouts, big tap-friendly buttons

