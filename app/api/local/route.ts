import { NextResponse } from "next/server";
import { documentAI } from "@/utils/document";

export async function POST() {
  // 파일 경로
  const response = [];

  for (let i = 200; i < 202; i++) {
    const filePath = `public/test/CO ID795-페이지-${i}.pdf`;
    const result = await documentAI(filePath);
    response.push({ ...result, fileName: filePath });
  }

  return NextResponse.json({ text: response }, { status: 200 });
}
