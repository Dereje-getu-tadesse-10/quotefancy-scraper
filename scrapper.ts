import cheerio from "cheerio";

type Quotes = {
  text: string;
  url: string;
};

export const getQuotes = (html: string): { text: string; url: string }[] => {
  const $ = cheerio.load(html);

  const quotes: Quotes[] = [];

  // select all <a>  with class "quote-a"
  $("a.quote-a").each((i, elem) => {
    const text = $(elem).text(); // get the text
    const url = $(elem).attr("href") ?? ""; // get the url quote
    quotes.push({ text, url }); // push in quotes array
  });

  return quotes; // return quotes array
};
