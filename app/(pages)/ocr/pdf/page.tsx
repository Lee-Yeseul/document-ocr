"use client";
import { useState } from "react";

import OcrResult from "@/app/components/OcrResult";
import DownloadKeywordExcel from "@/app/components/DownloadKeywordExcel";
import OcrExtractor from "@/app/components/OcrExtractor";

export default function PdfOCRPage() {
  const [ocrResult, setOcrResult] = useState("");

  return (
    <div className="flex flex-col items-center w-full h-screen p-4 gap-4">
      <OcrExtractor setResult={(text) => setOcrResult(text)} />
      {ocrResult && <OcrResult ocrResult={ocrResult} />}
      {ocrResult && <DownloadKeywordExcel ocrResult={ocrResult} />}
    </div>
  );
}
