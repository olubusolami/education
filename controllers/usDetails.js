const usDetails = require("../model/usSubmission");
const { submission } = require("../validation");
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "df8sl3bso",
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

exports.us = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

exports.usForm = async (req, res) => {
  try {
    //validate before sending details
    const { error } = submission(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    let visaDenialLetter;
    let visaDenialLetterKey;
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      visaDenialLetter = result.secure_url;
      visaDenialLetterKey = result.public_id;
    }

    //detail check
    const formInfo = await usDetails.create({
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
