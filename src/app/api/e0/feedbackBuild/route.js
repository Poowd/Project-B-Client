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
    const { data: petFeedback, petFeedbackErr } = await supabase
      .from("Archetopia_Build_Feedback")
      .insert([
        {
          FEDID: uuidv4(),
          IGN: entry.ign,
          Build: entry.target_build,
          Rating_1: entry.rating_1,
          Rating_2: entry.rating_2,
          Rating_3: entry.rating_3,
          Rating_4: entry.rating_4,
          Rating_5: entry.rating_5,
          State: entry.build_state,
          Notable: entry.notable_build,
          Feedback: entry.general_feedback,
        },
      ])
      .select();

    if (petFeedbackErr) {
      return NextResponse.json({
        status: false,
        message: error.details,
        data: [],
      });
    }

    return NextResponse.json(
      {
        status: true,
        pet: petFeedback,
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
