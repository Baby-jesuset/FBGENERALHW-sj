import { createClient } from "@/lib/supabase/server"

export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return false

    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()

    return profile?.is_admin || false
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function requireAdmin() {
  const admin = await isAdmin()

  if (!admin) {
    throw new Error("Unauthorized: Admin access required")
  }

  return true
}
