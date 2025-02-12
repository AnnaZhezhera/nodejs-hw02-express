const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authUserId } = req.user;
    const result = await Contact.findOneAndUpdate(
      { id, owner: authUserId },
      req.body,
      {
        new: true,
      }
    );
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

module.exports = updateById;
