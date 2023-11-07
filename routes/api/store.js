const express = require("express");

const ctrl = require("../../controllers/store");

// const { sendEmail } = require("../../controllers/sendEmail");

// const validateBody = require("../../helpers/validateBody");

// const { validateSchema } = require("../../Schemas/validate");

const router = express.Router();

router.get("/", ctrl.getStore);
// router.post("/", validateBody(validateSchema), sendEmail);

module.exports = router;
