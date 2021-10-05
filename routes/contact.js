const router = require("express").Router();
const Contact = require("../model/contact");

//contact us
router.post("/", async (req, res) => {
  try {
    //create a new contact
    const contact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });
    return res.status(201).json({
      status: "Success",
      message: "Message Sent Successfully!",
      data: contact,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
});

module.exports = router;
