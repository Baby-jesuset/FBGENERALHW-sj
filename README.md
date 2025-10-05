# FB General Hardware - E-Commerce Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/demos-projects-74d2f3e0/v0-website-clone)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/CoerbP0I8Yf)

## Project Overview

FB General Hardware is a modern, full-featured e-commerce website for a Ugandan hardware store specializing in building materials, tools, equipment, and supplies. The platform serves construction companies, furniture makers, plumbers, and wholesale resellers with top-quality products, exceptional customer service, timely delivery, and expert advice.


## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **State Management:** React Context API
- **Fonts:** Geist Sans, Geist Mono
- **Deployment:** Vercel

## Features Completed ✅

### 1. Homepage
- ✅ Responsive header with navigation (Home, Shop, Categories, About, Contact)
- ✅ Auto-rotating hero carousel showcasing featured products (Tororo Cement, Iron Sheets, Power Tools)
- ✅ Popular categories grid with 8 categories (Power Tools, Hand Tools, Building Materials, etc.)
- ✅ Best sellers product showcase with 8 products
- ✅ Comprehensive footer with company info, quick links, and newsletter signup
- ✅ Sticky header with cart badge showing item count

### 2. Shop Page (`/shop`)
- ✅ Product listing with grid layout
- ✅ Real-time search functionality
- ✅ Category filters (All Products, Power Tools, Hand Tools, etc.)
- ✅ Sorting options (Featured, Price: Low to High, Price: High to Low, Name: A-Z, Name: Z-A)
- ✅ Scroll-based hiding of search/filter bar (hides on scroll down, shows on scroll up)
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ "View All Products" button links from homepage

### 3. Product Detail Pages (`/product/[id]`)
- ✅ Image gallery with thumbnail navigation
- ✅ Product specifications and details
- ✅ Price display with original price and discounts
- ✅ Add to cart functionality with quantity selector
- ✅ Product badges (New Arrival, Best Seller, Sale)
- ✅ Related products suggestions

### 4. Categories Page (`/categories/[slug]`)
- ✅ Dynamic category filtering
- ✅ Category-specific product listings
- ✅ Sorting functionality
- ✅ Breadcrumb navigation
- ✅ Product count display

### 5. Shopping Cart (`/cart`)
- ✅ Cart item listing with product images
- ✅ Quantity controls (increase/decrease)
- ✅ Remove item functionality
- ✅ Clear cart option
- ✅ Price calculations (subtotal, shipping, tax, total)
- ✅ Promo code input field
- ✅ Empty cart state with call-to-action
- ✅ Continue shopping and proceed to checkout buttons
- ✅ Persistent cart state using localStorage

### 6. Checkout Page (`/checkout`)
- ✅ Contact information form
- ✅ Shipping address form
- ✅ Payment method selection (Mobile Money, Cash on Delivery)
- ✅ Order summary with itemized list
- ✅ Price breakdown (subtotal, shipping, tax, total)
- ✅ Place order functionality

### 7. Design System
- ✅ Consistent color scheme (Deep Blue primary, Orange accent, Neutral grays)
- ✅ Typography system (Geist Sans for headings, body text)
- ✅ Responsive breakpoints for all screen sizes
- ✅ Reusable UI components (buttons, cards, inputs, badges)
- ✅ Design tokens in globals.css

### 8. Products & Pricing
- ✅ All prices in Ugandan Shillings (UGX)
- ✅ Featured products: Tororo Cement, Iron Sheets, Power Tools
- ✅ 20+ products across 8 categories
- ✅ Product specifications and details
- ✅ No star ratings (removed as requested)

## What's Left to Complete 🚧

### 1. Backend Integration
- ⏳ Connect to a database (Supabase, Neon, or MongoDB)
- ⏳ Create product management API
- ⏳ Implement order management system
- ⏳ Set up user authentication (optional)
- ⏳ Implement order confirmation emails

### 3. Additional Pages
- ⏳ About Us page
- ⏳ Contact Us page with form
- ⏳ Blog page (optional)
- ⏳ Terms & Conditions
- ⏳ Privacy Policy

### 4. Enhanced Features
- ⏳ User accounts and order history
- ⏳ Wishlist functionality
- ⏳ Product reviews and ratings (if needed)
- ⏳ Advanced search with filters
- ⏳ Product comparison feature

### 5. Admin Dashboard (Optional)
- ⏳ Product management (add, edit, delete)
- ⏳ Order management
- ⏳ Customer management
- ⏳ Analytics and reports

### 6. SEO & Performance
- ⏳ Add meta tags and Open Graph images
- ⏳ Implement sitemap.xml
- ⏳ Optimize images with next/image
- ⏳ Add loading states and error boundaries
- ⏳ Implement analytics (Google Analytics, Vercel Analytics)

### 7. Testing & Quality Assurance
- ⏳ Cross-browser testing
- ⏳ Mobile responsiveness testing
- ⏳ Performance optimization
- ⏳ Accessibility audit (WCAG compliance)

### 8. Deployment Preparation
- ⏳ Environment variables setup
- ⏳ Production build optimization
- ⏳ Domain configuration
- ⏳ SSL certificate setup
- ⏳ CDN configuration for images

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd fb-general-hardware
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

\`\`\`
fb-general-hardware/
├── app/                      # Next.js App Router pages
│   ├── cart/                # Shopping cart page
│   ├── categories/[slug]/   # Dynamic category pages
│   ├── checkout/            # Checkout page
│   ├── product/[id]/        # Dynamic product detail pages
│   ├── shop/                # Shop listing page
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles and design tokens
├── components/              # Reusable React components
│   ├── header.tsx           # Site header with navigation
│   ├── footer.tsx           # Site footer
│   ├── hero-section.tsx     # Homepage hero carousel
│   ├── categories-section.tsx
│   ├── best-sellers-section.tsx
│   └── ui/                  # shadcn/ui components
├── context/                 # React Context providers
│   └── cart-context.tsx     # Shopping cart state management
├── lib/                     # Utility functions and data
│   ├── products.ts          # Product data and types
│   └── utils.ts             # Helper functions
└── public/                  # Static assets (images)
\`\`\`

## Key Features Explained

### Cart Management
The shopping cart uses React Context API for global state management and localStorage for persistence. Cart data persists across page refreshes and browser sessions.

### Product Data
Currently using static product data in `lib/products.ts`. This should be replaced with API calls to a backend database in production.

### Responsive Design
All pages are fully responsive with breakpoints for mobile (< 768px), tablet (768px - 1024px), and desktop (> 1024px).

### Scroll Behavior
The shop page implements smart scroll detection - the search and filter bar hides when scrolling down and reappears when scrolling up, providing more screen space for product browsing.

## Deployment

### Current Deployment
The project is automatically deployed to Vercel and synced with v0.app.

**Live URL:** [https://vercel.com/demos-projects-74d2f3e0/v0-website-clone](https://vercel.com/demos-projects-74d2f3e0/v0-website-clone)

### Production Deployment Steps

1. **Environment Variables**
   - Set up any required API keys
   - Configure database connection strings
   - Add payment gateway credentials

2. **Build Optimization**
   \`\`\`bash
   npm run build
   \`\`\`

3. **Deploy to Vercel**
   - Connect GitHub repository to Vercel
   - Configure custom domain
   - Set environment variables in Vercel dashboard

4. **Post-Deployment**
   - Test all functionality in production
   - Monitor performance and errors
   - Set up analytics tracking

## Contributing

This project is built and maintained through [v0.app](https://v0.app). Continue building at:
**[https://v0.app/chat/projects/CoerbP0I8Yf](https://v0.app/chat/projects/CoerbP0I8Yf)**

## License

All rights reserved - FB General Hardware

## Contact

For questions or support regarding FB General Hardware:
- **Location:** Luweero Town council, Uganda
- **Business:** Building materials, tools, equipment, and supplies
- **Target Customers:** Construction companies, furniture makers, plumbers, wholesale resellers

---

*Built with ❤️ using Next.js, TypeScript, and Tailwind CSS*
