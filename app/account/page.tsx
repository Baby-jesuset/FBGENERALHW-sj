"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Package, User, LogOut, ShoppingBag } from "lucide-react"

interface Order {
  id: string
  created_at: string
  status: string
  total: number
}

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("orders")
          .select("id, created_at, status, total")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3)

        if (error) throw error

        setOrders(data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setOrdersLoading(false)
      }
    }

    if (user) {
      fetchOrders()
    }
  }, [user])

  const handleLogout = async () => {
    try {
      
      // First clear any local state
      localStorage.removeItem("supabase.auth.token")
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error("Logout error:", error)
        throw error
      }
      
      
      
      // Use window.location for a full page refresh to ensure clean state
      window.location.href = "/"
    } catch (err) {
      console.error("Error during logout:", err)
      // Force refresh as fallback
      window.location.reload()
    }
  }

  if (isLoading || !user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">My Account</h1>
            <p className="text-muted-foreground">Welcome back, {user.full_name || "User"}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Account Overview */}
            <div className="md:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        {orders.filter((o) => o.status === "processing" || o.status === "shipped").length}
                      </p>
                      <p className="text-sm text-muted-foreground">Active Orders</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Recent Orders</h2>
                {ordersLoading ? (
                  <p className="text-muted-foreground">Loading orders...</p>
                ) : orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">UGX {order.total.toLocaleString()}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : order.status === "processing"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href="/account/orders">View All Orders</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Button asChild>
                      <Link href="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4">Account Menu</h3>
                <nav className="space-y-2">
                  <Link
                    href="/account/profile"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Profile Settings</span>
                  </Link>
                  <Link
                    href="/account/orders"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Order History</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                    <span className="text-foreground">Logout</span>
                  </button>
                </nav>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Account Details</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Email:</span> {user.email}
                  </p>
                  {user.phone && (
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Phone:</span> {user.phone}
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Member since:</span>{" "}
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
