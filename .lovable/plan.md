

# Hero Banner Redesign

## Current Problem
The hero section is a plain navy gradient with centered text -- no visual elements, no trust signals, and no visual hierarchy to guide the user's eye toward conversion.

## Proposed Design

Transform the hero into a **split-layout hero** with rich visual elements:

### Left Side (Content)
- Eyebrow badge: "Trusted by 500+ Women Across India" with a sparkle icon
- Bold headline (kept but refined for scannability)
- Subtitle paragraph
- Two CTA buttons (Get Free Consultation + View Packages)
- Trust badges row below CTAs: three inline items with icons (Transparent Pricing, 10+ Partner Hospitals, Dedicated Coordinator)

### Right Side (Visual)
- The existing `hero-doctor-patient.jpg` image displayed in a rounded card with a subtle glow/shadow
- Floating stat cards overlaying the image:
  - "500+ Surgeries" badge (top-right)
  - "4.9 Rating" badge (bottom-left)
- Adds depth and credibility without feeling cluttered

### Background Enhancements
- Keep the navy base but add subtle decorative elements:
  - Soft radial gradient circles (CSS only, no images)
  - A subtle dot/grid pattern using CSS for texture
- Bottom wave/curve divider to smoothly transition into the next section

### Mobile Layout
- Stacks vertically: content first, image below
- Trust badges wrap into 2 columns
- Floating stat cards reposition gracefully

---

## Technical Details

### Files Modified
1. **`src/components/HeroSection.tsx`** -- Complete rewrite of the hero layout:
   - Import `hero-doctor-patient.jpg` from assets
   - Split into a two-column grid (`md:grid-cols-2`)
   - Add trust badge row with `Shield`, `Building2`, `HeartHandshake` icons from lucide
   - Add floating stat cards with absolute positioning
   - Add decorative background circles via pseudo-elements / extra divs
   - Add bottom curve SVG divider

2. **`tailwind.config.ts`** -- Add new animation keyframes:
   - `float` animation for the stat badges (gentle up-down)
   - `slide-in-left` and `slide-in-right` for staggered entrance

3. **`src/index.css`** -- No changes needed (existing font/color system covers everything)

### No new dependencies required -- purely CSS and existing assets.
