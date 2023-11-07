const Joi = require("joi");

const { emailRegexp } = require("../constants/sendEmail");

const emailValidateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.number(),
  email: Joi.string().pattern(emailRegexp).required(),
  message: Joi.string(),
});

module.exports = {
  emailValidateSchema,
};
