import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  try {
    const supabase = await createClient()

    // Get category
    const { data: category, error: categoryError } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", params.slug)
      .single()

    if (categoryError) throw categoryError

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Get products in this category
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", category.id)
      .order("created_at", { ascending: false })

    if (productsError) throw productsError

    return NextResponse.json({
      category,
      products: products || [],
    })
  } catch (error: any) {
    console.error("[v0] Error fetching category:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
