const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
require("dotenv").config();

const { PORT } = process.env;

const { User } = require("../../models/user");
const sendEmail = require("../../helpers/sendMail");

const signup = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    // якщо findOne  нічого не знайшов => null
    if (user) {
      throw new Conflict(`User with email:${email} already exists`);
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const verificationToken = nanoid();

    const newUser = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Email confirmation",
      html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}>Press to confirm registration</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newUser: {
          email,
          subscription,
          avatarURL,
          verificationToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
