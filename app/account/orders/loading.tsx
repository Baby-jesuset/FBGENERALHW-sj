import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function OrdersLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 animate-pulse">
            <div className="h-4 bg-muted rounded w-32 mb-4" />
            <div className="h-10 bg-muted rounded w-1/3 mb-2" />
            <div className="h-4 bg-muted rounded w-1/4" />
          </div>
          <div className="space-y-6">
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
