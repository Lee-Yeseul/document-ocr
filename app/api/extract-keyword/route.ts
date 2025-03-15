import { extractFields } from "@/app/utils/format";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    const extracted = extractFields(res);

    return NextResponse.json({ ...extracted }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 400 });
  }
}
