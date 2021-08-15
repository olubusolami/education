const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Contact = require("./model/contact");
const Canada = require("./model/canadaSubmission");
const US = require("./model/usSubmission");
const Australia = require("./model/australiaSubmission");
const UK = require("./model/ukSubmission");
const auth = require("./middleware/auth");
const Lithuaina = require("./model/lithuainaSubmission");

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
const usSchema = require("./model/usSubmission");
const lithuainaSchema = require("./model/lithuainaSubmission");
const { lithuaina, lithuainaForm } = require("./controllers/lithuainaDetails");
const { loginUser } = require("./routes/auth");

//configure cors
// app.use(cors());

app.use(express.json());
app.use(cors({ origin: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "GET, DELETE, POST");
  res.setHeader('Access-Control-Allow-Headers', "*");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   // Pass to next layer of middleware
//   next();
// });

app.get("/", (req, res) => {
  res.send("Hello and Welcome 🙌");
});

//connect to mongoose
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => console.log("connected to the database"));


//get all contact
app.get("/contacts", auth, (req, res) => {
  Contact.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
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
      res.status(500).send(error);
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
      res.status(500).send(error);
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
      res.status(500).send(error);
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

//get all lithuaina details
app.get("/lithuaina_forms", auth, (req, res) => {
  Lithuaina.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//delete one lithuaina detail
app.delete("/lithuaina/:id", auth, function (req, res) {
  Lithuaina.findByIdAndDelete(req.params.id)
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
app.post("/canada_form", canada.single("canadaDenialLetter"), canadaForm);
app.get("/canada_forms", canadaSchema);
app.post("/uk_form", uk.single("ukDenialLetter"), ukForm);
app.get("/uk_forms", ukSchema);
app.post(
  "/australia_form",
  australia.single("australiaDenialLetter"),
  australiaForm
);
app.get("/australia_forms", australiaSchema);
app.post("/us_form", us.single("usDenialLetter"), usForm);
app.get("/us_forms", usSchema);
app.post(
  "/lithuaina_form",
  lithuaina.single("lithuainaDenialLetter"),
  lithuainaForm
);
app.get("/lithuaina_forms", lithuainaSchema);
// app.post("/register", createUser);
app.post("/login", loginUser);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running well"));
