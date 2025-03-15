import { createExcel } from "@/app/utils/excel";

interface Props {
  ocrResult: string;
}
export default function DownloadKeywordExcel({ ocrResult }: Props) {
  const handleDownloadKeywordExcel = async () => {
    const splitedText = ocrResult.split("\n1.");
    const result = [];

    for (const pageText of splitedText) {
      const response = await fetch("/api/extract-keyword", {
        method: "POST",
        body: JSON.stringify(pageText),
      });

      const data = await response.json();
      result.push(data);
    }

    createExcel(result);
  };
  return (
    <div className="flex flex-col gap-2">
      <button
        className="px-4 py-2 bg-rose-400 text-white rounded-lg shadow-md hover:bg-rose-500 transition disabled:bg-rose-300"
        onClick={handleDownloadKeywordExcel}
      >
        Keyword 엑셀로 다운로드
      </button>
      <div className="text-gray-500">keyword: Reference No, weight, date</div>
    </div>
  );
}
