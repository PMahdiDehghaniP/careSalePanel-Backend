const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER_NAME,
      to: email,
      subject: subject,
      text: text,
    };
    await transporter.sendMail(mailOptions);
    console.log(` ✅Email sent successfully to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
