require("dotenv").config();
const fs = require("fs");
const puppeteer = require("puppeteer");

module.exports = async (res, url) => {
  const filePath = "output.pdf";

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
    const pdf = await page.pdf({ format: "A1" });

    fs.writeFileSync(filePath, pdf);

    res.download(filePath)
  } catch (error) {
    console.log({ error });
    res.send(`Something went wrong while running Puppeteer: ${error}`);
  } finally {
    await browser.close();
  }
};
