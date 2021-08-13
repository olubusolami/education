const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
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
const canadaRoute = require("./controllers/canadaDetails");
const canadaSchema = require("./model/canadaSubmission");
const ukRoute = require("./controllers/ukDetails");
const ukSchema = require("./model/ukSubmission");
const australiaRoute = require("./controllers/australiaDetails");
const australiaSchema = require("./model/australiaSubmission");
const usRoute = require("./controllers/usDetails");
const usSchema = require("./model/usSubmission");
const lithuainaSchema = require("./model/lithuainaSubmission");
const lithuainaRoute = require("./controllers/lithuainaDetails");
const { loginUser } = require("./routes/auth");

dotenv.config();

//connect to mongoose
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => console.log("connected to the database"));

app.use(express.json());

//configure cors
app.use(cors());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Authorization"
  );

  // Set to true if you need the website to include
  //cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
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
app.post("/canada_form", canadaRoute);
app.get("/canada_forms", canadaSchema);
app.post("/uk_form", ukRoute);
app.get("/uk_forms", ukSchema);
app.post("/australia_form", australiaRoute);
app.get("/australia_forms", australiaSchema);
app.post("/us_form", usRoute);
app.get("/us_forms", usSchema);
app.post("/lithuaina_form", lithuainaRoute);
app.get("/lithuaina_forms", lithuainaSchema);
// app.post("/register", createUser);
app.post("/login", loginUser);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server running well"));
