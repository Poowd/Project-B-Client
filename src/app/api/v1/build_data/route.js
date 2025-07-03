import { NextResponse } from "next/server";
import { getSheetsService } from "../../../../hooks/functions/getSheetService";

const SPREADSHEET_ID = process.env.SHEET_ID; // <- paste your spreadsheet ID here

export async function GET() {
  const sheets = getSheetsService();
  // batch get by data filter
  try {
    const buildList = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `BuildComp_Sheet!A:J`,
    });
    const buildReward = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `BuildComp_Rewards_Sheet!A:F`,
    });
    const rewardType = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Rewards_Types!A:C`,
    });
    const buildEntries = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `BuildComp_Entries!A:I`,
    });
    const buildScores = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `BuildComp_Scores!A:H`,
    });

    const builds = buildList.data.values.slice(1).reverse();
    const rewards = buildReward.data.values.slice(1).reverse();
    const rewardtypes = rewardType.data.values.slice(1).reverse();
    const entries = buildEntries.data.values.slice(1).reverse();
    const scores = buildScores.data.values.slice(1).reverse();
    let buildsJSON = [];
    let rewardsJSON = [];
    let rewardtypesJSON = [];
    let entriesJSON = [];
    let scoresJSON = [];

    if (scores.length > 0) {
      for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        scoresJSON.push({
          id: score[0],
          evaluator: score[1],
          build: score[2],
          criteria1: score[3],
          criteria2: score[4],
          criteria3: score[5],
          total: +score[3] + +score[4] + +score[5],
          code: score[6],
          status: score[7],
        });
      }
    }

    if (entries.length > 0) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const entryScores = scoresJSON.filter((e) => e.build === entry[0]);

        let finalScore = 0;
        for (let i = 0; i < entryScores.length; i++) {
          const grade = entryScores[i];
          finalScore = finalScore + grade.total;
        }
        finalScore = finalScore / entryScores.length;

        entriesJSON.push({
          id: entry[0],
          competition: entry[1],
          team: entry[2],
          members: entry[3],
          title: entry[4],
          description: entry[5],
          scores: entryScores,
          final_score: finalScore,
          image: entry[6],
          status: entry[7],
          code: entry[8],
        });
      }
    }
    if (rewardtypes.length > 0) {
      for (let i = 0; i < rewardtypes.length; i++) {
        const type = rewardtypes[i];
        rewardtypesJSON.push({
          id: type[0],
          type: type[1],
          status: type[2],
        });
      }
    }

    if (rewards.length > 0) {
      for (let i = 0; i < rewards.length; i++) {
        const reward = rewards[i];
        const rewardtype = rewardtypesJSON.filter((e) => e.type === reward[4]);
        rewardsJSON.push({
          id: reward[0],
          build: reward[1],
          reward: reward[2],
          value: reward[3],
          type: reward[4],
          rewardtype: rewardtype[0],
          status: reward[5],
        });
      }
    }

    if (builds.length > 0) {
      for (let i = 0; i < builds.length; i++) {
        const build = builds[i];
        const rewards = rewardsJSON.filter((e) => e.build === build[0]);
        const entries = entriesJSON.filter((e) => e.competition === build[0]);
        const categorizedrewards = [];

        for (let j = 0; j < rewardtypesJSON.length; j++) {
          const rewardtype = rewardtypesJSON[j];
          const tempreward = rewards.filter((e) => e.type === rewardtype.type);
          categorizedrewards.push({
            type: rewardtype.type,
            rewards: tempreward,
          });
        }

        buildsJSON.push({
          id: build[0],
          title: build[1],
          subtitle: build[2],
          start: build[3],
          end: build[4],
          description: build[5],
          rewards: categorizedrewards,
          entries: entries,
          icon: build[6],
          image: build[7],
          code: build[8],
          status: build[9],
        });
      }
    }

    return NextResponse.json(
      {
        builds: buildsJSON,
        rewardtypes: rewardtypesJSON,
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Google Sheets API error:", err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
