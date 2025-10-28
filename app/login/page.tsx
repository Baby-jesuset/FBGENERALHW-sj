"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("[v0] Attempting login with email:", email)
      
      // Sign in with password
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error("[v0] Sign in error:", signInError)
        throw signInError
      }
      
      console.log("[v0] Sign in successful:", signInData.user ? "User found" : "No user")
      
      // Get user after sign in
      const { data: { user: authUser }, error: getUserError } = await supabase.auth.getUser()
      
      if (getUserError) {
        console.error("[v0] Get user error:", getUserError)
        throw getUserError
      }
      
      if (!authUser) {
        console.error("[v0] No authenticated user found after login")
        throw new Error("Authentication failed. Please try again.")
      }
      
      console.log("[v0] Auth user retrieved:", authUser.id)
      
      // Get profile with admin status
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single()
      
      if (profileError) {
        console.error("[v0] Profile fetch error:", profileError)
        // Don't throw here, just log the error
      }
      
      console.log("[v0] Profile data:", profile)
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      })
      
      // Use router.replace instead of push for more reliable navigation
      // and add a slight delay to ensure auth state is properly updated
      setTimeout(() => {
        try {
          if (profile?.is_admin) {
            console.log("[v0] Redirecting to admin")
            router.replace("/admin")
          } else {
            console.log("[v0] Redirecting to account")
            router.replace("/account")
          }
        } catch (navError) {
          console.error("[v0] Navigation error:", navError)
          // Fallback to window.location if router fails
          window.location.href = profile?.is_admin ? "/admin" : "/account"
        }
      }, 800)
      
    } catch (error: any) {
      console.error("[v0] Login process error:", error)
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
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
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 text-secondary">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/reset-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="hover:underline font-medium text-secondary">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
