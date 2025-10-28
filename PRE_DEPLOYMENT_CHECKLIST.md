# ✅ Pre-Deployment Checklist

## Critical (Must Fix Before Deploy)

- [ ] **Build succeeds locally** - Run `npm run build` with zero errors
- [ ] **Environment variables configured** - Copy `env.example` to `.env.local` and fill in values
- [ ] **Cart persistence works** - Cart data saved in localStorage ✅ (FIXED)
- [ ] **Images optimized** - Using Next.js Image component (⚠️ NEEDS FIXING)
- [ ] **Security headers added** - middleware.ts created ✅ (FIXED)
- [ ] **Error pages exist** - error.tsx and not-found.tsx ✅ (FIXED)
- [ ] **SEO files created** - robots.ts and sitemap.ts ✅ (FIXED)
- [ ] **No hardcoded secrets** - All API keys in env variables ✅
- [ ] **TypeScript errors fixed** - Currently ignored ⚠️ (SET TO FALSE)
- [ ] **ESLint warnings addressed** - Currently ignored ⚠️ (SET TO FALSE)

## High Priority (Fix Soon)

- [ ] **Form validation enhanced** - Add Zod validation to all forms
- [ ] **Rate limiting added** - Protect API routes from abuse
- [ ] **Meta tags complete** - Dynamic metadata for all pages
- [ ] **Loading states consistent** - Lottie loader everywhere ✅ (DONE)
- [ ] **Mobile tested** - Test on real devices
- [ ] **Accessibility audit** - Run axe DevTools
- [ ] **Performance audit** - Lighthouse score 90+

## Medium Priority (Nice to Have)

- [ ] **Analytics tracking** - Google Analytics / Vercel Analytics ✅
- [ ] **Error tracking** - Sentry integration
- [ ] **Image formats** - WebP/AVIF support ✅
- [ ] **Caching strategy** - Implement ISR where appropriate
- [ ] **Code splitting** - Review bundle sizes
- [ ] **Lazy loading** - Implement for images and components

## Testing Checklist

### Functionality
- [ ] Homepage loads
- [ ] Product listing works
- [ ] Product details show
- [ ] Add to cart functions
- [ ] Cart persists on refresh ✅
- [ ] Checkout process completes
- [ ] Login works
- [ ] Signup works
- [ ] Admin panel accessible (for admins)
- [ ] Orders display

### Responsive Design
- [ ] Mobile (320px-640px)
- [ ] Tablet (641px-1024px)
- [ ] Desktop (1025px+)
- [ ] Large desktop (1920px+)

### Browsers
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari
- [ ] Mobile Chrome

### Performance
- [ ] First load < 3 seconds
- [ ] Navigation < 1 second
- [ ] Images load progressively
- [ ] No layout shifts
- [ ] Smooth scrolling

## Vercel Deployment Steps

1. **Local Test**
   ```bash
   npm install
   npm run build
   npm start
   ```

2. **Push to Git**
   ```bash
   git add .
   git commit -m "Production ready"
   git push
   ```

3. **Deploy to Vercel**
   - Connect repository
   - Add environment variables
   - Deploy

4. **Post-Deploy**
   - Test live site
   - Submit sitemap to Google
   - Monitor errors

## Quick Fixes Needed

### 1. Replace img tags with Image component

**Files to update:**
- components/header.tsx
- components/footer.tsx
- components/hero-section.tsx
- components/best-sellers-section.tsx
- components/categories-section.tsx
- app/shop/page.tsx
- app/product/[id]/page.tsx
- app/admin/layout.tsx

**Pattern:**
```typescript
// Before
<img src="/logo.svg" alt="Logo" className="h-10 w-auto" />

// After
import Image from 'next/image'
<Image src="/logo.svg" alt="Logo" width={120} height={40} className="h-10 w-auto" />
```

### 2. Add Form Validation

**Install Zod (if not installed):**
```bash
npm install zod
```

**Add to login/signup/checkout forms:**
```typescript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
```

### 3. Fix TypeScript Errors

```bash
# Find all errors
npx tsc --noEmit

# Fix each error before deploying
```

### 4. Add Analytics

**Already added:** Vercel Analytics ✅

**Optional:** Add Google Analytics to `app/layout.tsx`

## Deployment Command

```bash
# Option 1: Auto-deploy on git push (recommended)
git push origin main

# Option 2: Manual deploy with Vercel CLI
vercel --prod

# Option 3: Via Vercel Dashboard
# Just connect your repo and click Deploy
```

## Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = your-value-here
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-value-here
NEXT_PUBLIC_SITE_URL = https://your-domain.com
NEXT_PUBLIC_SITE_NAME = FB General Hardware
```

## Post-Deployment Monitoring

**First 24 Hours:**
- [ ] Check error logs in Vercel
- [ ] Monitor Analytics
- [ ] Test all user flows
- [ ] Check mobile experience
- [ ] Verify SEO tags

**First Week:**
- [ ] Review performance metrics
- [ ] Check Google Search Console
- [ ] Monitor conversion rates
- [ ] Gather user feedback
- [ ] Fix any reported issues

## Rollback Plan

If something goes wrong:

1. **Vercel Dashboard** → Deployments
2. Find last working deployment
3. Click "Promote to Production"

## Success Criteria

✅ Site loads in < 3 seconds  
✅ No console errors  
✅ All features work  
✅ Mobile friendly  
✅ SEO tags present  
✅ Lighthouse score 80+  
✅ Zero critical bugs  

---

**Current Status:** 🟡 Ready with Minor Fixes Needed

**Estimated Time to Production Ready:** 4-8 hours

**Priority Fixes:**
1. Replace img tags with Image components (2-3 hours)
2. Fix TypeScript/ESLint errors (1-2 hours)
3. Add form validation (1-2 hours)
4. Test thoroughly (1 hour)

**Then you're ready to deploy!** 🚀

