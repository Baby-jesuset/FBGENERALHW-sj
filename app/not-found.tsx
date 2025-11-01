'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeaderLite } from '@/components/header-lite'
import { Footer } from '@/components/footer'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <HeaderLite />
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground text-lg mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/shop">
                <Search className="mr-2 h-5 w-5" />
                Browse Shop
              </Link>
            </Button>
          </div>
          <div className="mt-12">
            <h3 className="text-sm font-semibold text-foreground mb-4">Popular Pages</h3>
            <div className="flex gap-4 justify-center flex-wrap text-sm">
              <Link href="/shop" className="text-primary hover:underline">
                Shop
              </Link>
              <Link href="/about" className="text-primary hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="text-primary hover:underline">
                Contact
              </Link>
              <Link href="/cart" className="text-primary hover:underline">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

