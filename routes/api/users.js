const express = require("express");
const router = express.Router();
const { users: controllers } = require("../../controllers");
const { joiSchema, joiSubscriptionSchema } = require("../../models/user");
const validation = require("../../middlewares/validation");
const auth = require("../../middlewares/auth");

const validateMiddleware = validation(joiSchema);
const validateSubscriptionMiddleware = validation(joiSubscriptionSchema);

router.post("/signup", validateMiddleware, controllers.signup);

router.post("/login", validateMiddleware, controllers.login);

router.get("/current", auth, controllers.getCurrent);

router.patch(
  "/",
  auth,
  validateSubscriptionMiddleware,
  controllers.updateSubscription
);

router.get("/logout", auth, controllers.logout);

module.exports = router;
