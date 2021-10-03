const australiaDetails = require("../model/australiaSubmission");
const { submission } = require("../validation");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "godstime",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.australia = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

exports.australiaForm = async (req, res) => {
  try {
    //validate before sending details
    const { error } = submission(
      req.email,
      req.phoneNumber,
      req.givenName,
      req.middleName,
      req.lastName,
      req.birthDate,
      req.countryOfCitizenship,
      req.gender,
      req.programLevel,
      req.highestLevelOfEducation,
      req.desiredCourseOfStudy
    );
    if (error) return res.status(400).json(error);

    let visaDenialLetter;
    let visaDenialLetterKey;
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      visaDenialLetter = result.secure_url;
      visaDenialLetterKey = result.public_id;
    }
    //detail check
    const formInfo = await australiaDetails.create({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      givenName: req.body.givenName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      houseAddress: req.body.houseAddress,
      gender: req.body.gender,
      immigrationHistory: req.body.immigrationHistory,
      countryOfCitizenship: req.body.countryOfCitizenship,
      visaDenialLetter,
      visaDenialLetterKey,
      programLevel: req.body.programLevel,
      highestLevelOfEducation: req.body.highestLevelOfEducation,
      desiredCourseOfStudy: req.body.desiredCourseOfStudy,
    });

    formInfo.save();

    return res.status(200).send({ message: "Success", data: formInfo });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};
