const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
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
  if (req.url === "/index.html" || req.url === "/") {
    readFile(200, "index.html", res);
  } else if (req.url === "/about.html") {
    readFile(200, "about.html", res);
  } else if (req.url === "/contact-me.html") {
    readFile(200, "contact-me.html", res);
  } else if (!(req.url === "index.html")) {
    console.log(req.url);
    readFile(404, "404.html", res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
