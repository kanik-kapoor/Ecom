const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./db.js");
// const express = require('express');
// const bodyParser = require("body-parser"); 
// app.use(bodyParser.json());
//handling uncaught exception

process.on("uncaughtException", (error) => {
  console.log(`error : ${error}`);
  console.log("shutting down the server due to uncaught exception ");
  server.close(() => {
    process.exit(1);
  });
});

//config
// dotenv.config({ path: ".env" });

//connection to database
connectDB();

//server
const server = app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT} `);
});

//unhandled promise rejection

process.on("unhandledRejection", (error) => {
  console.log(`error : ${error}`);
  console.log("shutting down the server due to unhandled promise rejection ");
  server.close(() => {
    process.exit(1);
  });
});
