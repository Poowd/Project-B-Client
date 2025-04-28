import { NextResponse } from "next/server";
import { getSheetsService } from "../../../hooks/functions/getSheetService";

const SPREADSHEET_ID = "1pSsAF5l_eZ0eDxEWn91ELNGZ6GaHXRbQJyfUpC_CKlM"; // <- paste your spreadsheet ID here
const SHEET_NAME = "BuildComp_Sheet"; // <- adjust if your sheet has a different name

export async function POST(request) {
  const sheets = getSheetsService();
  const entry = await request.json(); // expects { row: [...] }

  if (!entry?.row || !Array.isArray(entry.row)) {
    return NextResponse.json({ error: "Invalid row data" }, { status: 400 });
  }

  // Example usage: read data from a spreadsheet
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`, // starting point
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [entry.row],
      },
    });

    console.log(JSON.stringify(response.data));

    return NextResponse.json(
      { data: response.data.values },
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
