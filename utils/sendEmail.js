const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  var transport = nodemailer.createTransport(nodemailerConfig);

  return transport.sendMail({
    from: '"Funaab Fellowsip" <osuolaleolamde1@example.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
