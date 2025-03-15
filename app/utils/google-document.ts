import { GoogleAuth } from "google-auth-library";
import { DocumentProcessorServiceClient } from "@google-cloud/documentai";

export const pdfToText = async (file: File) => {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const encodedFile = fileBuffer.toString("base64");

  const credentials = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    universe_domain: process.env.UNIVERSE_DOMAIN,
  };

  const auth = new GoogleAuth({
    credentials: credentials,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });

  const client = new DocumentProcessorServiceClient({ auth });

  const processor = process.env.GOOGLE_DOCUMENTAI_PROCESSOR;

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
