"use client"

import Link from "next/link"
import Image from "next/image"

export function HeaderLite() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo-darkblue.svg" 
              alt="FB Hardware" 
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
