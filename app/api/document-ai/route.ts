import { GoogleAuth } from "google-auth-library";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import { NextRequest, NextResponse } from "next/server";
import { extractFields } from "@/utils";

export async function POST(request: NextRequest) {
  const req = await request.arrayBuffer();
  const buffer = Buffer.from(req);
  const encodedImage = buffer.toString("base64");

  const auth = new GoogleAuth({
    keyFilename: "service-account.json",
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = new DocumentProcessorServiceClient({ auth });

  const name = "projects/877110188756/locations/us/processors/6697facbb397ef7c";

  const test = {
    name,
    rawDocument: {
      content: encodedImage,
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
