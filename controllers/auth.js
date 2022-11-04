const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate user input
    if (!(email && password && name)) {
      res.status(400).send("All input is rquired");
    }

    // check if user already exist on database

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist, Please Login");
    }

    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    const verificationToken = crypto.randomBytes(40).toString("hex");

    //create user
    const user = await User.create({
      email: email.toLowerCase(),
      password: password,
      name: name,
      role,
      verificationToken,
    });

    const origin = "http://localhost:5000";

    await sendVerificationEmail({
      name: user.name,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });

    //send verification token back only while testing in postman!!
    res.status(201).json({
      msg: "Success! Please check your email to verify your account",
    });
  } catch (error) {
    console.log(error);
  }
};
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json("Verification Failed");
  }

  if (user.verificationToken !== verificationToken) {
    res.status(404).json("Verification Failed");
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";

  await user.save();

  res.status(201).json({ msg: "Email verified" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).send("email does not exist");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      res.status(400).send("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(200).json({ user: { email: user.email }, token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
};
