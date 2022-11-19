const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  var transport = nodemailer.createTransport(nodemailerConfig);
  transport.verify().then(console.log).catch(console.error);

  return transport.sendMail({
    from: '"TACSFON" <osuolaleolamide6@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
