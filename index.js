const express = require("express");
const { convertLogic } = require("./convertLogic");
const cors = require('cors');
const morgan = require('morgan');
const { upload } = require("./middlewares/multerMiddleware");
const { checkExtension } = require("./middlewares/checkExtension");
const fs = require('fs');
const { PDF_CONTENT_TYPE } = require("./helpers/constants");

const app = express();
const PORT = process.env.PORT || 2000;

// MiddleWares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan("combined"));

// Routes
app.get("/", (req, res) => {
  res.send(`HTML-TO-PDF Service Runnig On Port ${PORT}!`);
});

app.post("/convert-from-code", async (req, res) => {
  const { htmlCode } = req.body;
  try {
    const base64encodedPdf = await convertLogic(htmlCode);
    if (base64encodedPdf) {
      res.contentType(PDF_CONTENT_TYPE);
      res.send(base64encodedPdf).status(200);
    }
  }
  catch {
    res.send("Internal Server Error").status(500);
  }
});

app.post("/convert-from-file", upload.single('htmlFile'), checkExtension, async (req, res) => {
  const path = req.file.path;
  const fileContent = fs.readFileSync(path, 'utf8')
  try {
    const base64EncodedPdf = await convertLogic(fileContent);
    if (base64EncodedPdf) {
      res.contentType(PDF_CONTENT_TYPE);
      res.send(base64EncodedPdf).status(200);
      fs.unlinkSync(path);
    }
  }
  catch {
    res.send("Internal Server Error").status(500);
  }
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
