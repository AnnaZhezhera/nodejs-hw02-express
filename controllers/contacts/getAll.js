const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { authUserId } = req.user;
  const { page = 1, limit = 5, favourite } = req.query;
  const skip = (page - 1) * limit;
  try {
    const result = await Contact.find(
      favourite ? { authUserId, favourite } : { authUserId },
      "-createdAt -updatedAt",
      { owner: authUserId },
      "name email phone favorite",
      {
        skip,
        limit: Number(limit),
      }
    ).populate("owner", "authUserId email subscription");
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
