# Quick Reference Guide

This guide provides quick access to commonly used components, patterns, and utilities in the FB Hardware application.

## Table of Contents

1. [Common Imports](#common-imports)
2. [Component Quick Reference](#component-quick-reference)
3. [Context Hooks](#context-hooks)
4. [Utility Functions](#utility-functions)
5. [Common Patterns](#common-patterns)
6. [TypeScript Types](#typescript-types)

## Common Imports

### UI Components
```typescript
// Buttons
import { Button } from '@/components/ui/button'

// Cards
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'

// Forms
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

// Feedback
import { useToast } from '@/hooks/use-toast'
import { Toast, ToastAction, ToastClose, ToastDescription, ToastTitle } from '@/components/ui/toast'

// Navigation
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Layout
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
```

### Context Hooks
```typescript
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
```

### Utilities
```typescript
import { cn } from '@/lib/utils'
```

## Component Quick Reference

### Button
```typescript
// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>

// States
<Button disabled>Disabled</Button>
<Button asChild><Link href="/">Link</Link></Button>
```

### Card
```typescript
// Basic card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Card with action
<Card>
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </div>
      <CardAction>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </CardAction>
    </div>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>
```

### Form Elements
```typescript
// Input with label
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email" />
</div>

// Select dropdown
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>

// Radio group
<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
</RadioGroup>

// Textarea
<Textarea placeholder="Enter message" rows={4} />
```

### Toast Notifications
```typescript
const { toast } = useToast()

// Basic toast
toast({
  title: "Success!",
  description: "Action completed successfully."
})

// Error toast
toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive"
})

// Toast with action
toast({
  title: "Item added",
  description: "Check your cart.",
  action: (
    <ToastAction altText="View cart">
      View Cart
    </ToastAction>
  )
})
```

### Dropdown Menu
```typescript
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Context Hooks

### Authentication
```typescript
const { 
  user, 
  isAuthenticated, 
  login, 
  signup, 
  logout, 
  updateProfile 
} = useAuth()

// Login
const success = await login(email, password)

// Signup
const success = await signup(email, password, name, phone)

// Logout
logout()

// Update profile
updateProfile({ name: 'New Name', phone: '123456789' })
```

### Shopping Cart
```typescript
const { 
  items, 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  totalItems, 
  totalPrice 
} = useCart()

// Add item
addItem({
  id: product.id,
  name: product.name,
  price: product.price,
  image: product.image
})

// Update quantity
updateQuantity(itemId, newQuantity)

// Remove item
removeItem(itemId)

// Clear cart
clearCart()
```

## Utility Functions

### Class Name Utility
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

## Common Patterns

### Product Card
```typescript
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
          <span className="text-lg font-bold">
            UGX {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              UGX {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <Button className="w-full mt-4" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Loading State
```typescript
function ProductList({ isLoading, products }: { isLoading: boolean, products: Product[] }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-0">
              <Skeleton className="h-48 w-full" />
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Form Handling
```typescript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Handle form submission
      await submitForm(formData)
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon."
      })
      
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
          disabled={isLoading}
        />
      </div>
      
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
```

## TypeScript Types

### Product
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

### User
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

### Cart Item
```typescript
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}
```

### Order
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

## Common CSS Classes

### Layout
```css
/* Container */
container mx-auto px-4

/* Grid layouts */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

/* Flex layouts */
flex items-center justify-between
flex flex-col space-y-4

/* Spacing */
space-y-4 space-x-2
p-4 px-6 py-8
mt-4 mb-8
```

### Typography
```css
/* Headings */
text-2xl font-bold
text-lg font-semibold
text-sm text-muted-foreground

/* Text styling */
line-clamp-2 truncate
text-center text-left text-right
```

### Colors
```css
/* Text colors */
text-foreground text-muted-foreground
text-primary text-destructive
text-white text-black

/* Background colors */
bg-background bg-card bg-muted
bg-primary bg-secondary bg-destructive
```

### States
```css
/* Hover states */
hover:bg-accent hover:text-primary
hover:scale-105 hover:opacity-80

/* Focus states */
focus:outline-none focus:ring-2 focus:ring-ring
focus-visible:ring-2 focus-visible:ring-ring

/* Disabled states */
disabled:opacity-50 disabled:cursor-not-allowed
disabled:pointer-events-none
```

This quick reference guide provides all the essential information needed to work with the FB Hardware application components and patterns efficiently.