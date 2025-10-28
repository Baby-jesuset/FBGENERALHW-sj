import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"

export async function GET() {
  try {
    await requireAdmin()
    
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true })

    if (error) throw error

    return NextResponse.json({ categories: data || [] })
  } catch (error: any) {
    console.error("[v0] Error fetching categories:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("categories")
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ category: data }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] Error creating category:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
