"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface User {
  id: string
  email: string
  name: string
  phone: string
  address?: string
  city?: string
  createdAt: string
}

export interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
  }>
  total: number
  shippingAddress: string
  paymentMethod: string
}

interface AuthContextType {
  user: User | null
  orders: Order[]
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string, phone: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  resetPassword: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("fb_hardware_user")
    const storedOrders = localStorage.getItem("fb_hardware_orders")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call your backend API
    const storedUsers = localStorage.getItem("fb_hardware_users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("fb_hardware_user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const signup = async (email: string, password: string, name: string, phone: string): Promise<boolean> => {
    // Mock signup - in production, this would call your backend API
    const storedUsers = localStorage.getItem("fb_hardware_users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, never store plain passwords!
      name,
      phone,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("fb_hardware_users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("fb_hardware_user", JSON.stringify(userWithoutPassword))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fb_hardware_user")
  }

  const updateProfile = (data: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...data }
    setUser(updatedUser)
    localStorage.setItem("fb_hardware_user", JSON.stringify(updatedUser))

    // Update in users list
    const storedUsers = localStorage.getItem("fb_hardware_users")
    if (storedUsers) {
      const users = JSON.parse(storedUsers)
      const updatedUsers = users.map((u: any) => (u.id === user.id ? { ...u, ...data } : u))
      localStorage.setItem("fb_hardware_users", JSON.stringify(updatedUsers))
    }
  }

  const resetPassword = async (email: string): Promise<boolean> => {
    // Mock password reset - in production, this would send a reset email
    const storedUsers = localStorage.getItem("fb_hardware_users")
    const users = storedUsers ? JSON.parse(storedUsers) : []

    return users.some((u: any) => u.email === email)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        resetPassword,
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
