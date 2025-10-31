import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()
    
    const supabase = await createClient()
    const params = await props.params
    const { id } = params

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(`
        *,
        profiles (full_name, email, phone, address, city, country)
      `)
      .eq("id", id)
      .single()

    if (orderError) throw orderError

    // Get order items
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", id)

    if (itemsError) throw itemsError

    return NextResponse.json({ 
      order: {
        ...order,
        items: items || []
      } 
    })
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

    // Validate the status value
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 })
    }

    // Update the order
    const { data, error } = await supabase
      .from("orders")
      .update(body)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ order: data })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}