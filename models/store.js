const { Schema, model } = require("mongoose");

const { handleValidateError, runUpdateValidators } = require("./hooks");

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for gudget"],
    },
    category: {
      type: String,
      required: [true, "Set category for gudget"],
    },
    color: {
      type: String,
      required: [true, "Set color for gudget"],
    },
    storage: {
      type: String,
      required: [true, "Set storage for gudget"],
    },
    version: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Set price for gudget"],
    },
    poster: {
      type: Array,
    },
    available: {
      type: String,
      default: "Yes",
    },
    condition: {
      type: String,
      required: [true, "Set condition for gudget"],
    },
  },
  { versionKey: false }
);

storeSchema.pre("findOneAndUpdate", runUpdateValidators);

storeSchema.post("findOneAndUpdate", handleValidateError);

storeSchema.post("save", handleValidateError);

const Store = model("gudget", storeSchema);

module.exports = Store;
