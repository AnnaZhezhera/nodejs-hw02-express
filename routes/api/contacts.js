const express = require("express");
const router = express.Router();
const { contacts: controllers } = require("../../controllers");
const { joiSchema, favJoiSchema } = require("../../models/contact");
const validation = require("../../middlewares/validation");
const auth = require("../../middlewares/auth");

const validateMiddleware = validation(joiSchema);

router.get("/", auth, controllers.getAll);

router.get("/:id", auth, controllers.getById);

router.post("/", auth, validateMiddleware, controllers.add);

router.put("/:id", auth, validateMiddleware, controllers.updateById);

router.patch(
  "/:id/favourite",
  auth,
  validation(favJoiSchema),
  controllers.updateFavourite
);

router.delete("/:id", auth, controllers.removeById);

module.exports = router;
