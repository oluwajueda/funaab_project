const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require("crypto");
const {
  sendVerificationEmail,
  createUserToken,
  sendResetPasswordEmail,
  createHash,
  attachCookiesToResponse,
} = require("../utils");

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

    const origin = "http://localhost:3000";

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
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(401).send("Please provide email and password");
    return;
  }
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).send("invalid credentials");
    return;
  }

  isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    res.status(401).send("invalid credentials");
    return;
  }
  if (!user.isVerified) {
    res.status(401).send("Please verify your email");
  }

  const tokenUser = createUserToken(user);

  // create refresh token
  let refreshToken = "";
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      res.status(401).json("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(200).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(200).json({ user: tokenUser });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json("Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    const origin = "http://localhost:3000";

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 6 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;

    await user.save();
  }
  res
    .status(201)
    .json({ msg: "Please check your email for reset password link" });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  if (!token || !email || !password) {
    res.status(401).json({ msg: "Please provide all values" });
  }

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }
  res.send("reset password");
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
};
