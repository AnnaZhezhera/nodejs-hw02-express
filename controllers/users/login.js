const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const passCompare = bcrypt.compareSync(password, user.password);
    if (!user || !passCompare) {
      throw new Unauthorized("Email or password is wrong");
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
