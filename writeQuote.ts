import fs from "node:fs";
import { Quote, FileType } from "./types";

export function writeQuote(quotes: Quote[], format: FileType) {
  let data;
  switch (format) {
    case "json":
      data = JSON.stringify(quotes, null, 2);
      break;
    case "txt":
      data = quotes.map((quote: Quote) => `Text: ${quote.text}`).join("\n");
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

  fs.writeFile(`quotes.${format}`, data, "utf8", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Quote saved in quotes.${format}`);
    }
  });
}
