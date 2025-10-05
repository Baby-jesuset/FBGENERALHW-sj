import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-background md:py-4 py-1.5">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-48 mx-auto" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-96 w-full max-w-2xl mx-auto" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
