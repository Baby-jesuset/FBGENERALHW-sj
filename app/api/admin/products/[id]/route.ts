import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    
    const supabase = await createClient()
    const params = await props.params
    const { id } = params

    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("id", id)
      .single()

    if (error) throw error

    return NextResponse.json({ product: data })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    
    const supabase = await createClient()
    const params = await props.params
    const { id } = params
    const body = await request.json()

    const { data, error } = await supabase
      .from("products")
      .update(body)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ product: data })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    
    const supabase = await createClient()
    const params = await props.params
    const { id } = params

    // Check if product is in any orders
    const { count, error: countError } = await supabase
      .from("order_items")
      .select("*", { count: "exact", head: true })
      .eq("product_id", id)

    if (countError) throw countError

    if (count && count > 0) {
      return NextResponse.json(
        { error: "Cannot delete product that has been ordered" },
        { status: 400 }
      )
    }

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
