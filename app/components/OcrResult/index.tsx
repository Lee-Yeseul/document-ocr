interface Props {
  ocrResult: string;
}
export default function OcrResult({ ocrResult }: Props) {
  const splitedText = ocrResult.split("CERTIFICATE OF ORIGIN");
  return (
    <div className="p-10 flex flex-col gap-2">
      <h2 className="text-rose-500">페이지별 추출된 텍스트 확인</h2>

      {splitedText.map((text, index) => {
        return (
          <div
            key={index}
            className="shadow-lg p-4 rounded-lg flex flex-col gap-2"
          >
            <div className="font-semibold">page: {index + 1}</div>
            <div>{text}</div>
          </div>
        );
      })}
    </div>
  );
}
