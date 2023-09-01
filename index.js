const express = require("express");
const generatePdf = require("./services/generate-pdf");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const _PORT_ = 8080;

app.get("/", async (_, res) => {
  res.send(
    `Welcome to Puppeteer website to pdf generator, to generate a new PDF from a URL, kindly navigate to the /generate-pdf route with POST method and your url as the body param.`,
  );
});

app.post("/generate-pdf", async (req, res) => {
  await generatePdf(res, req.body.url);
});

app.listen(_PORT_, () => {
  console.log(`Server running on http://localhost:${_PORT_}`);
});
