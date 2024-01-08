import fs from "node:fs";
import path from "node:path";
import express, { Express, Request, Response } from "express";
import cors from "cors";

import { fetchHtml } from "./fetch-html";
import { getQuotes } from "./scraper";
import { writeQuote } from "./writeQuote";

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = 8080;

app.post("/", async (req: Request, res: Response) => {
  const { path, file_name, file_type } = req.body;

  if (!path || !file_name || !file_type) {
    return res.status(400).json({
      status: false,
      message: "Missing required fields",
    });
  }

  try {
    const paths = Array.isArray(path) ? path : [path];
    const allQuotes = await Promise.all(
      paths.map(async (singlePath) => {
        const html = await fetchHtml(singlePath);
        const quotes = getQuotes(html);
        return quotes;
      })
    );

    const combinedQuotes = allQuotes.flat();
    const file = writeQuote(combinedQuotes, file_type, file_name);

    res.json({
      status: true,
      message: "Quotes fetched and written successfully",
      file,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "An error occurred",
    });
  }
});

app.get("/download/:fileName", (req, res) => {
  const { fileName } = req.params;
  const file = `public/quotes/${fileName}`;
  console.log(file);
  if (fs.existsSync(file)) {
    res.download(file);
  } else {
    res.status(404).send("Not found");
  }
});

app.delete("/delete/:fileName", (req: Request, res: Response) => {
  const { fileName } = req.params;
  const filePath = path.join("public/quotes", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.status(404).send("File not found");
      } else {
        console.error(err);
        res.status(500).send("An error occurred");
      }
    } else {
      res.send("File deleted");
    }
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
