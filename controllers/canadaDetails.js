const canadaDetails = require("../model/canadaSubmission");

const createSubmission = async (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("this work");
  }

  // console.log(req.body);
  try {
    const formInfo = await canadaDetails.create({
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
    console.log(formInfo);

    return res.status(200).send({ message: "Success", data: formInfo });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = createSubmission;
