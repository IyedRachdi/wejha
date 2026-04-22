# Design Brief

## Direction

**Wejha (وجهة)** — Tunisian accessibility platform connecting people with reduced mobility, students, and drivers with dignity-first design.

## Tone

Warm professionalism with human-centered accessibility; startup-clean simplicity (Uber/Careem style) that feels trustworthy and inclusive, never patronizing.

## Differentiation

Generous touch targets (44px+), high-contrast color hierarchy, and soft rounded shapes create an interface designed specifically for elderly and disabled users without sacrificing modern, premium aesthetics.

## Color Palette

| Token         | OKLCH             | Role                          |
| ------------- | ----------------- | ----------------------------- |
| background    | 0.97 0.008 270    | Soft off-white, low chroma    |
| foreground    | 0.18 0.02 280     | Anthracite prose/UI           |
| primary       | 0.55 0.22 310     | Violet — innovation, dignity  |
| secondary     | 0.65 0.18 210     | Turquoise — mobility, trust   |
| success       | 0.6 0.16 140      | Accessible green              |
| destructive   | 0.55 0.24 25      | Accessible red (SOS button)   |
| warning       | 0.72 0.15 85      | Amber — high visibility       |
| border        | 0.88 0.008 270    | Subtle, low-contrast dividers |
| muted         | 0.92 0.01 270     | Secondary backgrounds         |

## Typography

- **Display:** General Sans — headings, hero text, UI labels (bold, tight tracking)
- **Body:** DM Sans — prose, descriptions, body copy (proven accessibility)
- **Mono:** Geist Mono — technical elements, codes
- **Scale:** Hero `text-4xl font-bold`, Section `text-2xl font-semibold`, Label `text-sm font-semibold`, Body `text-base leading-relaxed`

## Elevation & Depth

Cards and buttons sit on a clean background with subtle shadows (`shadow-md`); soft rounded corners (16px) create visual softness for accessibility. No harsh edges or shadows — depth is achieved through layering and chroma, not intensity.

## Structural Zones

| Zone       | Background             | Border    | Notes                                          |
| ---------- | ---------------------- | --------- | ---------------------------------------------- |
| Header     | `bg-primary`           | —         | Violet bar with white text; generous padding  |
| Content    | `bg-background`        | —         | Alternating `bg-background` and `bg-muted/30` |
| Card       | `bg-card`              | subtle    | `rounded-2xl shadow-md`; high contrast title  |
| BottomBar  | `bg-card border-t`     | border-t  | 4 large tappable icons (44px+) with labels    |
| SOS Button | `bg-destructive`       | —         | Large circle (60px+), always accessible       |

## Spacing & Rhythm

Base unit: 4px; use multiples (8, 12, 16, 20, 24, 32px) for consistent rhythm. Sections separated by `gap-6` or `py-6`; content grouped in `gap-4` inside cards. Generous vertical rhythm ensures readability for elderly users.

## Component Patterns

- **ServiceCard:** Image + title + turquoise rating badge + verified checkmark + price + turquoise CTA (44px button)
- **ProviderCard:** Avatar + name + verified badge + star rating + specialties
- **BadgeWidget:** Bronze/Silver/Gold icon + points display in secondary color
- **StarRating:** 5 interactive stars (24px each, 44px touch area); filled primary, unfilled muted
- **BookingStatusBar:** 5-step progress (Requested→Confirmed→En Route→Arrived→Completed) with primary active step
- **PremiumBanner:** Gradient background (Violet→Turquoise) + call-to-action
- **AccessibilityToggle:** Top-right icon; toggle high-contrast mode and text size (3 presets)
- **TabBar:** 4 bottom navigation icons + labels: Accueil / Rechercher / Réservations / Profil
- **SOS Button:** Large, always-red, prominent emergency button (60px+)

## Motion

- **Entrance:** Cards fade in + slide up (200ms, ease-out)
- **Hover:** Buttons scale 102%, shadow increase, 150ms
- **Active:** Buttons scale 98%, 100ms (satisfying tactile feedback)
- **Decorative:** Subtle pulse on SOS button (2s, infinite)

## Constraints

- **Accessibility:** WCAG AA contrast on all text/background combos; 44px minimum touch targets
- **Mobile-first:** Responsive from 320px (touch UI) to 1200px (tablet/desktop)
- **High-contrast mode:** Separate token set available via `[data-contrast="high"]` attribute
- **French language:** All UI labels in French (Tunisian context)

## Signature Detail

**Dignity-first accessibility:** Large touch targets, warm violet primary, and soft rounded corners combined create an interface that respects users' time and capability. Accessibility is invisible — it's not a mode to enable, it's the foundation.

---

## Additional Tokens (CSS Custom Properties)

| Token               | Value                              | Usage                               |
| ------------------- | ---------------------------------- | ----------------------------------- |
| `--gradient-primary` | Violet → Turquoise (135°)          | Hero sections, banners              |
| `--gradient-muted`   | Muted → Background (135°)          | Subtle background texture           |
| `--radius`           | 1rem (16px)                        | Default border-radius for cards     |
| `--transition-smooth` | cubic-bezier(0.4, 0, 0.2, 1) 300ms | All interactive transitions         |

## Utility Classes (Tailwind)

- `.touch-target` — min 44x44px
- `.sr-accessible` — large text for readability
- `.badge-verified` — verified checkmark styling
- `.card-elevated` — card with shadow hierarchy
- `.button-primary`, `.button-secondary`, `.button-ghost` — button hierarchy
