import express, { json } from 'express';
import { launch } from 'puppeteer';
import cors from 'cors';
const app = express();
const port = 3001 || process.env.PORT;

app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', async (req, res) => {
  try {
    res.json({ data: 'Welcome to HTML-To-PDF Mircoservice.' }).status(200)

  } catch (error) {
    res.json({ error: error.message }).status(500)
  }
});

app.post('/generate-pdf', async (req, res) => {
  const { htmlContent } = req.body;

  try {
    const browser = await launch({ headless: 'new' });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
    const pdfBuffer = await page.pdf({ format: 'A4' });

    const pdfBase64 = pdfBuffer.toString('base64');

    await browser.close();

    const pdfData = {
      dataUri: `data:application/pdf;base64,${pdfBase64}`
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfData);
  } catch (error) {
    res.send(error.message).status(500)
  }
});

app.listen(port, () => {
  console.log(`Microservice is running on port ${port}.`);
});
