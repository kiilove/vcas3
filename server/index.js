const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const clientRouter = require("./routes/client");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBConnection Success");
  })
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use("/api/client", clientRouter);
app.listen(process.env.PORT, () => {
  console.log(`Backend Server is running for PORT:${process.env.PORT}!`);
});
