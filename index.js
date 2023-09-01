const express = require("express");
const generatePdf = require("./services/generate-pdf");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const _PORT_ = 8080;

app.get("/",  async (_, res) => {
  const url = 'https://render.com/'
  await generatePdf(res, url)
});

app.post("/generate-pdf", async (req, res) => {
  await generatePdf(res, req.body.url);
});

app.listen(_PORT_, () => {
  console.log(`Server running on http://localhost:${_PORT_}`);
});
