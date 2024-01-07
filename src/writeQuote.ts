import fs from "node:fs";
import { Quote, FileType } from "../types";

export function writeQuote(
  quotes: Quote[],
  format: FileType,
  file_name = "quotes"
) {
  let data;
  switch (format) {
    case "json":
      data = JSON.stringify(quotes, null, 2);
      break;
    case "txt":
      data = quotes.map((quote: Quote) => `${quote.text}`).join("\n");
      break;
    case "csv":
      data =
        "Text,URL,Image\n" +
        quotes
          .map(
            (quote: Quote) => `"${quote.text}","${quote.url}","${quote.image}"`
          )
          .join("\n");
      break;
    default:
      throw new Error("Not supported");
  }

  fs.writeFile(`${file_name}.${format}`, data, "utf8", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Quote saved in ${file_name}.${format}`);
    }
  });
}
