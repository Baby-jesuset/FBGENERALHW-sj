import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
}

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  // Fetch orders
  await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })

  // Fetch orders directly with Supabase
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
  
  // Fetch user profiles separately
  let userProfiles: Record<string, Profile> = {}
  if (orders && orders.length > 0) {
    // Get unique user IDs
    const userIds = [...new Set(orders.map(order => order.user_id))]
    
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds)
    
    // Create a lookup map
    userProfiles = (profiles || []).reduce((acc: Record<string, Profile>, profile) => {
      acc[profile.id] = profile
      return acc
    }, {})
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">No orders found.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Order ID</th>
                <th className="text-left p-4 font-medium text-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-foreground">Date</th>
                <th className="text-left p-4 font-medium text-foreground">Total</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-right p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                // Get profile from our lookup map
                const profile = userProfiles[order.user_id] || {}
                
                return (
                  <tr key={order.id} className="border-t border-border">
                    <td className="p-4 font-mono text-sm text-foreground">{order.id.slice(0, 8)}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-foreground">{profile.full_name || order.full_name || "N/A"}</p>
                        <p className="text-sm text-muted-foreground">{profile.email || order.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-foreground">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-foreground">UGX {Number(order.total).toLocaleString()}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
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
                    </td>
                    <td className="p-4 text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/orders/${order.id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
