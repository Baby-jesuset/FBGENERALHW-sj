import { createClient } from "@/lib/supabase/server"
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch stats using consistent approach for all queries
  const { count: productsCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })

  const { count: ordersCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })

  // Get all profiles
  await supabase
    .from("profiles")
    .select("id, is_admin")

  // Count non-admin users as customers
  const { count: usersCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .or("is_admin.is.false,is_admin.is.null")

  const { data: orders } = await supabase
    .from("orders")
    .select("total")

  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.total), 0) || 0

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to FB Hardware Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{productsCount || 0}</p>
          <p className="text-sm text-muted-foreground">Total Products</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-secondary" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{ordersCount || 0}</p>
          <p className="text-sm text-muted-foreground">Total Orders</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-foreground" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{usersCount || 0}</p>
          <p className="text-sm text-muted-foreground">Total Users</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">UGX {totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Orders</h2>
        <div className="text-muted-foreground">View all orders in the Orders section</div>
      </div>
    </div>
  )
}
