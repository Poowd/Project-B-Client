import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const entry = await req.json();
    return NextResponse.json({
      status: true,
      data: `${process.env.IMAGE_LINK || ""}${entry.ID}`,
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
