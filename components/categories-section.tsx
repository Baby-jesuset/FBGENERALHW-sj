import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Power Tools",
    image: "/power-tools-collection.jpg",
    href: "/category/power-tools",
  },
  {
    name: "Hand Tools",
    image: "/hand-tools-hammers-wrenches.jpg",
    href: "/category/hand-tools",
  },
  {
    name: "Safety Equipment",
    image: "/safety-gear-hard-hat-gloves.jpg",
    href: "/category/safety",
  },
  {
    name: "Fasteners",
    image: "/screws-bolts-nails-fasteners.jpg",
    href: "/category/fasteners",
  },
  {
    name: "Paint Supplies",
    image: "/paint-brushes-rollers-supplies.jpg",
    href: "/category/paint",
  },
  {
    name: "Electrical",
    image: "/electrical-wires-cables-tools.jpg",
    href: "/category/electrical",
  },
  {
    name: "Plumbing",
    image: "/plumbing-pipes-fittings-tools.jpg",
    href: "/category/plumbing",
  },
  {
    name: "Outdoor & Garden",
    image: "/garden-tools-lawn-equipment.jpg",
    href: "/category/outdoor",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Popular Categories</h2>
            <p className="text-muted-foreground">Find everything you need for your next project</p>
          </div>
          <Link
            href="/categories"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative aspect-square rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all"
            >
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-background">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/categories"
            className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
