import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "UGX",
    minimumFractionDigits: 0,
  }).format(price)
}

export function getImagePath(imagePath: string | null | undefined): string {
  if (!imagePath) return "/placeholder.svg"
  
  // If it's already an absolute URL or starts with a slash, return as is
  if (imagePath.startsWith("http") || imagePath.startsWith("/")) {
    return imagePath
  }
  
  // Otherwise, assume it's a relative path and prepend a slash
  return `/${imagePath}`
}