# Quotefancy Scraper

## Features

- [x] Download scraped data with images (Note: Images are available only in JSON and CSV formats).
- [x] Delete scraped files.
- [x] Scrape multiple **urls**.
- [x] Choose file name and output file extension (options include: `json`, `txt`, `csv`).

https://github.com/Dereje-getu-tadesse-10/quotefancy-scraper/assets/95926729/8f0df1ba-c3db-489c-8a1f-9cb0c040ecee

## Getting Started

### Clone the Repository

To start with the project, clone the repository using the following command:

```
git clone https://github.com/Dereje-getu-tadesse-10/quotefancy-scraper.git
```

### Navigate to the Cloned Folder

After cloning, navigate to the 'quotefancy-scraper' folder:

```
cd quotefancy-scraper
```

### Backend Setup

Inside the 'quotefancy-scraper' directory, proceed to the backend folder, install dependencies, and start the server:

```
cd backend && pnpm i && pnpm run dev
```

The server runs on http://localhost:8080

### Frontend Setup

Similarly, for the frontend setup:

```
cd frontend && pnpm i && pnpm run dev
```

The server runs on http://localhost:5173

## Multiple URL Scraping

You can scrape from multiple **urls**. For example, to scrape the first 5 pages of Taylor Swift quotes, use **urls** like these:

```
https://quotefancy.com/taylor-swift-quotes,
https://quotefancy.com/taylor-swift-quotes/page/2,
https://quotefancy.com/taylor-swift-quotes/page/3,
https://quotefancy.com/taylor-swift-quotes/page/4,
https://quotefancy.com/taylor-swift-quotes/page/5,
```

Alternatively, for varied sources:

```
https://quotefancy.com/kanye-west-quotes,
https://quotefancy.com/taylor-swift-quotes,
https://quotefancy.com/elon-musk-quotes
```

To scrape a single page, simply provide a URL like: `https://quotefancy.com/taylor-swift-quotes`

> This project is a playground for learning web scraping.
# reimagined-carnival
