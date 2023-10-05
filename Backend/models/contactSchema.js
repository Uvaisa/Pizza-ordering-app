const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = new mongoose.Schema({
  cname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new error("email not valid");
      }
    },
  },
  message: {
    type: String,
    required: true,
  },
});
const contact = new mongoose.model("Contact", contactSchema);
module.exports = contact;
