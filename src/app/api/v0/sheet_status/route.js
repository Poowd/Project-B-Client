import { NextResponse } from "next/server";
import { getSheetsService } from "../../../../hooks/functions/getSheetService";

const SPREADSHEET_ID = process.env.SHEET_ID; // <- paste your spreadsheet ID here

export async function GET() {
  const sheets = getSheetsService();
  // batch get by data filter
  try {
    const petStatus = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Sheet!A1:A1`,
    });
    const skillStatus = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Skill_Sheet!A1:A1`,
    });
    const traitStatus = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Trait_Sheet!A1:A1`,
    });

    const petSheetStatus = petStatus.data.values.length > 0;
    const skillSheetStatus = skillStatus.data.values.length > 0;
    const traitSheetStatus = traitStatus.data.values.length > 0;

    return NextResponse.json(
      {
        petSheetStatus: petSheetStatus,
        skillSheetStatus: skillSheetStatus,
        traitSheetStatus: traitSheetStatus,
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
