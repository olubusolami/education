const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: "devolubusola@gmail.com",
        pass: "Olubusola//2021",
      },
    });

    await transporter.sendMail(
      {
        from: "devolubusola@gmail.com",
        to: "olubusolao3@gmail.com",
        subject: "Reset Password",
        // text: "Please click the link to create a new password different from your old password!",
        html: `${"Please click the button to reset your password"} <br> <button>Please CLick the Button</button>`,
      },
      (err, response) => {
        err
          ? console.log("Err>>", err.message)
          : console.log("success", response);
      }
    );
    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
