const mongoose = require("mongoose");
const validator = require("validator");

const relocationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  chooseWhatYouWantToKnowAbout: {
    type: String,
    required: true,
    enum: [
      "information_about_study",
      "information_about_work",
      "information_about_relocation",
    ],
  },
});

const relocationDetails = mongoose.model("relocationDetails", relocationSchema);

module.exports = relocationDetails;
