import { NextResponse } from "next/server";
import { getSheetsService } from "../../../hooks/functions/getSheetService";

const SPREADSHEET_ID = "1pSsAF5l_eZ0eDxEWn91ELNGZ6GaHXRbQJyfUpC_CKlM"; // <- paste your spreadsheet ID here

export async function GET(request) {
  const sheets = getSheetsService();

  // Example usage: read data from a spreadsheet
  try {
    const buildcompRewardsLists = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `BuildComp_Rewards_Sheet!A:F`,
    });
    const buildcompRewardTypesLists = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Rewards_Types!A:C`,
    });

    return NextResponse.json(
      {
        rewards: buildcompRewardsLists.data.values,
        rewardTypes: buildcompRewardTypesLists.data.values,
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
