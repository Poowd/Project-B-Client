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
    const { data: buildTable, buildTableErr } = await supabase
      .from("Archetopia_Builds")
      .insert([
        {
          BUILDID: uuidv4(),
          Title: entry.title,
          Subtitle: entry.subtitle,
          StartDate: entry.startDate,
          EndDate: entry.endDate,
          Description: entry.description,
          Image: entry.image,
          Code: entry.code,
          Status: "PENDING",
        },
      ])
      .select();

    if (buildTableErr) {
      return NextResponse.json({
        status: false,
        message: error.details,
        data: [],
      });
    }

    const rewardsArray = [];
    for (let i = 0; i < entry.rewards.length; i++) {
      const reward = entry.rewards[i];
      const { data: rewardTable, rewardTableErr } = await supabase
        .from("Archetopia_Build_Rewards")
        .insert([
          {
            REWARDID: uuidv4(),
            Build: entry.title,
            Reward: reward.reward,
            Value: reward.value,
            Type: reward.type,
          },
        ])
        .select();

      if (rewardTableErr) {
        return NextResponse.json({
          status: false,
          message: error.details,
          data: [],
        });
      }

      rewardsArray.push(rewardTable);
    }

    const { data: communityLogsTable, communityLogsTableErr } = await supabase
      .from("Archetopia_Community_Logs")
      .insert([
        {
          CMTLOGID: uuidv4(),
          Subject: entry.title,
          IGN: entry.ign,
          Feature: "BUILD COMPETITION",
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
        build: buildTable,
        rewards: rewardsArray,
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
