const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email && password) {
      res.status(400).send("All input is rquired");
    }

    // check if user already exist on database

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist, Please Login");
    }

    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? "admin" : "user";

    //create user
    const user = await User.create({
      email: email.toLowerCase(),
      password: password,
      role,
    });

    const token = user.createJWT();

    res.status(201).json({ user: { email: user.email, role }, token });
  } catch (error) {
    console.log(error);
  }
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
  login,
};
