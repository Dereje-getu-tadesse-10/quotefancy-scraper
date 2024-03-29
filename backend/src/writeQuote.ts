import fs from "node:fs";
import path from "node:path";

import { v4 as uuidv4 } from "uuid";

import { Quote, FileType } from "../types";

const PUBLIC_DIRECTORY =
  "./public/quotes" || path.join(__dirname, "..", "..", "public", "quotes");

export function writeQuote(
  quotes: Quote[],
  format: FileType,
  file_name = "quotes"
) {
  if (!fs.existsSync(PUBLIC_DIRECTORY)) {
    fs.mkdirSync(PUBLIC_DIRECTORY, { recursive: true });
  }

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

  const uniqueFileName = `${file_name}-${uuidv4()}.${format}`;

  const filePath = path.join(PUBLIC_DIRECTORY, uniqueFileName);

  fs.writeFile(filePath, data, "utf8", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Quote saved in ${filePath}`);
    }
  });
  return uniqueFileName;
}
