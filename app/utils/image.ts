export const saveCaptureImg = (uri: string, filename: string) => {
  try {
    const link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  } catch (err) {
    console.log(err);
  }
};
