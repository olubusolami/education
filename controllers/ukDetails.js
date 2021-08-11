const ukDetails = require("../model/ukSubmission");
const { submission } = require("../validation");

const ukForm = async (req, res) => {
  try {
    //validate before sending details
    const { error } = submission(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    //detail check
    const formInfo = await ukDetails.create({
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
      programLevel: req.body.programLevel,
    });

    formInfo.save();

    return res.status(200).send({ message: "Success", data: formInfo });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = ukForm;
