"use client"

import { useMemo, useState, use } from "react";
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, ArrowLeft, Loader2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const { slug } = params
  const [sortBy, setSortBy] = useState("featured")
  const { addItem } = useCart()
  const { toast } = useToast()

  const { data, error, isLoading } = useSWR(`/api/categories/${slug}`, fetcher)
  const category = data?.category
  const products = data?.products || []

  const sortedProducts = useMemo(() => {
    const sorted = [...products]

    switch (sortBy) {
      case "price-low":
        sorted.sort((a: any, b: any) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a: any, b: any) => b.price - a.price)
        break
      case "name":
        sorted.sort((a: any, b: any) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return sorted
  }, [products, sortBy])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-muted md:py-3.5 py-1.5">
          <div className="container mx-auto px-4 text-left leading-7">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Link>
            </Button>
            {isLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <h1 className="font-bold text-foreground mb-2 text-center md:text-3xl text-2xl">
                  {category?.name || "Category"}
                </h1>
                {category?.description && (
                  <p className="text-muted-foreground text-center max-w-2xl mx-auto">{category.description}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sort Options */}
        <div className="border-b border-border bg-background sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-destructive text-lg mb-4">Failed to load category. Please try again.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No products found in this category.</p>
              <Button asChild>
                <Link href="/shop">Browse All Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product: any) => (
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
