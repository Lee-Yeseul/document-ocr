"use client";
import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [ocrResult, setOcrResult] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) return alert("PDF 파일을 선택하세요!");

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await fetch("/api/local", {
        method: "POST",
        body: formData,
      });

      const data = await response;
      setOcrResult((await data.json()).text);
    } catch (e) {
      console.log("this is error", e);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg,.pdf"
      />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        OCR 실행
      </button>

      {ocrResult && (
        <div style={{ marginTop: "20px" }}>
          <h2>추출된 텍스트</h2>
          <p>{JSON.stringify(ocrResult)}</p>
        </div>
      )}
    </div>
  );
}
