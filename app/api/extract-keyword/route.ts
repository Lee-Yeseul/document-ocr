import { extractFields } from "@/app/utils/format";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    // console.log(res);
    const extracted = extractFields(res);
    console.log("extracted", extracted);

    return NextResponse.json({ ...extracted }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 400 }
    );
  }
}
