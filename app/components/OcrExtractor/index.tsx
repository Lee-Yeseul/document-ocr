"use client";
import { useState } from "react";
import FileInput from "../FileInput";
import LoadingSpinner from "../LoadingSpinner";

interface Props {
  setResult: (text: string) => void;
}
export default function OcrExtractor({ setResult }: Props) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [ocrLoading, setOcrLoading] = useState(false);

  const handleUpload = async () => {
    try {
      if (!selectedFile) return alert("PDF 파일을 선택하세요!");
      setOcrLoading(true);

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await fetch("/api/ocr/pdf", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setResult(result.text);
      setOcrLoading(false);
    } catch (e) {
      console.log("this is error", e);
    }
  };
  return (
    <div className="flex gap-4">
      {ocrLoading && <LoadingSpinner text="ocr 생성중..." />}
      <FileInput setFile={(file) => setSelectedFile(file)} />
      <button
        className="px-4 py-2 bg-rose-400 text-white rounded-lg shadow-md hover:bg-rose-500 transition disabled:bg-rose-300"
        disabled={!selectedFile}
        onClick={handleUpload}
      >
        OCR 실행
      </button>
    </div>
  );
}
