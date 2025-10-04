"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Search } from "lucide-react"
import { products, categories } from "@/lib/products"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])
  const [isFilterVisible, setIsFilterVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsFilterVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsFilterVisible(false)
      } else {
        // Scrolling up
        setIsFilterVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, sortBy, priceRange])

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-background md:py-4 py-1.5">
          <div className="container mx-auto px-4">
            <h1 className="font-bold text-foreground text-center md:text-4xl text-3xl">SHOP</h1>
          </div>
        </div>

        {/* Filters and Search */}
        <div
          className={`border-b border-border bg-background sticky top-16 z-40 font-medium transition-transform duration-300 ${
            isFilterVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
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

            {/* Active Filters */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </span>
              {selectedCategory !== "All" && (
                <Button variant="secondary" size="sm" onClick={() => setSelectedCategory("All")}>
                  {selectedCategory} ×
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-border hover:border-primary transition-all"
                >
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
