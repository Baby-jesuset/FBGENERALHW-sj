"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, User, Heart, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { totalItems } = useCart()
  const { isAuthenticated, user, isLoading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Lock scroll on body
      document.body.style.overflow = "hidden"
      // Also prevent touch scroll on mobile
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      // Unlock scroll
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const handleLogout = async () => {
    try {
      // First clear any local state
      localStorage.removeItem("supabase.auth.token")
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }
      
      // Use window.location for a full page refresh to ensure clean state
      window.location.href = "/"
    } catch (err) {
      console.error(err)
      // Force refresh as fallback
      window.location.reload()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo-darkblue.svg" 
              alt="FB Hardware" 
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              HOME
            </Link>
            <Link href="/shop" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              SHOP
            </Link>
            <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              ABOUT US
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              CONTACT
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            {isLoading ? (
              <Button variant="ghost" size="icon" disabled>
                <User className="h-5 w-5 opacity-50" />
                <span className="sr-only">Loading</span>
              </Button>
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.full_name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Order History</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
              <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full Height Overlay (starts below header) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] z-[100] bg-white shadow-lg border-r border-gray-200 transition-all duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
              <span className="text-xl font-bold text-gray-900">Menu</span>
              </div>

              {/* Menu Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 bg-white min-h-0">
              <nav className="space-y-4">
                  {/* Main Navigation */}
                  <Link
                    href="/"
                    onClick={closeMobileMenu}
                  className="block p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors bg-white"
                  >
                    HOME
                  </Link>
                  <Link
                    href="/shop"
                    onClick={closeMobileMenu}
                  className="block p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    SHOP
                  </Link>
                  <Link
                    href="/categories/all"
                    onClick={closeMobileMenu}
                  className="block p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    CATEGORIES
                  </Link>
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                  className="block p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ABOUT
                  </Link>
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                  className="block p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    CONTACT
                  </Link>

                  {/* Divider */}
                <div className="my-4 border-t border-gray-200" />

                  {/* User Section */}
                  {isLoading ? (
                  <div className="p-4 text-base text-gray-500">
                      Loading...
                    </div>
                  ) : isAuthenticated && user ? (
                    <>
                    <div className="p-4 mb-2 bg-gray-50 rounded-lg">
                      <p className="text-base font-semibold text-gray-900">
                          {user?.full_name || "User"}
                        </p>
                      <p className="text-sm text-gray-600 mt-1">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/account"
                        onClick={closeMobileMenu}
                      className="block p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        My Account
                      </Link>
                      <Link
                        href="/account/orders"
                        onClick={closeMobileMenu}
                      className="block p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Order History
                      </Link>
                      <Link
                        href="/account/profile"
                        onClick={closeMobileMenu}
                      className="block p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Profile Settings
                      </Link>
                      {user?.is_admin && (
                        <Link
                          href="/admin"
                          onClick={closeMobileMenu}
                        className="block p-4 text-lg font-semibold text-primary hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout()
                          closeMobileMenu()
                        }}
                      className="w-full text-left p-4 text-lg font-medium text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={closeMobileMenu}
                      className="block p-4 text-lg font-medium text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={closeMobileMenu}
                      className="block p-4 text-lg font-medium text-primary hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}

                  {/* Divider */}
                <div className="my-4 border-t border-gray-200" />

                  {/* Cart Link */}
                  <Link
                    href="/cart"
                    onClick={closeMobileMenu}
                  className="flex items-center justify-between p-4 text-lg font-medium text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <span>Shopping Cart</span>
                    {totalItems > 0 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
