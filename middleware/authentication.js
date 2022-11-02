const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(400).send("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, email } = payload;
    req.user = { userId, email };
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
