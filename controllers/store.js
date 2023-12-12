const {
  ctrlWrapper,
  HttpError,
  cloudinaryUploader,
  getPublicId,
  cloudinaryRemover,
} = require("../helpers");
const Store = require("../models/store");

const fs = require("fs/promises");
const path = require("path");

const getStore = async (req, res) => {
  const result = await Store.find(req.query || {});
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
  const { category, color, version, condition } = req.body;

  const posterPromises = req.files.map(async (item) => {
    const { path, filename } = item;
    const filePath = await cloudinaryUploader(path, "posters", filename);

    return filePath;
  });
  const poster = await Promise.all(posterPromises);

  const result = await Store.create({
    ...req.body,
    category: category.toLowerCase(),
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

  const gudget = await Store.findById(gudgetId);
  if (!gudget) {
    throw HttpError(404, "Gudget not found");
  }

  if (gudget.poster) {
    gudget.poster.map(async (photo) => {
      const public_id = getPublicId(photo);
      await cloudinaryRemover(public_id, "posters");
    });
  }

  await Store.findByIdAndDelete(gudgetId);
  res.status(200).json({
    message: "Success your gudget deleted",
  });
};

module.exports = {
  getStore: ctrlWrapper(getStore),
  getGudgetById: ctrlWrapper(getGudgetById),
  addGudget: ctrlWrapper(addGudget),
  updateGudget: ctrlWrapper(updateGudget),
  deleteGudget: ctrlWrapper(deleteGudget),
};
