//validation
const Joi = require("@hapi/joi");

//validation
const submission = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    phoneNumber: Joi.string().min(10).max(15).required(),
    givenName: Joi.string().min(6).required(),
    familyName: Joi.string().min(6).required(),
    middleName: Joi.string().min(6).required(),
    houseAddress: Joi.string().required(),
    birthDate: Joi.string().required(),
    countryOfCitizenship: Joi.string().required(),
    immigrationHistory: Joi.string().required(),
    gender: Joi.string().required(),
    programLevel: Joi.string().required(),
  });
  return schema.validate(data);
};

const contactValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    subject: Joi.string().min(6).required(),
    message: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const workSubmission = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    phoneNumber: Joi.string().min(10).max(15).required(),
    givenName: Joi.string().min(6).required(),
    familyName: Joi.string().min(6).required(),
    middleName: Joi.string().min(6).required(),
    houseAddress: Joi.string().required(),
    birthDate: Joi.string().required(),
    countryOfCitizenship: Joi.string().required(),
    immigrationHistory: Joi.string().required(),
    visaDenialLetter: Joi.string().required(),
    gender: Joi.string().required(),
    experienceLevel: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { submission, contactValidation, workSubmission };
