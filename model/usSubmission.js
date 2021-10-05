const mongoose = require("mongoose");
const validator = require("validator");

const usSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  givenName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
    trim: true,
  },
  houseAddress: {
    type: String,
  },
  countryOfCitizenship: {
    type: String,
    required: true,
  },
  immigrationHistory: {
    type: String,
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

const usDetails = mongoose.model("usDetails", usSchema);

module.exports = usDetails;
