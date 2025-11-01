import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

// Get cart items for the authenticated user
export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: cartItems, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        products (*)
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })

    if (error) throw error

    return NextResponse.json({ cartItems: cartItems || [] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 })
  }
}

// Add an item to the cart
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { product_id, quantity } = await request.json()

    if (typeof product_id !== 'string' || product_id.trim().length === 0) {
      return NextResponse.json({ error: "product_id must be a non-empty string" }, { status: 400 });
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json({ error: "Quantity must be a positive number" }, { status: 400 })
    }

    // Verify the product exists before adding to cart
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("id", product_id as string)
      .single()

    if (productError || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const { data, error } = await supabase
      .from("cart_items")
      .upsert({ 
        user_id: user.id, 
        product_id: product_id as string, 
        quantity 
      }, { onConflict: 'user_id, product_id' })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ item: data }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 })
  }
}

// Update item quantity
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { product_id, quantity } = await request.json()

    if (typeof product_id !== 'string' || product_id.trim().length === 0) {
      return NextResponse.json({ error: "product_id must be a non-empty string" }, { status: 400 });
    }

    if (typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json({ error: "Quantity must be a positive number" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("user_id", user.id)
      .eq("product_id", product_id as string)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ item: data })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "An unknown error occurred" }, { status: 500 })
  }
}

// Remove an item from the cart
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const product_id = request.nextUrl.searchParams.get("product_id")

    if (!product_id) {
      return NextResponse.json(
        { error: "product_id is required" },
        { status: 400 },
      )
    }

    // Regular expression to check if string is a valid UUID
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(product_id)) {
      return NextResponse.json(
        { error: "Invalid product_id format." },
        { status: 400 },
      )
    }

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", product_id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
