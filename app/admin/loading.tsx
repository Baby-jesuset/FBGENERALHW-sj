import { LoadingSpinner } from "@/components/loading-spinner"

export default function AdminLoading() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    </div>
  )
}

