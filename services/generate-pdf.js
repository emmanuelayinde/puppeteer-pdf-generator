const puppeteer = require("puppeteer");
const path = require('path')

module.exports = async (url) => {
  const PDFPath = path.resolve(__dirname, "../files/output.pdf")


  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url);
  await page.pdf({ path: PDFPath, format: "A4" });
  await browser.close();

  return PDFPath;
};
