const express = require("express");
const { convertLogic } = require("./convertLogic");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
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

app.post("/convert", async (req, res) => {
  const { htmlContent } = req.body;
  try {
    const base64encodedPdf = await convertLogic(htmlContent);
    res.contentType('application/pdf');
    res.send(base64encodedPdf).status(200);
  }
  catch {
    res.send("Something Went Wrong!").status(500);
  }
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
