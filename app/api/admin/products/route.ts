import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ products: data || [] })
  } catch (error: any) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("products")
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ product: data }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Error creating product:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
