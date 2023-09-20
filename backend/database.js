const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.URI)
    .then((data) => console.log("connected to mongo successfully"));
};

module.exports = connectToDB;
