import * as fs from "fs";

import { GoogleAuth } from "google-auth-library";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import { extractFields } from "@/utils";

export const documentAI = async (filePath: string) => {
  const fileBuffer = fs.readFileSync(filePath);
  const encodedImage = fileBuffer.toString("base64");

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
    throw new Error("Document processing failed.");
  }
  const { text } = document;
  if (!text) {
    throw new Error("Document text extraction failed.");
  }

  const extracted = extractFields(text);

  return extracted;
};
