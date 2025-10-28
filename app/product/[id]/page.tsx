"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Minus, Plus, Loader2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id
  const { addItem } = useCart()
  const { toast } = useToast()

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { data, error, isLoading } = useSWR(`/api/products/${productId}`, fetcher)
  const product = data?.product

  const { data: relatedData } = useSWR(
    product ? `/api/products?category=${encodeURIComponent(product.category)}&limit=4` : null,
    fetcher,
  )
  const relatedProducts = relatedData?.products?.filter((p: any) => p.id !== product?.id) || []

  const handleAddToCart = () => {
    if (!product) return
    
    // Check if product is out of stock
    if (product.stock <= 0) {
      toast({
        title: "Out of stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      })
      return
    }
    
    // Make sure quantity doesn't exceed available stock
    const safeQuantity = Math.min(quantity, product.stock)
    
    for (let i = 0; i < safeQuantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
    toast({
      title: "Added to cart",
      description: `${safeQuantity} × ${product.name} added to your cart.`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => router.push("/shop")}>Back to Shop</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const images = product.images
    ? typeof product.images === "string"
      ? JSON.parse(product.images)
      : product.images
    : [product.image]

  const specs = product.specs ? (typeof product.specs === "string" ? JSON.parse(product.specs) : product.specs) : []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-foreground">
                Shop
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
                {product.is_featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary text-primary-foreground">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? "border-primary" : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 10vw"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-muted-foreground">{product.category}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">UGX {product.price.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm font-medium text-green-600">
                      In Stock ({product.stock} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="h-2 w-2 rounded-full bg-destructive" />
                    <span className="text-sm font-medium text-destructive">Out of Stock</span>
                  </>
                )}
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 gap-2"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    disabled={product.stock <= 0}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Specifications */}
              {specs.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                    <div className="space-y-3">
                      {specs.map((spec: any, index: number) => (
                        <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                          <span className="text-muted-foreground">{spec.label}</span>
                          <span className="font-medium text-foreground">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct: any) => (
                  <Card
                    key={relatedProduct.id}
                    className="group overflow-hidden border-border hover:border-primary transition-all"
                  >
                    <CardContent className="p-0">
                      <Link href={`/product/${relatedProduct.id}`}>
                        <div className="relative aspect-square overflow-hidden bg-background">
                          <Image
                            src={relatedProduct.image_url || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            loading="lazy"
                          />
                        </div>
                      </Link>
                      <div className="p-4 space-y-2">
                        <Link href={`/product/${relatedProduct.id}`}>
                          <h3 className="font-semibold text-foreground line-clamp-2 leading-snug hover:text-primary transition-colors">
                            {relatedProduct.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-foreground">
                            UGX {relatedProduct.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
