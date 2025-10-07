# FB Hardware - Documentation

Welcome to the comprehensive documentation for the FB Hardware e-commerce application. This documentation covers all public APIs, functions, components, and usage patterns.

## 📚 Documentation Structure

### Main Documentation
- **[API Documentation](../API_DOCUMENTATION.md)** - Complete API reference with detailed descriptions
- **[Component Examples](./COMPONENT_EXAMPLES.md)** - Detailed examples and code snippets
- **[Quick Reference](./QUICK_REFERENCE.md)** - Quick access to common patterns and imports

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- TypeScript knowledge
- React/Next.js experience

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 🏗️ Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React Context
- **Icons**: Lucide React

### Project Structure
```
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   └── ...                # Application components
├── context/               # React context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and data
├── docs/                  # Documentation files
└── public/                # Static assets
```

## 📖 Key Features

### 🛒 E-commerce Functionality
- Product catalog with categories
- Shopping cart management
- User authentication (mock implementation)
- Order management
- Product search and filtering

### 🎨 UI/UX Features
- Responsive design (mobile-first)
- Dark/light theme support
- Toast notifications
- Loading states with skeletons
- Accessible components

### 🔧 Developer Experience
- Full TypeScript support
- Comprehensive component library
- Consistent design system
- Reusable patterns
- Detailed documentation

## 🧩 Component Categories

### UI Components
- **Form Elements**: Input, Select, Textarea, RadioGroup, Checkbox
- **Feedback**: Toast, Skeleton, Alert
- **Navigation**: DropdownMenu, Button
- **Layout**: Card, Separator, Label
- **Data Display**: Table, Badge

### Application Components
- **Layout**: Header, Footer, ThemeProvider
- **Sections**: HeroSection, CategoriesSection, BestSellersSection
- **Features**: ProductCard, ShoppingCart, UserProfile

### Context Providers
- **AuthProvider**: User authentication and profile management
- **CartProvider**: Shopping cart state management

## 🎯 Common Use Cases

### Adding a New Product
```typescript
import { useCart } from '@/context/cart-context'
import { useToast } from '@/hooks/use-toast'

function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    })
  }

  return (
    <Button onClick={handleAddToCart}>
      Add to Cart
    </Button>
  )
}
```

### Creating a Form
```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

function ContactForm() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Success!",
      description: "Your message has been sent."
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### Using Context
```typescript
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'

function UserDashboard() {
  const { user, isAuthenticated } = useAuth()
  const { items, totalPrice } = useCart()

  if (!isAuthenticated) {
    return <div>Please log in to view your dashboard</div>
  }

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>You have {items.length} items in your cart</p>
      <p>Total: UGX {totalPrice.toLocaleString()}</p>
    </div>
  )
}
```

## 🎨 Design System

### Color Palette
- **Primary**: Brand colors for main actions
- **Secondary**: Supporting colors for secondary actions
- **Muted**: Subtle colors for backgrounds and borders
- **Destructive**: Error and danger states
- **Foreground**: Main text color
- **Background**: Main background color

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, consistent sizing
- **Labels**: Clear form labels
- **Captions**: Small, muted text

### Spacing
- **Consistent**: 4px base unit
- **Responsive**: Scales with screen size
- **Semantic**: Meaningful spacing relationships

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all components
- Follow React best practices
- Use the `cn` utility for class names
- Implement proper error handling
- Include accessibility attributes

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces
interface ComponentProps {
  title: string
  onAction: () => void
}

// 3. Component
function Component({ title, onAction }: ComponentProps) {
  // 4. State
  const [isLoading, setIsLoading] = useState(false)

  // 5. Handlers
  const handleClick = () => {
    setIsLoading(true)
    onAction()
  }

  // 6. Render
  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : title}
    </Button>
  )
}

// 7. Export
export { Component }
```

### Testing
- Write unit tests for utility functions
- Test component behavior with user interactions
- Mock context providers in tests
- Test error states and edge cases

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
```typescript
// Mobile-first responsive classes
<div className="
  grid grid-cols-1           // Mobile: 1 column
  md:grid-cols-2            // Tablet: 2 columns
  lg:grid-cols-3            // Desktop: 3 columns
  gap-4 md:gap-6            // Responsive spacing
">
```

## ♿ Accessibility

### ARIA Attributes
- Proper labeling for form inputs
- Screen reader support
- Keyboard navigation
- Focus management

### Semantic HTML
- Use appropriate HTML elements
- Maintain heading hierarchy
- Include alt text for images
- Provide meaningful link text

## 🚀 Performance

### Optimization Tips
- Use Next.js Image component for images
- Implement code splitting with dynamic imports
- Optimize bundle size
- Use React.memo for expensive components
- Implement proper loading states

### Best Practices
```typescript
// Lazy loading
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <Skeleton className="h-32 w-full" />
})

// Memoization
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>
})

// Image optimization
<Image
  src="/product.jpg"
  alt="Product"
  width={300}
  height={200}
  className="object-cover"
/>
```

## 🐛 Troubleshooting

### Common Issues

#### Context Not Available
```typescript
// ❌ Wrong - using context outside provider
function Component() {
  const { user } = useAuth() // Error: useAuth must be used within AuthProvider
}

// ✅ Correct - ensure component is wrapped in provider
function App() {
  return (
    <AuthProvider>
      <Component />
    </AuthProvider>
  )
}
```

#### Toast Not Showing
```typescript
// ❌ Wrong - missing Toaster component
function App() {
  return <div>{/* content */}</div>
}

// ✅ Correct - include Toaster in layout
function App() {
  return (
    <div>
      {/* content */}
      <Toaster />
    </div>
  )
}
```

#### Styling Issues
```typescript
// ❌ Wrong - conflicting classes
<Button className="bg-red-500 bg-blue-500">Button</Button>

// ✅ Correct - use cn utility
<Button className={cn("bg-red-500", isActive && "bg-blue-500")}>
  Button
</Button>
```

## 📞 Support

### Getting Help
1. Check the [Quick Reference](./QUICK_REFERENCE.md) for common patterns
2. Review [Component Examples](./COMPONENT_EXAMPLES.md) for detailed usage
3. Consult the [API Documentation](../API_DOCUMENTATION.md) for complete reference
4. Check existing issues in the repository

### Contributing
1. Follow the established patterns
2. Update documentation for new features
3. Include TypeScript types
4. Test your changes thoroughly
5. Follow the code style guidelines

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Happy coding! 🚀**

For questions or suggestions, please open an issue in the repository or contact the development team.