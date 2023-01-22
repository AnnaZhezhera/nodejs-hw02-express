const NotFound = require("http-errors");
const { Contact } = require("../../models/contact");

const getById = async (req, res, next) => {
  try {
    const { authUserId } = req.user;
    const { id } = req.params;
    const result = await Contact.findOne({
      _id: id,
      owner: authUserId,
    }).populate("owner", "_id email subscription");
    if (!result) {
      throw new NotFound(`Contact with id:${id} was not found`);
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

module.exports = getById;
