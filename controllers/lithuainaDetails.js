const lithuainaDetails = require("../model/lithuainaSubmission");
const { workSubmission } = require("../validation");

const lithuainaForm = async (req, res) => {
  try {
    //validate before sending details
    const { error } = workSubmission(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    //detail check
    const formInfo = await lithuainaDetails.create({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      givenName: req.body.givenName,
      middleName: req.body.middleName,
      familyName: req.body.familyName,
      birthDate: req.body.birthDate,
      houseAddress: req.body.houseAddress,
      gender: req.body.gender,
      immigrationHistory: req.body.immigrationHistory,
      countryOfCitizenship: req.body.countryOfCitizenship,
      visaDenialLetter: req.body.visaDenialLetter,
      experienceLevel: req.body.experienceLevel,
    });

    formInfo.save();

    return res.status(200).send({ message: "Success", data: formInfo });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = lithuainaForm;
