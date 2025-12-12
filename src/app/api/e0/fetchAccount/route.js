import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export async function POST(request) {
  const entry = await request.json();

  try {
    const { data: result, error } = await supabase
      .from("Accounts")
      .select("*")
      .eq("Username", entry.user)
      .eq("Password", entry.passcode)
      .eq("Status", "ACTIVE")
      .order("Created", { ascending: false });

    if (error) {
      return NextResponse.json({
        status: false,
        message: error.details,
        data: [],
      });
    }

    if (result.length === 0) {
      return NextResponse.json({
        status: false,
        message: "No active accounts found.",
        data: [],
      });
    }

    return NextResponse.json({
      status: true,
      message: "Retrieved active accounts successfully.",
      data: result,
    });
  } catch (error) {
    return NextResponse.json({ message: error.details }, { status: 500 });
  }
}
