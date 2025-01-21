const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Post = require("./models/post.model");

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT | 8000;
const dbUrl = process.env.DB_URL;

app.get("/", (_, res) => {
  res.send("Hello World express node !");
});

app.get("/api/posts", async (_, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      message: "Get all",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

app.post("/api/posts", async (req, res) => {
  try {
    const p = new Post(req.body);
    const postSaved = await p.save();

    res.status(201).json(postSaved);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (post === null) {
      res.status(200).json({
        message: "Not found",
      });
    } else {
      res.status(200).json({
        message: "Get",
        data: post,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid post id",
    });
  }

  try {
    const update = req.body;
    const doc = await Post.findByIdAndUpdate(id, update);
    await doc.save();
    return res.status(404).json({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid post id",
    });
  }

  try {
    await Post.findOneAndDelete(id);

    return res.status(404).json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

mongoose
  .connect(dbUrl)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Err: ", err));
