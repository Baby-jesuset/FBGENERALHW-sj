import { LoadingSpinner } from "@/components/loading-spinner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface PageLoadingProps {
  showHeader?: boolean
  showFooter?: boolean
}

export function PageLoading({ showHeader = true, showFooter = true }: PageLoadingProps) {
  return (
    <>
      {showHeader && <Header />}
      <main className="min-h-screen bg-background flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </main>
      {showFooter && <Footer />}
    </>
  )
}

