const { ctrlWrapper } = require("../helpers");
const Store = require("../models/store");

const getStore = async (req, res) => {
  const {  } = req.query;
  // const skip = (page - 1) * limit;
  // const result = await Contact.find({ owner }, "", { skip, limit });
  // res.status(200).json(result);
};

module.exports = {
  getStore: ctrlWrapper(getStore),
};
