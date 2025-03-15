import { NextRequest, NextResponse } from "next/server";
import { pdfToText } from "@/utils/google-document";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const pdf = formData.get("pdf");

  if (!pdf || !(pdf instanceof File)) {
    console.error("유효한 PDF 파일이 아닙니다.");
    return NextResponse.json(
      { message: "유효한 PDF 파일이 아닙니다." },
      { status: 400 }
    );
  }

  const result = await pdfToText(pdf);

  return NextResponse.json({ text: result }, { status: 200 });
}
