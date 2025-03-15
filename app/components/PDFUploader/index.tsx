"use client";

import "core-js/full/promise/with-resolvers.js";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function PDFUploader() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setPdfUrl(fileURL);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />

      {pdfUrl && (
        <div className="flex flex-col items-center">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div className="mt-4 flex gap-2">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              이전
            </button>
            <p>
              {pageNumber} / {numPages}
            </p>
            <button
              disabled={pageNumber >= (numPages || 1)}
              onClick={() =>
                setPageNumber((prev) => Math.min(prev + 1, numPages || 1))
              }
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
