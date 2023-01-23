const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { User } = require("../models/user");

// запише дані в getCurrent.js(req.user) про те, який user надсилає запит
const auth = async (req, res, next) => {
  // console.log("entering auth");
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
