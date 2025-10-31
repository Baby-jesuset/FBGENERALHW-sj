import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Direct endpoint for updating order status
export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const params = await props.params
    const { id } = params
    
    // Parse the request body
    const body = await request.json()
    const { status } = body
    
    // Validate the status value
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if (!status || !validStatuses.includes(status)) {
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
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, order: data })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message || "Unknown error" }, { status: 500 })
  }
}
