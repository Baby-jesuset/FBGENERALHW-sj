"use client"

import { LoadingSpinner } from "@/components/loading-spinner"
import { HeaderLite } from '@/components/header-lite'
import { Footer } from "@/components/footer"

interface PageLoadingProps {
  showHeader?: boolean
  showFooter?: boolean
}

export function PageLoading({ showHeader = true, showFooter = true }: PageLoadingProps) {
  return (
    <>
      {showHeader && <HeaderLite />}
      <main className="min-h-screen bg-background flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </main>
      {showFooter && <Footer />}
    </>
  )
}

