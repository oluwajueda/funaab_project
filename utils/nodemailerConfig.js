const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  service: "gmail",
  port: 465,
  secure: true,
  secureConnection: false,
  auth: {
    user: "osuolaleolamide6@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
