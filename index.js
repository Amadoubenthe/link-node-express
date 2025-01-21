const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoute = require("./routes/post.route");

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT | 8000;
const dbUrl = process.env.DB_URL;

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/api/posts", postRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Err: ", err));
