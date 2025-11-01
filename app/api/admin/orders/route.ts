import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { UnauthorizedError } from "@/lib/errors"

export async function GET() {
  try {
    await requireAdmin()
    
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        profiles (full_name, email)
      `)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ orders: data || [] })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    console.error(error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
