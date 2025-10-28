"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export interface User {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  address: string | null
  city: string | null
  country: string | null
  created_at: string
}

interface AuthContextType {
  user: User | null
  supabaseUser: SupabaseUser | null
  isAuthenticated: boolean
  isLoading: boolean
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("[v0] Fetching profile for user:", userId)
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        // Only log actual errors, not "No rows found" which is expected for guest users
        if (error.code !== "PGRST116") {
          console.error("[v0] Error fetching user profile:", error)
        } else {
          console.log("[v0] No profile found for user:", userId)
          
          // If no profile exists, try to create one
          try {
            const { data: userData } = await supabase.auth.getUser()
            if (userData.user) {
              console.log("[v0] Attempting to create profile for user:", userId)
              const { data: newProfile, error: insertError } = await supabase
                .from("profiles")
                .insert([{ id: userId, email: userData.user.email }])
                .select()
                .single()
                
              if (insertError) {
                console.error("[v0] Failed to create profile:", insertError)
              } else {
                console.log("[v0] Created new profile:", newProfile)
                return newProfile
              }
            }
          } catch (createError) {
            console.error("[v0] Error creating profile:", createError)
          }
        }
        return null
      }

      console.log("[v0] Profile fetched successfully:", data?.id)
      return data
    } catch (error) {
      console.error("[v0] Exception fetching user profile:", error)
      return null
    }
  }

  const refreshUser = async () => {
    try {
      console.log("[v0] Refreshing user...")
      
      // First check session which is more reliable for auth state
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error("[v0] Session error:", sessionError)
        setUser(null)
        setSupabaseUser(null)
        return
      }
      
      if (!sessionData.session) {
        console.log("[v0] No active session found")
        setUser(null)
        setSupabaseUser(null)
        return
      }
      
      console.log("[v0] Active session found, getting user details")
      
      // Get user details from the active session
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError) {
        console.error("[v0] Auth error:", authError)
        setUser(null)
        setSupabaseUser(null)
        return
      }

      if (authUser) {
        console.log("[v0] Auth user found:", authUser.id)
        setSupabaseUser(authUser)
        const profile = await fetchUserProfile(authUser.id)
        if (profile) {
          console.log("[v0] Setting user profile:", profile.id)
          setUser(profile)
        } else {
          // User is authenticated but has no profile
          console.log("[v0] User authenticated but no profile found")
          setUser(null)
        }
      } else {
        // No authenticated user
        console.log("[v0] No authenticated user found")
        setUser(null)
        setSupabaseUser(null)
      }
    } catch (error) {
      console.error("[v0] Error refreshing user:", error)
      setUser(null)
      setSupabaseUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial user fetch
    refreshUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        console.log("[v0] Auth state changed:", event)

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            console.log("[v0] User signed in:", session.user.id)
            setSupabaseUser(session.user)
            const profile = await fetchUserProfile(session.user.id)
            if (profile) {
              console.log("[v0] Profile found for signed in user")
              setUser(profile)
            } else {
              console.log("[v0] No profile found for signed in user")
              // User is authenticated but has no profile
              setUser(null)
            }
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("[v0] User signed out")
          // No authenticated user
          setUser(null)
          setSupabaseUser(null)
        } else {
          // For other events, refresh the user state
          console.log("[v0] Other auth event, refreshing user state")
          await refreshUser()
        }
      } catch (error) {
        console.error("[v0] Error handling auth state change:", error)
        setUser(null)
        setSupabaseUser(null)
      } finally {
        setIsLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        isAuthenticated: !!user,
        isLoading,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
