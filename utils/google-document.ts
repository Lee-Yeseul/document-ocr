import { GoogleAuth } from "google-auth-library";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";

export const pdfToText = async (file: File) => {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const encodedFile = fileBuffer.toString("base64");

  const auth = new GoogleAuth({
    keyFilename: "service-account.json",
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = new DocumentProcessorServiceClient({ auth });

  const processor =
    "projects/877110188756/locations/us/processors/6697facbb397ef7c";

  const test = {
    name: processor,
    rawDocument: {
      content: encodedFile,
      mimeType: "application/pdf",
    },
  };

  const [result] = await client.processDocument(test);

  const { document } = result;
  if (!document) {
    throw new Error("Document processing failed.");
  }
  const { text } = document;
  if (!text) {
    throw new Error("Document text extraction failed.");
  }

  return text;
};
