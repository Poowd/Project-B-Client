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
const SHEET_NAME = "Sheet1"; // <- adjust if your sheet has a different name

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

export async function GET(request) {
  const sheets = getSheetsService();

  // Example usage: read data from a spreadsheet
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
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
