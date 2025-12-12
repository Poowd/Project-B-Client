import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || ""
);

export async function POST(request) {
  const entry = await request.json();

  try {
    const { data: signUpAccount, signUpErr } = await supabase
      .from("Accounts")
      .insert([
        {
          UUID: uuidv4(),
          Username: entry.user,
          Password: entry.passcode,
          Email: entry.email,
          Status: "PENDING",
        },
      ])
      .select();

    if (signUpErr) {
      return NextResponse.json({
        status: false,
        message: error.details,
        data: [],
      });
    }

    return NextResponse.json(
      {
        status: true,
        message: "Successfully added and requested a new Account.",
        data: signUpAccount,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { status: false, message: error.details },
      { status: 500 }
    );
  }
}
