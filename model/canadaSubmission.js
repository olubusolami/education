const mongoose = require("mongoose");
const validator = require("validator");

const canadaSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email address is required."],
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  phoneNumber: {
    type: Number,
    required: true,
    min: 10,
    max: 15,
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
  visaDenialLetter: {},
  Gender: {
    type: String,
    required: true,
    enum: ["male", "female", "prefer not to say"],
  },
});

const canadaDetails = mongoose.model("canadaDetails", canadaSchema);

module.exports = canadaDetails;
