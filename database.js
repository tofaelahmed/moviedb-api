const mongoose = require("mongoose");
const NODE_ENV = process.env.NODE_ENV || "development";

const dbUrl =
  NODE_ENV === "test"
    ? "mongodb://localhost/moviedb-test"
    : process.env.DB_URL || "mongodb://localhost/moviedb";

mongoose.connect(
  dbUrl,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function callback() {
  console.log("Connection with database succeeded.");
});
exports.db = db;
