import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export async function GET() {
  try {
    const { data: result, error } = await supabase
      .from("Archetopia_Builds")
      .select("*, Archetopia_Build_Rewards(*)")
      .eq("Status", "ACTIVE")
      .order("Created", { ascending: false });

    if (error) {
      return NextResponse.json({ status: false, message: error.details });
    }

    console.log(result);

    return NextResponse.json({ status: true, data: result });
  } catch (error) {
    return NextResponse.json({ message: error.details }, { status: 500 });
  }
}
