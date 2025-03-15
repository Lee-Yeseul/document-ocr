import * as XLSX from "xlsx";

interface DataObject {
  referenceNo?: string;
  weight?: string;
  date?: string;
  fileName?: string;
}

export function createExcel(data: DataObject[]) {
  const ws = XLSX.utils.json_to_sheet(data);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, "Extracted_Keywords.xlsx");
}
