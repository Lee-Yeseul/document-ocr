import { NextRequest, NextResponse } from "next/server";
import { pdfToText } from "@/app/utils/google-document";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0];
    if (process.env.ALLOWED_IP !== ip) {
      return NextResponse.json(
        { message: "허용된 ip 주소가 아닙니다." },
        { status: 401 }
      );
    }

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
  } catch (error) {
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 400 }
    );
  }
}
