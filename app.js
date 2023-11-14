const express = require("express");

const cors = require("cors");

const sendEmailRouter = require("./routes/api/sendEmail");
const storeRouter = require("./routes/api/store");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/sendemail", sendEmailRouter);
app.use("/api/store", storeRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
