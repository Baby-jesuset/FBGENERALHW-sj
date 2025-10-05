"use client"

import Link from "next/link"
import { ShoppingCart, User, Heart, Menu, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { totalItems } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">FB</span>
              </div>
              <span className="text-xl font-bold text-foreground">Hardware</span>
            </div>
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
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
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
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
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
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMobileMenu} />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-[280px] bg-background z-50 shadow-lg md:hidden animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center p-4 border-b border-border justify-end">
                
                <Button variant="ghost" size="icon" onClick={closeMobileMenu}>
                  <X className="h-5 w-5 text-primary" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col p-4 gap-2">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent text-secondary"
                  onClick={closeMobileMenu}
                >
                  HOME
                </Link>
                <Link
                  href="/shop"
                  className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent text-secondary"
                  onClick={closeMobileMenu}
                >
                  SHOP
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent text-secondary"
                  onClick={closeMobileMenu}
                >
                  ABOUT US
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent text-secondary"
                  onClick={closeMobileMenu}
                >
                  CONTACT
                </Link>

                {/* User Account Section */}
                {isAuthenticated ? (
                  <>
                    <div className="border-t border-border my-2" />
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <Link
                      href="/account"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
                      onClick={closeMobileMenu}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
                      onClick={closeMobileMenu}
                    >
                      Order History
                    </Link>
                    <Link
                      href="/account/profile"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent"
                      onClick={closeMobileMenu}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        closeMobileMenu()
                      }}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent text-left w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="border-t border-border my-2" />
                    <Link
                      href="/login"
                      className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent text-primary"
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent text-primary"
                      onClick={closeMobileMenu}
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {/* Additional Actions */}
                <div className="border-t border-border my-2" />
                <Link
                  href="/cart"
                  className="text-sm font-medium hover:text-primary transition-colors py-3 px-4 rounded-md hover:bg-accent flex items-center justify-between text-destructive"
                  onClick={closeMobileMenu}
                >
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <span className="h-6 w-6 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
