import type React from "react"
import { redirect } from "next/navigation"
import { isAdmin } from "@/lib/admin"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, Package, ShoppingBag, FolderTree, LogOut } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await isAdmin()

  if (!admin) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image 
              src="/logo-darkblue.svg" 
              alt="FB Hardware Admin" 
              width={140}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-sm font-semibold text-muted-foreground">Admin</span>
          </Link>
        </div>

        <nav className="px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <Package className="h-5 w-5" />
            <span>Products</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Orders</span>
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <FolderTree className="h-5 w-5" />
            <span>Categories</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
