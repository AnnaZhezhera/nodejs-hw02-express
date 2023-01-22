const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favourite } = req.query;
  const skip = (page - 1) * limit;
  console.log("fav", favourite);
  console.log("user", req.user);
  try {
    const result = await Contact.find(
      favourite ? { owner: _id, favourite } : { owner: _id },
      "",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "_id email subscription");
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
