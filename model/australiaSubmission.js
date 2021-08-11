const mongoose = require("mongoose");
const validator = require("validator");

const australiaSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email address is required."],
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  givenName: {
    type: String,
    required: [true, "Please provide your first name."],
    trim: true,
  },
  middleName: {
    type: String,
    required: [true, "Please provide your middle name."],
    trim: true,
  },
  familyName: {
    type: String,
    required: [true, "Please provide your surname."],
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
    trim: true,
  },
  houseAddress: {
    type: String,
    required: true,
  },
  countryOfCitizenship: {
    type: String,
    required: true,
  },
  immigrationHistory: {
    type: String,
    required: true,
  },
  visaDenialLetter: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "prefer_not_to_say"],
  },
  programLevel: {
    type: String,
    required: true,
    enum: ["bsc", "masters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const australiaDetails = mongoose.model("australiaDetails", australiaSchema);

module.exports = australiaDetails;
