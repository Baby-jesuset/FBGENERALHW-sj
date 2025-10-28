# Loading Animation Implementation Guide

## Overview
The FB Hardware site now uses a consistent Lottie animation for all loading states across the application. The animation features hardware tools (shovel, compass, pen, and hammer) appearing in sequence.

## Components

### 1. `LoadingSpinner` Component
**Location:** `components/loading-spinner.tsx`

A reusable component that displays the Lottie animation.

**Props:**
- `size`: "sm" | "md" | "lg" | "xl" (default: "md")
- `className`: Additional CSS classes (optional)

**Sizes:**
- `sm`: 64px × 64px (w-16 h-16)
- `md`: 96px × 96px (w-24 h-24)
- `lg`: 128px × 128px (w-32 h-32)
- `xl`: 192px × 192px (w-48 h-48)

**Usage:**
```tsx
import { LoadingSpinner } from "@/components/loading-spinner"

// Default size (md)
<LoadingSpinner />

// Large spinner
<LoadingSpinner size="lg" />

// With custom className
<LoadingSpinner size="sm" className="my-4" />
```

### 2. `PageLoading` Component
**Location:** `components/page-loading.tsx`

A full-page loading component that includes header, footer, and a centered loading spinner.

**Props:**
- `showHeader`: boolean (default: true)
- `showFooter`: boolean (default: true)

**Usage:**
```tsx
import { PageLoading } from "@/components/page-loading"

// Full page with header and footer
export default function Loading() {
  return <PageLoading />
}

// Without header and footer
export default function Loading() {
  return <PageLoading showHeader={false} showFooter={false} />
}
```

## Implementation Locations

### Page-Level Loading States
All the following files now use `PageLoading`:

1. `app/login/loading.tsx`
2. `app/signup/loading.tsx`
3. `app/account/loading.tsx`
4. `app/account/profile/loading.tsx`
5. `app/account/orders/loading.tsx`
6. `app/checkout/loading.tsx`
7. `app/cart/loading.tsx`
8. `app/shop/loading.tsx`
9. `app/about/loading.tsx`
10. `app/contact/loading.tsx`
11. `app/reset-password/loading.tsx`

### Component-Level Loading States
The following components use `LoadingSpinner`:

1. `components/hero-section.tsx` - Uses `size="lg"`
2. `components/best-sellers-section.tsx` - Uses `size="lg"`
3. `app/shop/page.tsx` - Uses `size="lg"`
4. `app/admin/orders/[id]/page.tsx` - Uses `size="lg"`

## Animation File
**Location:** `public/loader.json`

The Lottie animation file is stored in the public directory and imported directly into the `LoadingSpinner` component.

## Dependencies
- **lottie-react**: ^2.4.0 (installed with `--legacy-peer-deps`)

## Customization

### Changing Animation Speed
Edit `components/loading-spinner.tsx`:
```tsx
<Lottie 
  animationData={loaderAnimation} 
  loop={true} 
  speed={1.5} // Add this prop (default is 1)
  className={sizeMap[size]} 
/>
```

### Changing Animation
Replace `public/loader.json` with your new Lottie animation file, or update the import in `LoadingSpinner`:
```tsx
import loaderAnimation from "@/public/your-new-animation.json"
```

### Adding New Sizes
Edit the `sizeMap` in `components/loading-spinner.tsx`:
```tsx
const sizeMap = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
  xxl: "w-64 h-64", // New size
}
```

## Benefits
1. **Consistency**: All loading states use the same animation
2. **Brand Identity**: Hardware-themed animation matches the site's purpose
3. **Maintainability**: Single source of truth for loading animations
4. **Performance**: Lottie animations are lightweight and smooth
5. **Flexibility**: Easy to adjust size and styling per use case

## Troubleshooting

### Animation Not Showing
1. Verify `public/loader.json` exists
2. Check browser console for import errors
3. Ensure `lottie-react` is installed

### Animation Too Fast/Slow
Adjust the animation speed in the component or edit the Lottie JSON file's frame rate.

### Size Issues
Use the appropriate size prop or add custom classes to the `className` prop.

