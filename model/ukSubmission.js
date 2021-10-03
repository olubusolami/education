const mongoose = require("mongoose");
const validator = require("validator");

const ukSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email address is required."],
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required."],
  },
  givenName: {
    type: String,
    required: [true, "Please provide your first name."],
    trim: true,
  },
  middleName: {
    type: String,
    required: [true, "Please provide your other name."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your surname."],
    trim: true,
  },
  birthDate: {
    type: String,
    required: [true, "Please provide your birth date"],
    trim: true,
  },
  houseAddress: {
    type: String,
  },
  countryOfCitizenship: {
    type: String,
    required: [true, "country of citizenship is required."],
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
    required: [true, "gender is required"],
    enum: ["male", "female", "prefer_not_to_say"],
  },
  programLevel: {
    type: String,
    required: [true, "Your Program level is required."],
    enum: ["bsc", "masters", "post-graduate diploma", "pre-masters degree"],
  },
  highestLevelOfEducation: {
    type: String,
    required: [true, "Highest level of education is required."],
  },
  desiredCourseOfStudy: {
    type: String,
    required: [true, "desired course of study is required."],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ukDetails = mongoose.model("ukDetails", ukSchema);

module.exports = ukDetails;
