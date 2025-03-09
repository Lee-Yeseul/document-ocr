import * as XLSX from "xlsx";

interface DataObject {
  referenceNo?: string;
  weight?: string;
  date?: string;
  fileName?: string;
}

export function createExcel(data: DataObject[], outputPath: string) {
  // 데이터 배열을 워크시트로 변환
  const ws = XLSX.utils.json_to_sheet(data);

  // 워크북 생성
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // 워크북을 엑셀 파일로 저장
  XLSX.writeFile(wb, outputPath);
}
