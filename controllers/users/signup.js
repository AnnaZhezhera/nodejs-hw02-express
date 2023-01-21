const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // якщо findOne  нічого не знайшов => null
    if (user) {
      throw new Conflict(`User with email:${email} already exists`);
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const result = await User.create({ email, password: hashPassword });
    console.log("result", result);

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
