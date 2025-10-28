import { LoadingSpinner } from "@/components/loading-spinner"

export default function ProductsLoading() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Loading products...</p>
        </div>
      </div>
    </div>
  )
}

