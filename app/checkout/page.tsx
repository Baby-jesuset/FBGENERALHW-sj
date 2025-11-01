"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState("mobile-money")
  const [isProcessing, setIsProcessing] = useState(false)

  // Redirect to signup if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signup?redirect=/checkout")
    }
  }, [isAuthenticated, isLoading, router])
  const [contact, setContact] = useState({
    firstName: user?.full_name?.split(" ")[0] || "",
    lastName: user?.full_name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    district: "",
    notes: "",
    mobileNumber: user?.phone || "",
  })

  const subtotal = totalPrice
  const shipping = subtotal > 0 ? 15000 : 0
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const orderPayload = {
        email: contact.email,
        phone: contact.phone,
        full_name: `${contact.firstName} ${contact.lastName}`,
        address: contact.address,
        city: contact.city,
        district: contact.district,
        country: "Uganda",
        payment_method: paymentMethod === "mobile-money" ? "mobile_money" : "cash_on_delivery",
        payment_status: "pending",
        status: "pending",
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total,
        notes: contact.notes,
        items: items.map((item) => ({
          product_id: item.product_id,
          product_name: item.name,
          product_image: item.image,
          quantity: item.quantity,
          price: item.price,
        })),
      }
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      })

      if (!res.ok) {
        // Try to get a specific error message from the server
        const errorData = await res.json().catch(() => null)
        throw new Error(errorData?.error || "An unexpected error occurred.")
      }
      
      clearCart()
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      })
      
      router.push("/account/orders")
      
    } catch (err) {
      toast({ 
        title: "Order Failed", 
        description: (err as Error).message, 
        variant: "destructive" 
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Don't render checkout form if not authenticated
  if (!isAuthenticated) {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart before checking out.</p>
            <Button asChild size="lg">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-muted md:py-3.5 py-0.5">
          <div className="container tracking-normal leading-7 mx-0 px-3.5">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/cart">
                <ArrowLeft className="h-4 w-4 mr-2" />
                
              </Link>
            </Button>
            <h1 className="font-bold text-foreground text-center text-2xl mx-0 my-0">Checkout</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required value={contact.firstName} onChange={e => setContact({...contact, firstName: e.target.value})} readOnly={isAuthenticated && !!user?.full_name}/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required value={contact.lastName} onChange={e => setContact({...contact, lastName: e.target.value})} readOnly={isAuthenticated && !!user?.full_name}/>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} readOnly={isAuthenticated && !!user?.email}/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} readOnly={isAuthenticated && !!user?.phone}/>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address *</Label>
                      <Input id="address" required value={contact.address} onChange={e => setContact({...contact, address: e.target.value})} readOnly={isAuthenticated && !!user?.address}/>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input id="city" required value={contact.city} onChange={e => setContact({...contact, city: e.target.value})} readOnly={isAuthenticated && !!user?.city}/>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District *</Label>
                        <Input id="district" required value={contact.district} onChange={e => setContact({...contact, district: e.target.value})}/>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                      <Input id="notes" placeholder="Any special instructions for delivery" value={contact.notes} onChange={e => setContact({...contact, notes: e.target.value})}/>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                        <RadioGroupItem value="mobile-money" id="mobile-money" />
                        <Label htmlFor="mobile-money" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Smartphone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Mobile Money</p>
                            <p className="text-sm text-muted-foreground">MTN, Airtel Money</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">Pay when you receive</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "mobile-money" && (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobileNumber">Mobile Money Number *</Label>
                          <Input id="mobileNumber" type="tel" placeholder="256XXXXXXXXX" required value={contact.mobileNumber} onChange={e => setContact({...contact, mobileNumber: e.target.value})} readOnly={isAuthenticated && !!user?.phone}/>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.product_id} className="flex gap-3">
                          <div className="relative w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold">UGX {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>UGX {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>UGX {shipping.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (18%)</span>
                        <span>UGX {tax.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>UGX {total.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By placing your order, you agree to our terms and conditions
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}
