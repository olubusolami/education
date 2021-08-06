const mongoose = require("mongoose");
const validator = require("validator");

const usSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email address is required."],
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: [10, "Phone number should not go below 10 characters"],
    maxlength: [15, "Phone number should not go above 15 characters"],
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
    enum: ["male", "female", "prefer not to say"],
  },
  programLevel: {
    type: String,
    required: true,
    enum: ["B.Sc", "masters"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const usDetails = mongoose.model("usDetails", usSchema);

module.exports = usDetails;
