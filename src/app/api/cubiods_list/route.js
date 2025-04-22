import { NextResponse } from "next/server";
import { getSheetsService } from "../../../hooks/functions/getSheetService";

const SPREADSHEET_ID = "1pSsAF5l_eZ0eDxEWn91ELNGZ6GaHXRbQJyfUpC_CKlM"; // <- paste your spreadsheet ID here

export async function GET(request) {
  const sheets = getSheetsService();

  // Example usage: read data from a spreadsheet
  try {
    const cubiodsList = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Sheet!A:G`,
    });
    const cubiodsTraitList = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Trait_Sheet!A:F`,
    });
    const cubiodsSkillList = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Cubiods_Skill_Sheet!A:F`,
    });

    console.log(JSON.stringify(cubiodsList.data));
    console.log(JSON.stringify(cubiodsTraitList.data));

    return NextResponse.json(
      {
        pets: cubiodsList.data.values,
        traits: cubiodsTraitList.data.values,
        skills: cubiodsSkillList.data.values,
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
