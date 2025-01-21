const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const connexionString = "mongodb://localhost:27017";

app.get("/", (_, res) => {
  res.send("Hello World express node !");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Err: ", err));
