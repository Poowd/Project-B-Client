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
    const { data: petTable, petTableErr } = await supabase
      .from("Archetopia_Pets")
      .insert([
        {
          PETID: uuidv4(),
          Name: entry.name,
          Title: entry.title,
          Type: entry.specimen,
          Image: entry.image,
          Lore: entry.lore,
          Head: entry.head,
          Creature: entry.creature,
          Status: "PENDING",
        },
      ])
      .select();

    if (petTableErr) {
      return NextResponse.json({
        status: false,
        message: error.details,
        data: [],
      });
    }

    const { data: traitTable, traitTableErr } = await supabase
      .from("Archetopia_Pet_Traits")
      .insert([
        {
          TRAITID: uuidv4(),
          Pet: entry.name,
          Trait: entry.trait.name,
          Level: entry.trait.level,
          Description: entry.trait.description,
          Status: "PENDING",
        },
      ])
      .select();

    if (traitTableErr) {
      return NextResponse.json({
        status: false,
        message: error.details,
        data: [],
      });
    }

    const skillArray = [];
    for (let i = 0; i < entry.skills.length; i++) {
      const skill = entry.skills[i];
      const { data: skillTable, skillTableErr } = await supabase
        .from("Archetopia_Pet_Skills")
        .insert([
          {
            SKILLID: uuidv4(),
            Pet: entry.name,
            Skill: skill.name,
            Level: skill.level,
            Description: skill.description,
            Status: "PENDING",
          },
        ])
        .select();

      if (skillTableErr) {
        return NextResponse.json({
          status: false,
          message: error.details,
          data: [],
        });
      }

      skillArray.push(skillTable);
    }

    const { data: communityLogsTable, communityLogsTableErr } = await supabase
      .from("Archetopia_Community_Logs")
      .insert([
        {
          CMTLOGID: uuidv4(),
          Subject: entry.name,
          IGN: entry.ign,
          Feature: "PETS",
        },
      ])
      .select();

    if (communityLogsTableErr) {
      return NextResponse.json({
        status: false,
        message: error.details,
        data: [],
      });
    }

    return NextResponse.json(
      {
        status: true,
        pet: petTable,
        trait: traitTable,
        skill: skillArray,
        logs: communityLogsTable,
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
