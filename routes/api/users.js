const express = require("express");
const router = express.Router();
const { users: controllers } = require("../../controllers");
const {
  joiSchema,
  joiSubscriptionSchema,
  joiVerifyEmail,
} = require("../../models/user");
const validation = require("../../middlewares/validation");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

const validateMiddleware = validation(joiSchema);
const validateSubscriptionMiddleware = validation(joiSubscriptionSchema);
const verifyEmailMiddleware = validation(joiVerifyEmail);

router.post("/signup", validateMiddleware, controllers.signup);

router.get("/verify/:verificationToken", controllers.verifyEmail);
router.post("/verify", verifyEmailMiddleware, controllers.resendEmail);

router.post("/login", validateMiddleware, controllers.login);

router.get("/current", auth, controllers.getCurrent);

router.patch(
  "/",
  auth,
  validateSubscriptionMiddleware,
  controllers.updateSubscription
);

router.get("/logout", auth, controllers.logout);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
