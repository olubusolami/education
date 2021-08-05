const ukDetails = require("../model/ukSubmission");

const createSubmission = async (req, res) => {
  if (req.body.email === "") {
    res.status(400).send({ status: "error", message: "email is required" });
  }

  console.log(req.body);
  try {
    const formInfo = await ukDetails.create({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      givenName: req.body.givenName,
      middleName: req.body.middleName,
      familyName: req.body.familyName,
      birthDate: req.body.birthDate,
      houseAddress: req.body.houseAddress,
      Gender: req.body.Gender,
      immigrationHistory: req.body.immigrationHistory,
      countryOfCitizenship: req.body.countryOfCitizenship,
    });

    formInfo.save();

    return res.status(201).send({ message: "Success", data: formInfo });
  } catch (error) {
    res.send("Internal server error");
  }
};

module.exports = createSubmission;
