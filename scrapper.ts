import cheerio from "cheerio";

type Quote = {
  text: string;
  url: string;
  image: string;
};

export const getQuotes = (html: string): Quote[] => {
  const $ = cheerio.load(html);
  const quotes: Quote[] = [];

  $(".q-container").each((_, quoteContainer) => {
    const text = $(quoteContainer).find("a.quote-a").text(); // quote text
    const url = $(quoteContainer).find("a.quote-a").attr("href") ?? ""; // quote url

    // get image container
    const wallpaper = $(quoteContainer).prev(".wallpaper");
    const imageSrc = wallpaper.find("img").attr("src") ?? "";
    const imageDataOriginal = wallpaper.find("img").attr("data-original") ?? "";
    const image = imageSrc || imageDataOriginal; // use src or meta data-original

    if (text && url && image) {
      quotes.push({ text, url, image }); // push in quotes array
    }
  });
  return quotes; // return quotes array
};
