import https from "node:https";

export const fetchHtml = async (path: string): Promise<string> =>
  new Promise((resolve, reject) => {
    https
      .get(
        {
          hostname: "quotefancy.com",
          path, //  example of path: {{hostname}}/taylor-swift-quotes
          method: "GET",
        },
        (res) => {
          let html = ""; // store chunck data
          res.on("data", function (chunk) {
            html += chunk; // append the chunk
          });
          res.on("end", function () {
            resolve(html); // resolve the promise with the response
          });
        }
      )
      .on("error", (error) => {
        console.error(error);
        reject(error);
      });
  });
