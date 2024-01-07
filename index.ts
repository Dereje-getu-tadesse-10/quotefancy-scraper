import { fetchHtml } from "./fetch-html";
import { getQuotes } from "./scrapper";
import { writeQuote } from "./writeQuote";

const SCOPED_ARTIST = "/taylor-swift-quotes";
const OUTPUT_FILE = "json";

fetchHtml(SCOPED_ARTIST)
  .then(getQuotes)
  .then((quotes) => {
    writeQuote(quotes, OUTPUT_FILE);
  })
  .catch((error) => console.log(error));
