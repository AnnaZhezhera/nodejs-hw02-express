const { BadRequest } = require("http-errors");
const { Contact } = require("../../models/contact");

const updateFavourite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authUserId } = req.user;
    const { favourite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      { _id: id, owner: authUserId },
      { favourite },
      { new: true }
    );
    if (!result) {
      throw new BadRequest(`missing field favorite`);
    } else {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact: result,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavourite;
