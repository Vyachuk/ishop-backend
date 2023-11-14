const { ctrlWrapper, sendDataToEmail } = require("../helpers");

const sendEmail = (req, res, next) => {
  // console.log({ ...req.body });
  sendDataToEmail({ ...req.body });
  res.json({ message: "List was successfully sent" });
};

module.exports = {
  sendEmail: ctrlWrapper(sendEmail),
};
