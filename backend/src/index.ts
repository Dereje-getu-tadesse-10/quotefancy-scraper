import fs from "node:fs";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { fetchHtml } from "./fetch-html";
import { getQuotes } from "./scrapper";
import { writeQuote } from "./writeQuote";

const app: Express = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = 8080;

app.post("/", (req: Request, res: Response) => {
  const { path, file_name, file_type } = req.body;

  if (!path || !file_name || !file_type) {
    return res.status(400).json({
      status: false,
      message: "Missing required fields",
    });
  }

  fetchHtml(path)
    .then(getQuotes)
    .then((quotes) => {
      const file = writeQuote(quotes, file_type, file_name);
      res.json({
        status: true,
        message: "Quotes fetched and written successfully",
        file
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: false,
        message: "An error occurred",
      });
    });
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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
