import { NextResponse } from "next/server";

// app/api/sheets/route.js
import { google } from "googleapis";
import fs from "fs";
import path from "path";

const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "credentials.json"
); // adjust path as needed
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const APPLICATION_NAME = "Archetopia_Cyan_Realms";
const SPREADSHEET_ID = "1pSsAF5l_eZ0eDxEWn91ELNGZ6GaHXRbQJyfUpC_CKlM"; // <- paste your spreadsheet ID here
const SHEET_NAME = "Cubiods_Sheet"; // <- adjust if your sheet has a different name

function getSheetsService() {
  try {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    return sheets;
  } catch (error) {
    console.error("Error loading Sheets API:", error);
    return google.sheets({
      version: "v4",
      auth: null,
    });
  }
}

export async function PATCH(request) {
  const sheets = getSheetsService();
  const entry = await request.json(); // expects { row: [...] }
  const { id, columnIndex, newValue } = entry;

  console.log(entry);

  if (!id || columnIndex === undefined || !newValue) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  // Example usage: read data from a spreadsheet
  try {
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:F`, // Adjust range as needed
    });

    const rows = readRes.data.values || [];
    console.log(rows);

    // Find the row index where ID matches (assumes ID is in column A, index 0)
    const rowIndex = rows.findIndex((row) => row[0] === id);

    if (rowIndex === -1) {
      return new Response(JSON.stringify({ error: "ID not found" }), {
        status: 404,
      });
    }

    const targetRowNumber = rowIndex + 1; // +2 to account for header row and 0-indexing
    const columnLetter = String.fromCharCode(65 + columnIndex); // 0 = A, 1 = B, etc.

    const targetRange = `${SHEET_NAME}!${columnLetter}${targetRowNumber}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: targetRange,
      valueInputOption: "RAW",
      requestBody: {
        values: [[newValue]],
      },
    });

    console.log(JSON.stringify(targetRange));

    return NextResponse.json(
      { data: targetRange },
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
