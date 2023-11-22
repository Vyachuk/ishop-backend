const Joi = require("joi");
const { gudgetsType } = require("../constants/store");

const addPhoneSchema = Joi.object({
  name: Joi.string(),
  category: Joi.string().valid(...gudgetsType),
  color: Joi.string(),
  storage: Joi.string(),
  version: Joi.string(), //вибір зі списку
  price: Joi.number(),
  poster: Joi.array(),
  image: Joi.string(), //переглянути домашку
  available: Joi.string(),
  condition: Joi.string(),
});

module.exports = {
  addPhoneSchema,
};
