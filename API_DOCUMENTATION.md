# FB Hardware - API Documentation

This document provides comprehensive documentation for all public APIs, functions, and components in the FB Hardware e-commerce application.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Utility Functions](#utility-functions)
3. [Data Types & Interfaces](#data-types--interfaces)
4. [React Context Providers](#react-context-providers)
5. [Custom Hooks](#custom-hooks)
6. [UI Components](#ui-components)
7. [Application Components](#application-components)
8. [Usage Examples](#usage-examples)

## Project Overview

FB Hardware is a Next.js 14 e-commerce application built with TypeScript, React, and Tailwind CSS. The application features:

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React Context for global state
- **Type Safety**: Full TypeScript support
- **Icons**: Lucide React icon library

### Key Features

- Product catalog with categories
- Shopping cart functionality
- User authentication (mock implementation)
- Responsive design
- Toast notifications
- Theme support

## Utility Functions

### `cn(...inputs: ClassValue[])`

A utility function for combining CSS classes using `clsx` and `tailwind-merge`.

**Location**: `lib/utils.ts`

**Parameters**:
- `inputs`: Array of class values (strings, objects, arrays)

**Returns**: `string` - Merged and deduplicated class names

**Usage**:
```typescript
import { cn } from '@/lib/utils'

// Basic usage
const className = cn('text-lg', 'font-bold', 'text-primary')

// Conditional classes
const buttonClass = cn(
  'px-4 py-2 rounded',
  {
    'bg-primary text-white': isActive,
    'bg-gray-200 text-gray-700': !isActive
  }
)

// With additional classes
const finalClass = cn(baseClasses, additionalClasses, className)
```

## Data Types & Interfaces

### Product Interface

**Location**: `lib/products.ts`

```typescript
interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  image: string
  images: string[]
  badge: string | null
  category: string
  description: string
  specs: { label: string; value: string }[]
  inStock: boolean
}
```

**Properties**:
- `id`: Unique product identifier
- `name`: Product display name
- `price`: Current selling price in UGX
- `originalPrice`: Original price before discount (null if no discount)
- `image`: Primary product image URL
- `images`: Array of all product images
- `badge`: Special badge text ("Sale", "New", "Best Seller", etc.)
- `category`: Product category name
- `description`: Detailed product description
- `specs`: Array of specification key-value pairs
- `inStock`: Availability status

### User Interface

**Location**: `context/auth-context.tsx`

```typescript
interface User {
  id: string
  email: string
  name: string
  phone: string
  address?: string
  city?: string
  createdAt: string
}
```

### Order Interface

**Location**: `context/auth-context.tsx`

```typescript
interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  shippingAddress: string
  paymentMethod: string
}
```

### CartItem Interface

**Location**: `context/cart-context.tsx`

```typescript
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
```

## React Context Providers

### AuthProvider

**Location**: `context/auth-context.tsx`

Provides authentication state and methods throughout the application.

**Context Value**:
```typescript
interface AuthContextType {
  user: User | null
  orders: Order[]
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, phone: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  resetPassword: (email: string) => Promise<boolean>
}
```

**Methods**:

#### `login(email: string, password: string): Promise<boolean>`
Authenticates a user with email and password.

**Parameters**:
- `email`: User's email address
- `password`: User's password

**Returns**: `Promise<boolean>` - Success status

**Usage**:
```typescript
const { login } = useAuth()

const handleLogin = async () => {
  const success = await login('user@example.com', 'password123')
  if (success) {
    // User logged in successfully
  }
}
```

#### `signup(email: string, password: string, name: string, phone: string): Promise<boolean>`
Creates a new user account.

**Parameters**:
- `email`: User's email address
- `password`: User's password
- `name`: User's full name
- `phone`: User's phone number

**Returns**: `Promise<boolean>` - Success status

#### `logout(): void`
Logs out the current user and clears session data.

#### `updateProfile(data: Partial<User>): void`
Updates the current user's profile information.

**Parameters**:
- `data`: Partial user object with fields to update

#### `resetPassword(email: string): Promise<boolean>`
Initiates password reset process.

**Parameters**:
- `email`: User's email address

**Returns**: `Promise<boolean>` - Success status

### CartProvider

**Location**: `context/cart-context.tsx`

Manages shopping cart state and operations.

**Context Value**:
```typescript
interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}
```

**Methods**:

#### `addItem(item: Omit<CartItem, "quantity">): void`
Adds an item to the cart or increments quantity if already present.

**Parameters**:
- `item`: Cart item without quantity (defaults to 1)

**Usage**:
```typescript
const { addItem } = useCart()

const handleAddToCart = (product: Product) => {
  addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  })
}
```

#### `removeItem(id: number): void`
Removes an item from the cart.

**Parameters**:
- `id`: Product ID to remove

#### `updateQuantity(id: number, quantity: number): void`
Updates the quantity of a cart item.

**Parameters**:
- `id`: Product ID
- `quantity`: New quantity (removes item if ≤ 0)

#### `clearCart(): void`
Removes all items from the cart.

**Computed Properties**:
- `totalItems`: Total number of items in cart
- `totalPrice`: Total price of all items

## Custom Hooks

### useToast

**Location**: `hooks/use-toast.ts`

Manages toast notifications throughout the application.

**Returns**:
```typescript
{
  toasts: ToasterToast[]
  toast: (props: Toast) => ToastReturn
  dismiss: (toastId?: string) => void
}
```

**Methods**:

#### `toast(props: Toast): ToastReturn`
Creates and displays a toast notification.

**Parameters**:
- `props`: Toast configuration object

**Toast Properties**:
```typescript
type Toast = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  variant?: 'default' | 'destructive'
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
```

**Returns**:
```typescript
type ToastReturn = {
  id: string
  dismiss: () => void
  update: (props: ToasterToast) => void
}
```

**Usage**:
```typescript
const { toast } = useToast()

// Simple toast
toast({
  title: "Success!",
  description: "Your action was completed successfully."
})

// Destructive toast
toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive"
})

// Toast with action
toast({
  title: "Item added to cart",
  description: "Check your cart to proceed.",
  action: (
    <ToastAction altText="View cart">
      View Cart
    </ToastAction>
  )
})
```

## UI Components

### Button

**Location**: `components/ui/button.tsx`

A versatile button component with multiple variants and sizes.

**Props**:
```typescript
interface ButtonProps extends React.ComponentProps<'button'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

**Variants**:
- `default`: Primary button with solid background
- `destructive`: Red button for dangerous actions
- `outline`: Button with border and transparent background
- `secondary`: Secondary button with muted background
- `ghost`: Transparent button with hover effects
- `link`: Text button styled as a link

**Sizes**:
- `default`: Standard button height (36px)
- `sm`: Small button height (32px)
- `lg`: Large button height (40px)
- `icon`: Square button for icons only

**Usage**:
```typescript
import { Button } from '@/components/ui/button'

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="destructive" size="lg">
  Delete Item
</Button>

// As a link
<Button asChild>
  <Link href="/shop">Go to Shop</Link>
</Button>

// Icon button
<Button variant="ghost" size="icon">
  <ShoppingCart className="h-4 w-4" />
</Button>
```

### Card

**Location**: `components/ui/card.tsx`

A flexible card component with header, content, and footer sections.

**Components**:
- `Card`: Main card container
- `CardHeader`: Card header section
- `CardTitle`: Card title
- `CardDescription`: Card description text
- `CardContent`: Main card content
- `CardFooter`: Card footer section
- `CardAction`: Action button area

**Usage**:
```typescript
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Product Name</CardTitle>
    <CardDescription>Product description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Product details go here</p>
  </CardContent>
  <CardFooter>
    <Button>Add to Cart</Button>
  </CardFooter>
</Card>
```

### Input

**Location**: `components/ui/input.tsx`

A styled input component with focus states and validation styling.

**Props**: Extends all standard HTML input props

**Usage**:
```typescript
import { Input } from '@/components/ui/input'

<Input 
  type="email" 
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Select

**Location**: `components/ui/select.tsx`

A dropdown select component built on Radix UI.

**Components**:
- `Select`: Root select component
- `SelectTrigger`: Clickable trigger button
- `SelectValue`: Displays selected value
- `SelectContent`: Dropdown content container
- `SelectItem`: Individual select option
- `SelectGroup`: Groups related options
- `SelectLabel`: Group label
- `SelectSeparator`: Visual separator

**Usage**:
```typescript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

<Select value={category} onValueChange={setCategory}>
  <SelectTrigger>
    <SelectValue placeholder="Select a category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="tools">Tools</SelectItem>
    <SelectItem value="materials">Materials</SelectItem>
    <SelectItem value="equipment">Equipment</SelectItem>
  </SelectContent>
</Select>
```

### Toast

**Location**: `components/ui/toast.tsx`

Toast notification components for user feedback.

**Components**:
- `Toast`: Root toast component
- `ToastTitle`: Toast title
- `ToastDescription`: Toast description
- `ToastAction`: Action button
- `ToastClose`: Close button
- `ToastProvider`: Context provider
- `ToastViewport`: Container for toasts

**Usage**:
```typescript
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'

<ToastProvider>
  <Toast>
    <ToastTitle>Success!</ToastTitle>
    <ToastDescription>Your action was completed.</ToastDescription>
    <ToastAction altText="Undo">Undo</ToastAction>
    <ToastClose />
  </Toast>
  <ToastViewport />
</ToastProvider>
```

### DropdownMenu

**Location**: `components/ui/dropdown-menu.tsx`

A dropdown menu component for navigation and actions.

**Components**:
- `DropdownMenu`: Root dropdown component
- `DropdownMenuTrigger`: Trigger button
- `DropdownMenuContent`: Menu content container
- `DropdownMenuItem`: Menu item
- `DropdownMenuCheckboxItem`: Checkbox menu item
- `DropdownMenuRadioItem`: Radio menu item
- `DropdownMenuLabel`: Menu section label
- `DropdownMenuSeparator`: Visual separator
- `DropdownMenuGroup`: Groups related items

**Usage**:
```typescript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### RadioGroup

**Location**: `components/ui/radio-group.tsx`

A radio button group component for single selection.

**Components**:
- `RadioGroup`: Root radio group
- `RadioGroupItem`: Individual radio button

**Usage**:
```typescript
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

<RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>
```

### Label

**Location**: `components/ui/label.tsx`

A styled label component for form inputs.

**Props**: Extends all standard HTML label props

**Usage**:
```typescript
import { Label } from '@/components/ui/label'

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

### Separator

**Location**: `components/ui/separator.tsx`

A visual separator component.

**Props**:
```typescript
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  className?: string
}
```

**Usage**:
```typescript
import { Separator } from '@/components/ui/separator'

<Separator />
<Separator orientation="vertical" />
```

### Skeleton

**Location**: `components/ui/skeleton.tsx`

A loading skeleton component for placeholder content.

**Props**: Extends all standard HTML div props

**Usage**:
```typescript
import { Skeleton } from '@/components/ui/skeleton'

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

### Textarea

**Location**: `components/ui/textarea.tsx`

A styled textarea component for multi-line text input.

**Props**: Extends all standard HTML textarea props

**Usage**:
```typescript
import { Textarea } from '@/components/ui/textarea'

<Textarea 
  placeholder="Enter your message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

## Application Components

### Header

**Location**: `components/header.tsx`

The main application header with navigation, user menu, and cart.

**Features**:
- Responsive navigation menu
- User authentication dropdown
- Shopping cart with item count
- Mobile hamburger menu
- Search functionality (UI only)

**Usage**:
```typescript
import { Header } from '@/components/header'

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
```

### Footer

**Location**: `components/footer.tsx`

The application footer with links, social media, and newsletter signup.

**Features**:
- Company information
- Quick navigation links
- Customer service links
- Social media icons
- Newsletter subscription form

**Usage**:
```typescript
import { Footer } from '@/components/footer'

function Layout({ children }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
```

### HeroSection

**Location**: `components/hero-section.tsx`

A rotating hero banner with product highlights.

**Features**:
- Auto-rotating slides (5-second intervals)
- Manual slide navigation
- Responsive design
- Call-to-action buttons

**Usage**:
```typescript
import { HeroSection } from '@/components/hero-section'

function HomePage() {
  return (
    <div>
      <HeroSection />
      {/* Other content */}
    </div>
  )
}
```

### CategoriesSection

**Location**: `components/categories-section.tsx`

A grid display of product categories with images and links.

**Features**:
- Responsive grid layout
- Hover effects
- Category images
- Navigation links

**Usage**:
```typescript
import { CategoriesSection } from '@/components/categories-section'

function HomePage() {
  return (
    <div>
      <CategoriesSection />
      {/* Other content */}
    </div>
  )
}
```

### BestSellersSection

**Location**: `components/best-sellers-section.tsx`

A product showcase section featuring best-selling items.

**Features**:
- Product grid display
- Add to cart functionality
- Wishlist functionality
- Price display with discounts
- Product badges
- Toast notifications

**Usage**:
```typescript
import { BestSellersSection } from '@/components/best-sellers-section'

function HomePage() {
  return (
    <div>
      <BestSellersSection />
      {/* Other content */}
    </div>
  )
}
```

### ThemeProvider

**Location**: `components/theme-provider.tsx`

A theme provider component for dark/light mode support.

**Props**: Extends NextThemes ThemeProviderProps

**Usage**:
```typescript
import { ThemeProvider } from '@/components/theme-provider'

function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Usage Examples

### Complete Product Card Implementation

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { useToast } from '@/hooks/use-toast'

function ProductCard({ product }: { product: Product }) {
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
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold">UGX {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              UGX {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <Button 
          className="w-full mt-4" 
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Authentication Form Implementation

```typescript
import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const success = await login(email, password)
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have been logged in successfully."
      })
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}
```

### Shopping Cart Implementation

```typescript
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

function ShoppingCart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Your cart is empty</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-muted-foreground">UGX {item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Separator />
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              Total ({totalItems} items): UGX {totalPrice.toLocaleString()}
            </span>
            <Button size="lg">Checkout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

## Best Practices

### Component Usage

1. **Always use TypeScript**: All components are fully typed for better development experience
2. **Consistent styling**: Use the `cn` utility for class name management
3. **Accessibility**: Components include proper ARIA attributes and keyboard navigation
4. **Responsive design**: Components are built with mobile-first approach

### State Management

1. **Context for global state**: Use React Context for authentication and cart state
2. **Local state for UI**: Use useState for component-specific state
3. **Toast notifications**: Use the toast hook for user feedback

### Performance

1. **Lazy loading**: Use Next.js dynamic imports for code splitting
2. **Image optimization**: Use Next.js Image component for optimized images
3. **Memoization**: Use React.memo for expensive components when needed

### Error Handling

1. **Form validation**: Implement proper form validation with user feedback
2. **Error boundaries**: Use React Error Boundaries for error handling
3. **Toast notifications**: Provide clear error messages to users

This documentation covers all public APIs, functions, and components in the FB Hardware application. For additional help or questions, please refer to the individual component files or create an issue in the project repository.