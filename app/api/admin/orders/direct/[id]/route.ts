import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// This is a simplified direct endpoint for order details
// without admin checks for debugging purposes
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const params = await props.params
    const { id } = params
    
    console.log("API: Fetching order with ID:", id)

    // Get order details
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single()

    if (orderError) {
      console.error("API: Error fetching order:", orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 })
    }
    
    if (!order) {
      console.log("API: No order found with ID:", id)
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Get order items
    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", id)

    if (itemsError) {
      console.error("API: Error fetching order items:", itemsError)
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }

    console.log("API: Successfully fetched order and items")
    return NextResponse.json({ 
      order,
      items: items || []
    })
  } catch (error: any) {
    console.error("API: Unexpected error:", error)
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 })
  }
}
