# Component Examples

This document provides detailed examples and code snippets for all components in the FB Hardware application.

## Table of Contents

1. [UI Component Examples](#ui-component-examples)
2. [Form Examples](#form-examples)
3. [Layout Examples](#layout-examples)
4. [Interactive Examples](#interactive-examples)
5. [Advanced Patterns](#advanced-patterns)

## UI Component Examples

### Button Variants

```typescript
import { Button } from '@/components/ui/button'

function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Default Button */}
      <Button>Default Button</Button>
      
      {/* Destructive Button */}
      <Button variant="destructive">Delete Item</Button>
      
      {/* Outline Button */}
      <Button variant="outline">Cancel</Button>
      
      {/* Secondary Button */}
      <Button variant="secondary">Secondary Action</Button>
      
      {/* Ghost Button */}
      <Button variant="ghost">Ghost Button</Button>
      
      {/* Link Button */}
      <Button variant="link">Link Button</Button>
      
      {/* Different Sizes */}
      <div className="flex items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Disabled State */}
      <Button disabled>Disabled Button</Button>
      
      {/* Loading State */}
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  )
}
```

### Card Layouts

```typescript
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardAction 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function CardExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Basic Card */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
          <CardDescription>This is a basic card with header and content</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
      </Card>
      
      {/* Product Card */}
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <img 
            src="/product-image.jpg" 
            alt="Product"
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">Product Name</CardTitle>
              <CardDescription>Product description</CardDescription>
            </div>
            <Badge variant="secondary">New</Badge>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-bold">UGX 25,000</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </Card>
      
      {/* Card with Action */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Card with Action</CardTitle>
              <CardDescription>This card has an action button</CardDescription>
            </div>
            <CardAction>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardAction>
          </div>
        </CardHeader>
        <CardContent>
          <p>Card content with action button in header</p>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Form Components

```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'

function FormExamples() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
    newsletter: false,
    contactMethod: 'email'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
      {/* Text Input */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Enter your name"
          required
        />
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Select Dropdown */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => setFormData({...formData, category: value})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tools">Tools</SelectItem>
            <SelectItem value="materials">Building Materials</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="safety">Safety Equipment</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Radio Group */}
      <div className="space-y-3">
        <Label>Preferred Contact Method</Label>
        <RadioGroup 
          value={formData.contactMethod}
          onValueChange={(value) => setFormData({...formData, contactMethod: value})}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email-radio" />
            <Label htmlFor="email-radio">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone-radio" />
            <Label htmlFor="phone-radio">Phone</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms" id="sms-radio" />
            <Label htmlFor="sms-radio">SMS</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          checked={formData.newsletter}
          onCheckedChange={(checked) => setFormData({...formData, newsletter: !!checked})}
        />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          placeholder="Enter your message"
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Submit Form
      </Button>
    </form>
  )
}
```

## Form Examples

### Login Form

```typescript
import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### Registration Form

```typescript
import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)

    try {
      const success = await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.phone
      )
      
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to FB Hardware."
        })
      } else {
        toast({
          title: "Registration failed",
          description: "Email already exists.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
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
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Enter your phone number"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Create a password"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirm your password"
              required
              disabled={isLoading}
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

## Layout Examples

### Page Layout with Header and Footer

```typescript
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

// Usage
function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <CategoriesSection />
      <BestSellersSection />
    </PageLayout>
  )
}
```

### Product Grid Layout

```typescript
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/context/cart-context'
import { useToast } from '@/hooks/use-toast'

function ProductGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (product: Product) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-square overflow-hidden">
              {product.badge && (
                <Badge 
                  className="absolute top-3 left-3 z-10"
                  variant={product.badge === 'Sale' ? 'destructive' : 'secondary'}
                >
                  {product.badge}
                </Badge>
              )}
              
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="font-semibold line-clamp-2">{product.name}</h3>
              
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  UGX {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    UGX {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              
              <Button 
                className="w-full" 
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

## Interactive Examples

### Shopping Cart with Quantity Controls

```typescript
import { useCart } from '@/context/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Trash2, Plus, Minus } from 'lucide-react'

function ShoppingCart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground">Add some items to get started</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Shopping Cart ({totalItems} items)</h2>
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

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
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.name}</h3>
                  <p className="text-muted-foreground">
                    UGX {item.price.toLocaleString()} each
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">
                    UGX {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>UGX {totalPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-lg">
              <span>Shipping:</span>
              <span>UGX 5,000</span>
            </div>
            
            <Separator />
            
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span>UGX {(totalPrice + 5000).toLocaleString()}</span>
            </div>
            
            <Button size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

### User Profile with Dropdown Menu

```typescript
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut, ShoppingBag } from 'lucide-react'

function UserProfile() {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <Button variant="ghost" asChild>
        <Link href="/login">
          <User className="h-4 w-4 mr-2" />
          Login
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <User className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/account/orders" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={logout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Advanced Patterns

### Toast Notification System

```typescript
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'

function ToastExamples() {
  const { toast } = useToast()

  return (
    <div className="space-y-4">
      <Button
        onClick={() => {
          toast({
            title: "Success!",
            description: "Your action was completed successfully.",
          })
        }}
      >
        Show Success Toast
      </Button>

      <Button
        variant="destructive"
        onClick={() => {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          })
        }}
      >
        Show Error Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Item added to cart",
            description: "Check your cart to proceed with checkout.",
            action: (
              <ToastAction altText="View cart">
                View Cart
              </ToastAction>
            ),
          })
        }}
      >
        Show Toast with Action
      </Button>

      <Button
        variant="secondary"
        onClick={() => {
          toast({
            title: "Multiple toasts",
            description: "This will show multiple toasts.",
          })
          
          setTimeout(() => {
            toast({
              title: "Second toast",
              description: "This is the second toast.",
            })
          }, 1000)
        }}
      >
        Show Multiple Toasts
      </Button>
    </div>
  )
}
```

### Loading States with Skeletons

```typescript
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

function LoadingSkeletons() {
  return (
    <div className="space-y-4">
      {/* Product Card Skeleton */}
      <Card>
        <CardHeader className="p-0">
          <Skeleton className="h-48 w-full" />
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>

      {/* List Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Profile Skeleton */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
      </div>
    </div>
  )
}

// Usage in a component with loading state
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

### Responsive Navigation

```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'

function ResponsiveNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold">FB Hardware</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
```

These examples demonstrate the full range of component usage patterns in the FB Hardware application. Each example includes proper TypeScript typing, error handling, and follows the established design patterns used throughout the application.