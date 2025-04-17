import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const petsFilePath = path.join(process.cwd(), "src", "app", "data.json");

export async function POST(req) {
  try {
    const entry = await req.json();

    console.log(entry);

    const petsFile = await fsPromises.readFile(petsFilePath, "utf-8");
    const json = JSON.parse(petsFile);
    console.log(entry.File);

    json.pets.push({
      ID: json.pets.length + 1,
      Name: entry.Name,
      Title: entry.Title,
      Type: entry.Type,
      Lore: entry.Lore,
      Image: entry.Image,
    });

    const update = await fsPromises.writeFile(
      petsFilePath,
      JSON.stringify({ pets: json.pets }, null, 2)
    );
    update;
    console.log("File updated successfully");

    return NextResponse.json({ data: json, status: 200 });
  } catch (error) {
    console.error("Error updating JSON file:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
