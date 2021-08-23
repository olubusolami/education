const mongoose = require("mongoose");
const validator = require("validator");

const canadaSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email address is required."],
    validate: [validator.isEmail, "Please provide a valid email address."],
    unique: true,
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
    type: String,
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
  },
  visaDenialLetterKey: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "prefer_not_to_say"],
  },
  programLevel: {
    type: String,
    required: true,
    enum: ["bsc", "masters", "post-graduate diploma", "pre-masters degree"],
  },
  highestLevelOfEducation: {
    type: String,
    required: true,
  },
  desiredCourseOfStudy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const canadaDetails = mongoose.model("canadaDetails", canadaSchema);

module.exports = canadaDetails;
