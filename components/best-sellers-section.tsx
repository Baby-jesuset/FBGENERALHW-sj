"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { products as allProducts } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"

export function BestSellersSection() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const products = allProducts.slice(0, 8)

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Best Sellers</h2>
          <p className="text-muted-foreground">Top-quality products trusted by professionals</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-border hover:border-primary transition-all">
              <CardContent className="p-0">
                <Link href={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-background">
                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.badge === "Sale"
                              ? "bg-destructive text-destructive-foreground"
                              : product.badge === "New"
                                ? "bg-secondary text-secondary-foreground"
                                : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 z-10 bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.preventDefault()
                        toast({ title: "Added to wishlist" })
                      }}
                    >
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4 space-y-3">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">UGX {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        UGX {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button className="w-full gap-2" size="sm" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop">
            <Button size="lg" variant="outline">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
