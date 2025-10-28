import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("products")
      .select(
        `
      *,
      categories (
        id,
        name,
        slug
      )
    `,
      )
      .eq("id", params.id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
    const product = { ...data, image: data.image || data.image_url || "/placeholder.svg" };
    return NextResponse.json({ product })
  } catch (error: any) {
    console.error("[v0] Error fetching product:", error)
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

    const { data, error } = await supabase.from("products").update(body).eq("id", params.id).select().single()

    if (error) throw error

    return NextResponse.json({ product: data })
  } catch (error: any) {
    console.error("[v0] Error updating product:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
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

    const { error } = await supabase.from("products").delete().eq("id", params.id)

    if (error) throw error

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error: any) {
    console.error("[v0] Error deleting product:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
