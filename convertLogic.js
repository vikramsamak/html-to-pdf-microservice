const puppeteer = require("puppeteer");
require("dotenv").config();

const convertLogic = async (htmlContent) => {
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
    const browser = await puppeteer.launch({ headless: 'new' });

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });

    const pdfBase64 = pdfBuffer.toString('base64');

    const dataUri = `data:application/pdf;base64,${pdfBase64}`

    return dataUri;
  }
  catch (e) {
    console.error(e);
  }
  finally {
    await browser.close();
  }
};

module.exports = { convertLogic };
