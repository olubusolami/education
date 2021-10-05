exports.errorHandler = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({
      status: "error",
      message: "Email is required!",
    });
  }
  if (!req.body.phoneNumber) {
    return res.status(400).json({
      status: "error",
      message: "Phone Number is required!",
    });
  }
  if (!req.body.givenName) {
    return res.status(400).json({
      status: "error",
      message: "Your first name is required!",
    });
  }
  if (!req.body.middleName) {
    return res.status(400).json({
      status: "error",
      message: "Your middle name is required!",
    });
  }
  if (!req.body.lastName) {
    return res.status(400).json({
      status: "error",
      message: "Your last-name / surname is required!",
    });
  }
  if (!req.body.birthDate) {
    return res.status(400).json({
      status: "error",
      message: "Your Bithday Date is required!",
    });
  }
  if (!req.body.countryOfCitizenship) {
    return res.status(400).json({
      status: "error",
      message: "Citizenship is required!",
    });
  }
  if (!req.body.highestLevelOfEducation) {
    return res.status(400).json({
      status: "error",
      message: "Highest level of Education is required!",
    });
  }
  if (!req.body.desiredCourseOfStudy) {
    return res.status(400).json({
      status: "error",
      message: "What do you want to study?",
    });
  }
  if (!req.body.programLevel) {
    return res.status(400).json({
      status: "error",
      message: "What level of program are you applying for?",
    });
  }
  if (!req.body.gender) {
    return res.status(400).json({
      status: "error",
      message: "Gender is required!",
    });
  }

  return next();
};

exports.errorsHandler = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: "error",
      message: "Full-name is required!",
    });
  }
  if (!req.body.phoneNumber) {
    return res.status(400).json({
      status: "error",
      message: "Phone Number is required!",
    });
  }
  if (!req.body.email) {
    return res.status(400).json({
      status: "error",
      message: "Email is required!",
    });
  }
  if (!req.body.chooseWhatYouWantToKnowAbout) {
    return res.status(400).json({
      status: "error",
      message: "select from the option",
    });
  }
  return next();
};

exports.errorHandeler;
exports.errorsHandler;
