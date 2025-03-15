"use client";

import { useRef, useState } from "react";

interface Props {
  setFile: (file: File) => void;
}

export default function FileInput({ setFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFile(file);
    setFileName(file.name);
  };

  const handleClickFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".png,.jpg,.jpeg,.pdf"
        className="hidden"
      />
      <div onClick={handleClickFileUpload}>
        {fileName ? (
          <p className="text-rose-400 border rounded-lg border-gray-400 w-72 px-4 py-2 hover:border-rose-500">
            {fileName}
          </p>
        ) : (
          <p className="text-gray-400 border rounded-lg border-gray-400 w-72 px-4 py-2 hover:border-rose-500">
            선택된 파일 없음
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={handleClickFileUpload}
        className="px-4 py-2 bg-rose-400 text-white rounded-lg shadow-md hover:bg-rose-500 transition"
      >
        파일 선택
      </button>
    </div>
  );
}
