const http = require("http");
const fs = require("fs");

const hostname = "0.0.0.0";
const port = 3000;

const displayPage = (statusCode, data, res) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "text/html");
  res.end(data);
};

const readFile = (statusCode, filename, res) => {
  fs.readFile(filename, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }
    displayPage(statusCode, data, res);
  });
};

const server = http.createServer((req, res) => {
  const requestedURL = req.url.split(".");

  if (
    (requestedURL.length === 2 && requestedURL[1] === "html") ||
    requestedURL.length === 1
  ) {
    if (requestedURL[0] === "/index" || requestedURL[0] === "/") {
      readFile(200, "index.html", res);
    } else if (requestedURL[0] === "/about") {
      readFile(200, "about.html", res);
    } else if (requestedURL[0] === "/contact-me") {
      readFile(200, "contact-me.html", res);
    } else {
      readFile(404, "404.html", res);
    }
  } else {
    readFile(404, "404.html", res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
