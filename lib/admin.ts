import { createClient } from "@/lib/supabase/server"
import { UnauthorizedError } from "./errors"

export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return false

    // Check for the is_admin claim in the user's app_metadata
    return user.app_metadata?.is_admin === true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function requireAdmin() {
  const admin = await isAdmin()

  if (!admin) {
    throw new UnauthorizedError()
  }

  return true
}
