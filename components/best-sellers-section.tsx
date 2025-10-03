import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Tororo Cement 50kg Bag",
    price: 35000,
    originalPrice: null,
    image: "/tororo-cement-bag-50kg.jpg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Iron Sheets 28 Gauge (3m)",
    price: 28000,
    originalPrice: null,
    image: "/corrugated-iron-roofing-sheet.jpg",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Iron Sheets 30 Gauge (3m)",
    price: 25000,
    originalPrice: 27000,
    image: "/corrugated-metal-roofing-sheet.jpg",
    badge: "Sale",
  },
  {
    id: 4,
    name: "Professional Cordless Drill Set",
    price: 550000,
    originalPrice: 650000,
    image: "/cordless-drill-set-with-battery.jpg",
    badge: "Sale",
  },
  {
    id: 5,
    name: "Heavy Duty Tool Box",
    price: 320000,
    originalPrice: null,
    image: "/red-metal-tool-box-storage.jpg",
    badge: null,
  },
  {
    id: 6,
    name: "Socket Wrench Set (120pc)",
    price: 480000,
    originalPrice: null,
    image: "/socket-wrench-set-in-case.jpg",
    badge: "Popular",
  },
  {
    id: 7,
    name: "Laser Level & Measuring Tool",
    price: 290000,
    originalPrice: 350000,
    image: "/laser-level-measuring-tool.jpg",
    badge: "Sale",
  },
  {
    id: 8,
    name: "Tororo Cement 25kg Bag",
    price: 18000,
    originalPrice: null,
    image: "/small-cement-bag.jpg",
    badge: "New",
  },
]

export function BestSellersSection() {
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
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full gap-2" size="sm">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-foreground line-clamp-2 leading-snug">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">UGX {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        UGX {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
