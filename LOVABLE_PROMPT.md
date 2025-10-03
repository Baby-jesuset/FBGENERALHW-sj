# Lovable Dev Prompt - FB General Hardware E-Commerce Website

## Project Overview

Build a modern, full-featured e-commerce website for **FB General Hardware**, a Ugandan hardware store selling building materials, tools, equipment, and supplies. The design is inspired by [iNation420.com](https://ination420.com/) with a clean, professional aesthetic suitable for a hardware business.

## What We're Building

A complete e-commerce platform with:
- Product browsing and search
- Shopping cart functionality
- Checkout process
- Category filtering
- Responsive design for all devices
- Ugandan Shilling (UGX) pricing

## Design Requirements

### Color Scheme
- **Primary:** Deep Blue (#1e40af) - Professional, trustworthy
- **Accent:** Orange (#f97316) - Energy, visibility
- **Neutrals:** White, Light Gray, Dark Gray
- **Background:** Off-white (#fafafa)

### Typography
- **Headings:** Geist Sans (Bold, 700-900 weight)
- **Body:** Geist Sans (Regular, 400-500 weight)
- **Monospace:** Geist Mono (for code/technical specs)

### Layout Style
- Clean, modern e-commerce design
- Card-based product displays
- Sticky header with navigation
- Full-width hero section with carousel
- Grid layouts for products and categories

## Current Status

### ✅ Completed Features

1. **Homepage**
   - Auto-rotating hero carousel (3 featured products)
   - Popular categories grid (8 categories)
   - Best sellers section (8 products)
   - Responsive header and footer

2. **Shop Page** (`/shop`)
   - Product grid with search
   - Category filters
   - Sorting options (price, name)
   - Scroll-based filter bar hiding

3. **Product Pages** (`/product/[id]`)
   - Image gallery with thumbnails
   - Product specifications
   - Add to cart with quantity selector
   - Related products

4. **Cart Page** (`/cart`)
   - Item listing with quantity controls
   - Price calculations (subtotal, shipping, tax)
   - Promo code field
   - Clear cart and remove items

5. **Checkout Page** (`/checkout`)
   - Contact and shipping forms
   - Payment method selection (Mobile Money, Cash on Delivery)
   - Order summary

6. **Categories Page** (`/categories/[slug]`)
   - Dynamic category filtering
   - Product listings by category

### Tech Stack Used
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- React Context API (cart state)

## What's Left to Build

### 1. Backend & Database (Priority: HIGH)
\`\`\`
- Set up Supabase or Neon database
- Create products table with schema
- Create orders table
- Create customers table (optional)
- Build API routes for CRUD operations
- Replace static product data with database queries
\`\`\`

### 2. Payment Integration (Priority: HIGH)
\`\`\`
- Integrate MTN Mobile Money API
- Integrate Airtel Money API
- Add payment processing logic
- Implement order confirmation flow
- Set up email notifications (order confirmation)
\`\`\`

### 3. Additional Pages (Priority: MEDIUM)
\`\`\`
- About Us page (company history, mission, team)
- Contact Us page (form, location map, phone/email)
- Terms & Conditions
- Privacy Policy
- FAQ page
\`\`\`

### 4. User Authentication (Priority: MEDIUM)
\`\`\`
- Sign up / Login pages
- User dashboard
- Order history
- Profile management
- Password reset functionality
\`\`\`

### 5. Admin Dashboard (Priority: MEDIUM)
\`\`\`
- Product management (add, edit, delete products)
- Order management (view, update status)
- Customer management
- Analytics dashboard
- Inventory tracking
\`\`\`

### 6. Enhanced Features (Priority: LOW)
\`\`\`
- Wishlist functionality
- Product comparison
- Advanced search with multiple filters
- Customer reviews (if needed)
- Live chat support
- Newsletter integration
\`\`\`

### 7. SEO & Performance (Priority: HIGH)
\`\`\`
- Add meta tags for all pages
- Generate sitemap.xml
- Optimize images with next/image
- Add structured data (JSON-LD)
- Implement lazy loading
- Add loading skeletons
\`\`\`

### 8. Testing & QA (Priority: HIGH)
\`\`\`
- Cross-browser testing
- Mobile responsiveness testing
- Performance optimization
- Accessibility audit
- Security review
\`\`\`

## How to Start

### Option 1: Continue from Current Codebase
1. Clone the repository from GitHub
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`
4. Start with backend integration (database setup)

### Option 2: Fresh Start with Lovable
1. Use this prompt to recreate the project
2. Focus on backend integration first
3. Implement payment gateway
4. Add remaining pages

## Key Product Data

### Featured Products (Hero Carousel)
1. **Tororo Cement** - 50kg bag, UGX 35,000
2. **Iron Sheets** - Corrugated, 28 gauge, UGX 45,000
3. **Professional Power Drill** - Cordless, 20V, UGX 280,000

### Product Categories
1. Power Tools
2. Hand Tools
3. Building Materials
4. Plumbing Supplies
5. Electrical Supplies
6. Paint & Finishing
7. Safety Equipment
8. Hardware & Fasteners

### Sample Products (20+ total)
- Tororo Cement (various sizes)
- Iron Sheets (various gauges)
- Power Drills
- Angle Grinders
- Hammers, Screwdrivers
- Wheelbarrows
- Paint Brushes
- Safety Helmets
- Nails, Screws, Bolts

## Important Notes

1. **Currency:** All prices in Ugandan Shillings (UGX)
2. **No Ratings:** Product ratings/reviews removed (can add later if needed)
3. **Target Audience:** Construction companies, furniture makers, plumbers, wholesale resellers
4. **Location:** Tororo, Uganda
5. **Payment Methods:** Mobile Money (MTN, Airtel), Cash on Delivery

## Design Inspiration Reference

The original inspiration site (iNation420.com) features:
- Full-screen hero with product images
- Large, bold typography overlays
- Smooth carousel transitions
- Clean category grid
- Product cards with hover effects
- Sticky navigation
- Professional, modern aesthetic

Adapt this style for a hardware store context - more industrial, trustworthy, and professional rather than lifestyle-focused.

## Next Steps for Development

1. **Week 1:** Database setup and API integration
2. **Week 2:** Payment gateway integration
3. **Week 3:** Additional pages (About, Contact, etc.)
4. **Week 4:** User authentication and admin dashboard
5. **Week 5:** Testing, optimization, and deployment

## Success Criteria

- [ ] All products load from database
- [ ] Users can complete full checkout flow
- [ ] Mobile Money payments process successfully
- [ ] Site is fully responsive on all devices
- [ ] Page load time < 3 seconds
- [ ] Accessibility score > 90
- [ ] SEO score > 90
- [ ] Zero critical bugs in production

---

**Ready to build?** Start with database integration and work your way through the priority list. The frontend is 90% complete - focus on backend, payments, and content pages to reach production readiness.
