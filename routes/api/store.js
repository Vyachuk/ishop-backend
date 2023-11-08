const express = require("express");

const ctrl = require("../../controllers/store");

const { addPhoneSchema } = require("../../Schemas/store");

const validateBody = require("../../helpers/validateBody");
const isValidId = require("../../helpers/isValidId");

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
