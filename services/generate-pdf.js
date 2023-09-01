require("dotenv").config();
const puppeteer = require("puppeteer");
const path = require("path");

module.exports = async (res, url) => {
  const PDFPath = path.resolve(__dirname, "../files/output.pdf");

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();
    await page.goto(url);
    await page.pdf({ path: PDFPath, format: "A4" });
    res.json({ PDF: PDFPath });
  } catch (error) {
    res.send(`Something went wrong while running Puppeteer: ${error}`);
  } finally {
    await browser.close();
  }
};
