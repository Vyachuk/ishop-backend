const express = require("express");

const { sendEmail } = require("../../controllers/sendEmail");

const { validateBody } = require("../../middlewares");

const { emailValidateSchema } = require("../../Schemas/validate");

const router = express.Router();

router.post("/", validateBody(emailValidateSchema), sendEmail);

module.exports = router;
