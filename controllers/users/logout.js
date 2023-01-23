const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  console.log("logout");
  try {
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json({
      status: "success",
      code: 204,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
