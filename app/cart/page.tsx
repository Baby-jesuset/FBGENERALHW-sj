"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")

  const subtotal = totalPrice
  const shipping = subtotal > 0 ? 15000 : 0 // UGX 15,000 flat shipping
  const tax = subtotal * 0.18 // 18% VAT
  const total = subtotal + shipping + tax

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id)
    toast({
      title: "Removed from cart",
      description: `${name} has been removed from your cart.`,
    })
  }

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      toast({
        title: "Promo code applied",
        description: "Your discount has been applied to the order.",
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
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
        <div className="md:py-3.5 bg-background py-2">
          <div className="container mx-auto px-4">
            <h1 className="font-bold text-foreground md:text-4xl text-3xl">Shopping Cart</h1>
          </div>
        </div>
<div className="container mx-auto px-4 py-6 sm:py-8">
  <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
    {/* Cart Items */}
    <div className="lg:col-span-2 space-y-4">
      {items.map((item) => (
        <Card key={item.product_id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Product Image */}
              <Link href={`/product/${item.product_id}`} className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* Product Details */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <Link href={`/product/${item.product_id}`}>
                  <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2 text-sm">
                    {item.name}
                  </h3>
                </Link>
                <p className="font-bold text-foreground text-base mt-1.5 pt-0">UGX {item.price.toLocaleString()}</p>

                {/* Quantity Controls */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3 sm:gap-4 mt-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.product_id, Number.parseInt(e.target.value) || 1)}
                      className="h-8 w-16 text-center border-0 border-x border-border rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleRemoveItem(item.product_id, item.name)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>

              {/* Item Total */}
              <div className="text-center sm:text-right mt-2 sm:mt-0">
                <p className="font-bold text-foreground text-base">
                  UGX {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
        onClick={() => {
          clearCart()
          toast({ title: "Cart cleared", description: "All items have been removed from your cart." })
        }}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear Cart
      </Button>

      <Button variant="outline" asChild className="w-full bg-transparent">
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </div>

    {/* Order Summary */}
    <div className="lg:col-span-1">
      <Card className="sticky top-24">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

          {/* Promo Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Promo Code</label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button variant="secondary" onClick={handleApplyPromo}>
                Apply
              </Button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>UGX {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>UGX {shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (18%)</span>
              <span>UGX {tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-foreground pt-3 border-t border-border">
              <span>Total</span>
              <span>UGX {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button className="w-full" size="lg" asChild>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>

          <p className="text-xs text-muted-foreground text-center">Taxes and shipping calculated at checkout</p>
        </CardContent>
      </Card>
    </div>
  </div>
</div>
      </main>
      <Footer />
    </div>
  )
}
