// const app = require("./app");
// require("dotenv").config();

// const { PORT } = process.env;

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}!`);
// });

const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
