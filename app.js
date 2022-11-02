require("dotenv").config();
const { MONGO_URI } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const authRouter = require("./routes/auth");
const testimonyRouter = require("./routes/testimony");
const eventRouter = require("./routes/event");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/testimony", testimonyRouter);
app.use("/api/v1/event", eventRouter);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(5000, () => {
  console.log("app listening on port 5000");
});
