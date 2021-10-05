require("express-async-errors");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const Contact = require("./model/contact");
const Canada = require("./model/canadaSubmission");
const US = require("./model/usSubmission");
const Australia = require("./model/australiaSubmission");
const UK = require("./model/ukSubmission");
const auth = require("./middleware/auth");
const Relocation = require("./model/relocation");

//import routes
const contactRoute = require("./routes/contact");
const contactSchema = require("./model/contact");
const { canada, canadaForm } = require("./controllers/canadaDetails");
const canadaSchema = require("./model/canadaSubmission");
const { uk, ukForm } = require("./controllers/ukDetails");
const ukSchema = require("./model/ukSubmission");
const { australia, australiaForm } = require("./controllers/australiaDetails");
const australiaSchema = require("./model/australiaSubmission");
const { us, usForm } = require("./controllers/usDetails");
const { errorHandler } = require("./middleware/errorHandler");
const { errorsHandler } = require("./middleware/errorHandler");
const usSchema = require("./model/usSubmission");
const {
  relocationRoute,
  relocationForm,
} = require("./controllers/relocationDetails");
const relocationSchema = require("./model/relocation");
const { loginUser } = require("./routes/auth");

(async function db() {
  await connection();
})();
app.use(cors());

//express passage
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello and Welcome 🙌");
});

//get all contact
app.get("/contacts", auth, (req, res) => {
  Contact.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//delete one contact
app.delete("/contacts/:id", auth, function (req, res) {
  Contact.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).end();
      }
      return res
        .status(200)
        .json({ status: "Success", message: "Deleted Successfully" });
    })
    .catch((error) => next(err));
});

//get all canada details
app.get("/canada_forms", auth, (req, res) => {
  Canada.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//delete one canada detail
app.delete("/canada/:id", auth, function (req, res) {
  Canada.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).end();
      }
      return res
        .status(200)
        .json({ status: "Success", message: "Deleted Successfully" });
    })
    .catch((error) => next(err));
});

//get all US details
app.get("/us_forms", auth, (req, res) => {
  US.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//delete one US detail
app.delete("/us/:id", auth, function (req, res) {
  US.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).end();
      }
      return res
        .status(200)
        .json({ status: "Success", message: "Deleted Successfully" });
    })
    .catch((error) => next(err));
});

//get all Australia details
app.get("/australia_forms", auth, (req, res) => {
  Australia.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

//delete one Australia detail
app.delete("/australia/:id", auth, function (req, res) {
  Australia.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).end();
      }
      return res
        .status(200)
        .json({ status: "Success", message: "Deleted Successfully" });
    })
    .catch((error) => next(err));
});

//get all UK details
app.get("/uk_forms", auth, (req, res) => {
  UK.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//delete one UK detail
app.delete("/uk/:id", auth, function (req, res) {
  UK.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).end();
      }
      return res
        .status(200)
        .json({ status: "Success", message: "Deleted Successfully" });
    })
    .catch((error) => next(err));
});

//get all relocation details
app.get("/relocation_forms", auth, (req, res) => {
  Relocation.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//delete one relocation detail
app.delete("/relocation/:id", auth, function (req, res) {
  Relocation.findByIdAndDelete(req.params.id)
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).end();
      }
      return res
        .status(200)
        .json({ status: "Success", message: "Deleted Successfully" });
    })
    .catch((error) => next(err));
});

//middleware
app.get("/contacts", contactSchema);
app.use("/contacts", contactRoute);
app.post(
  "/canada_form",
  canada.single("canadaDenialLetter"),
  errorHandler,
  canadaForm
);
app.get("/canada_forms", canadaSchema);
app.post("/uk_form", uk.single("ukDenialLetter"), errorHandler, ukForm);
app.get("/uk_forms", ukSchema);
app.post(
  "/australia_form",
  australia.single("australiaDenialLetter"),
  errorHandler,
  australiaForm
);
app.get("/australia_forms", australiaSchema);
app.post("/us_form", us.single("usDenialLetter"), errorHandler, usForm);
app.get("/us_forms", usSchema);
app.post("/relocation_form", errorsHandler, relocationForm);
app.get("/relocation_forms", relocationSchema);
// app.post("/register", createUser);
app.post("/login", loginUser);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running well"));
