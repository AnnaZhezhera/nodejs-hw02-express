const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favourite } = req.query;
  const skip = (page - 1) * limit;
  try {
    const isFavUndefined = favourite === undefined; // якщо favourite не вказано в params
    const result = await Contact.find(
      isFavUndefined ? { owner: _id } : { owner: _id, favourite },
      //    isFavUndefined===undefined : isFavUndefined === "true" || "false"
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
