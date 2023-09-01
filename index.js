const express = require("express");
const generatePdf = require("./services/generate-pdf");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const _PORT_ = 8080;

app.get("/", async (_, res) => {
  res.send("Welcome, convert your website to pdf.");
});

app.get("/:domain", async (req, res) => {
  const url = "https://" + req.params.domain + ".com/";
  await generatePdf(res, url);
});

app.post("/generate-pdf", async (req, res) => {
  await generatePdf(res, req.body.url);
});

app.listen(_PORT_, () => {
  console.log(`Server running on http://localhost:${_PORT_}`);
});
