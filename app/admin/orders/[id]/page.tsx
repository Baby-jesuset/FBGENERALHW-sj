"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/loading-spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [order, setOrder] = useState<any>(null)
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)
  const [status, setStatus] = useState("")
  const supabase = createClient()

  const orderId = params.id as string
  
  console.log("Order ID from params:", orderId)

  useEffect(() => {
    // Make sure orderId is available before fetching
    if (orderId) {
      console.log("Fetching order details for ID:", orderId)
      fetchOrderDetails()
    } else {
      console.error("No order ID available")
      setError("No order ID provided")
      setLoading(false)
    }
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      console.log("Starting to fetch order details")
      
      // Try using the direct API endpoint first
      try {
        console.log("Trying direct API endpoint")
        const response = await fetch(`/api/admin/orders/direct/${orderId}`)
        
        if (response.ok) {
          const data = await response.json()
          console.log("Direct API success:", data)
          
          if (data.order) {
            setOrder(data.order)
            setStatus(data.order.status || "pending")
            setOrderItems(data.items || [])
            console.log("Order loaded via direct API")
            return
          }
        } else {
          console.log("Direct API failed, status:", response.status)
        }
      } catch (apiError) {
        console.error("Error using direct API:", apiError)
      }
      
      // Fallback to Supabase client if direct API fails
      console.log("Falling back to Supabase client")
      const supabase = createClient()
      
      // Fetch order details
      console.log("Fetching order with ID:", orderId)
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single()
      
      if (orderError) {
        console.error("Error fetching order:", orderError)
        throw orderError
      }
      
      console.log("Order data received:", orderData ? "Yes" : "No")
      
      if (!orderData) {
        console.error("No order found with ID:", orderId)
        setError("Order not found")
        toast({
          title: "Order not found",
          description: "The requested order could not be found",
          variant: "destructive",
        })
        return
      }
      
      console.log("Order data:", orderData)
      setOrder(orderData)
      setStatus(orderData.status || "pending")
      
      // Fetch order items
      console.log("Fetching order items for order ID:", orderId)
      const { data: itemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId)
      
      if (itemsError) {
        console.error("Error fetching order items:", itemsError)
        throw itemsError
      }
      
      console.log("Order items received:", itemsData?.length || 0)
      setOrderItems(itemsData || [])
      
    } catch (error: any) {
      console.error("Error fetching order details:", error)
      setError(error.message || "Failed to load order details")
      toast({
        title: "Error",
        description: "Failed to load order details: " + (error.message || "Unknown error"),
        variant: "destructive",
      })
    } finally {
      console.log("Finished fetching order details")
      setLoading(false)
    }
  }

  const updateOrderStatus = async () => {
    try {
      setUpdating(true)
      console.log("Updating order status to:", status)
      console.log("For order ID:", orderId)
      
      // Create a fresh Supabase client for this request
      const supabase = createClient()
      
      // Try direct API first
      try {
        console.log("Trying direct API for status update")
        const response = await fetch(`/api/admin/orders/direct/${orderId}/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        })
        
        if (response.ok) {
          console.log("Status updated successfully via API")
          toast({
            title: "Status updated",
            description: `Order status has been updated to ${status}`,
          })
          
          // Update local order data
          setOrder({ ...order, status })
          return
        } else {
          const errorData = await response.json()
          console.error("API status update failed:", errorData)
        }
      } catch (apiError) {
        console.error("Error using API for status update:", apiError)
      }
      
      // Fall back to direct Supabase update
      console.log("Falling back to direct Supabase update")
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId)
      
      if (error) {
        console.error("Supabase update error:", error)
        throw error
      }
      
      console.log("Status updated successfully via Supabase")
      toast({
        title: "Status updated",
        description: `Order status has been updated to ${status}`,
      })
      
      // Update local order data
      setOrder({ ...order, status })
    } catch (error: any) {
      console.error("Error updating order status:", error)
      toast({
        title: "Update failed",
        description: error.message || "Failed to update order status",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  // Show loading state or error
  if (loading || error) {
    return (
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          {loading ? (
            <div>
              <LoadingSpinner size="lg" className="mb-4" />
              <p className="text-lg font-medium mb-2">Loading order details...</p>
              <p className="text-muted-foreground">This may take a few moments</p>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-red-500 mb-2">Error loading order</p>
              <p className="text-muted-foreground">{error}</p>
              <Button 
                className="mt-4" 
                onClick={() => {
                  setLoading(true)
                  setError(null)
                  fetchOrderDetails()
                }}
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // If no order data was loaded but we're not in loading or error state
  if (!order) {
    return (
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
        </div>
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-lg font-medium text-red-500 mb-2">Order not found</p>
          <p className="text-muted-foreground">The requested order could not be loaded</p>
          <Button 
            className="mt-4" 
            onClick={() => {
              setLoading(true)
              fetchOrderDetails()
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Order #{orderId.slice(0, 8)}</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date(order?.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* Status Update */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-medium mb-1">Current Status</div>
            <div className="text-sm">
              <span className={`px-2 py-1 rounded-full ${
                order.status === "delivered" ? "bg-green-100 text-green-700" :
                order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                order.status === "processing" ? "bg-yellow-100 text-yellow-700" :
                order.status === "cancelled" ? "bg-red-100 text-red-700" :
                "bg-gray-100 text-gray-700"
              }`}>
                {order.status || "pending"}
              </span>
            </div>
          </div>
          <div>
            <div className="font-medium mb-1">Update Status</div>
            <div className="flex items-center gap-2">
              <Select 
                value={status} 
                onValueChange={(value) => {
                  console.log("Status selected:", value)
                  setStatus(value)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                disabled={status === order?.status || updating}
                onClick={updateOrderStatus}
              >
                {updating ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <h2 className="text-lg font-medium mb-2">Shipping Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">{order?.full_name}</p>
            <p>{order?.email}</p>
            <p>{order?.phone}</p>
          </div>
          <div>
            <p>{order?.address}</p>
            <p>{order?.city}, {order?.country}</p>
            {order?.postal_code && <p>Postal Code: {order.postal_code}</p>}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <h2 className="text-lg font-medium mb-2">Order Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-2 font-medium">Product</th>
                <th className="text-right p-2 font-medium">Price</th>
                <th className="text-right p-2 font-medium">Quantity</th>
                <th className="text-right p-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.product_name}</td>
                  <td className="p-2 text-right">UGX {Number(item.price).toLocaleString()}</td>
                  <td className="p-2 text-right">{item.quantity}</td>
                  <td className="p-2 text-right">UGX {Number(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t">
              <tr>
                <td colSpan={2} className="p-2"></td>
                <td className="p-2 text-right font-medium">Subtotal</td>
                <td className="p-2 text-right">UGX {Number(order?.subtotal).toLocaleString()}</td>
              </tr>
              <tr>
                <td colSpan={2} className="p-2"></td>
                <td className="p-2 text-right font-medium">Shipping</td>
                <td className="p-2 text-right">UGX {Number(order?.shipping).toLocaleString()}</td>
              </tr>
              {Number(order?.tax) > 0 && (
                <tr>
                  <td colSpan={2} className="p-2"></td>
                  <td className="p-2 text-right font-medium">Tax</td>
                  <td className="p-2 text-right">UGX {Number(order?.tax).toLocaleString()}</td>
                </tr>
              )}
              <tr className="border-t">
                <td colSpan={2} className="p-2"></td>
                <td className="p-2 text-right font-medium">Total</td>
                <td className="p-2 text-right font-bold">UGX {Number(order?.total).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-2">Payment Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-muted-foreground">Payment Method:</span>
            <span className="ml-2 capitalize">{order?.payment_method?.replace(/_/g, ' ')}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Payment Status:</span>
            <span className="ml-2 capitalize">{order?.payment_status}</span>
          </div>
        </div>
      </div>
    </div>
  )
}