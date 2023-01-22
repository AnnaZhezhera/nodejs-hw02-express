const getCurrent = async (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    },
  });
};

module.exports = getCurrent;
