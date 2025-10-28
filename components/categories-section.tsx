import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/categories`, {
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data.categories || []
  } catch (error) {
    console.error("[v0] Failed to fetch categories:", error)
    return []
  }
}

export async function CategoriesSection() {
  const categories = await getCategories()

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Popular Categories</h2>
            <p className="text-muted-foreground">Find everything you need for your next project</p>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 8).map((category: any) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative aspect-square rounded-lg overflow-hidden bg-card border border-border hover:border-primary transition-all"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-background">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/shop" className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            View All Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
