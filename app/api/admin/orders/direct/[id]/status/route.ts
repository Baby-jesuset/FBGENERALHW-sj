import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Direct endpoint for updating order status
export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const params = await props.params
    const { id } = params
    
    console.log("API: Updating status for order ID:", id)
    
    // Parse the request body
    const body = await request.json()
    const { status } = body
    
    console.log("API: New status:", status)
    
    // Validate the status value
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if (!status || !validStatuses.includes(status)) {
      console.error("API: Invalid status value:", status)
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 })
    }

    // Update the order status
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("API: Error updating order status:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("API: Order status updated successfully")
    return NextResponse.json({ success: true, order: data })
  } catch (error: any) {
    console.error("API: Unexpected error in status update:", error)
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 })
  }
}
