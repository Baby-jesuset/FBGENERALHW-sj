"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

export interface CartItem {
  product_id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product_id: string, quantity?: number) => Promise<void>
  removeItem: (product_id: string) => Promise<void>
  updateQuantity: (product_id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  totalItems: number
  totalPrice: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const supabase = createClient()
  const { toast } = useToast()

  const fetchCart = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Failed to fetch cart')
      const { cartItems } = await response.json()
      setItems(cartItems.map((item: any) => ({
        ...item,
        name: item.products.name,
        price: item.products.price,
        image: item.products.image
      })))
    } catch (error: any) {
      toast({
        title: "Error Loading Cart",
        description: error.message,
        variant: "destructive"
      })
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const checkUserAndFetchCart = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        await fetchCart()
      } else {
        setUserId(null)
        setItems([])
        setIsLoading(false)
      }
    }

    checkUserAndFetchCart()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUserId(session!.user.id)
        fetchCart()
      } else if (event === 'SIGNED_OUT') {
        setUserId(null)
        setItems([])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchCart])

  const addItem = async (product_id: string, quantity = 1) => {
    // Optimistic update
    setItems(prev => {
        const existing = prev.find(i => i.product_id === product_id)
        if (existing) {
            return prev.map(i => i.product_id === product_id ? { ...i, quantity: i.quantity + quantity } : i)
        }
        // This is a bit tricky as we don't have product details yet
        // A full implementation would fetch product details or pass them in
        return [...prev, { product_id, quantity, name: 'Loading...', price: 0, image: '', products: { name: '', price: 0, image: ''} }]
    })

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id, quantity }),
      })

      if (!response.ok) {
        let errorMessage = `Error: ${response.status} ${response.statusText}`
        try {
          const errorBody = await response.json()
          errorMessage = errorBody.message || JSON.stringify(errorBody)
        } catch (e) {
          // Not a JSON response
          const textError = await response.text()
          if (textError) {
            errorMessage = textError
          }
        }
        throw new Error(errorMessage)
      }

      await fetchCart() // Re-sync with server
    } catch (error: any) {
      toast({
        title: "Error Adding Item",
        description: error.message,
        variant: "destructive"
      })
      await fetchCart() // Revert on error
    }
  }

  const removeItem = async (product_id: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id }),
      })
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to remove item' }))
        throw new Error(error.message || 'Failed to remove item')
      }
      // Re-sync with server state on success to ensure consistency.
      await fetchCart() 
    } catch (error: any) {
      toast({
        title: "Error Removing Item",
        description: error.message,
        variant: "destructive"
      })
      // Optionally, you might want to re-fetch the cart here as well 
      // to ensure UI consistency with the server state after an error.
      await fetchCart()
    }
  }

  const updateQuantity = async (product_id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(product_id)
      return
    }
    // Optimistic update
    setItems(prev => prev.map(i => i.product_id === product_id ? { ...i, quantity } : i))
    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id, quantity }),
      })
      if (!response.ok) {
        let errorDetails = ''
        try {
          const errorBody = await response.json()
          errorDetails = errorBody.message || JSON.stringify(errorBody)
        } catch (e) {
          errorDetails = await response.text()
        }
        throw new Error(`Update quantity failed: ${response.status} ${errorDetails}`)
      }
      await fetchCart()
    } catch (error: any) {
      toast({
        title: "Error Updating Quantity",
        description: error.message,
        variant: "destructive"
      })
      await fetchCart()
    }
  }

  const clearCart = async () => {
    // Optimistically clear the cart on the frontend
    const oldItems = items
    setItems([])

    try {
      // Call the dedicated API endpoint to clear the cart on the backend
      const response = await fetch('/api/cart/clear', {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error(`Failed to clear cart: ${response.status} ${response.statusText}`)
      }
    } catch (error: any) {
      toast({
        title: "Error Clearing Cart",
        description: error.message,
        variant: "destructive"
      })
      // If the API call fails, revert the frontend state
      setItems(oldItems)
    }
  }

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])
  
  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [items])

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
