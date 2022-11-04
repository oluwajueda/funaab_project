const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  veerificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${veerificationToken}&email=${email}`;

  const message = `<p>Please confirm your eamail by clicking on the following link : <a href="${verifyEmail}"> Verify Email</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${name}</h4>
        ${message}
        `,
  });
};

module.exports = sendVerificationEmail;
