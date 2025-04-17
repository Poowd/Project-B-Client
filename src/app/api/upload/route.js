import { NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";

const petsFilePath = path.join(process.cwd(), "src", "app", "data.json");

export async function POST(req) {
  try {
    const entry = await req.formData();
    const file = entry.get("file");

    console.log(file);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = `./public/images/public/${file.name}`;

    await fsPromises.appendFile(path, buffer);
    console.log(`open ${path} to see`);

    return NextResponse.json({ data: file, status: 200 });
  } catch (error) {
    console.error("Error updating JSON file:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
