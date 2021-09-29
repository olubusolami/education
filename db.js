const mongoose = require("mongoose");
let DB_CONNECT = process.env.DB_CONNECT; // here we are using the MongoDB Url we defined in our ENV file

module.exports = async function connection() {
  try {
    await mongoose.connect(
      DB_CONNECT,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      (error) => {
        if (error) return new Error("Failed to connect to database");
        console.log("connected to the database");
      }
    );
  } catch (error) {
    console.log(error);
  }
};
