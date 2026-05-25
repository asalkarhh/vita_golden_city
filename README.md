# Vita Golden City Official Website

Premium website for [@vita_golden_city_official](https://instagram.com/vita_golden_city_official) — Vita's #1 Content Creator & Brand Promoter.

## Tech Stack

- React 18 + Vite
- TailwindCSS
- Framer Motion
- React Router v6
- React Hook Form + Zod
- react-i18next (Marathi/English)
- Embla Carousel
- Web3Forms (no backend needed)
- PWA via vite-plugin-pwa

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Add your Web3Forms access key to .env
# Get one free at https://web3forms.com

# 4. Start dev server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

## Placeholders to Replace

Before deploying, replace these placeholders with real data:

### In `src/utils/constants.js`:
- `919876543210` — Replace with actual WhatsApp number (format: country code + number, no spaces)

### In `src/components/home/HeroSection.jsx`:
- `/profile-photo.jpg` — Add influencer profile photo to `public/` folder

### In `src/data/testimonials.js`:
- `[CLIENT_NAME_1]` through `[CLIENT_NAME_5]` — Real client names
- `[BUSINESS_NAME_1]` through `[BUSINESS_NAME_5]` — Real business names
- `/testimonials/client-1.jpg` through `client-5.jpg` — Client photos in `public/testimonials/`

### In `src/data/brands.js`:
- `[BRAND_1]` through `[BRAND_10]` — Brand names
- `/brands/brand-1.png` through `brand-10.png` — Brand logos in `public/brands/`

### In `src/data/portfolio.js`:
- All `[RESTAURANT_NAME_1]`, `[JEWELRY_NAME_1]`, etc. — Real brand names
- `[REEL_URL_1]` through `[REEL_URL_8]` — Real Instagram reel URLs
- `/portfolio/*.jpg` — Portfolio thumbnails in `public/portfolio/`

### In `src/i18n/en.json` and `mr.json`:
- Service pricing: Replace `₹X`, `₹Y`, `₹Z` with actual prices

### In `public/`:
- `og-image.jpg` — 1200x630 Open Graph image
- `favicon.ico` — Gold-themed favicon
- `icon-192.png` and `icon-512.png` — PWA icons
- `press-kit.pdf` — Media kit PDF

### In `.env`:
- `VITE_WEB3FORMS_KEY` — Your Web3Forms access key

## How to Get Web3Forms Access Key

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email address
3. You'll receive an access key — paste it in `.env`
4. Form submissions will be emailed to that address

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

## Deploy to Netlify

```bash
npm run build
```

Drag the `dist/` folder to [app.netlify.com](https://app.netlify.com), or connect your GitHub repo.

Add `_redirects` file in `public/` for SPA routing:
```
/*    /index.html   200
```

## Project Structure

```
src/
  components/
    layout/     — Navbar, Footer, FloatingWhatsApp, BookingBadge
    home/       — HeroSection, StatsStrip, ReelsGrid, BrandLogos, Testimonials, WhyWorkWithMe, FinalCTA
    ui/         — Button, Card, Modal, Accordion, LanguageToggle, ScrollToTop
    form/       — CollabForm, FormField, SuccessModal
  pages/        — Home, About, Services, Portfolio, Collab, FAQ, Contact
  i18n/         — config.js, en.json, mr.json
  hooks/        — useScrollAnimation
  utils/        — constants, validation (Zod schemas)
  data/         — testimonials, brands, portfolio, services, faq
```

## Built By

[Asalkar Techworks](https://asalkartechworks.com)
