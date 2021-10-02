// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const validator = require("validator");
// const Joi = require("@hapi/joi");

// const registerSchema = new Schema({
//   email: {
//     type: String,
//     required: [true, "Email address is required."],
//     validate: [validator.isEmail, "Please provide a valid email address."],
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   token: {
//     type: String,
//   },
// });

// // const User = mongoose.model("register", registerSchema);

// // const validate = (register) => {
// //   const schema = Joi.object({
// //     email: Joi.string().required().email(),
// //     password: Joi.string().required(),
// //   });
// //   return schema.validate(register);
// // };

// // module.exports = { User, validate };

// module.exports = mongoose.model("Register", registerSchema);

const mongoose = require("mongoose");
const validator = require("validator");

const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email address is required."],
    validate: [validator.isEmail, "Please provide a valid email address."],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("Register", registerSchema);
