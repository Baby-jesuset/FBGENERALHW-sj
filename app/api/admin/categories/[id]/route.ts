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
      .from("categories")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error

    return NextResponse.json({ category: data })
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
      .from("categories")
      .update(body)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ category: data })
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

    // Check if category has associated products
    const { count, error: countError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("category_id", id)

    if (countError) throw countError

    if (count && count > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with associated products" },
        { status: 400 }
      )
    }

    const { error } = await supabase.from("categories").delete().eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
