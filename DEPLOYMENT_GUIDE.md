# 🚀 Vercel Deployment Guide - FB Hardware

## Prerequisites Checklist

Before deploying to Vercel, ensure:

- [ ] Supabase project is active and working
- [ ] All environment variables are documented
- [ ] Code builds successfully locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] No critical console errors

---

## Step-by-Step Deployment

### 1. Prepare Your Environment Variables

Copy `env.example` to `.env.local` and fill in your actual values:

```bash
# Supabase (Get from Supabase Dashboard → Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=FB General Hardware
```

### 2. Test Local Production Build

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test production mode
npm start

# Visit http://localhost:3000 and test thoroughly
```

### 3. Fix Any Build Errors

The build MUST complete successfully. Common issues:

**TypeScript Errors:**
```bash
# Check for errors
npm run build

# Fix all TypeScript errors before proceeding
```

**Image Optimization:**
- Replace all `<img>` tags with Next.js `<Image>` component
- Or temporarily set `unoptimized: true` in `next.config.mjs`

### 4. Connect to Vercel

#### Option A: Via Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

#### Option B: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Configure as follows:

**Framework Preset:** Next.js  
**Root Directory:** ./  
**Build Command:** `npm run build`  
**Output Directory:** (leave default)  
**Install Command:** `npm install`

### 5. Configure Environment Variables in Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SITE_NAME
```

⚠️ **IMPORTANT:** Set these for all environments:
- Production
- Preview  
- Development

### 6. Configure Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel
4. Wait for DNS propagation (5-30 minutes)

### 7. Update Supabase URL Allowlist

1. Go to Supabase Dashboard → Settings → API
2. Add your Vercel domain to "Site URL"
3. Add to "Redirect URLs":
   - `https://your-domain.com/**`
   - `https://your-project.vercel.app/**`

### 8. Post-Deployment Verification

Visit your deployed site and test:

- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Navigation works
- [ ] Shop page shows products
- [ ] Product detail pages work
- [ ] Login/Signup functions
- [ ] Cart functionality
- [ ] Checkout process
- [ ] Admin panel (if applicable)
- [ ] Mobile responsiveness
- [ ] No console errors

### 9. SEO Setup

#### Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership
4. Submit sitemap: `https://your-domain.com/sitemap.xml`

#### Robots.txt

Verify it's accessible: `https://your-domain.com/robots.txt`

### 10. Performance Optimization

Run Lighthouse audit:

```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

---

## Common Issues & Solutions

### Build Fails with TypeScript Errors

**Solution:** 
```javascript
// Temporarily add to next.config.mjs
typescript: {
  ignoreBuildErrors: true, // Only for emergency deployment
}
```

⚠️ Fix TypeScript errors properly ASAP!

### Images Don't Display

**Solution:**
```javascript
// In next.config.mjs
images: {
  domains: ['auxhnpndxisbzizklbzu.supabase.co'],
}
```

### Supabase Connection Fails

**Solution:**
1. Verify environment variables are set correctly in Vercel
2. Check Supabase project is not paused
3. Verify Supabase URL allowlist includes your domain

### 404 on Dynamic Routes

**Solution:**
Ensure you're using the App Router correctly and files are in the right structure.

### Slow Initial Load

**Solution:**
1. Enable image optimization (remove `unoptimized: true`)
2. Use `next/image` for all images
3. Add `loading="lazy"` for below-the-fold images
4. Use `<Suspense>` boundaries

---

## Monitoring & Maintenance

### 1. Set Up Error Tracking

Consider integrating:
- **Sentry** (recommended)
- **LogRocket**
- **Datadog**

### 2. Analytics

- Vercel Analytics (already integrated ✅)
- Google Analytics 4
- Google Tag Manager

### 3. Uptime Monitoring

Free options:
- **UptimeRobot**
- **Pingdom**
- **StatusCake**

### 4. Performance Monitoring

- Vercel Speed Insights
- Google PageSpeed Insights
- GTmetrix

---

## Rollback Procedure

If deployment has issues:

### Via Vercel Dashboard

1. Go to Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"

### Via CLI

```bash
vercel rollback
```

---

## Update Procedure

For future updates:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push

# Vercel automatically deploys on push to main branch
# Or manually trigger:
vercel --prod
```

---

## Environment-Specific Configuration

### Production
- Use production Supabase project
- Enable all security features
- Use CDN for assets
- Enable caching

### Preview (Staging)
- Can use same Supabase as production or separate
- Test new features here first
- Share preview URLs with team

### Development
- Use local environment variables
- Connect to development database if available

---

## Security Checklist

- [ ] Environment variables are set in Vercel (not in code)
- [ ] `.env.local` is in `.gitignore`
- [ ] No API keys in client-side code
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Security headers configured (middleware.ts)
- [ ] Supabase RLS (Row Level Security) enabled
- [ ] Admin routes are protected
- [ ] Forms have validation
- [ ] Inputs are sanitized

---

## Performance Checklist

- [ ] Images optimized (using next/image)
- [ ] Fonts optimized (using next/font)
- [ ] Code split properly
- [ ] Lazy loading implemented
- [ ] Caching configured
- [ ] Bundle size < 200KB
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.9s

---

## Final Pre-Launch Checklist

### Content
- [ ] All placeholder text replaced
- [ ] All images have alt text
- [ ] Contact information is correct
- [ ] Social media links are correct
- [ ] Terms of Service page exists
- [ ] Privacy Policy page exists

### Functionality
- [ ] All forms submit correctly
- [ ] Email notifications work (if applicable)
- [ ] Payment processing works (if applicable)
- [ ] Search works
- [ ] Filters work
- [ ] Cart persists across sessions
- [ ] Checkout completes successfully

### SEO
- [ ] Meta tags on all pages
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Schema markup added (if applicable)
- [ ] Open Graph tags set
- [ ] Twitter Card tags set

### Legal
- [ ] Privacy Policy published
- [ ] Terms of Service published
- [ ] Cookie Policy (if using cookies)
- [ ] GDPR compliance (if applicable)

### Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile devices
- [ ] Test with slow connection
- [ ] Test with JavaScript disabled
- [ ] Test with screen reader

---

## Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Supabase Documentation:** https://supabase.com/docs
- **Vercel Community:** https://github.com/vercel/next.js/discussions

---

## Emergency Contacts

Keep these handy:

- **Domain Registrar:** [Your registrar support]
- **Vercel Support:** support@vercel.com
- **Supabase Support:** https://supabase.com/dashboard/support

---

**Last Updated:** October 28, 2025  
**Status:** Ready for Production Deployment

Good luck with your launch! 🚀

