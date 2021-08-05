const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const User = require("./model/register");
const Contact = require("./model/contact");
const canadaRoute = require("./controllers/canadaDetails");
// const ukRoute = require("./controllers/ukDetails");
const { createUser, loginUser } = require("./routes/auth");

//import routes
const contactRoute = require("./routes/contact");
const contactSchema = require("./model/contact");
const canadaSchema = require("./model/canadaSubmission");
// const australiaRoute = require("./routes/australiaRoute");
// const ukRoute = require("./routes/ukRoute");
// const usRoute = require("./routes/usRoute");
// const australiaSchema = require("./model/australiaSubmission");
// const canadaSchema = require("./model/canadaSubmission");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello and Welcome");
});

//get all contact
app.get("/contacts", (req, res) => {
  Contact.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//delete one contact
app.delete("/contacts/:id", function (req, res) {
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

//get all details
app.get("/details", (req, res) => {
  Details.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

//connect to mongoose
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => console.log("connected to database"));

app.use(express.json());

//middleware
app.get("/contacts", contactSchema);
app.use("/api/contacts", contactRoute);
app.post("/canada_form", canadaRoute);
// app.post("/uk_form", ukRoute);
app.get("/canada_forms", canadaSchema);
// app.get("/details", australiaSchema);
// app.get("/details", canadaSchema);
// app.get("/details", ukSchema);
// app.get("/details", usSchema);
// app.use("/api/Australia", australiaRoute);
// app.use("/api/Canada", canadaRoute);
// app.use("/api/Uk", ukRoute);
// app.use("/api/details/US", usRoute);

app.post("/register", createUser);
app.post("/login", loginUser);

app.listen(PORT, () => {
  console.log("server running well");
});
