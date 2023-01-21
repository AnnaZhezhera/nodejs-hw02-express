const express = require("express");
const router = express.Router();
const { users: controllers } = require("../../controllers");
const { joiSchema } = require("../../models/user");
const validation = require("../../middlewares/validation");
const auth = require("../../middlewares/auth");

const validateMiddleware = validation(joiSchema);

router.post("/signup", validateMiddleware, controllers.signup);

router.post("/login", validateMiddleware, controllers.login);

router.get("/current", auth, controllers.getCurrent);

module.exports = router;
