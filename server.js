const app = require("./app");
const PORT = process.env.PORT;
const databaseConnect = require("./src/config/db");

databaseConnect();
console.log("Pinged your deployment. You successfully connected to MongoDB!");
app.listen(PORT, () => {
  console.log(`App is listning on port ${PORT}...`);
});

module.exports = app;
