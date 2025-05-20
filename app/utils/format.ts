export function extractFields(inputText: string) {
  const result: { [key: string]: string } = {};

  const referenceNoRegex = /Reference No\.\s*(\S+)/;
  const referenceNoMatch = inputText.match(referenceNoRegex);
  console.log(referenceNoMatch);
  if (referenceNoMatch) {
    result["referenceNo"] = referenceNoMatch[1];
  }

  const gwRegex = /GW:\s*([\d\.]+)\s*KGM/;
  const gwMatch = inputText.match(gwRegex);
  if (gwMatch) {
    result["weight"] = gwMatch[1].trim() + " KGM";
  }

  const certificationRegex =
    /Certification:[\s\S]*?(\bFEBRUARY\s+\d{1,2},\s+\d{4}\b)/;
  const certificationMatch = inputText.match(certificationRegex);
  if (certificationMatch) {
    result["date"] = formatDate(certificationMatch[1].trim());
  }

  console.log("this is result", result);

  return result;
}

function formatDate(dateString: string): string {
  const months: { [key: string]: number } = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12,
  };

  const [monthName, day, year] = dateString.split(" ");
  const month = months[monthName.toUpperCase()];
  const formattedDate = `${year}${month}${parseInt(day)}`;

  return formattedDate;
}
