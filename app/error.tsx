'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service (add Sentry integration here)
    console.error('Application error:', error)
  }, [error])

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Something went wrong!</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            We apologize for the inconvenience. Our team has been notified and is working on a fix.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={reset} size="lg">
              Try again
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/'}
            >
              Go home
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && error.message && (
            <div className="mt-8 p-4 bg-muted rounded-lg text-left">
              <p className="text-sm font-mono text-destructive">{error.message}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

