import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { getImagePath } from "@/lib/utils"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("categories").select("*").order("name", { ascending: true })

    if (error) throw error

    // Normalize image paths
    const categories = (data || []).map((category) => ({
      ...category,
      image: getImagePath(category.image)
    }))
    
    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
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

    // Check if user is admin
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single()
    
    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const body = await request.json()

    const { data, error } = await supabase.from("categories").insert([body]).select().single()

    if (error) throw error

    return NextResponse.json({ category: data }, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
