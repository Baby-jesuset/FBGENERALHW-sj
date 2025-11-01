"use client"

import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function BestSellersSection() {
  const { addItem } = useCart()
  const { toast } = useToast()

  const { data, isLoading } = useSWR("/api/products?limit=8", fetcher)
  const products = data?.products || []

  const handleAddToCart = (product: any) => {
    addItem(product.id)
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

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-border hover:border-primary transition-all"
                >
                  <CardContent className="p-0">
                    <Link href={`/product/${product.id}`}>
                      <div className="relative aspect-square overflow-hidden bg-background">
                        {product.is_featured && (
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                              Featured
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
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          loading="lazy"
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
          </>
        )}
      </div>
    </section>
  )
}
