const { ctrlWrapper } = require("../helpers");

const getStore = async (req, res) => {
  res.status(200).json({ model: "5s", color: "blue" });
};

module.exports = {
  getStore: ctrlWrapper(getStore),
};
