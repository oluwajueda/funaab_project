require("dotenv").config();
const { MONGO_URI } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");


const fileUpload = require("express-fileupload");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const testimonyRouter = require("./routes/testimony");
const eventRouter = require("./routes/event");
const excoRouter = require("./routes/exco");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.static("./public"));
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser("secret"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/testimony", testimonyRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/exco", excoRouter);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("app listening on port 5000");
});
