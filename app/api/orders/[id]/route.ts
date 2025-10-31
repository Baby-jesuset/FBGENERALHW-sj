import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (orderError) throw orderError

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Get order items
    const { data: items, error: itemsError } = await supabase.from("order_items").select("*").eq("order_id", order.id)

    if (itemsError) throw itemsError

    return NextResponse.json({
      order: {
        ...order,
        items: items || [],
      },
    })
  } catch (error: any) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Update order (typically for status updates by admin)
    const { data, error } = await supabase.from("orders").update(body).eq("id", params.id).select().single()

    if (error) throw error

    return NextResponse.json({ order: data })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
