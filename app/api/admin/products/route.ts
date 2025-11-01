import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"
import { UnauthorizedError } from "@/lib/errors"

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
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    console.error(error)
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
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
