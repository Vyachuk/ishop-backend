const { isValidObjectId } = require("mongoose");
const HttpError = require("./HttpError");

const isValidId = (req, res, next) => {
  const { gudgetId } = req.params;
  if (!isValidObjectId(gudgetId)) {
    return next(HttpError(404, `${gudgetId} is not valid id.`));
  }
  next();
};

module.exports = isValidId;
