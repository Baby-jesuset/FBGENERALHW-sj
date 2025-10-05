import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AccountLoading() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 animate-pulse">
            <div className="h-10 bg-muted rounded w-1/4 mb-2" />
            <div className="h-4 bg-muted rounded w-1/6" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="h-32 bg-muted rounded-lg animate-pulse" />
                <div className="h-32 bg-muted rounded-lg animate-pulse" />
              </div>
              <div className="h-96 bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="h-64 bg-muted rounded-lg animate-pulse" />
              <div className="h-48 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
