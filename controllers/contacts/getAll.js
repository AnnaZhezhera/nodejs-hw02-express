const { bool } = require("joi");
const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 5, favourite } = req.query;
  const skip = (page - 1) * limit;
  console.log("fav", typeof favourite);
  // console.log("user", req.user);
  try {
    console.log("favourite", favourite);
    const isFavUndefined = favourite === undefined; // якщо favourite не задано
    console.log("isFavUndefined", isFavUndefined);
    const result = await Contact.find(
      isFavUndefined ? { owner: _id } : { owner: _id, favourite },
      //          isFavUndefined=true : isFavUndefined=false  ("true" or "false")
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
