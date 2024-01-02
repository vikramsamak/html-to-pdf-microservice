const express = require("express");
const { convertLogic } = require("./convertLogic");
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get("/", (req, res) => {
  res.send(`HTML-TO-PDF Service Runnig On Port ${PORT}!`);
});

app.post("/convert", (req, res) => {
  const { htmlContent } = req.body;
  convertLogic(htmlContent, res);
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
