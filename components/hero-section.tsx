"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import useSWR from "swr"
import { LoadingSpinner } from "@/components/loading-spinner"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  image?: string;
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const { data, isLoading } = useSWR("/api/products?is_featured=true&limit=3", fetcher)
  const featuredProducts: FeaturedProduct[] = data?.products || []

  useEffect(() => {
    if (featuredProducts.length === 0) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [featuredProducts.length])

  if (isLoading) {
    return (
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-muted flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </section>
    )
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-muted">
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight uppercase tracking-wide">
                FB GENERAL HARDWARE
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Your one-stop shop for all building materials and hardware needs
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-base font-semibold uppercase tracking-wider"
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-muted">
      {featuredProducts.map((product, index: number) => (
        <div
          key={product.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover object-center"
              style={{ transform: "rotate(-5deg) scale(1.2)" }}
              priority={index === 0}
              quality={85}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight uppercase tracking-wide">
                  {product.name}
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">{product.description}</p>
                <Button
                  size="lg"
                  className="bg-black hover:bg-black/80 text-white px-12 py-6 text-base font-semibold uppercase tracking-wider"
                >
                  BUY NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      {featuredProducts.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {featuredProducts.map((_, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
