import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { getImagePath } from "@/lib/utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "created_at"
    const order = searchParams.get("order") || "desc"
    const featured = searchParams.get("featured")
    const limitParam = searchParams.get("limit")

    const supabase = await createClient()
    let query = supabase.from("products").select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)

    // Apply filters
    if (category) {
      query = query.eq("category_id", category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    // Apply sorting
    query = query.order(sort, { ascending: order === "asc" })

    // Apply limit if provided
    if (limitParam) {
      const limit = parseInt(limitParam, 10)
      if (!isNaN(limit) && limit > 0) {
        query = query.limit(limit)
      }
    }

    const { data, error } = await query

    // Normalize image paths and ensure they're properly formatted
    const products = (data || []).map((product) => ({
      ...product,
      // Handle both image and image_url fields, ensuring proper path format
      image: getImagePath(product.image || product.image_url),
      // Also normalize category image if present
      categories: product.categories ? {
        ...product.categories,
        image: getImagePath(product.categories.image)
      } : null
    }))

    if (error) throw error

    return NextResponse.json({ products })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}

export async function POST(request: Request) {
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

    const { data, error } = await supabase.from("products").insert([body]).select().single()

    if (error) throw error

    return NextResponse.json({ product: data }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
