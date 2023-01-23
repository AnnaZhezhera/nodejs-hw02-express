const { NotFound } = require("http-errors");
const { User } = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  try {
    const { authUserId } = req.user;
    const { subscription } = req.body;
    const updUser = await User.findOneAndUpdate(
      { owner: authUserId },
      { subscription },
      {
        new: true,
      }
    );

    if (!updUser) {
      throw new NotFound("User is not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        user: updUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
