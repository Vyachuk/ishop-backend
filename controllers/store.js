const { ctrlWrapper } = require("../helpers");
const Store = require("../models/store");

const getStore = async (req, res) => {
  const { category } = req.query;
  const result = await Store.find({ category });
  res.status(200).json(result);
};

const getGudgetById = async (req, res) => {
  const { gudgetId } = req.params;
  const result = await Store.findById(gudgetId);
  if (!result) {
    throw HttpError(404, "Gudget not found");
  }
  res.status(200).json(result);
};

const addGudget = async (req, res) => {
  const { type, color, version, condition } = req.body;
  // const { path: oldPath, filename } = req.file;
  // const newPath = path.join(posterPath, filename);
  // await fs.rename(oldPath, newPath);
  // const poster = path.join("poster", filename);
  const result = await Store.create({
    ...req.body,
    type: type.toLowerCase(),
    color: color.toLowerCase(),
    version: version.toLowerCase(),
    condition: condition.toLowerCase(),
    // poster,
  });
  res.status(201).json(result);
};

const updateGudget = async (req, res) => {
  const { gudgetId } = req.params;
  const result = await Store.findByIdAndUpdate(gudgetId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getStore: ctrlWrapper(getStore),
  getGudgetById: ctrlWrapper(getGudgetById),
  addGudget: ctrlWrapper(addGudget),
  updateGudget: ctrlWrapper(updateGudget),
};
