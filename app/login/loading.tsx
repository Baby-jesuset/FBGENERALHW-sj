import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LoginLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-8" />
            <div className="space-y-6">
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
              <div className="h-10 bg-muted rounded" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
