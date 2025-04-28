// app/api/sheets/route.js
import { google } from "googleapis";
import fs from "fs";
import path from "path";

const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
); // adjust path as needed
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export function getSheetsService() {
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
