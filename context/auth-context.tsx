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
  is_admin?: boolean
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
      
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) {
        // Only log actual errors, not "No rows found" which is expected for guest users
        if (error.code !== "PGRST116") {
          console.error(error)
        } else {
          
          
          // If no profile exists, try to create one
          try {
            const { data: userData } = await supabase.auth.getUser()
            if (userData.user) {
              
              const { data: newProfile, error: insertError } = await supabase
                .from("profiles")
                .insert([{ id: userId, email: userData.user.email }])
                .select()
                .single()
                
              if (insertError) {
                console.error(insertError)
              } else {
                
                return newProfile
              }
            }
          } catch (createError) {
            console.error(createError)
          }
        }
        return null
      }

      
      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const refreshUser = async () => {
    try {
      
      
      // First check session which is more reliable for auth state
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error(sessionError)
        setUser(null)
        setSupabaseUser(null)
        return
      }
      
      if (!sessionData.session) {
        
        setUser(null)
        setSupabaseUser(null)
        return
      }
      
      
      
      // Get user details from the active session
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser()

      if (authError) {
        console.error(authError)
        setUser(null)
        setSupabaseUser(null)
        return
      }

      if (authUser) {
        
        setSupabaseUser(authUser)
        const profile = await fetchUserProfile(authUser.id)
        if (profile) {
          
          setUser(profile)
        } else {
          // User is authenticated but has no profile
          
          setUser(null)
        }
      } else {
        // No authenticated user
        
        setUser(null)
        setSupabaseUser(null)
      }
    } catch (error) {
      console.error(error)
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
        

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session?.user) {
            
            setSupabaseUser(session.user)
            const profile = await fetchUserProfile(session.user.id)
            if (profile) {
              
              setUser(profile)
            } else {
              
              // User is authenticated but has no profile
              setUser(null)
            }
          }
        } else if (event === 'SIGNED_OUT') {
          
          // No authenticated user
          setUser(null)
          setSupabaseUser(null)
        } else {
          // For other events, refresh the user state
          
          await refreshUser()
        }
      } catch (error) {
        console.error(error)
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
