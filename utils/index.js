const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createUserToken = require("./createTokenUser");
const sendVerificationEmail = require("./sendVerification");
const sendResetPasswordEmail = require("./sendResetPasswordEmail");
const createHash = require("./createHash");
module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createUserToken,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
};
