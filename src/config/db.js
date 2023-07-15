const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

const databaseConnect = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then((mongoConnected) => {
      if (mongoConnected) console.log(`Database Connected Sucessfully..!`);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = databaseConnect;
