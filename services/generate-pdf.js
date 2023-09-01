require("dotenv").config();
const puppeteer = require("puppeteer");

module.exports = async (res, url) => {
  const PDFPath = "/output.pdf";

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
    console.log("Done converting to PDF.");
    console.log({ PDFPath });
    // res.json({ PDF: PDFPath });
    res.download(PDFPath);
  } catch (error) {
    console.log({ error });
    res.send(`Something went wrong while running Puppeteer: ${error}`);
  } finally {
    await browser.close();
  }
};
