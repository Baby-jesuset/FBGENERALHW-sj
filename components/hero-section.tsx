"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const heroSlides = [
  {
    id: 1,
    title: "TORORO CEMENT",
    description:
      "Premium quality cement from Uganda's leading manufacturer. Perfect for all construction projects—strong, reliable, and trusted by builders nationwide for exceptional durability.",
    image: "/bags-of-tororo-cement-stacked.jpg",
    buttonText: "BUY NOW",
  },
  {
    id: 2,
    title: "IRON SHEETS",
    description:
      "High-grade corrugated iron roofing sheets built to withstand Uganda's climate. Available in multiple gauges and colors—durable, weather-resistant, and long-lasting protection.",
    image: "/corrugated-iron-roofing-sheets-stacked.jpg",
    buttonText: "BUY NOW",
  },
  {
    id: 3,
    title: "PROFESSIONAL POWER DRILL",
    description:
      "Engineered with 20V lithium-ion battery technology, this drill delivers exceptional torque and precision for demanding projects—powerful, reliable, and built to last.",
    image: "/professional-power-drill.jpg",
    buttonText: "BUY NOW",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-muted">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              style={{ transform: "rotate(-5deg) scale(1.2)" }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight uppercase tracking-wide">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">{slide.description}</p>
                <Button
                  size="lg"
                  className="bg-black hover:bg-black/80 text-white px-12 py-6 text-base font-semibold uppercase tracking-wider"
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, index) => (
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
    </section>
  )
}
