const express = require("express");
const router = express.Router();

const {
  login,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.post("/register", register);

router.post("/login", login);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);
router.post("/forgot-password", forgotPassword);

module.exports = router;
