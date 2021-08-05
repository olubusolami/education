const router = require("express").Router();
const Details = require("../model/usSubmission");

router.post("/", async (req, res) => {
  try {
    //giving details to be saved
    const details = await Details.create({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      givenName: req.body.givenName,
      middleName: req.body.middleName,
      familyName: req.body.familyName,
      birthDate: req.body.birthDate,
      houseAddress: req.body.houseAddress,
      countriesVisited: req.body.countriesVisited,
      Gender: req.body.Gender,
      immigrationHistory: req.body.immigrationHistory,
      countryOfCitizenship: req.body.countryOfCitizenship,
    });

    return res.status(201).json({
      status: "Success",
      message: "Details input Successfully!",
      data: details,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
});

module.exports = router;
