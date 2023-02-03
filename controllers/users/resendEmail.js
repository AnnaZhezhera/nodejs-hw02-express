const { NotFound, BadRequest } = require("http-errors");
require("dotenv").config();
const { User } = require("../../models/user");
const sendEmail = require("../../helpers/sendMail");

const { PORT } = process.env;

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!email) {
      return res.status(400).json({
        message: "missing required field email",
      });
    }

    if (!user) {
      throw NotFound();
    }

    if (user.verify) {
      throw BadRequest("Verification has already been passed");
    }

    const mail = {
      to: email,
      subject: "Confirmation of signing up",
      text: "Registration need to be confirmed",
      html: `<a target="_blank href ="http://localhost:${PORT}/api/users/verify/:verificationToken${user.verificationToken}"> Please confirm registration</a>`,
    };

    await sendEmail(mail);

    res.json({
      message: "Verification email sent",
      data: {
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
