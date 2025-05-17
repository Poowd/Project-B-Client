import { NextResponse } from "next/server";
import { getSheetsService } from "../../../hooks/functions/getSheetService";

const SPREADSHEET_ID = "1pSsAF5l_eZ0eDxEWn91ELNGZ6GaHXRbQJyfUpC_CKlM"; // <- paste your spreadsheet ID here

export async function POST(request) {
  const entry = await request.json();
  const sheets = getSheetsService();

  // Example usage: read data from a spreadsheet
  try {
    const buildComp = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `BuildComp_Sheet!A:I`,
    });
    const buildEntries = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `BuildComp_Entries!A:I`,
    });
    const buildScores = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `BuildComp_Scores!A:H`,
    });

    return NextResponse.json(
      {
        buildcomp: buildComp.data.values
          .slice(1)
          .filter((e) => e[8] == entry.ID)[0],
        entries: buildEntries.data.values
          .slice(1)
          .filter((e) => e[8] == entry.ID),
        scores: buildScores.data.values
          .slice(1)
          .filter((e) => e[6] == entry.ID),
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
