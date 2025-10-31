"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'fb-hardware-cart'
const USER_ID_STORAGE_KEY = 'fb-hardware-cart-user'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const supabase = createClient()

  // Monitor auth state changes and clear cart on user change
  useEffect(() => {
    const checkAuthAndLoadCart = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        const newUserId = user?.id || 'guest'
        const savedUserId = localStorage.getItem(USER_ID_STORAGE_KEY)
        
        // If user changed, clear the cart
        if (savedUserId && savedUserId !== newUserId) {
          setItems([])
          localStorage.removeItem(CART_STORAGE_KEY)
        }
        
        // Update current user ID
        setCurrentUserId(newUserId)
        localStorage.setItem(USER_ID_STORAGE_KEY, newUserId)
        
        // Load cart for current user
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (savedCart) {
          setItems(JSON.parse(savedCart))
        }
      } catch (error) {
        console.error('Failed to load cart:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndLoadCart()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const newUserId = session?.user?.id || 'guest'
      
      // Clear cart on logout or user change
      if (event === 'SIGNED_OUT' || (currentUserId && currentUserId !== newUserId)) {
        setItems([])
        localStorage.removeItem(CART_STORAGE_KEY)
      }
      
      setCurrentUserId(newUserId)
      localStorage.setItem(USER_ID_STORAGE_KEY, newUserId)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && currentUserId) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Failed to save cart:', error)
      }
    }
  }, [items, isLoading, currentUserId])

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
    // Keep the user ID so cart remains associated with current user
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        totalItems, 
        totalPrice,
        isLoading 
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
