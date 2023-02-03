const signup = require("./signup");
const login = require("./login");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");

module.exports = {
  signup,
  login,
  getCurrent,
  updateSubscription,
  logout,
  updateAvatar,
  verifyEmail,
  resendEmail,
};
