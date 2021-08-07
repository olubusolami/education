const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email address is required."],
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
