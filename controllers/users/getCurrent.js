const { User } = require("../../models/user");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email,
      },
    },
  });
};

module.exports = getCurrent;
