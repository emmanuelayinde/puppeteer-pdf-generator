const express = require("express");
const generatePdf = require("./services/generate-pdf");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const _PORT_ = 8080;

app.get("/", async (_, res) => {
 
  res.send(`Welcome to Puppeteer website to pdf generator, to generate a new pdf from a url kinfly navigate to the /generator POST with your url and the only body param.`);
});

app.post("/generate-pdf", async (req, res) => {
  const newPDF = await generatePdf(req.body.url);

  //   res.download(newPDF)
  res.json({ pdf: newPDF });
});

app.listen(_PORT_, () => {
  console.log(`Server running on http://localhost:${_PORT_}`);
});
