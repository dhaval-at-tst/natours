const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("UNCAUGHT EXCEPTION");
  console.log("Shutting down...");
  process.exit(1);
});
const app = require("./app");

dotenv.config({
  path: "./config.env",
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect("mongodb://127.0.0.1:27017/natours")
  .then(() => {
    console.log("Database connection successfull!");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
const host = "localhost";

const server = app.listen(port, () => {
  console.log(`App is running on ${host}:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log("UNHANDLED REJECTION");
  console.log("Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
