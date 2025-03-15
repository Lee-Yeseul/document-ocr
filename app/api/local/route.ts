import { NextRequest, NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import { extractFields } from "@/app/utils/format";

export async function POST(request: NextRequest) {
  const req = await request.arrayBuffer();
  const buffer = Buffer.from(req);
  const encodedPdf = buffer.toString("base64");

  const auth = new GoogleAuth({
    keyFilename: process.env.KEY_FILE_NAME,
    scopes: [process.env.GOOGLE_SCOPES ?? ""],
  });

  const client = new DocumentProcessorServiceClient({ auth });

  const name = process.env.GOOGLE_DOCUMENTAI_PROCESSOR;

  const test = {
    name,
    rawDocument: {
      content: encodedPdf,
      mimeType: "application/pdf",
    },
  };

  const [result] = await client.processDocument(test);

  const { document } = result;
  if (!document) {
    return NextResponse.json(
      { error: "Document processing failed" },
      { status: 500 }
    );
  }

  const { text } = document;
  if (!text) {
    return NextResponse.json(
      { error: "Document processing failed" },
      { status: 500 }
    );
  }

  const extracted = extractFields(text);

  return NextResponse.json({ text: extracted }, { status: 200 });
}
