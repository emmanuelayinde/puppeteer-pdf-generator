require("dotenv").config();
const fs = require("fs");
const puppeteer = require("puppeteer");
const uploadToCloud = require("./uploadToCloud");
const path = require("path");

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
    console.log("Done converting to PDF.");

    fs.writeFileSync(filePath, pdf);

    console.log("file path ==> ", filePath);
    console.log("process.env.pwd ==> ", process.env.PWD);
    console.log("Path resolve ==> ", path.resolve(__dirname, filePath));

    res.send(`File ready`);

    // await uploadToCloud.uploadStream(pdf, res);
    // await uploadToCloud.uploadFile(filePath, res);
  } catch (error) {
    console.log({ error });
    res.send(`Something went wrong while running Puppeteer: ${error}`);
  } finally {
    await browser.close();
  }
};
