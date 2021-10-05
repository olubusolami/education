const relocationDetails = require("../model/relocation");

exports.relocationForm = async (req, res) => {
  try {
    //create a relocation form
    const formInfo = await relocationDetails.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      chooseWhatYouWantToKnowAbout: req.body.chooseWhatYouWantToKnowAbout,
    });

    formInfo.save();

    return res.status(200).send({ message: "Success", data: formInfo });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};
