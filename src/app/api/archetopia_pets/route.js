import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export async function POST(req) {
  const entry = await req.json();

  try {
    const { data: result, error } = await supabase
      .from("archetopia_pets")
      .select("*")
      .order("Created", { ascending: false })
      .eq("Status", true)
      .range(entry.MIN, entry.MAX + 1);

    if (error) {
      return NextResponse.json({ status: false, message: error });
    }

    return NextResponse.json({ status: true, data: result });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
