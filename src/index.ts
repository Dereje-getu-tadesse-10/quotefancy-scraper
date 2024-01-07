import { fetchHtml } from "./fetch-html";
import { getQuotes } from "./scrapper";
import { writeQuote } from "../writeQuote";

const SCOPED_ARTIST = "/taylor-swift-quotes";
const OUTPUT_FILE = "json";
const FILE_NAME = "taylor-switft-quotes";

fetchHtml(SCOPED_ARTIST)
  .then(getQuotes)
  .then((quotes) => {
    writeQuote(quotes, OUTPUT_FILE, FILE_NAME);
  })
  .catch((error) => console.log(error));
