import { extractFields } from "@/app/utils/format";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    const extracted = extractFields(res);

    return NextResponse.json({ ...extracted }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 400 }
    );
  }
}
