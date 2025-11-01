"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

export default function ResetPasswordPage() {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/reset-password/confirm`,
      })

      if (error) throw error

      setEmailSent(true)
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      })
    } catch (error: any) {
      console.error("Error sending password reset link:", error)
      // Whitelist known-safe Supabase error messages for user feedback
      const safeMessages: { [key: string]: string } = {
        // "For security purposes, you can only request a password reset once every 60 seconds.":
        //   "Reset link already sent. Please check your email or wait a moment before trying again.",
      }

      const userFriendlyMessage =
        (error?.message && safeMessages[error.message]) || "An unexpected error occurred. Please try again."

      toast({
        title: "Error Sending Reset Link",
        description: userFriendlyMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            {!emailSent ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
                  <p className="text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link href="/login" className="text-sm text-primary hover:underline inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Check your email</h2>
                <p className="text-muted-foreground mb-6">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
                <Button asChild className="w-full">
                  <Link href="/login">Return to login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
