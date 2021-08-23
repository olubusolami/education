const relocationDetails = require("../model/relocation");
const { relocationSubmission } = require("../validation");

exports.relocationForm = async (req, res) => {
  try {
    //validate before sending message
    const { error } = relocationSubmission(req.body);
    if (error) return res.status(400).json(error.details[0].message);

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
