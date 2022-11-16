const { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    res.status(401).json("Authentication invalid");
  }
  try {
    const payload = isTokenValid(token);

    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };
    next();
  } catch (error) {
    res.status(401).json("Authentication invalid");
  }
};

module.exports = { authenticateUser };
