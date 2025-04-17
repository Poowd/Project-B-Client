import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const petsFilePath = path.join(process.cwd(), "src", "app", "data.json");

export async function GET() {
  try {
    const petsFile = await fsPromises.readFile(petsFilePath, "utf-8");
    const json = JSON.parse(petsFile);

    return NextResponse.json({ data: json, status: 200 });
  } catch (error) {
    console.error("Error updating JSON file:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
