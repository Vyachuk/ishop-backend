const express = require("express");

const ctrl = require("../../controllers/store");
const { validateBody, isValidId } = require("../../middlewares");

const { addPhoneSchema } = require("../../Schemas/store");

const router = express.Router();

router.get("/", ctrl.getStore);
router.get("/:gudgetId", isValidId, ctrl.getGudgetById);
router.post("/", validateBody(addPhoneSchema), ctrl.addGudget);
router.put(
  "/:gudgetId",
  isValidId,
  validateBody(addPhoneSchema),
  ctrl.updateGudget
);

module.exports = router;
