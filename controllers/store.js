const { ctrlWrapper, HttpError } = require("../helpers");
const Store = require("../models/store");

const fs = require("fs/promises");
const path = require("path");

const posterPath = path.resolve("public", "gudgets");

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

  const posterPromises = req.files.map(async (item) => {
    const { path: oldPath, filename } = item;
    const newPath = path.join(posterPath, filename.split(" ").join(""));
    await fs.rename(oldPath, newPath);
    return path.join("gudgets", filename.split(" ").join(""));
  });
  const poster = await Promise.all(posterPromises);

  const result = await Store.create({
    ...req.body,
    type: type.toLowerCase(),
    color: color.toLowerCase(),
    version: version.toLowerCase(),
    condition: condition.toLowerCase(),
    poster,
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

const deleteGudget = async (req, res) => {
  const { gudgetId } = req.params;
  const { poster } = await Store.findById(gudgetId);
  if (!poster) {
    throw HttpError("404", "Not found");
  }

  poster.map(async (photo) => {
    try {
      await fs.unlink(`public/${photo}`);
    } catch (error) {}
  });
  await Store.findByIdAndDelete(gudgetId);

  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getStore: ctrlWrapper(getStore),
  getGudgetById: ctrlWrapper(getGudgetById),
  addGudget: ctrlWrapper(addGudget),
  updateGudget: ctrlWrapper(updateGudget),
  deleteGudget: ctrlWrapper(deleteGudget),
};
